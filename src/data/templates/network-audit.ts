import type { ProcedureTemplate } from "../../types/index.ts";

const networkAudit: ProcedureTemplate = {
  id: "network-audit",
  name: "Network Infrastructure Audit",
  category: "Network",
  description:
    "A comprehensive audit of network infrastructure including connectivity checks, device inventory, and sign-off.",
  estimatedMinutes: 90,
  steps: [
    {
      id: "na-step-1",
      title: "Audit Overview",
      description:
        "Review the scope and objectives of this network audit. Confirm all required tools and credentials are available before proceeding.",
      type: "info",
      fields: [
        {
          id: "na-f1",
          label: "Audit Date",
          type: "datetime",
          required: true,
        },
        {
          id: "na-f2",
          label: "Auditor Name",
          type: "text",
          required: true,
        },
        {
          id: "na-f3",
          label: "Audit Scope Notes",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "na-step-2",
      title: "Connectivity Checks",
      description:
        "Verify connectivity to all critical network segments and confirm routing is functioning correctly.",
      type: "checklist",
      fields: [
        {
          id: "na-f4",
          label: "Core router reachable",
          type: "toggle",
          required: true,
        },
        {
          id: "na-f5",
          label: "Internet gateway reachable",
          type: "toggle",
          required: true,
        },
        {
          id: "na-f6",
          label: "DNS resolution working",
          type: "toggle",
          required: true,
        },
        {
          id: "na-f7",
          label: "VLAN segmentation verified",
          type: "toggle",
          required: true,
        },
        {
          id: "na-f8",
          label: "Connectivity Notes",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "na-step-3",
      title: "Device Inventory",
      description:
        "Record all active network devices discovered during the audit.",
      type: "capture",
      fields: [
        {
          id: "na-f9",
          label: "Network Devices",
          type: "repeater",
          required: true,
          options: ["Hostname", "IP Address", "Device Type", "OS Version", "Location"],
        },
        {
          id: "na-f10",
          label: "Total Device Count",
          type: "number",
          required: true,
          unit: "devices",
          min: 0,
        },
      ],
    },
    {
      id: "na-step-4",
      title: "Security Assessment",
      description: "Review security configurations across network devices.",
      type: "form",
      fields: [
        {
          id: "na-f11",
          label: "Firewall rules up to date",
          type: "toggle",
          required: true,
        },
        {
          id: "na-f12",
          label: "Unused ports disabled",
          type: "toggle",
          required: true,
        },
        {
          id: "na-f13",
          label: "Default credentials changed",
          type: "toggle",
          required: true,
        },
        {
          id: "na-f14",
          label: "Security Findings",
          type: "textarea",
          required: false,
        },
        {
          id: "na-f15",
          label: "Risk Level",
          type: "select",
          required: true,
          options: ["Low", "Medium", "High", "Critical"],
        },
      ],
      subtasks: [
        {
          id: "na-sub-1",
          title: "Firewall Review",
          description: "Check all firewall rule sets.",
          fields: [
            {
              id: "na-sf1",
              label: "Inbound rules reviewed",
              type: "toggle",
              required: true,
            },
            {
              id: "na-sf2",
              label: "Outbound rules reviewed",
              type: "toggle",
              required: true,
            },
          ],
        },
        {
          id: "na-sub-2",
          title: "Switch Configuration",
          description: "Verify switch port security and VLAN assignments.",
          fields: [
            {
              id: "na-sf3",
              label: "Port security enabled",
              type: "toggle",
              required: true,
            },
            {
              id: "na-sf4",
              label: "VLAN assignments correct",
              type: "toggle",
              required: true,
            },
          ],
        },
      ],
    },
    {
      id: "na-step-5",
      title: "Audit Sign-Off",
      description:
        "Review all findings and provide final sign-off for this network audit.",
      type: "signature",
      fields: [
        {
          id: "na-f16",
          label: "Overall Network Health",
          type: "select",
          required: true,
          options: ["Excellent", "Good", "Fair", "Poor"],
        },
        {
          id: "na-f17",
          label: "Follow-up actions required",
          type: "toggle",
          required: true,
        },
        {
          id: "na-f18",
          label: "Follow-up Actions Description",
          type: "textarea",
          required: false,
        },
        {
          id: "na-f19",
          label: "Auditor Signature (Full Name)",
          type: "text",
          required: true,
        },
        {
          id: "na-f20",
          label: "Sign-off Date/Time",
          type: "datetime",
          required: true,
        },
      ],
    },
  ],
};

export default networkAudit;
