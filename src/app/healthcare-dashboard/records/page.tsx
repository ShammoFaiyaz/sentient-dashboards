"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useNicheRole } from "@/components/niche/useNicheRole";
import { nicheRoleToSuRole } from "@/components/niche/roleMap";
import { usePathname } from "next/navigation";

export default function RecordsPage() {
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
              Records Review Agent — summarises key history, medications, allergies, and prior visits before each consultation.
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
        <Kpi label="Records Reviewed Today" value="26" hint="completed reviews" colorHex="#004AAD" />
        <Kpi label="Pending Reviews" value="17" hint="awaiting doctor review" colorHex="#6D28D9" />
        <Kpi label="Incomplete Records" value="9" hint="need data entry" colorHex="#EF4444" />
        <Kpi label="Avg Turnaround Time" value="18h" hint="last 7d" colorHex="#008C74" />
      </div>

      {/* Search / filters */}
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="text-sm md:col-span-2">
            <div className="mb-1 text-muted">Search</div>
            <input className="w-full rounded-md border border-line px-3 py-2 text-sm" placeholder="Search patients or records…" />
          </label>
          <label className="text-sm">
            <div className="mb-1 text-muted">Filter</div>
            <select className="w-full rounded-md border border-line px-3 py-2 text-sm">
              <option>All</option>
              <option>Incomplete</option>
              <option>Needs review</option>
              <option>Recently updated</option>
            </select>
          </label>
        </div>
      </div>

      {/* Records table */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Patient Medical Records</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Patient</th>
                <th className="py-2 px-3">Last Visit</th>
                <th className="py-2 px-3">Primary Condition</th>
                <th className="py-2 px-3">Record Status</th>
                <th className="py-2 px-3">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Patel, R", "2025‑01‑22", "Hypertension", "Complete", "2025‑01‑22"],
                ["Lee, S", "2025‑01‑19", "Diabetes", "Needs Review", "2025‑01‑20"],
                ["Rivera, A", "2025‑01‑18", "Asthma", "Incomplete", "2025‑01‑18"],
                ["Nguyen, T", "2025‑01‑17", "Depression", "Complete", "2025‑01‑17"],
                ["Chen, L", "2025‑01‑16", "Hyperlipidemia", "Incomplete", "2025‑01‑16"],
                ["Omar, K", "2025‑01‑15", "Hypertension", "Needs Review", "2025‑01‑15"],
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

      {/* Diagnoses chart + to review */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Most Common Diagnoses</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g fill="#93C5FD">
                <rect x="20" y="40" width="40" height="60" />
                <rect x="80" y="55" width="40" height="45" />
                <rect x="140" y="50" width="40" height="50" />
                <rect x="200" y="70" width="40" height="30" />
                <rect x="260" y="65" width="40" height="35" />
              </g>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Top diagnoses across this doctor’s active patients.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Records To Review</div>
          <ul className="space-y-2">
            {[
              "5 records missing allergy information.",
              "3 patients with conflicting medication entries.",
              "2 recent admissions lack discharge summaries.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Status distribution pie chart */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Record Status Distribution</div>
        <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-40 h-40">
            <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="24" />
            <g transform="rotate(-90 100 100)">
              {/* Complete ~ 45% */}
              <circle cx="100" cy="100" r="60" fill="none" stroke="#10B981" strokeWidth="24" strokeDasharray="170 220" />
              {/* Needs Review ~ 30% */}
              <circle cx="100" cy="100" r="60" fill="none" stroke="#F59E0B" strokeWidth="24" strokeDasharray="110 280" strokeDashoffset="-170" />
              {/* Incomplete ~ 25% */}
              <circle cx="100" cy="100" r="60" fill="none" stroke="#EF4444" strokeWidth="24" strokeDasharray="95 295" strokeDashoffset="-280" />
            </g>
            <circle cx="100" cy="100" r="40" fill="white" />
          </svg>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] text-muted">
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: "#10B981" }} />Complete</div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: "#F59E0B" }} />Needs Review</div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: "#EF4444" }} />Incomplete</div>
        </div>
      </div>

      {/* Extra dummy section: AI extraction issues */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">AI Extraction Issues</div>
        <ul className="space-y-2 text-sm">
          {[
            "OCR confidence < 80% on 2 scanned PDFs — manual check required.",
            "Unsigned consent form detected for patient Lee, S.",
            "Medication list conflict: Metformin dose discrepancy (Rivera, A).",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ul>
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
