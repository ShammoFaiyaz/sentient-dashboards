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

export default function FintechAdminUsersPage() {
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
            <p className="text-xs text-muted mt-0.5">Admin Control Agent — assists with user provisioning, access anomalies, and audit trails.</p>
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
        <Kpi label="Total Users" value="124,420" hint="customers + staff" colorHex="#004AAD" />
        <Kpi label="Pending KYC" value="328" hint="review queue" colorHex="#6D28D9" />
        <Kpi label="Role Requests" value="26" hint="awaiting approval" colorHex="#F4B23E" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Users</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Name</th><th className="py-2 px-3">Role</th><th className="py-2 px-3">Status</th><th className="py-2 px-3">Last Active</th></tr></thead><tbody>{
              [["Alex Rivera","Customer","Active","10:21"],["Rina Patel","Risk Officer","Active","09:15"],["Sam Lee","Customer","Suspended","Yesterday"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Role Assignment Panel</div>
          <div className="grid gap-2 text-sm">
            <label className="flex items-center gap-2"><span className="w-28 text-muted">User</span><input className="flex-1 rounded-md border border-line px-3 py-2" placeholder="Search user…" /></label>
            <label className="flex items-center gap-2"><span className="w-28 text-muted">Role</span><select className="flex-1 rounded-md border border-line px-3 py-2"><option>Customer</option><option>Risk Officer</option><option>Admin</option></select></label>
            <div className="flex justify-end"><button className="rounded-md border border-line px-3 py-1">Assign</button></div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Permissions Matrix</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Role</th><th className="py-2 px-3">Accounts</th><th className="py-2 px-3">Transactions</th><th className="py-2 px-3">Risk</th><th className="py-2 px-3">Admin</th></tr></thead><tbody>{
              [["Customer","Read","Read","—","—"],["Risk Officer","Read","Read","Write","—"],["Admin","Write","Write","Write","Write"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">User Growth by Role</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[18,12,6].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}}/>))}</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Alerts</div>
        <ul className="space-y-2">{["3 KYC verifications pending > 48h","Unusual login pattern detected","New role request from user #12931"].map((t)=>(<li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>))}</ul>
      </div>

      {/* Extra detailed sections (6) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">KYC Queue Health</div><div className="grid grid-cols-3 gap-2 text-sm"><div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Pending</div><div className="text-xl font-semibold text-primary">328</div></div><div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Approved</div><div className="text-xl font-semibold text-primary">1,204</div></div><div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Rejected</div><div className="text-xl font-semibold text-primary">18</div></div></div></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Login Risk Heatmap</div><div className="mt-2 h-44 border border-line/60 rounded-md p-3 grid grid-cols-12 gap-1">{Array.from({length:60}).map((_,i)=>(<div key={i} className="h-4 rounded" style={{background:`rgba(244,178,62,${0.15 + (i%12)/10})`}} />))}</div><div className="text-[11px] text-muted">Darker cells indicate higher anomaly scores.</div></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">User Segments</div><div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[60,28,12].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}} />))}</div><div className="text-[11px] text-muted">Retail • corporate • staff</div></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">De‑provisioning Queue</div><ul className="space-y-2 text-sm">{["7 accounts inactive > 180d","2 contractors pending offboarding","1 admin access downgrade"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>))}</ul></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Support Ticket Snapshot</div><table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-2">Ticket</th><th className="py-2 px-2">Status</th></tr></thead><tbody>{[["SUP‑412","Open"],["SUP‑399","Pending"],["SUP‑392","Resolved"]].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-2">{r[0]}</td><td className="py-2 px-2">{r[1]}</td></tr>))}</tbody></table></div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm"><div className="text-sm font-semibold text-ink mb-2">Policy Changes (Preview)</div><ul className="space-y-2 text-sm">{["Require MFA for Risk Officer","Session timeout: 20m","Disable legacy API tokens"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>))}</ul></div>
      </div>
    </div>
  );
}


