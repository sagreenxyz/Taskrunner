import type { ProcedureTemplate } from "../../types/index.ts";

export const headToToeAssessment: ProcedureTemplate = {
  id: "head-to-toe-assessment",
  name: "Head-to-Toe Assessment",
  category: "Assessment",
  description:
    "A comprehensive head-to-toe nursing assessment covering all body systems for shift baseline documentation.",
  estimatedMinutes: 20,
  steps: [
    {
      id: "htt-step-1",
      title: "Patient Identification & Consent",
      description:
        "Confirm patient identity using two identifiers and explain the assessment procedure.",
      type: "info",
      fields: [
        { id: "htt-f1", label: "Patient Name", type: "text", required: true },
        { id: "htt-f2", label: "Date of Birth", type: "text", required: true },
        { id: "htt-f3", label: "Medical Record Number", type: "text", required: true },
        { id: "htt-f4", label: "Assessment Date/Time", type: "datetime", required: true },
        { id: "htt-f5", label: "Two identifiers verified", type: "toggle", required: true },
      ],
    },
    {
      id: "htt-step-2",
      title: "General Survey & Vital Signs",
      description: "Record current vital signs and document general appearance.",
      type: "form",
      fields: [
        { id: "htt-f6", label: "Temperature (°F)", type: "number", required: true, min: 90, max: 110, unit: "°F" },
        { id: "htt-f7", label: "Heart Rate (bpm)", type: "number", required: true, min: 0, max: 300, unit: "bpm" },
        { id: "htt-f8", label: "Blood Pressure (mmHg)", type: "text", required: true },
        { id: "htt-f9", label: "Respiratory Rate (breaths/min)", type: "number", required: true, min: 0, max: 60, unit: "breaths/min" },
        { id: "htt-f10", label: "SpO₂ (%)", type: "number", required: true, min: 0, max: 100, unit: "%" },
        { id: "htt-f11", label: "Pain Score (0–10)", type: "number", required: true, min: 0, max: 10 },
        { id: "htt-f12", label: "General Appearance", type: "select", required: true, options: ["Well-appearing", "Ill-appearing", "Distressed", "Lethargic"] },
      ],
    },
    {
      id: "htt-step-3",
      title: "Systems Assessment",
      description: "Assess each major body system and document findings.",
      type: "form",
      fields: [
        { id: "htt-f13", label: "Neurological — Level of Consciousness", type: "select", required: true, options: ["Alert & Oriented x4", "Alert & Oriented x3", "Alert & Oriented x2", "Confused", "Lethargic", "Unresponsive"] },
        { id: "htt-f14", label: "Cardiovascular — Heart Rhythm", type: "select", required: true, options: ["Regular Rate & Rhythm", "Irregular", "Tachycardic", "Bradycardic"] },
        { id: "htt-f15", label: "Respiratory — Breath Sounds", type: "select", required: true, options: ["Clear bilaterally", "Crackles", "Wheezes", "Diminished", "Absent"] },
        { id: "htt-f16", label: "GI — Bowel Sounds", type: "select", required: true, options: ["Present x4", "Hyperactive", "Hypoactive", "Absent"] },
        { id: "htt-f17", label: "GU — Urine Output adequate", type: "toggle", required: true },
        { id: "htt-f18", label: "Skin — Integrity intact", type: "toggle", required: true },
        { id: "htt-f19", label: "Musculoskeletal — Mobility status", type: "select", required: true, options: ["Independent", "Requires assistance", "Dependent", "Bedbound"] },
        { id: "htt-f20", label: "Abnormal Findings", type: "textarea", required: false },
      ],
    },
    {
      id: "htt-step-4",
      title: "Documentation & Sign-Off",
      description: "Review all findings and sign the assessment record.",
      type: "signature",
      fields: [
        { id: "htt-f21", label: "Physician / Provider notified of abnormals", type: "toggle", required: false },
        { id: "htt-f22", label: "Notification details", type: "textarea", required: false },
        { id: "htt-f23", label: "Assessing Nurse (Full Name)", type: "text", required: true },
        { id: "htt-f24", label: "Assessment Completed", type: "datetime", required: true },
      ],
    },
  ],
};

export const neurologicalAssessment: ProcedureTemplate = {
  id: "neurological-assessment",
  name: "Neurological Assessment (GCS)",
  category: "Assessment",
  description:
    "Structured neurological assessment using the Glasgow Coma Scale, pupil checks, and motor/sensory evaluation.",
  estimatedMinutes: 10,
  steps: [
    {
      id: "na-step-1",
      title: "Glasgow Coma Scale",
      description: "Score eye opening, verbal response, and motor response.",
      type: "form",
      fields: [
        { id: "na-f1", label: "Eye Opening (1–4)", type: "number", required: true, min: 1, max: 4 },
        { id: "na-f2", label: "Verbal Response (1–5)", type: "number", required: true, min: 1, max: 5 },
        { id: "na-f3", label: "Motor Response (1–6)", type: "number", required: true, min: 1, max: 6 },
        { id: "na-f4", label: "Total GCS Score (3–15)", type: "number", required: true, min: 3, max: 15 },
        { id: "na-f5", label: "Change from previous assessment", type: "select", required: true, options: ["Improved", "Unchanged", "Declined", "First assessment"] },
      ],
    },
    {
      id: "na-step-2",
      title: "Pupil & Cranial Nerve Check",
      description: "Assess pupils and key cranial nerve reflexes.",
      type: "form",
      fields: [
        { id: "na-f6", label: "Right Pupil Size (mm)", type: "number", required: true, min: 1, max: 9, unit: "mm" },
        { id: "na-f7", label: "Left Pupil Size (mm)", type: "number", required: true, min: 1, max: 9, unit: "mm" },
        { id: "na-f8", label: "Right Pupil Reactivity", type: "select", required: true, options: ["Brisk", "Sluggish", "Fixed", "Non-reactive"] },
        { id: "na-f9", label: "Left Pupil Reactivity", type: "select", required: true, options: ["Brisk", "Sluggish", "Fixed", "Non-reactive"] },
        { id: "na-f10", label: "PERRL confirmed", type: "toggle", required: true },
      ],
    },
    {
      id: "na-step-3",
      title: "Motor & Sensory Assessment",
      description: "Evaluate strength, sensation, and coordination in all extremities.",
      type: "form",
      fields: [
        { id: "na-f11", label: "Upper Extremity Strength (bilateral)", type: "select", required: true, options: ["5/5 equal", "Asymmetrical weakness", "Bilateral weakness", "Flaccid"] },
        { id: "na-f12", label: "Lower Extremity Strength (bilateral)", type: "select", required: true, options: ["5/5 equal", "Asymmetrical weakness", "Bilateral weakness", "Flaccid"] },
        { id: "na-f13", label: "Sensation intact", type: "toggle", required: true },
        { id: "na-f14", label: "Orientation: Person", type: "toggle", required: true },
        { id: "na-f15", label: "Orientation: Place", type: "toggle", required: true },
        { id: "na-f16", label: "Orientation: Time", type: "toggle", required: true },
        { id: "na-f17", label: "Orientation: Situation", type: "toggle", required: true },
        { id: "na-f18", label: "Neurological Notes", type: "textarea", required: false },
      ],
    },
    {
      id: "na-step-4",
      title: "Reporting & Documentation",
      description: "Document findings and notify provider of any significant changes.",
      type: "capture",
      fields: [
        { id: "na-f19", label: "Provider notification required", type: "toggle", required: true },
        { id: "na-f20", label: "Notification details / SBAR", type: "textarea", required: false },
        { id: "na-f21", label: "Assessing Nurse", type: "text", required: true },
      ],
    },
  ],
};

export const cardiovascularAssessment: ProcedureTemplate = {
  id: "cardiovascular-assessment",
  name: "Cardiovascular Assessment",
  category: "Assessment",
  description:
    "Focused cardiovascular nursing assessment including heart sounds, peripheral pulses, and fluid status.",
  estimatedMinutes: 12,
  steps: [
    {
      id: "cv-step-1",
      title: "Heart Rate & Rhythm",
      description: "Auscultate heart sounds and assess rate and rhythm.",
      type: "form",
      fields: [
        { id: "cv-f1", label: "Heart Rate (bpm)", type: "number", required: true, min: 0, max: 300, unit: "bpm" },
        { id: "cv-f2", label: "Rhythm", type: "select", required: true, options: ["Regular", "Irregular", "Irregularly irregular"] },
        { id: "cv-f3", label: "Heart Sounds", type: "select", required: true, options: ["S1 S2 normal", "S3 present", "S4 present", "Murmur present", "Rub present"] },
        { id: "cv-f4", label: "Blood Pressure (mmHg)", type: "text", required: true },
        { id: "cv-f5", label: "Orthostatic hypotension assessed", type: "toggle", required: false },
      ],
    },
    {
      id: "cv-step-2",
      title: "Peripheral Vascular Assessment",
      description: "Assess peripheral pulses, capillary refill, and edema.",
      type: "checklist",
      fields: [
        { id: "cv-f6", label: "Radial pulses present bilaterally", type: "toggle", required: true },
        { id: "cv-f7", label: "Dorsalis pedis pulses present bilaterally", type: "toggle", required: true },
        { id: "cv-f8", label: "Capillary refill ≤ 2 seconds", type: "toggle", required: true },
        { id: "cv-f9", label: "Peripheral Edema", type: "select", required: true, options: ["None", "1+ (mild)", "2+ (moderate)", "3+ (severe)", "4+ (pitting)"] },
        { id: "cv-f10", label: "Edema location", type: "text", required: false },
        { id: "cv-f11", label: "Skin color / temperature normal", type: "toggle", required: true },
      ],
    },
    {
      id: "cv-step-3",
      title: "Fluid Status",
      description: "Assess hydration and volume status.",
      type: "form",
      fields: [
        { id: "cv-f12", label: "JVD present", type: "toggle", required: true },
        { id: "cv-f13", label: "Mucous membranes moist", type: "toggle", required: true },
        { id: "cv-f14", label: "Recent weight change", type: "select", required: true, options: ["No change", "Weight gain", "Weight loss", "Not measured"] },
        { id: "cv-f15", label: "Weight (kg)", type: "number", required: false, unit: "kg" },
        { id: "cv-f16", label: "Cardiovascular Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const respiratoryAssessment: ProcedureTemplate = {
  id: "respiratory-assessment",
  name: "Respiratory Assessment",
  category: "Assessment",
  description:
    "Focused respiratory nursing assessment including breath sounds, work of breathing, and oxygenation status.",
  estimatedMinutes: 10,
  steps: [
    {
      id: "ra-step-1",
      title: "Respiratory Rate & Effort",
      description: "Count respiratory rate and assess work of breathing.",
      type: "form",
      fields: [
        { id: "ra-f1", label: "Respiratory Rate (breaths/min)", type: "number", required: true, min: 0, max: 60, unit: "breaths/min" },
        { id: "ra-f2", label: "Work of Breathing", type: "select", required: true, options: ["Unlabored", "Mild distress", "Moderate distress", "Severe distress"] },
        { id: "ra-f3", label: "Use of accessory muscles", type: "toggle", required: true },
        { id: "ra-f4", label: "Nasal flaring / retractions", type: "toggle", required: true },
        { id: "ra-f5", label: "Cough present", type: "toggle", required: true },
        { id: "ra-f6", label: "Sputum production", type: "select", required: false, options: ["None", "Thin / clear", "Thick / white", "Yellow / green", "Blood-tinged"] },
      ],
    },
    {
      id: "ra-step-2",
      title: "Lung Sounds Auscultation",
      description: "Auscultate all lung fields and document findings.",
      type: "form",
      fields: [
        { id: "ra-f7", label: "Right Upper Lobe", type: "select", required: true, options: ["Clear", "Crackles", "Wheezes", "Rhonchi", "Diminished", "Absent"] },
        { id: "ra-f8", label: "Right Lower Lobe", type: "select", required: true, options: ["Clear", "Crackles", "Wheezes", "Rhonchi", "Diminished", "Absent"] },
        { id: "ra-f9", label: "Left Upper Lobe", type: "select", required: true, options: ["Clear", "Crackles", "Wheezes", "Rhonchi", "Diminished", "Absent"] },
        { id: "ra-f10", label: "Left Lower Lobe", type: "select", required: true, options: ["Clear", "Crackles", "Wheezes", "Rhonchi", "Diminished", "Absent"] },
        { id: "ra-f11", label: "Respiratory Notes", type: "textarea", required: false },
      ],
    },
    {
      id: "ra-step-3",
      title: "Oxygenation Status",
      description: "Document oxygen delivery and saturation.",
      type: "form",
      fields: [
        { id: "ra-f12", label: "SpO₂ (%)", type: "number", required: true, min: 0, max: 100, unit: "%" },
        { id: "ra-f13", label: "Oxygen delivery method", type: "select", required: true, options: ["Room air", "Nasal cannula", "Simple face mask", "Non-rebreather mask", "Venturi mask", "High-flow nasal cannula", "BiPAP/CPAP", "Mechanical ventilator"] },
        { id: "ra-f14", label: "Oxygen flow rate (L/min)", type: "number", required: false, unit: "L/min" },
        { id: "ra-f15", label: "Target SpO₂ range met", type: "toggle", required: true },
        { id: "ra-f16", label: "Provider notified of abnormal values", type: "toggle", required: false },
      ],
    },
  ],
};

export const painAssessment: ProcedureTemplate = {
  id: "pain-assessment",
  name: "Pain Assessment",
  category: "Assessment",
  description:
    "Comprehensive pain assessment using standardized tools, including characterization and intervention evaluation.",
  estimatedMinutes: 8,
  steps: [
    {
      id: "pa-step-1",
      title: "Pain Screening",
      description: "Screen for pain presence and select appropriate assessment tool.",
      type: "form",
      fields: [
        { id: "pa-f1", label: "Patient reports pain", type: "toggle", required: true },
        { id: "pa-f2", label: "Assessment tool used", type: "select", required: true, options: ["Numeric Rating Scale (NRS 0–10)", "FACES Scale", "CPOT (non-verbal)", "FLACC (pediatric)", "PAINAD (dementia)"] },
        { id: "pa-f3", label: "Pain Score", type: "number", required: true, min: 0, max: 10 },
        { id: "pa-f4", label: "Acceptable pain goal (patient)", type: "number", required: false, min: 0, max: 10 },
      ],
    },
    {
      id: "pa-step-2",
      title: "Pain Characterization (PQRSTU)",
      description: "Characterize pain using the PQRSTU mnemonic.",
      type: "form",
      fields: [
        { id: "pa-f5", label: "Precipitating / Palliating factors", type: "textarea", required: true },
        { id: "pa-f6", label: "Quality (description)", type: "select", required: true, options: ["Sharp", "Dull", "Burning", "Aching", "Stabbing", "Throbbing", "Cramping", "Pressure", "Other"] },
        { id: "pa-f7", label: "Region / Radiation", type: "text", required: true },
        { id: "pa-f8", label: "Severity (0–10)", type: "number", required: true, min: 0, max: 10 },
        { id: "pa-f9", label: "Timing (onset / duration)", type: "text", required: true },
        { id: "pa-f10", label: "Understanding / Impact on function", type: "textarea", required: false },
      ],
    },
    {
      id: "pa-step-3",
      title: "Intervention & Reassessment",
      description: "Document intervention provided and reassess pain after 30–60 minutes.",
      type: "form",
      fields: [
        { id: "pa-f11", label: "Intervention", type: "select", required: true, options: ["Analgesic administered", "Non-pharmacological measures", "Position change", "Ice/heat", "No intervention — pain acceptable", "Physician notified"] },
        { id: "pa-f12", label: "Intervention details", type: "textarea", required: false },
        { id: "pa-f13", label: "Reassessment pain score", type: "number", required: true, min: 0, max: 10 },
        { id: "pa-f14", label: "Goal achieved", type: "toggle", required: true },
      ],
    },
  ],
};

export const fallRiskAssessment: ProcedureTemplate = {
  id: "fall-risk-assessment",
  name: "Fall Risk Assessment (Morse Fall Scale)",
  category: "Assessment",
  description:
    "Assess patient fall risk using the Morse Fall Scale and implement appropriate fall prevention interventions.",
  estimatedMinutes: 10,
  steps: [
    {
      id: "fr-step-1",
      title: "Morse Fall Scale Scoring",
      description: "Score each Morse Fall Scale item to determine risk level.",
      type: "form",
      fields: [
        { id: "fr-f1", label: "History of falling (No=0, Yes=25)", type: "number", required: true, min: 0, max: 25 },
        { id: "fr-f2", label: "Secondary diagnosis (No=0, Yes=15)", type: "number", required: true, min: 0, max: 15 },
        { id: "fr-f3", label: "Ambulatory aid", type: "select", required: true, options: ["None/Bedrest/Nurse Assist (0)", "Crutches/Cane/Walker (15)", "Furniture (30)"] },
        { id: "fr-f4", label: "IV / Heparin lock (No=0, Yes=20)", type: "number", required: true, min: 0, max: 20 },
        { id: "fr-f5", label: "Gait / Transferring", type: "select", required: true, options: ["Normal/Bedrest/Immobile (0)", "Weak (10)", "Impaired (20)"] },
        { id: "fr-f6", label: "Mental status", type: "select", required: true, options: ["Oriented to own ability (0)", "Forgets limitations (15)"] },
        { id: "fr-f7", label: "Total Morse Score", type: "number", required: true, min: 0, max: 125 },
        { id: "fr-f8", label: "Risk Category", type: "select", required: true, options: ["Low (0–24)", "Medium (25–44)", "High (≥45)"] },
      ],
    },
    {
      id: "fr-step-2",
      title: "Environmental Safety Check",
      description: "Inspect the patient environment for fall hazards.",
      type: "checklist",
      fields: [
        { id: "fr-f9", label: "Bed in lowest position", type: "toggle", required: true },
        { id: "fr-f10", label: "Bed brakes locked", type: "toggle", required: true },
        { id: "fr-f11", label: "Call bell within reach", type: "toggle", required: true },
        { id: "fr-f12", label: "Non-slip footwear available", type: "toggle", required: true },
        { id: "fr-f13", label: "Pathway to bathroom clear", type: "toggle", required: true },
        { id: "fr-f14", label: "Side rails up as appropriate", type: "toggle", required: true },
      ],
    },
    {
      id: "fr-step-3",
      title: "Fall Prevention Interventions",
      description: "Implement and document fall prevention measures based on risk level.",
      type: "checklist",
      fields: [
        { id: "fr-f15", label: "Fall risk armband applied", type: "toggle", required: true },
        { id: "fr-f16", label: "Fall risk sign posted at bedside", type: "toggle", required: true },
        { id: "fr-f17", label: "Patient & family educated on fall risk", type: "toggle", required: true },
        { id: "fr-f18", label: "Hourly rounding implemented", type: "toggle", required: false },
        { id: "fr-f19", label: "Bed/chair alarm activated (high risk)", type: "toggle", required: false },
        { id: "fr-f20", label: "Additional interventions", type: "textarea", required: false },
      ],
    },
    {
      id: "fr-step-4",
      title: "Documentation",
      description: "Sign and complete fall risk documentation.",
      type: "signature",
      fields: [
        { id: "fr-f21", label: "Assessing Nurse (Full Name)", type: "text", required: true },
        { id: "fr-f22", label: "Assessment Date/Time", type: "datetime", required: true },
      ],
    },
  ],
};

export const skinIntegrityAssessment: ProcedureTemplate = {
  id: "skin-integrity-assessment",
  name: "Skin Integrity & Pressure Injury Risk (Braden Scale)",
  category: "Assessment",
  description:
    "Assess pressure injury risk using the Braden Scale and inspect skin integrity from head to toe.",
  estimatedMinutes: 15,
  steps: [
    {
      id: "si-step-1",
      title: "Braden Scale Scoring",
      description: "Score each subscale of the Braden Scale.",
      type: "form",
      fields: [
        { id: "si-f1", label: "Sensory Perception (1–4)", type: "number", required: true, min: 1, max: 4 },
        { id: "si-f2", label: "Moisture (1–4)", type: "number", required: true, min: 1, max: 4 },
        { id: "si-f3", label: "Activity (1–4)", type: "number", required: true, min: 1, max: 4 },
        { id: "si-f4", label: "Mobility (1–4)", type: "number", required: true, min: 1, max: 4 },
        { id: "si-f5", label: "Nutrition (1–4)", type: "number", required: true, min: 1, max: 4 },
        { id: "si-f6", label: "Friction & Shear (1–3)", type: "number", required: true, min: 1, max: 3 },
        { id: "si-f7", label: "Total Braden Score", type: "number", required: true, min: 6, max: 23 },
        { id: "si-f8", label: "Risk Category", type: "select", required: true, options: ["Mild risk (15–18)", "Moderate risk (13–14)", "High risk (10–12)", "Very high risk (≤9)"] },
      ],
    },
    {
      id: "si-step-2",
      title: "Skin Inspection",
      description: "Inspect all pressure points and document any skin breakdown.",
      type: "form",
      fields: [
        { id: "si-f9", label: "Skin breakdown present", type: "toggle", required: true },
        { id: "si-f10", label: "Location of skin breakdown", type: "text", required: false },
        { id: "si-f11", label: "Pressure injury stage (if applicable)", type: "select", required: false, options: ["Stage 1", "Stage 2", "Stage 3", "Stage 4", "Unstageable", "Deep tissue pressure injury", "No injury"] },
        { id: "si-f12", label: "Pressure points inspected (sacrum, heels, occiput, elbows)", type: "toggle", required: true },
        { id: "si-f13", label: "Skin Notes", type: "textarea", required: false },
      ],
    },
    {
      id: "si-step-3",
      title: "Prevention Plan",
      description: "Document and implement pressure injury prevention measures.",
      type: "checklist",
      fields: [
        { id: "si-f14", label: "Repositioning schedule established (q2h)", type: "toggle", required: true },
        { id: "si-f15", label: "Pressure-redistributing mattress/device in use", type: "toggle", required: false },
        { id: "si-f16", label: "Heel offloading devices applied", type: "toggle", required: false },
        { id: "si-f17", label: "Moisture barrier cream applied", type: "toggle", required: false },
        { id: "si-f18", label: "Nutritional support consulted", type: "toggle", required: false },
        { id: "si-f19", label: "Wound care consult placed (if injury present)", type: "toggle", required: false },
      ],
    },
  ],
};

export const nutritionalScreening: ProcedureTemplate = {
  id: "nutritional-screening",
  name: "Nutritional Screening (MUST)",
  category: "Assessment",
  description:
    "Malnutrition Universal Screening Tool (MUST) nutritional risk assessment with dietitian referral pathway.",
  estimatedMinutes: 10,
  steps: [
    {
      id: "ns-step-1",
      title: "MUST Score Calculation",
      description: "Complete each MUST step to determine nutritional risk.",
      type: "form",
      fields: [
        { id: "ns-f1", label: "BMI Score (>20=0, 18.5–20=1, <18.5=2)", type: "number", required: true, min: 0, max: 2 },
        { id: "ns-f2", label: "Unplanned weight loss score (≤5%=0, 5–10%=1, >10%=2)", type: "number", required: true, min: 0, max: 2 },
        { id: "ns-f3", label: "Acute disease effect (No=0, Yes=2)", type: "number", required: true, min: 0, max: 2 },
        { id: "ns-f4", label: "Total MUST Score", type: "number", required: true, min: 0, max: 6 },
        { id: "ns-f5", label: "Risk Category", type: "select", required: true, options: ["Low risk (0)", "Medium risk (1)", "High risk (≥2)"] },
      ],
    },
    {
      id: "ns-step-2",
      title: "Dietary Intake History",
      description: "Gather information about the patient's recent dietary intake.",
      type: "form",
      fields: [
        { id: "ns-f6", label: "Current appetite", type: "select", required: true, options: ["Good", "Fair", "Poor", "None"] },
        { id: "ns-f7", label: "Diet type", type: "select", required: true, options: ["Regular", "Soft", "Pureed", "Liquid", "NPO", "Tube feeding"] },
        { id: "ns-f8", label: "Food allergies / intolerances", type: "textarea", required: false },
        { id: "ns-f9", label: "Estimated intake last 24h", type: "select", required: true, options: [">75%", "50–75%", "25–50%", "<25%", "NPO"] },
      ],
    },
    {
      id: "ns-step-3",
      title: "Referral & Plan",
      description: "Determine referral needs based on MUST score.",
      type: "decision",
      fields: [
        { id: "ns-f10", label: "Dietitian referral placed", type: "toggle", required: true },
        { id: "ns-f11", label: "Dietary supplements ordered", type: "toggle", required: false },
        { id: "ns-f12", label: "Food/fluid intake monitoring initiated", type: "toggle", required: false },
        { id: "ns-f13", label: "Plan details", type: "textarea", required: false },
      ],
    },
  ],
};

export const mentalStatusAssessment: ProcedureTemplate = {
  id: "mental-status-assessment",
  name: "Mental Status Assessment",
  category: "Assessment",
  description:
    "Assessment of orientation, cognition, mood, affect, and safety screening for hospitalized patients.",
  estimatedMinutes: 12,
  steps: [
    {
      id: "ms-step-1",
      title: "Orientation & Cognitive Screening",
      description: "Assess orientation and perform brief cognitive screening.",
      type: "form",
      fields: [
        { id: "ms-f1", label: "Oriented to Person", type: "toggle", required: true },
        { id: "ms-f2", label: "Oriented to Place", type: "toggle", required: true },
        { id: "ms-f3", label: "Oriented to Time", type: "toggle", required: true },
        { id: "ms-f4", label: "Oriented to Situation", type: "toggle", required: true },
        { id: "ms-f5", label: "Short-term memory intact", type: "toggle", required: true },
        { id: "ms-f6", label: "Delirium screening (CAM)", type: "select", required: true, options: ["CAM Negative — No delirium", "CAM Positive — Delirium present", "Unable to assess"] },
      ],
    },
    {
      id: "ms-step-2",
      title: "Mood, Affect & Behavior",
      description: "Document mood, affect, and behavioral observations.",
      type: "form",
      fields: [
        { id: "ms-f7", label: "Mood (self-reported)", type: "select", required: true, options: ["Euthymic", "Anxious", "Depressed", "Elevated/Manic", "Irritable", "Unable to assess"] },
        { id: "ms-f8", label: "Affect (observed)", type: "select", required: true, options: ["Appropriate", "Flat", "Blunted", "Labile", "Inappropriate"] },
        { id: "ms-f9", label: "Thought process", type: "select", required: true, options: ["Linear and goal-directed", "Disorganized", "Tangential", "Flight of ideas", "Unable to assess"] },
        { id: "ms-f10", label: "Hallucinations reported or observed", type: "toggle", required: true },
      ],
    },
    {
      id: "ms-step-3",
      title: "Safety Screening",
      description: "Screen for suicidal ideation, homicidal ideation, and self-harm.",
      type: "decision",
      fields: [
        { id: "ms-f11", label: "Suicidal ideation present", type: "toggle", required: true },
        { id: "ms-f12", label: "Homicidal ideation present", type: "toggle", required: true },
        { id: "ms-f13", label: "Self-harm behavior observed", type: "toggle", required: true },
        { id: "ms-f14", label: "Psychiatric / social work consult placed", type: "toggle", required: false },
        { id: "ms-f15", label: "Safety plan documented", type: "textarea", required: false },
        { id: "ms-f16", label: "Provider notified", type: "toggle", required: true },
      ],
    },
  ],
};

export const postopAssessment: ProcedureTemplate = {
  id: "postop-assessment",
  name: "Postoperative Assessment",
  category: "Assessment",
  description:
    "Structured postoperative nursing assessment covering airway, breathing, circulation, pain, wound, and recovery progress.",
  estimatedMinutes: 15,
  steps: [
    {
      id: "po-step-1",
      title: "Airway & Breathing",
      description: "Confirm patent airway and adequate respiratory function.",
      type: "form",
      fields: [
        { id: "po-f1", label: "Airway patent", type: "toggle", required: true },
        { id: "po-f2", label: "Respiratory Rate (breaths/min)", type: "number", required: true, min: 0, max: 60, unit: "breaths/min" },
        { id: "po-f3", label: "SpO₂ (%)", type: "number", required: true, min: 0, max: 100, unit: "%" },
        { id: "po-f4", label: "Oxygen therapy required", type: "toggle", required: true },
        { id: "po-f5", label: "Breath sounds", type: "select", required: true, options: ["Clear bilaterally", "Crackles", "Diminished", "Other"] },
      ],
    },
    {
      id: "po-step-2",
      title: "Circulation & Pain",
      description: "Assess hemodynamic stability and postoperative pain.",
      type: "form",
      fields: [
        { id: "po-f6", label: "Blood Pressure (mmHg)", type: "text", required: true },
        { id: "po-f7", label: "Heart Rate (bpm)", type: "number", required: true, min: 0, max: 300, unit: "bpm" },
        { id: "po-f8", label: "Temperature (°F)", type: "number", required: true, min: 90, max: 110, unit: "°F" },
        { id: "po-f9", label: "Pain Score (0–10)", type: "number", required: true, min: 0, max: 10 },
        { id: "po-f10", label: "Nausea/Vomiting present", type: "toggle", required: true },
        { id: "po-f11", label: "Level of consciousness", type: "select", required: true, options: ["Alert & Oriented", "Drowsy but arousable", "Deeply sedated", "Unresponsive"] },
      ],
    },
    {
      id: "po-step-3",
      title: "Wound & Drainage",
      description: "Inspect surgical site and any drainage devices.",
      type: "form",
      fields: [
        { id: "po-f12", label: "Surgical site intact", type: "toggle", required: true },
        { id: "po-f13", label: "Dressing clean, dry, and intact", type: "toggle", required: true },
        { id: "po-f14", label: "Drainage present", type: "toggle", required: true },
        { id: "po-f15", label: "Drainage type / amount / color", type: "textarea", required: false },
        { id: "po-f16", label: "IV site patent", type: "toggle", required: true },
      ],
    },
    {
      id: "po-step-4",
      title: "Recovery Progress",
      description: "Assess readiness for transfer or discharge from PACU.",
      type: "checklist",
      fields: [
        { id: "po-f17", label: "Aldrete / discharge score ≥ 9", type: "toggle", required: true },
        { id: "po-f18", label: "Pain controlled to acceptable level", type: "toggle", required: true },
        { id: "po-f19", label: "Patient voided / urine output adequate", type: "toggle", required: false },
        { id: "po-f20", label: "Post-op instructions given to patient/family", type: "toggle", required: true },
        { id: "po-f21", label: "Recovery Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const diabeticFootAssessment: ProcedureTemplate = {
  id: "diabetic-foot-assessment",
  name: "Diabetic Foot Assessment",
  category: "Assessment",
  description:
    "Comprehensive foot assessment for patients with diabetes to identify neuropathy, vascular compromise, and wound risk.",
  estimatedMinutes: 15,
  steps: [
    {
      id: "dfa-step-1",
      title: "Sensation Assessment",
      description: "Test protective sensation using the 10-g Semmes-Weinstein monofilament.",
      type: "form",
      fields: [
        { id: "dfa-f1", label: "Right foot monofilament — sites tested (of 10)", type: "number", required: true, min: 0, max: 10 },
        { id: "dfa-f2", label: "Right foot sites with sensation (of 10)", type: "number", required: true, min: 0, max: 10 },
        { id: "dfa-f3", label: "Left foot monofilament — sites tested (of 10)", type: "number", required: true, min: 0, max: 10 },
        { id: "dfa-f4", label: "Left foot sites with sensation (of 10)", type: "number", required: true, min: 0, max: 10 },
        { id: "dfa-f5", label: "Vibration sensation intact", type: "toggle", required: true },
      ],
    },
    {
      id: "dfa-step-2",
      title: "Vascular Assessment",
      description: "Assess peripheral arterial circulation in both feet.",
      type: "form",
      fields: [
        { id: "dfa-f6", label: "Right dorsalis pedis pulse", type: "select", required: true, options: ["Present (strong)", "Present (weak)", "Absent", "Doppler required"] },
        { id: "dfa-f7", label: "Left dorsalis pedis pulse", type: "select", required: true, options: ["Present (strong)", "Present (weak)", "Absent", "Doppler required"] },
        { id: "dfa-f8", label: "Right posterior tibial pulse", type: "select", required: true, options: ["Present (strong)", "Present (weak)", "Absent", "Doppler required"] },
        { id: "dfa-f9", label: "Left posterior tibial pulse", type: "select", required: true, options: ["Present (strong)", "Present (weak)", "Absent", "Doppler required"] },
        { id: "dfa-f10", label: "Capillary refill ≤ 2 seconds", type: "toggle", required: true },
      ],
    },
    {
      id: "dfa-step-3",
      title: "Skin & Nail Inspection",
      description: "Document skin condition, calluses, deformities, and wounds.",
      type: "capture",
      fields: [
        { id: "dfa-f11", label: "Skin color / temperature normal", type: "toggle", required: true },
        { id: "dfa-f12", label: "Calluses / corns present", type: "toggle", required: true },
        { id: "dfa-f13", label: "Foot deformities (hammer toe, bunion, Charcot)", type: "toggle", required: true },
        { id: "dfa-f14", label: "Open wound / ulcer present", type: "toggle", required: true },
        { id: "dfa-f15", label: "Wound location and description", type: "textarea", required: false },
        { id: "dfa-f16", label: "Nail condition", type: "select", required: true, options: ["Normal", "Thickened/mycotic", "Ingrown", "Absent"] },
        { id: "dfa-f17", label: "Skin Notes", type: "textarea", required: false },
      ],
    },
    {
      id: "dfa-step-4",
      title: "Risk Classification & Referral",
      description: "Classify risk level and initiate appropriate referrals.",
      type: "decision",
      fields: [
        { id: "dfa-f18", label: "IWGDF Risk Classification", type: "select", required: true, options: ["0 — No risk factors", "1 — One risk factor", "2 — Multiple risk factors", "3 — Active foot disease"] },
        { id: "dfa-f19", label: "Podiatry referral placed", type: "toggle", required: false },
        { id: "dfa-f20", label: "Wound care referral placed", type: "toggle", required: false },
        { id: "dfa-f21", label: "Patient education provided", type: "toggle", required: true },
      ],
    },
  ],
};

export const newbornAssessment: ProcedureTemplate = {
  id: "newborn-assessment",
  name: "Newborn Assessment (APGAR)",
  category: "Assessment",
  description:
    "Initial newborn assessment including APGAR scoring at 1 and 5 minutes, physical examination, and identification.",
  estimatedMinutes: 15,
  steps: [
    {
      id: "nb-step-1",
      title: "APGAR Score — 1 Minute",
      description: "Score the newborn on five criteria at 1 minute of life.",
      type: "timed",
      fields: [
        { id: "nb-f1", label: "Appearance / Skin color (0–2)", type: "number", required: true, min: 0, max: 2 },
        { id: "nb-f2", label: "Pulse / Heart rate (0–2)", type: "number", required: true, min: 0, max: 2 },
        { id: "nb-f3", label: "Grimace / Reflex irritability (0–2)", type: "number", required: true, min: 0, max: 2 },
        { id: "nb-f4", label: "Activity / Muscle tone (0–2)", type: "number", required: true, min: 0, max: 2 },
        { id: "nb-f5", label: "Respiration (0–2)", type: "number", required: true, min: 0, max: 2 },
        { id: "nb-f6", label: "1-Minute APGAR Total", type: "number", required: true, min: 0, max: 10 },
      ],
    },
    {
      id: "nb-step-2",
      title: "APGAR Score — 5 Minutes",
      description: "Repeat APGAR scoring at 5 minutes of life.",
      type: "timed",
      fields: [
        { id: "nb-f7", label: "Appearance / Skin color (0–2)", type: "number", required: true, min: 0, max: 2 },
        { id: "nb-f8", label: "Pulse / Heart rate (0–2)", type: "number", required: true, min: 0, max: 2 },
        { id: "nb-f9", label: "Grimace / Reflex irritability (0–2)", type: "number", required: true, min: 0, max: 2 },
        { id: "nb-f10", label: "Activity / Muscle tone (0–2)", type: "number", required: true, min: 0, max: 2 },
        { id: "nb-f11", label: "Respiration (0–2)", type: "number", required: true, min: 0, max: 2 },
        { id: "nb-f12", label: "5-Minute APGAR Total", type: "number", required: true, min: 0, max: 10 },
      ],
    },
    {
      id: "nb-step-3",
      title: "Physical Examination",
      description: "Perform systematic newborn physical examination.",
      type: "form",
      fields: [
        { id: "nb-f13", label: "Birth weight (grams)", type: "number", required: true, unit: "g" },
        { id: "nb-f14", label: "Gestational age (weeks)", type: "number", required: true, unit: "weeks" },
        { id: "nb-f15", label: "Head circumference (cm)", type: "number", required: true, unit: "cm" },
        { id: "nb-f16", label: "General appearance", type: "select", required: true, options: ["Well", "Mild distress", "Moderate distress", "Severe distress"] },
        { id: "nb-f17", label: "Skin intact, no lesions", type: "toggle", required: true },
        { id: "nb-f18", label: "Fontanelle normal", type: "toggle", required: true },
        { id: "nb-f19", label: "Extremities / digits normal", type: "toggle", required: true },
        { id: "nb-f20", label: "Abnormal findings", type: "textarea", required: false },
      ],
    },
    {
      id: "nb-step-4",
      title: "Identification & Documentation",
      description: "Apply identification bands and complete delivery record.",
      type: "signature",
      fields: [
        { id: "nb-f21", label: "Infant ID band applied", type: "toggle", required: true },
        { id: "nb-f22", label: "Mother ID band verified", type: "toggle", required: true },
        { id: "nb-f23", label: "Vitamin K administered", type: "toggle", required: true },
        { id: "nb-f24", label: "Eye prophylaxis administered", type: "toggle", required: true },
        { id: "nb-f25", label: "Delivery Nurse (Full Name)", type: "text", required: true },
        { id: "nb-f26", label: "Date/Time of Birth", type: "datetime", required: true },
      ],
    },
  ],
};

export const assessmentTemplates: ProcedureTemplate[] = [
  headToToeAssessment,
  neurologicalAssessment,
  cardiovascularAssessment,
  respiratoryAssessment,
  painAssessment,
  fallRiskAssessment,
  skinIntegrityAssessment,
  nutritionalScreening,
  mentalStatusAssessment,
  postopAssessment,
  diabeticFootAssessment,
  newbornAssessment,
];
