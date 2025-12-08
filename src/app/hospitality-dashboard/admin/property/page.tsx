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

export default function HospitalityAdminProperty() {
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
            <p className="text-xs text-muted">Operational Master Agent — helps monitor properties, repairs, and housekeeping capacity.</p>
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
        <Kpi label="Total Properties" value="4" hint="active" colorHex="#004AAD" />
        <Kpi label="Total Rooms" value="1,120" hint="across sites" colorHex="#008C74" />
        <Kpi label="Rooms Under Maintenance" value="22" hint="today" colorHex="#EF4444" />
        <Kpi label="Open Repairs" value="14" hint="work orders" colorHex="#6D28D9" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Property Overview</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Property</th><th className="py-2 px-3">Floors</th><th className="py-2 px-3">Rooms</th><th className="py-2 px-3">Status</th></tr></thead><tbody>{[["Downtown Suites","20","480","Open"],["Harbor View","18","360","Open"],["Midtown","12","220","Open"],["Airport Express","8","60","Limited"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))}</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Room Type Mix</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[42,28,30].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}} />))}
          </div>
          <div className="text-[11px] text-muted">Distribution of rooms by category (Deluxe, Suite, Standard).</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Housekeeping Assignment Dashboard</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {["Floors 1–8 • Team A","Floors 9–16 • Team B","Floors 17–20 • Team C","Harbor East • Team D"].map((t)=>(<div key={t} className="rounded-md border border-line/60 p-2">{t}</div>))}
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Repair Pipeline Panel</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 grid grid-cols-12 gap-1">
            {Array.from({length:48}).map((_,i)=>(<div key={i} className="h-4 rounded" style={{background:`rgba(59,130,246,${0.2+(i%6)/10})`}} />))}
          </div>
          <div className="text-[11px] text-muted">Open issues from report → triage → repair.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Maintenance Performance Summary</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Avg Time to Resolve</div><div className="text-xl font-semibold text-primary">5.2h</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Repeat Issues</div><div className="text-xl font-semibold text-primary">3%</div></div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Property Alerts</div>
          <ul className="space-y-2 text-sm">{["Water leak at Block B","AC issues on Floor 3","Elevator inspection due (Downtown)"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span>{t}</span></li>))}</ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Upcoming Inspections &amp; Audits</div>
          <ul className="space-y-2 text-sm">{["Fire drill — Midtown (Feb 12)","Electrical audit — Harbor View (Feb 18)","Safety inspection — Downtown (Feb 22)"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span>{t}</span></li>))}</ul>
        </div>
      </div>
    </div>
  );
}

