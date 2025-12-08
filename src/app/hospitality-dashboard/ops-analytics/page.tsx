"use client";

import * as React from "react";
import { useNicheRole } from "@/components/niche/useNicheRole";
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

export default function OpsAnalyticsPage() {
  const role = useNicheRole("hospitality-dashboard", "Ops Manager");
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
            <p className="text-xs text-muted">Operations Insights Agent — highlights bottlenecks, capacity, and forecasted risks.</p>
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
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Occupancy" value="82%" hint="today" colorHex="#004AAD" />
        <Kpi label="ADR" value="$168" hint="avg daily rate" colorHex="#008C74" />
        <Kpi label="RevPAR" value="$138" hint="revenue per available room" colorHex="#6D28D9" />
        <Kpi label="Issues Open" value="14" hint="maintenance + service" colorHex="#EF4444" />
      </div>

      {/* Charts row 1 */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Housekeeping Efficiency</div>
          <div className="h-48 rounded-md border border-line/60 p-3">
            <svg viewBox="0 0 320 160" className="w-full h-full">
              <g stroke="#e5e7eb">
                {[30, 60, 90, 120].map((y, i) => (<line key={i} x1="30" y1={y} x2="300" y2={y} />))}
              </g>
              <g stroke="#cbd5e1"><line x1="30" y1="20" x2="30" y2="140" /><line x1="30" y1="140" x2="300" y2="140" /></g>
              <polyline fill="none" stroke="#10B981" strokeWidth="2" points="30,136 60,128 90,124 120,118 150,112 180,108 210,100 240,94 270,90 300,86" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Avg minutes per room (lower is better).</div>
        </div>
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Maintenance Tickets</div>
          <div className="h-48 rounded-md border border-line/60 p-3 flex items-end gap-3">
            {[16, 12, 10, 8, 6].map((h, i) => (<div key={i} className="w-10 rounded-md bg-primary/70" style={{ height: `${h * 5}%` }} />))}
          </div>
          <div className="text-[11px] text-muted">Open tickets by category (demo).</div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Staffing vs Demand</div>
          <div className="h-48 rounded-md border border-line/60 p-3">
            <svg viewBox="0 0 320 160" className="w-full h-full">
              <g stroke="#e5e7eb">{[30, 60, 90, 120].map((y, i) => (<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g>
              <g stroke="#cbd5e1"><line x1="30" y1="20" x2="30" y2="140" /><line x1="30" y1="140" x2="300" y2="140" /></g>
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="30,120 60,112 90,108 120,100 150,96 180,92 210,88 240,84 270,82 300,78" />
              <polyline fill="none" stroke="#EF4444" strokeWidth="2" points="30,126 60,118 90,112 120,106 150,100 180,96 210,94 240,92 270,90 300,88" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Blue: staffing • Red: expected demand.</div>
        </div>
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Energy Usage Trend</div>
          <div className="h-48 rounded-md border border-line/60 p-3">
            <svg viewBox="0 0 320 160" className="w-full h-full">
              <g stroke="#e5e7eb">{[30, 60, 90, 120].map((y, i) => (<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g>
              <g stroke="#cbd5e1"><line x1="30" y1="20" x2="30" y2="140" /><line x1="30" y1="140" x2="300" y2="140" /></g>
              <polyline fill="none" stroke="#F59E0B" strokeWidth="2" points="30,110 60,114 90,108 120,100 150,98 180,104 210,96 240,92 270,88 300,90" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Daily kWh consumption (sample).</div>
        </div>
      </div>

      {/* Analytics row 3 */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Occupancy Forecast (14d)</div>
          <div className="h-44 rounded-md border border-line/60 p-3 flex items-end gap-2">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="w-6 rounded-md bg-primary/70" style={{ height: `${40 + (i % 7) * 6}%` }} />
            ))}
          </div>
          <div className="text-[11px] text-muted">Projected occupancy by day.</div>
        </div>
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">ADR vs RevPAR</div>
          <div className="h-44 rounded-md border border-line/60 p-3">
            <svg viewBox="0 0 320 140" className="w-full h-full">
              <polyline fill="none" stroke="#10B981" strokeWidth="2" points="30,110 60,102 90,96 120,92 150,90 180,86 210,82 240,78 270,76 300,72" />
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="30,118 60,112 90,106 120,100 150,96 180,92 210,88 240,84 270,80 300,76" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Green: ADR • Blue: RevPAR.</div>
        </div>
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Bottleneck Heatmap</div>
          <div className="h-44 rounded-md border border-line/60 p-3 grid grid-cols-8 gap-1">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="h-5 rounded" style={{ background: `rgba(239,68,68,${0.15 + (i % 8) / 12})` }} />
            ))}
          </div>
          <div className="text-[11px] text-muted">Red intensity indicates riskier steps.</div>
        </div>
      </div>
    </div>
  );
}


