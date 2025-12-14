import { NICHES, type NicheKey } from "@/niches/config";

export type SuRole = "student" | "teacher" | "admin";

export function nicheRoleToSuRole(slug: NicheKey, label: string): SuRole {
  const normalized = (label || "").toLowerCase();
  switch (slug) {
    case "fintech-dashboard":
      if (normalized.includes("admin")) return "admin";
      if (normalized.includes("customer")) return "student";
      if (normalized.includes("risk")) return "teacher";
      if (normalized.includes("portfolio")) return "teacher";
      return "student";
    case "healthcare-dashboard":
      if (normalized.includes("admin")) return "admin";
      if (normalized.includes("patient")) return "student";
      if (normalized.includes("doctor")) return "teacher";
      return "student";
    case "hospitality-dashboard":
      if (normalized.includes("admin")) return "admin";
      if (normalized.includes("guest")) return "student";
      if (normalized.includes("ops") || normalized.includes("manager")) return "admin";
      if (normalized.includes("front desk")) return "teacher";
      return "student";
    case "retail-dashboard":
      if (normalized.includes("admin")) return "admin";
      if (normalized.includes("customer")) return "student";
      if (normalized.includes("store manager")) return "admin";
      if (normalized.includes("merchandiser")) return "teacher";
      return "student";
    case "logistics-dashboard":
      if (normalized.includes("admin")) return "admin";
      if (normalized.includes("operations") || normalized.includes("ops") || normalized.includes("manager")) return "admin";
      if (normalized.includes("warehouse") || normalized.includes("supervisor")) return "teacher";
      if (normalized.includes("distribution") || normalized.includes("operator")) return "student";
      return "student";
    case "insurance-dashboard":
      if (normalized.includes("admin")) return "admin";
      if (normalized.includes("customer")) return "student";
      if (normalized.includes("claims")) return "teacher";
      if (normalized.includes("underwriter")) return "teacher";
      return "student";
    default:
      return "student";
  }
}

/**
 * Filter agents so that only those belonging to a given niche (dashboard) and,
 * optionally, a given SU role are returned.
 *
 * - An agent is considered part of a niche if its id is listed in that niche's `agentIds`
 *   or if it carries a runtime `niche` property equal to the niche slug (used for
 *   admin‑created demo agents).
 * - If `roleLabel` or `suRole` is provided, only agents whose `role` matches the
 *   resolved SU role are included.
 */
export function agentsForNicheAndRole<T extends { id: string; role: SuRole } & { [key: string]: any }>(
  slug: NicheKey,
  agents: T[],
  opts: { roleLabel?: string; suRole?: SuRole } = {},
): T[] {
  const config = NICHES[slug];
  const resolvedRole: SuRole | undefined =
    opts.suRole ?? (opts.roleLabel ? nicheRoleToSuRole(slug, opts.roleLabel) : undefined);

  return agents.filter((agent) => {
    const inNiche = config.agentIds.includes(agent.id) || (agent as any).niche === slug;
    if (!inNiche) return false;
    if (resolvedRole && agent.role !== resolvedRole) return false;
    return true;
  });
}




