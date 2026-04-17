import React, { useState, useCallback } from "react";
import type { RunStep, StepType, FieldType, FieldDefinition } from "../types/index.ts";
import { templateRegistry } from "../data/templates/index.ts";

interface AddStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (step: RunStep, insertAfterIndex: number) => void;
  currentStepIndex: number;
  totalSteps: number;
}

const STEP_TYPES: { type: StepType; label: string; desc: string }[] = [
  { type: "info", label: "Info", desc: "Informational step with no data capture" },
  { type: "checklist", label: "Checklist", desc: "A series of items to check off" },
  { type: "form", label: "Form", desc: "Structured data entry form" },
  { type: "capture", label: "Capture", desc: "Capture evidence or data" },
  { type: "decision", label: "Decision", desc: "A decision point in the procedure" },
  { type: "timed", label: "Timed", desc: "Step with time tracking" },
  { type: "signature", label: "Signature", desc: "Sign-off step" },
];

const FIELD_TYPES: { type: FieldType; label: string }[] = [
  { type: "text", label: "Text" },
  { type: "textarea", label: "Textarea" },
  { type: "number", label: "Number" },
  { type: "select", label: "Select" },
  { type: "multiselect", label: "Multi-select" },
  { type: "toggle", label: "Pass/Fail/N-A Toggle" },
  { type: "datetime", label: "Date/Time" },
  { type: "repeater", label: "Repeater Table" },
];

function createRunStep(
  title: string,
  type: StepType,
  description: string,
  fields: FieldDefinition[]
): RunStep {
  return {
    id: `custom-${crypto.randomUUID()}`,
    title,
    description,
    type,
    fields,
    captured: [],
    subtasks: [],
    status: "pending",
    addedAtRuntime: true,
    notes: "",
  };
}

export default function AddStepModal({
  isOpen,
  onClose,
  onInsert,
  currentStepIndex,
  totalSteps,
}: AddStepModalProps) {
  const [activeTab, setActiveTab] = useState<"quick" | "templates">("quick");
  const [title, setTitle] = useState("");
  const [stepType, setStepType] = useState<StepType>("form");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<FieldDefinition[]>([]);
  const [insertAfter, setInsertAfter] = useState(currentStepIndex);
  const [templateSearch, setTemplateSearch] = useState("");

  const addField = () => {
    setFields((prev) => [
      ...prev,
      { id: `field-${crypto.randomUUID()}`, label: "", type: "text", required: false },
    ]);
  };

  const updateField = (idx: number, updates: Partial<FieldDefinition>) => {
    setFields((prev) =>
      prev.map((f, i) => (i === idx ? { ...f, ...updates } : f))
    );
  };

  const removeField = (idx: number) => {
    setFields((prev) => prev.filter((_, i) => i !== idx));
  };

  const moveField = (idx: number, dir: -1 | 1) => {
    setFields((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const handleQuickAdd = () => {
    if (!title.trim()) return;
    const step = createRunStep(title.trim(), stepType, description, fields);
    onInsert(step, insertAfter);
    resetForm();
    onClose();
  };

  const handleTemplateInsert = (templateId: string, stepId: string) => {
    const tmpl = templateRegistry.find((t) => t.id === templateId);
    if (!tmpl) return;
    const templateStep = tmpl.steps.find((s) => s.id === stepId);
    if (!templateStep) return;

    const runStep: RunStep = {
      ...JSON.parse(JSON.stringify(templateStep)),
      id: `runtime-${crypto.randomUUID()}`,
      captured: [],
      subtasks: (templateStep.subtasks ?? []).map((sub) => ({
        ...JSON.parse(JSON.stringify(sub)),
        captured: [],
        completedAt: undefined,
      })),
      status: "pending",
      addedAtRuntime: true,
      notes: "",
    };
    onInsert(runStep, insertAfter);
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setStepType("form");
    setDescription("");
    setFields([]);
    setInsertAfter(currentStepIndex);
  };

  const filteredTemplates = templateRegistry.map((tmpl) => ({
    ...tmpl,
    steps: tmpl.steps.filter(
      (s) =>
        !templateSearch ||
        s.title.toLowerCase().includes(templateSearch.toLowerCase())
    ),
  })).filter((tmpl) => tmpl.steps.length > 0);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl w-full">
        <h3 className="font-bold text-lg mb-4">Add Step</h3>

        <div className="tabs tabs-boxed mb-4">
          <button
            className={`tab ${activeTab === "quick" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("quick")}
            type="button"
          >
            Quick Add
          </button>
          <button
            className={`tab ${activeTab === "templates" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("templates")}
            type="button"
          >
            From Templates
          </button>
        </div>

        {activeTab === "quick" && (
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Step Title <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter step title"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Step Type</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {STEP_TYPES.map(({ type, label, desc }) => (
                  <label
                    key={type}
                    className={`border rounded-lg p-2 cursor-pointer hover:bg-base-200 transition-colors ${
                      stepType === type ? "border-primary bg-primary/10" : "border-base-300"
                    }`}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      name="step-type"
                      value={type}
                      checked={stepType === type}
                      onChange={() => setStepType(type)}
                    />
                    <div className="font-medium text-sm">{label}</div>
                    <div className="text-xs text-base-content/60">{desc}</div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Fields</span>
              </label>
              <div className="space-y-2">
                {fields.map((field, idx) => (
                  <div key={field.id} className="flex gap-2 items-center bg-base-200 p-2 rounded-lg">
                    <input
                      type="text"
                      className="input input-bordered input-sm flex-1"
                      value={field.label}
                      onChange={(e) => updateField(idx, { label: e.target.value })}
                      placeholder="Field name"
                    />
                    <select
                      className="select select-bordered select-sm"
                      value={field.type}
                      onChange={(e) => updateField(idx, { type: e.target.value as FieldType })}
                    >
                      {FIELD_TYPES.map(({ type, label }) => (
                        <option key={type} value={type}>{label}</option>
                      ))}
                    </select>
                    <label className="flex items-center gap-1 text-sm">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={field.required ?? false}
                        onChange={(e) => updateField(idx, { required: e.target.checked })}
                      />
                      Req
                    </label>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => moveField(idx, -1)}
                      type="button"
                      title="Move up"
                    >
                      ↑
                    </button>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => moveField(idx, 1)}
                      type="button"
                      title="Move down"
                    >
                      ↓
                    </button>
                    <button
                      className="btn btn-ghost btn-xs text-error"
                      onClick={() => removeField(idx)}
                      type="button"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  className="btn btn-outline btn-sm w-full"
                  onClick={addField}
                  type="button"
                >
                  + Add Field
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Insert After Step</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={insertAfter}
                onChange={(e) => setInsertAfter(Number(e.target.value))}
              >
                {Array.from({ length: totalSteps }, (_, i) => (
                  <option key={i} value={i}>
                    Step {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-action">
              <button className="btn btn-ghost" onClick={onClose} type="button">
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleQuickAdd}
                disabled={!title.trim()}
                type="button"
              >
                Add Step
              </button>
            </div>
          </div>
        )}

        {activeTab === "templates" && (
          <div className="space-y-4">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Search steps by title…"
              value={templateSearch}
              onChange={(e) => setTemplateSearch(e.target.value)}
            />

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Insert After Step</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={insertAfter}
                onChange={(e) => setInsertAfter(Number(e.target.value))}
              >
                {Array.from({ length: totalSteps }, (_, i) => (
                  <option key={i} value={i}>
                    Step {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {filteredTemplates.length === 0 ? (
              <div className="text-center text-base-content/60 py-8">
                No steps found matching your search
              </div>
            ) : (
              filteredTemplates.map((tmpl) => (
                <div key={tmpl.id} className="collapse collapse-arrow border border-base-300 rounded-lg">
                  <input type="checkbox" defaultChecked />
                  <div className="collapse-title font-medium">{tmpl.name}</div>
                  <div className="collapse-content space-y-2">
                    {tmpl.steps.map((step) => (
                      <div
                        key={step.id}
                        className="flex items-center justify-between gap-2 p-2 bg-base-200 rounded"
                      >
                        <div>
                          <span className="font-medium text-sm">{step.title}</span>
                          <span className="badge badge-ghost badge-sm ml-2">
                            {step.type}
                          </span>
                        </div>
                        <button
                          className="btn btn-primary btn-xs"
                          onClick={() => handleTemplateInsert(tmpl.id, step.id)}
                          type="button"
                        >
                          Insert
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}

            <div className="modal-action">
              <button className="btn btn-ghost" onClick={onClose} type="button">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
}
