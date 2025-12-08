"use client";

import { useNicheRole } from "@/components/niche/useNicheRole";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { AgentTile } from "@/components/AgentTile";

function AnalyticCard({ title }: { title: string }) {
  return (
    <div className="rounded-2xl p-4 bg-white shadow-md border border-line/60">
      <div className="text-sm font-semibold text-ink mb-2">{title}</div>
      <div className="h-48 rounded-md bg-gradient-to-br from-zinc-50 to-zinc-100/60 border border-dashed border-zinc-300 flex items-center justify-center text-xs text-zinc-500">
        visualization placeholder
      </div>
    </div>
  );
}

export default function RiskAnalyticsPage() {
  const role = useNicheRole("insurance-dashboard", "Analyst");
  const { agents } = useAgents();
  const config = NICHES["insurance-dashboard"];
  const featured = agents.filter(a => config.agentIds.includes(a.id)).slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px=2 py-6">
      <h1 className="text-2xl font-semibold text-primary">Risk Analytics</h1>
      <div className="text-sm text-muted mb-3">Role: {role}</div>

      {/* KPI cards */}
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <Kpi label="Loss Ratio" value="61%" hint="rolling 12m" colorHex="#004AAD" />
        <Kpi label="Frequency Index" value="1.08" hint="vs baseline" colorHex="#6D28D9" />
        <Kpi label="Fraud Alerts" value="7" hint="open signals" colorHex="#EF4444" />
        <Kpi label="Exposure Hotspots" value="3" hint="regions" colorHex="#008C74" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <AnalyticCard title="Loss Ratio by Segment" />
        <AnalyticCard title="Claim Frequency Trend" />
        <AnalyticCard title="Fraud Detection Signals" />
        <AnalyticCard title="Catastrophe Exposure Map" />
      </div>

      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Leverage models and tools to assess risk and pricing.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)}
        </div>
      </section>

      <section className="mt-6 rounded-2xl bg-white border border-line/60 shadow-md p-4">
        <div className="text-sm font-semibold text-ink mb-2">Latest News</div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="h-40 rounded-lg border border-line/60 bg-gradient-to-br from-zinc-700/20 to-zinc-900/10 flex items-end p-3 text-ink">
            <span className="text-sm font-semibold">Risk Model Refresh: Severe Weather Frequency Update</span>
          </div>
          <div className="h-40 rounded-lg border border-line/60 bg-gradient-to-br from-zinc-700/20 to-zinc-900/10 flex items-end p-3 text-ink">
            <span className="text-sm font-semibold">New Exposure Layer for Coastal Regions</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function Kpi({ label, value, hint, colorHex }: { label: string; value: string; hint: string; colorHex: string }) {
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

