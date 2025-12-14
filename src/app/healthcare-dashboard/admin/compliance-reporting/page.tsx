"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

type Report = { name: string; dept: string; status: string; due: string; submittedBy: string };

export default function HealthcareComplianceReporting() {
  const { agents } = useAgents();
  const config = NICHES["healthcare-dashboard"];
  const featured = agentsForNicheAndRole("healthcare-dashboard", agents, {
    suRole: "admin",
  }).slice(0, 3);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Report | null>(null);
  const rows: Report[] = [
    { name: "Quarterly Compliance Summary", dept: "Operations", status: "Submitted", due: "—", submittedBy: "A. Rivera" },
    { name: "Pharmacy Audit", dept: "Pharmacy", status: "In Progress", due: "2025‑02‑10", submittedBy: "—" },
    { name: "Radiology Safety Check", dept: "Radiology", status: "Overdue", due: "2025‑01‑20", submittedBy: "—" },
  ];
  function openEdit(r: Report) {
    setSelected(r);
    setEditOpen(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted mt-0.5">Compliance Oversight Agent — tracks audits, evidence, and overdue actions across departments.</p>
          </div>
          <a href="/healthcare-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            View all agents
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Pending Audits" value="5" hint="this month" colorHex="#004AAD" />
        <Kpi label="Compliance Violations" value="3" hint="open issues" colorHex="#EF4444" />
        <Kpi label="Reports Submitted" value="28" hint="last 30 days" colorHex="#008C74" />
        <Kpi label="Overdue Actions" value="4" hint="needs attention" colorHex="#6D28D9" />
      </div>

      {/* Reports table */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Reports</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Report Name</th>
                <th className="py-2 px-3">Department</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Due Date</th>
                <th className="py-2 px-3">Submitted By</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-line/60 cursor-pointer hover:bg-primary/5" onClick={() => openEdit(r)}>
                  <td className="py-2 px-3">{r.name}</td>
                  <td className="py-2 px-3">{r.dept}</td>
                  <td className="py-2 px-3">{r.status}</td>
                  <td className="py-2 px-3">{r.due}</td>
                  <td className="py-2 px-3">{r.submittedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Findings chart + alerts */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Audit Findings by Category</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g fill="#93C5FD">
                <rect x="20" y="50" width="40" height="50" />
                <rect x="80" y="30" width="40" height="70" />
                <rect x="140" y="60" width="40" height="40" />
                <rect x="200" y="45" width="40" height="55" />
                <rect x="260" y="70" width="40" height="30" />
              </g>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Compliance issues across categories in the last 90 days.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Critical Compliance Alerts</div>
          <ul className="space-y-2">
            {[
              "Pharmacy inventory discrepancy reported.",
              "Expired consumables found in emergency department.",
              "Nursing staff documentation incomplete.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Additional compliance admin sections */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Risk Heatmap</div>
          <div className="grid grid-cols-6 gap-2">
            {[...Array(24)].map((_, i) => (
              <div key={i} className={`${i % 5 === 0 ? "bg-red-500/70" : i % 3 === 0 ? "bg-yellow-400/70" : "bg-green-500/60"} h-6 rounded`} />
            ))}
          </div>
          <div className="text-[11px] text-muted mt-2">Distribution of open issues by severity.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Task Assignment</div>
          <ul className="space-y-2 text-sm">
            {[
              "Investigate narcotics audit discrepancy — Assign",
              "Close radiology overdue action — Assign",
              "Review pharmacy SOP updates — Assign",
            ].map((t) => (
              <li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2">
                <span className="text-ink">{t}</span>
                <button className="rounded-md border border-line px-2 py-0.5 text-xs">Assign</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Evidence Queue</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Item</th>
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Owner</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Disposal log", "PDF", "Pharmacy", "Pending"],
                  ["Safety training list", "CSV", "HR", "Reviewed"],
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

      {/* Edit modal */}
      {editOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={() => setEditOpen(false)}>
          <div className="w-full max-w-lg rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 text-sm font-semibold text-primary">Edit Report</div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm">
                <div className="mb-1 text-muted">Report Name</div>
                <input defaultValue={selected.name} className="w-full rounded-md border border-line px-3 py-2 text-sm" />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Department</div>
                <input defaultValue={selected.dept} className="w-full rounded-md border border-line px-3 py-2 text-sm" />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Status</div>
                <select defaultValue={selected.status} className="w-full rounded-md border border-line px-3 py-2 text-sm">
                  <option>In Progress</option>
                  <option>Submitted</option>
                  <option>Overdue</option>
                </select>
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Due Date</div>
                <input defaultValue={selected.due} className="w-full rounded-md border border-line px-3 py-2 text-sm" />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-md border border-line px-3 py-1 text-sm" onClick={() => setEditOpen(false)}>Cancel</button>
              <button className="rounded-md bg-primary text-white px-3 py-1 text-sm" onClick={() => setEditOpen(false)}>Save</button>
            </div>
          </div>
        </div>
      )}
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

