import type {
  ProcedureTemplate,
  ProcedureRun,
  RunStep,
  RunSummary,
  CapturedField,
} from "../types/index.ts";

const ACTIVE_RUN_KEY = "proc_run_active";
const SUMMARIES_KEY = "proc_runs_summaries";

let saveDebounceTimer: ReturnType<typeof setTimeout> | null = null;

export function startRun(
  template: ProcedureTemplate,
  operatorName: string
): ProcedureRun {
  const runId = crypto.randomUUID();
  const startedAt = new Date().toISOString();

  const steps: RunStep[] = template.steps.map((step, index) => ({
    ...step,
    captured: [],
    subtasks: (step.subtasks ?? []).map((sub) => ({
      ...sub,
      captured: [],
      completedAt: undefined,
    })),
    status: index === 0 ? "active" : "pending",
    startedAt: index === 0 ? startedAt : undefined,
    completedAt: undefined,
    addedAtRuntime: false,
    notes: "",
  }));

  const run: ProcedureRun = {
    runId,
    templateId: template.id,
    templateName: template.name,
    operatorName,
    startedAt,
    currentStepIndex: 0,
    currentSubtaskIndex: 0,
    steps,
  };

  try {
    localStorage.setItem(ACTIVE_RUN_KEY, JSON.stringify(run));
  } catch {
    // ignore storage errors
  }

  return run;
}

export function saveActiveRun(run: ProcedureRun): void {
  if (saveDebounceTimer !== null) {
    clearTimeout(saveDebounceTimer);
  }
  saveDebounceTimer = setTimeout(() => {
    try {
      localStorage.setItem(ACTIVE_RUN_KEY, JSON.stringify(run));
    } catch {
      // ignore storage errors
    }
    checkStorageUsage();
    saveDebounceTimer = null;
  }, 500);
}

export function cancelPendingSave(): void {
  if (saveDebounceTimer !== null) {
    clearTimeout(saveDebounceTimer);
    saveDebounceTimer = null;
  }
}

export function loadActiveRun(): ProcedureRun | null {
  try {
    const raw = localStorage.getItem(ACTIVE_RUN_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ProcedureRun;
  } catch {
    return null;
  }
}

export function completeRun(run: ProcedureRun): void {
  const completedAt = new Date().toISOString();
  run.completedAt = completedAt;

  let passCount = 0;
  let failCount = 0;
  let naCount = 0;

  for (const step of run.steps) {
    for (const field of step.captured) {
      if (field.value === "Pass") passCount++;
      else if (field.value === "Fail") failCount++;
      else if (field.value === "N-A") naCount++;
    }
    for (const sub of step.subtasks) {
      for (const field of sub.captured) {
        if (field.value === "Pass") passCount++;
        else if (field.value === "Fail") failCount++;
        else if (field.value === "N-A") naCount++;
      }
    }
  }

  const summary: RunSummary = {
    runId: run.runId,
    templateId: run.templateId,
    templateName: run.templateName,
    operatorName: run.operatorName,
    startedAt: run.startedAt,
    completedAt,
    stepCount: run.steps.length,
    passCount,
    failCount,
    naCount,
  };

  try {
    const existing = getRunHistory();
    existing.push(summary);
    localStorage.setItem(SUMMARIES_KEY, JSON.stringify(existing));
    localStorage.setItem(`proc_run_${run.runId}`, JSON.stringify(run));
    localStorage.removeItem(ACTIVE_RUN_KEY);
  } catch {
    // ignore storage errors
  }
}

export function getRunHistory(): RunSummary[] {
  try {
    const raw = localStorage.getItem(SUMMARIES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RunSummary[];
  } catch {
    return [];
  }
}

export function getRunById(id: string): ProcedureRun | null {
  try {
    const raw = localStorage.getItem(`proc_run_${id}`);
    if (!raw) return null;
    return JSON.parse(raw) as ProcedureRun;
  } catch {
    return null;
  }
}

export function deleteRun(id: string): void {
  try {
    localStorage.removeItem(`proc_run_${id}`);
    const summaries = getRunHistory().filter((s) => s.runId !== id);
    localStorage.setItem(SUMMARIES_KEY, JSON.stringify(summaries));
  } catch {
    // ignore storage errors
  }
}

export function exportRunAsJSON(run: ProcedureRun): void {
  const json = JSON.stringify(run, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `run_${run.runId}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportRunAsMarkdown(run: ProcedureRun): string {
  const dur = run.completedAt
    ? formatDuration(
        new Date(run.completedAt).getTime() -
          new Date(run.startedAt).getTime()
      )
    : "In Progress";

  const lines: string[] = [
    `# ${run.templateName} — Run Report`,
    ``,
    `**Run ID:** ${run.runId}`,
    `**Operator:** ${run.operatorName}`,
    `**Started:** ${new Date(run.startedAt).toLocaleString()}`,
    `**Completed:** ${run.completedAt ? new Date(run.completedAt).toLocaleString() : "N/A"}`,
    `**Duration:** ${dur}`,
    ``,
    `---`,
    ``,
    `## Steps`,
    ``,
  ];

  for (const step of run.steps) {
    lines.push(`### ${step.title}`);
    lines.push(`**Status:** ${step.status}  `);
    lines.push(`**Type:** ${step.type}  `);
    if (step.startedAt)
      lines.push(`**Started:** ${new Date(step.startedAt).toLocaleString()}  `);
    if (step.completedAt)
      lines.push(
        `**Completed:** ${new Date(step.completedAt).toLocaleString()}  `
      );
    lines.push(``);

    if (step.captured.length > 0) {
      lines.push(`| Field | Value |`);
      lines.push(`|-------|-------|`);
      for (const c of step.captured) {
        const val = Array.isArray(c.value) ? c.value.join(", ") : String(c.value);
        const field = step.fields.find((f) => f.id === c.fieldId);
        lines.push(`| ${field?.label ?? c.fieldId} | ${val} |`);
      }
      lines.push(``);
    }

    if (step.notes) {
      lines.push(`**Notes:** ${step.notes}`);
      lines.push(``);
    }

    for (const sub of step.subtasks) {
      if (sub.captured.length > 0) {
        lines.push(`#### Subtask: ${sub.title}`);
        lines.push(`| Field | Value |`);
        lines.push(`|-------|-------|`);
        for (const c of sub.captured) {
          const val = Array.isArray(c.value) ? c.value.join(", ") : String(c.value);
          const field = sub.fields.find((f) => f.id === c.fieldId);
          lines.push(`| ${field?.label ?? c.fieldId} | ${val} |`);
        }
        lines.push(``);
      }
    }
  }

  return lines.join("\n");
}

export function checkStorageUsage(): {
  usedBytes: number;
  usedMB: string;
  warningThreshold: boolean;
} {
  let usedBytes = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        usedBytes +=
          (localStorage.getItem(key)?.length ?? 0) * 2; // UTF-16
      }
    }
  } catch {
    // ignore
  }
  const usedMB = (usedBytes / (1024 * 1024)).toFixed(2);
  return {
    usedBytes,
    usedMB,
    warningThreshold: usedBytes > 3 * 1024 * 1024,
  };
}

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

export { formatDuration };

export function discardActiveRun(): void {
  try {
    localStorage.removeItem(ACTIVE_RUN_KEY);
  } catch {
    // ignore
  }
}
