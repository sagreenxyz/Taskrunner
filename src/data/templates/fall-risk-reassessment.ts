import type { ProcedureTemplate } from "../../types/index.ts";

export const fallRiskReassessment: ProcedureTemplate = {
  id: "fall-risk-reassessment",
  name: "Fall Risk Reassessment (Morse Fall Scale)",
  category: "Assessment",
  description:
    "Structured fall risk reassessment using Morse Fall Scale scoring covering history of falls, secondary diagnoses, ambulatory aids, IV access, gait, and mental status. Generates a total risk score and drives intervention selection.",
  estimatedMinutes: 10,
  steps: [
    {
      id: "frr-step-1",
      title: "Patient Identification & Context",
      description: "Confirm patient identity and document the reason for reassessment.",
      type: "info",
      fields: [
        { id: "frr-f1", label: "Two patient identifiers confirmed", type: "toggle", required: true },
        { id: "frr-f2", label: "Reassessment Date/Time", type: "datetime", required: true },
        { id: "frr-f3", label: "Reason for reassessment", type: "select", required: true, options: ["Routine (shift reassessment)", "Change in condition", "After a fall event", "Change in mobility status", "Medication change", "Transfer from another unit"] },
        { id: "frr-f4", label: "Previous fall risk level on record", type: "select", required: false, options: ["Low (<25)", "Moderate (25–44)", "High (≥45)", "Not on record"] },
      ],
    },
    {
      id: "frr-step-2",
      title: "Morse Fall Scale Scoring",
      description: "Score each Morse Fall Scale item. Total will be calculated in the next step.",
      type: "form",
      fields: [
        {
          id: "frr-f5",
          label: "History of falling (within 3 months) — Score",
          type: "select",
          required: true,
          options: ["0 — No", "25 — Yes"],
        },
        {
          id: "frr-f6",
          label: "Secondary diagnosis (≥2 medical diagnoses) — Score",
          type: "select",
          required: true,
          options: ["0 — No", "15 — Yes"],
        },
        {
          id: "frr-f7",
          label: "Ambulatory aid — Score",
          type: "select",
          required: true,
          options: [
            "0 — None / bed rest / nurse assist",
            "15 — Crutches / cane / walker",
            "30 — Furniture",
          ],
        },
        {
          id: "frr-f8",
          label: "IV access / heparin lock — Score",
          type: "select",
          required: true,
          options: ["0 — No", "20 — Yes"],
        },
        {
          id: "frr-f9",
          label: "Gait — Score",
          type: "select",
          required: true,
          options: [
            "0 — Normal / bedrest / immobile",
            "10 — Weak",
            "20 — Impaired",
          ],
        },
        {
          id: "frr-f10",
          label: "Mental status — Score",
          type: "select",
          required: true,
          options: [
            "0 — Oriented to own ability",
            "15 — Overestimates ability / forgets limitations",
          ],
        },
        {
          id: "frr-f11",
          label: "Total Morse Fall Scale Score (enter calculated sum)",
          type: "number",
          required: true,
          min: 0,
          max: 125,
        },
      ],
    },
    {
      id: "frr-step-3",
      title: "Risk Classification",
      description: "Classify fall risk level based on the total Morse Fall Scale score.",
      type: "info",
      fields: [
        {
          id: "frr-f12",
          label: "Risk level assigned",
          type: "select",
          required: true,
          options: ["Low (score 0–24)", "Moderate (score 25–44)", "High (score ≥45)"],
        },
        {
          id: "frr-f13",
          label: "Score has changed since last assessment",
          type: "toggle",
          required: true,
        },
        {
          id: "frr-f14",
          label: "Provider notified of change in risk level",
          type: "toggle",
          required: false,
        },
      ],
    },
    {
      id: "frr-step-4",
      title: "Fall Prevention Interventions",
      description: "Document fall prevention interventions implemented based on risk level.",
      type: "checklist",
      fields: [
        { id: "frr-f15", label: "Call light within reach and patient instructed on use", type: "toggle", required: true },
        { id: "frr-f16", label: "Bed in lowest position, brakes locked", type: "toggle", required: true },
        { id: "frr-f17", label: "Non-slip footwear provided", type: "toggle", required: true },
        { id: "frr-f18", label: "Fall risk armband applied", type: "toggle", required: false },
        { id: "frr-f19", label: "Fall risk sign posted at bedside / door (moderate/high)", type: "toggle", required: false },
        { id: "frr-f20", label: "Bed / chair alarm activated (high risk)", type: "toggle", required: false },
        { id: "frr-f21", label: "1:1 sitter ordered or in place (high risk / post-fall)", type: "toggle", required: false },
        { id: "frr-f22", label: "Medications reviewed for fall risk contributors", type: "toggle", required: false },
        { id: "frr-f23", label: "Environmental hazards cleared (IV tubing, equipment)", type: "toggle", required: true },
        { id: "frr-f24", label: "Patient and family educated on fall prevention", type: "toggle", required: true },
      ],
    },
    {
      id: "frr-step-5",
      title: "Documentation & Sign-Off",
      description: "Finalize reassessment documentation.",
      type: "signature",
      fields: [
        { id: "frr-f25", label: "Care plan updated to reflect current risk level", type: "toggle", required: true },
        { id: "frr-f26", label: "Additional notes", type: "textarea", required: false },
        { id: "frr-f27", label: "Nurse signature", type: "text", required: true },
      ],
    },
  ],
};

export const fallRiskReassessmentTemplates: ProcedureTemplate[] = [
  fallRiskReassessment,
];
