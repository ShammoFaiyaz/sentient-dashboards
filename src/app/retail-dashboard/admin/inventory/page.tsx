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

export default function RetailAdminInventory() {
  const { agents } = useAgents();
  const config = NICHES["retail-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Inventory Ops Agent — monitors OOS risk, supplier SLAs, and replenishment rules.</p>
          </div>
          <Link href="/retail-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>
      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Total SKUs" value="9,110" hint="catalog + variants" colorHex="#004AAD" />
        <Kpi label="Out-of-Stock" value="42" hint="needs attention" colorHex="#EF4444" />
        <Kpi label="Low Stock" value="318" hint="< 7 days cover" colorHex="#6D28D9" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Inventory Summary</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Category</th><th className="py-2 px-3">SKUs</th><th className="py-2 px-3">In Stock</th><th className="py-2 px-3">OOS</th></tr></thead><tbody>{
              [["Apparel","3,420","3,380","40"],["Electronics","2,100","2,092","8"],["Home","1,590","1,575","15"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Inventory Issues by Category</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[14,8,12,5].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}}/>))}</div>
          <div className="text-[11px] text-muted">Counts of OOS/low stock issues per category (sample).</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Alerts</div>
        <ul className="space-y-2">
          {["Auto‑replenishment proposed for 3 fast movers.","Lead time increased for supplier NOVA.","Investigate mismatch in online stock counts."].map((t)=>(<li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>))}
        </ul>
      </div>

      {/* Additional admin controls */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Replenishment Rules</div>
          <ul className="space-y-2 text-sm">
            {["Min days cover = 10","Reorder up to 21 days cover","Ignore items with weekly sales < 5"].map((t)=>(
              <li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2"><span className="text-ink">{t}</span><span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Active</span></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Transfer Requests</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">From</th><th className="py-2 px-3">To</th><th className="py-2 px-3">SKU</th><th className="py-2 px-3">Qty</th></tr></thead><tbody>{
              [["Store #12","Store #7","TSH‑001","120"],["DC‑East","Store #3","ELE‑441","80"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
      </div>

      {/* Extra admin controls (dummy sections) */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Aging Stock</div>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3 flex items-end gap-3">{[5,9,14,20,26,31].map((h,i)=>(<div key={i} className="w-8 rounded-md bg-amber-500/70" style={{height:`${h}%`}}/>))}</div>
          <div className="text-[11px] text-muted">Units aging by week bucket (older to newer).</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Cycle Count Planner</div>
          <ul className="space-y-2 text-sm">
            {["Store #12 — High variance category","DC‑East — Electronics Aisle B","Store #3 — Weekly fast movers"].map((t)=>(
              <li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2"><span className="text-ink">{t}</span><button className="rounded-md border border-line px-2 py-0.5">Schedule</button></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Supplier SLA Heatmap</div>
          <div className="mt-2 grid grid-cols-6 gap-1">
            {Array.from({length:18}).map((_,i)=>(<div key={i} className="h-6 rounded" style={{background:i%5===0?"#7c3aed":i%3===0?"#a78bfa":i%2===0?"#c7d2fe":"#e2e8f0"}}/>))}
          </div>
          <div className="text-[11px] text-muted">On‑time delivery performance (darker = better).</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Backorder Queue</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">SKU</th><th className="py-2 px-3">Qty</th><th className="py-2 px-3">ETA</th></tr></thead><tbody>{
              [["TSH‑001","240","3 days"],["ELE‑441","80","7 days"],["HOME‑882","120","2 days"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
      </div>
    </div>
  );
}

