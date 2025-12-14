"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useRole } from "@/components/role/RoleProvider";
import { usePathname } from "next/navigation";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

export default function PortfolioTransactionsPage() {
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
            <p className="text-xs text-muted mt-0.5">Execution Agent — monitors fills, flags settlement issues, and suggests routes.</p>
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
      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Executed Trades Today" value="128" hint="all venues" colorHex="#004AAD" />
        <Kpi label="Pending Orders" value="17" hint="working" colorHex="#6D28D9" />
        <Kpi label="Settlement Issues" value="3" hint="requires action" colorHex="#EF4444" />
      </div>

      {/* Trade history table */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Trade History</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Time</th>
                <th className="py-2 px-3">Symbol</th>
                <th className="py-2 px-3">Side</th>
                <th className="py-2 px-3">Qty</th>
                <th className="py-2 px-3">Price</th>
                <th className="py-2 px-3">Venue</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["10:21:33", "AAPL", "Buy", "500", "$192.10", "NASDAQ"],
                ["10:10:05", "MSFT", "Sell", "300", "$402.55", "BATS"],
                ["09:55:12", "TLT", "Buy", "800", "$97.42", "NYSE"],
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

      {/* Trade type donut + compliance flags */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Trade Types Breakdown</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="24" />
              <g transform="rotate(-90 100 100)">
                <circle cx="100" cy="100" r="60" fill="none" stroke="#60A5FA" strokeWidth="24" strokeDasharray="120 250" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#34D399" strokeWidth="24" strokeDasharray="70 300" strokeDashoffset="-120" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#FBBF24" strokeWidth="24" strokeDasharray="60 310" strokeDashoffset="-190" />
              </g>
              <circle cx="100" cy="100" r="40" fill="white" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Market • Limit • Other (dummy distribution).</div>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Compliance Flags</div>
          <ul className="space-y-2">
            {[
              "Wash trade pattern detected across two venues — review.",
              "Late allocation on 2 tickets — settlement risk.",
              "Restricted list breach attempt auto‑blocked.",
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
          <div className="text-sm font-semibold text-primary mb-2">Venue Fill Rate</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[82,74,68,55].map((h,i)=>(<div key={i} className="w-12 rounded-md bg-primary/70" style={{height:`${h/1.5}%`}}/>))}
          </div>
          <div className="text-[11px] text-muted">Fill rates by top venues (illustrative).</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Slippage Analysis</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb"><line x1="0" y1="100" x2="320" y2="100" /></g>
              <polyline fill="none" stroke="#F59E0B" strokeWidth="2" points="10,98 40,94 70,96 100,92 130,90 160,91 190,88 220,86 250,87 280,84 310,83" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Avg bps vs arrival price, last 20 sessions.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Routing Suggestions</div>
          <ul className="space-y-2 text-sm">
            {["Favor dark pools for large caps > $5M notional","Route small‑lot tech to BATS pre‑open","Avoid XYZ venue during lunch hour"].map((t)=>(
              <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Exceptions + latency side-by-side */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Settlement Exceptions</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Trade ID</th><th className="py-2 px-3">Reason</th><th className="py-2 px-3">Action</th></tr></thead><tbody>{
              [["T‑99123","Late allocation","Investigate"],["T‑99107","Broker mismatch","Resolve"],["T‑99088","Venue correction","Confirm"]].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-3">{r[0]}</td><td className="py-2 px-3">{r[1]}</td><td className="py-2 px-3">{r[2]}</td></tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Order Latency Over Time</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb"><line x1="0" y1="100" x2="320" y2="100" /></g>
              <polyline fill="none" stroke="#6C8CF5" strokeWidth="2" points="10,95 40,90 70,85 100,92 130,88 160,82 190,86 220,80 250,78 280,84 310,82" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Avg milliseconds from order to fill (intraday).</div>
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


