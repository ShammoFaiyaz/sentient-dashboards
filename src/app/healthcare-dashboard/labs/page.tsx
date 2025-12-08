"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useNicheRole } from "@/components/niche/useNicheRole";
import { nicheRoleToSuRole } from "@/components/niche/roleMap";
import { usePathname } from "next/navigation";

export default function LabsDiagnosticsPage() {
  const { agents } = useAgents();
  const config = NICHES["healthcare-dashboard"];
  const roleLabel = useNicheRole("healthcare-dashboard", "Doctor");
  const pathname = usePathname() || "";
  const suRole = nicheRoleToSuRole("healthcare-dashboard", roleLabel);
  const effectiveRole = pathname.includes("/healthcare-dashboard/admin/") ? "admin" : suRole;
  const base = agents.filter((a) => config.agentIds.includes(a.id) && a.role === effectiveRole);
  const featured = (base.length >= 3 ? base : [...base, ...agents.filter((a) => config.agentIds.includes(a.id) && a.role !== effectiveRole)]).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted mt-0.5">
              Lab Insights Agent — tracks turnaround times, highlights critical values, and explains reference ranges.
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
        <Kpi label="Pending Lab Results" value="17" hint="awaiting review" colorHex="#004AAD" />
        <Kpi label="Critical Alerts" value="3" hint="review immediately" colorHex="#EF4444" />
        <Kpi label="Labs Reviewed Today" value="26" hint="completed reviews" colorHex="#008C74" />
        <Kpi label="Avg Turnaround Time" value="18h" hint="last 7d" colorHex="#6D28D9" />
      </div>

      {/* Lab queue table */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Lab Results Queue</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Patient</th>
                <th className="py-2 px-3">Test Type</th>
                <th className="py-2 px-3">Priority</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Ordered</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Patel, R", "CMP", "Normal", "In progress", "2025‑01‑25"],
                ["Lee, S", "CBC", "Urgent", "Completed", "2025‑01‑24"],
                ["Rivera, A", "Troponin", "Critical", "Ordered", "2025‑01‑26"],
                ["Nguyen, T", "Lipid Panel", "Normal", "Reviewed", "2025‑01‑23"],
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

      {/* Weekly line chart + critical alerts */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Weekly Lab Requests</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="0" y1="100" x2="320" y2="100" />
              </g>
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="10,95 60,92 110,86 160,80 210,84 260,76 310,70" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Number of lab orders placed per week.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Critical Lab Alerts</div>
          <ul className="space-y-2">
            {[
              "2 patients with dangerously high potassium levels.",
              "1 troponin result flagged as critical – needs immediate review.",
              "Multiple overdue radiology reports.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Additional dummy section: Turnaround by Department */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Turnaround by Department</div>
        <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-4">
          {[24, 18, 14, 30].map((h, i) => (
            <div key={i} className="w-12 rounded-md bg-primary/70" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="text-[11px] text-muted">Avg hours to result: Chemistry • Hematology • Microbiology • Pathology.</div>
      </div>

      {/* High‑tech, agent‑style sections from Healthcare dashboard */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {/* AI Triage Suggestions */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary">AI Triage Suggestions</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">Prioritize follow‑up for 4 high‑risk hypertension patients this week.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">3 diabetic patients show rising A1C — propose medication review.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">2 post‑op patients past day 7 without vitals logs — schedule nurse outreach.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">Telehealth recommended for 6 low‑complexity visits tomorrow morning.</span>
            </li>
          </ul>
        </div>

        {/* Hospital Alerts */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary">Hospital Alerts</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">Radiology backlog +12% — consider deferring non‑urgent scans.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">Flu ward near capacity — vaccine clinic slots available Thu/Fri.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">Lab courier delay expected 4–6 PM — batch send after 6 PM.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Agent Actions Queue */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Agent Actions Queue</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Action</th>
                <th className="py-2 px-3">Patient</th>
                <th className="py-2 px-3">Reason</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Schedule BP follow‑up", "J. Gomez", "High risk — BP > 150/100", "Pending"],
                ["Request labs re‑draw", "M. Chen", "Hemolysis suspected", "Queued"],
                ["Send education pack", "S. Roy", "New CHF diagnosis", "Completed"],
              ].map((r, i) => (
                <tr key={i} className="border-t border-line/60">
                  <td className="py-2 px-3">{r[0]}</td>
                  <td className="py-2 px-3">{r[1]}</td>
                  <td className="py-2 px-3">{r[2]}</td>
                  <td className="py-2 px-3">
                    <span
                      className={
                        r[3] === "Completed"
                          ? "rounded-full bg-success/10 px-2 py-0.5 text-xs text-success"
                          : r[3] === "Queued"
                          ? "rounded-full bg-warning/10 px-2 py-0.5 text-xs text-warning"
                          : "rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                      }
                    >
                      {r[3]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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


