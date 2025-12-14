"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Gauge, Layers3, Sparkles, Timer, Brain, BookOpen, Calendar, Shield, Puzzle, FileText, MessageSquare, CreditCard, LineChart, FileSpreadsheet, Users, ClipboardList, Building2, Stethoscope, FlaskConical, Activity, Pill, Wallet, Briefcase, PieChart, BarChart3, Globe2, AlertTriangle, Receipt, Package, Bed, Bell, Gift, Wrench, Brush, X } from "lucide-react";
import { useRole } from "@/components/role/RoleProvider";
import Image from "next/image";
import { Settings } from "lucide-react";
import { AppFooter } from "@/components/layout/AppFooter";
import PersonaSummary from "@/components/topbar/PersonaSummary";
import { useAgents } from "@/context/AgentsProvider";
import * as React from "react";
import { NICHES } from "@/niches/config";
import { useNicheRole } from "@/components/niche/useNicheRole";

type NavItem = { label: string; href: string; icon: any };

function getNav(role: "student" | "teacher" | "admin"): NavItem[] {
  if (role === "student") return [
    { label: "Dashboard", icon: Gauge, href: "/student" },
    { label: "Courses", icon: BookOpen, href: "/student/courses" },
    { label: "Assessments", icon: Layers3, href: "/student/assessments" },
    { label: "Agents", icon: Bot, href: "/student/agents" },
  ];
  if (role === "teacher") return [
    { label: "Dashboard", icon: Gauge, href: "/teacher" },
    { label: "Courses", icon: BookOpen, href: "/teacher/courses" },
    { label: "Grading", icon: Sparkles, href: "/teacher/grading" },
    { label: "Schedule", icon: Calendar, href: "/teacher/schedule" },
    { label: "Agents", icon: Bot, href: "/teacher/agents" },
  ];
  return [
    { label: "Dashboard", icon: Gauge, href: "/admin" },
    { label: "Admissions", icon: Shield, href: "/admin/admissions" },
    { label: "Courses", icon: BookOpen, href: "/admin/courses" },
    { label: "Enrollment", icon: Layers3, href: "/admin/enrollment" },
    { label: "Scheduling", icon: Calendar, href: "/admin/schedule" },
    { label: "Compliance", icon: Shield, href: "/admin/compliance" },
    { label: "Agents", icon: Bot, href: "/admin/agent" },
    { label: "Agent Monitor", icon: Timer, href: "/admin/monitor" },
    { label: "Agent Management", icon: Puzzle, href: "/admin/agents" },
  ];
}

export default function Sidebar({ mobile = false, onClose }: { mobile?: boolean; onClose?: () => void } = {}) {
  const pathname = usePathname();
  const { role } = useRole();
  const { agents } = useAgents();
  const navItems = getNav(role);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const activeCount = mounted ? agents.filter(a => a.online).length : 0;
  const totalCount = mounted ? agents.length : 0;
  // Niche detection: if path starts with a niche slug, override nav items
  const nicheKey = (Object.keys(NICHES) as Array<keyof typeof NICHES>).find((s) => pathname?.startsWith("/" + s));
  const fallbackRole = nicheKey ? (NICHES[nicheKey].roles[0] || "") : "";
  const nicheRoleAll = useNicheRole(nicheKey ?? "", fallbackRole);
  const nicheRole = nicheKey ? nicheRoleAll : "";
  const nicheMenus = nicheKey
    ? (NICHES[nicheKey].menusByRole?.[nicheRole] ?? NICHES[nicheKey].menu)
    : [];

  function personaForContext(): { name: string; subtitle: string } {
    if (nicheKey) {
      const title = NICHES[nicheKey].title;
      // Role-specific sample personas per niche
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
        (byNiche[nicheKey]?.[nicheRole] as string | undefined) ??
        "Alex Rivera";
      const subtitle = `${nicheRole || "User"} • ${title}`;
      return { name, subtitle };
    }
    // SU personas remain static by role
    const suSubtitle =
      role === "student"
        ? "Student • Computer Science"
        : role === "teacher"
        ? "Teacher • Faculty"
        : "Admin • Operations";
    return { name: "Alex Rivera", subtitle: suSubtitle };
  }
  const persona = personaForContext();
  const initials = React.useMemo(() => {
    const name = (persona?.name ?? "").trim();
    if (!name) return "SU";
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1) {
      const [only] = parts;
      return (only.slice(0, 2)).toUpperCase();
    }
    const first = parts[0]?.[0] ?? "";
    const last = parts[parts.length - 1]?.[0] ?? "";
    const combo = `${first}${last}`.toUpperCase();
    return combo || "SU";
  }, [persona?.name]);

  // Sidebar brand gif per dashboard/niche
  const brandSrc = (() => {
    switch (nicheKey) {
      case "insurance-dashboard":
        return "/brand-insurance.gif";
      case "healthcare-dashboard":
        return "/brand-healthcare.gif";
      case "fintech-dashboard":
        return "/brand-fintech.gif";
      case "hospitality-dashboard":
        return "/brand-hospitality.gif";
      case "retail-dashboard":
        return "/brand-retail.gif";
      case "logistics-dashboard":
        return "/brand-logistics.gif";
      default:
        return "/brand.gif"; // Sentient University and others
    }
  })();

  function iconFor(label: string) {
    // Generic mapping across niches
    switch (label) {
      case "Dashboard":
        return Gauge;
      case "Control Tower":
        return Brain;
      case "Shipments & Orders":
        return Package;
      case "Routing & Modes":
        return Globe2;
      case "Service Performance":
        return BarChart3;
      case "Inbound & Outbound":
        return ClipboardList;
      case "Storage & Slots":
        return Layers3;
      case "Labor & Shifts":
        return Users;
      case "Safety & Compliance":
        return Shield;
      case "My Routes":
        return Globe2;
      case "Today's Deliveries":
        return Package;
      case "Exceptions":
        return AlertTriangle;
      case "Performance & Earnings":
        return LineChart;
      case "Portfolio Overview":
        return FileSpreadsheet;
      case "Positions & Holdings":
        return Layers3;
      case "Performance & Analytics":
        return LineChart;
      case "Transactions":
        return CreditCard;
      case "My Accounts":
        return Wallet;
      case "Investments":
        return Briefcase;
      case "Reports":
        return FileSpreadsheet;
      case "Risk Overview":
        return Shield;
      case "Exposures":
        return Globe2;
      case "Alerts & Breaches":
        return AlertTriangle;
      case "Risk Controls":
        return Shield;
      case "Compliance & Audits":
        return FileSpreadsheet;
      case "Billing":
        return Receipt;
      case "Product Management":
        return Package;
      case "User Management":
        return Users;
      case "Network Oversight":
        return Globe2;
      case "Capacity & SLAs":
        return BarChart3;
      case "Compliance & Risk":
        return Shield;
      case "Claims Oversight":
        return ClipboardList;
      case "Compliance & Reporting":
        return FileSpreadsheet;
      case "Agent Monitor":
        return Timer;
      case "Agent Management":
        return Puzzle;
      case "Facility Management":
        return Building2;
      case "Scheduling & Appointments":
        return Calendar;
      case "Billing & Claims":
        return CreditCard;
      case "Applications Queue":
        return FileSpreadsheet;
      case "New Application":
        return FileText;
      case "Risk Assessment":
        return LineChart;
      case "Policy Approval / Pricing":
        return CreditCard;
      case "Policies":
        return Shield;
      case "My Policies":
        return Shield;
      case "File a Claim":
        return FileText;
      case "My Claims":
        return Layers3;
      case "Billing & Payments":
        return CreditCard;
      case "Claims":
      case "Claims Queue":
        return Layers3;
      case "New Claim":
        return FileText;
      case "Open New Claim":
        return FileText;
      case "Claim Detail View":
        return FileText;
      case "Customer Communication":
        return MessageSquare;
      case "Payments & Settlements":
      case "Payments":
        return CreditCard;
      case "Risk Analytics":
      case "Clinical Analytics":
      case "Ops Analytics":
      case "Sales Analytics":
        return LineChart;
      case "Accounts":
        return FileSpreadsheet;
      case "Appointments":
      case "Reservations":
      case "Schedule":
        return Calendar;
      case "My Stays":
        return Bed;
      case "Services & Requests":
        return Bell;
      case "Payments & Billing":
        return CreditCard;
      case "Loyalty & Rewards":
        return Gift;
      case "Patient Overview":
        return Stethoscope;
      case "Medical Records":
        return FileText;
      case "Lab & Diagnostics":
        return FlaskConical;
      case "My Health Summary":
        return Activity;
      case "Medications":
        return Pill;
      case "Lab Results":
        return FlaskConical;
      case "Check-ins & Check-outs":
        return ClipboardList;
      case "Guest Directory":
        return Users;
      case "Housekeeping Status":
        return Brush;
      case "Care Plans":
      case "Courses":
        return BookOpen;
      case "Guest Experience":
      case "Promotions":
        return Sparkles;
      case "Risk & Compliance":
      case "Compliance":
        return Shield;
      case "Inventory":
        return Layers3;
      case "Agents":
        return Bot;
      case "Operations Overview":
        return LineChart;
      case "Occupancy & Revenue":
        return BarChart3;
      case "Staff Management":
        return Users;
      case "Maintenance & Issues":
        return Wrench;
      case "Property Management":
        return Building2;
      case "Revenue Management":
        return LineChart;
      case "Sales Overview":
        return LineChart;
      case "Staff & Shifts":
        return Users;
      case "Store Performance":
        return LineChart;
      case "Product Catalog":
        return FileSpreadsheet;
      case "Pricing & Promotions":
        return Sparkles;
      case "Supplier Management":
        return Building2;
      case "Inventory Planning":
        return LineChart;
      case "Orders":
        return FileText;
      case "Wishlist":
        return Sparkles;
      case "Rewards":
        return CreditCard;
      case "Profile & Settings":
        return Settings;
      case "Product Management":
        return Sparkles;
      case "Inventory Oversight":
        return Layers3;
      case "Sales & Revenue":
        return LineChart;
      default:
        return Bot;
    }
  }

  const effectiveNav = nicheKey
    ? nicheMenus.map((m) => ({ label: m.label, icon: iconFor(m.label), href: m.href }))
    : navItems;

  return (
    <aside
      className={
        mobile
          ? "flex h-full w-[min(92vw,360px)] shrink-0 overflow-y-auto border-l flex-col bg-white"
          : "hidden h-screen w-[360px] shrink-0 overflow-y-auto border-r lg:flex lg:flex-col lg:sticky lg:top-0 lg:self-start"
      }
      style={mobile ? undefined : { background: "var(--color-neutral-light)" }}
    >
      {/* Mobile: user login pill row with close button */}
      {mobile && (
        <div className="px-4 pt-4 flex items-center justify-between">
          <div className="min-w-0">
            <PersonaSummary />
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-2 rounded-md p-2 hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
      <div className="flex items-center justify-center px-4 py-2">
        <Image src={brandSrc} alt="Sentient University" width={480} height={160} className="w-[240px] h-auto" />
      </div>

      <div className="mt-0 px-6">
        <div className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-emerald-700">
          <span className={`h-2 w-2 rounded-full ${mounted && activeCount > 0 ? "bg-emerald-500" : "bg-neutral-400"}`} />
          <span className="text-medium font-medium" suppressHydrationWarning>
            {mounted && activeCount > 0 ? "Connected" : "Offline"}
          </span>
        </div>

        <div className="mt-6 px-0">
        <div className="mb-3 text-base font-semibold text-zinc-700">Agent Overview</div>
        <div className="grid grid-cols-2 gap-2">
          {(() => {
            const agentsHref = nicheKey ? `/${nicheKey}/agents` : `/${role}/agents`;
            return (
              <>
                <SidebarStatTile href={agentsHref} label="Agents active" value={mounted ? `${activeCount}` : "—"} hint={mounted ? `of ${totalCount} active` : "loading…"} colorHex="#004AAD" bgGradient="linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)" Icon={Bot} />
                <SidebarStatTile href={agentsHref} label="Automation runs" value="128" hint="runs" colorHex="#008C74" bgGradient="linear-gradient(180deg, rgba(0,140,116,0.14) 0%, rgba(255,255,255,1) 100%)" Icon={Sparkles} />
                <SidebarStatTile href={agentsHref} label="Avg response" value="1.4s" hint="last hour" colorHex="#6D28D9" bgGradient="linear-gradient(180deg, rgba(109,40,217,0.12) 0%, rgba(255,255,255,1) 100%)" Icon={Timer} />
                <SidebarStatTile href={agentsHref} label="Agent skills" value="42" hint="loaded" colorHex="#F4B23E" bgGradient="linear-gradient(180deg, rgba(244,178,62,0.18) 0%, rgba(255,255,255,1) 100%)" Icon={Brain} />
              </>
            );
          })()}
        </div>
      </div>

      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-1 px-0">
        {effectiveNav.map((n) => {
          const isDashboard = n.href === `/${role}`;
          const isNicheRoot = nicheKey ? n.href === `/${nicheKey}` : false;
          // Active when exact match or when pathname starts with href followed by a slash (segment boundary)
          const active = nicheKey
            ? pathname === n.href // In niche dashboards, only exact matches should underline
            : (isDashboard
                ? pathname === n.href
                : pathname === n.href || pathname?.startsWith(n.href + "/"));
          return (
            <Link
              key={n.label}
              href={n.href}
              className={"group relative flex items-center gap-3 px-4 py-2 text-sm hover:bg-zinc-100 " + (active ? "bg-primary/5 text-primary" : "text-zinc-700")}
            >
              {/* Active left bar indicator (gradient) */}
              {active && (
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-[6px] rounded-r-sm"
                  style={{ background: "linear-gradient(180deg, #2563EB 0%, #60A5FA 100%)" }}
                />
              )}
              <n.icon className={active ? "h-4 w-4 text-primary" : "h-4 w-4 text-zinc-500 group-hover:text-zinc-700"} />
              <span className={active ? "font-medium text-primary" : ""}>{n.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sticky bottom-0 px-4 bg-white">
        <div className="border-t border-line/60" />
        <div className="py-4">
          <AppFooter />
        </div>
      </div>
    </aside>
  );
}

function SidebarStatTile({ href, label, value, hint, colorHex, bgGradient, Icon }: { href: string; label: string; value: string; hint: string; colorHex: string; bgGradient: string; Icon: any }) {
  return (
    <Link
      href={href}
      className="block rounded-2xl p-5 shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      style={{ background: bgGradient, border: "1px solid var(--color-neutral)" }}
    >
      <div className="flex items-center gap-2">
        <div className="p-0" style={{ color: colorHex }}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="max-w-[9.5rem] break-words pr-1 text-sm font-medium leading-tight" style={{ color: colorHex }}>{label}</span>
      </div>
      <div className="mt-2 text-3xl font-semibold" style={{ color: colorHex }} suppressHydrationWarning>{value}</div>
      <div className="text-xs text-zinc-600" suppressHydrationWarning>{hint}</div>
    </Link>
  );
}

