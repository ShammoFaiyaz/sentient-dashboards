"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { AgentTile } from "@/components/AgentTile";
import * as React from "react";

export default function UWRiskAssessmentPage() {
  const config = NICHES["insurance-dashboard"];
  const { agents } = useAgents();
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agents</h2>
          <p className="text-xs text-muted">Explain key drivers, simulate scenarios, and recommend next steps for each application.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <Kpi label="High‑Risk Apps" value="9" hint="score ≥ 80" colorHex="#EF4444" />
        <Kpi label="Avg Score" value="72" hint="assessed today" colorHex="#6D28D9" />
        <Kpi label="Docs Missing" value="18%" hint="submissions" colorHex="#F4B23E" />
        <Kpi label="Approvals Today" value="14" hint="bound" colorHex="#008C74" />
      </div>
      {/* AI Application Risk Assessment */}
      <div className="mt-6 mb-6 rounded-2xl p-4 bg-white shadow-md border border-line/60">
        <div className="text-sm font-semibold text-primary">AI Application Risk Assessment</div>
        <div className="text-xs text-muted mb-3">
          Model risk score with factor contributions and next‑best actions for underwriting decisions.
          Inputs include applicant history, coverage selections, broker data, incident metadata, and document completeness.
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:items-stretch">
          {/* Donut gauge */}
          <div className="rounded-md border border-line/60 p-3 h-full">
            <div className="text-xs text-muted mb-2">Overall Risk Score</div>
            <div className="relative mx-auto h-36 w-36">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(rgb(var(--color-error)) 0deg, rgb(var(--color-error)) 260deg, rgb(var(--color-line)) 260deg)",
                }}
                aria-hidden
              />
              <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border border-line/60" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-2xl font-semibold text-error">72</div>
                <div className="text-[10px] text-muted">out of 100</div>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-muted text-center">Higher indicates elevated likelihood of loss, mispricing, or dispute.</div>
          </div>
          {/* Factor contributions */}
          <div className="rounded-md border border-line/60 p-3 h-full">
            <div className="text-xs text-muted mb-2">Top Factor Contributions</div>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Prior losses (24 months)", weight: 0.26 },
                { label: "Incomplete documentation", weight: 0.21 },
                { label: "Risky geography exposure", weight: 0.18 },
                { label: "Broker anomaly vs book", weight: 0.14 },
                { label: "Coverage gaps / endorsements", weight: 0.11 },
              ].map((f) => (
                <li key={f.label}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-ink/90">{f.label}</span>
                    <span className="text-muted">{Math.round(f.weight * 100)}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
                    <div className="h-full bg-primary" style={{ width: `${Math.max(6, f.weight * 100)}%` }} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-2 text-[11px] text-muted">Bar length ~ contribution magnitude (normalized, additive).</div>
          </div>
          {/* Decision & actions */}
          <div className="rounded-md border border-line/60 p-3 h-full flex flex-col">
            <div className="text-xs text-muted mb-2">Decision & Next Best Actions</div>
            <div className="rounded-md border border-error/40 bg-error/5 px-3 py-2 text-sm">
              <div className="font-semibold text-error">Underwriter attention recommended</div>
              <div className="text-[11px] text-muted">Confidence: 82% • Risk of mispricing if bound without review: ↑</div>
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                "Request missing docs and verify declarations",
                "Run identity/fraud checks on claimant & broker",
                "Compare premium vs portfolio benchmarks",
                "Simulate premium with higher deductible / co‑pay",
              ].map((t, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded-md bg-primary text-white px-3 py-2 text-sm">Run Assessment</button>
              <button className="rounded-md border border-line px-3 py-2 text-sm">Explain Factors</button>
              <button className="rounded-md border border-line px-3 py-2 text-sm">What‑if: Adjust Terms</button>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-muted mt-auto">
              <div className="rounded-md border border-line/60 p-2">
                <div className="mb-1 text-ink/80">Current</div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
                  <div className="h-full bg-error" style={{ width: "72%" }} />
                </div>
              </div>
              <div className="rounded-md border border-line/60 p-2">
                <div className="mb-1 text-ink/80">After doc completion (est.)</div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
                  <div className="h-full bg-success" style={{ width: "48%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card>
          <CardTitle className="text-primary">Risk Score Distribution</CardTitle>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3">
            <svg width="100%" height="100%" viewBox="0 0 300 100" aria-hidden="true">
              <g fill="#93C5FD">
                <rect x="10" y="60" width="15" height="30" rx="3" />
                <rect x="30" y="50" width="15" height="40" rx="3" />
                <rect x="50" y="40" width="15" height="50" rx="3" />
                <rect x="70" y="30" width="15" height="60" rx="3" />
                <rect x="90" y="25" width="15" height="65" rx="3" />
                <rect x="110" y="20" width="15" height="70" rx="3" />
                <rect x="130" y="25" width="15" height="65" rx="3" />
                <rect x="150" y="35" width="15" height="55" rx="3" />
                <rect x="170" y="50" width="15" height="40" rx="3" />
                <rect x="190" y="60" width="15" height="30" rx="3" />
              </g>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Histogram of scores (lower is safer)</div>
        </Card>

        <Card>
          <CardTitle className="text-primary">Top Risk Drivers</CardTitle>
          <ul className="mt-2 text-sm space-y-2">
            {["Exposure to hail", "Prior claims", "Credit band", "High vehicle repair cost"].map((t, i) => (
              <li key={i} className="flex items-center gap-2 leading-6">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-neutral-700">{t}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardTitle className="text-primary">Scenario Comparison</CardTitle>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3">
            <svg width="100%" height="100%" viewBox="0 0 300 100" aria-hidden="true">
              <polyline fill="none" stroke="#0EA5E9" strokeWidth="3" points="0,80 50,70 100,60 150,52 200,45 250,42 300,40" />
              <polyline fill="none" stroke="#10B981" strokeWidth="3" points="0,85 50,78 100,70 150,63 200,58 250,52 300,50" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Baseline vs. mitigated risk (deductible increase)</div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card>
          <CardTitle className="text-primary">Industry Exposure</CardTitle>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3 flex items-center justify-center">
            <svg width="70%" height="70%" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="70" fill="#93C5FD" />
              <path d="M100,30 A70,70 0 0,1 170,100 L100,100Z" fill="#FDE68A" />
              <path d="M100,100 L170,100 A70,70 0 0,1 130,165 Z" fill="#A7F3D0" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Auto • Property • Injury mix (portfolio)</div>
        </Card>

        <Card className="md:col-span-2">
          <CardTitle className="text-primary">Recommendations</CardTitle>
          <ul className="mt-2 text-sm space-y-2">
            {[
              "Increase deductible for high-risk segments",
              "Require inspection for properties in hail/flood zones",
              "Apply surcharge for limited driving history",
              "Offer discount for telematics enrollment",
            ].map((t, i) => (
              <li key={i} className="flex items-center gap-2 leading-6">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-neutral-700">{t}</span>
              </li>
            ))}
          </ul>
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

