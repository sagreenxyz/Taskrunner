import type { ProcedureTemplate } from "../../types/index.ts";
import { assessmentTemplates } from "./nursing-assessments.ts";
import { medicationTemplates } from "./nursing-medication.ts";
import { patientCareTemplates } from "./nursing-patient-care.ts";
import { procedureTemplates } from "./nursing-procedures.ts";
import { monitoringTemplates } from "./nursing-monitoring.ts";
import { safetyDocumentationTemplates } from "./nursing-safety-documentation.ts";

export const templateRegistry: ProcedureTemplate[] = [
  ...assessmentTemplates,
  ...medicationTemplates,
  ...patientCareTemplates,
  ...procedureTemplates,
  ...monitoringTemplates,
  ...safetyDocumentationTemplates,
];
