import type { ProcedureTemplate } from "../../types/index.ts";

const incidentResponse: ProcedureTemplate = {
  id: "incident-response",
  name: "IT Incident Response",
  category: "Security",
  description:
    "A structured IT incident response procedure covering detection, containment, eradication, and recovery.",
  estimatedMinutes: 60,
  steps: [
    {
      id: "ir-step-1",
      title: "Incident Detection & Classification",
      description:
        "Identify and classify the incident. Gather initial information to determine scope and severity.",
      type: "form",
      fields: [
        {
          id: "ir-f1",
          label: "Incident Title",
          type: "text",
          required: true,
        },
        {
          id: "ir-f2",
          label: "Detection Date/Time",
          type: "datetime",
          required: true,
        },
        {
          id: "ir-f3",
          label: "Incident Type",
          type: "select",
          required: true,
          options: [
            "Malware",
            "Phishing",
            "Data Breach",
            "DDoS",
            "Unauthorized Access",
            "System Outage",
            "Other",
          ],
        },
        {
          id: "ir-f4",
          label: "Affected Systems",
          type: "multiselect",
          required: true,
          options: [
            "Web Servers",
            "Database Servers",
            "Email Systems",
            "Network Infrastructure",
            "End-user Workstations",
            "Cloud Services",
          ],
        },
        {
          id: "ir-f5",
          label: "Initial Description",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      id: "ir-step-2",
      title: "Severity Assessment",
      description:
        "Based on the initial information, determine the incident severity level and trigger the appropriate response path.",
      type: "decision",
      fields: [
        {
          id: "ir-f6",
          label: "Severity Level",
          type: "select",
          required: true,
          options: ["P1 - Critical", "P2 - High", "P3 - Medium", "P4 - Low"],
        },
        {
          id: "ir-f7",
          label: "Data exfiltration suspected",
          type: "toggle",
          required: true,
        },
        {
          id: "ir-f8",
          label: "Systems are actively compromised",
          type: "toggle",
          required: true,
        },
        {
          id: "ir-f9",
          label: "Business operations impacted",
          type: "toggle",
          required: true,
        },
        {
          id: "ir-f10",
          label: "Severity Justification",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      id: "ir-step-3",
      title: "Initial Containment",
      description:
        "Take immediate steps to contain the incident and prevent further spread.",
      type: "timed",
      fields: [
        {
          id: "ir-f11",
          label: "Affected systems isolated",
          type: "toggle",
          required: true,
        },
        {
          id: "ir-f12",
          label: "Suspicious accounts disabled",
          type: "toggle",
          required: true,
        },
        {
          id: "ir-f13",
          label: "Firewall rules updated",
          type: "toggle",
          required: true,
        },
        {
          id: "ir-f14",
          label: "Containment Start Time",
          type: "datetime",
          required: true,
        },
        {
          id: "ir-f15",
          label: "Containment End Time",
          type: "datetime",
          required: false,
        },
        {
          id: "ir-f16",
          label: "Containment Actions Taken",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      id: "ir-step-4",
      title: "Evidence Collection",
      description:
        "Collect and document all relevant evidence for forensic analysis.",
      type: "capture",
      fields: [
        {
          id: "ir-f17",
          label: "Evidence Items",
          type: "repeater",
          required: true,
          options: ["Evidence Type", "Source", "Collection Time", "Hash/Checksum", "Storage Location"],
        },
        {
          id: "ir-f18",
          label: "Logs collected",
          type: "toggle",
          required: true,
        },
        {
          id: "ir-f19",
          label: "Memory dumps taken",
          type: "toggle",
          required: false,
        },
        {
          id: "ir-f20",
          label: "Chain of custody maintained",
          type: "toggle",
          required: true,
        },
        {
          id: "ir-f21",
          label: "Evidence Notes",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "ir-step-5",
      title: "Eradication & Recovery",
      description:
        "Remove the threat and restore affected systems to normal operation.",
      type: "timed",
      fields: [
        {
          id: "ir-f22",
          label: "Malware/threat removed",
          type: "toggle",
          required: true,
        },
        {
          id: "ir-f23",
          label: "Systems patched/updated",
          type: "toggle",
          required: true,
        },
        {
          id: "ir-f24",
          label: "Systems restored from backup",
          type: "toggle",
          required: false,
        },
        {
          id: "ir-f25",
          label: "Recovery Time Objective met",
          type: "toggle",
          required: true,
        },
        {
          id: "ir-f26",
          label: "Recovery Completion Time",
          type: "datetime",
          required: true,
        },
        {
          id: "ir-f27",
          label: "Recovery Actions Taken",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      id: "ir-step-6",
      title: "Post-Incident Review",
      description:
        "Document lessons learned and recommendations to prevent future incidents.",
      type: "form",
      fields: [
        {
          id: "ir-f28",
          label: "Root Cause",
          type: "textarea",
          required: true,
        },
        {
          id: "ir-f29",
          label: "Lessons Learned",
          type: "textarea",
          required: true,
        },
        {
          id: "ir-f30",
          label: "Recommendations",
          type: "textarea",
          required: true,
        },
        {
          id: "ir-f31",
          label: "Incident Commander Sign-off",
          type: "text",
          required: true,
        },
        {
          id: "ir-f32",
          label: "Review Date",
          type: "datetime",
          required: true,
        },
      ],
    },
  ],
};

export default incidentResponse;
