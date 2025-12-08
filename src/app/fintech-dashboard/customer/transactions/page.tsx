"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useRole } from "@/components/role/RoleProvider";
import { usePathname } from "next/navigation";

export default function FintechCustomerTransactionsPage() {
  const { agents } = useAgents();
  const { role } = useRole();
  const pathname = usePathname() || "";
  const config = NICHES["fintech-dashboard"];
  const effectiveRole = pathname.includes("/fintech-dashboard/admin/") ? "admin" : role;
  const featuredBase = agents.filter((a) => config.agentIds.includes(a.id) && a.role === effectiveRole);
  const featured =
    featuredBase.length >= 3
      ? featuredBase.slice(0, 3)
      : [...featuredBase, ...agents.filter((a) => config.agentIds.includes(a.id) && a.role !== effectiveRole)].slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Spending Insights Agent — flags anomalies and helps categorize transactions.</p>
          </div>
          <a href="/fintech-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)}
        </div>
      </section>

      {/* KPI cards — SU style */}
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Transactions (30d)" value="1,284" hint="posted items" colorHex="#004AAD" />
        <Kpi label="Avg Ticket Size" value="$58.20" hint="last 30 days" colorHex="#008C74" />
        <Kpi label="Refunds (30d)" value="$320" hint="processed" colorHex="#6D28D9" />
        <Kpi label="Disputed (30d)" value="$80" hint="chargebacks" colorHex="#EF4444" />
      </div>

      {/* Search + Filters */}
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="grid gap-3 md:grid-cols-4">
          <label className="text-sm md:col-span-2"><div className="mb-1 text-muted">Search</div><input className="w-full rounded-md border border-line px-3 py-2 text-sm" placeholder="Search transactions…" /></label>
          <label className="text-sm"><div className="mb-1 text-muted">Date Range</div><select className="w-full rounded-md border border-line px-3 py-2 text-sm"><option>Last 30 Days</option><option>90 Days</option><option>Year to Date</option></select></label>
          <label className="text-sm"><div className="mb-1 text-muted">Category</div><select className="w-full rounded-md border border-line px-3 py-2 text-sm"><option>All</option><option>Food</option><option>Bills</option><option>Shopping</option><option>Travel</option></select></label>
        </div>
      </div>

      {/* Transactions table */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Full Transactions Log</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead><tr className="text-muted"><th className="py-2 px-3">Date</th><th className="py-2 px-3">Merchant</th><th className="py-2 px-3">Amount</th><th className="py-2 px-3">Category</th><th className="py-2 px-3">Payment Method</th><th className="py-2 px-3">Status</th></tr></thead>
            <tbody>
              {[
                ["2025‑01‑28","WholeFoods","-$62.40","Food","Card","Cleared"],
                ["2025‑01‑27","Netflix","-$15.99","Bills","Card","Cleared"],
                ["2025‑01‑26","ACME Air","-$220.00","Travel","Card","Pending"],
              ].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts + cards */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Monthly Spending Comparison</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[40,52,48,60,45,50].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}} />))}
          </div>
          <div className="text-[11px] text-muted">Last 6 months month‑over‑month spending.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Payment Methods Breakdown</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="24" />
              <g transform="rotate(-90 100 100)">
                <circle cx="100" cy="100" r="60" fill="none" stroke="#34D399" strokeWidth="24" strokeDasharray="150 220" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#60A5FA" strokeWidth="24" strokeDasharray="80 290" strokeDashoffset="-150" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#FBBF24" strokeWidth="24" strokeDasharray="40 330" strokeDashoffset="-230" />
              </g>
              <circle cx="100" cy="100" r="40" fill="white" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Cards • bank • wallet</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Suspicious Activity Alerts</div>
          <ul className="space-y-2">{["Unusual spend at 3am — $220","New device used to log in","Failed OTP attempts (x3)"].map((t)=>(<li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>))}</ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">High‑Value Transactions</div>
          <ul className="space-y-2 text-sm">{["$1,200 — Apple Store","$820 — Airline Ticket","$640 — Furniture"].map((t)=>(<li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2"><span className="text-ink">{t}</span><span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Review</span></li>))}</ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Refunds & Chargebacks</div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-line/60 p-3"><div className="text-muted text-[11px]">Refunds (30d)</div><div className="text-xl font-semibold text-primary">$320</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-muted text-[11px]">Chargebacks (30d)</div><div className="text-xl font-semibold text-primary">$80</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}


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

