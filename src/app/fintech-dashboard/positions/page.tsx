"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useRole } from "@/components/role/RoleProvider";
import { usePathname } from "next/navigation";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

export default function PositionsHoldingsPage() {
  const { agents } = useAgents();
  const { role } = useRole();
  const pathname = usePathname() || "";
  const config = NICHES["fintech-dashboard"];
  const effectiveRole = pathname.includes("/fintech-dashboard/admin/") ? "admin" : role;
  const featured = agentsForNicheAndRole("fintech-dashboard", agents, {
    suRole: effectiveRole,
  }).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted mt-0.5">Portfolio Insights Agent — summarizes holdings concentration and risk hotspots.</p>
          </div>
          <a href="/fintech-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards — SU style */}
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Total Positions" value="128" hint="across all accounts" colorHex="#004AAD" />
        <Kpi label="Top Holding Weight" value="12.4%" hint="AAPL" colorHex="#6D28D9" />
        <Kpi label="Cash Allocation" value="5.8%" hint="dry powder" colorHex="#008C74" />
        <Kpi label="1D P/L" value="+$42.6k" hint="as of close" colorHex="#F4B23E" />
      </div>

      {/* Holdings table */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">All Holdings</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Symbol</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Shares</th>
                <th className="py-2 px-3">Avg Cost</th>
                <th className="py-2 px-3">Market Value</th>
                <th className="py-2 px-3">P/L</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["AAPL", "Apple Inc.", "7,500", "$174.10", "$1.31M", "+$62k"],
                ["MSFT", "Microsoft", "6,800", "$368.20", "$1.25M", "+$85k"],
                ["TLT", "iShares 20+ Yr", "9,100", "$92.40", "$0.84M", "-$6k"],
                ["BRK.B", "Berkshire Hathaway", "2,800", "$348.30", "$0.98M", "+$12k"],
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

      {/* Sector exposure + concentration alerts */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Sector Exposure</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[28, 22, 14, 12, 10, 8].map((h, i) => (
              <div key={i} className="w-10 rounded-md bg-primary/70" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="text-[11px] text-muted">Relative exposure across Technology, Financials, Healthcare, Industrials, Energy, Utilities.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Concentration Alerts</div>
          <ul className="space-y-2">
            {[
              "Top holding exceeds 12% single‑name cap.",
              "Sector tilt to Technology above policy range.",
              "Bond duration risk elevated vs benchmark.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Extra analytics (dummy sections) */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Rebalance Suggestions</div>
          <ul className="space-y-2 text-sm">
            {["Trim AAPL −1.5% to target 10% weight","Add 0.8% to Healthcare via XLV","Reduce long duration by −0.5% via TLT"].map((t)=>(
              <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Style Factor Exposure</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[60, 35, 20, 45, 25].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}}/>))}
          </div>
          <div className="text-[11px] text-muted">Value • Growth • Momentum • Quality • Size.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">ESG Scores (Top 5)</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Symbol</th><th className="py-2 px-3">E</th><th className="py-2 px-3">S</th><th className="py-2 px-3">G</th></tr></thead><tbody>{
              [["AAPL","84","79","88"],["MSFT","90","85","92"],["BRK.B","75","70","80"],["TLT","—","—","—"],["GLD","—","—","—"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
      </div>

      {/* More sections */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Country Exposure</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[40, 22, 14, 10, 8, 6].map((h, i) => (
              <div key={i} className="w-10 rounded-md bg-primary/70" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="text-[11px] text-muted">US • EU • UK • JP • EM • Other (illustrative).</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Dividend Calendar</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Symbol</th>
                  <th className="py-2 px-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Feb 05", "AAPL", "$0.24"],
                  ["Feb 09", "MSFT", "$0.68"],
                  ["Feb 18", "TLT", "$0.19"],
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

