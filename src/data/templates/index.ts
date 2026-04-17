import type { ProcedureTemplate } from "../../types/index.ts";
import networkAudit from "./network-audit.ts";
import incidentResponse from "./incident-response.ts";
import serverBuild from "./server-build.ts";

export const templateRegistry: ProcedureTemplate[] = [
  networkAudit,
  incidentResponse,
  serverBuild,
];
