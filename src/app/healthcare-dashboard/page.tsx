"use client";

import * as React from "react";
import Link from "next/link";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useNicheRole } from "@/components/niche/useNicheRole";
import { nicheRoleToSuRole } from "@/components/niche/roleMap";
import { usePathname } from "next/navigation";
import NewsCarousel from "@/components/news/NewsCarousel";
import WelcomeBanner from "@/components/topbar/WelcomeBanner";

function KpiCard({ label, value, hint, colorHex }: { label: string; value: string; hint: string; colorHex: string }) {
  // Match SU student KPI gradient style
  const gradient =
    colorHex === "#004AAD"
      ? "linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)"
      : colorHex === "#008C74"
      ? "linear-gradient(180deg, rgba(0,140,116,0.14) 0%, rgba(255,255,255,1) 100%)"
      : colorHex === "#6D28D9"
      ? "linear-gradient(180deg, rgba(109,40,217,0.12) 0%, rgba(255,255,255,1) 100%)"
      : colorHex === "#F4B23E"
      ? "linear-gradient(180deg, rgba(244,178,62,0.18) 0%, rgba(255,255,255,1) 100%)"
      : "linear-gradient(180deg, rgba(0,74,173,0.06) 0%, rgba(255,255,255,1) 100%)";
  return (
    <div className="rounded-2xl p-4 shadow-md bg-white border border-line/60" style={{ background: gradient }}>
      <div className="text-xs text-muted">{label}</div>
      <div className="text-2xl font-semibold" style={{ color: colorHex }}>
        {value}
      </div>
      <div className="text-xs text-neutral-600">{hint}</div>
    </div>
  );
}

export default function HealthcareDashboard() {
  const { agents } = useAgents();
  const config = NICHES["healthcare-dashboard"];
  const roleLabel = useNicheRole("healthcare-dashboard", "Doctor");
  const pathname = usePathname() || "";
  const suRole = nicheRoleToSuRole("healthcare-dashboard", roleLabel);
  const effectiveRole = pathname.includes("/healthcare-dashboard/admin/") ? "admin" : suRole;
  const base = agents.filter((a) => config.agentIds.includes(a.id) && a.role === effectiveRole);
  const featured = (base.length >= 3 ? base : [...base, ...agents.filter((a) => config.agentIds.includes(a.id) && a.role !== effectiveRole)]).slice(0, 3);
  const role = useNicheRole("healthcare-dashboard", "Doctor");

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <WelcomeBanner />
      {/* KPI cards (role-aware) */}
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {role === "Patient" ? (
          <>
            <KpiCard label="Appointments This Month" value="6" hint="vs last month +1" colorHex="#004AAD" />
            <KpiCard label="Pending Lab Results" value="2" hint="awaiting review" colorHex="#6D28D9" />
            <KpiCard label="Active Prescriptions" value="4" hint="current meds" colorHex="#008C74" />
            <KpiCard label="Health Score" value="78" hint="dummy metric" colorHex="#F4B23E" />
          </>
        ) : role === "Admin" ? (
          <>
            <KpiCard label="Active Doctors" value="128" hint="system‑wide" colorHex="#004AAD" />
            <KpiCard label="Active Patients" value="12,640" hint="registered" colorHex="#008C74" />
            <KpiCard label="Pending Appointments" value="342" hint="next 24h" colorHex="#6D28D9" />
            <KpiCard label="Critical Alerts Today" value="9" hint="needs attention" colorHex="#EF4444" />
          </>
        ) : (
          <>
            <KpiCard label="Total Active Patients" value="1,240" hint="vs last week +2.1%" colorHex="#004AAD" />
            <KpiCard label="Today's Appointments" value="38" hint="scheduled" colorHex="#008C74" />
            <KpiCard label="Pending Lab Results" value="17" hint="awaiting review" colorHex="#6D28D9" />
            <KpiCard label="High‑Risk Patients" value="24" hint="needs attention" colorHex="#F4B23E" />
          </>
        )}
      </div>

      {/* remove extra charts per request */}



      {/* News carousel (same as SU) */}
      <div className="mt-6">
        <NewsCarousel />
      </div>

      {/* Patient health summary visuals moved to My Health Summary page */}

      {/* Doctor dashboard trimmed as requested: removed AI triage, hospital alerts, and agent queue */}

      {/* Featured agents block (SU-style) */}
      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            {role === "Patient" ? (
              <p className="text-xs text-muted mt-0.5">Personal Health Agent — helps you understand your health patterns and suggests lifestyle improvements.</p>
            ) : role === "Admin" ? (
              <p className="text-xs text-muted mt-0.5">Operational Insights Agent — summarises staffing bottlenecks, compliance risks, and capacity issues.</p>
            ) : (
              <p className="text-xs text-muted mt-0.5">Clinical Workflow Agent — prioritises today’s patients, flags risks, and drafts concise chart summaries.</p>
            )}
          </div>
          <Link href="/healthcare-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            View all agents
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.length > 0 ? (
            featured.map((a) => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)
          ) : (
            <div className="rounded-2xl border border-line/60 bg-white p-5 text-sm text-muted">No agent configured; placeholder card.</div>
          )}
        </div>
      </section>
    </div>
  );
}

// ProgressBar helper kept only where needed (see My Health Summary)

