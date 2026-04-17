import type { ProcedureTemplate } from "../../types/index.ts";

export const shiftHandoffSbar: ProcedureTemplate = {
  id: "shift-handoff-sbar",
  name: "Shift Handoff / SBAR Report",
  category: "Documentation & Safety",
  description:
    "Structured patient handoff using the SBAR (Situation, Background, Assessment, Recommendation) framework at change of shift.",
  estimatedMinutes: 15,
  steps: [
    {
      id: "sbar-step-1",
      title: "Situation & Background",
      description: "Communicate current patient situation and relevant history.",
      type: "form",
      fields: [
        { id: "sbar-f1", label: "Patient Name / Room", type: "text", required: true },
        { id: "sbar-f2", label: "Admitting diagnosis", type: "text", required: true },
        { id: "sbar-f3", label: "Attending Physician", type: "text", required: true },
        { id: "sbar-f4", label: "Code Status", type: "select", required: true, options: ["Full Code", "DNR / DNI", "DNR — Intubation OK", "Comfort Care / Hospice"] },
        { id: "sbar-f5", label: "Isolation precautions", type: "select", required: true, options: ["None", "Contact", "Droplet", "Airborne", "Contact + Droplet", "Reverse isolation"] },
        { id: "sbar-f6", label: "Allergies", type: "text", required: true },
        { id: "sbar-f7", label: "Relevant history / current problem summary", type: "textarea", required: true },
      ],
    },
    {
      id: "sbar-step-2",
      title: "Assessment",
      description: "Summarize current clinical status and key assessment findings.",
      type: "form",
      fields: [
        { id: "sbar-f8", label: "Current vital signs", type: "textarea", required: true },
        { id: "sbar-f9", label: "Pain score", type: "number", required: true, min: 0, max: 10 },
        { id: "sbar-f10", label: "IV access / infusions", type: "textarea", required: false },
        { id: "sbar-f11", label: "Active medications of concern", type: "textarea", required: false },
        { id: "sbar-f12", label: "Pending labs / tests", type: "textarea", required: false },
        { id: "sbar-f13", label: "Notable assessment findings this shift", type: "textarea", required: true },
        { id: "sbar-f14", label: "Safety risks (fall, pressure injury, aspiration)", type: "textarea", required: false },
      ],
    },
    {
      id: "sbar-step-3",
      title: "Recommendation & Handoff Confirmation",
      description: "State recommendations and confirm oncoming nurse has all information.",
      type: "checklist",
      fields: [
        { id: "sbar-f15", label: "Outstanding tasks / tasks to follow up", type: "textarea", required: true },
        { id: "sbar-f16", label: "Oncoming nurse questions answered", type: "toggle", required: true },
        { id: "sbar-f17", label: "Bedside handoff / patient introduced to oncoming nurse", type: "toggle", required: true },
        { id: "sbar-f18", label: "Outgoing Nurse (Full Name)", type: "text", required: true },
        { id: "sbar-f19", label: "Incoming Nurse (Full Name)", type: "text", required: true },
        { id: "sbar-f20", label: "Handoff Date/Time", type: "datetime", required: true },
      ],
    },
  ],
};

export const codeBlueResponse: ProcedureTemplate = {
  id: "code-blue-response",
  name: "Code Blue / Emergency Response",
  category: "Documentation & Safety",
  description:
    "Structured response to a cardiopulmonary arrest including CPR, defibrillation, ACLS medications, and post-event documentation.",
  estimatedMinutes: 30,
  steps: [
    {
      id: "cb-step-1",
      title: "Recognition & Activation",
      description: "Recognize cardiac arrest and activate the code response team.",
      type: "timed",
      fields: [
        { id: "cb-f1", label: "Patient unresponsive — confirmed", type: "toggle", required: true },
        { id: "cb-f2", label: "No pulse / no normal breathing confirmed", type: "toggle", required: true },
        { id: "cb-f3", label: "Code Blue activated", type: "toggle", required: true },
        { id: "cb-f4", label: "Code activated at", type: "datetime", required: true },
        { id: "cb-f5", label: "CPR initiated immediately", type: "toggle", required: true },
        { id: "cb-f6", label: "Defibrillator / AED at bedside", type: "toggle", required: true },
        { id: "cb-f7", label: "Patient placed supine on firm surface", type: "toggle", required: true },
      ],
    },
    {
      id: "cb-step-2",
      title: "CPR & Defibrillation",
      description: "Perform high-quality CPR and defibrillate shockable rhythms.",
      type: "timed",
      fields: [
        { id: "cb-f8", label: "Compressions rate: 100–120/min", type: "toggle", required: true },
        { id: "cb-f9", label: "Compressions depth: ≥ 2 inches (adult)", type: "toggle", required: true },
        { id: "cb-f10", label: "Full chest recoil allowed", type: "toggle", required: true },
        { id: "cb-f11", label: "Ventilation provided (BVM / airway)", type: "toggle", required: true },
        { id: "cb-f12", label: "Initial rhythm", type: "select", required: true, options: ["Ventricular Fibrillation (VF)", "Pulseless Ventricular Tachycardia (pVT)", "Pulseless Electrical Activity (PEA)", "Asystole", "Other"] },
        { id: "cb-f13", label: "Defibrillation delivered (if shockable)", type: "toggle", required: false },
        { id: "cb-f14", label: "Number of shocks delivered", type: "number", required: false, min: 0 },
        { id: "cb-f15", label: "Energy level used (joules)", type: "number", required: false, unit: "J" },
      ],
    },
    {
      id: "cb-step-3",
      title: "ACLS Medications",
      description: "Document medications administered during resuscitation.",
      type: "form",
      fields: [
        { id: "cb-f16", label: "Medications administered", type: "repeater", required: false, options: ["Medication", "Dose", "Route", "Time"] },
        { id: "cb-f17", label: "IV / IO access established", type: "toggle", required: true },
        { id: "cb-f18", label: "Advanced airway placed (ETT / supraglottic)", type: "toggle", required: false },
        { id: "cb-f19", label: "ET tube placement confirmed (EtCO₂ / auscultation)", type: "toggle", required: false },
        { id: "cb-f20", label: "ROSC achieved", type: "toggle", required: true },
        { id: "cb-f21", label: "ROSC time (if achieved)", type: "datetime", required: false },
      ],
    },
    {
      id: "cb-step-4",
      title: "Post-Event Documentation",
      description: "Complete event documentation and coordinate next steps.",
      type: "capture",
      fields: [
        { id: "cb-f22", label: "Outcome", type: "select", required: true, options: ["ROSC — alive, transferred to ICU", "ROSC — stable, returned to floor", "Resuscitation efforts terminated", "Patient expired"] },
        { id: "cb-f23", label: "Code duration (minutes)", type: "number", required: true, unit: "min" },
        { id: "cb-f24", label: "Family notified", type: "toggle", required: true },
        { id: "cb-f25", label: "Code Blue documentation completed in EHR", type: "toggle", required: true },
        { id: "cb-f26", label: "Debrief conducted with team", type: "toggle", required: false },
        { id: "cb-f27", label: "Code Team Leader", type: "text", required: true },
        { id: "cb-f28", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const fallIncidentReport: ProcedureTemplate = {
  id: "fall-incident-report",
  name: "Fall Incident Report",
  category: "Documentation & Safety",
  description:
    "Post-fall assessment and incident documentation including injury evaluation, provider notification, and corrective measures.",
  estimatedMinutes: 20,
  steps: [
    {
      id: "fir-step-1",
      title: "Incident Description",
      description: "Document the circumstances of the fall.",
      type: "form",
      fields: [
        { id: "fir-f1", label: "Date / Time of fall", type: "datetime", required: true },
        { id: "fir-f2", label: "Was fall witnessed", type: "toggle", required: true },
        { id: "fir-f3", label: "Witness name (if applicable)", type: "text", required: false },
        { id: "fir-f4", label: "Location of fall", type: "select", required: true, options: ["Bedside", "Bathroom", "Hallway", "Chair", "Other"] },
        { id: "fir-f5", label: "Patient activity at time of fall", type: "select", required: true, options: ["Getting out of bed", "Ambulating", "Transferring", "Using bathroom", "Reached for item", "Unknown"] },
        { id: "fir-f6", label: "Contributing factors", type: "multiselect", required: true, options: ["Wet floor", "Inadequate lighting", "No call bell", "Side rails down", "Footwear", "Sedating medications", "Confusion / delirium", "Orthostatic hypotension", "Equipment malfunction"] },
        { id: "fir-f7", label: "Fall description", type: "textarea", required: true },
      ],
    },
    {
      id: "fir-step-2",
      title: "Post-Fall Patient Assessment",
      description: "Systematically assess the patient for injury after the fall.",
      type: "form",
      fields: [
        { id: "fir-f8", label: "Vital signs stable post-fall", type: "toggle", required: true },
        { id: "fir-f9", label: "Level of consciousness", type: "select", required: true, options: ["Alert & Oriented — unchanged", "Change from baseline", "Unresponsive"] },
        { id: "fir-f10", label: "Injury sustained", type: "toggle", required: true },
        { id: "fir-f11", label: "Injury type", type: "select", required: false, options: ["None", "Abrasion / skin tear", "Laceration", "Contusion / bruise", "Suspected fracture", "Head injury", "Other"] },
        { id: "fir-f12", label: "Injury location", type: "text", required: false },
        { id: "fir-f13", label: "Neurological check performed", type: "toggle", required: true },
        { id: "fir-f14", label: "Assessment details", type: "textarea", required: true },
      ],
    },
    {
      id: "fir-step-3",
      title: "Notification & Corrective Measures",
      description: "Notify appropriate personnel and implement corrective fall prevention measures.",
      type: "capture",
      fields: [
        { id: "fir-f15", label: "Physician notified", type: "toggle", required: true },
        { id: "fir-f16", label: "Physician notification time", type: "datetime", required: false },
        { id: "fir-f17", label: "Family / surrogate notified", type: "toggle", required: true },
        { id: "fir-f18", label: "Incident report filed (safety reporting system)", type: "toggle", required: true },
        { id: "fir-f19", label: "Fall risk reassessment completed", type: "toggle", required: true },
        { id: "fir-f20", label: "Updated fall prevention interventions", type: "textarea", required: true },
        { id: "fir-f21", label: "Reporting Nurse (Full Name)", type: "text", required: true },
      ],
    },
  ],
};

export const isolationPrecautions: ProcedureTemplate = {
  id: "isolation-precautions-setup",
  name: "Isolation Precautions Setup & Maintenance",
  category: "Documentation & Safety",
  description:
    "Implementation of transmission-based isolation precautions including room setup, signage, and staff/visitor education.",
  estimatedMinutes: 15,
  steps: [
    {
      id: "ip-step-1",
      title: "Precaution Type & Indication",
      description: "Confirm the type of isolation required and the clinical indication.",
      type: "form",
      fields: [
        { id: "ip-f1", label: "Isolation type", type: "select", required: true, options: ["Contact", "Droplet", "Airborne", "Contact + Droplet", "Contact + Airborne", "Reverse / Protective"] },
        { id: "ip-f2", label: "Indication / organism (if known)", type: "text", required: true },
        { id: "ip-f3", label: "Provider order confirmed", type: "toggle", required: true },
        { id: "ip-f4", label: "Infection control notified (if required)", type: "toggle", required: false },
      ],
    },
    {
      id: "ip-step-2",
      title: "Room Setup",
      description: "Prepare the patient room and gather required PPE.",
      type: "checklist",
      fields: [
        { id: "ip-f5", label: "Private room assigned (or cohorted per policy)", type: "toggle", required: true },
        { id: "ip-f6", label: "Isolation signage posted at room entrance", type: "toggle", required: true },
        { id: "ip-f7", label: "PPE station set up outside room (gloves, gowns, masks/respirators)", type: "toggle", required: true },
        { id: "ip-f8", label: "Dedicated patient care equipment placed in room (stethoscope, BP cuff)", type: "toggle", required: true },
        { id: "ip-f9", label: "Waste disposal / linen procedures in place", type: "toggle", required: true },
        { id: "ip-f10", label: "N95 respirator available and staff fit-tested (airborne)", type: "toggle", required: false },
        { id: "ip-f11", label: "Negative pressure room confirmed (airborne)", type: "toggle", required: false },
      ],
    },
    {
      id: "ip-step-3",
      title: "Staff & Visitor Education",
      description: "Educate staff and visitors on proper PPE use and isolation requirements.",
      type: "checklist",
      fields: [
        { id: "ip-f12", label: "Patient educated on isolation reason and requirements", type: "toggle", required: true },
        { id: "ip-f13", label: "Family / visitors instructed on PPE and visitation restrictions", type: "toggle", required: true },
        { id: "ip-f14", label: "All staff notified of precaution type", type: "toggle", required: true },
        { id: "ip-f15", label: "Hand hygiene reinforced for all entering / exiting room", type: "toggle", required: true },
      ],
    },
    {
      id: "ip-step-4",
      title: "Documentation",
      description: "Document isolation initiation and patient education.",
      type: "capture",
      fields: [
        { id: "ip-f16", label: "Isolation initiated at", type: "datetime", required: true },
        { id: "ip-f17", label: "Initiating Nurse (Full Name)", type: "text", required: true },
        { id: "ip-f18", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const restraintAssessment: ProcedureTemplate = {
  id: "restraint-assessment",
  name: "Restraint Assessment & Application",
  category: "Documentation & Safety",
  description:
    "Assessment, order verification, application, and ongoing monitoring of patient restraints per regulatory standards.",
  estimatedMinutes: 20,
  steps: [
    {
      id: "ra2-step-1",
      title: "Restraint Indication & Order Verification",
      description: "Confirm medical necessity and obtain the required order.",
      type: "form",
      fields: [
        { id: "ra2-f1", label: "Clinical indication for restraint", type: "select", required: true, options: ["Risk of self-harm — pulling lines/tubes", "Danger to staff / others", "Preventing fall with altered mental status", "Medical necessity — per physician order"] },
        { id: "ra2-f2", label: "Physician order confirmed", type: "toggle", required: true },
        { id: "ra2-f3", label: "Restraint type ordered", type: "select", required: true, options: ["Soft wrist restraints (bilateral)", "Soft wrist restraints (unilateral)", "Vest restraint", "Mitts", "Enclosed bed / net enclosure"] },
        { id: "ra2-f4", label: "Patient / surrogate informed", type: "toggle", required: true },
      ],
    },
    {
      id: "ra2-step-2",
      title: "Alternative Measures Attempted",
      description: "Document alternatives tried before applying restraints.",
      type: "checklist",
      fields: [
        { id: "ra2-f5", label: "Reorientation / calm communication attempted", type: "toggle", required: true },
        { id: "ra2-f6", label: "Repositioning / comfort measures tried", type: "toggle", required: true },
        { id: "ra2-f7", label: "Pain / discomfort addressed", type: "toggle", required: true },
        { id: "ra2-f8", label: "Family / sitter presence considered", type: "toggle", required: true },
        { id: "ra2-f9", label: "Environment modified (lighting, noise, familiar objects)", type: "toggle", required: true },
        { id: "ra2-f10", label: "All alternatives ineffective or not feasible", type: "toggle", required: true },
      ],
    },
    {
      id: "ra2-step-3",
      title: "Application & Initial Check",
      description: "Apply restraint and verify safety immediately after application.",
      type: "timed",
      fields: [
        { id: "ra2-f11", label: "Restraint applied correctly per policy", type: "toggle", required: true },
        { id: "ra2-f12", label: "Applied at", type: "datetime", required: true },
        { id: "ra2-f13", label: "Two-finger check: restraint not too tight", type: "toggle", required: true },
        { id: "ra2-f14", label: "Restraint tied to non-movable bed frame (quick-release knot)", type: "toggle", required: true },
        { id: "ra2-f15", label: "Circulation, sensation, movement (CSM) intact distal to restraint", type: "toggle", required: true },
      ],
    },
    {
      id: "ra2-step-4",
      title: "Monitoring Documentation",
      description: "Document ongoing q2h (or per policy) monitoring assessments.",
      type: "form",
      fields: [
        { id: "ra2-f16", label: "Monitoring Date/Time", type: "datetime", required: true },
        { id: "ra2-f17", label: "CSM assessment: Circulation intact", type: "toggle", required: true },
        { id: "ra2-f18", label: "CSM assessment: Sensation intact", type: "toggle", required: true },
        { id: "ra2-f19", label: "CSM assessment: Movement intact", type: "toggle", required: true },
        { id: "ra2-f20", label: "Restraint released and range of motion performed", type: "toggle", required: true },
        { id: "ra2-f21", label: "Continued need for restraint reassessed", type: "toggle", required: true },
        { id: "ra2-f22", label: "Restraint discontinued (if no longer needed)", type: "toggle", required: false },
        { id: "ra2-f23", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const dischargeTeaching: ProcedureTemplate = {
  id: "discharge-teaching",
  name: "Discharge Planning & Patient Education",
  category: "Documentation & Safety",
  description:
    "Comprehensive discharge teaching including medication reconciliation, activity restrictions, follow-up, and return precautions.",
  estimatedMinutes: 30,
  steps: [
    {
      id: "dt-step-1",
      title: "Discharge Readiness Assessment",
      description: "Assess patient and caregiver readiness for discharge.",
      type: "form",
      fields: [
        { id: "dt-f1", label: "Discharge destination", type: "select", required: true, options: ["Home (independent)", "Home with home health", "Skilled nursing facility", "Rehabilitation facility", "Long-term care", "Assisted living", "Hospice"] },
        { id: "dt-f2", label: "Primary caregiver identified", type: "toggle", required: true },
        { id: "dt-f3", label: "Patient health literacy assessed", type: "select", required: true, options: ["Adequate", "Limited", "Non-English speaking — interpreter used", "Unable to assess"] },
        { id: "dt-f4", label: "Patient / caregiver willing and able to learn", type: "toggle", required: true },
        { id: "dt-f5", label: "Barriers to learning addressed", type: "textarea", required: false },
      ],
    },
    {
      id: "dt-step-2",
      title: "Medication Teaching",
      description: "Review all discharge medications and ensure patient understanding.",
      type: "checklist",
      fields: [
        { id: "dt-f6", label: "Discharge medication list reviewed with patient", type: "toggle", required: true },
        { id: "dt-f7", label: "New medications explained (name, dose, purpose, side effects)", type: "toggle", required: true },
        { id: "dt-f8", label: "Medication changes from admission reconciled", type: "toggle", required: true },
        { id: "dt-f9", label: "Medication schedule given in writing", type: "toggle", required: true },
        { id: "dt-f10", label: "Prescriptions given / sent to pharmacy", type: "toggle", required: true },
      ],
    },
    {
      id: "dt-step-3",
      title: "Activity, Diet & Follow-Up Instructions",
      description: "Provide activity, diet, wound care, and follow-up instructions.",
      type: "checklist",
      fields: [
        { id: "dt-f11", label: "Activity restrictions explained", type: "toggle", required: true },
        { id: "dt-f12", label: "Dietary instructions provided", type: "toggle", required: false },
        { id: "dt-f13", label: "Wound care instructions given (if applicable)", type: "toggle", required: false },
        { id: "dt-f14", label: "Follow-up appointment scheduled and given", type: "toggle", required: true },
        { id: "dt-f15", label: "Return precautions / warning signs reviewed", type: "toggle", required: true },
        { id: "dt-f16", label: "When to call 911 vs. provider reviewed", type: "toggle", required: true },
        { id: "dt-f17", label: "Written discharge instructions given", type: "toggle", required: true },
      ],
    },
    {
      id: "dt-step-4",
      title: "Patient Understanding Verification",
      description: "Verify patient understanding using teach-back method and obtain signature.",
      type: "signature",
      fields: [
        { id: "dt-f18", label: "Teach-back performed — patient demonstrated understanding", type: "toggle", required: true },
        { id: "dt-f19", label: "Questions addressed", type: "textarea", required: false },
        { id: "dt-f20", label: "Patient / caregiver verbalized understanding of return precautions", type: "toggle", required: true },
        { id: "dt-f21", label: "Patient / Caregiver Name (Full Name)", type: "text", required: true },
        { id: "dt-f22", label: "Discharging Nurse (Full Name)", type: "text", required: true },
        { id: "dt-f23", label: "Discharge Date/Time", type: "datetime", required: true },
      ],
    },
  ],
};

export const safetyDocumentationTemplates: ProcedureTemplate[] = [
  shiftHandoffSbar,
  codeBlueResponse,
  fallIncidentReport,
  isolationPrecautions,
  restraintAssessment,
  dischargeTeaching,
];
