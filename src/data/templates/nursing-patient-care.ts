import type { ProcedureTemplate } from "../../types/index.ts";

export const bedBath: ProcedureTemplate = {
  id: "bed-bath",
  name: "Bed Bath & Personal Hygiene",
  category: "Patient Care",
  description:
    "Complete bed bath and personal hygiene care including skin assessment and comfort measures.",
  estimatedMinutes: 30,
  steps: [
    {
      id: "bb-step-1",
      title: "Patient Preparation",
      description: "Gather supplies, ensure privacy, and explain the procedure to the patient.",
      type: "info",
      fields: [
        { id: "bb-f1", label: "Patient consent obtained", type: "toggle", required: true },
        { id: "bb-f2", label: "Privacy ensured (curtain / door closed)", type: "toggle", required: true },
        { id: "bb-f3", label: "Supplies gathered (basin, soap, washcloths, towels, clean gown)", type: "toggle", required: true },
        { id: "bb-f4", label: "Bed raised to working height", type: "toggle", required: true },
        { id: "bb-f5", label: "Water temperature comfortable (tested)", type: "toggle", required: true },
      ],
    },
    {
      id: "bb-step-2",
      title: "Bath Procedure",
      description: "Cleanse all body areas in sequence using proper technique.",
      type: "checklist",
      fields: [
        { id: "bb-f6", label: "Face and neck cleansed", type: "toggle", required: true },
        { id: "bb-f7", label: "Arms and axillae cleansed", type: "toggle", required: true },
        { id: "bb-f8", label: "Chest and abdomen cleansed", type: "toggle", required: true },
        { id: "bb-f9", label: "Back and buttocks cleansed", type: "toggle", required: true },
        { id: "bb-f10", label: "Legs and feet cleansed", type: "toggle", required: true },
        { id: "bb-f11", label: "Perineal care completed", type: "toggle", required: true },
        { id: "bb-f12", label: "Patient repositioned as needed", type: "toggle", required: true },
        { id: "bb-f13", label: "Clean gown / linens applied", type: "toggle", required: true },
      ],
    },
    {
      id: "bb-step-3",
      title: "Skin Assessment During Bath",
      description: "Inspect skin integrity at all pressure points during the bath.",
      type: "form",
      fields: [
        { id: "bb-f14", label: "Skin intact (no breakdown)", type: "toggle", required: true },
        { id: "bb-f15", label: "Redness or pressure injury noted", type: "toggle", required: true },
        { id: "bb-f16", label: "Location of any skin changes", type: "text", required: false },
        { id: "bb-f17", label: "Moisture barrier / lotion applied", type: "toggle", required: false },
        { id: "bb-f18", label: "Oral care completed", type: "toggle", required: true },
        { id: "bb-f19", label: "Hair care completed", type: "toggle", required: false },
        { id: "bb-f20", label: "Skin Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const oralCare: ProcedureTemplate = {
  id: "oral-care",
  name: "Oral Care",
  category: "Patient Care",
  description:
    "Routine oral hygiene care including oral assessment, tooth brushing, and mouth rinse to prevent hospital-acquired pneumonia.",
  estimatedMinutes: 10,
  steps: [
    {
      id: "oc-step-1",
      title: "Oral Assessment",
      description: "Assess oral cavity for condition and any abnormalities.",
      type: "form",
      fields: [
        { id: "oc-f1", label: "Oral cavity assessment performed", type: "toggle", required: true },
        { id: "oc-f2", label: "Lips / mucosa condition", type: "select", required: true, options: ["Moist and intact", "Dry / cracked", "Ulcerated", "Bleeding", "Coated / candida"] },
        { id: "oc-f3", label: "Dentures / dental appliance present", type: "toggle", required: true },
        { id: "oc-f4", label: "Patient able to self-care", type: "toggle", required: true },
      ],
    },
    {
      id: "oc-step-2",
      title: "Oral Hygiene Procedure",
      description: "Perform oral hygiene or assist patient with self-care.",
      type: "checklist",
      fields: [
        { id: "oc-f5", label: "HOB elevated ≥ 30° (ventilated / at-risk patients)", type: "toggle", required: false },
        { id: "oc-f6", label: "Teeth / gums brushed with soft toothbrush", type: "toggle", required: true },
        { id: "oc-f7", label: "Toothpaste or antiseptic used", type: "toggle", required: true },
        { id: "oc-f8", label: "Mouth rinse / chlorhexidine applied (if ordered)", type: "toggle", required: false },
        { id: "oc-f9", label: "Lips moisturized", type: "toggle", required: true },
        { id: "oc-f10", label: "Dentures cleaned and reinserted", type: "toggle", required: false },
        { id: "oc-f11", label: "Secretions suctioned if needed", type: "toggle", required: false },
      ],
    },
    {
      id: "oc-step-3",
      title: "Documentation",
      description: "Document oral care and patient tolerance.",
      type: "capture",
      fields: [
        { id: "oc-f12", label: "Care completed at", type: "datetime", required: true },
        { id: "oc-f13", label: "Patient tolerated procedure", type: "toggle", required: true },
        { id: "oc-f14", label: "Abnormal findings reported", type: "toggle", required: false },
        { id: "oc-f15", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const patientRepositioning: ProcedureTemplate = {
  id: "patient-repositioning",
  name: "Patient Repositioning (2-Hour Turn)",
  category: "Patient Care",
  description:
    "Scheduled patient repositioning every 2 hours to prevent pressure injury, including skin assessment and documentation.",
  estimatedMinutes: 10,
  steps: [
    {
      id: "pr-step-1",
      title: "Pre-Repositioning Assessment",
      description: "Assess patient before turning to ensure safe repositioning.",
      type: "form",
      fields: [
        { id: "pr-f1", label: "Current position", type: "select", required: true, options: ["Supine", "Left lateral", "Right lateral", "Prone", "Semi-Fowler's", "High Fowler's"] },
        { id: "pr-f2", label: "Pain / discomfort before move", type: "number", required: true, min: 0, max: 10 },
        { id: "pr-f3", label: "Lines / tubes secured for safe movement", type: "toggle", required: true },
        { id: "pr-f4", label: "Assistance required", type: "select", required: true, options: ["Independent", "1 nurse assist", "2 nurse assist", "Mechanical lift"] },
      ],
    },
    {
      id: "pr-step-2",
      title: "Repositioning Procedure",
      description: "Turn patient and reposition with supportive devices.",
      type: "checklist",
      fields: [
        { id: "pr-f5", label: "Patient repositioned to new position", type: "toggle", required: true },
        { id: "pr-f6", label: "New position", type: "select", required: true, options: ["Supine", "Left lateral", "Right lateral", "Prone", "Semi-Fowler's", "High Fowler's"] },
        { id: "pr-f7", label: "Pillows / wedges used for positioning", type: "toggle", required: true },
        { id: "pr-f8", label: "Heels offloaded", type: "toggle", required: true },
        { id: "pr-f9", label: "HOB at appropriate angle", type: "toggle", required: true },
        { id: "pr-f10", label: "Call bell within reach", type: "toggle", required: true },
      ],
    },
    {
      id: "pr-step-3",
      title: "Post-Repositioning Skin Check",
      description: "Inspect pressure points after repositioning.",
      type: "form",
      fields: [
        { id: "pr-f11", label: "Skin at previous pressure points intact", type: "toggle", required: true },
        { id: "pr-f12", label: "Erythema or skin changes noted", type: "toggle", required: true },
        { id: "pr-f13", label: "Location of skin changes", type: "text", required: false },
        { id: "pr-f14", label: "Repositioning completed at", type: "datetime", required: true },
        { id: "pr-f15", label: "Next scheduled turn", type: "datetime", required: true },
        { id: "pr-f16", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const ambulationAssistance: ProcedureTemplate = {
  id: "ambulation-assistance",
  name: "Ambulation Assistance",
  category: "Patient Care",
  description:
    "Assisted patient ambulation including pre-ambulation safety check, ambulation procedure, and post-ambulation assessment.",
  estimatedMinutes: 15,
  steps: [
    {
      id: "am-step-1",
      title: "Pre-Ambulation Assessment",
      description: "Assess patient readiness and safety for ambulation.",
      type: "checklist",
      fields: [
        { id: "am-f1", label: "Physician order for ambulation confirmed", type: "toggle", required: true },
        { id: "am-f2", label: "Pain acceptable for ambulation", type: "toggle", required: true },
        { id: "am-f3", label: "Vital signs stable before ambulation", type: "toggle", required: true },
        { id: "am-f4", label: "Non-slip footwear applied", type: "toggle", required: true },
        { id: "am-f5", label: "IV lines / drains secured", type: "toggle", required: true },
        { id: "am-f6", label: "Assistive device available (walker, cane)", type: "toggle", required: false },
        { id: "am-f7", label: "Number of assists", type: "select", required: true, options: ["Independent", "1 assist", "2 assists"] },
      ],
    },
    {
      id: "am-step-2",
      title: "Ambulation",
      description: "Assist patient with ambulation and monitor tolerance.",
      type: "timed",
      fields: [
        { id: "am-f8", label: "Patient transferred to standing safely", type: "toggle", required: true },
        { id: "am-f9", label: "Distance ambulated", type: "text", required: true },
        { id: "am-f10", label: "Duration (minutes)", type: "number", required: true, unit: "min" },
        { id: "am-f11", label: "Gait stable during ambulation", type: "toggle", required: true },
        { id: "am-f12", label: "Patient reported dizziness during ambulation", type: "toggle", required: true },
        { id: "am-f12b", label: "Patient reported pain during ambulation", type: "toggle", required: true },
        { id: "am-f12c", label: "Patient reported shortness of breath during ambulation", type: "toggle", required: true },
        { id: "am-f13", label: "Ambulation terminated early (reason)", type: "textarea", required: false },
      ],
    },
    {
      id: "am-step-3",
      title: "Post-Ambulation Assessment",
      description: "Assess patient after returning to bed or chair.",
      type: "form",
      fields: [
        { id: "am-f14", label: "Patient returned to bed / chair safely", type: "toggle", required: true },
        { id: "am-f15", label: "Post-ambulation vital signs stable", type: "toggle", required: true },
        { id: "am-f16", label: "Pain score after ambulation", type: "number", required: true, min: 0, max: 10 },
        { id: "am-f17", label: "Patient tolerated ambulation well", type: "toggle", required: true },
        { id: "am-f18", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const patientTransfer: ProcedureTemplate = {
  id: "patient-transfer",
  name: "Safe Patient Transfer (Bed to Chair)",
  category: "Patient Care",
  description:
    "Safe transfer of a patient from bed to chair using proper body mechanics and assistive equipment as needed.",
  estimatedMinutes: 15,
  steps: [
    {
      id: "pt-step-1",
      title: "Transfer Safety Assessment",
      description: "Evaluate patient and environment for safe transfer.",
      type: "checklist",
      fields: [
        { id: "pt-f1", label: "Transfer order confirmed", type: "toggle", required: true },
        { id: "pt-f2", label: "Patient weight / mobility level assessed", type: "toggle", required: true },
        { id: "pt-f3", label: "Lift / transfer aid required", type: "toggle", required: true },
        { id: "pt-f4", label: "Mechanical lift / transfer belt available", type: "toggle", required: false },
        { id: "pt-f5", label: "Adequate staff available", type: "toggle", required: true },
        { id: "pt-f6", label: "Chair / wheelchair positioned correctly", type: "toggle", required: true },
      ],
    },
    {
      id: "pt-step-2",
      title: "Transfer Procedure",
      description: "Execute the transfer safely.",
      type: "timed",
      fields: [
        { id: "pt-f7", label: "Transfer method used", type: "select", required: true, options: ["Stand-pivot", "Sit-to-stand lift", "Full mechanical lift", "Sliding board", "2-person assist"] },
        { id: "pt-f8", label: "Transfer completed safely", type: "toggle", required: true },
        { id: "pt-f9", label: "Patient positioned comfortably in chair", type: "toggle", required: true },
        { id: "pt-f10", label: "Lines / drains intact after transfer", type: "toggle", required: true },
        { id: "pt-f11", label: "Call bell within reach", type: "toggle", required: true },
      ],
    },
    {
      id: "pt-step-3",
      title: "Documentation",
      description: "Document the transfer and patient tolerance.",
      type: "capture",
      fields: [
        { id: "pt-f12", label: "Transfer Date/Time", type: "datetime", required: true },
        { id: "pt-f13", label: "Patient tolerated transfer without complication", type: "toggle", required: true },
        { id: "pt-f14", label: "Vital signs checked after transfer", type: "toggle", required: false },
        { id: "pt-f15", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const rangeOfMotion: ProcedureTemplate = {
  id: "range-of-motion",
  name: "Passive Range of Motion Exercises",
  category: "Patient Care",
  description:
    "Passive range of motion (PROM) exercises for bedbound patients to maintain joint mobility and prevent contractures.",
  estimatedMinutes: 20,
  steps: [
    {
      id: "rom-step-1",
      title: "Assessment",
      description: "Assess patient's current joint mobility and contraindications.",
      type: "form",
      fields: [
        { id: "rom-f1", label: "Order / plan of care reviewed", type: "toggle", required: true },
        { id: "rom-f2", label: "Contraindications screened (fractures, DVT, surgical restrictions)", type: "toggle", required: true },
        { id: "rom-f3", label: "Baseline joint mobility / stiffness noted", type: "textarea", required: false },
        { id: "rom-f4", label: "Pain score before exercises", type: "number", required: true, min: 0, max: 10 },
      ],
    },
    {
      id: "rom-step-2",
      title: "Exercise Procedure",
      description: "Perform passive ROM through each joint group.",
      type: "checklist",
      fields: [
        { id: "rom-f5", label: "Neck — flexion / extension / rotation", type: "toggle", required: false },
        { id: "rom-f6", label: "Shoulder — flexion / abduction / rotation", type: "toggle", required: true },
        { id: "rom-f7", label: "Elbow — flexion / extension", type: "toggle", required: true },
        { id: "rom-f8", label: "Wrist — flexion / extension", type: "toggle", required: true },
        { id: "rom-f9", label: "Fingers — flexion / extension / opposition", type: "toggle", required: true },
        { id: "rom-f10", label: "Hip — flexion / abduction / rotation", type: "toggle", required: true },
        { id: "rom-f11", label: "Knee — flexion / extension", type: "toggle", required: true },
        { id: "rom-f12", label: "Ankle — dorsiflexion / plantarflexion", type: "toggle", required: true },
        { id: "rom-f13", label: "Repetitions per joint", type: "number", required: true, min: 1, max: 20 },
      ],
    },
    {
      id: "rom-step-3",
      title: "Documentation",
      description: "Document patient response and any limitations noted.",
      type: "capture",
      fields: [
        { id: "rom-f14", label: "Pain score after exercises", type: "number", required: true, min: 0, max: 10 },
        { id: "rom-f15", label: "Patient tolerated exercises without adverse effects", type: "toggle", required: true },
        { id: "rom-f16", label: "Exercises completed at", type: "datetime", required: true },
        { id: "rom-f17", label: "Limitations / modifications made", type: "textarea", required: false },
      ],
    },
  ],
};

export const bowelCare: ProcedureTemplate = {
  id: "bowel-care",
  name: "Bowel Care & Constipation Management",
  category: "Patient Care",
  description:
    "Assessment and management of bowel function including history, intervention selection, and outcome documentation.",
  estimatedMinutes: 15,
  steps: [
    {
      id: "bc-step-1",
      title: "Bowel History & Assessment",
      description: "Assess current bowel function and risk factors for constipation.",
      type: "form",
      fields: [
        { id: "bc-f1", label: "Last bowel movement", type: "datetime", required: true },
        { id: "bc-f2", label: "Days since last bowel movement", type: "number", required: true, min: 0, unit: "days" },
        { id: "bc-f3", label: "Stool consistency (Bristol Stool Scale 1–7)", type: "number", required: false, min: 1, max: 7 },
        { id: "bc-f4", label: "Bowel sounds", type: "select", required: true, options: ["Present x4", "Hyperactive", "Hypoactive", "Absent"] },
        { id: "bc-f5", label: "Abdomen distended / tympanic", type: "toggle", required: true },
        { id: "bc-f6", label: "Patient reports straining / pain", type: "toggle", required: true },
        { id: "bc-f7", label: "Risk factors (opioids, immobility, low fluid intake)", type: "multiselect", required: false, options: ["Opioid use", "Immobility", "Low fluid intake", "Low fiber diet", "Anticholinergic medications", "None identified"] },
      ],
    },
    {
      id: "bc-step-2",
      title: "Intervention Selection",
      description: "Select appropriate bowel management intervention per order.",
      type: "decision",
      fields: [
        { id: "bc-f8", label: "Intervention ordered / initiated", type: "select", required: true, options: ["Stool softener (oral)", "Laxative (oral)", "Suppository", "Enema", "Manual disimpaction", "Dietary / fluid modification", "Ambulation encouraged"] },
        { id: "bc-f9", label: "Physician notified (if constipation >3 days)", type: "toggle", required: false },
        { id: "bc-f10", label: "Intervention details / orders", type: "textarea", required: false },
      ],
    },
    {
      id: "bc-step-3",
      title: "Outcome & Documentation",
      description: "Document bowel care outcome and patient response.",
      type: "form",
      fields: [
        { id: "bc-f11", label: "Bowel movement achieved", type: "toggle", required: true },
        { id: "bc-f12", label: "Output amount and character", type: "textarea", required: false },
        { id: "bc-f13", label: "Patient tolerated intervention", type: "toggle", required: true },
        { id: "bc-f14", label: "Follow-up plan", type: "textarea", required: false },
      ],
    },
  ],
};

export const perinealCare: ProcedureTemplate = {
  id: "perineal-care",
  name: "Perineal Care",
  category: "Patient Care",
  description:
    "Routine perineal hygiene care to prevent infection and maintain skin integrity.",
  estimatedMinutes: 10,
  steps: [
    {
      id: "pc-step-1",
      title: "Assessment",
      description: "Assess perineal area and patient care needs.",
      type: "form",
      fields: [
        { id: "pc-f1", label: "Patient consent obtained", type: "toggle", required: true },
        { id: "pc-f2", label: "Privacy ensured", type: "toggle", required: true },
        { id: "pc-f3", label: "Catheter in place", type: "toggle", required: true },
        { id: "pc-f4", label: "Skin integrity", type: "select", required: true, options: ["Intact", "Redness", "Excoriation", "Breakdown", "Rash"] },
        { id: "pc-f5", label: "Drainage / discharge present", type: "toggle", required: true },
      ],
    },
    {
      id: "pc-step-2",
      title: "Perineal Care Procedure",
      description: "Cleanse perineal area using correct technique.",
      type: "checklist",
      fields: [
        { id: "pc-f6", label: "Gloves and PPE applied", type: "toggle", required: true },
        { id: "pc-f7", label: "Perineum cleansed front to back (female)", type: "toggle", required: false },
        { id: "pc-f8", label: "Urethral meatus / foreskin cleansed (male)", type: "toggle", required: false },
        { id: "pc-f9", label: "Catheter cleaned 3–4 inches from meatus (if in place)", type: "toggle", required: false },
        { id: "pc-f10", label: "Area thoroughly dried", type: "toggle", required: true },
        { id: "pc-f11", label: "Moisture barrier applied (if needed)", type: "toggle", required: false },
      ],
    },
    {
      id: "pc-step-3",
      title: "Documentation",
      description: "Document care provided and any skin findings.",
      type: "capture",
      fields: [
        { id: "pc-f12", label: "Care completed at", type: "datetime", required: true },
        { id: "pc-f13", label: "Abnormal skin findings reported to provider", type: "toggle", required: false },
        { id: "pc-f14", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const patientCareTemplates: ProcedureTemplate[] = [
  bedBath,
  oralCare,
  patientRepositioning,
  ambulationAssistance,
  patientTransfer,
  rangeOfMotion,
  bowelCare,
  perinealCare,
];
