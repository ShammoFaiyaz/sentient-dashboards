"use client";

import { useRouter, usePathname } from "next/navigation";
import * as React from "react";
import { NICHES } from "@/niches/config";

const OPTIONS = [
  // { label: "Sentient University", href: "/admin" }, // temporarily hidden
  { label: "Insurance Dashboard", href: "/insurance-dashboard" },
  { label: "Healthcare Dashboard", href: "/healthcare-dashboard" },
  { label: "Fintech Dashboard", href: "/fintech-dashboard" },
  { label: "Hospitality Dashboard", href: "/hospitality-dashboard" },
  { label: "Retail Dashboard", href: "/retail-dashboard" },
];

export default function DashboardSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const current =
    OPTIONS.find((o) => pathname?.startsWith(o.href))?.href ??
    (pathname?.startsWith("/student") || pathname?.startsWith("/teacher") || pathname?.startsWith("/admin")
      ? "/fintech-dashboard"
      : "/fintech-dashboard");

  function handleChange(nextHref: string) {
    // SU option is hidden while disabled
    // Niche dashboards: set first role and go to base dashboard route
    const slug = nextHref.replace(/^\//, "") as keyof typeof NICHES;
    const cfg = NICHES[slug];
    if (cfg) {
      const firstRole = cfg.roles[0];
      try { localStorage.setItem(`niche.role.${slug}`, firstRole || ""); } catch {}
      router.push(`/${slug}`);
      return;
    }
    router.push(nextHref);
  }

  return (
    <select
      value={current}
      onChange={(e) => handleChange(e.target.value)}
      className="w-full rounded-md border border-line/60 bg-white px-2 py-1 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      aria-label="Select dashboard"
    >
      {OPTIONS.map((o) => (
        <option key={o.href} value={o.href}>
          {o.label}
        </option>
      ))}
    </select>
  );
}


