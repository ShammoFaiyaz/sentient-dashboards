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

export default function FintechAdminBillingPage() {
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
            <p className="text-xs text-muted mt-0.5">Revenue Ops Agent — spots billing errors, payment failures, and anomalies; suggests remediation.</p>
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
        <Kpi label="Outstanding Invoices" value="$182k" hint="open" colorHex="#004AAD" />
        <Kpi label="Errors" value="6" hint="payment failures" colorHex="#EF4444" />
        <Kpi label="Revenue (30d)" value="$4.6M" hint="gross" colorHex="#6D28D9" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Billing Overview</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Invoice</th><th className="py-2 px-3">Customer</th><th className="py-2 px-3">Amount</th><th className="py-2 px-3">Status</th></tr></thead><tbody>{
              [["INV‑1201","Alex Rivera","$120","Paid"],["INV‑1202","Rina Patel","$85","Pending"],["INV‑1203","Sam Lee","$62","Failed"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Billing Volume (30 Days)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb"><line x1="30" y1="100" x2="300" y2="100" /><line x1="30" y1="60" x2="300" y2="60" /></g>
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="30,90 60,88 90,80 120,86 150,78 180,84 210,76 240,82 270,74 300,70" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Notes</div>
        <ul className="space-y-2">{["Retry failed payments nightly","Notify customers before card expiration","Enable invoice exports via API"].map((t)=>(<li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>))}</ul>
      </div>

      {/* Extra detailed sections (6) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Aging Receivables</div><div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[40,26,18].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}} />))}</div><div className="text-[11px] text-muted">0–30 • 31–60 • 61–90</div></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Failure Codes</div><ul className="space-y-2 text-sm">{["Insufficient funds","Card expired","Do not honor"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span>{t}</span></li>))}</ul></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Collections Workflow</div><ul className="space-y-2 text-sm">{["D‑1 email reminder","D‑7 retry payment","D‑14 handoff to support"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span>{t}</span></li>))}</ul></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Top Customers</div><table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-2">Customer</th><th className="py-2 px-2">MRR</th></tr></thead><tbody>{[["Acme Corp","$24k"],["Globex","$19k"],["Soylent","$12k"]].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-2">{r[0]}</td><td className="py-2 px-2">{r[1]}</td></tr>))}</tbody></table></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Refund Queue</div><div className="grid grid-cols-3 gap-2 text-sm"><div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Pending</div><div className="text-xl font-semibold text-primary">6</div></div><div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Approved</div><div className="text-xl font-semibold text-primary">3</div></div><div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Rejected</div><div className="text-xl font-semibold text-primary">1</div></div></div></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Export Center</div><div className="space-y-2 text-sm"><button className="rounded-md border border-line px-2 py-1 text-xs">Export CSV</button><button className="rounded-md border border-line px-2 py-1 text-xs">Sync to ERP</button><button className="rounded-md border border-line px-2 py-1 text-xs">Generate Statements</button></div></div>
      </div>
    </div>
  );
}


