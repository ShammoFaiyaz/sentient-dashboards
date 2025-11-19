"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Gauge, Layers3, Sparkles, Timer, Brain, BookOpen, Calendar, Shield, Puzzle } from "lucide-react";
import { useRole } from "@/components/role/RoleProvider";
import Image from "next/image";
import { Settings } from "lucide-react";
import { AppFooter } from "@/components/layout/AppFooter";
import { useAgents } from "@/context/AgentsProvider";
import * as React from "react";

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
    { label: "Agent Management", icon: Puzzle, href: "/admin/agents" },
  ];
}

export default function Sidebar({ mobile = false }: { mobile?: boolean } = {}) {
  const pathname = usePathname();
  const { role } = useRole();
  const { agents } = useAgents();
  const navItems = getNav(role);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const activeCount = mounted ? agents.filter(a => a.online).length : 0;
  const totalCount = mounted ? agents.length : 0;

  return (
    <aside
      className={
        mobile
          ? "flex h-full w-[min(92vw,360px)] shrink-0 overflow-y-auto border-r flex-col shadow-[10px_0_30px_-12px_rgba(0,0,0,0.18)] bg-white"
          : "hidden h-screen w-[360px] shrink-0 overflow-y-auto border-r lg:flex lg:flex-col lg:sticky lg:top-0 lg:self-start shadow-[10px_0_30px_-12px_rgba(0,0,0,0.18)]"
      }
      style={mobile ? undefined : { background: "var(--color-neutral-light)" }}
    >
      <div className="flex items-center justify-center px-4 py-2">
        <Image src="/brand.gif" alt="Sentient University" width={480} height={160} className="w-[240px] h-auto" />
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
          <SidebarStatTile href={`/${role}/agents`} label="Agents active" value={mounted ? `${activeCount}` : "—"} hint={mounted ? `of ${totalCount} active` : "loading…"} colorHex="#004AAD" bgGradient="linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)" Icon={Bot} />
          <SidebarStatTile href={`/${role}/agents`} label="Automation runs" value="128" hint="runs" colorHex="#008C74" bgGradient="linear-gradient(180deg, rgba(0,140,116,0.14) 0%, rgba(255,255,255,1) 100%)" Icon={Sparkles} />
          <SidebarStatTile href={`/${role}/agents`} label="Avg response" value="1.4s" hint="last hour" colorHex="#6D28D9" bgGradient="linear-gradient(180deg, rgba(109,40,217,0.12) 0%, rgba(255,255,255,1) 100%)" Icon={Timer} />
          <SidebarStatTile href={`/${role}/agents`} label="Agent skills" value="42" hint="loaded" colorHex="#F4B23E" bgGradient="linear-gradient(180deg, rgba(244,178,62,0.18) 0%, rgba(255,255,255,1) 100%)" Icon={Brain} />
        </div>
      </div>

      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-1 px-4">
        {navItems.map((n) => {
          const isDashboard = n.href === `/${role}`;
          // Active when exact match or when pathname starts with href followed by a slash (segment boundary)
          const active = isDashboard
            ? pathname === n.href
            : pathname === n.href || pathname?.startsWith(n.href + "/");
          return (
            <Link
              key={n.label}
              href={n.href}
              className="group flex items-center gap-3 rounded-md px-2 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
            >
              <n.icon className="h-4 w-4 text-zinc-500 group-hover:text-zinc-700" />
              <span className={active ? "border-b-2" : ""} style={active ? { borderColor: "var(--color-accent)" } : {}}>{n.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sticky bottom-0 border-t border-line/60 px-4 py-4 bg-white">
        <div className="flex items-center justify-between rounded-xl border border-line/60 bg-white p-3 shadow-elevation-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">AR</div>
            <div>
              <div className="text-sm font-medium text-ink">Alex Rivera</div>
              <div className="text-xs text-muted">
                {role === "student" ? "Student • Computer Science" : role === "teacher" ? "Teacher • Faculty" : "Admin • Operations"}
              </div>
            </div>
          </div>
          <Link href="/settings" aria-label="Open settings" className="rounded-md p-2 hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            <Settings className="h-4 w-4 text-primary" />
          </Link>
        </div>
        <AppFooter />
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

