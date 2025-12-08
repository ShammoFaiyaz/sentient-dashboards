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

export default function HospitalityAdminUsers() {
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
            <p className="text-xs text-muted">Operational Master Agent — assists with user controls, permissions, and security insights.</p>
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
      {/* KPI cards */}
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Total Users" value="1,248" hint="guests + staff" colorHex="#004AAD" />
        <Kpi label="Pending Approvals" value="24" hint="awaiting review" colorHex="#6D28D9" />
        <Kpi label="Suspended Users" value="6" hint="temporary" colorHex="#EF4444" />
        <Kpi label="KYC Issues" value="12" hint="needs verification" colorHex="#F4B23E" />
      </div>

      {/* User directory */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">User Directory</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Name</th><th className="py-2 px-3">Role</th><th className="py-2 px-3">Status</th><th className="py-2 px-3">Last Active</th></tr></thead><tbody>{[["Sofia Rossi","Guest","Active","11:20"],["Noah Martinez","Front Desk","Active","10:45"],["Liam Turner","Ops Manager","Active","09:50"],["Chris Parker","Guest","Suspended","Yesterday"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))}</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Role Assignment Panel</div>
          <div className="grid gap-2 text-sm">
            <label className="flex items-center gap-2"><span className="w-36 text-muted">Search</span><input className="flex-1 rounded-md border border-line px-3 py-2" placeholder="Name or email…" /></label>
            <div className="grid grid-cols-3 gap-2">
              {["Guests","Front Desk","Ops Managers"].map((t)=>(<button key={t} className="rounded-md border border-line px-3 py-2 text-xs">{t}</button>))}
            </div>
            <label className="flex items-center gap-2"><span className="w-36 text-muted">Assign Role</span><select className="flex-1 rounded-md border border-line px-3 py-2"><option>Guest</option><option>Front Desk</option><option>Ops Manager</option></select></label>
            <div className="flex justify-end"><button className="rounded-md border border-line px-3 py-1">Apply</button></div>
          </div>
        </div>
      </div>

      {/* Permissions + scheduling */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Permissions Matrix</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Role</th><th className="py-2 px-3">Guests</th><th className="py-2 px-3">Front Desk</th><th className="py-2 px-3">Ops Manager</th></tr></thead><tbody>{[["View/CRUD","Read / —","Read / Write","Read / Write"],["Export","—","Write","Write"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))}</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Staff Scheduling Overrides</div>
          <div className="grid gap-2 text-sm">
            <label className="flex items-center gap-2"><span className="w-36 text-muted">Team</span><select className="flex-1 rounded-md border border-line px-3 py-2"><option>Front Desk</option><option>Housekeeping</option><option>Ops</option></select></label>
            <label className="flex items-center gap-2"><span className="w-36 text-muted">Shift</span><input className="flex-1 rounded-md border border-line px-3 py-2" placeholder="e.g., 16:00–22:00" /></label>
            <div className="flex justify-end"><button className="rounded-md border border-line px-3 py-1">Reassign</button></div>
          </div>
        </div>
      </div>

      {/* Alerts & logs */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">User Issues Requiring Action</div>
          <ul className="space-y-2 text-sm">{["3 KYC verifications > 48h","Two users with anomalous logins","Front Desk staff swap request"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span>{t}</span></li>))}</ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Access Anomalies &amp; Security Flags</div>
          <ul className="space-y-2 text-sm">{["Multiple failed logins (guest account)","Blocked access to export endpoint","New device login from overseas"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span>{t}</span></li>))}</ul>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Role Transition Requests</div>
        <ul className="space-y-2 text-sm">{["Promote FD trainee to Front Desk","Ops assistant to Ops Manager (temp)"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span>{t}</span></li>))}</ul>
      </div>
    </div>
  );
}

