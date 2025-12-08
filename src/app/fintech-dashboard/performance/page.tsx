"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useRole } from "@/components/role/RoleProvider";
import { usePathname } from "next/navigation";

export default function PerformanceAnalyticsPage() {
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
            <p className="text-xs text-muted mt-0.5">Portfolio Insights Agent — explains performance drivers and benchmark gaps.</p>
          </div>
          <a href="/fintech-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* Performance vs benchmark removed per request */}

      {/* KPI cards */}
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <Kpi label="Alpha" value="+1.5%" hint="annualized" colorHex="#004AAD" />
        <Kpi label="Beta" value="0.92" hint="vs benchmark" colorHex="#008C74" />
        <Kpi label="Volatility" value="12.3%" hint="annualized" colorHex="#6D28D9" />
        <Kpi label="Max Drawdown" value="-8.7%" hint="rolling 1Y" colorHex="#F4B23E" />
      </div>

      {/* Benchmark comparison */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Benchmark Comparison</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Metric</th>
                <th className="py-2 px-3">Portfolio</th>
                <th className="py-2 px-3">Benchmark</th>
                <th className="py-2 px-3">Diff</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["YTD Return", "+7.4%", "+5.9%", "+1.5%"],
                ["Volatility", "12.3%", "13.1%", "-0.8%"],
                ["Sharpe Ratio", "1.42", "1.20", "+0.22"],
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

      {/* Performance notes */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Performance Notes</div>
        <ul className="space-y-2">
          {[
            "Energy overweight detracted −0.3% YTD vs benchmark.",
            "Stock selection in large-cap tech added +0.9% YTD.",
            "Fixed income duration positioned slightly long vs index.",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Extra analytics (dummy sections) */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Factor Attribution (YTD)</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Factor</th><th className="py-2 px-3">Contribution</th></tr></thead><tbody>{
              [["Market","+3.1%"],["Value","+0.6%"],["Momentum","+0.2%"],["Quality","+0.5%"],["Size","-0.1%"]].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-3">{r[0]}</td><td className="py-2 px-3">{r[1]}</td></tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Drawdown (12 Months)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb"><line x1="0" y1="100" x2="320" y2="100" /></g>
              <polyline fill="none" stroke="#EF4444" strokeWidth="2" points="10,98 40,96 70,90 100,94 130,92 160,88 190,84 220,86 250,80 280,82 310,78" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Peak‑to‑trough percentage from rolling high.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Rolling Volatility (30D)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb"><line x1="0" y1="100" x2="320" y2="100" /></g>
              <polyline fill="none" stroke="#6D28D9" strokeWidth="2" points="10,90 40,88 70,82 100,76 130,80 160,78 190,72 220,70 250,74 280,70 310,68" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Annualized σ computed on trailing 30 trading days.</div>
        </div>
      </div>

      {/* More analytics */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Sharpe Ratio by Month</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-2">
            {[0.9, 1.1, 0.8, 1.2, 1.0, 0.7, 0.9, 1.3, 1.1, 1.2, 0.95, 1.25].map((s, i) => (
              <div key={i} className="w-6 rounded-md bg-primary/70" style={{ height: `${s * 60}%` }} />
            ))}
          </div>
          <div className="text-[11px] text-muted">Monthly Sharpe ratios for the last 12 months.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Benchmark Correlation Matrix</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">—</th>
                  <th className="py-2 px-3">Portfolio</th>
                  <th className="py-2 px-3">S&P 500</th>
                  <th className="py-2 px-3">US Agg</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Portfolio", "1.00", "0.86", "-0.22"],
                  ["S&P 500", "0.86", "1.00", "-0.35"],
                  ["US Agg", "-0.22", "-0.35", "1.00"],
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


