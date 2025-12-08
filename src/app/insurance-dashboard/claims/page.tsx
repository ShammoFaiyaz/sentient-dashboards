"use client";

import * as React from "react";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { AgentTile } from "@/components/AgentTile";

function Card({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-4 bg-white shadow-md border border-line/60">
      <div className="text-sm font-semibold text-primary mb-2">{title}</div>
      {children ?? (
        <div className="h-40 rounded-md bg-gradient-to-br from-zinc-50 to-zinc-100/60 border border-dashed border-zinc-300 flex items-center justify-center text-xs text-zinc-500">
          data grid placeholder
        </div>
      )}
    </div>
  );
}

type ClaimRow = { id: string; type: string; status: string; age: string; assignee: string };

export default function ClaimsPage() {
  const { agents } = useAgents();
  const config = NICHES["insurance-dashboard"];
  const featured = agents.filter(a => config.agentIds.includes(a.id)).slice(0, 3);

  const [claims, setClaims] = React.useState<ClaimRow[]>([
    { id: "CLM-10234", type: "Auto",     status: "Investigation",  age: "2d",  assignee: "A. Patel" },
    { id: "CLM-10228", type: "Property", status: "Documentation",  age: "1d",  assignee: "M. Chen" },
    { id: "CLM-10211", type: "Injury",   status: "Negotiation",    age: "6d",  assignee: "S. Gomez" },
    { id: "CLM-10199", type: "Auto",     status: "FNOL",           age: "3h",  assignee: "Unassigned" },
    { id: "CLM-10183", type: "Property", status: "Review",         age: "12d", assignee: "J. Lee" },
  ]);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState<ClaimRow | null>(null);

  const openEditor = (index: number) => {
    setEditingIndex(index);
    setDraft({ ...claims[index] });
  };
  const closeEditor = () => {
    setEditingIndex(null);
    setDraft(null);
  };
  const saveEditor = () => {
    if (editingIndex == null || !draft) return;
    const next = [...claims];
    next[editingIndex] = draft;
    setClaims(next);
    closeEditor();
  };
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* <h1 className="text-2xl font-semibold text-primary">Claims Queue</h1> */}

      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Boost triage and automation in FNOL, adjudication, and subrogation.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)}
        </div>
      </section>
      {/* KPI cards */}
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <Kpi label="Open Claims" value="48" hint="all stages" colorHex="#004AAD" />
        <Kpi label="Due Today" value="9" hint="tasks pending" colorHex="#008C74" />
        <Kpi label="SLA Breaches" value="2" hint="last 24h" colorHex="#EF4444" />
        <Kpi label="Avg Cycle Time" value="18.6d" hint="rolling 30d" colorHex="#6D28D9" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Open Claims">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 pr-3">ID</th>
                  <th className="py-2 pr-3">Type</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2 pr-3">Age</th>
                  <th className="py-2 pr-3">Assignee</th>
                </tr>
              </thead>
              <tbody className="align-top">
                {claims.map((r, idx) => (
                  <tr
                    key={r.id}
                    className="border-t border-line/60 cursor-pointer hover:bg-zinc-50"
                    onClick={() => openEditor(idx)}
                  >
                    <td className="py-2 pr-3">{r.id}</td>
                    <td className="py-2 pr-3">{r.type}</td>
                    <td className="py-2 pr-3">{r.status}</td>
                    <td className="py-2 pr-3">{r.age}</td>
                    <td className="py-2 pr-3">{r.assignee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="SLA Breaches">
          <ul className="text-sm space-y-2">
            <li><span className="font-medium text-ink">Approaching (24h):</span> 7 claims</li>
            <li><span className="font-medium text-ink">Breached (48h):</span> 2 claims</li>
            <li><span className="font-medium text-ink">Longest wait:</span> 3.7d (CLM-10172)</li>
          </ul>
          <div className="mt-3 rounded-md border border-line/60 p-2">
            <div className="h-20">
              <svg width="100%" height="100%" viewBox="0 0 300 90" aria-hidden="true">
                <g stroke="#e5e7eb" strokeWidth="1">
                  <line x1="0" y1="80" x2="300" y2="80" />
                </g>
                {/* bars */}
                <g fill="#93C5FD">
                  <rect x="10" y="50" width="20" height="30" rx="3" />
                  <rect x="45" y="40" width="20" height="40" rx="3" />
                  <rect x="80" y="60" width="20" height="20" rx="3" />
                  <rect x="115" y="30" width="20" height="50" rx="3" />
                  <rect x="150" y="35" width="20" height="45" rx="3" />
                  <rect x="185" y="55" width="20" height="25" rx="3" />
                  <rect x="220" y="45" width="20" height="35" rx="3" />
                  <rect x="255" y="25" width="20" height="55" rx="3" />
                </g>
                {/* line overlay */}
                <polyline
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  points="20,65 55,55 90,70 125,45 160,50 195,62 230,52 265,40"
                />
              </svg>
            </div>
            <div className="text-[10px] text-muted mt-1 text-center">Mini trend (last few days)</div>
          </div>
        </Card>
        <Card title="Average Cycle Time">
          <div className="flex flex-col items-center justify-center">
            <div className="h-28 w-full">
              <svg width="100%" height="100%" viewBox="0 0 300 100">
                <polyline fill="none" stroke="#0EA5E9" strokeWidth="3"
                  points="0,80 40,70 80,75 120,60 160,55 200,50 240,45 280,48"/>
              </svg>
            </div>
            <div className="text-xs text-muted -mt-2 mb-2">Last 8 weeks</div>
            <div className="h-28 w-full">
              <svg width="100%" height="100%" viewBox="0 0 300 100">
                <polyline fill="none" stroke="#10B981" strokeWidth="3"
                  points="0,85 50,78 100,72 150,65 200,58 250,52 300,48"/>
              </svg>
            </div>
            <div className="text-xs text-muted -mt-2">Last 6 months</div>
          </div>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card title="Claim Types Distribution">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2">
              <span>Auto</span><span className="font-semibold">46%</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2">
              <span>Property</span><span className="font-semibold">34%</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2">
              <span>Injury</span><span className="font-semibold">18%</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2">
              <span>Other</span><span className="font-semibold">2%</span>
            </div>
          </div>
        </Card>
        <Card title="Adjuster Workload">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 pr-3">Adjuster</th>
                  <th className="py-2 pr-3">Open</th>
                  <th className="py-2 pr-3">Due Today</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["A. Patel", 14, 3],
                  ["M. Chen", 9, 1],
                  ["S. Gomez", 11, 2],
                  ["J. Lee", 8, 0],
                ].map((r)=>(
                  <tr key={r[0]} className="border-top border-line/60">
                    <td className="py-2 pr-3">{r[0]}</td>
                    <td className="py-2 pr-3">{r[1]}</td>
                    <td className="py-2 pr-3">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Open New Claim section removed as requested */}

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl p-4 bg-white shadow-md border border-line/60">
          <div className="text-sm font-semibold text-primary mb-2">Checklist</div>
          <ul className="mt-1 space-y-2 text-sm">
            {["Verify customer identity","Collect incident details","Upload photos & reports","Assign adjuster"].map((item,i)=>(
              <li key={i} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl p-4 bg-white shadow-md border border-line/60">
          <div className="text-sm font-semibold text-primary mb-2">Quick Stats</div>
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
        </div>
      </div>

      {/* moved risk assessment to Underwriter → Risk Assessment */}

      {/* Latest News removed as requested */}

      {editingIndex !== null && draft && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-line/60 shadow-elevation-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[22px] md:text-[24px] font-semibold text-primary">Edit Claim {draft.id}</h3>
              <button onClick={closeEditor} className="rounded-md px-2 py-1 text-sm text-ink hover:bg-zinc-100">Close</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="text-sm">ID
                <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={draft.id}
                  onChange={(e)=>setDraft({...(draft as ClaimRow), id: e.target.value})} />
              </label>
              <label className="text-sm">Type
                <select className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={draft.type}
                  onChange={(e)=>setDraft({...(draft as ClaimRow), type: e.target.value})}>
                  <option>Auto</option>
                  <option>Property</option>
                  <option>Injury</option>
                </select>
              </label>
              <label className="text-sm md:col-span-2">Status
                <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={draft.status}
                  onChange={(e)=>setDraft({...(draft as ClaimRow), status: e.target.value})} />
              </label>
              <label className="text-sm">Age
                <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={draft.age}
                  onChange={(e)=>setDraft({...(draft as ClaimRow), age: e.target.value})} />
              </label>
              <label className="text-sm">Assignee
                <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={draft.assignee}
                  onChange={(e)=>setDraft({...(draft as ClaimRow), assignee: e.target.value})} />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={closeEditor} className="rounded-md border border-line px-3 py-2 text-sm">Cancel</button>
              <button onClick={saveEditor} className="rounded-md bg-primary text-white px-4 py-2 text-sm">Save</button>
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

