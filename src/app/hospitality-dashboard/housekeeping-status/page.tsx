"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function HousekeepingStatusPage() {
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
            <p className="text-xs text-muted">Housekeeping Insights Agent — surfaces cleaning progress, priorities, and issues.</p>
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
        <Kpi label="Rooms Clean" value="320" hint="ready to assign" colorHex="#004AAD" />
        <Kpi label="Cleaning in Progress" value="72" hint="across all floors" colorHex="#6D28D9" />
        <Kpi label="Maintenance Issues" value="14" hint="reported today" colorHex="#EF4444" />
      </div>

      {/* Room status table */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Room Status</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Room #</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Assigned Staff</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1203", "Clean", "M. Khan"],
                ["1602", "In progress", "J. Perez"],
                ["803", "Maintenance", "Team B"],
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

      {/* Cleaning time per floor + alerts */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Cleaning Time per Floor</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[22, 26, 28, 24, 20, 18].map((h, i) => (
              <div key={i} className="w-10 rounded-md bg-primary/70" style={{ height: `${Math.max(10, h)}%` }} />
            ))}
          </div>
          <div className="text-[11px] text-muted">Average minutes per room cleaned, by floor.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Housekeeping Alerts</div>
          <ul className="space-y-2">
            {[
              "Linen shortage reported on floor 12.",
              "Deep cleaning scheduled for rooms 1801–1810 tomorrow.",
              "Two maintenance follow‑ups pending after 6 PM.",
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
          <div className="text-sm font-semibold text-ink mb-2">Supply Levels</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Linen</div><div className="text-xl font-semibold text-primary">Adequate</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Amenities</div><div className="text-xl font-semibold text-primary">Low</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Cleaning agents</div><div className="text-xl font-semibold text-primary">Good</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Towels</div><div className="text-xl font-semibold text-primary">Reorder</div></div>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Turnover Forecast</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full"><g stroke="#e5e7eb">{[20,40,60,80,100].map((y,i)=>(<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g><g stroke="#cbd5e1"><line x1="30" y1="10" x2="30" y2="110" /><line x1="30" y1="110" x2="300" y2="110" /></g><polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="30,96 60,90 90,92 120,86 150,80 180,78 210,74 240,70 270,68 300,66" /></svg>
          </div>
          <div className="text-[11px] text-muted">Predicted rooms to clean per hour.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Priority Rooms</div>
          <ul className="space-y-2 text-sm">{["1602 (crib required)", "903 (allergy protocol)", "1804 (VIP arrival 17:00)"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>))}</ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Team Allocation</div>
          <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-2">Team</th><th className="py-2 px-2">Floors</th></tr></thead><tbody>{[["A","1–8"],["B","9–16"],["C","17–20"]].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-2">{r[0]}</td><td className="py-2 px-2">{r[1]}</td></tr>))}</tbody></table>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Incident Log (Today)</div>
          <ul className="space-y-2 text-sm">{["Broken lamp (603)","AC issue (1811)","Stain on carpet (1115)"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>))}</ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Quality Score Trend</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full"><g stroke="#e5e7eb">{[20,40,60,80,100].map((y,i)=>(<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g><g stroke="#cbd5e1"><line x1="30" y1="10" x2="30" y2="110" /><line x1="30" y1="110" x2="300" y2="110" /></g><polyline fill="none" stroke="#10B981" strokeWidth="2" points="30,88 60,90 90,86 120,84 150,82 180,80 210,78 240,76 270,74 300,72" /></svg>
          </div>
          <div className="text-[11px] text-muted">Average inspection quality score.</div>
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


