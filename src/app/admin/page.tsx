"use client";

import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import { AgentTile } from "@/components/AgentTile";
import { StaffList } from "@/components/admin/StaffList";
import { RelevantAgentsStrip } from "@/components/agents/RelevantAgentsStrip";
import { Bot, Megaphone, Brain } from "lucide-react";
import { agents } from "@/mock/agents";
import { useAgents } from "@/context/AgentsProvider";
import NewsCarousel from "@/components/news/NewsCarousel";


export default function AdminDashboard() {
  const router = useRouter();
  const { agentsByRole } = useAgents();
  const featured = agentsByRole("admin", { onlyOnline: true }).slice(0, 4);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* <h1 className="text-2xl font-semibold text-primary">Admin Dashboard</h1> */}
      {/* KPI tiles */}
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <KpiTile label="Applicants" value="1,248" hint="this cycle" colorHex="#004AAD" bgGradient="linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)" onClick={() => router.push("/admin/admissions")}>
          <ul className="mt-2 list-inside list-disc text-xs text-neutral-700">
            <li>Shortlisted: 220</li>
            <li>Interviews this week: 18</li>
          </ul>
        </KpiTile>
        <KpiTile label="Open seats" value="312" hint="across sections" colorHex="#008C74" bgGradient="linear-gradient(180deg, rgba(0,140,116,0.14) 0%, rgba(255,255,255,1) 100%)" onClick={() => router.push("/admin/enrollment")}>
          <ul className="mt-2 list-inside list-disc text-xs text-neutral-700">
            <li>Sections &gt; 90%: 6</li>
            <li>Avg fill: 84%</li>
          </ul>
        </KpiTile>
        <KpiTile label="Conflicts" value="2" hint="schedule issues" colorHex="#6D28D9" bgGradient="linear-gradient(180deg, rgba(109,40,217,0.12) 0%, rgba(255,255,255,1) 100%)" onClick={() => router.push("/admin/schedule")}>
          <ul className="mt-2 list-inside list-disc text-xs text-neutral-700">
            <li>Overlap: 1</li>
            <li>Capacity risk: 1</li>
          </ul>
        </KpiTile>
        <KpiTile label="Agents active" value="17" hint="of 49" colorHex="#F4B23E" bgGradient="linear-gradient(180deg, rgba(244,178,62,0.18) 0%, rgba(255,255,255,1) 100%)" onClick={() => router.push("/admin/agents")}>
          <ul className="mt-2 list-inside list-disc text-xs text-neutral-700">
            <li>Journeys running: 128</li>
            <li>Avg response: 1.4s</li>
          </ul>
        </KpiTile>
      </div>
      {/* Removed secondary overview cards per request */}
      <NewsCarousel />
      <section className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Transparent • Cites sources • Human override</p>
          </div>
          <Link
            href="/admin/agents"
            className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            View all agents
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status="online" />
          ))}
        </div>
      </section>
      <StaffList />
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


