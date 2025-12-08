"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function ReservationsPage() {
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
            <p className="text-xs text-muted">Front Desk Agent — assists with reservation lookups and confirmations.</p>
          </div>
          <a href="/hospitality-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Upcoming Reservations" value="86" hint="next 7 days" colorHex="#004AAD" />
        <Kpi label="Cancellations Today" value="5" hint="updated hourly" colorHex="#EF4444" />
        <Kpi label="Pending Confirmations" value="12" hint="action needed" colorHex="#6D28D9" />
      </div>

      {/* Reservation list */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Reservation List</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Guest</th>
                <th className="py-2 px-3">Dates</th>
                <th className="py-2 px-3">Room Type</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Alex Rivera", "Jan 28 – Jan 31", "Deluxe King", "Confirmed"],
                ["Rina Patel", "Jan 30 – Feb 02", "Suite", "Pending"],
                ["Sam Lee", "Jan 29 – Jan 30", "Standard", "Cancelled"],
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

      {/* Donut + alerts */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Reservation Sources</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="24" />
              <g transform="rotate(-90 100 100)">
                <circle cx="100" cy="100" r="60" fill="none" stroke="#60A5FA" strokeWidth="24" strokeDasharray="110 260" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#34D399" strokeWidth="24" strokeDasharray="80 290" strokeDashoffset="-110" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#FBBF24" strokeWidth="24" strokeDasharray="60 310" strokeDashoffset="-190" />
              </g>
              <circle cx="100" cy="100" r="40" fill="white" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Direct • OTA • Corporate (dummy distribution).</div>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Reservation Alerts</div>
          <ul className="space-y-2">
            {["3 late arrivals expected after 10 PM.", "2 double bookings flagged for review.", "Corporate block requires room upgrades."].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Extra detailed sections (6) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Arrival Window Heatmap</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 grid grid-cols-12 gap-1">
            {Array.from({length:60}).map((_,i)=> (<div key={i} className="h-4 rounded" style={{background:`rgba(16,185,129,${(i%12)/12+0.2})`}} />))}
          </div>
          <div className="text-[11px] text-muted">Predicted arrivals by 30‑min slot.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Overbooking Guard</div>
          <ul className="space-y-2 text-sm">
            {["Tonight: buffer 4 rooms", "High risk: 2 late flights", "VIP conflicts: none"].map((t)=>(
              <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">No‑Show Probability (Top 5)</div>
          <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-2">Resv</th><th className="py-2 px-2">Prob</th></tr></thead><tbody>{[["R‑1024","12%"],["R‑1042","11%"],["R‑1048","9%"],["R‑1053","8%"],["R‑1062","7%"]].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-2">{r[0]}</td><td className="py-2 px-2">{r[1]}</td></tr>))}</tbody></table>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Upgrade Opportunities</div>
          <ul className="space-y-2 text-sm">
            {["3 suites idle — offer to Platinum guests", "Corner rooms available after 20:00"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Special Requests Queue</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Feather‑free</div><div className="text-xl font-semibold text-primary">7</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Crib</div><div className="text-xl font-semibold text-primary">2</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Accessibility</div><div className="text-xl font-semibold text-primary">3</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Late arrival</div><div className="text-xl font-semibold text-primary">5</div></div>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Check‑in Counter Staffing</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full"><g stroke="#e5e7eb">{[20,40,60,80,100].map((y,i)=>(<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g><g stroke="#cbd5e1"><line x1="30" y1="10" x2="30" y2="110" /><line x1="30" y1="110" x2="300" y2="110" /></g><polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="30,92 60,90 90,88 120,82 150,76 180,74 210,70 240,68 270,66 300,64" /></svg>
          </div>
          <div className="text-[11px] text-muted">Recommended agents per 30‑minute interval.</div>
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
