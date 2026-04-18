import type { Case } from "../types/index.ts";

const CASES_KEY = "proc_cases";

export function getCases(): Case[] {
  try {
    const raw = localStorage.getItem(CASES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Case[];
  } catch {
    return [];
  }
}

export function getCaseById(id: string): Case | null {
  return getCases().find((c) => c.id === id) ?? null;
}

export function createCase(name: string, description?: string): Case {
  const newCase: Case = {
    id: crypto.randomUUID(),
    name: name.trim(),
    description: description?.trim() || undefined,
    createdAt: new Date().toISOString(),
    runIds: [],
  };
  const cases = getCases();
  cases.push(newCase);
  saveCases(cases);
  return newCase;
}

export function updateCase(
  id: string,
  updates: Partial<Pick<Case, "name" | "description">>
): void {
  const cases = getCases();
  const idx = cases.findIndex((c) => c.id === id);
  if (idx === -1) return;
  if (updates.name !== undefined) cases[idx].name = updates.name.trim();
  if (updates.description !== undefined)
    cases[idx].description = updates.description.trim() || undefined;
  saveCases(cases);
}

export function deleteCase(id: string): void {
  const cases = getCases().filter((c) => c.id !== id);
  saveCases(cases);
}

export function assignRunToCase(caseId: string, runId: string): void {
  const cases = getCases();
  // Remove run from any existing case first
  for (const c of cases) {
    c.runIds = c.runIds.filter((r) => r !== runId);
  }
  const target = cases.find((c) => c.id === caseId);
  if (target && !target.runIds.includes(runId)) {
    target.runIds.push(runId);
  }
  saveCases(cases);
}

export function removeRunFromCase(runId: string): void {
  const cases = getCases();
  for (const c of cases) {
    c.runIds = c.runIds.filter((r) => r !== runId);
  }
  saveCases(cases);
}

function saveCases(cases: Case[]): void {
  try {
    localStorage.setItem(CASES_KEY, JSON.stringify(cases));
  } catch (e) {
    console.error("[caseService] saveCases failed", e);
  }
}
