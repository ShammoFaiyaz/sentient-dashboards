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

export default function HospitalityLoyaltyRewardsPage() {
  const { agents } = useAgents();
  const config = NICHES["hospitality-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Loyalty Insights Agent — maximizes point earnings and redemption value.</p>
          </div>
          <a href="/hospitality-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)}
        </div>
      </section>

      {/* KPI Cards */}
      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Points Balance" value="18,450" hint="as of today" colorHex="#004AAD" />
        <Kpi label="Tier Status" value="Gold" hint="valid through 2025" colorHex="#F59E0B" />
        <Kpi label="Points Earned This Year" value="9,820" hint="YTD" colorHex="#008C74" />
      </div>

      {/* Points activity table */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Points Activity</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Activity</th>
                <th className="py-2 px-3">Points</th>
                <th className="py-2 px-3">Balance</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Feb 02, 2025", "Stay — Downtown Suites (3 nights)", "+2,400", "18,450"],
                ["Jan 21, 2025", "Dining partner — Bistro 24", "+180", "16,050"],
                ["Jan 12, 2025", "Redemption — Room upgrade", "−2,000", "15,870"],
              ].map((r, i) => (
                <tr key={i} className="border-t border-line/60">{r.map((c, j) => <td key={j} className="py-2 px-3">{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Earn sources + Accumulation trend */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Points Earn Sources</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 grid place-items-center">
            <svg viewBox="0 0 120 120" className="h-32 w-32">
              <circle cx="60" cy="60" r="40" fill="#e5e7eb" />
              <path d="M60 60 L60 20 A40 40 0 0 1 96 48 Z" fill="#3B82F6" />{/* Stays */}
              <path d="M60 60 L96 48 A40 40 0 0 1 82 96 Z" fill="#22C55E" />{/* Dining */}
              <path d="M60 60 L82 96 A40 40 0 0 1 60 100 Z" fill="#F59E0B" />{/* Partners */}
              <path d="M60 60 L60 100 A40 40 0 0 1 60 20 Z" fill="#8B5CF6" />{/* Promotions */}
            </svg>
          </div>
          <div className="text-[11px] text-muted">Stays • dining • partners • promotions</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Points Accumulation Trend</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">{[20,40,60,80,100].map((y,i)=>(<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g>
              <g stroke="#cbd5e1"><line x1="30" y1="10" x2="30" y2="110" /><line x1="30" y1="110" x2="300" y2="110" /></g>
              <polyline fill="none" stroke="#10B981" strokeWidth="2" points="30,104 60,100 90,96 120,90 150,86 180,82 210,76 240,70 270,66 300,60" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Cumulative points earned month‑over‑month.</div>
        </div>
      </div>

      {/* Tier benefits + Bonus opportunities */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Tier Benefits Summary</div>
          <ul className="space-y-2">
            {["Room upgrade on availability", "Late checkout priority", "Welcome amenity each stay"].map((t)=>(
              <li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-ink">{t}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Bonus Opportunities</div>
          <ul className="space-y-2">
            {["Double points on weekday stays (Feb)", "Partner dining: +3x points", "Redeem 20% fewer points for lounge access"].map((t)=>(
              <li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-ink">{t}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Extra detailed sections (6)
export function LoyaltyRewardsExtraSections() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Redemption Value Tips</div>
        <ul className="space-y-2 text-sm">
          {["Use points for off‑peak upgrades (1.9¢/pt)", "Avoid breakfast redemption (<0.8¢/pt)", "Bundle lounge + late checkout"].map((t)=>(
            <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Partner Earn Potential</div>
        <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
          {[64,46,30,24].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}} />))}
        </div>
        <div className="text-[11px] text-muted">Airlines • dining • retail • transport</div>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Upcoming Tier Milestones</div>
        <table className="w-full text-left text-sm">
          <thead><tr className="text-muted"><th className="py-2 px-2">Goal</th><th className="py-2 px-2">Remaining</th></tr></thead>
          <tbody>
            {[
              ["Platinum status", "5 nights"],
              ["Suite night awards", "12k points"],
            ].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-2">{r[0]}</td><td className="py-2 px-2">{r[1]}</td></tr>))}
          </tbody>
        </table>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Promotions Calendar</div>
        <div className="mt-2 h-44 border border-line/60 rounded-md p-3 grid grid-cols-7 gap-1">
          {Array.from({length:28}).map((_,i)=>(
            <div key={i} className="h-6 rounded" style={{background:`rgba(59,130,246,${(i%7)/10+0.2})`}} />
          ))}
        </div>
        <div className="text-[11px] text-muted">Shaded days indicate active 2x‑points promos.</div>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Burn Strategy (AI)</div>
        <ul className="space-y-2 text-sm">
          {["Redeem 12k points for room upgrade (Fri)", "Use 8k for airport transfer voucher", "Save remaining for Platinum push"].map((t)=>(
            <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Account Security</div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between"><span className="text-muted">MFA</span><span className="text-ink">Enabled</span></div>
          <div className="flex items-center justify-between"><span className="text-muted">New device last 30d</span><span className="text-ink">0</span></div>
          <div className="flex items-center justify-between"><span className="text-muted">Password age</span><span className="text-ink">54 days</span></div>
        </div>
      </div>
    </div>
  );
}
