import type { ProcedureTemplate } from "../../types/index.ts";

const serverBuild: ProcedureTemplate = {
  id: "server-build",
  name: "Server Provisioning Checklist",
  category: "Infrastructure",
  description:
    "A complete checklist for provisioning a new server, from hardware setup through OS configuration and application deployment.",
  estimatedMinutes: 120,
  steps: [
    {
      id: "sb-step-1",
      title: "Hardware & Environment Setup",
      description:
        "Verify physical or virtual hardware is ready and the environment is configured correctly.",
      type: "checklist",
      fields: [
        {
          id: "sb-f1",
          label: "Hardware specifications confirmed",
          type: "toggle",
          required: true,
        },
        {
          id: "sb-f2",
          label: "Power and cooling adequate",
          type: "toggle",
          required: true,
        },
        {
          id: "sb-f3",
          label: "Network connectivity established",
          type: "toggle",
          required: true,
        },
        {
          id: "sb-f4",
          label: "Hardware Notes",
          type: "textarea",
          required: false,
        },
      ],
      subtasks: [
        {
          id: "sb-sub-1",
          title: "Physical Hardware Check",
          description: "Verify all physical components are seated and functioning.",
          fields: [
            {
              id: "sb-sf1",
              label: "RAM installed and recognized",
              type: "toggle",
              required: true,
            },
            {
              id: "sb-sf2",
              label: "Storage drives detected",
              type: "toggle",
              required: true,
            },
            {
              id: "sb-sf3",
              label: "Network interfaces detected",
              type: "toggle",
              required: true,
            },
          ],
        },
        {
          id: "sb-sub-2",
          title: "BIOS/UEFI Configuration",
          description: "Configure BIOS/UEFI settings for optimal performance.",
          fields: [
            {
              id: "sb-sf4",
              label: "Boot order configured",
              type: "toggle",
              required: true,
            },
            {
              id: "sb-sf5",
              label: "Virtualization enabled (if required)",
              type: "toggle",
              required: false,
            },
            {
              id: "sb-sf6",
              label: "Secure Boot configured",
              type: "toggle",
              required: true,
            },
          ],
        },
      ],
    },
    {
      id: "sb-step-2",
      title: "Operating System Installation",
      description:
        "Install and configure the base operating system.",
      type: "form",
      fields: [
        {
          id: "sb-f5",
          label: "OS Type",
          type: "select",
          required: true,
          options: ["Ubuntu Server 22.04", "Ubuntu Server 24.04", "RHEL 9", "Rocky Linux 9", "Windows Server 2022", "Windows Server 2025"],
        },
        {
          id: "sb-f6",
          label: "Hostname",
          type: "text",
          required: true,
        },
        {
          id: "sb-f7",
          label: "IP Address",
          type: "text",
          required: true,
        },
        {
          id: "sb-f8",
          label: "OS installation completed",
          type: "toggle",
          required: true,
        },
        {
          id: "sb-f9",
          label: "Initial boot successful",
          type: "toggle",
          required: true,
        },
        {
          id: "sb-f10",
          label: "Installation Notes",
          type: "textarea",
          required: false,
        },
      ],
      subtasks: [
        {
          id: "sb-sub-3",
          title: "Partitioning & Storage",
          description: "Configure disk partitions and storage layout.",
          fields: [
            {
              id: "sb-sf7",
              label: "Partition scheme",
              type: "select",
              required: true,
              options: ["Standard", "LVM", "ZFS", "Custom"],
            },
            {
              id: "sb-sf8",
              label: "Swap configured",
              type: "toggle",
              required: true,
            },
            {
              id: "sb-sf9",
              label: "Storage Notes",
              type: "textarea",
              required: false,
            },
          ],
        },
        {
          id: "sb-sub-4",
          title: "Network Configuration",
          description: "Configure network interfaces, DNS, and routing.",
          fields: [
            {
              id: "sb-sf10",
              label: "Primary NIC configured",
              type: "toggle",
              required: true,
            },
            {
              id: "sb-sf11",
              label: "DNS servers set",
              type: "toggle",
              required: true,
            },
            {
              id: "sb-sf12",
              label: "Default gateway set",
              type: "toggle",
              required: true,
            },
          ],
        },
      ],
    },
    {
      id: "sb-step-3",
      title: "Security Hardening",
      description:
        "Apply security hardening measures to protect the server.",
      type: "checklist",
      fields: [
        {
          id: "sb-f11",
          label: "SSH configured (key-based auth)",
          type: "toggle",
          required: true,
        },
        {
          id: "sb-f12",
          label: "Root login disabled",
          type: "toggle",
          required: true,
        },
        {
          id: "sb-f13",
          label: "Firewall enabled and configured",
          type: "toggle",
          required: true,
        },
        {
          id: "sb-f14",
          label: "Automatic security updates configured",
          type: "toggle",
          required: true,
        },
        {
          id: "sb-f15",
          label: "CIS Benchmark level applied",
          type: "select",
          required: true,
          options: ["Level 1", "Level 2", "Custom", "None"],
        },
        {
          id: "sb-f16",
          label: "Security hardening notes",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "sb-step-4",
      title: "Application & Services Setup",
      description:
        "Install and configure required applications and services.",
      type: "form",
      fields: [
        {
          id: "sb-f17",
          label: "Required Applications",
          type: "repeater",
          required: false,
          options: ["Application Name", "Version", "Installation Method", "Status"],
        },
        {
          id: "sb-f18",
          label: "Monitoring agent installed",
          type: "toggle",
          required: true,
        },
        {
          id: "sb-f19",
          label: "Backup agent installed",
          type: "toggle",
          required: true,
        },
        {
          id: "sb-f20",
          label: "Log shipping configured",
          type: "toggle",
          required: true,
        },
        {
          id: "sb-f21",
          label: "Application setup notes",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "sb-step-5",
      title: "Validation & Testing",
      description:
        "Perform final validation tests to confirm the server is ready for production.",
      type: "checklist",
      fields: [
        {
          id: "sb-f22",
          label: "Server responding to health checks",
          type: "toggle",
          required: true,
        },
        {
          id: "sb-f23",
          label: "Monitoring alerts functioning",
          type: "toggle",
          required: true,
        },
        {
          id: "sb-f24",
          label: "Backup job completed successfully",
          type: "toggle",
          required: true,
        },
        {
          id: "sb-f25",
          label: "Load test passed",
          type: "toggle",
          required: false,
        },
        {
          id: "sb-f26",
          label: "Validation notes",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "sb-step-6",
      title: "Handover & Sign-Off",
      description:
        "Complete documentation and obtain sign-off for the new server.",
      type: "signature",
      fields: [
        {
          id: "sb-f27",
          label: "Server Name",
          type: "text",
          required: true,
        },
        {
          id: "sb-f28",
          label: "Build Engineer (Full Name)",
          type: "text",
          required: true,
        },
        {
          id: "sb-f29",
          label: "Approving Manager (Full Name)",
          type: "text",
          required: true,
        },
        {
          id: "sb-f30",
          label: "Build completed in CMDB",
          type: "toggle",
          required: true,
        },
        {
          id: "sb-f31",
          label: "Sign-off Date/Time",
          type: "datetime",
          required: true,
        },
        {
          id: "sb-f32",
          label: "Additional handover notes",
          type: "textarea",
          required: false,
        },
      ],
    },
  ],
};

export default serverBuild;
