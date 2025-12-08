"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useRole } from "@/components/role/RoleProvider";
import { NICHES } from "@/niches/config";
import { useNicheRole } from "@/components/niche/useNicheRole";
import { useToast } from "@/components/ui/Toast";
import DashboardSwitcher from "@/components/topbar/DashboardSwitcher";

export default function PersonaSummary() {
  const pathname = usePathname();
  const router = useRouter();
  const { show } = useToast();
  const { role } = useRole();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  const nicheKey = (Object.keys(NICHES) as Array<keyof typeof NICHES>).find((s) =>
    pathname?.startsWith("/" + s)
  );
  const fallbackRole = nicheKey ? (NICHES[nicheKey].roles[0] || "") : "";
  const nicheRoleAll = useNicheRole(nicheKey ?? "", fallbackRole);
  const nicheRole = nicheKey ? nicheRoleAll : "";
  const nicheRoles = nicheKey ? NICHES[nicheKey].roles : [];

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  function personaForContext(): { name: string; subtitle: string } {
    if (nicheKey) {
      const title = NICHES[nicheKey].title;
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
      const subtitle = `${nicheRole || "User"} • ${title}`;
      return { name, subtitle };
    }
    const suSubtitle =
      role === "student"
        ? "Student • Computer Science"
        : role === "teacher"
        ? "Teacher • Faculty"
        : "Admin • Operations";
    return { name: "Alex Rivera", subtitle: suSubtitle };
  }
  const persona = personaForContext();

  const displayedRole =
    nicheKey ? (nicheRole || "User") : role === "admin" ? "Super Admin" : role.charAt(0).toUpperCase() + role.slice(1);

  const email = React.useMemo(() => {
    const name = (persona?.name ?? "").trim().toLowerCase();
    if (!name) return "user@example.com";
    const parts = name.split(/\s+/).filter(Boolean);
    const local = parts.length >= 2 ? `${parts[0]}.${parts[parts.length - 1]}` : parts[0];
    return `${local}@email.com`;
  }, [persona?.name]);

  const initials = React.useMemo(() => {
    const name = (persona?.name ?? "").trim();
    if (!name) return "SU";
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1) {
      const [only] = parts;
      return only.slice(0, 2).toUpperCase();
    }
    const first = parts[0]?.[0] ?? "";
    const last = parts[parts.length - 1]?.[0] ?? "";
    const combo = `${first}${last}`.toUpperCase();
    return combo || "SU";
  }, [persona?.name]);

  function handleLogout() {
    try { localStorage.clear(); } catch {}
    show({ title: "Logged out", message: "You have been logged out.", variant: "success" });
    try { router.push("/"); } catch {}
    setOpen(false);
  }

  function switchNicheRole(next: string) {
    if (!nicheKey) return;
    const storageKey = `niche.role.${nicheKey}`;
    try { localStorage.setItem(storageKey, next); } catch {}
    try { window.dispatchEvent(new CustomEvent("niche-role-changed", { detail: { slug: nicheKey } })); } catch {}
    show({ title: "Role updated", message: <>Active role: <strong>{next}</strong></>, variant: "success" });
    try { router.push(`/${nicheKey}`); } catch {}
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          {initials}
        </div>
        <div className="pr-1">
          <div className="text-sm font-medium text-ink">Hello {persona.name}</div>
          <div className="text-xs text-muted">{displayedRole}</div>
        </div>
        <button
          aria-label="Open profile menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          <ChevronDown className="h-4 w-4 text-primary" />
        </button>
      </div>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-line/60 bg-white p-0 shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
          <div className="px-3 py-2">
            <div className="text-base font-semibold text-ink">{persona.name}</div>
            <div className="text-sm text-muted">{email}</div>
            <div className="text-sm text-muted mt-1">{displayedRole}</div>
          </div>
          <div className="border-t border-line/60" />
          <button
            onClick={() => { 
              try { router.push(nicheKey ? `/${nicheKey}/settings` : "/settings"); } catch {} 
              setOpen(false); 
            }}
            className="w-full text-left px-3 py-2 text-ink hover:bg-primary/5"
          >
            Update Profile
          </button>
          <div className="border-t border-line/60" />
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-ink hover:bg-primary/5"
          >
            Logout
          </button>
          {/* Industry and role controls moved to bottom */}
          <div className="border-t border-line/60" />
          <div className="px-3 py-2">
            <div className="mb-1 text-xs text-muted">Dashboard</div>
            <div className="rounded-md bg-primary/5 p-2">
              <DashboardSwitcher />
            </div>
          </div>
          {nicheKey && nicheRoles.length > 0 && (
            <div className="px-3 pb-3">
              <div className="mb-1 text-xs text-muted">Role</div>
              <div className="rounded-md bg-primary/5 p-2">
                <select
                  value={nicheRole || nicheRoles[0]}
                  onChange={(e) => switchNicheRole(e.target.value)}
                  className="w-full rounded-md border border-line/60 bg-white px-2 py-1 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  aria-label="Select role"
                >
                  {nicheRoles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


