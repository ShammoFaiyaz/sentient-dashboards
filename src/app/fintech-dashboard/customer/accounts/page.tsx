"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useRole } from "@/components/role/RoleProvider";
import { usePathname } from "next/navigation";

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

export default function FintechCustomerAccountsPage() {
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
            <p className="text-xs text-muted">Personal Finance Agent — summaries, alerts, and predictions across your accounts.</p>
          </div>
          <a href="/fintech-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)}
        </div>
      </section>

      {/* KPI row */}
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Checking Balance" value="$12,340" hint="Main checking" colorHex="#004AAD" />
        <Kpi label="Savings Balance" value="$28,410" hint="Emergency + goals" colorHex="#008C74" />
        <Kpi label="Loan Balance" value="$9,620" hint="Student + auto" colorHex="#6D28D9" />
        <Kpi label="Credit Utilization" value="24%" hint="across cards" colorHex="#F4B23E" />
      </div>

      {/* Accounts summary */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Accounts Summary</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted"><th className="py-2 px-3">Account</th><th className="py-2 px-3">Type</th><th className="py-2 px-3">Balance</th><th className="py-2 px-3">Status</th><th className="py-2 px-3">Last Activity</th></tr>
            </thead>
            <tbody>
              {[
                ["Everyday Checking", "Checking", "$6,210", "Active", "Today"],
                ["High-Yield Savings", "Savings", "$28,410", "Active", "Yesterday"],
                ["Travel Card", "Credit", "$1,240 due", "Active", "Today"],
                ["Student Loan", "Loan", "$6,820", "Active", "2d ago"],
              ].map((r, i) => (
                <tr key={i} className="border-t border-line/60">{r.map((c, j) => <td key={j} className="py-2 px-3">{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Balance growth line (svg) */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Balance Growth (Past Year)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">{[20,40,60,80,100].map((y,i)=>(<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g>
              <g stroke="#cbd5e1"><line x1="30" y1="10" x2="30" y2="110" /><line x1="30" y1="110" x2="300" y2="110" /></g>
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="30,105 60,100 90,96 120,90 150,84 180,80 210,74 240,70 270,66 300,60" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Monthly balance movement across all accounts.</div>
        </div>
        {/* Spending vs income meter */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Spending vs Income Meter</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between"><span className="text-ink">Income</span><span className="text-muted">$6,200</span></div>
            <div className="h-2 w-full rounded bg-ink/10"><div className="h-full rounded bg-primary" style={{ width: "72%" }} /></div>
            <div className="flex items-center justify-between pt-2"><span className="text-ink">Spending</span><span className="text-muted">$4,850</span></div>
            <div className="h-2 w-full rounded bg-ink/10"><div className="h-full rounded bg-orange-500" style={{ width: "56%" }} /></div>
          </div>
        </div>
      </div>

      {/* Upcoming recurring + income streams + risk/liquidity */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Upcoming Recurring Payments</div>
          <ul className="space-y-2">
            {["Netflix — Feb 3", "Mortgage — Feb 5", "Gym — Feb 7", "Auto Loan — Feb 12"].map((t)=>(
              <li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-ink">{t}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Income Streams Breakdown</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[60, 18, 12, 10].map((h, i) => <div key={i} className="w-10 rounded-md bg-primary/70" style={{ height: `${h}%` }} />)}
          </div>
          <div className="text-[11px] text-muted">Salary • freelance • refunds • investments</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Risk & Liquidity Scores</div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-line/60 p-3"><div className="text-muted text-[11px]">Risk</div><div className="text-xl font-semibold text-primary">Low</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-muted text-[11px]">Liquidity</div><div className="text-xl font-semibold text-primary">High</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}


