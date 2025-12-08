"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { AgentTile } from "@/components/AgentTile";
import * as React from "react";

export default function UWApprovalPricingPage() {
  const config = NICHES["insurance-dashboard"];
  const { agents } = useAgents();
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agents</h2>
          <p className="text-xs text-muted">Recommend premium ranges, highlight binding blockers, and generate approval memos.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <Kpi label="Pending Approvals" value="23" hint="awaiting decision" colorHex="#004AAD" />
        <Kpi label="Avg Suggested Δ" value="+4.1%" hint="vs current" colorHex="#6D28D9" />
        <Kpi label="Blocks to Bind" value="7" hint="missing requirements" colorHex="#EF4444" />
        <Kpi label="Bound Today" value="12" hint="approved" colorHex="#008C74" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-3">
          <CardTitle className="text-primary">Pending Approvals</CardTitle>
          <div className="mt-2 overflow-x-auto rounded-md border border-line/60">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">ID</th>
                  <th className="py-2 px-3">Risk</th>
                  <th className="py-2 px-3">Suggested Premium</th>
                  <th className="py-2 px-3">Change vs. Current</th>
                  <th className="py-2 px-3">Reason</th>
                  <th className="py-2 px-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["UWR-884", "Medium", "$1,240", "+$140", "Risk score increased"],
                  ["UWR-885", "High", "$2,780", "+$320", "New exposure added"],
                  ["UWR-886", "Low", "$640", "-$60", "Discount applied"],
                ].map((r, i) => (
                  <tr key={i} className="border-t border-line/60">
                    <td className="py-2 px-3">{r[0]}</td>
                    <td className="py-2 px-3">{r[1]}</td>
                    <td className="py-2 px-3">{r[2]}</td>
                    <td className="py-2 px-3">{r[3]}</td>
                    <td className="py-2 px-3">{r[4]}</td>
                    <td className="py-2 px-3">
                      <div className="flex gap-2">
                        <button className="rounded-md bg-primary text-white px-3 py-1 text-xs">Approve</button>
                        <button className="rounded-md border border-line px-3 py-1 text-xs">Request Changes</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-[11px] text-muted px-3 py-1">Review and bind pricing decisions</div>
          </div>
        </Card>

        <Card>
          <CardTitle className="text-primary">Premium vs Risk</CardTitle>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3">
            <svg width="100%" height="100%" viewBox="0 0 300 120" aria-hidden="true">
              <polyline fill="none" stroke="#10B981" strokeWidth="3" points="0,100 50,90 100,80 150,65 200,50 250,40 300,30" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Expected premium curve by composite risk score</div>
        </Card>

        <Card>
          <CardTitle className="text-primary">Binding Checklist</CardTitle>
          <ul className="mt-2 text-sm space-y-2">
            {["Signed application", "Payment method on file", "All mandatory docs", "Manager approval (if High risk)"].map((t, i) => (
              <li key={i} className="flex items-center gap-2 leading-6">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-neutral-700">{t}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardTitle className="text-primary">Risk Mix</CardTitle>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3 flex items-center justify-center">
            <svg width="70%" height="70%" viewBox="0 0 200 200" aria-hidden="true">
              <circle cx="100" cy="100" r="70" fill="#93C5FD" />
              {/* Low risk */}
              <path d="M100,30 A70,70 0 0,1 170,100 L100,100Z" fill="#A7F3D0" />
              {/* Medium risk */}
              <path d="M100,100 L170,100 A70,70 0 0,1 130,165 Z" fill="#FDE68A" />
              {/* High risk is remaining base slice */}
            </svg>
          </div>
          <div className="text-[11px] text-muted">High • Low • Medium (pending approvals)</div>
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

