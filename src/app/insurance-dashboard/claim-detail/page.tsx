"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { AgentTile } from "@/components/AgentTile";

export default function ClaimDetail() {
  const config = NICHES["insurance-dashboard"];
  const { agents } = useAgents();
  const featured = agents.filter(a => config.agentIds.includes(a.id)).slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agents</h2>
          <p className="text-xs text-muted">Boost triage and automation in FNOL, adjudication, and subrogation.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map(a => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)}
        </div>
      </section>
      {/* KPI cards */}
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <Kpi label="Reserve" value="$8.5k" hint="set" colorHex="#004AAD" />
        <Kpi label="Paid" value="$1.2k" hint="to date" colorHex="#008C74" />
        <Kpi label="Outstanding" value="$7.3k" hint="remaining" colorHex="#6D28D9" />
        <Kpi label="Claim Age" value="12d" hint="since FNOL" colorHex="#F4B23E" />
      </div>
      <div className="grid gap-4 md:grid-cols-3 mt-4">
        <Card>
          <CardTitle className="text-primary">Claim Info</CardTitle>
          <ul className="mt-2 text-sm text-neutral-700">
            <li><strong>ID:</strong> CLM‑2024‑00123</li>
            <li><strong>Type:</strong> Auto Damage</li>
            <li><strong>Status:</strong> Investigation</li>
          </ul>
        </Card>
        <Card>
          <CardTitle className="text-primary">Customer</CardTitle>
          <ul className="mt-2 text-sm text-neutral-700">
            <li>Jane Doe</li>
            <li>Policy: POL‑123456</li>
            <li>Contact: (555) 010‑1001</li>
          </ul>
        </Card>
        <Card>
          <CardTitle className="text-primary">Financials</CardTitle>
          <ul className="mt-2 text-sm text-neutral-700">
            <li>Reserve: $8,500</li>
            <li>Paid: $1,200</li>
            <li>Outstanding: $7,300</li>
          </ul>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card>
          <CardTitle className="text-primary">Claim Timeline</CardTitle>
          <ul className="mt-2 text-sm space-y-2">
            {[
              "2024-05-12 • FNOL submitted",
              "2024-05-12 • Photos uploaded (scene-photos.zip)",
              "2024-05-13 • Police report received",
              "2024-05-14 • Repair estimate added",
              "2024-05-15 • Adjuster assigned",
            ].map((e, i) => (
              <li key={i} className="flex items-center gap-2 leading-6">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardTitle className="text-primary">Fraud Signals</CardTitle>
          <ul className="mt-2 text-sm space-y-2">
            {[
              "Late FNOL (>24h) — low",
              "Inconsistent location metadata — medium",
              "Prior claim within 18 months — low",
              "High‑risk geo for hail events — medium",
            ].map((e, i) => (
              <li key={i} className="flex items-center gap-2 leading-6">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 text-[11px] text-muted">Signals are heuristic and for review only.</div>
        </Card>
        <Card>
          <CardTitle className="text-primary">Payout Analytics</CardTitle>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3">
            <svg width="100%" height="100%" viewBox="0 0 300 100" aria-hidden="true">
              <polyline fill="none" stroke="#0EA5E9" strokeWidth="3" points="0,82 40,78 80,70 120,62 160,58 200,52 240,48 280,46" />
              <polyline fill="none" stroke="#10B981" strokeWidth="3" points="0,86 40,82 80,76 120,69 160,66 200,60 240,56 280,54" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Proposed vs approved payout trajectory (lower is better leakage).</div>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardTitle className="text-primary">Resolution Checklist</CardTitle>
          <ul className="mt-2 text-sm space-y-2">
            {[
              "Verify policy coverage limits",
              "Confirm liability and statements",
              "Validate repair estimate with network shop",
              "Collect any missing documentation",
              "Schedule settlement call",
            ].map((e, i) => (
              <li key={i} className="flex items-center gap-2 leading-6">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardTitle className="text-primary">Next Best Actions</CardTitle>
          <ul className="mt-2 text-sm space-y-2">
            {[
              "Request missing photos of rear damage",
              "Call claimant to confirm incident time window",
              "Send repair network recommendations",
            ].map((e, i) => (
              <li key={i} className="flex items-center gap-2 leading-6">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="rounded-md bg-primary text-white px-3 py-2 text-sm">Initiate Outreach</button>
            <button className="rounded-md border border-line px-3 py-2 text-sm">Generate Email</button>
          </div>
          <div className="mt-2 text-[11px] text-muted">These actions are suggestions and can be adjusted by the adjuster.</div>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardTitle className="text-primary">Documents</CardTitle>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3 text-left">File</th>
                  <th className="py-2 px-3 text-left">Type</th>
                  <th className="py-2 px-3 text-left">Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["scene-photos.zip", "Images", "2024-05-12"],
                  ["police-report.pdf", "Report", "2024-05-13"],
                  ["estimate.pdf", "Estimate", "2024-05-14"],
                ].map((r) => (
                  <tr key={r[0]} className="border-t border-line/60">
                    <td className="py-2 px-3">{r[0]}</td>
                    <td className="py-2 px-3">{r[1]}</td>
                    <td className="py-2 px-3">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card>
          <CardTitle className="text-primary">Activity Log</CardTitle>
          <ul className="mt-2 text-sm space-y-2">
            {[
              "2024-05-15 10:12 Adjuster assigned (A. Patel)",
              "2024-05-14 16:30 Customer uploaded estimate.pdf",
              "2024-05-13 09:05 Police report received",
              "2024-05-12 08:20 FNOL submitted",
            ].map((e, i) => (
              <li key={i} className="flex items-center gap-2 leading-6">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>{e}</span>
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

