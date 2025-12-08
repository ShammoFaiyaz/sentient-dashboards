"use client";

import * as React from "react";
import { UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";
import { useRole } from "@/components/role/RoleProvider";
import { usePathname } from "next/navigation";
import { NICHES } from "@/niches/config";

export function AccountMenu() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { show } = useToast();
  const { setRole, role } = useRole();
  const pathname = usePathname() || "/";
  const nicheKey = (Object.keys(NICHES) as Array<keyof typeof NICHES>).find((s) => pathname.startsWith("/" + s));
  const isNiche = !!nicheKey;
  const nicheRoles = isNiche ? NICHES[nicheKey!].roles : [];
  const nicheStorageKey = isNiche ? `niche.role.${nicheKey}` : "";
  const [nicheRole, setNicheRole] = React.useState<string>(isNiche ? (nicheRoles[0] || "") : "");

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  React.useEffect(() => {
    if (!isNiche) return;
    try {
      const saved = localStorage.getItem(nicheStorageKey);
      if (saved && nicheRoles.includes(saved)) {
        setNicheRole(saved);
      } else if (nicheRoles[0]) {
        localStorage.setItem(nicheStorageKey, nicheRoles[0]);
        setNicheRole(nicheRoles[0]);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nicheKey]);

  function switchMode(mode: "student" | "teacher" | "admin") {
    try { localStorage.setItem("su.role", mode); } catch {}
    setRole(mode);
    router.push(`/${mode}`);
    const label = mode.charAt(0).toUpperCase() + mode.slice(1);
    show({ title: "Mode switched", message: <>Switched to <strong>{label}</strong></>, variant: "success" });
    setOpen(false);
  }

  function switchNicheRole(next: string) {
    if (!isNiche) return;
    setNicheRole(next);
    try { localStorage.setItem(nicheStorageKey, next); } catch {}
    try { window.dispatchEvent(new CustomEvent("niche-role-changed", { detail: { slug: nicheKey } })); } catch {}
    // Navigate to the role's dashboard root for this niche
    try { router.push(`/${nicheKey}`); } catch {}
    show({ title: "Role updated", message: <>Active role: <strong>{next}</strong></>, variant: "success" });
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full px-3 py-2 bg-primary text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <UserCircle className="h-5 w-5 text-white" />
        <span className="text-sm font-medium text-white">
          {isNiche ? (nicheRole || "Role") : role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-line/60 bg-white p-2 shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
          {!isNiche ? (
            <>
              <div className="px-2 py-1 text-xs text-muted">Mode</div>
              <button onClick={() => switchMode("student")} className="w-full text-left px-2 py-2 rounded-md hover:bg-primary/5">Student</button>
              <button onClick={() => switchMode("teacher")} className="w-full text-left px-2 py-2 rounded-md hover:bg-primary/5">Teacher</button>
              <button onClick={() => switchMode("admin")} className="w-full text-left px-2 py-2 rounded-md hover:bg-primary/5">Admin</button>
            </>
          ) : (
            <>
              <div className="px-2 py-1 text-xs text-muted">Role</div>
              {nicheRoles.map((r) => (
                <button key={r} onClick={() => switchNicheRole(r)} className="w-full text-left px-2 py-2 rounded-md hover:bg-primary/5">
                  {r}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}


