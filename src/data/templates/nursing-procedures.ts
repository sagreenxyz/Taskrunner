import type { ProcedureTemplate } from "../../types/index.ts";

export const peripheralIvInsertion: ProcedureTemplate = {
  id: "peripheral-iv-insertion",
  name: "Peripheral IV Insertion",
  category: "Procedure",
  description:
    "Insertion of a peripheral intravenous catheter using aseptic technique, including vein selection and site care.",
  estimatedMinutes: 15,
  steps: [
    {
      id: "piv-step-1",
      title: "Patient Assessment & Vein Selection",
      description: "Assess patient, gather supplies, and identify an appropriate vein.",
      type: "form",
      fields: [
        { id: "piv-f1", label: "Two patient identifiers confirmed", type: "toggle", required: true },
        { id: "piv-f2", label: "Indication for IV access", type: "text", required: true },
        { id: "piv-f3", label: "Catheter size selected (gauge)", type: "select", required: true, options: ["14G", "16G", "18G", "20G", "22G", "24G"] },
        { id: "piv-f4", label: "Site selected", type: "select", required: true, options: ["Forearm", "Antecubital fossa", "Hand", "Wrist", "Other"] },
        { id: "piv-f5", label: "Extremity with AV fistula / mastectomy side avoided", type: "toggle", required: true },
        { id: "piv-f6", label: "Allergies to adhesives / antiseptics noted", type: "toggle", required: true },
      ],
    },
    {
      id: "piv-step-2",
      title: "Insertion Procedure",
      description: "Insert IV catheter using sterile technique.",
      type: "timed",
      fields: [
        { id: "piv-f7", label: "Tourniquet applied", type: "toggle", required: true },
        { id: "piv-f8", label: "Site cleaned with antiseptic and allowed to dry", type: "toggle", required: true },
        { id: "piv-f9", label: "Catheter inserted on first attempt", type: "toggle", required: true },
        { id: "piv-f10", label: "Attempts required", type: "number", required: true, min: 1, max: 5 },
        { id: "piv-f11", label: "Blood return confirmed", type: "toggle", required: true },
        { id: "piv-f12", label: "IV line connected and flushed", type: "toggle", required: true },
        { id: "piv-f13", label: "Catheter secured and labeled with date/time", type: "toggle", required: true },
      ],
    },
    {
      id: "piv-step-3",
      title: "Site Verification & Documentation",
      description: "Confirm site patency and document insertion details.",
      type: "capture",
      fields: [
        { id: "piv-f14", label: "Site free of redness / swelling / infiltration", type: "toggle", required: true },
        { id: "piv-f15", label: "Patient tolerated procedure", type: "toggle", required: true },
        { id: "piv-f16", label: "Insertion Date/Time", type: "datetime", required: true },
        { id: "piv-f17", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const centralLineDressing: ProcedureTemplate = {
  id: "central-line-dressing",
  name: "Central Line Dressing Change",
  category: "Procedure",
  description:
    "Sterile dressing change for a central venous catheter (CVC) or PICC line using maximal barrier precautions.",
  estimatedMinutes: 20,
  steps: [
    {
      id: "cld-step-1",
      title: "Pre-Procedure Preparation",
      description: "Gather supplies and prepare the sterile field.",
      type: "checklist",
      fields: [
        { id: "cld-f1", label: "Order / indication confirmed", type: "toggle", required: true },
        { id: "cld-f2", label: "Patient positioned with head turned away from site", type: "toggle", required: true },
        { id: "cld-f3", label: "Mask applied to patient and nurse", type: "toggle", required: true },
        { id: "cld-f4", label: "Sterile gloves and field prepared", type: "toggle", required: true },
        { id: "cld-f5", label: "Supplies: CHG dressing, transparent dressing, stat-lock / securement", type: "toggle", required: true },
      ],
    },
    {
      id: "cld-step-2",
      title: "Dressing Change Procedure",
      description: "Remove old dressing, inspect site, and apply new dressing using sterile technique.",
      type: "timed",
      fields: [
        { id: "cld-f6", label: "Old dressing removed (peel edges toward insertion site)", type: "toggle", required: true },
        { id: "cld-f7", label: "Insertion site inspected", type: "toggle", required: true },
        { id: "cld-f8", label: "Signs of infection / phlebitis at site", type: "toggle", required: true },
        { id: "cld-f9", label: "Site cleaned with CHG solution per policy", type: "toggle", required: true },
        { id: "cld-f10", label: "CHG allowed to dry completely", type: "toggle", required: true },
        { id: "cld-f11", label: "New dressing applied", type: "toggle", required: true },
        { id: "cld-f12", label: "Securement device applied", type: "toggle", required: true },
        { id: "cld-f13", label: "Dressing labeled with date, time, and nurse initials", type: "toggle", required: true },
      ],
    },
    {
      id: "cld-step-3",
      title: "Site Assessment & Documentation",
      description: "Document site condition and next scheduled dressing change.",
      type: "capture",
      fields: [
        { id: "cld-f14", label: "External catheter length (cm)", type: "number", required: true, unit: "cm" },
        { id: "cld-f15", label: "Site condition", type: "select", required: true, options: ["Clean and intact", "Redness", "Swelling", "Discharge", "Tenderness"] },
        { id: "cld-f16", label: "Dressing Change Date/Time", type: "datetime", required: true },
        { id: "cld-f17", label: "Next scheduled change", type: "datetime", required: true },
        { id: "cld-f18", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const foleyCatheterInsertion: ProcedureTemplate = {
  id: "foley-catheter-insertion",
  name: "Foley Catheter Insertion",
  category: "Procedure",
  description:
    "Sterile insertion of an indwelling urinary catheter including indication verification, procedure, and CAUTI prevention.",
  estimatedMinutes: 20,
  steps: [
    {
      id: "fc-step-1",
      title: "Indication Verification & Preparation",
      description: "Confirm appropriate indication and prepare sterile supplies.",
      type: "checklist",
      fields: [
        { id: "fc-f1", label: "Physician order confirmed", type: "toggle", required: true },
        { id: "fc-f2", label: "Indication is appropriate (CAUTI prevention criteria met)", type: "toggle", required: true },
        { id: "fc-f3", label: "Two patient identifiers confirmed", type: "toggle", required: true },
        { id: "fc-f4", label: "Patient consent obtained", type: "toggle", required: true },
        { id: "fc-f5", label: "Catheter size selected", type: "select", required: true, options: ["12 Fr", "14 Fr", "16 Fr", "18 Fr", "20 Fr", "22 Fr"] },
        { id: "fc-f6", label: "Sterile kit and supplies gathered", type: "toggle", required: true },
        { id: "fc-f7", label: "Allergies to latex / antiseptics reviewed", type: "toggle", required: true },
      ],
    },
    {
      id: "fc-step-2",
      title: "Catheter Insertion",
      description: "Insert catheter using sterile technique.",
      type: "timed",
      fields: [
        { id: "fc-f8", label: "Patient positioned correctly", type: "toggle", required: true },
        { id: "fc-f9", label: "Perineal area cleansed", type: "toggle", required: true },
        { id: "fc-f10", label: "Sterile field maintained throughout", type: "toggle", required: true },
        { id: "fc-f11", label: "Catheter inserted to appropriate depth", type: "toggle", required: true },
        { id: "fc-f12", label: "Urine return confirmed before balloon inflation", type: "toggle", required: true },
        { id: "fc-f13", label: "Balloon inflated with appropriate volume (mL)", type: "number", required: true, unit: "mL" },
        { id: "fc-f14", label: "Catheter secured to leg / thigh", type: "toggle", required: true },
        { id: "fc-f15", label: "Drainage bag positioned below bladder level", type: "toggle", required: true },
      ],
    },
    {
      id: "fc-step-3",
      title: "Post-Insertion Check & Documentation",
      description: "Confirm adequate drainage and document insertion.",
      type: "capture",
      fields: [
        { id: "fc-f16", label: "Initial urine output (mL)", type: "number", required: true, unit: "mL" },
        { id: "fc-f17", label: "Urine color / clarity", type: "select", required: true, options: ["Clear / yellow", "Amber", "Pink / blood-tinged", "Cloudy", "Hematuria"] },
        { id: "fc-f18", label: "Patient tolerated procedure", type: "toggle", required: true },
        { id: "fc-f19", label: "Insertion Date/Time", type: "datetime", required: true },
        { id: "fc-f20", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const nasogastricTubeInsertion: ProcedureTemplate = {
  id: "nasogastric-tube-insertion",
  name: "Nasogastric Tube Insertion",
  category: "Procedure",
  description:
    "Insertion of a nasogastric tube for decompression, feeding, or medication administration with placement verification.",
  estimatedMinutes: 20,
  steps: [
    {
      id: "ng-step-1",
      title: "Preparation & Patient Education",
      description: "Gather equipment and explain the procedure to the patient.",
      type: "checklist",
      fields: [
        { id: "ng-f1", label: "Physician order confirmed", type: "toggle", required: true },
        { id: "ng-f2", label: "Patient explained procedure and consent given", type: "toggle", required: true },
        { id: "ng-f3", label: "Tube size selected", type: "select", required: true, options: ["8 Fr", "10 Fr", "12 Fr", "14 Fr", "16 Fr", "18 Fr"] },
        { id: "ng-f4", label: "Nostril patency assessed (most patent side)", type: "toggle", required: true },
        { id: "ng-f5", label: "Insertion length measured (NEX method)", type: "toggle", required: true },
        { id: "ng-f6", label: "Measured length (cm)", type: "number", required: true, unit: "cm" },
      ],
    },
    {
      id: "ng-step-2",
      title: "Tube Insertion",
      description: "Insert NG tube with patient cooperation.",
      type: "timed",
      fields: [
        { id: "ng-f7", label: "HOB elevated ≥ 30°", type: "toggle", required: true },
        { id: "ng-f8", label: "Tube lubricated", type: "toggle", required: true },
        { id: "ng-f9", label: "Tube advanced while patient swallows", type: "toggle", required: true },
        { id: "ng-f10", label: "No coughing or cyanosis during insertion", type: "toggle", required: true },
        { id: "ng-f11", label: "No signs of respiratory misplacement observed", type: "toggle", required: true },
      ],
    },
    {
      id: "ng-step-3",
      title: "Placement Verification",
      description: "Confirm correct NG tube placement before use.",
      type: "checklist",
      fields: [
        { id: "ng-f12", label: "X-ray confirms gastric placement (gold standard)", type: "toggle", required: false },
        { id: "ng-f13", label: "Gastric aspirate pH ≤ 5.5 (if per policy)", type: "toggle", required: false },
        { id: "ng-f14", label: "External marking at nostril documented", type: "toggle", required: true },
        { id: "ng-f15", label: "Tube secured to nose with tape", type: "toggle", required: true },
      ],
    },
    {
      id: "ng-step-4",
      title: "Documentation",
      description: "Document insertion details and verification method.",
      type: "capture",
      fields: [
        { id: "ng-f16", label: "Insertion Date/Time", type: "datetime", required: true },
        { id: "ng-f17", label: "Verification method used", type: "text", required: true },
        { id: "ng-f18", label: "External marking at nostril (cm)", type: "number", required: true, unit: "cm" },
        { id: "ng-f19", label: "Patient tolerated procedure", type: "toggle", required: true },
        { id: "ng-f20", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const woundDressingChange: ProcedureTemplate = {
  id: "wound-dressing-change",
  name: "Wound Assessment & Dressing Change",
  category: "Procedure",
  description:
    "Assessment of an acute or chronic wound and application of an appropriate dressing using sterile or clean technique.",
  estimatedMinutes: 20,
  steps: [
    {
      id: "wd-step-1",
      title: "Wound Assessment",
      description: "Systematically assess and document the wound.",
      type: "form",
      fields: [
        { id: "wd-f1", label: "Wound location", type: "text", required: true },
        { id: "wd-f2", label: "Wound type", type: "select", required: true, options: ["Surgical", "Trauma / laceration", "Pressure injury", "Diabetic / neuropathic", "Arterial", "Venous", "Burn", "Other"] },
        { id: "wd-f3", label: "Wound length (cm)", type: "number", required: true, unit: "cm" },
        { id: "wd-f4", label: "Wound width (cm)", type: "number", required: true, unit: "cm" },
        { id: "wd-f5", label: "Wound depth (cm)", type: "number", required: false, unit: "cm" },
        { id: "wd-f6", label: "Wound bed tissue", type: "multiselect", required: true, options: ["Granulation", "Slough", "Eschar", "Epithelialization", "Exposed tendon/bone"] },
        { id: "wd-f7", label: "Exudate amount", type: "select", required: true, options: ["None", "Scant", "Moderate", "Heavy"] },
        { id: "wd-f8", label: "Exudate type", type: "select", required: true, options: ["Serous", "Serosanguineous", "Sanguineous", "Purulent"] },
        { id: "wd-f9", label: "Periwound skin condition", type: "select", required: true, options: ["Intact", "Macerated", "Erythematous", "Indurated", "Blistered"] },
        { id: "wd-f10", label: "Signs of infection", type: "toggle", required: true },
      ],
    },
    {
      id: "wd-step-2",
      title: "Dressing Change Procedure",
      description: "Remove old dressing and apply new dressing per wound care order.",
      type: "timed",
      fields: [
        { id: "wd-f11", label: "Old dressing removed carefully", type: "toggle", required: true },
        { id: "wd-f12", label: "Wound irrigated / cleaned per order", type: "toggle", required: true },
        { id: "wd-f13", label: "Wound cleanser used", type: "text", required: false },
        { id: "wd-f14", label: "New dressing type applied", type: "text", required: true },
        { id: "wd-f15", label: "Dressing secured", type: "toggle", required: true },
        { id: "wd-f16", label: "Patient tolerated procedure", type: "toggle", required: true },
      ],
    },
    {
      id: "wd-step-3",
      title: "Documentation & Reporting",
      description: "Document wound findings and flag for provider review if indicated.",
      type: "capture",
      fields: [
        { id: "wd-f17", label: "Dressing Change Date/Time", type: "datetime", required: true },
        { id: "wd-f18", label: "Provider notified of wound changes", type: "toggle", required: false },
        { id: "wd-f19", label: "Wound care consult ordered / in place", type: "toggle", required: false },
        { id: "wd-f20", label: "Next scheduled dressing change", type: "datetime", required: false },
        { id: "wd-f21", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const pressureInjuryCare: ProcedureTemplate = {
  id: "pressure-injury-care",
  name: "Pressure Injury Prevention & Care",
  category: "Procedure",
  description:
    "Prevention measures and staged wound care for pressure injuries including repositioning, offloading, and dressing.",
  estimatedMinutes: 25,
  steps: [
    {
      id: "pi-step-1",
      title: "Pressure Injury Staging",
      description: "Inspect and stage the pressure injury.",
      type: "form",
      fields: [
        { id: "pi-f1", label: "Injury location", type: "select", required: true, options: ["Sacrum", "Coccyx", "Right heel", "Left heel", "Right hip", "Left hip", "Occiput", "Elbow", "Other"] },
        { id: "pi-f2", label: "Stage", type: "select", required: true, options: ["Stage 1 — Non-blanchable redness", "Stage 2 — Partial thickness skin loss", "Stage 3 — Full thickness skin loss", "Stage 4 — Full thickness tissue loss", "Unstageable", "Deep tissue pressure injury (DTPI)"] },
        { id: "pi-f3", label: "Length (cm)", type: "number", required: true, unit: "cm" },
        { id: "pi-f4", label: "Width (cm)", type: "number", required: true, unit: "cm" },
        { id: "pi-f5", label: "Depth (cm)", type: "number", required: false, unit: "cm" },
        { id: "pi-f6", label: "Undermining / tunneling present", type: "toggle", required: true },
        { id: "pi-f7", label: "Wound bed description", type: "textarea", required: true },
      ],
    },
    {
      id: "pi-step-2",
      title: "Wound Bed Preparation & Dressing",
      description: "Clean the wound and apply appropriate dressing.",
      type: "timed",
      fields: [
        { id: "pi-f8", label: "Wound irrigated with normal saline", type: "toggle", required: true },
        { id: "pi-f9", label: "Necrotic tissue debrided (if ordered)", type: "toggle", required: false },
        { id: "pi-f10", label: "Dressing type applied", type: "text", required: true },
        { id: "pi-f11", label: "Wound care completed at", type: "datetime", required: true },
      ],
    },
    {
      id: "pi-step-3",
      title: "Prevention Measures",
      description: "Implement pressure injury prevention strategies.",
      type: "checklist",
      fields: [
        { id: "pi-f12", label: "Repositioning schedule q2h in place", type: "toggle", required: true },
        { id: "pi-f13", label: "Pressure-redistributing surface in use", type: "toggle", required: true },
        { id: "pi-f14", label: "Heels offloaded", type: "toggle", required: true },
        { id: "pi-f15", label: "Moisture management in place", type: "toggle", required: true },
        { id: "pi-f16", label: "Nutrition / hydration optimized", type: "toggle", required: true },
        { id: "pi-f17", label: "Wound care / wound nurse consulted", type: "toggle", required: false },
      ],
    },
    {
      id: "pi-step-4",
      title: "Documentation",
      description: "Record wound measurements and care provided.",
      type: "capture",
      fields: [
        { id: "pi-f18", label: "Provider notified", type: "toggle", required: true },
        { id: "pi-f19", label: "Improvement / deterioration from last assessment", type: "select", required: true, options: ["Improved", "Unchanged", "Deteriorated", "First assessment"] },
        { id: "pi-f20", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const drainManagement: ProcedureTemplate = {
  id: "drain-management",
  name: "Surgical Drain Management",
  category: "Procedure",
  description:
    "Care and emptying of surgical wound drains (Jackson-Pratt, Hemovac, or other closed-suction drains).",
  estimatedMinutes: 10,
  steps: [
    {
      id: "dm-step-1",
      title: "Drain Assessment",
      description: "Inspect the drain and insertion site.",
      type: "form",
      fields: [
        { id: "dm-f1", label: "Drain type", type: "select", required: true, options: ["Jackson-Pratt (JP)", "Hemovac", "Blake drain", "Penrose", "Other"] },
        { id: "dm-f2", label: "Drain location / label", type: "text", required: true },
        { id: "dm-f3", label: "Drain insertion site intact", type: "toggle", required: true },
        { id: "dm-f4", label: "Drain secured / suture intact", type: "toggle", required: true },
        { id: "dm-f5", label: "Drainage color", type: "select", required: true, options: ["Serous", "Serosanguineous", "Sanguineous", "Purulent", "Bilious", "None"] },
      ],
    },
    {
      id: "dm-step-2",
      title: "Drain Care & Emptying",
      description: "Empty the drain reservoir and re-establish suction.",
      type: "timed",
      fields: [
        { id: "dm-f6", label: "Drain output measured and recorded (mL)", type: "number", required: true, unit: "mL" },
        { id: "dm-f7", label: "Drain reservoir emptied using clean technique", type: "toggle", required: true },
        { id: "dm-f8", label: "Suction re-established (bulb compressed and plugged)", type: "toggle", required: true },
        { id: "dm-f9", label: "Drain patent (no clots / kinks)", type: "toggle", required: true },
        { id: "dm-f10", label: "Assessment Date/Time", type: "datetime", required: true },
        { id: "dm-f11", label: "Abnormal output reported to provider", type: "toggle", required: false },
        { id: "dm-f12", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const sutureRemoval: ProcedureTemplate = {
  id: "suture-removal",
  name: "Suture / Staple Removal",
  category: "Procedure",
  description:
    "Removal of wound sutures or staples after adequate wound healing, including wound assessment and aftercare.",
  estimatedMinutes: 15,
  steps: [
    {
      id: "sr-step-1",
      title: "Wound Assessment & Order Verification",
      description: "Confirm removal order and assess wound readiness.",
      type: "checklist",
      fields: [
        { id: "sr-f1", label: "Physician order for removal confirmed", type: "toggle", required: true },
        { id: "sr-f2", label: "Days since closure", type: "number", required: true, unit: "days" },
        { id: "sr-f3", label: "Wound edges well-approximated", type: "toggle", required: true },
        { id: "sr-f4", label: "No signs of infection / dehiscence", type: "toggle", required: true },
        { id: "sr-f5", label: "Removal type", type: "select", required: true, options: ["Sutures (interrupted)", "Sutures (continuous)", "Staples", "Combination"] },
      ],
    },
    {
      id: "sr-step-2",
      title: "Removal Procedure",
      description: "Remove sutures or staples using correct technique.",
      type: "timed",
      fields: [
        { id: "sr-f6", label: "Site cleansed before removal", type: "toggle", required: true },
        { id: "sr-f7", label: "All sutures / staples removed", type: "toggle", required: true },
        { id: "sr-f8", label: "Total sutures / staples removed", type: "number", required: true },
        { id: "sr-f9", label: "Wound closure strips (Steri-strips) applied", type: "toggle", required: false },
        { id: "sr-f10", label: "Wound intact after removal", type: "toggle", required: true },
        { id: "sr-f11", label: "Patient tolerated procedure", type: "toggle", required: true },
      ],
    },
    {
      id: "sr-step-3",
      title: "Post-Procedure Assessment & Documentation",
      description: "Document the procedure and provide wound care instructions.",
      type: "capture",
      fields: [
        { id: "sr-f12", label: "Wound appearance after removal", type: "textarea", required: true },
        { id: "sr-f13", label: "Patient instructed on wound care", type: "toggle", required: true },
        { id: "sr-f14", label: "Procedure Date/Time", type: "datetime", required: true },
        { id: "sr-f15", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const urinaryCatheterCare: ProcedureTemplate = {
  id: "urinary-catheter-care",
  name: "Urinary Catheter Care",
  category: "Procedure",
  description:
    "Routine indwelling urinary catheter care to prevent CAUTI, including site inspection and catheter assessment.",
  estimatedMinutes: 10,
  steps: [
    {
      id: "ucc-step-1",
      title: "Catheter Assessment",
      description: "Assess the catheter system and ongoing need for the catheter.",
      type: "form",
      fields: [
        { id: "ucc-f1", label: "Catheter insertion date", type: "datetime", required: true },
        { id: "ucc-f2", label: "Continued indication documented", type: "toggle", required: true },
        { id: "ucc-f3", label: "Drainage system intact and patent", type: "toggle", required: true },
        { id: "ucc-f4", label: "Catheter free of kinks", type: "toggle", required: true },
        { id: "ucc-f5", label: "Drainage bag below bladder level", type: "toggle", required: true },
        { id: "ucc-f6", label: "Urine color / clarity", type: "select", required: true, options: ["Clear / yellow", "Amber", "Cloudy", "Pink / blood-tinged", "Hematuria", "Dark / concentrated"] },
        { id: "ucc-f7", label: "Urine output last shift (mL)", type: "number", required: true, unit: "mL" },
      ],
    },
    {
      id: "ucc-step-2",
      title: "Catheter Care Procedure",
      description: "Perform catheter care using aseptic principles.",
      type: "checklist",
      fields: [
        { id: "ucc-f8", label: "Gloves and PPE applied", type: "toggle", required: true },
        { id: "ucc-f9", label: "Periurethral area and catheter cleaned", type: "toggle", required: true },
        { id: "ucc-f10", label: "Catheter secured to thigh / abdomen (no tension)", type: "toggle", required: true },
        { id: "ucc-f11", label: "Catheter removal considered / discussed with provider", type: "toggle", required: true },
      ],
    },
    {
      id: "ucc-step-3",
      title: "Documentation",
      description: "Record catheter care, output, and any concerns.",
      type: "capture",
      fields: [
        { id: "ucc-f12", label: "Care completed at", type: "datetime", required: true },
        { id: "ucc-f13", label: "Signs of UTI / catheter malfunction reported", type: "toggle", required: false },
        { id: "ucc-f14", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const tracheostomyCare: ProcedureTemplate = {
  id: "tracheostomy-care",
  name: "Tracheostomy Care",
  category: "Procedure",
  description:
    "Comprehensive tracheostomy care including inner cannula cleaning, stoma care, and tie/holder replacement.",
  estimatedMinutes: 20,
  steps: [
    {
      id: "tc-step-1",
      title: "Pre-Procedure Assessment",
      description: "Assess the tracheostomy site and patient respiratory status before care.",
      type: "checklist",
      fields: [
        { id: "tc-f1", label: "SpO₂ ≥ target before procedure", type: "toggle", required: true },
        { id: "tc-f2", label: "SpO₂ (%)", type: "number", required: true, min: 0, max: 100, unit: "%" },
        { id: "tc-f3", label: "Suction equipment at bedside", type: "toggle", required: true },
        { id: "tc-f4", label: "Obturator and spare trach at bedside", type: "toggle", required: true },
        { id: "tc-f5", label: "Trach type and size confirmed", type: "text", required: true },
        { id: "tc-f6", label: "Balloon cuff pressure checked (if cuffed)", type: "number", required: false, min: 0, max: 30, unit: "cmH₂O" },
      ],
    },
    {
      id: "tc-step-2",
      title: "Inner Cannula Cleaning",
      description: "Remove, clean or replace the inner cannula.",
      type: "timed",
      fields: [
        { id: "tc-f7", label: "Inner cannula type", type: "select", required: true, options: ["Disposable (replaced)", "Reusable (cleaned)"] },
        { id: "tc-f8", label: "Inner cannula removed safely", type: "toggle", required: true },
        { id: "tc-f9", label: "Inner cannula cleaned / replaced", type: "toggle", required: true },
        { id: "tc-f10", label: "Inner cannula reinserted and locked", type: "toggle", required: true },
        { id: "tc-f11", label: "Secretions suctioned as needed", type: "toggle", required: false },
      ],
    },
    {
      id: "tc-step-3",
      title: "Stoma & Tie/Holder Care",
      description: "Clean the stoma site and replace trach ties or Velcro holder.",
      type: "checklist",
      fields: [
        { id: "tc-f12", label: "Old trach dressing removed", type: "toggle", required: true },
        { id: "tc-f13", label: "Stoma site cleaned with normal saline / CHG (per policy)", type: "toggle", required: true },
        { id: "tc-f14", label: "Stoma site intact, no breakdown or infection", type: "toggle", required: true },
        { id: "tc-f15", label: "New trach dressing applied", type: "toggle", required: true },
        { id: "tc-f16", label: "Trach ties / holder replaced (two-nurse technique)", type: "toggle", required: true },
        { id: "tc-f17", label: "Tie tightness: one finger breadth below holder", type: "toggle", required: true },
      ],
    },
    {
      id: "tc-step-4",
      title: "Documentation",
      description: "Record care, stoma condition, and secretion characteristics.",
      type: "capture",
      fields: [
        { id: "tc-f18", label: "Secretion color / amount / consistency", type: "textarea", required: true },
        { id: "tc-f19", label: "Stoma condition", type: "select", required: true, options: ["Clean and intact", "Redness", "Granulation tissue", "Breakdown / infection", "Other"] },
        { id: "tc-f20", label: "Care completed at", type: "datetime", required: true },
        { id: "tc-f21", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const airwaySuctioning: ProcedureTemplate = {
  id: "airway-suctioning",
  name: "Airway Suctioning (Oral / Nasopharyngeal / Tracheostomy)",
  category: "Procedure",
  description:
    "Removal of airway secretions via oral, nasopharyngeal, or tracheostomy suctioning using sterile or clean technique.",
  estimatedMinutes: 10,
  steps: [
    {
      id: "as-step-1",
      title: "Pre-Suction Assessment",
      description: "Assess the need for suctioning and gather equipment.",
      type: "checklist",
      fields: [
        { id: "as-f1", label: "Indication for suctioning confirmed (secretions, declining SpO₂, ineffective cough)", type: "toggle", required: true },
        { id: "as-f2", label: "Suction route", type: "select", required: true, options: ["Oral", "Nasopharyngeal", "Tracheostomy (open)", "Tracheostomy (inline)"] },
        { id: "as-f3", label: "Suction pressure set (80–120 mmHg adults)", type: "toggle", required: true },
        { id: "as-f4", label: "Baseline SpO₂ (%)", type: "number", required: true, min: 0, max: 100, unit: "%" },
        { id: "as-f5", label: "Pre-oxygenation provided (if indicated)", type: "toggle", required: false },
      ],
    },
    {
      id: "as-step-2",
      title: "Suctioning Procedure",
      description: "Perform suctioning with minimal trauma and appropriate technique.",
      type: "timed",
      fields: [
        { id: "as-f6", label: "Sterile technique maintained (trach)", type: "toggle", required: false },
        { id: "as-f7", label: "Each suction pass ≤ 10–15 seconds", type: "toggle", required: true },
        { id: "as-f8", label: "Patient oxygenated between passes", type: "toggle", required: true },
        { id: "as-f9", label: "Secretions suctioned effectively", type: "toggle", required: true },
        { id: "as-f10", label: "Secretion color / consistency", type: "select", required: true, options: ["Clear / thin", "White / thick", "Yellow / green", "Blood-tinged", "Frank blood"] },
      ],
    },
    {
      id: "as-step-3",
      title: "Post-Suction Assessment",
      description: "Assess patient response after suctioning.",
      type: "form",
      fields: [
        { id: "as-f11", label: "Post-suction SpO₂ (%)", type: "number", required: true, min: 0, max: 100, unit: "%" },
        { id: "as-f12", label: "Breath sounds improved", type: "toggle", required: true },
        { id: "as-f13", label: "Patient tolerated suctioning", type: "toggle", required: true },
        { id: "as-f14", label: "Adverse events (bradycardia, desaturation, bleeding)", type: "toggle", required: true },
        { id: "as-f15", label: "Provider notified of concerns", type: "toggle", required: false },
      ],
    },
    {
      id: "as-step-4",
      title: "Documentation",
      description: "Document suctioning frequency, secretion characteristics, and patient response.",
      type: "capture",
      fields: [
        { id: "as-f16", label: "Suctioning Date/Time", type: "datetime", required: true },
        { id: "as-f17", label: "Notes", type: "textarea", required: false },
      ],
    },
  ],
};

export const procedureTemplates: ProcedureTemplate[] = [
  peripheralIvInsertion,
  centralLineDressing,
  foleyCatheterInsertion,
  nasogastricTubeInsertion,
  woundDressingChange,
  pressureInjuryCare,
  drainManagement,
  sutureRemoval,
  urinaryCatheterCare,
  tracheostomyCare,
  airwaySuctioning,
];
