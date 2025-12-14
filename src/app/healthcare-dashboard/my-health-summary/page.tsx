"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useNicheRole } from "@/components/niche/useNicheRole";
import { agentsForNicheAndRole, nicheRoleToSuRole } from "@/components/niche/roleMap";
import { usePathname } from "next/navigation";

export default function MyHealthSummaryPage() {
  const { agents } = useAgents();
  const config = NICHES["healthcare-dashboard"];
  const roleLabel = useNicheRole("healthcare-dashboard", "Patient");
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
              Personal Health Agent — summarises trends from vitals, labs, and activity; suggests goals and next best steps.
            </p>
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
        <Kpi label="Today's Health Score" value="78" hint="vs yesterday +2" colorHex="#004AAD" />
        <Kpi label="Last Checkup Date" value="2024‑12‑18" hint="GP visit" colorHex="#008C74" />
        <Kpi label="Upcoming Appointment" value="2025‑02‑01" hint="Family Medicine" colorHex="#6D28D9" />
        <Kpi label="Active Care Plans" value="2" hint="monitoring" colorHex="#F4B23E" />
      </div>

      {/* Symptom trend */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Monthly Symptom Trend</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="0" y1="100" x2="320" y2="100" />
              </g>
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="10,95 30,92 50,90 70,86 90,88 110,80 130,76 150,74 170,70 190,72 210,66 230,62 250,64 270,60 290,57" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Self-reported symptoms over the last 30 days.</div>
        </div>

        {/* Conditions table */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Medical Conditions</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Condition</th>
                  <th className="py-2 px-3">Severity</th>
                  <th className="py-2 px-3">Last Updated</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Hypertension", "Moderate", "2025‑01‑20", "Monitor"],
                  ["Diabetes", "Mild", "2025‑01‑18", "Stable"],
                  ["Asthma", "Mild", "2025‑01‑10", "Stable"],
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

      {/* Reports, body, vitals, scans, blood metrics — one full-width row */}
      <div className="mt-6 grid gap-6 md:[grid-template-columns:repeat(5,minmax(233px,1fr))]">
        {/* Reports & Records Status */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm min-w-[220px]">
          <div className="text-sm font-semibold text-primary mb-2">Reports & Records Status</div>
          <ul className="space-y-3">
            {[
              { label: "Lab reports reviewed", pct: 82 },
              { label: "Imaging reports available", pct: 64 },
              { label: "Immunizations recorded", pct: 92 },
              { label: "Medication reconciliation complete", pct: 75 },
            ].map((r) => (
              <li key={r.label} className="text-sm">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-ink">{r.label}</span>
                  <span className="text-muted">{r.pct}%</span>
                </div>
                <ProgressBar percent={r.pct} />
              </li>
            ))}
          </ul>
          <div className="text-[11px] text-muted mt-2">Percent of documents available/reconciled in your record.</div>
        </div>

        {/* Latest Body Metrics */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm min-w-[220px]">
          <div className="text-sm font-semibold text-primary mb-2">Body Metrics</div>
          <div className="space-y-3 text-sm">
            <div>
              <div className="flex items-center justify-between">
                <div className="text-ink">BMI</div>
                <div className="text-ink font-medium">23.8</div>
              </div>
              <ProgressBar percent={60} />
              <div className="mt-1 text-[11px] text-muted">Normal range 18.5–24.9</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-line/60 p-3">
                <div className="text-[11px] text-muted">Weight</div>
                <div className="text-ink font-semibold">72 kg</div>
              </div>
              <div className="rounded-lg border border-line/60 p-3">
                <div className="text-[11px] text-muted">Height</div>
                <div className="text-ink font-semibold">175 cm</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vitals Snapshot */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm min-w-[220px]">
          <div className="text-sm font-semibold text-primary mb-2">Vitals Snapshot</div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-ink">Resting Heart Rate</span>
              <span className="font-medium text-ink">62 bpm</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink">BP (last reading)</span>
              <span className="font-medium text-ink">122/78</span>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-ink">Daily Steps</span>
                <span className="text-muted">7,200 / 10,000</span>
              </div>
              <ProgressBar percent={72} />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-ink">Sleep (last night)</span>
                <span className="text-muted">6.8 h / 8 h</span>
              </div>
              <ProgressBar percent={85} />
            </div>
          </div>
          <div className="text-[11px] text-muted mt-2">Recent vitals and wellness goals (dummy).</div>
        </div>

        {/* DEXA Scan Summary */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm min-w-[220px]">
          <div className="text-sm font-semibold text-primary mb-2">DEXA Scan Summary</div>
          <div className="text-sm text-ink">T‑score: <span className="font-medium">−1.4</span> (osteopenia)</div>
          <div className="mt-3 h-16 rounded-md border border-line/60 p-2">
            <svg viewBox="0 0 320 60" className="w-full h-full">
              <rect x="10" y="25" width="300" height="10" rx="5" fill="url(#dexaGrad)" />
              <defs>
                <linearGradient id="dexaGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="45%" stopColor="#F59E0B" />
                  <stop offset="75%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3, 4].map((i) => (
                <text key={i} x={10 + i * (300 / 4)} y="20" fontSize="10" fill="#6b7280" textAnchor="middle">
                  {i === 0 ? "−3" : i === 1 ? "−2" : i === 2 ? "−1" : i === 3 ? "0" : "+1"}
                </text>
              ))}
              <g transform={`translate(${10 + ((-1.4 + 3) / 4) * 300}, 30)`}>
                <circle r="6" fill="#111827" />
                <circle r="3" fill="#ffffff" />
              </g>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Improvement since last year: +1.2% BMD.</div>
        </div>

        {/* Key Blood Metrics */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm min-w-[220px]">
          <div className="text-sm font-semibold text-primary mb-2">Key Blood Metrics</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Test</th>
                  <th className="py-2 px-3">Value</th>
                  <th className="py-2 px-3">Reference</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { t: "HbA1c", v: "6.1%", ref: "< 5.7%", status: "Borderline" },
                  { t: "Hemoglobin", v: "13.6 g/dL", ref: "12–16 g/dL", status: "Normal" },
                  { t: "LDL", v: "118 mg/dL", ref: "< 100 mg/dL", status: "Slightly High" },
                  { t: "HDL", v: "52 mg/dL", ref: "> 40 mg/dL", status: "Good" },
                  { t: "Triglycerides", v: "140 mg/dL", ref: "< 150 mg/dL", status: "Normal" },
                ].map((r) => (
                  <tr key={r.t} className="border-t border-line/60">
                    <td className="py-2 px-3">{r.t}</td>
                    <td className="py-2 px-3">{r.v}</td>
                    <td className="py-2 px-3">{r.ref}</td>
                    <td className="py-2 px-3">
                      <span
                        className={
                          r.status === "Good" || r.status === "Normal"
                            ? "rounded-full bg-success/10 px-2 py-0.5 text-xs text-success"
                            : r.status === "Borderline"
                            ? "rounded-full bg-warning/10 px-2 py-0.5 text-xs text-warning"
                            : "rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                        }
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-[11px] text-muted mt-2">Values are illustrative only and not for clinical decisions.</div>
        </div>
      </div>
      </div>

      {/* Things to monitor */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Things to Monitor</div>
        <ul className="space-y-2">
          {[
            "Track blood pressure daily for the next week.",
            "Update allergy information.",
            "3 lifestyle recommendations pending review.",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProgressBar({ percent }: { percent: number }) {
  const pct = Math.max(0, Math.min(100, percent));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10">
      <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
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


