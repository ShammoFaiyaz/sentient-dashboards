"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import { AgentTile } from "@/components/AgentTile";
import { useToast } from "@/components/ui/Toast";
import { useAgents } from "@/context/AgentsProvider";
import NewsCarousel from "@/components/news/NewsCarousel";
import * as React from "react";

export default function StudentDashboard() {
  const { show } = useToast();
  const router = useRouter();
  const { agentsByRole } = useAgents();
  const featured = agentsByRole("student").slice(0, 3);
  const now = new Date();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const deadlines = [
    { label: "Ethics essay draft", date: new Date(now.getFullYear(), 10, 12) }, // Nov is month 10 (0-based)
    { label: "Data structures lab", date: new Date(now.getFullYear(), 10, 14) },
  ];
  return (
    <div className="mx-auto max-w-7xl px-0 py-6">
      {/* <h1 className="text-[28px] md:text-[32px] font-semibold text-primary">Student Dashboard</h1> */}
      {/* KPI tiles */}
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <KpiTile label="Courses active" value="6" hint="this term" colorHex="#004AAD" bgGradient="linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)" onClick={() => router.push("/student/courses")}>
          <ul className="mt-2 list-inside list-disc text-xs text-neutral-700">
            <li>PSYC204 quiz today at 3:00 PM</li>
            <li>Advisor hours available tomorrow</li>
          </ul>
        </KpiTile>
        <KpiTile
          label="Upcoming tasks"
          value="5"
          hint="next 7 days"
          colorHex="#008C74"
          bgGradient="linear-gradient(180deg, rgba(0,140,116,0.14) 0%, rgba(255,255,255,1) 100%)"
          onClick={() => router.push("/student/assessments")}
        />
        <KpiTile label="Avg progress" value="64%" hint="across courses" colorHex="#6D28D9" bgGradient="linear-gradient(180deg, rgba(109,40,217,0.12) 0%, rgba(255,255,255,1) 100%)" onClick={() => router.push("/student/courses")}>
          <ul className="mt-2 list-inside list-disc text-xs text-neutral-700">
            {mounted &&
              deadlines.map((d) => {
              const days = Math.max(0, Math.ceil((d.date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
                const dateLabel = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(d.date);
              return (
                  <li key={d.label} suppressHydrationWarning>
                  {d.label} - {dateLabel}{" "}
                  <span className="ml-1 text-error">
                    {days === 0 ? "(today)" : `(${days} day${days === 1 ? "" : "s"} left)`}
                  </span>
                </li>
              );
            })}
          </ul>
        </KpiTile>
        <KpiTile label="Unread messages" value="3" hint="Mentor & TA" colorHex="#F4B23E" bgGradient="linear-gradient(180deg, rgba(244,178,62,0.18) 0%, rgba(255,255,255,1) 100%)" onClick={() => router.push("/updates")}>
          <div className="mt-2 text-xs text-neutral-700">Campus updates and announcements.</div>
        </KpiTile>
      </div>
      {/* Latest News Carousel */}
      <NewsCarousel />
      <section className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Transparent • Cites sources • Human override</p>
          </div>
          <Link
            href="/student/agents"
            className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            View all agents
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>
    </div>
  );
}

function KpiTile({ label, value, hint, colorHex, bgGradient, children, onClick }: { label: string; value: string; hint: string; colorHex: string; bgGradient: string; children?: React.ReactNode; onClick?: () => void }) {
  return (
    <div
      className={`rounded-2xl p-4 shadow-md ${onClick ? "cursor-pointer" : ""}`}
      style={{ background: bgGradient, border: "1px solid var(--color-neutral)" }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="text-xs text-muted">{label}</div>
      <div className="text-2xl font-semibold" style={{ color: colorHex }}>{value}</div>
      <div className="text-xs text-neutral-600">{hint}</div>
      {children}
    </div>
  );
}

