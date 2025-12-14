"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { AgentTile } from "@/components/AgentTile";
import * as React from "react";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

export default function UWNewApplicationPage() {
  const config = NICHES["insurance-dashboard"];
  const { agents } = useAgents();
  const featured = agentsForNicheAndRole("insurance-dashboard", agents, { roleLabel: "Underwriter" }).slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agents</h2>
          <p className="text-xs text-muted">Pre-fill intake, check eligibility, and compute preliminary risk score.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <Kpi label="Submissions Today" value="18" hint="as of now" colorHex="#004AAD" />
        <Kpi label="Avg Risk Score" value="58" hint="today" colorHex="#6D28D9" />
        <Kpi label="Eligibility Pass %" value="72%" hint="auto checks" colorHex="#008C74" />
        <Kpi label="Docs Missing" value="22%" hint="of drafts" colorHex="#EF4444" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardTitle className="text-primary">New Application</CardTitle>
          <div className="mt-2 grid gap-3 md:grid-cols-2">
            <label className="text-sm">Applicant Name
              <input className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm" placeholder="e.g., Jane Doe" />
            </label>
            <label className="text-sm">Product
              <select className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm">
                <option>Auto</option>
                <option>Property</option>
                <option>Injury</option>
              </select>
            </label>
            <label className="text-sm">Coverage Amount
              <input className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm" placeholder="$250,000" />
            </label>
            <label className="text-sm">Broker
              <input className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm" placeholder="Broker name" />
            </label>
            <label className="text-sm md:col-span-2">Notes
              <textarea className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm" rows={4} placeholder="Additional information..." />
            </label>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <button className="rounded-md border border-line px-3 py-2 text-sm">Save Draft</button>
            <button className="rounded-md bg-primary text-white px-4 py-2 text-sm">Submit</button>
          </div>
        </Card>

        <Card>
          <CardTitle className="text-primary">Risk Factors</CardTitle>
          <ul className="mt-2 text-sm space-y-2">
            {[
              "Prior claims in last 3 years",
              "High exposure area (hail/flood/wildfire)",
              "New driver or limited history",
              "Missing inspections",
            ].map((t, i) => (
              <li key={i} className="flex items-center gap-2 leading-6">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-neutral-700">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 h-32 border border-line/60 rounded-md p-3">
            <svg width="100%" height="100%" viewBox="0 0 300 100" aria-hidden="true">
              <polyline fill="none" stroke="#0EA5E9" strokeWidth="3" points="0,90 40,70 80,60 120,45 160,40 200,35 240,32 280,30" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Preliminary risk score trend (auto-computed)</div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card>
          <CardTitle className="text-primary">Eligibility Checklist</CardTitle>
          <ul className="mt-2 text-sm space-y-2">
            {[
              "No major losses in last 5 years",
              "Assets within coverage thresholds",
              "Compliant use and storage",
              "Valid inspections available",
            ].map((t, i) => (
              <li key={i} className="flex items-center gap-2 leading-6">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-neutral-700">{t}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="md:col-span-2">
          <CardTitle className="text-primary">Submission Quality</CardTitle>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3">
            <svg width="100%" height="100%" viewBox="0 0 320 120" aria-hidden="true">
              <g stroke="#e5e7eb"><line x1="0" y1="100" x2="320" y2="100" /></g>
              <g fill="#93C5FD">
                <rect x="20" y="70" width="40" height="30" rx="4" />
                <rect x="90" y="65" width="40" height="35" rx="4" />
                <rect x="160" y="50" width="40" height="50" rx="4" />
                <rect x="230" y="35" width="40" height="65" rx="4" />
              </g>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Completeness score by required sections</div>
        </Card>
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

