"use client";

import * as React from "react";
import { AgentMonitor } from "@/components/monitor/AgentMonitor";

export default function HealthcareAdminMonitor() {
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <AgentMonitor kpis={{ completed: "1,340", incomplete: "92", slaMet: "97.4%", avgLatency: "1.6s" }} />

      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Agents</div>
        <div className="grid gap-3 md:grid-cols-3 mb-3">
          <label className="text-sm">
            <div className="mb-1 text-muted">Search</div>
            <input className="w-full rounded-md border border-line px-3 py-2 text-sm" placeholder="Search agents…" />
          </label>
          <label className="text-sm">
            <div className="mb-1 text-muted">Status</div>
            <select className="w-full rounded-md border border-line px-3 py-2 text-sm">
              <option>All</option>
              <option>Online</option>
              <option>Offline</option>
            </select>
          </label>
          <label className="text-sm">
            <div className="mb-1 text-muted">Role</div>
            <select className="w-full rounded-md border border-line px-3 py-2 text-sm">
              <option>All</option>
              <option>Doctor</option>
              <option>Patient</option>
              <option>Admin</option>
            </select>
          </label>
        </div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Agent Name</th>
                <th className="py-2 px-3">Role Assigned</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Uptime</th>
                <th className="py-2 px-3">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Clinical Insights Agent", "Doctor", "Online", "99.9%", "2m ago"],
                ["Lab Insights Agent", "Admin", "Paused", "96.4%", "10m ago"],
                ["Scheduling Agent", "Doctor", "Online", "98.1%", "30s ago"],
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

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Agent Usage Frequency</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g fill="#93C5FD">
                <rect x="30" y="60" width="30" height="40" />
                <rect x="90" y="50" width="30" height="50" />
                <rect x="150" y="30" width="30" height="70" />
                <rect x="210" y="70" width="30" height="30" />
                <rect x="270" y="40" width="30" height="60" />
              </g>
              {/* x-axis labels */}
              <g fill="#64748b" fontSize="10">
                <text x="45" y="115" textAnchor="middle">Clinical</text>
                <text x="105" y="115" textAnchor="middle">Lab</text>
                <text x="165" y="115" textAnchor="middle">Scheduler</text>
                <text x="225" y="115" textAnchor="middle">DocBot</text>
                <text x="285" y="115" textAnchor="middle">Helpdesk</text>
              </g>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Number of interactions per agent in the last 30 days.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Agent Alerts</div>
          <ul className="space-y-2">
            {[
              "Clinical Insights Agent exceeded expected compute time.",
              "Lab Insights Agent paused in 1 department.",
              "2 agents failed to respond within SLA.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
