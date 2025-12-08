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

export default function FintechAdminProductsPage() {
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
            <p className="text-xs text-muted mt-0.5">Product Ops Agent — tracks adoption, pricing rules, and quality issues.</p>
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
        <Kpi label="Active Products" value="420" hint="cards, accounts, services" colorHex="#004AAD" />
        <Kpi label="Issues" value="8" hint="content/pricing" colorHex="#EF4444" />
        <Kpi label="Launches Pending" value="5" hint="this quarter" colorHex="#6D28D9" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Product List</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Name</th><th className="py-2 px-3">Category</th><th className="py-2 px-3">Status</th><th className="py-2 px-3">Owner</th></tr></thead><tbody>{
              [["Platinum Card","Credit Card","Active","Cards"],["High‑Yield Savings","Deposit","Active","Deposits"],["Micro‑Invest","Investment","Beta","Investments"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Product Adoption Rate</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[22,18,12,9].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}} />))}</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Pricing Rules Panel</div>
          <ul className="space-y-2 text-sm">
            {["APR cap 19.99% for credit cards","Deposit APY auto‑sync weekly","Investment fees tiered by balance"].map((t)=>(<li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2"><span className="text-ink">{t}</span><span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Enabled</span></li>))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Notes</div>
          <ul className="space-y-2">{["Update Platinum card rewards terms.","Sync Savings APY change to all locales.","Finalize Micro‑Invest onboarding flow."].map((t)=>(<li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>))}</ul>
        </div>
      </div>

      {/* Extra detailed sections (6) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Roadmap Snapshot</div><ul className="space-y-2 text-sm">{["Debit+ feature gates","Instant P2P limits","Crypto earn pilot"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>))}</ul></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Risk Flags by Product</div><div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[12,6,2].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}} />))}</div><div className="text-[11px] text-muted">Cards • deposits • investments</div></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Experiment Center</div><table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-2">Test</th><th className="py-2 px-2">Status</th></tr></thead><tbody>{[["Signup v2","Running"],["Offer banner","Paused"],["APY headline","Queued"]].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-2">{r[0]}</td><td className="py-2 px-2">{r[1]}</td></tr>))}</tbody></table></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Incident Log</div><ul className="space-y-2 text-sm">{["Price feed lag (invest) — resolved","Card BIN outage — mitigated"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>))}</ul></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Localization Tasks</div><ul className="space-y-2 text-sm">{["Spanish assets for Savings","FR legal copy for Cards","JP disclaimers for Invest"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>))}</ul></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Deprecation Pipeline</div><table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-2">Feature</th><th className="py-2 px-2">Window</th></tr></thead><tbody>{[["Legacy rewards","Q2"],["Old statements","Q3"]].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-2">{r[0]}</td><td className="py-2 px-2">{r[1]}</td></tr>))}</tbody></table></div>
      </div>
    </div>
  );
}


