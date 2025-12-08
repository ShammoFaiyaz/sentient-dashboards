"use client";

import * as React from "react";
import Link from "next/link";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import NewsCarousel from "@/components/news/NewsCarousel";
import WelcomeBanner from "@/components/topbar/WelcomeBanner";
import { useNicheRole } from "@/components/niche/useNicheRole";
import { nicheRoleToSuRole } from "@/components/niche/roleMap";
import { usePathname } from "next/navigation";

function KpiCard({ label, value, hint, colorHex }: { label: string; value: string; hint: string; colorHex: string }) {
  return (
    <div
      className="rounded-2xl p-4 shadow-md bg-white border border-line/60"
      style={{
        background:
          colorHex === "#004AAD"
            ? "linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)"
            : colorHex === "#008C74"
            ? "linear-gradient(180deg, rgba(0,140,116,0.14) 0%, rgba(255,255,255,1) 100%)"
            : colorHex === "#6D28D9"
            ? "linear-gradient(180deg, rgba(109,40,217,0.12) 0%, rgba(255,255,255,1) 100%)"
            : colorHex === "#EF4444"
            ? "linear-gradient(180deg, rgba(239,68,68,0.12) 0%, rgba(255,255,255,1) 100%)"
            : "linear-gradient(180deg, rgba(244,178,62,0.18) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      <div className="text-xs text-muted">{label}</div>
      <div className="text-2xl font-semibold" style={{ color: colorHex }}>{value}</div>
      <div className="text-xs text-neutral-600">{hint}</div>
    </div>
  );
}

export default function FintechDashboard() {
  const { agents } = useAgents();
  const config = NICHES["fintech-dashboard"];
  const role = useNicheRole("fintech-dashboard", "Portfolio Manager");
  const pathname = usePathname() || "";
  const suRole = nicheRoleToSuRole("fintech-dashboard", role);
  const effectiveRole = pathname.includes("/fintech-dashboard/admin/") ? "admin" : suRole;
  const featuredBase = agents.filter((a) => config.agentIds.includes(a.id) && a.role === effectiveRole);
  const featured =
    featuredBase.length >= 3
      ? featuredBase.slice(0, 3)
      : [...featuredBase, ...agents.filter((a) => config.agentIds.includes(a.id) && a.role !== effectiveRole)].slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <WelcomeBanner />
      {/* KPI cards */}
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {role === "Portfolio Manager" && (
          <>
            <KpiCard label="Portfolio Value" value="$12.3M" hint="market value" colorHex="#004AAD" />
            <KpiCard label="YTD Return" value="+8.4%" hint="vs benchmark +6.1%" colorHex="#008C74" />
            <KpiCard label="Sharpe (12M)" value="1.12" hint="risk‑adjusted" colorHex="#6D28D9" />
            <KpiCard label="Cash Drag" value="2.1%" hint="uninvested cash" colorHex="#F4B23E" />
          </>
        )}
        {role === "Customer" && (
          <>
            <KpiCard label="Total Balance" value="$40,750" hint="all accounts" colorHex="#004AAD" />
            <KpiCard label="Total Investments" value="$92,410" hint="market value" colorHex="#008C74" />
            <KpiCard label="Monthly Spending" value="$4,850" hint="month to date" colorHex="#6D28D9" />
            <KpiCard label="Credit Score" value="742" hint="updated weekly" colorHex="#F4B23E" />
          </>
        )}
        {role === "Risk Officer" && (
          <>
            <KpiCard label="VaR (1d / 95%)" value="$1.2M" hint="portfolio level" colorHex="#004AAD" />
            <KpiCard label="Top Exposure" value="Tech 32%" hint="sector concentration" colorHex="#008C74" />
            <KpiCard label="Open Alerts" value="7" hint="threshold & model" colorHex="#EF4444" />
            <KpiCard label="Breaches Today" value="2" hint="limit breaches" colorHex="#6D28D9" />
          </>
        )}
        {role === "Admin" && (
          <>
            <KpiCard label="Active Users" value="48,120" hint="last 24h" colorHex="#004AAD" />
            <KpiCard label="Transactions Today" value="126k" hint="processed" colorHex="#008C74" />
            <KpiCard label="API Errors" value="0.08%" hint="error rate" colorHex="#EF4444" />
            <KpiCard label="Open Incidents" value="1" hint="sev1: 0 • sev2: 1" colorHex="#6D28D9" />
          </>
        )}
      </div>

      {/* Dashboard kept minimal by design: KPI cards + news + featured agent */}

      {/* Latest news carousel */}
      <div className="mt-6">
        <NewsCarousel />
      </div>

      {/* Featured agents (SU-style header) */}
      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">
              {role === "Portfolio Manager"
                ? "Portfolio Intelligence Agent — monitors risk, signals, and automation opportunities."
                : role === "Customer"
                ? "Personal Finance Agent — summaries, savings tips, and proactive alerts."
                : role === "Risk Officer"
                ? "Risk Insights Agent — surfaces exposures, breaches, and what‑if scenarios."
                : "Operational Insights Agent — system health, permissions, incidents, and user governance."}
            </p>
          </div>
          <Link href="/fintech-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
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
