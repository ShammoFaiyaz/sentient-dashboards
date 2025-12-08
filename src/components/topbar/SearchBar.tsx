"use client";

import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { Search as SearchIcon } from "lucide-react";
import { NICHES } from "@/niches/config";
import { useNicheRole } from "@/components/niche/useNicheRole";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname() || "";
  const [q, setQ] = React.useState("");

  // Detect dashboard context and role
  const nicheKey = (Object.keys(NICHES) as Array<keyof typeof NICHES>).find((s) =>
    pathname.startsWith("/" + s)
  );
  const fallbackRole = nicheKey ? NICHES[nicheKey].roles[0] || "" : "";
  const nicheRole = useNicheRole(nicheKey ?? "", fallbackRole);

  function roleKeywords(niche?: string, role?: string): [string, string] {
    switch (niche) {
      case "insurance-dashboard":
        switch (role) {
          case "Claims Adjuster": return ["claims", "payments"];
          case "Underwriter": return ["applications", "risk"];
          case "Customer": return ["policies", "claims"];
          case "Admin": return ["users", "compliance"];
          default: return ["claims", "policies"];
        }
      case "healthcare-dashboard":
        switch (role) {
          case "Doctor": return ["patients", "appointments"];
          case "Patient": return ["appointments", "records"];
          case "Admin": return ["facilities", "staff"];
          default: return ["patients", "records"];
        }
      case "fintech-dashboard":
        switch (role) {
          case "Portfolio Manager": return ["positions", "holdings"];
          case "Customer": return ["accounts", "transactions"];
          case "Risk Officer": return ["alerts", "exposures"];
          case "Admin": return ["users", "products"];
          default: return ["accounts", "transactions"];
        }
      case "hospitality-dashboard":
        switch (role) {
          case "Front Desk": return ["guests", "check-ins"];
          case "Guest": return ["reservations", "bills"];
          case "Ops Manager": return ["occupancy", "issues"];
          case "Admin": return ["property", "revenue"];
          default: return ["guests", "reservations"];
        }
      case "retail-dashboard":
        switch (role) {
          case "Store Manager": return ["sales", "inventory"];
          case "Merchandiser": return ["products", "promotions"];
          case "Customer": return ["orders", "rewards"];
          case "Admin": return ["users", "compliance"];
          default: return ["sales", "products"];
        }
      default:
        return ["companies", "news"];
    }
  }

  const [k1, k2] = roleKeywords(nicheKey, nicheRole);
  const placeholder = `Search for agents, ${k1}, ${k2}...`;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={onSubmit} className="hidden md:flex items-center gap-2 pr-2 flex-1">
      <div className="relative w-full">
        <SearchIcon className="pointer-events-none absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          aria-label="Search"
          type="search"
          placeholder={placeholder}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full bg-transparent pl-9 pr-3 py-3 text-base outline-none placeholder:text-muted border-none focus:border-none"
        />
      </div>
    </form>
  );
}


