"use client";

import { useNicheRole } from "@/components/niche/useNicheRole";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { AgentTile } from "@/components/AgentTile";

function Kpi({ label, value, hint, bullets = [] as string[] }: { label: string; value: string; hint?: string; bullets?: string[] }) {
  return (
    <div className="rounded-2xl p-4 shadow-md bg-white border border-line/60" style={{ background: "linear-gradient(180deg, rgba(0,74,173,0.06) 0%, rgba(255,255,255,1) 100%)" }}>
      <div className="text-xs text-muted">{label}</div>
      <div className="text-2xl font-semibold text-ink">{value}</div>
      {hint && <div className="text-xs text-neutral-600">{hint}</div>}
      {bullets.length > 0 && (
        <ul className="mt-2 list-inside list-disc text-xs text-neutral-700">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
    </div>
  );
}

export default function PoliciesPage() {
  const role = useNicheRole("insurance-dashboard", "Viewer");
  const { agents } = useAgents();
  const config = NICHES["insurance-dashboard"];
  const featured = agents.filter(a => config.agentIds.includes(a.id)).slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <h1 className="text-2xl font-semibold text-primary">Policies</h1>
      <div className="text-sm text-muted mb-3">Role: {role}</div>
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Active policies" value="42,180" hint="this quarter" bullets={["Auto: 16k", "Property: 12k"]} />
        <Kpi label="New this month" value="1,294" hint="+4.2% MoM" bullets={["Shortlisted: 220", "Interviews this week: 18"]} />
        <Kpi label="Renewal rate" value="88.6%" hint="last 30d" bullets={["On-time renewals: 75%", "Grace period: 8%"]} />
        <Kpi label="Churn" value="2.1%" hint="rolling 90d" bullets={["High risk: 0.8%", "Contacted: 62%"]} />
      </div>

      <div className="mt-6 rounded-2xl bg-white border border-line/60 shadow-md p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-ink">Portfolio Mix</div>
        </div>
        <div className="mt-3 h-48 rounded-md bg-gradient-to-br from-zinc-50 to-zinc-100/60 border border-dashed border-zinc-300 flex items-center justify-center text-xs text-zinc-500">
          pie / stacked bar placeholder
        </div>
      </div>

      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Automate workflows across underwriting and claims.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)}
        </div>
      </section>

      <section className="mt-6 rounded-2xl bg-white border border-line/60 shadow-md p-4">
        <div className="text-sm font-semibold text-ink mb-2">Latest News</div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="h-40 rounded-lg border border-line/60 bg-[url('/public/news/policy.jpg')] bg-cover bg-center flex items-end p-3 text-white">
            <span className="text-sm font-semibold">Policy Update: State Regulator Adopts New Claims Standard</span>
          </div>
          <div className="h-40 rounded-lg border border-line/60 bg-[url('/public/news/insurance.jpg')] bg-cover bg-center flex items-end p-3 text-white">
            <span className="text-sm font-semibold">Usage‑Based Pricing Pilot Expands to 3 Regions</span>
          </div>
        </div>
      </section>
    </div>
  );
}


