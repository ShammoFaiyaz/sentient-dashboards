"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

type Appt = { doctor: string; patient: string; time: string; dept: string; status: string };

export default function HealthcareScheduling() {
  const { agents } = useAgents();
  const config = NICHES["healthcare-dashboard"];
  const featured = agentsForNicheAndRole("healthcare-dashboard", agents, {
    suRole: "admin",
  }).slice(0, 3);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Appt | null>(null);
  const rows: Appt[] = [
    { doctor: "Dr. Rivera", patient: "T. Nguyen", time: "09:00", dept: "Dermatology", status: "Scheduled" },
    { doctor: "Dr. Patel", patient: "S. Lee", time: "09:30", dept: "Radiology", status: "Rescheduled" },
    { doctor: "Dr. Chen", patient: "A. Omar", time: "10:00", dept: "Family Med", status: "Cancelled" },
    { doctor: "Dr. Khan", patient: "L. Zhao", time: "10:30", dept: "Cardiology", status: "Scheduled" },
  ];
  function openEdit(a: Appt) {
    setSelected(a);
    setEditOpen(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted mt-0.5">Scheduling Ops Agent — balances load, reduces no‑shows, and optimizes templates.</p>
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
        <Kpi label="Total Appointments Today" value="1,842" hint="across facilities" colorHex="#004AAD" />
        <Kpi label="Cancelled Today" value="76" hint="system‑wide" colorHex="#EF4444" />
        <Kpi label="Rescheduled This Week" value="214" hint="rolling 7d" colorHex="#6D28D9" />
        <Kpi label="Peak Hour Utilization" value="86%" hint="today" colorHex="#008C74" />
      </div>

      {/* Scheduling table */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Scheduling</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Doctor</th>
                <th className="py-2 px-3">Patient</th>
                <th className="py-2 px-3">Time</th>
                <th className="py-2 px-3">Department</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-line/60 cursor-pointer hover:bg-primary/5" onClick={() => openEdit(r)}>
                  <td className="py-2 px-3">{r.doctor}</td>
                  <td className="py-2 px-3">{r.patient}</td>
                  <td className="py-2 px-3">{r.time}</td>
                  <td className="py-2 px-3">{r.dept}</td>
                  <td className="py-2 px-3">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hourly load analysis + alerts */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Hourly Load Analysis</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="0" y1="100" x2="320" y2="100" />
              </g>
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="10,95 30,90 50,80 70,70 90,60 110,55 130,52 150,50 170,52 190,58 210,66 230,76 250,84 270,90 290,92" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Peak appointment hours for the current week.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Scheduling Alerts</div>
          <ul className="space-y-2">
            {[
              "Dermatology overbooked tomorrow between 10 AM – 1 PM.",
              "Radiology understaffed on Friday.",
              "High cancellation rate for telehealth visits.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Additional admin scheduling controls */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Templates & Blocks</div>
          <ul className="space-y-2 text-sm">
            {["15‑min Clinic", "30‑min New Visit", "Telehealth AM Block", "Surgery Afternoon"].map((t) => (
              <li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2">
                <span className="text-ink">{t}</span>
                <button className="rounded-md border border-line px-2 py-0.5 text-xs">Edit</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">No‑Show / Overbooking Rules</div>
          <div className="space-y-2 text-sm">
            {["Auto overbook +1 at peak", "SMS reminder 24h", "Auto cancel after 10 min late"].map((r) => (
              <div key={r} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2">
                <span className="text-ink">{r}</span>
                <button className="rounded-md border border-line px-2 py-0.5 text-xs">Toggle</button>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Doctor Availability Heatmap</div>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(35)].map((_, i) => (
              <div key={i} className={`${i % 6 === 0 ? "bg-green-500/70" : i % 4 === 0 ? "bg-yellow-400/70" : "bg-primary/20"} h-6 rounded`} />
            ))}
          </div>
          <div className="text-[11px] text-muted mt-2">Green = high availability, Yellow = moderate.</div>
        </div>
      </div>

      {/* Edit modal */}
      {editOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={() => setEditOpen(false)}>
          <div className="w-full max-w-lg rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 text-sm font-semibold text-primary">Edit Appointment</div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm">
                <div className="mb-1 text-muted">Doctor</div>
                <input defaultValue={selected.doctor} className="w-full rounded-md border border-line px-3 py-2 text-sm" />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Patient</div>
                <input defaultValue={selected.patient} className="w-full rounded-md border border-line px-3 py-2 text-sm" />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Time</div>
                <input defaultValue={selected.time} className="w-full rounded-md border border-line px-3 py-2 text-sm" />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Department</div>
                <input defaultValue={selected.dept} className="w-full rounded-md border border-line px-3 py-2 text-sm" />
              </label>
              <label className="text-sm md:col-span-2">
                <div className="mb-1 text-muted">Status</div>
                <select defaultValue={selected.status} className="w-full rounded-md border border-line px-3 py-2 text-sm">
                  <option>Scheduled</option>
                  <option>Rescheduled</option>
                  <option>Cancelled</option>
                  <option>Completed</option>
                </select>
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

