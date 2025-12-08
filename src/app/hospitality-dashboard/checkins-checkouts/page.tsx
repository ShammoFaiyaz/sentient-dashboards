"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function CheckinsCheckoutsPage() {
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
            <p className="text-xs text-muted">Front Desk Agent — streamlines arrivals and departures workflows.</p>
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
        <Kpi label="Due Check-ins" value="132" hint="remaining today" colorHex="#004AAD" />
        <Kpi label="Due Check-outs" value="118" hint="remaining today" colorHex="#008C74" />
        <Kpi label="Late Check-outs" value="9" hint="approved" colorHex="#6D28D9" />
      </div>

      {/* Arrivals & departures table */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Today’s Arrivals & Departures</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Guest</th>
                <th className="py-2 px-3">Time</th>
                <th className="py-2 px-3">Room</th>
                <th className="py-2 px-3">Type</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Alex Rivera", "09:10", "1203", "Check‑in", "Waiting"],
                ["Rina Patel", "10:00", "1602", "Check‑out", "In progress"],
                ["Sam Lee", "10:30", "803", "Check‑in", "Completed"],
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

      {/* Peak times + tasks */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Peak Check-in Times</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[10, 18, 26, 34, 40, 32, 22, 14].map((h, i) => (
              <div key={i} className="w-10 rounded-md bg-primary/70" style={{ height: `${Math.max(8, h)}%` }} />
            ))}
          </div>
          <div className="text-[11px] text-muted">Expected arrivals by hour (sample distribution).</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Tasks Requiring Attention</div>
          <ul className="space-y-2">
            {[
              "2 rooms pending housekeeping clearance.",
              "3 guests waiting for early check‑in approval.",
              "IDs required for late arrivals past midnight.",
            ].map((t) => (
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
          <div className="text-sm font-semibold text-ink mb-2">Counter Staffing Plan</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full"><g stroke="#e5e7eb">{[20,40,60,80,100].map((y,i)=>(<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g><g stroke="#cbd5e1"><line x1="30" y1="10" x2="30" y2="110" /><line x1="30" y1="110" x2="300" y2="110" /></g><polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="30,92 60,90 90,88 120,82 150,76 180,74 210,70 240,68 270,66 300,64" /></svg>
          </div>
          <div className="text-[11px] text-muted">Recommended agents per hour.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Late Checkout Queue</div>
          <ul className="space-y-2 text-sm">
            {["Rooms 1602, 1708, 1211 approved", "Room 814 pending payment", "Room 1305 denied (capacity)"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">ID Verification Status</div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Pending</div><div className="text-xl font-semibold text-primary">3</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Verified</div><div className="text-xl font-semibold text-primary">112</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Flagged</div><div className="text-xl font-semibold text-primary">1</div></div>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Keycard Encoder Health</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 grid grid-cols-6 gap-1">
            {Array.from({length:18}).map((_,i)=>(<div key={i} className="h-6 rounded" style={{background:`rgba(59,130,246,${0.2 + (i%6)/10})`}} />))}
          </div>
          <div className="text-[11px] text-muted">Green intensity indicates lower error rates.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Airport Transfer Board</div>
          <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-2">Guest</th><th className="py-2 px-2">Pickup</th><th className="py-2 px-2">Status</th></tr></thead><tbody>{[["R. Patel","19:00","Confirmed"],["A. Rivera","18:10","Scheduled"],["S. Lee","—","N/A"]].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-2">{r[0]}</td><td className="py-2 px-2">{r[1]}</td><td className="py-2 px-2">{r[2]}</td></tr>))}</tbody></table>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Desk Supplies Checklist</div>
          <ul className="space-y-2 text-sm">{["Key sleeves","Welcome letters","City maps","Blank receipts"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>))}</ul>
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

