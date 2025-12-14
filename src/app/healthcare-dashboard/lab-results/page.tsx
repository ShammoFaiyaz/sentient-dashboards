"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useNicheRole } from "@/components/niche/useNicheRole";
import { agentsForNicheAndRole, nicheRoleToSuRole } from "@/components/niche/roleMap";
import { usePathname } from "next/navigation";

export default function PatientLabResultsPage() {
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
              Results Explainer Agent — groups abnormal findings, drafts patient‑friendly notes, and flags urgent follow‑ups.
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
        <Kpi label="Pending Results" value="2" hint="awaiting" colorHex="#004AAD" />
        <Kpi label="Completed This Month" value="6" hint="so far" colorHex="#008C74" />
        <Kpi label="Critical Alerts" value="1" hint="needs attention" colorHex="#EF4444" />
        <Kpi label="Avg TAT" value="24h" hint="turnaround time" colorHex="#6D28D9" />
      </div>

      {/* Results table */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Lab Results</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Test</th>
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Result</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["CBC", "2025‑01‑24", "Normal", "Completed", "—"],
                ["CMP", "2025‑01‑25", "Abnormal", "Completed", "Elevated ALT"],
                ["A1C", "2025‑01‑10", "6.8%", "Completed", "Slightly high"],
                ["Troponin", "2025‑01‑26", "—", "Pending", "—"],
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
          <div className="text-sm font-semibold text-primary mb-2">Lab Trends</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="0" y1="100" x2="320" y2="100" />
              </g>
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="10,95 40,90 70,85 100,88 130,82 160,78 190,80 220,74 250,70 280,68 310,65" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Trends for key biomarkers over the last 60 days.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Important Alerts</div>
          <ul className="space-y-2">
            {[
              "1 critical lab result needs attention immediately.",
              "Blood sugar trending higher than usual.",
              "Next lab test scheduled in 10 days.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* High-tech report: additional sections */}
      <div className="mt-4 grid gap-4 md:grid-cols-4">
        {/* Abnormal Markers Spotlight */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Abnormal Markers Spotlight</div>
          <ul className="space-y-2 text-sm">
            {[
              { name: "ALT (Liver)", value: "62 U/L", ref: "7–56", status: "High" },
              { name: "A1C", value: "6.8%", ref: "< 5.7%", status: "High" },
              { name: "CRP", value: "8.2 mg/L", ref: "< 5 mg/L", status: "Elevated" },
            ].map((m) => (
              <li key={m.name} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2">
                <div>
                  <div className="font-medium text-ink">{m.name}</div>
                  <div className="text-[11px] text-muted">Ref {m.ref}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-ink">{m.value}</span>
                  <span className={m.status === "High" || m.status === "Elevated" ? "rounded-full bg-destructive/10 px-2 py-0.5 text-xs text-destructive" : "rounded-full bg-success/10 px-2 py-0.5 text-xs text-success"}>{m.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Out-of-Range Heatmap */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Out‑of‑Range Heatmap</div>
          <div className="grid grid-cols-6 gap-2">
            {[...Array(24)].map((_, i) => (
              <div key={i} className={`h-6 rounded ${i % 5 === 0 ? "bg-red-400/60" : i % 3 === 0 ? "bg-yellow-400/60" : "bg-green-400/60"}`} />
            ))}
          </div>
          <div className="text-[11px] text-muted mt-2">Green = normal, Yellow = borderline, Red = out‑of‑range.</div>
        </div>

        {/* Specimen Tracking */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Specimen Tracking</div>
          <ul className="space-y-2 text-sm">
            {[
              { id: "CMP‑2025‑01‑25", status: "Processed" },
              { id: "CBC‑2025‑01‑24", status: "Completed" },
              { id: "Troponin‑2025‑01‑26", status: "Pending" },
            ].map((s) => (
              <li key={s.id} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2">
                <span className="text-ink">{s.id}</span>
                <span
                  className={
                    s.status === "Pending"
                      ? "rounded-full bg-warning/10 px-2 py-0.5 text-xs text-warning"
                      : s.status === "Completed"
                      ? "rounded-full bg-success/10 px-2 py-0.5 text-xs text-success"
                      : "rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                  }
                >
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Department Turnaround */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Department Turnaround</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[
              { label: "Chem", val: 80 },
              { label: "Heme", val: 65 },
              { label: "Micro", val: 50 },
              { label: "Path", val: 70 },
            ].map((b) => (
              <div key={b.label} className="w-12">
                <div className="w-full rounded-md bg-primary/70" style={{ height: `${b.val}%` }} />
                <div className="mt-1 text-center text-[10px] text-muted">{b.label}</div>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-muted">% within target turnaround time (dummy).</div>
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


