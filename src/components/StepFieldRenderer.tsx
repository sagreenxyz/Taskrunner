import React, { useState, useCallback } from "react";
import type { RunStep, CapturedField, FieldDefinition } from "../types/index.ts";

interface StepFieldRendererProps {
  step: RunStep;
  subtaskIndex: number;
  onChange: (stepId: string, fieldId: string, value: CapturedField["value"]) => void;
  onValidation?: (valid: boolean) => void;
}

function getFieldValue(
  captured: CapturedField[],
  fieldId: string
): CapturedField["value"] {
  const found = captured.find((c) => c.fieldId === fieldId);
  return found ? found.value : "";
}

function RepeaterField({
  field,
  value,
  onChange,
}: {
  field: FieldDefinition;
  value: CapturedField["value"];
  onChange: (val: string[][]) => void;
}) {
  const columns = field.options ?? ["Value"];
  const rawRows: string[][] = Array.isArray(value)
    ? (value as string[]).map((v) => {
        try {
          return JSON.parse(v) as string[];
        } catch {
          return [v];
        }
      })
    : [];

  const [rows, setRows] = useState<string[][]>(
    rawRows.length > 0 ? rawRows : []
  );

  const addRow = () => {
    const newRows = [...rows, columns.map(() => "")];
    setRows(newRows);
    onChange(newRows);
  };

  const deleteRow = (idx: number) => {
    const newRows = rows.filter((_, i) => i !== idx);
    setRows(newRows);
    onChange(newRows);
  };

  const updateCell = (rowIdx: number, colIdx: number, val: string) => {
    const newRows = rows.map((r, ri) =>
      ri === rowIdx ? r.map((c, ci) => (ci === colIdx ? val : c)) : r
    );
    setRows(newRows);
    onChange(newRows);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-sm w-full">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {columns.map((_, colIdx) => (
                <td key={colIdx}>
                  <input
                    className="input input-bordered input-sm w-full"
                    value={row[colIdx] ?? ""}
                    onChange={(e) => updateCell(rowIdx, colIdx, e.target.value)}
                  />
                </td>
              ))}
              <td>
                <button
                  className="btn btn-ghost btn-xs text-error"
                  onClick={() => deleteRow(rowIdx)}
                  type="button"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-outline btn-sm mt-2"
        onClick={addRow}
        type="button"
      >
        + Add Row
      </button>
    </div>
  );
}

function ToggleField({
  field,
  value,
  onChange,
}: {
  field: FieldDefinition;
  value: CapturedField["value"];
  onChange: (val: string) => void;
}) {
  const current = value as string;
  return (
    <div className="join w-full" role="group" aria-label={`${field.label} result`}>
      <button
        type="button"
        className={`join-item btn flex-1 gap-2 transition-all ${
          current === "Pass"
            ? "btn-success text-white font-bold"
            : "btn-ghost border border-base-300 hover:border-success hover:text-success"
        }`}
        onClick={() => onChange("Pass")}
        aria-pressed={current === "Pass"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
        Pass
      </button>
      <button
        type="button"
        className={`join-item btn flex-1 gap-2 transition-all ${
          current === "Fail"
            ? "btn-error text-white font-bold"
            : "btn-ghost border border-base-300 hover:border-error hover:text-error"
        }`}
        onClick={() => onChange("Fail")}
        aria-pressed={current === "Fail"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Fail
      </button>
      <button
        type="button"
        className={`join-item btn flex-1 gap-2 transition-all ${
          current === "N-A"
            ? "btn-warning text-white font-bold"
            : "btn-ghost border border-base-300 hover:border-warning hover:text-warning"
        }`}
        onClick={() => onChange("N-A")}
        aria-pressed={current === "N-A"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 12H6" />
        </svg>
        N/A
      </button>
    </div>
  );
}

export default function StepFieldRenderer({
  step,
  subtaskIndex,
  onChange,
  onValidation,
}: StepFieldRendererProps) {
  const hasSubtasks = step.subtasks && step.subtasks.length > 0;
  const activeSubtask =
    hasSubtasks ? step.subtasks[subtaskIndex] : null;
  const fields = activeSubtask ? activeSubtask.fields : step.fields;
  const captured = activeSubtask ? activeSubtask.captured : step.captured;

  const handleChange = useCallback(
    (fieldId: string, value: CapturedField["value"]) => {
      onChange(step.id, fieldId, value);
    },
    [step.id, onChange]
  );

  const isValid = fields
    .filter((f) => f.required)
    .every((f) => {
      const val = getFieldValue(captured, f.id);
      if (Array.isArray(val)) return val.length > 0;
      if (typeof val === "boolean") return true;
      return val !== "" && val !== null && val !== undefined;
    });

  React.useEffect(() => {
    onValidation?.(isValid);
  }, [isValid, onValidation]);

  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const val = getFieldValue(captured, field.id);

        return (
          <div key={field.id} className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                {field.label}
                {field.required && (
                  <span className="text-error ml-1">*</span>
                )}
                {field.unit && (
                  <span className="text-base-content/50 ml-1 text-sm">
                    ({field.unit})
                  </span>
                )}
              </span>
            </label>

            {field.type === "text" && (
              <input
                type="text"
                className="input input-bordered w-full"
                value={(val as string) || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}

            {field.type === "textarea" && (
              <textarea
                className="textarea textarea-bordered w-full"
                rows={3}
                value={(val as string) || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}

            {field.type === "number" && (
              <input
                type="number"
                className="input input-bordered w-full"
                value={(val as string) || ""}
                min={field.min}
                max={field.max}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}

            {field.type === "datetime" && (
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                value={(val as string) || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}

            {field.type === "select" && (
              <select
                className="select select-bordered w-full"
                value={(val as string) || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
              >
                <option value="">Select an option…</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {field.type === "multiselect" && (
              <div className="flex flex-col gap-2">
                {field.options?.map((opt) => {
                  const selected = Array.isArray(val)
                    ? (val as string[]).includes(opt)
                    : false;
                  return (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={selected}
                        onChange={(e) => {
                          const current = Array.isArray(val)
                            ? (val as string[])
                            : [];
                          const updated = e.target.checked
                            ? [...current, opt]
                            : current.filter((v) => v !== opt);
                          handleChange(field.id, updated);
                        }}
                      />
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {field.type === "toggle" && (
              <ToggleField
                field={field}
                value={val}
                onChange={(v) => handleChange(field.id, v)}
              />
            )}

            {field.type === "repeater" && (
              <RepeaterField
                field={field}
                value={val}
                onChange={(rows) => {
                  const serialized = rows.map((r) => JSON.stringify(r));
                  handleChange(field.id, serialized);
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
