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
    <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
      {run.steps.map((step, idx) => {
        const isActive = idx === run.currentStepIndex;
        const isComplete = step.status === "complete";
        const isSkipped = step.status === "skipped";
        const icon = isComplete ? "✓" : isActive ? "▶" : isSkipped ? "⊘" : "○";

        return (
          <React.Fragment key={step.id}>
            <button
              className={`w-full text-left flex items-start gap-2 px-2 py-1.5 rounded-lg transition-colors text-sm ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : isComplete
                  ? "hover:bg-base-200 cursor-pointer"
                  : "text-base-content/50 cursor-default"
              }`}
              onClick={() => isComplete && onReview(step)}
              disabled={!isComplete}
              type="button"
            >
              <span
                className={`font-bold mt-0.5 ${
                  isComplete
                    ? "text-success"
                    : isActive
                    ? "text-primary"
                    : "text-base-content/30"
                }`}
              >
                {icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="truncate">
                  {idx + 1}. {step.title}
                </div>
                {step.addedAtRuntime && (
                  <div className="text-xs text-warning">Added at runtime</div>
                )}
              </div>
            </button>

            {(isActive || isComplete) &&
              step.subtasks.length > 0 &&
              step.subtasks.map((sub, subIdx) => {
                const isSubActive =
                  isActive && subIdx === run.currentSubtaskIndex;
                const isSubComplete = !!sub.completedAt;
                const subIcon = isSubComplete
                  ? "✓"
                  : isSubActive
                  ? "▶"
                  : "○";
                return (
                  <div
                    key={sub.id}
                    className={`ml-6 flex items-center gap-1 text-xs py-0.5 ${
                      isSubActive
                        ? "text-primary font-medium"
                        : isSubComplete
                        ? "text-success"
                        : "text-base-content/40"
                    }`}
                  >
                    <span>{subIcon}</span>
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
        <h3 className="font-bold text-lg">{step.title}</h3>
        <div className="py-4 space-y-3">
          <div className="flex gap-2">
            <span className="badge badge-ghost">{step.type}</span>
            <span
              className={`badge ${
                step.status === "complete" ? "badge-success" : "badge-ghost"
              }`}
            >
              {step.status}
            </span>
          </div>

          {step.captured.length > 0 && (
            <table className="table table-sm w-full">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {step.captured.map((c) => {
                  const field = step.fields.find((f) => f.id === c.fieldId);
                  const val = Array.isArray(c.value)
                    ? c.value.join(", ")
                    : String(c.value);
                  return (
                    <tr key={c.fieldId}>
                      <td className="font-medium">
                        {field?.label ?? c.fieldId}
                      </td>
                      <td>{val}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {step.subtasks.map((sub) =>
            sub.captured.length > 0 ? (
              <div key={sub.id}>
                <div className="font-semibold text-sm mb-1">{sub.title}</div>
                <table className="table table-sm w-full">
                  <thead>
                    <tr>
                      <th>Field</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sub.captured.map((c) => {
                      const field = sub.fields.find((f) => f.id === c.fieldId);
                      const val = Array.isArray(c.value)
                        ? c.value.join(", ")
                        : String(c.value);
                      return (
                        <tr key={c.fieldId}>
                          <td className="font-medium">
                            {field?.label ?? c.fieldId}
                          </td>
                          <td>{val}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null
          )}

          {step.notes && (
            <div>
              <span className="font-medium">Notes: </span>
              <span className="text-base-content/70">{step.notes}</span>
            </div>
          )}
        </div>
        <div className="modal-action">
          <button className="btn" onClick={onClose} type="button">
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
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (showOperatorModal && pendingTemplate) {
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Start Procedure</h3>
          <p className="py-2 text-base-content/70">{pendingTemplate.name}</p>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-medium">
                Your Name <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              className={`input input-bordered w-full ${operatorError ? "input-error" : ""}`}
              placeholder="Enter your name"
              value={operatorName}
              onChange={(e) => {
                setOperatorName(e.target.value);
                setOperatorError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleStartRun()}
              autoFocus
            />
            {operatorError && (
              <label className="label">
                <span className="label-text-alt text-error">Name is required</span>
              </label>
            )}
          </div>
          <div className="modal-action">
            <a href={`${base}/`} className="btn btn-ghost">
              Cancel
            </a>
            <button className="btn btn-primary" onClick={handleStartRun} type="button">
              Start
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
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{progressPct}%</span>
        </div>
        <progress
          className="progress progress-primary w-full"
          value={progressPct}
          max="100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_260px] gap-4">
        {/* Left Panel */}
        <div className="bg-base-100 rounded-xl shadow p-4 h-fit lg:sticky lg:top-20">
          <h2 className="font-bold text-sm uppercase tracking-wide text-base-content/50 mb-3">
            Steps
          </h2>
          <StepNavigator run={run} onReview={setReviewStep} />
          <div className="divider my-3"></div>
          <button
            className="btn btn-outline btn-sm w-full"
            onClick={() => setShowAddStep(true)}
            type="button"
          >
            + Add Step
          </button>
        </div>

        {/* Center Panel */}
        <div className="bg-base-100 rounded-xl shadow">
          <div className="p-4 border-b border-base-200 flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold">{step?.title}</h2>
                <span className="badge badge-ghost">{step?.type}</span>
                {step?.addedAtRuntime && (
                  <span className="badge badge-warning">Added at runtime</span>
                )}
              </div>
            </div>
            <button
              className="btn btn-ghost btn-sm btn-circle"
              onClick={() => setShowInfoModal(true)}
              title="Step info"
              type="button"
            >
              ?
            </button>
          </div>

          {/* Subtask tabs */}
          {hasSubtasks && (
            <div className="px-4 pt-3">
              <div className="tabs tabs-bordered">
                {step.subtasks.map((sub, idx) => (
                  <button
                    key={sub.id}
                    className={`tab ${idx === run.currentSubtaskIndex ? "tab-active" : ""}`}
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
                    {sub.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Fields */}
          <div className="p-4">
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
          <div className="p-4 border-t border-base-200">
            <label className="label">
              <span className="label-text font-medium">
                Observations / Notes
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={3}
              placeholder="Add any observations or notes here…"
              value={step?.notes ?? ""}
              onChange={(e) => handleNotesChange(e.target.value)}
            />
          </div>

          {/* Footer nav */}
          <div className="p-4 border-t border-base-200 flex justify-between items-center">
            <button
              className="btn btn-outline"
              onClick={handlePrev}
              disabled={isPrevDisabled}
              type="button"
            >
              ← Previous
            </button>
            <span className="text-sm text-base-content/50">
              Step {run.currentStepIndex + 1}/{run.steps.length}
              {hasSubtasks &&
                ` · Subtask ${run.currentSubtaskIndex + 1}/${step.subtasks.length}`}
            </span>
            <button
              className={`btn ${isVeryLast ? "btn-success" : "btn-primary"}`}
              onClick={handleNext}
              type="button"
            >
              {isVeryLast
                ? "Finish & Generate Report"
                : isLastSubtask
                ? "Complete Step →"
                : "Next Subtask →"}
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-base-100 rounded-xl shadow p-4 h-fit lg:sticky lg:top-20">
          <h2 className="font-bold text-sm uppercase tracking-wide text-base-content/50 mb-3">
            Run Info
          </h2>
          <div className="space-y-2 text-sm mb-4">
            <div>
              <span className="text-base-content/50">Operator:</span>{" "}
              <span className="font-medium">{run.operatorName}</span>
            </div>
            <div>
              <span className="text-base-content/50">Started:</span>{" "}
              <span className="font-medium">
                {new Date(run.startedAt).toLocaleTimeString()}
              </span>
            </div>
            <div>
              <span className="text-base-content/50">Elapsed:</span>{" "}
              <ElapsedTimer startedAt={run.startedAt} />
            </div>
          </div>

          <div className="stats stats-vertical shadow w-full text-sm mb-4">
            <div className="stat py-2">
              <div className="stat-title text-xs">Total Steps</div>
              <div className="stat-value text-lg">{run.steps.length}</div>
            </div>
            <div className="stat py-2">
              <div className="stat-title text-xs">Completed</div>
              <div className="stat-value text-lg text-success">{completedCount}</div>
            </div>
            <div className="stat py-2">
              <div className="stat-title text-xs">Remaining</div>
              <div className="stat-value text-lg text-warning">
                {run.steps.filter((s) => s.status === "pending" || s.status === "active").length}
              </div>
            </div>
          </div>

          <div className="stats stats-vertical shadow w-full text-sm mb-4">
            <div className="stat py-2">
              <div className="stat-title text-xs">Pass</div>
              <div className="stat-value text-lg text-success">{passCount}</div>
            </div>
            <div className="stat py-2">
              <div className="stat-title text-xs">Fail</div>
              <div className="stat-value text-lg text-error">{failCount}</div>
            </div>
            <div className="stat py-2">
              <div className="stat-title text-xs">N/A</div>
              <div className="stat-value text-lg text-warning">{naCount}</div>
            </div>
          </div>

          <div
            className={`text-xs ${storageInfo.warningThreshold ? "text-warning font-medium" : "text-base-content/40"}`}
          >
            Storage: {storageInfo.usedMB} MB used
            {storageInfo.warningThreshold && " ⚠ Near limit"}
          </div>
        </div>
      </div>

      {/* Step Info Modal */}
      {showInfoModal && step && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg">{step.title}</h3>
            <p className="py-4 text-base-content/80 whitespace-pre-wrap">
              {step.description}
            </p>
            {step.subtasks.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Subtasks:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {step.subtasks.map((sub) => (
                    <li key={sub.id}>{sub.title}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setShowInfoModal(false)}
                type="button"
              >
                Close
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
