export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "multiselect"
  | "toggle"
  | "datetime"
  | "repeater";

export type StepType =
  | "info"
  | "checklist"
  | "form"
  | "capture"
  | "decision"
  | "timed"
  | "signature";

export interface FieldDefinition {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  min?: number;
  max?: number;
  unit?: string;
}

export interface SubTask {
  id: string;
  title: string;
  description?: string;
  fields: FieldDefinition[];
}

export interface TemplateStep {
  id: string;
  title: string;
  description: string;
  type: StepType;
  fields: FieldDefinition[];
  subtasks?: SubTask[];
}

export interface ProcedureTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  estimatedMinutes: number;
  steps: TemplateStep[];
}

export interface CapturedField {
  fieldId: string;
  value: string | string[] | boolean;
}

export interface RunSubTask extends SubTask {
  captured: CapturedField[];
  completedAt?: string;
}

export interface RunStep extends Omit<TemplateStep, "subtasks"> {
  captured: CapturedField[];
  subtasks: RunSubTask[];
  status: "pending" | "active" | "complete" | "skipped";
  startedAt?: string;
  completedAt?: string;
  addedAtRuntime?: boolean;
  notes?: string;
}

export interface ProcedureRun {
  runId: string;
  templateId: string;
  templateName: string;
  operatorName: string;
  startedAt: string;
  completedAt?: string;
  currentStepIndex: number;
  currentSubtaskIndex: number;
  steps: RunStep[];
}

export interface RunSummary {
  runId: string;
  templateId: string;
  templateName: string;
  operatorName: string;
  startedAt: string;
  completedAt: string;
  stepCount: number;
  passCount: number;
  failCount: number;
  naCount: number;
}
