"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function InsuranceAdminComplianceReportingPage() {
  const { agents } = useAgents();
  const config = NICHES["insurance-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured agents */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium text-primary">Featured Agents</h2>
          <p className="text-xs text-muted">
            Generate regulatory reports, maintain audit trails, and track policy adherence with assistant support.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <Kpi label="Violations" value="3" hint="open" colorHex="#EF4444" />
        <Kpi label="Reviews Pending" value="12" hint="awaiting" colorHex="#6D28D9" />
        <Kpi label="Reports Due" value="4" hint="next 30d" colorHex="#004AAD" />
        <Kpi label="Overdue" value="1" hint="needs action" colorHex="#F4B23E" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {/* Compliance status */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Compliance Status</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              {/* donut track */}
              <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="24" />
              {/* segment: Issues 38% */}
              <g transform="rotate(-90 100 100)">
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  fill="none"
                  stroke="#93C5FD"
                  strokeWidth="24"
                  strokeDasharray="143 235"
                  strokeLinecap="butt"
                />
                {/* segment: Passing 62% (starts where previous ended) */}
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  fill="none"
                  stroke="#A7F3D0"
                  strokeWidth="24"
                  strokeDasharray="233 145"
                  strokeDashoffset="-143"
                  strokeLinecap="butt"
                />
              </g>
              {/* donut hole */}
              <circle cx="100" cy="100" r="40" fill="white" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Proportion of controls that are passing vs. attention required.</div>
          <ul className="mt-3 space-y-1">
            {["Passing controls", "Issues to triage"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Audit log */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Audit Log</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Timestamp</th>
                  <th className="py-2 px-3">User</th>
                  <th className="py-2 px-3">Event</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["2025‑01‑26 10:12", "System", "Exported quarterly claims report"],
                  ["2025‑01‑25 18:44", "A. Rivera", "Updated retention policy"],
                  ["2025‑01‑22 09:10", "S. Lee", "Added claim notes attachment"],
                ].map((r, i) => (
                  <tr key={i} className="border-t border-line/60">
                    {r.map((c, j) => (
                      <td key={j} className="py-2 px-3">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-[11px] text-muted">Immutable log of key changes and exports.</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {/* Policies checklist */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Policy Checklist</div>
          <ul className="space-y-2">
            {[
              "Data retention within 7 years",
              "Encryption for documents at rest",
              "Access reviews completed monthly",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Report builder */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Report Builder</div>
          <form className="grid gap-3 md:grid-cols-3">
            <label className="text-sm">
              <div className="mb-1 text-muted">Report</div>
              <select className="w-full rounded-md border border-line px-3 py-2 text-sm">
                <option>Quarterly claims summary</option>
                <option>Closed claims analysis</option>
                <option>SLA breach register</option>
              </select>
            </label>
            <label className="text-sm">
              <div className="mb-1 text-muted">From</div>
              <input className="w-full rounded-md border border-line px-3 py-2 text-sm" placeholder="2024‑10‑01" />
            </label>
            <label className="text-sm">
              <div className="mb-1 text-muted">To</div>
              <input className="w-full rounded-md border border-line px-3 py-2 text-sm" placeholder="2024‑12‑31" />
            </label>
            <div className="md:col-span-3 flex justify-end">
              <button type="button" className="rounded-md bg-primary text-white px-4 py-2 text-sm">Export CSV</button>
            </div>
          </form>
          <div className="mt-2 text-[11px] text-muted">Build and export reports for regulators and leadership.</div>
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

