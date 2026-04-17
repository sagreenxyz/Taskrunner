import type { ProcedureTemplate } from "../../types/index.ts";

export const foleyCatheterCare: ProcedureTemplate = {
  id: "foley-catheter-care",
  name: "Foley Catheter Care & Assessment",
  category: "Procedures",
  description:
    "Ongoing care and assessment of an indwelling urinary (Foley) catheter, including site inspection, securement, drainage assessment, tubing integrity, perineal care, and documentation of concerns.",
  estimatedMinutes: 15,
  steps: [
    {
      id: "fcc-step-1",
      title: "Patient Preparation",
      description: "Prepare patient and verify catheter indication before beginning care.",
      type: "info",
      fields: [
        { id: "fcc-f1", label: "Two patient identifiers confirmed", type: "toggle", required: true },
        { id: "fcc-f2", label: "Care Date/Time", type: "datetime", required: true },
        { id: "fcc-f3", label: "Catheter still indicated (order confirmed)", type: "toggle", required: true },
        { id: "fcc-f4", label: "CAUTI prevention bundle reviewed", type: "toggle", required: true },
        { id: "fcc-f5", label: "Patient privacy ensured (curtain / door closed)", type: "toggle", required: true },
        { id: "fcc-f6", label: "Patient consent / cooperation obtained", type: "toggle", required: true },
      ],
    },
    {
      id: "fcc-step-2",
      title: "Catheter Site Inspection",
      description: "Inspect the urethral insertion site and catheter integrity.",
      type: "form",
      fields: [
        { id: "fcc-f7", label: "Insertion site free of redness", type: "toggle", required: true },
        { id: "fcc-f8", label: "Insertion site free of swelling", type: "toggle", required: true },
        { id: "fcc-f9", label: "Insertion site free of discharge / exudate", type: "toggle", required: true },
        { id: "fcc-f10", label: "Patient reports no urethral pain or burning", type: "toggle", required: true },
        { id: "fcc-f11", label: "Site findings — details (if abnormal)", type: "textarea", required: false },
      ],
    },
    {
      id: "fcc-step-3",
      title: "Catheter Securement Check",
      description: "Verify the catheter is properly secured to prevent urethral trauma.",
      type: "checklist",
      fields: [
        { id: "fcc-f12", label: "Catheter secured to inner thigh (female) or abdomen (male)", type: "toggle", required: true },
        { id: "fcc-f13", label: "Securement device intact and adherent", type: "toggle", required: true },
        { id: "fcc-f14", label: "No tension on catheter or tubing at insertion site", type: "toggle", required: true },
        { id: "fcc-f15", label: "Catheter size (Fr)", type: "number", required: false, min: 8, max: 30, unit: "Fr" },
        { id: "fcc-f16", label: "Balloon volume verified (mL)", type: "number", required: false, min: 5, max: 30, unit: "mL" },
      ],
    },
    {
      id: "fcc-step-4",
      title: "Drainage Bag Assessment",
      description: "Assess drainage bag contents and position.",
      type: "form",
      fields: [
        { id: "fcc-f17", label: "Urine color", type: "select", required: true, options: ["Clear yellow (normal)", "Pale yellow", "Dark amber", "Orange", "Pink / light red", "Red / hematuria", "Brown", "Cloudy / turbid", "White / milky"] },
        { id: "fcc-f18", label: "Urine clarity", type: "select", required: true, options: ["Clear", "Slightly cloudy", "Cloudy", "Opaque"] },
        { id: "fcc-f19", label: "Urine volume in bag (mL)", type: "number", required: true, min: 0, unit: "mL" },
        { id: "fcc-f20", label: "Odor", type: "select", required: true, options: ["Normal (faint)", "No odor", "Malodorous / foul", "Ammonia-like"] },
        { id: "fcc-f21", label: "Drainage bag below bladder level", type: "toggle", required: true },
        { id: "fcc-f22", label: "Drainage bag not touching floor", type: "toggle", required: true },
        { id: "fcc-f23", label: "Bag emptied if ≥ 500 mL or at assessment", type: "toggle", required: true },
        { id: "fcc-f24", label: "Drainage bag observations — notes", type: "textarea", required: false },
      ],
    },
    {
      id: "fcc-step-5",
      title: "Tubing Integrity Check",
      description: "Inspect the drainage tubing for kinks, obstructions, or disconnections.",
      type: "checklist",
      fields: [
        { id: "fcc-f25", label: "Tubing free of kinks along entire length", type: "toggle", required: true },
        { id: "fcc-f26", label: "Tubing free of dependent loops (not looping below bag)", type: "toggle", required: true },
        { id: "fcc-f27", label: "All connections intact and secure (no leaks)", type: "toggle", required: true },
        { id: "fcc-f28", label: "Closed drainage system maintained (no breaks in circuit)", type: "toggle", required: true },
        { id: "fcc-f29", label: "Urine flowing freely (no obstruction / clot)", type: "toggle", required: true },
      ],
    },
    {
      id: "fcc-step-6",
      title: "Perineal Care",
      description: "Perform perineal hygiene to reduce CAUTI risk.",
      type: "checklist",
      fields: [
        { id: "fcc-f30", label: "Hand hygiene performed before care", type: "toggle", required: true },
        { id: "fcc-f31", label: "PPE (gloves) applied", type: "toggle", required: true },
        { id: "fcc-f32", label: "Perineal area cleansed with soap and water (front to back)", type: "toggle", required: true },
        { id: "fcc-f33", label: "Catheter cleaned at meatus (1 inch) without rotating", type: "toggle", required: true },
        { id: "fcc-f34", label: "Area thoroughly dried after cleaning", type: "toggle", required: true },
        { id: "fcc-f35", label: "Barrier cream applied (if indicated)", type: "toggle", required: false },
        { id: "fcc-f36", label: "Hand hygiene performed after care", type: "toggle", required: true },
      ],
    },
    {
      id: "fcc-step-7",
      title: "Documentation & Concerns",
      description: "Document care provided and any concerns identified.",
      type: "capture",
      fields: [
        { id: "fcc-f37", label: "Any signs / symptoms of CAUTI (fever, chills, flank pain, hematuria)", type: "toggle", required: true },
        { id: "fcc-f38", label: "Provider notified of concerns", type: "toggle", required: false },
        { id: "fcc-f39", label: "Catheter removal discussed / recommended", type: "toggle", required: false },
        { id: "fcc-f40", label: "Urine output documented in I&O record", type: "toggle", required: true },
        { id: "fcc-f41", label: "Additional concerns or findings", type: "textarea", required: false },
        { id: "fcc-f42", label: "Nurse signature", type: "text", required: true },
      ],
    },
  ],
};

export const foleyCatheterCareTemplates: ProcedureTemplate[] = [
  foleyCatheterCare,
];
