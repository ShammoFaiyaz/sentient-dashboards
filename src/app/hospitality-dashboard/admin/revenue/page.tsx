"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import Link from "next/link";

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

export default function HospitalityAdminRevenue() {
  const { agents } = useAgents();
  const config = NICHES["hospitality-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent at TOP (Admin) */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Revenue Control Agent — pricing opportunities and demand forecasts.</p>
          </div>
          <Link href="/hospitality-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            View all agents
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="ADR" value="$168" hint="avg daily rate" colorHex="#004AAD" />
        <Kpi label="RevPAR" value="$138" hint="per available room" colorHex="#008C74" />
        <Kpi label="Forecast Accuracy" value="92%" hint="last 30 days" colorHex="#6D28D9" />
        <Kpi label="Revenue Today" value="$142k" hint="room + services" colorHex="#F4B23E" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Revenue Trend (6 Months)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full"><g stroke="#e5e7eb">{[20,40,60,80,100].map((y,i)=>(<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g><g stroke="#cbd5e1"><line x1="30" y1="10" x2="30" y2="110" /><line x1="30" y1="110" x2="300" y2="110" /></g><polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="30,98 60,92 90,94 120,86 150,84 180,88 210,80 240,84 270,78 300,74" /></svg>
          </div>
          <div className="text-[11px] text-muted">Room + upsell + services.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Revenue Breakdown</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Category</th><th className="py-2 px-3">Amount</th><th className="py-2 px-3">% Share</th><th className="py-2 px-3">Change</th></tr></thead><tbody>{[["Rooms","$3.2M","68%","+4%"],["Food & Beverage","$920k","20%","+2%"],["Spa","$280k","6%","+1%"],["Transport","$180k","4%","+0.5%"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))}</tbody></table>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Pricing Rule Controls</div>
          <div className="grid gap-2 text-sm">
            <label className="flex items-center gap-2"><span className="w-40 text-muted">Weekend uplift</span><input className="flex-1 rounded-md border border-line px-3 py-2" defaultValue="+12%" /></label>
            <label className="flex items-center gap-2"><span className="w-40 text-muted">Low‑occupancy discount</span><input className="flex-1 rounded-md border border-line px-3 py-2" defaultValue="−8%" /></label>
            <div className="flex justify-end"><button className="rounded-md border border-line px-3 py-1">Apply overrides</button></div>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Promotion &amp; Discount Manager</div>
          <ul className="space-y-2 text-sm">{["Suite upgrade weekend (active)","Dinner package (scheduled)","Airport pickup 10% (draft)"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span>{t}</span></li>))}</ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Demand Forecast Summary</div>
          <ul className="space-y-2 text-sm">{["High demand around conference dates","Mid‑week softness expected","Leisure surge next weekend"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span>{t}</span></li>))}</ul>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Revenue by Room Type</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[46, 28, 22].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}} />))}
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Occupancy Impact Model</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 140" className="w-full h-full"><polyline fill="none" stroke="#10B981" strokeWidth="2" points="30,110 60,100 90,96 120,90 150,86 180,82 210,78 240,76 270,74 300,72" /></svg>
          </div>
          <div className="text-[11px] text-muted">Predictive effects of pricing on occupancy.</div>
        </div>
      </div>
    </div>
  );
}

