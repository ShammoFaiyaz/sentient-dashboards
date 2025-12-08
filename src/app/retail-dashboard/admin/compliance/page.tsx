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

export default function RetailAdminCompliance() {
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
            <p className="text-xs text-muted">Compliance Agent — audits, evidence queue, and policy tasks.</p>
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
        <Kpi label="Violations" value="3" hint="open issues" colorHex="#EF4444" />
        <Kpi label="Pending Reviews" value="12" hint="in queue" colorHex="#6D28D9" />
        <Kpi label="Reports Filed" value="28" hint="last 30 days" colorHex="#004AAD" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Compliance Items</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Item</th><th className="py-2 px-3">Status</th><th className="py-2 px-3">Due</th></tr></thead><tbody>{
              [["PCI quarterly scan","In Progress","2025‑02‑10"],["GDPR data export request","Pending","2025‑01‑31"],["Vendor risk review","Overdue","2025‑01‑20"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Compliance Issues by Type</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[12,7,5,3].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}}/>))}</div>
          <div className="text-[11px] text-muted">Distribution across data, payments, vendor, and policy categories.</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Notes</div>
        <ul className="space-y-2">
          {["Schedule PCI ASV scan for Feb 8.","Finalize DPIA for new recommendations module.","Close vendor risk item after documentation received."].map((t)=>(<li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>))}
        </ul>
      </div>

      {/* Additional admin sections */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Task Assignment</div>
          <ul className="space-y-2 text-sm">
            {["Review DPIA — Assign","Confirm vendor SOC2 — Assign","Close PCI deviation — Assign"].map((t)=>(
              <li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2"><span className="text-ink">{t}</span><button className="rounded-md border border-line px-2 py-0.5">Assign</button></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Evidence Queue</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Item</th><th className="py-2 px-3">Type</th><th className="py-2 px-3">Owner</th><th className="py-2 px-3">Status</th></tr></thead><tbody>{
              [["Disposal log","PDF","Ops","Pending"],["Training completion","CSV","HR","Reviewed"]].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-3">{r[0]}</td><td className="py-2 px-3">{r[1]}</td><td className="py-2 px-3">{r[2]}</td><td className="py-2 px-3">{r[3]}</td></tr>))
            }</tbody></table>
          </div>
        </div>
      </div>

      {/* Extra admin sections (dummy) */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Policy Reviews</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Policy</th><th className="py-2 px-3">Owner</th><th className="py-2 px-3">Review Date</th></tr></thead><tbody>{
              [["Data Retention","Legal","2025‑02‑15"],["Returns & Refunds","Ops","2025‑03‑01"],["Access Control","IT","2025‑02‑28"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Incident Log</div>
          <ul className="space-y-2 text-sm">
            {["2025‑01‑21 — POS outage — Resolved","2025‑01‑18 — Minor data export delay — Resolved","2025‑01‑10 — Duplicate invoices — Monitoring"].map((t)=>(
              <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Training Compliance</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Team</th><th className="py-2 px-3">Completion</th><th className="py-2 px-3">Due</th></tr></thead><tbody>{
              [["Retail Ops","92%","2025‑02‑12"],["Warehouse","88%","2025‑02‑20"],["Support","96%","2025‑02‑05"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Data Retention Status</div>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3 flex items-end gap-3">{[100,95,70,40].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-emerald-500/70" style={{height:`${h/2}%`}}/>))}</div>
          <div className="text-[11px] text-muted">Retention coverage by dataset: orders, customers, logs, sessions.</div>
        </div>
      </div>
    </div>
  );
}

