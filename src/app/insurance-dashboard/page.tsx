"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { NICHES } from "@/niches/config";
import { useAgents } from "@/context/AgentsProvider";
import { AgentTile } from "@/components/AgentTile";
import NewsCarousel from "@/components/news/NewsCarousel";
import WelcomeBanner from "@/components/topbar/WelcomeBanner";
import { useNicheRole } from "@/components/niche/useNicheRole";

function KpiCard({ label, value, hint, colorHex, bgGradient, bullets = [] as string[] }: { label: string; value: string; hint: string; colorHex: string; bgGradient: string; bullets?: string[] }) {
  return (
    <div
      className="rounded-2xl p-4 shadow-md"
      style={{ background: bgGradient, border: "1px solid var(--color-neutral)" }}
    >
      <div className="text-xs text-muted">{label}</div>
      <div className="text-2xl font-semibold" style={{ color: colorHex }}>{value}</div>
      <div className="text-xs text-neutral-600">{hint}</div>
      {bullets.length > 0 && (
        <ul className="mt-2 list-inside list-disc text-xs text-neutral-700">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
    </div>
  );
}

export default function InsuranceDashboard() {
  const config = NICHES["insurance-dashboard"];
  const { agents } = useAgents();
  const featured = agents.filter(a => config.agentIds.includes(a.id)).slice(0, 3);
  const role = useNicheRole("insurance-dashboard", config.roles[0]);

  function renderRoleKpis() {
    switch (role) {
      case "Underwriter":
        return (
          <>
            <KpiCard label="Applications in review" value="312" hint="this week" colorHex="#004AAD" bgGradient="linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)" bullets={["New submissions: 96", "Escalations: 7"]} />
            <KpiCard label="Avg risk score" value="62" hint="scale 0–100" colorHex="#6D28D9" bgGradient="linear-gradient(180deg, rgba(109,40,217,0.12) 0%, rgba(255,255,255,1) 100%)" bullets={["High risk: 18%", "Low risk: 27%"]} />
            <KpiCard label="Pending approvals" value="54" hint="awaiting decision" colorHex="#008C74" bgGradient="linear-gradient(180deg, rgba(0,140,116,0.14) 0%, rgba(255,255,255,1) 100%)" bullets={[">2d old: 12", "Broker priority: 9"]} />
            <KpiCard label="Bind rate" value="74%" hint="last 30 days" colorHex="#F4B23E" bgGradient="linear-gradient(180deg, rgba(244,178,62,0.18) 0%, rgba(255,255,255,1) 100%)" bullets={["Target: 72%", "Change vs last mo: +2%"]} />
          </>
        );
      case "Customer":
        return (
          <>
            <KpiCard label="Active policies" value="2" hint="across Auto & Property" colorHex="#004AAD" bgGradient="linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)" bullets={["Next renewal: 24 Jan", "Discounts applied: 2"]} />
            <KpiCard label="Open claims" value="1" hint="awaiting documents" colorHex="#008C74" bgGradient="linear-gradient(180deg, rgba(0,140,116,0.14) 0%, rgba(255,255,255,1) 100%)" bullets={["Est. payout: $3,200", "Adjuster assigned"]} />
            <KpiCard label="Outstanding balance" value="$128" hint="due in 6 days" colorHex="#6D28D9" bgGradient="linear-gradient(180deg, rgba(109,40,217,0.12) 0%, rgba(255,255,255,1) 100%)" bullets={["Auto: $78", "Property: $50"]} />
            <KpiCard label="Support tickets" value="0" hint="active conversations" colorHex="#F4B23E" bgGradient="linear-gradient(180deg, rgba(244,178,62,0.18) 0%, rgba(255,255,255,1) 100%)" bullets={["Avg response: < 2h", "Priority: —"]} />
          </>
        );
      case "Admin":
        return (
          <>
            <KpiCard label="Active users" value="5,482" hint="last 30 days" colorHex="#004AAD" bgGradient="linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)" bullets={["Doctors/Brokers: 1,208", "Customers: 4,274"]} />
            <KpiCard label="Open claims" value="12,806" hint="across all LOBs" colorHex="#008C74" bgGradient="linear-gradient(180deg, rgba(0,140,116,0.14) 0%, rgba(255,255,255,1) 100%)" bullets={["SLA risk: 3.2%", "Litigations: 0.9%"]} />
            <KpiCard label="SLA breaches today" value="7" hint="system-wide" colorHex="#6D28D9" bgGradient="linear-gradient(180deg, rgba(109,40,217,0.12) 0%, rgba(255,255,255,1) 100%)" bullets={["Payout delays: 3", "Auth issues: 2"]} />
            <KpiCard label="Agents online" value="18" hint="of 26 configured" colorHex="#F4B23E" bgGradient="linear-gradient(180deg, rgba(244,178,62,0.18) 0%, rgba(255,255,255,1) 100%)" bullets={["Paused: 6", "Errors: 2"]} />
          </>
        );
      case "Claims Adjuster":
      default:
        return (
          <>
            <KpiCard label="Active policies" value="42,180" hint="this cycle" colorHex="#004AAD" bgGradient="linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)" bullets={["Shortlisted: 220", "Interviews this week: 18"]} />
            <KpiCard label="Open claims" value="1,280" hint="this month" colorHex="#008C74" bgGradient="linear-gradient(180deg, rgba(0,140,116,0.14) 0%, rgba(255,255,255,1) 100%)" bullets={["Investigations: 75", "Litigations: 9"]} />
            <KpiCard label="Avg cycle time" value="5.2d" hint="claims" colorHex="#6D28D9" bgGradient="linear-gradient(180deg, rgba(109,40,217,0.12) 0%, rgba(255,255,255,1) 100%)" bullets={["FNOL→Close: 12.4d", "Payout time: 3.1d"]} />
            <KpiCard label="Fraud alerts" value="37" hint="last 7d" colorHex="#F4B23E" bgGradient="linear-gradient(180deg, rgba(244,178,62,0.18) 0%, rgba(255,255,255,1) 100%)" bullets={["Auto: 12", "Property: 6"]} />
          </>
        );
    }
  }
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <WelcomeBanner />
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {renderRoleKpis()}
      </div>

      {/* Latest News (same component as SU dashboards) */}
      <NewsCarousel />

      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">
              {role === "Underwriter"
                ? "Underwriting Assistant — risk summaries, approvals support, and pricing hints."
                : role === "Claims Adjuster"
                ? "Claims Copilot — triage, document extraction, and settlement suggestions."
                : role === "Customer"
                ? "Policy Helper — coverage questions, claims guidance, and billing support."
                : "Admin Insights Agent — system health, permissions, and compliance snapshots."}
            </p>
          </div>
          <Link href="/insurance-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            View all agents
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)}
        </div>
      </section>
    </div>
  );
}


