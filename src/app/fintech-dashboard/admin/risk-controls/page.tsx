"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

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

export default function FintechAdminRiskControlsPage() {
  const { agents } = useAgents();
  const config = NICHES["fintech-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id) && a.role === "admin").slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted mt-0.5">Limits Engine Agent — monitors breaches, proposes thresholds, and auto‑applies fixes.</p>
          </div>
          <a href="/fintech-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>
      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Active Controls" value="56" hint="enforced" colorHex="#004AAD" />
        <Kpi label="Violations" value="4" hint="last 7d" colorHex="#EF4444" />
        <Kpi label="Disabled Controls" value="3" hint="temporary" colorHex="#6D28D9" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Risk Control Rules</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Rule</th><th className="py-2 px-3">Condition</th><th className="py-2 px-3">Action</th></tr></thead><tbody>{
              [["Sector cap Tech","> 30%","Alert + Block"],["Counterparty exposure","> $12M","Alert"],["Liquidity buffer","< 110%","Raise cash"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Failed Checks by Category</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[12,8,6,3].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}}/>))}</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Limits Configuration Panel</div>
          <div className="grid gap-2 text-sm">
            <label className="flex items-center gap-2"><span className="w-40 text-muted">Sector cap (Tech)</span><input className="flex-1 rounded-md border border-line px-3 py-2" defaultValue="30%" /></label>
            <label className="flex items-center gap-2"><span className="w-40 text-muted">Counterparty cap</span><input className="flex-1 rounded-md border border-line px-3 py-2" defaultValue="$12,000,000" /></label>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Alert Threshold Editor</div>
          <div className="grid gap-2 text-sm">
            <label className="flex items-center gap-2"><span className="w-40 text-muted">VaR change (1d)</span><input className="flex-1 rounded-md border border-line px-3 py-2" defaultValue="15%" /></label>
            <label className="flex items-center gap-2"><span className="w-40 text-muted">Liquidity buffer</span><input className="flex-1 rounded-md border border-line px-3 py-2" defaultValue="110%" /></label>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Notes</div>
          <ul className="space-y-2">{["Sync rules with Risk Officer dashboard","Enable new stress scenarios next week","Review disabled control exceptions"].map((t)=>(<li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>))}</ul>
        </div>
      </div>

      {/* Extra detailed sections (6) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Control Coverage</div><div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[92,78,66,44].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h/2}%`}} />))}</div><div className="text-[11px] text-muted">Assets • transactions • users • APIs</div></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Exception Backlog</div><ul className="space-y-2 text-sm">{["12 pending for Investments","4 awaiting Legal review","2 expired waivers"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>))}</ul></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Scenario Coverage</div><table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-2">Scenario</th><th className="py-2 px-2">Status</th></tr></thead><tbody>{[["Credit shock","Enabled"],["Liquidity crunch","Enabled"],["Geo risk","Planned"]].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-2">{r[0]}</td><td className="py-2 px-2">{r[1]}</td></tr>))}</tbody></table></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Recent Violations</div><ul className="space-y-2 text-sm">{["Sector cap breach (Tech)","Counterparty exposure drift","Liquidity < 110%"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>))}</ul></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Auto‑Fix Proposals</div><ul className="space-y-2 text-sm">{["Reduce Tech by 2.5% via ETF sell","Add 1.2M cash buffer","Hedge FX exposure (GBP)"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>))}</ul></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Audit Trail Summary</div><table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-2">Event</th><th className="py-2 px-2">When</th></tr></thead><tbody>{[["Limit changed","2h ago"],["Control enabled","Yesterday"],["Threshold updated","2d ago"]].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-2">{r[0]}</td><td className="py-2 px-2">{r[1]}</td></tr>))}</tbody></table></div>
      </div>
    </div>
  );
}


