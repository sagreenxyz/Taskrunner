import React, { useState, useEffect, useCallback, useRef } from "react";
import type { ProcedureRun, RunStep, CapturedField } from "../types/index.ts";
import { templateRegistry } from "../data/templates/index.ts";
import {
  startRun,
  saveActiveRun,
  loadActiveRun,
  completeRun,
  cancelPendingSave,
  checkStorageUsage,
} from "../services/runService.ts";
import StepFieldRenderer from "./StepFieldRenderer.tsx";
import AddStepModal from "./AddStepModal.tsx";

interface RunAppProps {
  templateId: string | null;
  base: string;
}

function ElapsedTimer({ startedAt }: { startedAt: string }) {
  const [elapsed, setElapsed] = useState("00:00:00");

  useEffect(() => {
    const start = new Date(startedAt).getTime();
    const tick = () => {
      const ms = Date.now() - start;
      const s = Math.floor(ms / 1000);
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = s % 60;
      setElapsed([h, m, sec].map((v) => String(v).padStart(2, "0")).join(":"));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  return <span className="font-mono font-medium">{elapsed}</span>;
}

function StepNavigator({
  run,
  onReview,
}: {
  run: ProcedureRun;
  onReview: (step: RunStep) => void;
}) {
  return (
    <div className="space-y-0.5 max-h-[60vh] overflow-y-auto pr-1">
      {run.steps.map((step, idx) => {
        const isActive = idx === run.currentStepIndex;
        const isComplete = step.status === "complete";
        const isSkipped = step.status === "skipped";

        return (
          <React.Fragment key={step.id}>
            <button
              className={`w-full text-left flex items-start gap-3 px-3 py-2 rounded-xl transition-all text-sm group ${
                isActive
                  ? "bg-primary text-primary-content font-semibold shadow-sm"
                  : isComplete
                  ? "hover:bg-base-200 cursor-pointer"
                  : "text-base-content/40 cursor-default"
              }`}
              onClick={() => isComplete && onReview(step)}
              disabled={!isComplete}
              type="button"
            >
              {/* Step status icon */}
              <span
                className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                  isActive
                    ? "bg-primary-content/20 text-primary-content"
                    : isComplete
                    ? "bg-success text-success-content"
                    : isSkipped
                    ? "bg-warning/20 text-warning"
                    : "bg-base-300 text-base-content/30"
                }`}
              >
                {isComplete ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : isActive ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : isSkipped ? (
                  "⊘"
                ) : (
                  <span className="text-[10px]">{idx + 1}</span>
                )}
              </span>
              <div className="flex-1 min-w-0">
                <div className="truncate leading-snug">
                  {step.title}
                </div>
                {step.addedAtRuntime && (
                  <div className="text-xs opacity-70 mt-0.5">+ Added at runtime</div>
                )}
              </div>
              {isComplete && !isActive && (
                <span className="shrink-0 opacity-0 group-hover:opacity-50 text-xs transition-opacity">
                  view
                </span>
              )}
            </button>

            {(isActive || isComplete) &&
              step.subtasks.length > 0 &&
              step.subtasks.map((sub, subIdx) => {
                const isSubActive =
                  isActive && subIdx === run.currentSubtaskIndex;
                const isSubComplete = !!sub.completedAt;
                return (
                  <div
                    key={sub.id}
                    className={`ml-8 flex items-center gap-2 text-xs py-0.5 px-2 ${
                      isSubActive
                        ? "text-primary font-medium"
                        : isSubComplete
                        ? "text-success"
                        : "text-base-content/40"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSubComplete ? "bg-success" : isSubActive ? "bg-primary" : "bg-base-300"}`}></span>
                    <span className="truncate">{sub.title}</span>
                  </div>
                );
              })}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function ReviewModal({
  step,
  onClose,
}: {
  step: RunStep | null;
  onClose: () => void;
}) {
  if (!step) return null;
  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex gap-2 shrink-0 mt-0.5">
            <span className="badge badge-ghost badge-sm">{step.type}</span>
            <span className={`badge badge-sm ${step.status === "complete" ? "badge-success" : "badge-ghost"}`}>
              {step.status}
            </span>
          </div>
          <h3 className="font-bold text-lg leading-snug">{step.title}</h3>
        </div>

        <div className="space-y-4">
          {step.captured.length > 0 && (
            <table className="table table-sm w-full">
              <thead>
                <tr>
                  <th className="text-base-content/50 font-medium">Field</th>
                  <th className="text-base-content/50 font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {step.captured.map((c) => {
                  const field = step.fields.find((f) => f.id === c.fieldId);
                  const val = Array.isArray(c.value)
                    ? c.value.join(", ")
                    : String(c.value);
                  const valClass = val === "Pass" ? "text-success font-semibold" : val === "Fail" ? "text-error font-semibold" : val === "N-A" ? "text-warning font-semibold" : "";
                  return (
                    <tr key={c.fieldId}>
                      <td className="font-medium text-sm">
                        {field?.label ?? c.fieldId}
                      </td>
                      <td className={valClass}>{val}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {step.subtasks.map((sub) =>
            sub.captured.length > 0 ? (
              <div key={sub.id}>
                <div className="font-semibold text-xs mb-2 text-base-content/50 uppercase tracking-wide">{sub.title}</div>
                <table className="table table-sm w-full">
                  <thead>
                    <tr>
                      <th className="text-base-content/50 font-medium">Field</th>
                      <th className="text-base-content/50 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sub.captured.map((c) => {
                      const field = sub.fields.find((f) => f.id === c.fieldId);
                      const val = Array.isArray(c.value)
                        ? c.value.join(", ")
                        : String(c.value);
                      const valClass = val === "Pass" ? "text-success font-semibold" : val === "Fail" ? "text-error font-semibold" : val === "N-A" ? "text-warning font-semibold" : "";
                      return (
                        <tr key={c.fieldId}>
                          <td className="font-medium text-sm">
                            {field?.label ?? c.fieldId}
                          </td>
                          <td className={valClass}>{val}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null
          )}

          {step.notes && (
            <div className="bg-base-200 rounded-xl p-3 text-sm">
              <span className="font-medium text-base-content/60">Notes: </span>
              <span className="text-base-content/80">{step.notes}</span>
            </div>
          )}

          {step.captured.length === 0 && step.subtasks.every(s => s.captured.length === 0) && (
            <div className="text-center py-6 text-base-content/40 text-sm">No data was captured for this step.</div>
          )}
        </div>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onClose} type="button">
            Close
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
}

export default function RunApp({ templateId, base }: RunAppProps) {
  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState<ProcedureRun | null>(null);
  const [showOperatorModal, setShowOperatorModal] = useState(false);
  const [operatorName, setOperatorName] = useState("");
  const [operatorError, setOperatorError] = useState(false);
  const [pendingTemplate, setPendingTemplate] = useState<typeof templateRegistry[0] | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [reviewStep, setReviewStep] = useState<RunStep | null>(null);
  const [showAddStep, setShowAddStep] = useState(false);
  const [storageInfo, setStorageInfo] = useState({ usedMB: "0.00", warningThreshold: false });
  const [isStepValid, setIsStepValid] = useState(true);

  const runRef = useRef<ProcedureRun | null>(null);
  runRef.current = run;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const templateId = params.get("template");
    const active = loadActiveRun();
    console.log("[RunApp] init useEffect", { templateId, hasActiveRun: !!active, activeRunTemplateId: active?.templateId });

    if (active) {
      if (!templateId || active.templateId === templateId) {
        console.log("[RunApp] resuming active run", { runId: active.runId });
        setRun(active);
        setLoading(false);
        return;
      }
      console.log("[RunApp] active run templateId mismatch, ignoring", { activeTemplateId: active.templateId, requestedTemplateId: templateId });
    }

    if (!templateId) {
      console.log("[RunApp] no templateId, redirecting to home");
      window.location.href = `${base}/`;
      return;
    }

    const template = templateRegistry.find((t) => t.id === templateId);
    if (!template) {
      console.warn("[RunApp] template not found in registry", { templateId, available: templateRegistry.map(t => t.id) });
      window.location.href = `${base}/`;
      return;
    }

    console.log("[RunApp] template found, showing operator modal", { templateId: template.id, templateName: template.name });
    setPendingTemplate(template);
    setShowOperatorModal(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    const handle = () => {
      console.log("[RunApp] save-and-exit received, saving and navigating home");
      if (runRef.current) saveActiveRun(runRef.current);
      window.location.href = `${base}/`;
    };
    window.addEventListener("save-and-exit", handle);
    return () => window.removeEventListener("save-and-exit", handle);
  }, [base]);

  useEffect(() => {
    if (run) {
      const usage = checkStorageUsage();
      setStorageInfo({ usedMB: usage.usedMB, warningThreshold: usage.warningThreshold });
    }
  }, [run]);

  const handleStartRun = () => {
    console.log("[RunApp] handleStartRun", { operatorName, pendingTemplateId: pendingTemplate?.id });
    if (!operatorName.trim()) {
      setOperatorError(true);
      console.warn("[RunApp] handleStartRun: operator name is empty");
      return;
    }
    if (!pendingTemplate) {
      console.warn("[RunApp] handleStartRun: no pendingTemplate");
      return;
    }
    const newRun = startRun(pendingTemplate, operatorName.trim());
    console.log("[RunApp] handleStartRun: run created", { runId: newRun.runId });
    setRun(newRun);
    setShowOperatorModal(false);
    setPendingTemplate(null);
  };

  const updateRun = useCallback((updater: (r: ProcedureRun) => ProcedureRun) => {
    setRun((prev) => {
      if (!prev) return prev;
      const next = updater(JSON.parse(JSON.stringify(prev)));
      saveActiveRun(next);
      return next;
    });
  }, []);

  const handleFieldChange = useCallback(
    (stepId: string, fieldId: string, value: CapturedField["value"]) => {
      console.log("[RunApp] handleFieldChange", { stepId, fieldId, value });
      updateRun((r) => {
        const step = r.steps.find((s) => s.id === stepId);
        if (!step) return r;
        const hasSubtasks = step.subtasks.length > 0;
        const target = hasSubtasks ? step.subtasks[r.currentSubtaskIndex] : step;
        const existing = target.captured.findIndex((c) => c.fieldId === fieldId);
        if (existing >= 0) {
          target.captured[existing].value = value;
        } else {
          target.captured.push({ fieldId, value });
        }
        return r;
      });
    },
    [updateRun]
  );

  const handleNotesChange = useCallback(
    (notes: string) => {
      updateRun((r) => {
        const step = r.steps[r.currentStepIndex];
        if (step) step.notes = notes;
        return r;
      });
    },
    [updateRun]
  );

  const handlePrev = useCallback(() => {
    if (!run) return;
    console.log("[RunApp] handlePrev", { currentStepIndex: run.currentStepIndex, currentSubtaskIndex: run.currentSubtaskIndex });
    updateRun((r) => {
      const step = r.steps[r.currentStepIndex];
      const hasSubtasks = step.subtasks.length > 0;
      if (hasSubtasks && r.currentSubtaskIndex > 0) {
        r.currentSubtaskIndex--;
      } else if (r.currentStepIndex > 0) {
        r.currentStepIndex--;
        const prev = r.steps[r.currentStepIndex];
        r.currentSubtaskIndex = prev.subtasks.length > 0 ? prev.subtasks.length - 1 : 0;
      }
      return r;
    });
  }, [run, updateRun]);

  const handleNext = useCallback(() => {
    if (!run) return;
    const step = run.steps[run.currentStepIndex];
    const hasSubtasks = step.subtasks.length > 0;
    const isLastSubtask = !hasSubtasks || run.currentSubtaskIndex === step.subtasks.length - 1;
    const isLastStep = run.currentStepIndex === run.steps.length - 1;
    const isVeryLast = isLastStep && isLastSubtask;

    console.log("[RunApp] handleNext", {
      currentStepIndex: run.currentStepIndex,
      currentSubtaskIndex: run.currentSubtaskIndex,
      stepTitle: step.title,
      hasSubtasks,
      isLastSubtask,
      isLastStep,
      isVeryLast,
    });

    if (isVeryLast) {
      // Cancel any pending debounced save before completing, so the completed
      // run is not written back to ACTIVE_RUN_KEY after completeRun removes it.
      cancelPendingSave();
      const r = JSON.parse(JSON.stringify(run)) as ProcedureRun;
      const s = r.steps[r.currentStepIndex];
      if (hasSubtasks) {
        s.subtasks[r.currentSubtaskIndex].completedAt = new Date().toISOString();
      }
      s.status = "complete";
      s.completedAt = new Date().toISOString();
      console.log("[RunApp] handleNext: completing run, navigating to report", { runId: r.runId });
      completeRun(r);
      window.location.href = `${base}/report?run=${encodeURIComponent(r.runId)}`;
      return;
    }

    updateRun((r) => {
      const s = r.steps[r.currentStepIndex];
      const hasSubtasksLocal = s.subtasks.length > 0;
      const isLastSubtaskLocal = !hasSubtasksLocal || r.currentSubtaskIndex === s.subtasks.length - 1;

      if (hasSubtasksLocal && !isLastSubtaskLocal) {
        s.subtasks[r.currentSubtaskIndex].completedAt = new Date().toISOString();
        r.currentSubtaskIndex++;
      } else {
        if (hasSubtasksLocal) {
          s.subtasks[r.currentSubtaskIndex].completedAt = new Date().toISOString();
        }
        s.status = "complete";
        s.completedAt = new Date().toISOString();
        r.currentStepIndex++;
        r.currentSubtaskIndex = 0;
        r.steps[r.currentStepIndex].status = "active";
        r.steps[r.currentStepIndex].startedAt = new Date().toISOString();
      }
      return r;
    });
  }, [run, updateRun, base]);

  const handleInsertStep = useCallback(
    (newStep: RunStep, insertAfterIndex: number) => {
      updateRun((r) => {
        r.steps.splice(insertAfterIndex + 1, 0, newStep);
        return r;
      });
      setShowAddStep(false);
    },
    [updateRun]
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/50 text-sm">Loading procedure…</p>
      </div>
    );
  }

  if (showOperatorModal && pendingTemplate) {
    return (
      <div className="modal modal-open">
        <div className="modal-box max-w-md">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-primary/10 p-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">Start Procedure</h3>
              <p className="text-base-content/60 text-sm">{pendingTemplate.name}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 my-4">
            <div className="badge badge-ghost gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ~{pendingTemplate.estimatedMinutes} min
            </div>
            <div className="badge badge-ghost gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              </svg>
              {pendingTemplate.steps.length} steps
            </div>
          </div>

          <div className="form-control mt-2">
            <label className="label pb-1">
              <span className="label-text font-semibold">
                Operator Name <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              className={`input input-bordered w-full ${operatorError ? "input-error" : ""}`}
              placeholder="Enter your full name"
              value={operatorName}
              onChange={(e) => {
                setOperatorName(e.target.value);
                setOperatorError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleStartRun()}
              autoFocus
            />
            {operatorError && (
              <label className="label pt-1">
                <span className="label-text-alt text-error">Name is required to start</span>
              </label>
            )}
          </div>
          <div className="modal-action">
            <a href={`${base}/`} className="btn btn-ghost">
              Cancel
            </a>
            <button className="btn btn-primary gap-2" onClick={handleStartRun} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Begin Procedure
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!run) return null;

  const step = run.steps[run.currentStepIndex];
  const hasSubtasks = step?.subtasks.length > 0;
  const isLastSubtask = !hasSubtasks || run.currentSubtaskIndex === step.subtasks.length - 1;
  const isLastStep = run.currentStepIndex === run.steps.length - 1;
  const isVeryLast = isLastStep && isLastSubtask;
  const isPrevDisabled = run.currentStepIndex === 0 && run.currentSubtaskIndex === 0;

  const completedCount = run.steps.filter((s) => s.status === "complete").length;
  const progressPct = Math.round((completedCount / run.steps.length) * 100);

  let passCount = 0, failCount = 0, naCount = 0;
  for (const s of run.steps) {
    for (const c of [...s.captured, ...s.subtasks.flatMap((sub) => sub.captured)]) {
      if (c.value === "Pass") passCount++;
      else if (c.value === "Fail") failCount++;
      else if (c.value === "N-A") naCount++;
    }
  }

  return (
    <>
      {/* Top progress bar */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1">
          <div className="flex justify-between text-xs text-base-content/50 mb-1">
            <span className="font-medium text-base-content/70">
              {run.templateName}
            </span>
            <span>{completedCount}/{run.steps.length} steps · {progressPct}%</span>
          </div>
          <progress
            className="progress progress-primary w-full h-2"
            value={progressPct}
            max="100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_240px] gap-4">
        {/* Left Panel — Step Navigator */}
        <div className="bg-base-100 rounded-2xl shadow p-4 h-fit lg:sticky lg:top-20">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-xs uppercase tracking-wider text-base-content/40">
              Steps
            </h2>
            <span className="badge badge-ghost badge-sm">
              {completedCount}/{run.steps.length}
            </span>
          </div>
          <StepNavigator run={run} onReview={setReviewStep} />
          <div className="divider my-3"></div>
          <button
            className="btn btn-outline btn-sm w-full gap-2"
            onClick={() => setShowAddStep(true)}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Step
          </button>
        </div>

        {/* Center Panel — Active Step */}
        <div className="bg-base-100 rounded-2xl shadow overflow-hidden">
          {/* Step header */}
          <div className="p-5 border-b border-base-200 bg-gradient-to-r from-primary/5 to-base-100">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="badge badge-primary badge-sm">
                    Step {run.currentStepIndex + 1}/{run.steps.length}
                  </span>
                  <span className="badge badge-ghost badge-sm">{step?.type}</span>
                  {step?.addedAtRuntime && (
                    <span className="badge badge-warning badge-sm">+ Runtime</span>
                  )}
                </div>
                <h2 className="text-xl font-bold leading-snug">{step?.title}</h2>
              </div>
              <button
                className="btn btn-ghost btn-sm btn-circle shrink-0"
                onClick={() => setShowInfoModal(true)}
                title="View step description"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Subtask tabs */}
          {hasSubtasks && (
            <div className="px-5 pt-4">
              <div className="tabs tabs-bordered">
                {step.subtasks.map((sub, idx) => (
                  <button
                    key={sub.id}
                    className={`tab gap-2 ${idx === run.currentSubtaskIndex ? "tab-active" : ""}`}
                    onClick={() => {
                      if (sub.completedAt || idx === run.currentSubtaskIndex) {
                        updateRun((r) => {
                          r.currentSubtaskIndex = idx;
                          return r;
                        });
                      }
                    }}
                    type="button"
                  >
                    {sub.completedAt && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {sub.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Fields */}
          <div className="p-5">
            {step && (
              <StepFieldRenderer
                step={step}
                subtaskIndex={run.currentSubtaskIndex}
                onChange={handleFieldChange}
                onValidation={setIsStepValid}
              />
            )}
          </div>

          {/* Notes */}
          <div className="px-5 pb-4 border-t border-base-200 pt-4">
            <label className="label pb-1">
              <span className="label-text font-medium text-base-content/70 text-sm">
                📝 Observations / Notes
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full textarea-sm"
              rows={2}
              placeholder="Add any observations or notes here…"
              value={step?.notes ?? ""}
              onChange={(e) => handleNotesChange(e.target.value)}
            />
          </div>

          {/* Footer nav */}
          <div className="px-5 pb-5 border-t border-base-200 pt-4 flex justify-between items-center gap-3">
            <button
              className="btn btn-ghost btn-sm gap-2"
              onClick={handlePrev}
              disabled={isPrevDisabled}
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            <span className="text-xs text-base-content/40 text-center">
              {hasSubtasks && `Subtask ${run.currentSubtaskIndex + 1}/${step.subtasks.length}`}
            </span>
            <button
              className={`btn btn-sm gap-2 ${isVeryLast ? "btn-success" : "btn-primary"}`}
              onClick={handleNext}
              type="button"
            >
              {isVeryLast ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Finish &amp; Report
                </>
              ) : isLastSubtask ? (
                <>
                  Complete Step
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              ) : (
                <>
                  Next Subtask
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Panel — Run Info */}
        <div className="bg-base-100 rounded-2xl shadow p-4 h-fit lg:sticky lg:top-20 space-y-4">
          {/* Radial progress */}
          <div className="flex flex-col items-center gap-2 py-2">
            <div
              className="radial-progress text-primary font-bold text-sm"
              style={{"--value": progressPct, "--size": "7rem", "--thickness": "0.55rem"} as React.CSSProperties}
              role="progressbar"
              aria-valuenow={progressPct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {progressPct}%
            </div>
            <div className="text-xs text-base-content/40 font-medium tracking-wide uppercase">
              Progress
            </div>
          </div>

          <div className="divider my-0"></div>

          {/* Operator info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-base-content/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium truncate">{run.operatorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-base-content/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <ElapsedTimer startedAt={run.startedAt} />
            </div>
          </div>

          <div className="divider my-0"></div>

          {/* Step stats */}
          <div className="grid grid-cols-3 gap-1 text-center">
            <div className="bg-base-200 rounded-xl p-2">
              <div className="text-lg font-bold text-success">{completedCount}</div>
              <div className="text-xs text-base-content/40">Done</div>
            </div>
            <div className="bg-base-200 rounded-xl p-2">
              <div className="text-lg font-bold text-warning">
                {run.steps.filter((s) => s.status === "pending" || s.status === "active").length}
              </div>
              <div className="text-xs text-base-content/40">Left</div>
            </div>
            <div className="bg-base-200 rounded-xl p-2">
              <div className="text-lg font-bold">{run.steps.length}</div>
              <div className="text-xs text-base-content/40">Total</div>
            </div>
          </div>

          {/* Pass/Fail/N-A mini stats */}
          {(passCount + failCount + naCount) > 0 && (
            <div className="grid grid-cols-3 gap-1 text-center">
              <div className="bg-success/10 rounded-xl p-2">
                <div className="text-lg font-bold text-success">{passCount}</div>
                <div className="text-xs text-success/70">Pass</div>
              </div>
              <div className="bg-error/10 rounded-xl p-2">
                <div className="text-lg font-bold text-error">{failCount}</div>
                <div className="text-xs text-error/70">Fail</div>
              </div>
              <div className="bg-warning/10 rounded-xl p-2">
                <div className="text-lg font-bold text-warning">{naCount}</div>
                <div className="text-xs text-warning/70">N/A</div>
              </div>
            </div>
          )}

          <div
            className={`text-xs text-center rounded-lg px-2 py-1 ${storageInfo.warningThreshold ? "bg-warning/10 text-warning font-medium" : "text-base-content/30"}`}
          >
            {storageInfo.warningThreshold ? "⚠ " : ""}Storage: {storageInfo.usedMB} MB
            {storageInfo.warningThreshold && " — Near limit"}
          </div>
        </div>
      </div>

      {/* Step Info Modal */}
      {showInfoModal && step && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <div className="flex items-start gap-3 mb-4">
              <div className="badge badge-ghost badge-lg shrink-0">{step.type}</div>
              <h3 className="font-bold text-lg leading-snug">{step.title}</h3>
            </div>
            <p className="text-base-content/80 whitespace-pre-wrap leading-relaxed">
              {step.description}
            </p>
            {step.subtasks.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2 text-sm text-base-content/60 uppercase tracking-wide">Subtasks</h4>
                <ul className="space-y-1">
                  {step.subtasks.map((sub, i) => (
                    <li key={sub.id} className="flex items-center gap-2 text-sm">
                      <span className="w-5 h-5 rounded-full bg-base-200 flex items-center justify-center text-xs font-bold text-base-content/50">{i + 1}</span>
                      {sub.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => setShowInfoModal(false)}
                type="button"
              >
                Got it
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowInfoModal(false)}
          />
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal step={reviewStep} onClose={() => setReviewStep(null)} />

      {/* Add Step Modal */}
      <AddStepModal
        isOpen={showAddStep}
        onClose={() => setShowAddStep(false)}
        onInsert={handleInsertStep}
        currentStepIndex={run.currentStepIndex}
        totalSteps={run.steps.length}
      />
    </>
  );
}
