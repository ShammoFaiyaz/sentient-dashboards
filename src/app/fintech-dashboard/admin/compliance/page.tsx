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

export default function FintechAdminCompliancePage() {
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
            <p className="text-xs text-muted mt-0.5">Compliance Oversight Agent — tracks audits, evidence, and overdue actions.</p>
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
        <Kpi label="Violations" value="3" hint="open" colorHex="#EF4444" />
        <Kpi label="Reports Pending" value="12" hint="approval" colorHex="#6D28D9" />
        <Kpi label="Audits Scheduled" value="4" hint="next 30d" colorHex="#004AAD" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Compliance Tasks</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Task</th><th className="py-2 px-3">Owner</th><th className="py-2 px-3">Due</th><th className="py-2 px-3">Status</th></tr></thead><tbody>{
              [["PCI quarterly scan","Security","2025-02-10","In Progress"],["KYC sample review","Ops","2025-02-05","Pending"],["GDPR request","Legal","2025-01-31","Overdue"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Audit Findings (By Severity)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[12,7,3].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}}/>))}</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Audit Assignment Panel</div>
          <div className="grid gap-2 text-sm">
            <label className="flex items-center gap-2"><span className="w-36 text-muted">Task</span><input className="flex-1 rounded-md border border-line px-3 py-2" placeholder="Select task…" /></label>
            <label className="flex items-center gap-2"><span className="w-36 text-muted">Assign to</span><input className="flex-1 rounded-md border border-line px-3 py-2" placeholder="User/Team" /></label>
            <div className="flex justify-end"><button className="rounded-md border border-line px-3 py-1">Assign</button></div>
          </div>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Alerts</div>
          <ul className="space-y-2">{["2 DPIAs due this month","Vendor SOC2 expired — follow up","Consent logs anomaly on 01/24"].map((t)=>(<li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>))}</ul>
        </div>
      </div>

      {/* Extra detailed sections (6) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Policy Register</div><ul className="space-y-2 text-sm">{["AML policy — v2.1","Privacy policy — v5.4","KYC SOP — v3.2"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span>{t}</span></li>))}</ul></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Evidence Queue</div><table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-2">Item</th><th className="py-2 px-2">Status</th></tr></thead><tbody>{[["PCI scan report","Received"],["SOC2 bridge letter","Pending"],["GDPR SAR export","In progress"]].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-2">{r[0]}</td><td className="py-2 px-2">{r[1]}</td></tr>))}</tbody></table></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Breach Timeline (Demo)</div><div className="mt-2 h-44 border border-line/60 rounded-md p-3 grid grid-cols-12 gap-1">{Array.from({length:36}).map((_,i)=>(<div key={i} className="h-4 rounded" style={{background:`rgba(239,68,68,${0.15 + (i%6)/10})`}} />))}</div><div className="text-[11px] text-muted">Synthetic incident intensity over time.</div></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Training Completion</div><div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[92,88,80].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h/1.5}%`}} />))}</div><div className="text-[11px] text-muted">Security • privacy • AML</div></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Regulatory Calendar</div><ul className="space-y-2 text-sm">{["Feb 15 — PCI SAQ","Mar 1 — SOX report","Mar 20 — Quarterly AML review"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span>{t}</span></li>))}</ul></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Data Retention Map</div><div className="mt-2 h-44 border border-line/60 rounded-md p-3 grid grid-cols-6 gap-1">{Array.from({length:18}).map((_,i)=>(<div key={i} className="h-6 rounded" style={{background:`rgba(59,130,246,${0.2+(i%6)/10})`}} />))}</div><div className="text-[11px] text-muted">Synthetic residency/retention coverage.</div></div>
      </div>
    </div>
  );
}


