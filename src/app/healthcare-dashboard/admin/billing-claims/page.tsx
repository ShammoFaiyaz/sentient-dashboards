"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

type Claim = { id: string; patient: string; amount: string; status: string; date: string };

export default function HealthcareBillingClaims() {
  const { agents } = useAgents();
  const config = NICHES["healthcare-dashboard"];
  const featured = agentsForNicheAndRole("healthcare-dashboard", agents, {
    suRole: "admin",
  }).slice(0, 3);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Claim | null>(null);
  const rows: Claim[] = [
    { id: "CLM‑90231", patient: "T. Nguyen", amount: "$1,240", status: "Pending", date: "2025‑01‑24" },
    { id: "CLM‑89714", patient: "S. Lee", amount: "$620", status: "Approved", date: "2025‑01‑20" },
    { id: "CLM‑89102", patient: "A. Rivera", amount: "$2,180", status: "Rejected", date: "2025‑01‑18" },
  ];
  function openEdit(c: Claim) {
    setSelected(c);
    setEditOpen(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted mt-0.5">Revenue Ops Agent — spots denials, billing errors, and payer rule conflicts; suggests fixes.</p>
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
        <Kpi label="Outstanding Claims" value="$182k" hint="awaiting decision" colorHex="#004AAD" />
        <Kpi label="Approved Claims" value="412" hint="last 30 days" colorHex="#008C74" />
        <Kpi label="Rejected Claims" value="38" hint="last 30 days" colorHex="#EF4444" />
        <Kpi label="Billing Errors Detected" value="12" hint="last 7 days" colorHex="#6D28D9" />
      </div>

      {/* Claims table */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Claims</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Claim ID</th>
                <th className="py-2 px-3">Patient</th>
                <th className="py-2 px-3">Amount</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-line/60 cursor-pointer hover:bg-primary/5" onClick={() => openEdit(r)}>
                  <td className="py-2 px-3">{r.id}</td>
                  <td className="py-2 px-3">{r.patient}</td>
                  <td className="py-2 px-3">{r.amount}</td>
                  <td className="py-2 px-3">{r.status}</td>
                  <td className="py-2 px-3">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Claims volume + alerts */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Weekly Claims Volume</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="0" y1="100" x2="320" y2="100" />
              </g>
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="10,95 60,90 110,84 160,86 210,80 260,74 310,70" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Claims submitted weekly across all facilities.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Billing Alerts</div>
          <ul className="space-y-2">
            {[
              "3 claims require documentation correction.",
              "Insurance provider API delays reported.",
              "High rejection rate for radiology claims this week.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Additional billing admin sections */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Denial Reasons Breakdown</div>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g fill="#93C5FD">
                <rect x="20" y="60" width="50" height="40" />
                <rect x="90" y="40" width="50" height="60" />
                <rect x="160" y="30" width="50" height="70" />
                <rect x="230" y="50" width="50" height="50" />
              </g>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Coding, Eligibility, Documentation, Other.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Payer Rules</div>
          <ul className="space-y-2 text-sm">
            {["Auto pre‑check eligibility", "Flag out‑of‑network", "Enforce prior auth"].map((t) => (
              <li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2">
                <span className="text-ink">{t}</span>
                <button className="rounded-md border border-line px-2 py-0.5 text-xs">Toggle</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Escalation Queue</div>
          <ul className="space-y-2 text-sm">
            {[
              "CLM‑90231 — Missing documents",
              "CLM‑89102 — Appeal review",
              "CLM‑87655 — Payer dispute",
            ].map((t) => (
              <li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2">
                <span className="text-ink">{t}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Open</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Edit modal */}
      {editOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={() => setEditOpen(false)}>
          <div className="w-full max-w-lg rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 text-sm font-semibold text-primary">Edit Claim</div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm">
                <div className="mb-1 text-muted">Claim ID</div>
                <input defaultValue={selected.id} className="w-full rounded-md border border-line px-3 py-2 text-sm" />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Patient</div>
                <input defaultValue={selected.patient} className="w-full rounded-md border border-line px-3 py-2 text-sm" />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Amount</div>
                <input defaultValue={selected.amount} className="w-full rounded-md border border-line px-3 py-2 text-sm" />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Status</div>
                <select defaultValue={selected.status} className="w-full rounded-md border border-line px-3 py-2 text-sm">
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </label>
              <label className="text-sm md:col-span-2">
                <div className="mb-1 text-muted">Date</div>
                <input defaultValue={selected.date} className="w-full rounded-md border border-line px-3 py-2 text-sm" />
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

