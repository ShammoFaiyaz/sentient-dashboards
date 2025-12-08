"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useRole } from "@/components/role/RoleProvider";
import { usePathname } from "next/navigation";

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

export default function RiskExposuresPage() {
  const { agents } = useAgents();
  const { role } = useRole();
  const pathname = usePathname() || "";
  const config = NICHES["fintech-dashboard"];
  const effectiveRole = pathname.includes("/fintech-dashboard/admin/") ? "admin" : role;
  const featuredBase = agents.filter((a)=>config.agentIds.includes(a.id) && a.role === effectiveRole);
  const featured =
    featuredBase.length >= 3
      ? featuredBase.slice(0,3)
      : [...featuredBase, ...agents.filter((a)=>config.agentIds.includes(a.id) && a.role !== effectiveRole)].slice(0,3);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Risk Insights Agent — monitors sector/region/counterparty exposures.</p>
          </div>
          <a href="/fintech-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">{featured.map((a)=><AgentTile key={a.id} agent={a} status={a.online ? "online":"offline"} />)}</div>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Total Exposure" value="$92M" hint="gross" colorHex="#004AAD" />
        <Kpi label="Top Sector Exposure" value="Tech $28M" hint="gross" colorHex="#6D28D9" />
        <Kpi label="Largest Counterparty" value="$12M" hint="exposure" colorHex="#008C74" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Exposure by Sector</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Sector</th><th className="py-2 px-3">Exposure</th><th className="py-2 px-3">VaR</th></tr></thead><tbody>{
              [["Technology","$28M","$1.9M"],["Finance","$22M","$1.4M"],["Healthcare","$16M","$0.9M"],["Energy","$10M","$0.7M"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Exposure by Region</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Region</th><th className="py-2 px-3">Exposure</th><th className="py-2 px-3">Notes</th></tr></thead><tbody>{
              [["North America","$48M","Stable"],["Europe","$22M","Energy risk"],["APAC","$18M","FX sensitivity"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Top 10 Exposure Concentrations</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-2">{[28,22,18,16,14,12,10,8,7,6].map((h,i)=>(<div key={i} className="w-8 rounded-md bg-primary/70" style={{height:`${h}%`}} />))}</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Concentration Warnings</div>
          <ul className="space-y-2">{["Tech > 30% of total exposure","Single counterparty > 12%","High correlation cluster in Growth"].map((t)=>(<li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>))}</ul>
        </div>
      </div>

      {/* Additional AI-agent sections */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Counterparty Watchlist (AI)</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Counterparty</th><th className="py-2 px-3">Exposure</th><th className="py-2 px-3">PD</th><th className="py-2 px-3">Status</th></tr></thead><tbody>{
              [["CPTY‑X","$12M","0.9%","Watch"],["CPTY‑Y","$8M","1.6%","Normal"],["CPTY‑Z","$5M","2.1%","Review"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Hedging Opportunities</div>
          <ul className="space-y-2 text-sm">
            {["Overlay sector futures to cap beta.","Add USDJPY puts to offset APAC FX risk.","Increase cash buffer for next 2 weeks."].map((t)=>(
              <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">FX Sensitivity</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[22,18,12,8].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}}/>))}</div>
          <div className="text-[11px] text-muted">PnL impact per 1% move in USD • EUR • JPY • GBP.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Sector Rotation Signals</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb"><line x1="0" y1="100" x2="320" y2="100" /></g>
              <polyline fill="none" stroke="#10B981" strokeWidth="2" points="10,98 40,92 70,90 100,86 130,88 160,82 190,78 220,80 250,76 280,74 310,72" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">AI momentum score suggests rotation from Tech → Energy.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Diversification Score</div>
          <div className="space-y-2 text-sm">
            {["Sector","Region","Counterparty"].map((k,i)=>(
              <div key={k}>
                <div className="mb-1 text-muted">{k}</div>
                <div className="h-2 w-full rounded bg-ink/10"><div className="h-2 rounded bg-primary" style={{width:`${72 - i*12}%`}}/></div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Rebalance Proposals</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Action</th><th className="py-2 px-3">Size</th><th className="py-2 px-3">Rationale</th></tr></thead><tbody>{
              [["Reduce Tech","‑$3M","Concentration > policy"],["Add Energy","+$2M","Positive macro score"],["Trim CPTY‑X","‑$1M","Watchlist PD ↑"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Exposure Drift (7d)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb"><line x1="0" y1="100" x2="320" y2="100" /></g>
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="10,98 40,96 70,93 100,90 130,92 160,91 190,88 220,86 250,87 280,85 310,84" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Net change in gross exposure over the last week.</div>
        </div>
      </div>
    </div>
  );
}


