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

export default function RetailAdminUsers() {
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
            <p className="text-xs text-muted">Admin Control Agent — user provisioning, access anomalies, and broadcast actions.</p>
          </div>
          <Link href="/retail-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>
      {/* KPIs */}
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Total Users" value="54,012" hint="customers" colorHex="#004AAD" />
        <Kpi label="Pending Approvals" value="128" hint="KYC" colorHex="#6D28D9" />
        <Kpi label="Suspended" value="42" hint="policy breaches" colorHex="#EF4444" />
        <Kpi label="New Today" value="1,024" hint="signups" colorHex="#008C74" />
      </div>

      {/* Filters */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="grid gap-3 md:grid-cols-4">
          <label className="text-sm md:col-span-2">
            <div className="mb-1 text-muted">Search</div>
            <input className="w-full rounded-md border border-line px-3 py-2 text-sm" placeholder="Search users…" />
          </label>
          <label className="text-sm">
            <div className="mb-1 text-muted">Role</div>
            <select className="w-full rounded-md border border-line px-3 py-2 text-sm"><option>All</option><option>Customer</option><option>Staff</option></select>
          </label>
          <label className="text-sm">
            <div className="mb-1 text-muted">Status</div>
            <select className="w-full rounded-md border border-line px-3 py-2 text-sm"><option>All</option><option>Active</option><option>Suspended</option><option>Pending</option></select>
          </label>
        </div>
      </div>

      {/* Users table */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Users</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted"><th className="py-2 px-3">Name</th><th className="py-2 px-3">Role</th><th className="py-2 px-3">Status</th><th className="py-2 px-3">Last Active</th></tr>
            </thead>
            <tbody>
              {[
                ["Alex Rivera", "Customer", "Active", "10:21"],
                ["Rina Patel", "Staff", "Active", "09:33"],
                ["Sam Lee", "Customer", "Suspended", "Yesterday"],
              ].map((r, i) => (
                <tr key={i} className="border-t border-line/60">{r.map((c, j) => <td key={j} className="py-2 px-3">{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Admin Alerts</div>
        <ul className="space-y-2">
          {["5 new sign‑ups waiting for KYC verification.", "2 suspended accounts require review.", "Password reset rate spiked after 8 PM."].map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-ink">{t}</span></li>
          ))}
        </ul>
      </div>

      {/* Additional admin controls */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Role Permissions Matrix</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead><tr className="text-muted"><th className="py-2 px-3">Role</th><th className="py-2 px-3">Users</th><th className="py-2 px-3">Catalog</th><th className="py-2 px-3">Orders</th><th className="py-2 px-3">Admin</th></tr></thead>
              <tbody>
                {[["Store Manager","Read","Write","Write","—"],["Merchandiser","—","Write","Read","—"],["Admin","Write","Write","Write","Write"]].map((r,i)=>(
                  <tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Bulk Actions</div>
          <div className="flex flex-wrap gap-2 text-sm">
            {["Suspend","Activate","Reset MFA","Force Logout","Require Password Change","Export CSV"].map((b)=>(
              <button key={b} className="rounded-md border border-line px-3 py-1">{b}</button>
            ))}
          </div>
          <div className="text-[11px] text-muted mt-2">Applies to filtered selection.</div>
        </div>
      </div>
      
      {/* Extra admin controls (dummy sections) */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">User Activity Insights</div>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb"><line x1="0" y1="100" x2="320" y2="100" /></g>
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="10,95 40,90 70,88 100,84 130,80 160,78 190,76 220,70 250,66 280,62 310,60" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Active users trend (last 30 days).</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Verification Queue</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">User</th><th className="py-2 px-3">Document</th><th className="py-2 px-3">Status</th></tr></thead><tbody>{
              [["Michael Chen","ID Front/Back","Pending"],["Sara Young","Proof of Address","Reviewing"],["Jon Doe","ID Front/Back","Approved"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Role Requests</div>
          <ul className="space-y-2 text-sm">
            {["Customer → Staff (Store #7) — Approve/Reject","Staff → Manager (Store #3) — Approve/Reject","Customer → Affiliate — Approve/Reject"].map((t)=>(
              <li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2"><span className="text-ink">{t}</span><div className="space-x-2"><button className="rounded-md border border-line px-2 py-0.5">Approve</button><button className="rounded-md border border-line px-2 py-0.5">Reject</button></div></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Notification Broadcast</div>
          <div className="grid gap-2 md:grid-cols-2">
            <input className="rounded-md border border-line px-3 py-2 text-sm" placeholder="Subject" />
            <select className="rounded-md border border-line px-3 py-2 text-sm"><option>All users</option><option>Active only</option><option>Suspended</option></select>
            <textarea className="md:col-span-2 rounded-md border border-line px-3 py-2 text-sm" rows={3} placeholder="Message to broadcast…" />
            <button className="justify-self-start rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:opacity-90">Send Broadcast</button>
          </div>
        </div>
      </div>
    </div>
  );
}

