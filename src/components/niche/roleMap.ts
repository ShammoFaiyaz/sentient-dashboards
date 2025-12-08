import type { NicheKey } from "@/niches/config";

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



