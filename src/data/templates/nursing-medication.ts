import type { ProcedureTemplate } from "../../types/index.ts";

export const oralMedicationAdministration: ProcedureTemplate = {
  id: "oral-medication-administration",
  name: "Oral Medication Administration",
  category: "Medication",
  description:
    "Safe administration of oral medications using the 5 Rights and two-patient-identifier verification.",
  estimatedMinutes: 10,
  steps: [
    {
      id: "om-step-1",
      title: "Medication Verification (5 Rights)",
      description:
        "Verify all five rights of medication administration before preparing the dose.",
      type: "checklist",
      fields: [
        { id: "om-f1", label: "Right Patient — Two identifiers confirmed", type: "toggle", required: true },
        { id: "om-f2", label: "Right Medication — Match order to label", type: "toggle", required: true },
        { id: "om-f3", label: "Right Dose — Dose verified", type: "toggle", required: true },
        { id: "om-f4", label: "Right Route — Oral route appropriate", type: "toggle", required: true },
        { id: "om-f5", label: "Right Time — Within administration window", type: "toggle", required: true },
        { id: "om-f6", label: "Allergies reviewed — No contraindications", type: "toggle", required: true },
        { id: "om-f7", label: "Medication Name", type: "text", required: true },
        { id: "om-f8", label: "Dose (mg or units)", type: "text", required: true },
      ],
    },
    {
      id: "om-step-2",
      title: "Pre-administration Assessment",
      description: "Assess any clinical parameters required before giving the medication.",
      type: "form",
      fields: [
        { id: "om-f9", label: "Parameters required (e.g., BP, HR, blood glucose)", type: "textarea", required: false },
        { id: "om-f10", label: "Parameters within acceptable range", type: "toggle", required: true },
        { id: "om-f11", label: "Patient able to swallow", type: "toggle", required: true },
        { id: "om-f12", label: "NPO status confirmed (no conflict)", type: "toggle", required: true },
      ],
    },
    {
      id: "om-step-3",
      title: "Administration",
      description: "Administer medication and observe patient.",
      type: "form",
      fields: [
        { id: "om-f13", label: "Medication administered", type: "toggle", required: true },
        { id: "om-f14", label: "Patient tolerated medication without issue", type: "toggle", required: true },
        { id: "om-f15", label: "Administration Date/Time", type: "datetime", required: true },
        { id: "om-f16", label: "Notes / Reason for hold if not given", type: "textarea", required: false },
      ],
    },
  ],
};

export const ivMedicationAdministration: ProcedureTemplate = {
  id: "iv-medication-administration",
  name: "IV Medication Administration",
  category: "Medication",
  description:
    "Safe preparation and administration of intravenous medications including verification, site assessment, and monitoring.",
  estimatedMinutes: 20,
  steps: [
    {
      id: "iv-step-1",
      title: "Order Verification & Preparation",
      description: "Verify physician order and prepare medication using aseptic technique.",
      type: "checklist",
      fields: [
        { id: "iv-f1", label: "Physician order verified", type: "toggle", required: true },
        { id: "iv-f2", label: "Medication, dose, rate, and diluent correct", type: "toggle", required: true },
        { id: "iv-f3", label: "Two-patient identifiers confirmed", type: "toggle", required: true },
        { id: "iv-f4", label: "Allergies reviewed", type: "toggle", required: true },
        { id: "iv-f5", label: "Medication label checked against MAR", type: "toggle", required: true },
        { id: "iv-f6", label: "Medication Name", type: "text", required: true },
        { id: "iv-f7", label: "Dose / Concentration", type: "text", required: true },
        { id: "iv-f8", label: "Infusion rate (mL/hr)", type: "number", required: true, unit: "mL/hr" },
      ],
    },
    {
      id: "iv-step-2",
      title: "IV Site Assessment",
      description: "Inspect IV access site prior to administration.",
      type: "form",
      fields: [
        { id: "iv-f9", label: "IV access type", type: "select", required: true, options: ["Peripheral IV", "Central line", "PICC", "Port"] },
        { id: "iv-f10", label: "Site free of redness, swelling, or infiltration", type: "toggle", required: true },
        { id: "iv-f11", label: "Line flushes freely", type: "toggle", required: true },
        { id: "iv-f12", label: "Blood return confirmed (if required)", type: "toggle", required: false },
        { id: "iv-f13", label: "IV site location", type: "text", required: true },
      ],
    },
    {
      id: "iv-step-3",
      title: "Infusion & Monitoring",
      description: "Initiate infusion and monitor patient during administration.",
      type: "timed",
      fields: [
        { id: "iv-f14", label: "Infusion started", type: "toggle", required: true },
        { id: "iv-f15", label: "Start time", type: "datetime", required: true },
        { id: "iv-f16", label: "Pump programmed and verified", type: "toggle", required: true },
        { id: "iv-f17", label: "Adverse reaction observed", type: "toggle", required: true },
        { id: "iv-f18", label: "Adverse reaction details", type: "textarea", required: false },
        { id: "iv-f19", label: "Infusion Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const imSubcutaneousInjection: ProcedureTemplate = {
  id: "im-subcutaneous-injection",
  name: "IM / Subcutaneous Injection",
  category: "Medication",
  description:
    "Intramuscular or subcutaneous injection procedure including site selection, technique, and post-injection monitoring.",
  estimatedMinutes: 10,
  steps: [
    {
      id: "inj-step-1",
      title: "Medication Verification",
      description: "Verify medication and confirm route with the order.",
      type: "checklist",
      fields: [
        { id: "inj-f1", label: "Two patient identifiers confirmed", type: "toggle", required: true },
        { id: "inj-f2", label: "Medication order verified", type: "toggle", required: true },
        { id: "inj-f3", label: "Dose drawn up correctly", type: "toggle", required: true },
        { id: "inj-f4", label: "Correct needle size selected for route", type: "toggle", required: true },
        { id: "inj-f5", label: "Medication Name & Dose", type: "text", required: true },
        { id: "inj-f6", label: "Route", type: "select", required: true, options: ["Intramuscular (IM)", "Subcutaneous (SQ)"] },
      ],
    },
    {
      id: "inj-step-2",
      title: "Site Selection & Preparation",
      description: "Select and prepare the injection site.",
      type: "form",
      fields: [
        { id: "inj-f7", label: "Injection site selected", type: "select", required: true, options: ["Deltoid (IM)", "Ventrogluteal (IM)", "Vastus lateralis (IM)", "Abdomen (SQ)", "Upper arm (SQ)", "Thigh (SQ)"] },
        { id: "inj-f8", label: "Site free of lesions / bruising", type: "toggle", required: true },
        { id: "inj-f9", label: "Site cleaned with antiseptic and allowed to dry", type: "toggle", required: true },
        { id: "inj-f10", label: "Rotation documented (if ongoing therapy)", type: "toggle", required: false },
      ],
    },
    {
      id: "inj-step-3",
      title: "Injection & Post-injection Assessment",
      description: "Administer injection and monitor for adverse effects.",
      type: "timed",
      fields: [
        { id: "inj-f11", label: "Injection administered", type: "toggle", required: true },
        { id: "inj-f12", label: "Aspiration performed (if IM per policy)", type: "toggle", required: false },
        { id: "inj-f13", label: "Administration Date/Time", type: "datetime", required: true },
        { id: "inj-f14", label: "Immediate adverse reaction", type: "toggle", required: true },
        { id: "inj-f15", label: "Patient tolerated procedure", type: "toggle", required: true },
        { id: "inj-f16", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const insulinAdministration: ProcedureTemplate = {
  id: "insulin-administration",
  name: "Insulin Administration",
  category: "Medication",
  description:
    "Safe insulin administration including blood glucose check, dose calculation, site rotation, and documentation.",
  estimatedMinutes: 12,
  steps: [
    {
      id: "ins-step-1",
      title: "Blood Glucose Check",
      description: "Obtain and document current blood glucose prior to administration.",
      type: "form",
      fields: [
        { id: "ins-f1", label: "Two patient identifiers confirmed", type: "toggle", required: true },
        { id: "ins-f2", label: "Blood Glucose (mg/dL)", type: "number", required: true, min: 0, max: 600, unit: "mg/dL" },
        { id: "ins-f3", label: "Measurement Date/Time", type: "datetime", required: true },
        { id: "ins-f4", label: "Patient is eating / about to eat", type: "toggle", required: false },
      ],
    },
    {
      id: "ins-step-2",
      title: "Dose Verification",
      description: "Verify insulin type, dose, and have a second nurse witness if required by policy.",
      type: "checklist",
      fields: [
        { id: "ins-f5", label: "Insulin type matches order", type: "toggle", required: true },
        { id: "ins-f6", label: "Dose calculated per sliding scale / order", type: "toggle", required: true },
        { id: "ins-f7", label: "Dose (units)", type: "number", required: true, unit: "units" },
        { id: "ins-f8", label: "Second nurse verification completed (if high-alert policy)", type: "toggle", required: false },
        { id: "ins-f9", label: "Verifying Nurse (Full Name)", type: "text", required: false },
      ],
    },
    {
      id: "ins-step-3",
      title: "Injection & Documentation",
      description: "Administer insulin and document site rotation.",
      type: "form",
      fields: [
        { id: "ins-f10", label: "Injection site", type: "select", required: true, options: ["Abdomen", "Upper arm", "Thigh", "Buttock"] },
        { id: "ins-f11", label: "Previous site rotated", type: "toggle", required: true },
        { id: "ins-f12", label: "Insulin administered", type: "toggle", required: true },
        { id: "ins-f13", label: "Administration Date/Time", type: "datetime", required: true },
        { id: "ins-f14", label: "Hypoglycemia precautions reviewed with patient", type: "toggle", required: true },
        { id: "ins-f15", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const bloodTransfusion: ProcedureTemplate = {
  id: "blood-transfusion",
  name: "Blood Transfusion Administration",
  category: "Medication",
  description:
    "Safe blood product transfusion including pre-transfusion verification, two-nurse check, monitoring, and post-transfusion documentation.",
  estimatedMinutes: 60,
  steps: [
    {
      id: "bt-step-1",
      title: "Pre-Transfusion Verification",
      description: "Perform two-nurse blood product verification at the bedside.",
      type: "checklist",
      fields: [
        { id: "bt-f1", label: "Informed consent obtained", type: "toggle", required: true },
        { id: "bt-f2", label: "Patient identity confirmed with two identifiers", type: "toggle", required: true },
        { id: "bt-f3", label: "Blood bank ID band matches", type: "toggle", required: true },
        { id: "bt-f4", label: "Blood type and crossmatch verified", type: "toggle", required: true },
        { id: "bt-f5", label: "Unit number matches transfusion record", type: "toggle", required: true },
        { id: "bt-f6", label: "Expiration date / time within range", type: "toggle", required: true },
        { id: "bt-f7", label: "Product visually inspected (no clots, unusual color)", type: "toggle", required: true },
        { id: "bt-f8", label: "Verifying Nurse (Full Name)", type: "text", required: true },
        { id: "bt-f9", label: "Blood Product Type", type: "select", required: true, options: ["Packed Red Blood Cells", "Fresh Frozen Plasma", "Platelets", "Cryoprecipitate", "Whole Blood"] },
      ],
    },
    {
      id: "bt-step-2",
      title: "Baseline Assessment",
      description: "Document baseline vital signs before starting the transfusion.",
      type: "form",
      fields: [
        { id: "bt-f10", label: "Baseline Temperature (°F)", type: "number", required: true, min: 90, max: 110, unit: "°F" },
        { id: "bt-f11", label: "Baseline Heart Rate (bpm)", type: "number", required: true, min: 0, max: 300, unit: "bpm" },
        { id: "bt-f12", label: "Baseline Blood Pressure (mmHg)", type: "text", required: true },
        { id: "bt-f13", label: "Baseline SpO₂ (%)", type: "number", required: true, min: 0, max: 100, unit: "%" },
        { id: "bt-f14", label: "IV access patent and appropriate gauge", type: "toggle", required: true },
      ],
    },
    {
      id: "bt-step-3",
      title: "Transfusion Monitoring",
      description: "Monitor patient closely, especially during the first 15 minutes.",
      type: "timed",
      fields: [
        { id: "bt-f15", label: "Transfusion started at", type: "datetime", required: true },
        { id: "bt-f16", label: "15-minute vital signs stable", type: "toggle", required: true },
        { id: "bt-f17", label: "Signs of transfusion reaction", type: "toggle", required: true },
        { id: "bt-f18", label: "Reaction type / actions taken", type: "textarea", required: false },
        { id: "bt-f19", label: "Infusion rate (mL/hr)", type: "number", required: true, unit: "mL/hr" },
      ],
    },
    {
      id: "bt-step-4",
      title: "Post-Transfusion Assessment",
      description: "Document post-transfusion vital signs and patient response.",
      type: "form",
      fields: [
        { id: "bt-f20", label: "Transfusion completed at", type: "datetime", required: true },
        { id: "bt-f21", label: "Post-transfusion Temperature (°F)", type: "number", required: true, min: 90, max: 110, unit: "°F" },
        { id: "bt-f22", label: "Post-transfusion Heart Rate (bpm)", type: "number", required: true, min: 0, max: 300, unit: "bpm" },
        { id: "bt-f23", label: "Post-transfusion Blood Pressure (mmHg)", type: "text", required: true },
        { id: "bt-f24", label: "Patient tolerated transfusion without reaction", type: "toggle", required: true },
        { id: "bt-f25", label: "Blood bag returned to blood bank per policy", type: "toggle", required: true },
      ],
    },
  ],
};

export const pcaPumpManagement: ProcedureTemplate = {
  id: "pca-pump-management",
  name: "PCA Pump Management",
  category: "Medication",
  description:
    "Patient-controlled analgesia (PCA) pump setup, patient education, and ongoing safety monitoring.",
  estimatedMinutes: 20,
  steps: [
    {
      id: "pca-step-1",
      title: "PCA Setup & Order Verification",
      description: "Verify PCA order and program the pump with a second nurse witness.",
      type: "checklist",
      fields: [
        { id: "pca-f1", label: "PCA order verified", type: "toggle", required: true },
        { id: "pca-f2", label: "Opioid type and concentration correct", type: "toggle", required: true },
        { id: "pca-f3", label: "Demand dose programmed", type: "toggle", required: true },
        { id: "pca-f4", label: "Lockout interval programmed", type: "toggle", required: true },
        { id: "pca-f5", label: "4-hour limit set", type: "toggle", required: true },
        { id: "pca-f6", label: "Second nurse verification completed", type: "toggle", required: true },
        { id: "pca-f7", label: "Verifying Nurse (Full Name)", type: "text", required: true },
        { id: "pca-f8", label: "Anti-siphon / anti-reflux valve in place", type: "toggle", required: true },
      ],
    },
    {
      id: "pca-step-2",
      title: "Baseline Assessment",
      description: "Assess patient prior to initiating PCA therapy.",
      type: "form",
      fields: [
        { id: "pca-f9", label: "Pain score (0–10)", type: "number", required: true, min: 0, max: 10 },
        { id: "pca-f10", label: "Respiratory rate (breaths/min)", type: "number", required: true, min: 0, max: 60, unit: "breaths/min" },
        { id: "pca-f11", label: "SpO₂ (%)", type: "number", required: true, min: 0, max: 100, unit: "%" },
        { id: "pca-f12", label: "Sedation scale score", type: "select", required: true, options: ["S — Sleeping, easily aroused", "1 — Awake and alert", "2 — Slightly drowsy", "3 — Frequently drowsy", "4 — Somnolent"] },
      ],
    },
    {
      id: "pca-step-3",
      title: "Patient Education",
      description: "Teach patient how to use the PCA device safely.",
      type: "checklist",
      fields: [
        { id: "pca-f13", label: "Patient instructed on demand button use", type: "toggle", required: true },
        { id: "pca-f14", label: "Patient instructed NOT to allow others to press button", type: "toggle", required: true },
        { id: "pca-f15", label: "Patient understands lockout interval", type: "toggle", required: true },
        { id: "pca-f16", label: "Patient verbalized understanding", type: "toggle", required: true },
      ],
    },
    {
      id: "pca-step-4",
      title: "Ongoing Monitoring",
      description: "Perform and document regular PCA safety assessments.",
      type: "form",
      fields: [
        { id: "pca-f17", label: "Assessment Date/Time", type: "datetime", required: true },
        { id: "pca-f18", label: "Respiratory rate within safe range", type: "toggle", required: true },
        { id: "pca-f19", label: "Sedation level acceptable", type: "toggle", required: true },
        { id: "pca-f20", label: "Pain adequately controlled", type: "toggle", required: true },
        { id: "pca-f21", label: "Total doses attempted / delivered", type: "text", required: false },
        { id: "pca-f22", label: "Naloxone available at bedside", type: "toggle", required: true },
      ],
    },
  ],
};

export const enteralTubeFeeding: ProcedureTemplate = {
  id: "enteral-tube-feeding",
  name: "Enteral Tube Feeding (NG/PEG)",
  category: "Medication",
  description:
    "Administration of enteral nutrition via nasogastric or PEG tube including placement verification, residual check, and feeding.",
  estimatedMinutes: 20,
  steps: [
    {
      id: "etf-step-1",
      title: "Tube Placement Verification",
      description: "Confirm correct feeding tube placement before initiating feeding.",
      type: "checklist",
      fields: [
        { id: "etf-f1", label: "Two patient identifiers confirmed", type: "toggle", required: true },
        { id: "etf-f2", label: "Tube type and size", type: "select", required: true, options: ["Nasogastric (NG)", "Nasoenteric (NE)", "PEG tube", "PEJ tube"] },
        { id: "etf-f3", label: "Tube placement confirmed per x-ray or pH testing", type: "toggle", required: true },
        { id: "etf-f4", label: "External tube length / marking verified", type: "toggle", required: true },
        { id: "etf-f5", label: "Head of bed elevated ≥ 30°", type: "toggle", required: true },
      ],
    },
    {
      id: "etf-step-2",
      title: "Gastric Residual Check",
      description: "Check gastric residual volume and assess tolerance.",
      type: "form",
      fields: [
        { id: "etf-f6", label: "Gastric residual volume (mL)", type: "number", required: true, min: 0, unit: "mL" },
        { id: "etf-f7", label: "Residual within acceptable limit (per protocol)", type: "toggle", required: true },
        { id: "etf-f8", label: "Residual returned to patient", type: "toggle", required: false },
        { id: "etf-f9", label: "Bowel sounds present", type: "toggle", required: true },
        { id: "etf-f10", label: "Signs of intolerance (nausea, distension, vomiting)", type: "toggle", required: true },
      ],
    },
    {
      id: "etf-step-3",
      title: "Feeding Administration",
      description: "Administer formula per order and flush tube as required.",
      type: "timed",
      fields: [
        { id: "etf-f11", label: "Formula name", type: "text", required: true },
        { id: "etf-f12", label: "Rate (mL/hr)", type: "number", required: true, unit: "mL/hr" },
        { id: "etf-f13", label: "Feeding started at", type: "datetime", required: true },
        { id: "etf-f14", label: "Tube flushed before and after", type: "toggle", required: true },
        { id: "etf-f15", label: "Volume administered (mL)", type: "number", required: false, unit: "mL" },
        { id: "etf-f16", label: "Tolerance Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const epiduralManagement: ProcedureTemplate = {
  id: "epidural-management",
  name: "Epidural Analgesia Management",
  category: "Medication",
  description:
    "Ongoing monitoring and management of epidural analgesia including sensory level, hemodynamic status, and side effects.",
  estimatedMinutes: 15,
  steps: [
    {
      id: "ep-step-1",
      title: "Epidural Catheter Assessment",
      description: "Inspect the epidural catheter site and verify correct placement.",
      type: "checklist",
      fields: [
        { id: "ep-f1", label: "Catheter site clean, dry, and intact", type: "toggle", required: true },
        { id: "ep-f2", label: "Catheter secured and labeled", type: "toggle", required: true },
        { id: "ep-f3", label: "No signs of infection at insertion site", type: "toggle", required: true },
        { id: "ep-f4", label: "Epidural pump running correctly", type: "toggle", required: true },
        { id: "ep-f5", label: "Epidural medication and rate verified", type: "toggle", required: true },
      ],
    },
    {
      id: "ep-step-2",
      title: "Pain & Sensory Level",
      description: "Assess pain control, sensory block level, and motor function.",
      type: "form",
      fields: [
        { id: "ep-f6", label: "Pain Score (0–10)", type: "number", required: true, min: 0, max: 10 },
        { id: "ep-f7", label: "Sensory block level (dermatome)", type: "text", required: true },
        { id: "ep-f8", label: "Motor block (Bromage scale 0–3)", type: "number", required: true, min: 0, max: 3 },
        { id: "ep-f9", label: "Pain adequately controlled", type: "toggle", required: true },
      ],
    },
    {
      id: "ep-step-3",
      title: "Vital Signs & Respiratory Monitoring",
      description: "Monitor hemodynamic and respiratory status closely.",
      type: "form",
      fields: [
        { id: "ep-f10", label: "Blood Pressure (mmHg)", type: "text", required: true },
        { id: "ep-f11", label: "Heart Rate (bpm)", type: "number", required: true, min: 0, max: 300, unit: "bpm" },
        { id: "ep-f12", label: "Respiratory Rate (breaths/min)", type: "number", required: true, min: 0, max: 60, unit: "breaths/min" },
        { id: "ep-f13", label: "SpO₂ (%)", type: "number", required: true, min: 0, max: 100, unit: "%" },
        { id: "ep-f14", label: "Sedation level acceptable", type: "toggle", required: true },
      ],
    },
    {
      id: "ep-step-4",
      title: "Side Effect Management",
      description: "Screen for and manage common epidural side effects.",
      type: "form",
      fields: [
        { id: "ep-f15", label: "Hypotension present", type: "toggle", required: true },
        { id: "ep-f16", label: "Pruritus present", type: "toggle", required: true },
        { id: "ep-f17", label: "Nausea / vomiting present", type: "toggle", required: true },
        { id: "ep-f18", label: "Urinary retention assessed", type: "toggle", required: true },
        { id: "ep-f19", label: "Interventions for side effects", type: "textarea", required: false },
        { id: "ep-f20", label: "Anesthesia provider notified of concerns", type: "toggle", required: false },
      ],
    },
  ],
};

export const medicationTemplates: ProcedureTemplate[] = [
  oralMedicationAdministration,
  ivMedicationAdministration,
  imSubcutaneousInjection,
  insulinAdministration,
  bloodTransfusion,
  pcaPumpManagement,
  enteralTubeFeeding,
  epiduralManagement,
];
