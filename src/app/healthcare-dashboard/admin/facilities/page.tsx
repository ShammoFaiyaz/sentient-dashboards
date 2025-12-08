"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

type Facility = { name: string; type: string; status: string; capacity: string; alerts: string };

export default function HealthcareFacilities() {
  const { agents } = useAgents();
  const config = NICHES["healthcare-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Facility | null>(null);
  const rows: Facility[] = [
    { name: "City General", type: "Hospital", status: "Open", capacity: "420 beds", alerts: "—" },
    { name: "West Clinic", type: "Clinic", status: "Open", capacity: "28 beds", alerts: "Low supplies" },
    { name: "Precision Labs", type: "Lab", status: "Open", capacity: "—", alerts: "Calibration due" },
    { name: "Radiology Hub", type: "Radiology", status: "Limited", capacity: "—", alerts: "Machine downtime" },
  ];
  function openEdit(f: Facility) {
    setSelected(f);
    setEditOpen(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted mt-0.5">Facility Ops Agent — monitors capacity, equipment uptime, and incident trends.</p>
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
        <Kpi label="Total Facilities" value="24" hint="all locations" colorHex="#004AAD" />
        <Kpi label="Departments" value="96" hint="active" colorHex="#008C74" />
        <Kpi label="Available Beds" value="128" hint="system‑wide" colorHex="#6D28D9" />
        <Kpi label="Equipment Alerts" value="7" hint="requires action" colorHex="#F4B23E" />
      </div>

      {/* Facilities table */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Facilities</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Facility Name</th>
                <th className="py-2 px-3">Type</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Capacity</th>
                <th className="py-2 px-3">Alerts</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-line/60 cursor-pointer hover:bg-primary/5" onClick={() => openEdit(r)}>
                  <td className="py-2 px-3">{r.name}</td>
                  <td className="py-2 px-3">{r.type}</td>
                  <td className="py-2 px-3">{r.status}</td>
                  <td className="py-2 px-3">{r.capacity}</td>
                  <td className="py-2 px-3">{r.alerts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Equipment utilization + admin controls */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Equipment Utilization Rate</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g fill="#93C5FD">
                <rect x="20" y="40" width="40" height="60" />
                <rect x="80" y="55" width="40" height="45" />
                <rect x="140" y="30" width="40" height="70" />
                <rect x="200" y="65" width="40" height="35" />
                <rect x="260" y="50" width="40" height="50" />
              </g>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Utilization of key diagnostic equipment this week.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Maintenance Alerts</div>
          <ul className="space-y-2">
            {[
              "MRI machine requires calibration.",
              "Ventilator maintenance overdue by 3 days.",
              "Blood analyzer showing inconsistent readings.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Additional admin control sections */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Resource Allocation</div>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[70, 55, 80, 60].map((h, i) => (
              <div key={i} className="w-12 rounded-md bg-primary/70" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="text-[11px] text-muted">Beds, ICU, OR, ER allocation (dummy).</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Maintenance Scheduler</div>
          <ul className="space-y-2 text-sm">
            {["CT Scanner — 2025‑02‑02", "Autoclave — 2025‑02‑05", "Lab Analyzer — 2025‑02‑08"].map((t) => (
              <li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2">
                <span className="text-ink">{t}</span>
                <button className="rounded-md border border-line px-2 py-0.5 text-xs">Reschedule</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Incident Log</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Time</th>
                  <th className="py-2 px-3">Facility</th>
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["09:12", "Radiology Hub", "Downtime", "Investigating"],
                  ["11:40", "West Clinic", "Supply", "Resolved"],
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
            <div className="mb-2 text-sm font-semibold text-primary">Edit Facility</div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm">
                <div className="mb-1 text-muted">Name</div>
                <input defaultValue={selected.name} className="w-full rounded-md border border-line px-3 py-2 text-sm" />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Type</div>
                <input defaultValue={selected.type} className="w-full rounded-md border border-line px-3 py-2 text-sm" />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Status</div>
                <select defaultValue={selected.status} className="w-full rounded-md border border-line px-3 py-2 text-sm">
                  <option>Open</option>
                  <option>Limited</option>
                  <option>Closed</option>
                </select>
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Capacity</div>
                <input defaultValue={selected.capacity} className="w-full rounded-md border border-line px-3 py-2 text-sm" />
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

