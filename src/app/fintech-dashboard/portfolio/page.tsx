"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useRole } from "@/components/role/RoleProvider";
import { usePathname } from "next/navigation";

export default function PortfolioOverviewPage() {
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
            <p className="text-xs text-muted mt-0.5">Portfolio Insights Agent — summarizes risk, opportunities, and market anomalies.</p>
          </div>
          <a href="/fintech-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Assets Under Management" value="$12.4M" hint="current AUM" colorHex="#004AAD" />
        <Kpi label="Holdings Count" value="58" hint="unique tickers" colorHex="#008C74" />
        <Kpi label="Cash Position" value="$420k" hint="ready to deploy" colorHex="#6D28D9" />
        <Kpi label="Risk Score" value="3.2" hint="1–5 scale" colorHex="#F4B23E" />
      </div>

      {/* Moved from Dashboard: trend, categories, transactions, bills, highlights, allocation */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Spending Trend (Last 90 Days)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">{[20,40,60,80,100].map((y,i)=>(<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g>
              <g stroke="#cbd5e1"><line x1="30" y1="10" x2="30" y2="110" /><line x1="30" y1="110" x2="300" y2="110" /></g>
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="30,105 60,100 90,95 120,92 150,88 180,84 210,86 240,80 270,78 300,82" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Aggregated daily spend across all connected accounts.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Top Spending Categories (This Month)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[38, 24, 18, 12, 8].map((h, i) => <div key={i} className="w-10 rounded-md bg-primary/70" style={{ height: `${h}%` }} />)}
          </div>
          <div className="text-[11px] text-muted">Category breakdown from categorized transactions.</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Recent Transactions Snapshot</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead><tr className="text-muted"><th className="py-2 px-3">Date</th><th className="py-2 px-3">Merchant</th><th className="py-2 px-3">Category</th><th className="py-2 px-3">Amount</th><th className="py-2 px-3">Status</th></tr></thead>
              <tbody>
                {[["2025‑01‑28","WholeFoods","Food","-$62.40","Cleared"],["2025‑01‑27","Netflix","Bills","-$15.99","Cleared"],["2025‑01‑26","ACME Air","Travel","-$220.00","Pending"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Upcoming Bills & Due Dates</div>
          <ul className="space-y-2">{["Mortgage — Feb 5","Internet — Feb 6","Gym — Feb 7","Visa — Feb 12"].map((t)=>(<li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>))}</ul>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Investment Highlights</div>
          <ul className="space-y-2">{["Best performer: AAPL +4.2%","Worst performer: BND -0.6%","Risk level: Moderate"].map((t)=>(<li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>))}</ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Portfolio Allocation</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="24" />
              <g transform="rotate(-90 100 100)">
                <circle cx="100" cy="100" r="60" fill="none" stroke="#34D399" strokeWidth="24" strokeDasharray="140 230" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#60A5FA" strokeWidth="24" strokeDasharray="80 290" strokeDashoffset="-140" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#FBBF24" strokeWidth="24" strokeDasharray="40 330" strokeDashoffset="-220" />
              </g>
              <circle cx="100" cy="100" r="40" fill="white" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Your investment distribution by asset class.</div>
        </div>
      </div>

      {/* Holdings list */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Holdings List</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Symbol</th>
                <th className="py-2 px-3">Weight</th>
                <th className="py-2 px-3">Value</th>
                <th className="py-2 px-3">1D Change</th>
                <th className="py-2 px-3">YTD Return</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["AAPL", "12.3%", "$1.53M", "+0.8%", "+7.2%"],
                ["MSFT", "10.1%", "$1.24M", "+1.1%", "+9.4%"],
                ["TLT", "8.4%", "$1.04M", "-0.2%", "+2.0%"],
                ["BRK.B", "7.5%", "$930k", "+0.3%", "+4.1%"],
                ["GLD", "4.0%", "$500k", "-0.6%", "+1.8%"],
              ].map((r, i) => (
                <tr key={i} className="border-t border-line/60">
                  {r.map((c, j) => (
                    <td key={j} className="py-2 px-3">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review items */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Items Requiring Review</div>
        <ul className="space-y-2">
          {[
            "Position in TLT exceeds 8% — consider trimming to policy target.",
            "Cash level above threshold; evaluate deployment options.",
            "Rebalance overweight tech exposure before month‑end.",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ul>
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


