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

export default function HospitalityServicesRequestsPage() {
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
            <p className="text-xs text-muted">Request Assistant Agent — places and tracks your service requests.</p>
          </div>
          <a href="/hospitality-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)}
        </div>
      </section>

      {/* KPI Cards */}
      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Active Requests" value="2" hint="awaiting completion" colorHex="#004AAD" />
        <Kpi label="Completed Today" value="5" hint="auto‑logged" colorHex="#008C74" />
        <Kpi label="Avg Response Time" value="12 min" hint="last 24h" colorHex="#6D28D9" />
      </div>

      {/* Request list */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Request List</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Request</th>
                <th className="py-2 px-3">Time</th>
                <th className="py-2 px-3">Department</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Extra towels", "Today 09:05", "Housekeeping", "In progress"],
                ["Wake‑up call (06:30)", "Today 08:50", "Front Desk", "Scheduled"],
                ["Dinner reservation", "Yesterday 16:10", "Concierge", "Confirmed"],
              ].map((r, i) => (
                <tr key={i} className="border-t border-line/60">{r.map((c, j) => <td key={j} className="py-2 px-3">{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Most requested + Status distribution */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Most Requested Services (30 Days)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[60, 54, 42, 36, 28, 20].map((h, i) => <div key={i} className="w-8 rounded-md bg-primary/70" style={{ height: `${h}%` }} />)}
          </div>
          <div className="text-[11px] text-muted">Top categories by request volume.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Request Status Distribution</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 grid place-items-center">
            <svg viewBox="0 0 120 120" className="h-32 w-32">
              <circle cx="60" cy="60" r="40" fill="#e5e7eb" />
              <path d="M60 60 L60 20 A40 40 0 0 1 88 34 Z" fill="#3B82F6" />{/* New */}
              <path d="M60 60 L88 34 A40 40 0 0 1 92 80 Z" fill="#F59E0B" />{/* In progress */}
              <path d="M60 60 L92 80 A40 40 0 0 1 60 100 Z" fill="#10B981" />{/* Completed */}
              <path d="M60 60 L60 100 A40 40 0 0 1 60 20 Z" fill="#EF4444" />{/* Cancelled */}
            </svg>
          </div>
          <div className="text-[11px] text-muted">New • in progress • completed • cancelled</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Pending Department Follow‑ups</div>
          <ul className="space-y-2">
            {["Housekeeping to confirm hypoallergenic pillows", "Kitchen to note vegetarian breakfast", "Spa to share available slots"].map((t)=>(
              <li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-ink">{t}</span></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Feedback summary */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Service Feedback Summary</div>
        <ul className="space-y-2">
          {["Response time improved vs last stay", "Staff friendliness scored 4.8/5", "Transport wait time increased on weekends"].map((t)=>(
            <li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-ink">{t}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Extra detailed sections (6)
export function ServicesRequestsExtraSections() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">AI Request Suggestions</div>
        <ul className="space-y-2 text-sm">
          {["Schedule coffee delivery at 07:00", "Pre‑book spa at 19:30 (quiet hours)", "Towel refresh at 21:00"].map((t)=>(
            <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Department SLA Trend</div>
        <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
          <svg viewBox="0 0 320 120" className="w-full h-full">
            <g stroke="#e5e7eb">{[20,40,60,80,100].map((y,i)=>(<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g>
            <g stroke="#cbd5e1"><line x1="30" y1="10" x2="30" y2="110" /><line x1="30" y1="110" x2="300" y2="110" /></g>
            <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="30,90 60,86 90,80 120,82 150,76 180,72 210,70 240,66 270,64 300,60" />
          </svg>
        </div>
        <div className="text-[11px] text-muted">Average minutes to first response by day.</div>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Frequent Requests</div>
        <table className="w-full text-left text-sm">
          <thead><tr className="text-muted"><th className="py-2 px-2">Request</th><th className="py-2 px-2">Avg SLA</th></tr></thead>
          <tbody>
            {[
              ["Extra pillows", "9 min"],
              ["Iron / board", "7 min"],
              ["Wake‑up call", "1 min"],
            ].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-2">{r[0]}</td><td className="py-2 px-2">{r[1]}</td></tr>))}
          </tbody>
        </table>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Queue Health</div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Housekeeping</div><div className="text-xl font-semibold text-primary">Good</div></div>
          <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Kitchen</div><div className="text-xl font-semibold text-primary">Delay</div></div>
          <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Transport</div><div className="text-xl font-semibold text-primary">Good</div></div>
          <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Front Desk</div><div className="text-xl font-semibold text-primary">Busy</div></div>
        </div>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Preferred Time Windows</div>
        <div className="mt-2 h-44 border border-line/60 rounded-md p-3 grid grid-cols-12 gap-1">
          {Array.from({length:24}).map((_,i)=>(
            <div key={i} className="h-5 rounded" style={{background:`rgba(16,185,129,${i%5/5+0.2})`}} />
          ))}
        </div>
        <div className="text-[11px] text-muted">Heuristic slots based on past behavior.</div>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Escalation Rules (Preview)</div>
        <ul className="space-y-2 text-sm">
          {["Kitchen > 15m → ping supervisor", "Transport delay > 10m → offer ride‑share voucher", "Housekeeping no response > 12m → auto‑reassign"].map((t)=>(
            <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
