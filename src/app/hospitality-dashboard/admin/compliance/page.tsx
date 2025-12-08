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

export default function HospitalityAdminCompliance() {
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
            <p className="text-xs text-muted">Compliance Agent — audits, violations, and policy rollouts.</p>
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
      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Total Violations" value="3" hint="open" colorHex="#EF4444" />
        <Kpi label="Pending Reviews" value="12" hint="awaiting" colorHex="#6D28D9" />
        <Kpi label="Overdue Checks" value="2" hint="attention" colorHex="#F4B23E" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Compliance Issues</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Issue</th><th className="py-2 px-3">Severity</th><th className="py-2 px-3">Department</th><th className="py-2 px-3">Status</th></tr></thead><tbody>{[["Missing fire drill log","High","Ops","Open"],["Vendor document expired","Medium","Procurement","Pending"],["DPIA overdue","Critical","Legal","Open"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))}</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Issues by Severity</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[4,7,9,12].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h*6}%`}} />))}
          </div>
          <div className="text-[11px] text-muted">Critical, High, Medium, Low.</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Audit Assignment Panel</div>
          <div className="grid gap-2 text-sm">
            <label className="flex items-center gap-2"><span className="w-40 text-muted">Task</span><input className="flex-1 rounded-md border border-line px-3 py-2" placeholder="Select/Describe task…" /></label>
            <label className="flex items-center gap-2"><span className="w-40 text-muted">Assign to</span><select className="flex-1 rounded-md border border-line px-3 py-2"><option>Front Desk</option><option>Ops</option><option>Housekeeping</option></select></label>
            <div className="flex justify-end"><button className="rounded-md border border-line px-3 py-1">Assign</button></div>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Policy Updates &amp; Rollouts</div>
          <ul className="space-y-2 text-sm">{["New vendor onboarding checklist (v2)","Updated fire drill SOP (weekly)","Privacy policy bulletins to staff"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span>{t}</span></li>))}</ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Risk Compliance Overview</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Safety</div><div className="text-xl font-semibold text-primary">92%</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Sanitation</div><div className="text-xl font-semibold text-primary">96%</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Fire</div><div className="text-xl font-semibold text-primary">88%</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">HR</div><div className="text-xl font-semibold text-primary">94%</div></div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Department Compliance Scores</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[94,90,88,96].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h/1.5}%`}} />))}</div>
        </div>
      </div>
    </div>
  );
}

