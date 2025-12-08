"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useRole } from "@/components/role/RoleProvider";
import { NICHES } from "@/niches/config";
import { useNicheRole } from "@/components/niche/useNicheRole";

export default function WelcomeBanner() {
  const pathname = usePathname();
  const { role } = useRole();

  const nicheKey = (Object.keys(NICHES) as Array<keyof typeof NICHES>).find(
    (s) => pathname?.startsWith("/" + s)
  );
  const fallbackRole = nicheKey ? NICHES[nicheKey].roles[0] || "" : "";
  const nicheRoleAll = useNicheRole(nicheKey ?? "", fallbackRole);
  const nicheRole = nicheKey ? nicheRoleAll : "";

  function personaForContext(): { name: string } {
    if (nicheKey) {
      const byNiche: Record<string, Record<string, string>> = {
        "fintech-dashboard": {
          "Portfolio Manager": "Morgan Patel",
          "Customer": "Jamie Chen",
          "Risk Officer": "Priya Gupta",
          "Admin": "Jordan Alvarez",
        },
        "insurance-dashboard": {
          "Claims Adjuster": "Casey Morgan",
          "Underwriter": "Taylor Brooks",
          "Customer": "Devon Lee",
          "Admin": "Riley Carter",
        },
        "healthcare-dashboard": {
          "Doctor": "Dr. Elena Morales",
          "Patient": "Pat Johnson",
          "Admin": "Casey Nguyen",
        },
        "hospitality-dashboard": {
          "Front Desk": "Noah Martinez",
          "Guest": "Sofia Rossi",
          "Ops Manager": "Liam Turner",
          "Admin": "Maya Bennett",
        },
        "retail-dashboard": {
          "Store Manager": "Avery Kim",
          "Customer": "Chris Parker",
          "Merchandiser": "Dana Lopez",
          "Admin": "Riley Morgan",
        },
      };
      const name =
        (byNiche[nicheKey]?.[nicheRole] as string | undefined) ?? "Alex Rivera";
      return { name };
    }
    return { name: "Alex Rivera" };
  }

  const { name } = personaForContext();

  return (
    <div className="mb-2">
      <h1 className="text-3xl md:text-4xl font-semibold text-ink">
        Welcome back,{" "}
        <span
          className="text-transparent"
          style={{
            background: "linear-gradient(180deg, #2563EB 0%, #60A5FA 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {name}
        </span>
      </h1>
      <p className="mt-1 text-muted">See the analytics and the other important data in the dashboard.</p>
    </div>
  );
}


