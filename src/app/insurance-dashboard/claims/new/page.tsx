"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { AgentTile } from "@/components/AgentTile";
import { useNicheRole } from "@/components/niche/useNicheRole";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

export default function OpenNewClaimPage() {
  const config = NICHES["insurance-dashboard"];
  const { agents } = useAgents();
  const roleLabel = useNicheRole("insurance-dashboard", config.roles[0]);
  const featured = agentsForNicheAndRole("insurance-dashboard", agents, { roleLabel }).slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium text-primary">Featured Agents</h2>
          <p className="text-xs text-muted">Speed up FNOL, intake, and triage with domain agents.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <Kpi label="FNOL Today" value="18" hint="submitted" colorHex="#004AAD" />
        <Kpi label="Avg Intake Time" value="6m" hint="from start to submit" colorHex="#6D28D9" />
        <Kpi label="Docs Attached" value="82%" hint="of new claims" colorHex="#008C74" />
        <Kpi label="Missing Info" value="5" hint="needs follow‑up" colorHex="#EF4444" />
      </div>
      <div className="grid gap-4">
        <Card>
          <CardTitle>New Claim</CardTitle>
          <div className="mt-1 space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <label className="text-sm">
                Policy Number
                <input className="mt-1 w-full rounded-md border border-line/60 p-2" placeholder="e.g., POL-123456" />
              </label>
              <label className="text-sm">
                Claim Type
                <select className="mt-1 w-full rounded-md border border-line/60 p-2">
                  <option>Auto Damage</option>
                  <option>Property</option>
                  <option>Injury</option>
                </select>
              </label>
            </div>
            <label className="text-sm block">
              Description
              <textarea className="mt-1 w-full rounded-md border border-line/60 p-2" rows={4} placeholder="Brief description of loss" />
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              <label className="text-sm">
                Incident Date
                <input type="date" className="mt-1 w-full rounded-md border border-line/60 p-2" />
              </label>
              <label className="text-sm">
                Location
                <input className="mt-1 w-full rounded-md border border-line/60 p-2" placeholder="City, State" />
              </label>
            </div>
            <div className="flex gap-2 justify-end">
              <button className="rounded-md border border-line px-3 py-2 text-sm">Save Draft</button>
              <button className="rounded-md bg-primary text-white px-4 py-2 text-sm">Submit Claim</button>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardTitle>Checklist</CardTitle>
          <ul className="mt-1 space-y-2 text-sm">
            {["Verify customer identity", "Collect incident details", "Upload photos & reports", "Assign adjuster"].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardTitle>Quick Stats</CardTitle>
          <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md border border-line/60 px-3 py-2">
              <div className="text-xs text-muted">Avg Time to First Contact</div>
              <div className="text-lg font-semibold text-warning">45m</div>
            </div>
            <div className="rounded-md border border-line/60 px-3 py-2">
              <div className="text-xs text-muted">Self‑service FNOL</div>
              <div className="text-lg font-semibold text-warning">68%</div>
            </div>
            <div className="rounded-md border border-line/60 px-3 py-2">
              <div className="text-xs text-muted">Docs complete (48h)</div>
              <div className="text-lg font-semibold text-warning">82%</div>
            </div>
            <div className="rounded-md border border-line/60 px-3 py-2">
              <div className="text-xs text-muted">Reopen rate (90d)</div>
              <div className="text-lg font-semibold text-warning">3.1%</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardTitle>Required Documents</CardTitle>
          <ul className="mt-2 text-sm space-y-2">
            {["Proof of insurance","Photos or videos of damage","Police report (if applicable)"].map((t,i)=>(
              <li key={i} className="flex items-center gap-2 leading-6">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-neutral-700">{t}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardTitle>SLA Timeline</CardTitle>
          <div className="mt-2 h-32 border border-line/60 rounded-md p-3">
            <div className="text-xs text-muted mb-1">Target milestones</div>
            <ul className="text-sm space-y-1">
              {[
                "T+1h: First contact",
                "T+24h: Document request issued",
                "T+72h: Initial assessment",
                "T+7d: Settlement decision (simple cases)",
              ].map((m, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
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

