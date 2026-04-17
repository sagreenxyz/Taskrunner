import type { ProcedureTemplate } from "../../types/index.ts";

export const vitalSignsCollection: ProcedureTemplate = {
  id: "vital-signs-collection",
  name: "Vital Signs Collection",
  category: "Monitoring",
  description:
    "Routine vital signs measurement and documentation including temperature, pulse, blood pressure, respirations, and SpO₂.",
  estimatedMinutes: 8,
  steps: [
    {
      id: "vs-step-1",
      title: "Patient Identification",
      description: "Confirm patient identity before measuring vital signs.",
      type: "info",
      fields: [
        { id: "vs-f1", label: "Two patient identifiers confirmed", type: "toggle", required: true },
        { id: "vs-f2", label: "Measurement Date/Time", type: "datetime", required: true },
        { id: "vs-f3", label: "Reason for measurement", type: "select", required: true, options: ["Routine (scheduled)", "PRN — symptom change", "Post-procedure", "Post-medication", "Provider order"] },
      ],
    },
    {
      id: "vs-step-2",
      title: "Vital Signs Measurement",
      description: "Measure and record all required vital sign parameters.",
      type: "form",
      fields: [
        { id: "vs-f4", label: "Temperature (°F)", type: "number", required: true, min: 90, max: 110, unit: "°F" },
        { id: "vs-f5", label: "Temperature route", type: "select", required: true, options: ["Oral", "Tympanic", "Axillary", "Rectal", "Temporal"] },
        { id: "vs-f6", label: "Heart Rate (bpm)", type: "number", required: true, min: 0, max: 300, unit: "bpm" },
        { id: "vs-f7", label: "Heart rhythm", type: "select", required: true, options: ["Regular", "Irregular"] },
        { id: "vs-f8", label: "Blood Pressure — Systolic (mmHg)", type: "number", required: true, unit: "mmHg" },
        { id: "vs-f9", label: "Blood Pressure — Diastolic (mmHg)", type: "number", required: true, unit: "mmHg" },
        { id: "vs-f10", label: "BP cuff site", type: "select", required: true, options: ["Right arm", "Left arm", "Right leg", "Left leg"] },
        { id: "vs-f11", label: "Respiratory Rate (breaths/min)", type: "number", required: true, min: 0, max: 60, unit: "breaths/min" },
        { id: "vs-f12", label: "SpO₂ (%)", type: "number", required: true, min: 0, max: 100, unit: "%" },
        { id: "vs-f13", label: "Oxygen supplementation", type: "select", required: true, options: ["Room air", "Nasal cannula", "Face mask", "High-flow", "Ventilator", "Other"] },
        { id: "vs-f14", label: "Pain Score (0–10)", type: "number", required: true, min: 0, max: 10 },
        { id: "vs-f15", label: "Weight (kg)", type: "number", required: false, unit: "kg" },
      ],
    },
    {
      id: "vs-step-3",
      title: "Documentation & Escalation",
      description: "Document values and escalate any critical findings.",
      type: "capture",
      fields: [
        { id: "vs-f16", label: "Values within patient's normal range", type: "toggle", required: true },
        { id: "vs-f17", label: "Critical values present", type: "toggle", required: true },
        { id: "vs-f18", label: "Provider notified (if critical values)", type: "toggle", required: false },
        { id: "vs-f19", label: "Notification details", type: "textarea", required: false },
      ],
    },
  ],
};

export const bloodGlucoseMonitoring: ProcedureTemplate = {
  id: "blood-glucose-monitoring",
  name: "Blood Glucose Monitoring (Point-of-Care)",
  category: "Monitoring",
  description:
    "Point-of-care blood glucose measurement, result interpretation, and hypoglycemia/hyperglycemia management protocol.",
  estimatedMinutes: 8,
  steps: [
    {
      id: "bg-step-1",
      title: "Patient Preparation",
      description: "Prepare patient and glucometer for blood glucose testing.",
      type: "checklist",
      fields: [
        { id: "bg-f1", label: "Two patient identifiers confirmed", type: "toggle", required: true },
        { id: "bg-f2", label: "Glucometer QC current", type: "toggle", required: true },
        { id: "bg-f3", label: "Finger cleaned with soap/water or alcohol and dried", type: "toggle", required: true },
        { id: "bg-f4", label: "Test strip expiration date checked", type: "toggle", required: true },
        { id: "bg-f5", label: "Measurement timing", type: "select", required: true, options: ["Fasting", "Pre-meal", "1-hour post-meal", "2-hour post-meal", "Bedtime", "PRN — symptomatic"] },
      ],
    },
    {
      id: "bg-step-2",
      title: "Glucose Measurement",
      description: "Obtain capillary blood sample and record result.",
      type: "form",
      fields: [
        { id: "bg-f6", label: "Blood Glucose Result (mg/dL)", type: "number", required: true, min: 0, max: 600, unit: "mg/dL" },
        { id: "bg-f7", label: "Measurement Date/Time", type: "datetime", required: true },
        { id: "bg-f8", label: "Patient symptomatic (diaphoresis, tremors, confusion)", type: "toggle", required: true },
      ],
    },
    {
      id: "bg-step-3",
      title: "Result Interpretation & Action",
      description: "Interpret result and implement appropriate management per protocol.",
      type: "decision",
      fields: [
        { id: "bg-f9", label: "Glucose within target range", type: "toggle", required: true },
        { id: "bg-f10", label: "Action taken", type: "select", required: true, options: ["No intervention — within range", "Hypoglycemia protocol initiated (<70 mg/dL)", "Insulin administered per sliding scale", "Provider notified — critical value", "Repeat in 15 minutes"] },
        { id: "bg-f11", label: "Intervention details", type: "textarea", required: false },
        { id: "bg-f12", label: "Follow-up glucose result (if repeat required)", type: "number", required: false, unit: "mg/dL" },
      ],
    },
  ],
};

export const fluidBalanceMonitoring: ProcedureTemplate = {
  id: "fluid-balance-monitoring",
  name: "Fluid Balance / Intake & Output Monitoring",
  category: "Monitoring",
  description:
    "Comprehensive intake and output documentation for shift-end fluid balance calculation and clinical decision-making.",
  estimatedMinutes: 10,
  steps: [
    {
      id: "fb-step-1",
      title: "Intake Documentation",
      description: "Record all fluid intake during the shift.",
      type: "form",
      fields: [
        { id: "fb-f1", label: "Shift", type: "select", required: true, options: ["Day (0700–1900)", "Night (1900–0700)", "Other"] },
        { id: "fb-f2", label: "IV Fluids — Total (mL)", type: "number", required: true, min: 0, unit: "mL" },
        { id: "fb-f3", label: "IV Medications — Total (mL)", type: "number", required: false, min: 0, unit: "mL" },
        { id: "fb-f4", label: "Oral Intake (mL)", type: "number", required: true, min: 0, unit: "mL" },
        { id: "fb-f5", label: "Tube Feeding (mL)", type: "number", required: false, min: 0, unit: "mL" },
        { id: "fb-f6", label: "Blood Products (mL)", type: "number", required: false, min: 0, unit: "mL" },
        { id: "fb-f7", label: "Total Intake (mL)", type: "number", required: true, min: 0, unit: "mL" },
      ],
    },
    {
      id: "fb-step-2",
      title: "Output Documentation",
      description: "Record all measurable fluid output during the shift.",
      type: "form",
      fields: [
        { id: "fb-f8", label: "Urine Output (mL)", type: "number", required: true, min: 0, unit: "mL" },
        { id: "fb-f9", label: "Urine Output route", type: "select", required: true, options: ["Foley catheter", "Urinal / bedpan", "Diaper (weighted)", "Ileostomy / urostomy"] },
        { id: "fb-f10", label: "Emesis (mL)", type: "number", required: false, min: 0, unit: "mL" },
        { id: "fb-f11", label: "NG / gastric drainage (mL)", type: "number", required: false, min: 0, unit: "mL" },
        { id: "fb-f12", label: "Wound drainage — total (mL)", type: "number", required: false, min: 0, unit: "mL" },
        { id: "fb-f13", label: "Stool — estimated or measured (mL)", type: "number", required: false, min: 0, unit: "mL" },
        { id: "fb-f14", label: "Total Output (mL)", type: "number", required: true, min: 0, unit: "mL" },
      ],
    },
    {
      id: "fb-step-3",
      title: "Balance & Reporting",
      description: "Calculate fluid balance and report significant deviations.",
      type: "capture",
      fields: [
        { id: "fb-f15", label: "Fluid Balance this shift (mL, net positive = more intake than output)", type: "number", required: true, unit: "mL" },
        { id: "fb-f16", label: "24-hour cumulative balance (mL)", type: "number", required: false, unit: "mL" },
        { id: "fb-f17", label: "Urine output adequate (≥ 0.5 mL/kg/hr)", type: "toggle", required: true },
        { id: "fb-f18", label: "Provider notified of oliguria or significant imbalance", type: "toggle", required: false },
        { id: "fb-f19", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const cardiacMonitorSetup: ProcedureTemplate = {
  id: "cardiac-monitor-setup",
  name: "Cardiac Monitor Setup & Rhythm Interpretation",
  category: "Monitoring",
  description:
    "Setup of continuous cardiac monitoring, baseline rhythm documentation, and alarm configuration.",
  estimatedMinutes: 15,
  steps: [
    {
      id: "cm-step-1",
      title: "Lead Placement & Setup",
      description: "Apply electrodes and connect lead wires to the cardiac monitor.",
      type: "checklist",
      fields: [
        { id: "cm-f1", label: "Indication for monitoring confirmed", type: "toggle", required: true },
        { id: "cm-f2", label: "Skin prepared (clean, dry, hair removed if needed)", type: "toggle", required: true },
        { id: "cm-f3", label: "Electrodes applied in correct positions", type: "toggle", required: true },
        { id: "cm-f4", label: "Lead selected", type: "select", required: true, options: ["Lead II", "Lead III", "Lead MCL-1", "5-lead telemetry", "12-lead continuous"] },
        { id: "cm-f5", label: "Clear waveform obtained", type: "toggle", required: true },
        { id: "cm-f6", label: "Artifact minimized", type: "toggle", required: true },
      ],
    },
    {
      id: "cm-step-2",
      title: "Baseline Rhythm Interpretation",
      description: "Document the initial cardiac rhythm.",
      type: "form",
      fields: [
        { id: "cm-f7", label: "Rhythm", type: "select", required: true, options: ["Normal Sinus Rhythm", "Sinus Tachycardia", "Sinus Bradycardia", "Atrial Fibrillation", "Atrial Flutter", "Supraventricular Tachycardia", "Premature Atrial Contractions", "Premature Ventricular Contractions", "Ventricular Tachycardia", "Ventricular Fibrillation", "Heart Block (1°/2°/3°)", "Paced rhythm", "Other"] },
        { id: "cm-f8", label: "Heart Rate (bpm)", type: "number", required: true, min: 0, max: 300, unit: "bpm" },
        { id: "cm-f9", label: "QRS regular", type: "toggle", required: true },
        { id: "cm-f10", label: "P waves present before each QRS", type: "toggle", required: true },
        { id: "cm-f11", label: "Rhythm strip printed / saved", type: "toggle", required: true },
        { id: "cm-f12", label: "Provider notified of rhythm", type: "toggle", required: false },
      ],
    },
    {
      id: "cm-step-3",
      title: "Alarm Setup & Documentation",
      description: "Set monitor alarms and document monitoring initiation.",
      type: "form",
      fields: [
        { id: "cm-f13", label: "High heart rate alarm limit (bpm)", type: "number", required: true, unit: "bpm" },
        { id: "cm-f14", label: "Low heart rate alarm limit (bpm)", type: "number", required: true, unit: "bpm" },
        { id: "cm-f15", label: "Alarms active (not silenced)", type: "toggle", required: true },
        { id: "cm-f16", label: "Monitoring start Date/Time", type: "datetime", required: true },
        { id: "cm-f17", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const oxygenTherapyManagement: ProcedureTemplate = {
  id: "oxygen-therapy-management",
  name: "Oxygen Therapy Management",
  category: "Monitoring",
  description:
    "Assessment, setup, and ongoing management of supplemental oxygen therapy.",
  estimatedMinutes: 12,
  steps: [
    {
      id: "ot-step-1",
      title: "Oxygenation Assessment",
      description: "Assess patient's oxygenation status and indication for oxygen therapy.",
      type: "form",
      fields: [
        { id: "ot-f1", label: "SpO₂ (%)", type: "number", required: true, min: 0, max: 100, unit: "%" },
        { id: "ot-f2", label: "Respiratory Rate (breaths/min)", type: "number", required: true, min: 0, max: 60, unit: "breaths/min" },
        { id: "ot-f3", label: "Work of breathing", type: "select", required: true, options: ["Unlabored", "Mild distress", "Moderate distress", "Severe distress"] },
        { id: "ot-f4", label: "Indication for O₂", type: "select", required: true, options: ["Hypoxemia (SpO₂ < target)", "Respiratory distress", "Post-procedure protocol", "COPD exacerbation", "Provider order"] },
        { id: "ot-f5", label: "Target SpO₂ range", type: "text", required: true },
      ],
    },
    {
      id: "ot-step-2",
      title: "Oxygen Delivery Setup",
      description: "Select and set up the appropriate oxygen delivery device.",
      type: "form",
      fields: [
        { id: "ot-f6", label: "Delivery device", type: "select", required: true, options: ["Nasal cannula", "Simple face mask", "Non-rebreather mask", "Venturi mask", "High-flow nasal cannula (HFNC)", "CPAP / BiPAP", "T-piece / trach collar"] },
        { id: "ot-f7", label: "Flow rate (L/min) or FiO₂ (%)", type: "text", required: true },
        { id: "ot-f8", label: "Device fits comfortably and correctly", type: "toggle", required: true },
        { id: "ot-f9", label: "Humidification applied (if flow ≥ 4 L/min)", type: "toggle", required: false },
        { id: "ot-f10", label: "Device secured and positioned correctly", type: "toggle", required: true },
      ],
    },
    {
      id: "ot-step-3",
      title: "Monitoring & Documentation",
      description: "Monitor oxygenation response and document therapy.",
      type: "form",
      fields: [
        { id: "ot-f11", label: "SpO₂ after therapy adjustment (%)", type: "number", required: true, min: 0, max: 100, unit: "%" },
        { id: "ot-f12", label: "Target SpO₂ achieved", type: "toggle", required: true },
        { id: "ot-f13", label: "Patient tolerating device", type: "toggle", required: true },
        { id: "ot-f14", label: "Provider notified of failure to reach target", type: "toggle", required: false },
        { id: "ot-f15", label: "Therapy Date/Time", type: "datetime", required: true },
        { id: "ot-f16", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const twelveLeadEcg: ProcedureTemplate = {
  id: "12-lead-ecg",
  name: "12-Lead ECG Acquisition",
  category: "Monitoring",
  description:
    "Acquisition and preliminary review of a 12-lead electrocardiogram for diagnostic and monitoring purposes.",
  estimatedMinutes: 10,
  steps: [
    {
      id: "ecg-step-1",
      title: "Patient Preparation",
      description: "Prepare the patient and gather ECG equipment.",
      type: "checklist",
      fields: [
        { id: "ecg-f1", label: "Order confirmed / indication documented", type: "toggle", required: true },
        { id: "ecg-f2", label: "Two patient identifiers confirmed and entered in ECG machine", type: "toggle", required: true },
        { id: "ecg-f3", label: "Patient in supine position", type: "toggle", required: true },
        { id: "ecg-f4", label: "Patient instructed to remain still and breathe normally", type: "toggle", required: true },
        { id: "ecg-f5", label: "Skin prepared (clean, dry, hair removed if necessary)", type: "toggle", required: true },
        { id: "ecg-f6", label: "ECG machine calibrated (1 mV = 10 mm)", type: "toggle", required: true },
      ],
    },
    {
      id: "ecg-step-2",
      title: "Lead Placement & Acquisition",
      description: "Apply electrodes in correct anatomical positions and acquire the tracing.",
      type: "timed",
      fields: [
        { id: "ecg-f7", label: "Limb leads (RA, LA, RL, LL) applied correctly", type: "toggle", required: true },
        { id: "ecg-f8", label: "Precordial leads V1–V6 applied correctly", type: "toggle", required: true },
        { id: "ecg-f9", label: "Tracing free of artifact", type: "toggle", required: true },
        { id: "ecg-f10", label: "All 12 leads present on tracing", type: "toggle", required: true },
        { id: "ecg-f11", label: "Acquisition Date/Time", type: "datetime", required: true },
      ],
    },
    {
      id: "ecg-step-3",
      title: "Transmission & Documentation",
      description: "Transmit ECG for provider review and document findings.",
      type: "capture",
      fields: [
        { id: "ecg-f12", label: "ECG transmitted to provider / cardiologist", type: "toggle", required: true },
        { id: "ecg-f13", label: "Preliminary rhythm", type: "text", required: false },
        { id: "ecg-f14", label: "ST changes or acute findings noted", type: "toggle", required: true },
        { id: "ecg-f15", label: "STEMI activation initiated (if applicable)", type: "toggle", required: false },
        { id: "ecg-f16", label: "Provider interpretation received", type: "toggle", required: false },
        { id: "ecg-f17", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const monitoringTemplates: ProcedureTemplate[] = [
  vitalSignsCollection,
  bloodGlucoseMonitoring,
  fluidBalanceMonitoring,
  cardiacMonitorSetup,
  oxygenTherapyManagement,
  twelveLeadEcg,
];
