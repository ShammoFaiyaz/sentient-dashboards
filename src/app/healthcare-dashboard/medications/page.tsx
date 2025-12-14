"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useNicheRole } from "@/components/niche/useNicheRole";
import { agentsForNicheAndRole, nicheRoleToSuRole } from "@/components/niche/roleMap";
import { usePathname } from "next/navigation";

export default function MedicationsPage() {
  const { agents } = useAgents();
  const config = NICHES["healthcare-dashboard"];
  const roleLabel = useNicheRole("healthcare-dashboard", "Doctor");
  const pathname = usePathname() || "";
  const suRole = nicheRoleToSuRole("healthcare-dashboard", roleLabel);
  const effectiveRole = pathname.includes("/healthcare-dashboard/admin/") ? "admin" : suRole;
  const featured = agentsForNicheAndRole("healthcare-dashboard", agents, {
    suRole: effectiveRole,
  }).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted mt-0.5">
              Medication Guidance Agent — explains dosing, side effects, and interaction risks; drafts refill notes and reminders.
            </p>
          </div>
          <a
            href="/healthcare-dashboard/agents"
            className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
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
        <Kpi label="Active Medications" value="4" hint="current" colorHex="#004AAD" />
        <Kpi label="Recently Added" value="1" hint="last 30 days" colorHex="#008C74" />
        <Kpi label="Refill Needed" value="1" hint="due soon" colorHex="#F4B23E" />
        <Kpi label="Missed Doses" value="2" hint="this week" colorHex="#6D28D9" />
      </div>

      {/* Medication table */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Medication List</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Medication</th>
                <th className="py-2 px-3">Dosage</th>
                <th className="py-2 px-3">Frequency</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Lisinopril", "10 mg", "Daily", "Active"],
                ["Metformin", "500 mg", "Twice daily", "Active"],
                ["Albuterol", "2 puffs", "As needed", "Active"],
                ["Atorvastatin", "20 mg", "Nightly", "Refill Needed"],
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

      {/* Chart + alerts */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Most Used Medications</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g fill="#93C5FD">
                <rect x="20" y="40" width="60" height="60" />
                <rect x="110" y="55" width="60" height="45" />
                <rect x="200" y="50" width="60" height="50" />
              </g>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Based on the last 6 months of prescriptions.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Medication Alerts</div>
          <ul className="space-y-2">
            {[
              "1 medication has a low supply.",
              "2 meds have potential interactions — review with doctor.",
              "Next refill due in 3 days.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Additional dummy sections */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {/* Adherence trend */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Adherence Trend (Last 30 Days)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="0" y1="100" x2="320" y2="100" />
                <line x1="0" y1="60" x2="320" y2="60" />
                <line x1="0" y1="20" x2="320" y2="20" />
              </g>
              <polyline
                fill="none"
                stroke="#2563EB"
                strokeWidth="2"
                points="10,95 30,92 50,85 70,78 90,82 110,74 130,66 150,70 170,62 190,58 210,54 230,50 250,46 270,48 290,44"
              />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Daily percent of scheduled doses taken.</div>
        </div>

        {/* Interaction checker (dummy) */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Interaction Checker</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Medication A</th>
                  <th className="py-2 px-3">Medication B</th>
                  <th className="py-2 px-3">Severity</th>
                  <th className="py-2 px-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Lisinopril", "Spironolactone", "Moderate", "Monitor potassium"],
                  ["Metformin", "Contrast dye", "High", "Hold 48h around imaging"],
                  ["Atorvastatin", "Clarithromycin", "High", "Avoid combination"],
                ].map((r, i) => (
                  <tr key={i} className="border-t border-line/60">
                    <td className="py-2 px-3">{r[0]}</td>
                    <td className="py-2 px-3">{r[1]}</td>
                    <td className="py-2 px-3">
                      <span
                        className={
                          r[2] === "High"
                            ? "rounded-full bg-destructive/10 px-2 py-0.5 text-xs text-destructive"
                            : r[2] === "Moderate"
                            ? "rounded-full bg-warning/10 px-2 py-0.5 text-xs text-warning"
                            : "rounded-full bg-success/10 px-2 py-0.5 text-xs text-success"
                        }
                      >
                        {r[2]}
                      </span>
                    </td>
                    <td className="py-2 px-3">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {/* Dosage timing heatmap (dummy) */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Dosage Timing Heatmap (Last 7 Days)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[65, 90, 80, 75, 95, 70, 85].map((h, i) => (
              <div key={i} className="w-10 rounded-md bg-primary/70" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="text-[11px] text-muted">Higher bars indicate more on-time doses per day.</div>
        </div>

        {/* Schedule & reminders */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Schedule & Reminders</div>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Lisinopril", time: "08:00 AM" },
              { name: "Metformin", time: "08:00 AM & 08:00 PM" },
              { name: "Atorvastatin", time: "10:00 PM" },
            ].map((m) => (
              <li key={m.name} className="flex items-center justify-between rounded-lg border border-line/60 px-3 py-2">
                <span className="text-ink">{m.name}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{m.time}</span>
              </li>
            ))}
          </ul>
          <div className="text-[11px] text-muted mt-2">Reminder times are illustrative only.</div>
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


