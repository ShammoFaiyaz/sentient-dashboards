"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function CustomerFileClaimPage() {
  const { agents } = useAgents();
  const config = NICHES["insurance-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured agents */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agents</h2>
          <p className="text-xs text-muted">
            File claims faster—assistants help capture details, validate documents, and track progress.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <Kpi label="Open Claims" value="2" hint="in progress" colorHex="#004AAD" />
        <Kpi label="Avg First Response" value="45m" hint="last 30d" colorHex="#008C74" />
        <Kpi label="Approval Rate" value="78%" hint="rolling 90d" colorHex="#6D28D9" />
        <Kpi label="Docs Pending" value="1" hint="action required" colorHex="#EF4444" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Form */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Open New Claim</div>
          <form className="grid gap-3 md:grid-cols-2">
            <label className="text-sm">
              <div className="mb-1 text-muted">Policy #</div>
              <input className="w-full rounded-md border border-line px-3 py-2 text-sm" placeholder="e.g., POL‑123456" />
            </label>
            <label className="text-sm">
              <div className="mb-1 text-muted">Claim Type</div>
              <select className="w-full rounded-md border border-line px-3 py-2 text-sm">
                <option>Auto</option>
                <option>Property</option>
                <option>Travel</option>
              </select>
            </label>
            <label className="text-sm md:col-span-2">
              <div className="mb-1 text-muted">Incident Description</div>
              <textarea className="w-full rounded-md border border-line px-3 py-2 text-sm" rows={4} placeholder="What happened?" />
            </label>
            <div className="md:col-span-2 flex items-center justify-between">
              <div className="text-[11px] text-muted">Provide accurate details to speed up resolution.</div>
              <button type="button" className="rounded-md bg-primary text-white px-4 py-2 text-sm">
                Submit claim
              </button>
            </div>
          </form>
        </div>

        {/* Checklist */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Checklist</div>
          <ul className="space-y-2">
            {[
              "Photos of incident location and damage",
              "Police report or reference number (if applicable)",
              "Repair estimates or invoices",
              "Travel tickets/itinerary for travel claims",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 text-[11px] text-muted">Uploading these improves first‑pass approvals.</div>
        </div>
      </div>
      
      {/* More sections */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Upload Documents</div>
          <div className="border border-dashed border-line/60 rounded-md p-6 text-center text-sm text-muted">
            Drag and drop photos, PDFs, or emails here<br />or
            <button className="ml-2 rounded-md border border-line px-3 py-1 text-xs">Browse</button>
          </div>
          <div className="mt-2 text-[11px] text-muted">Accepted formats: JPG, PNG, PDF (max 10MB each).</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Estimated Timeline</div>
          <ul className="space-y-2">
            {[
              "Day 0–1: Intake & triage",
              "Day 2–5: Review documents",
              "Day 6–10: Assessment & decision",
              "Day 11+: Payout (if approved)",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Tips for Faster Approval</div>
          <ul className="space-y-2">
            {[
              "Submit clear photos of any damage from multiple angles.",
              "Provide reference numbers for any official reports.",
              "Include repair estimates to speed up assessments.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Preferred Providers</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Location</th>
                  <th className="py-2 px-3">Contact</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["RapidFix Auto", "Repair shop", "Downtown", "(555) 010‑1200"],
                  ["HomeCare Pros", "Property repair", "Eastside", "(555) 010‑4433"],
                  ["FlySafe Desk", "Travel support", "Online", "support@flysafe.example"],
                ].map((r, i) => (
                  <tr key={i} className="border-t border-line/60">
                    {r.map((c, j) => (
                      <td key={j} className="py-2 px-3">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-[11px] text-muted">Using network providers can simplify approvals.</div>
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
