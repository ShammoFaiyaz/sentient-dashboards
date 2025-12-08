"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { AgentTile } from "@/components/AgentTile";
import * as React from "react";

export default function UWApplicationsPage() {
  const config = NICHES["insurance-dashboard"];
  const { agents } = useAgents();
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);
  const [editing, setEditing] = React.useState<null | { id: string; product: string; risk: string; status: string; broker: string }>(null);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agents</h2>
          <p className="text-xs text-muted">Triage submissions, auto-score risk factors, and surface missing requirements.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <Kpi label="In Queue" value="58" hint="awaiting review" colorHex="#004AAD" />
        <Kpi label="High Risk" value="12" hint="score ≥ 80" colorHex="#EF4444" />
        <Kpi label="Avg Score" value="63" hint="last 7d" colorHex="#6D28D9" />
        <Kpi label="Docs Missing" value="18%" hint="submissions" colorHex="#F4B23E" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-3">
          <CardTitle className="text-primary">Applications Queue</CardTitle>
          <div className="mt-2 overflow-x-auto rounded-md border border-line/60">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">ID</th>
                  <th className="py-2 px-3">Product</th>
                  <th className="py-2 px-3">Risk</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Broker</th>
                  <th className="py-2 px-3">Submitted</th>
                  <th className="py-2 px-3">Score</th>
                  <th className="py-2 px-3 pl-[12px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["UWR-884", "Auto", "Medium", "Review", "Acme Brokers", "2d ago", "72"],
                  ["UWR-885", "Property", "High", "Docs", "Delta Partners", "5h ago", "86"],
                  ["UWR-886", "Injury", "Low", "Score", "Northwind", "1d ago", "63"],
                ].map((r, i) => (
                  <tr key={i} className="border-t border-line/60 hover:bg-neutral-50 cursor-pointer" onClick={() => setEditing({ id: r[0], product: r[1], risk: r[2], status: r[3], broker: r[4] })}>
                    <td className="py-2 px-3">{r[0]}</td>
                    <td className="py-2 px-3">{r[1]}</td>
                    <td className="py-2 px-3">{r[2]}</td>
                    <td className="py-2 px-3">{r[3]}</td>
                    <td className="py-2 px-3">{r[4]}</td>
                    <td className="py-2 px-3">{r[5]}</td>
                    <td className="py-2 px-3">{r[6]}</td>
                    <td className="py-2 px-3">
                      <div className="flex justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button className="rounded-md bg-primary text-white px-3 py-1 text-xs" onClick={() => setEditing({ id: r[0], product: r[1], risk: r[2], status: r[3], broker: r[4] })}>Edit</button>
                        <button className="rounded-md border border-line px-3 py-1 text-xs">Assign</button>
                        <button className="rounded-md border border-line px-3 py-1 text-xs">Archive</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-[11px] text-muted px-3 py-1">Items awaiting underwriting action</div>
          </div>
        </Card>

        <Card>
          <CardTitle className="text-primary">Missing Requirements</CardTitle>
          <ul className="mt-2 text-sm space-y-2">
            {[
              "UWR-885 • Property valuation report",
              "UWR-884 • Driver history (last 3 years)",
              "UWR-886 • Prior loss runs",
            ].map((t, i) => (
              <li key={i} className="flex items-center gap-2 leading-6">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-neutral-700">{t}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Urgent KPI card */}
        <UrgentKpi />

        <Card>
          <CardTitle className="text-primary">Products Mix</CardTitle>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
            <svg width="78%" height="78%" viewBox="0 0 200 200" aria-hidden="true">
              <circle cx="100" cy="100" r="70" fill="#93C5FD" />
              <path d="M100,30 A70,70 0 0,1 170,100 L100,100Z" fill="#A7F3D0" />
              <path d="M100,100 L170,100 A70,70 0 0,1 120,170 Z" fill="#FDE68A" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Auto • Property • Injury (current queue)</div>
        </Card>

        <Card>
          <CardTitle className="text-primary">Recent Notes</CardTitle>
          <ul className="mt-2 text-sm space-y-2">
            {["UWR-884: waiting for driver history", "UWR-885: valuation report ETA Friday", "UWR-886: recommend deductible increase"].map((t, i) => (
              <li key={i} className="flex items-center gap-2 leading-6">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-neutral-700">{t}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="md:col-span-2">
          <CardTitle className="text-primary">Broker Performance</CardTitle>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3">
            <svg width="100%" height="100%" viewBox="0 0 320 120" aria-hidden="true">
              <g stroke="#e5e7eb"><line x1="0" y1="100" x2="320" y2="100" /></g>
              <g fill="#A7F3D0">
                <rect x="20" y="70" width="40" height="30" rx="4" />
                <rect x="90" y="55" width="40" height="45" rx="4" />
                <rect x="160" y="40" width="40" height="60" rx="4" />
                <rect x="230" y="80" width="40" height="20" rx="4" />
              </g>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Bind ratio by broker (last 30 days)</div>
        </Card>
      </div>

      <UrgentModals />

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-line/60 shadow-elevation-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[22px] md:text-[24px] font-semibold text-primary">Edit Application {editing.id}</h3>
              <button onClick={() => setEditing(null)} className="rounded-md px-2 py-1 text-sm text-ink hover:bg-zinc-100">Close</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="text-sm">Product
                <select className="mt-1 w-full rounded-md border border-line/60 p-2" value={editing.product} onChange={(e) => setEditing({ ...editing, product: e.target.value })}>
                  <option>Auto</option>
                  <option>Property</option>
                  <option>Injury</option>
                </select>
              </label>
              <label className="text-sm">Risk
                <select className="mt-1 w-full rounded-md border border-line/60 p-2" value={editing.risk} onChange={(e) => setEditing({ ...editing, risk: e.target.value })}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </label>
              <label className="text-sm md:col-span-2">Status
                <input className="mt-1 w-full rounded-md border border-line/60 p-2" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} />
              </label>
              <label className="text-sm md:col-span-2">Broker
                <input className="mt-1 w-full rounded-md border border-line/60 p-2" value={editing.broker} onChange={(e) => setEditing({ ...editing, broker: e.target.value })} />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-md border border-line px-3 py-2 text-sm">Cancel</button>
              <button onClick={() => setEditing(null)} className="rounded-md bg-primary text-white px-4 py-2 text-sm">Save</button>
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
function UrgentKpi() {
  const [open, setOpen] = React.useState<null | "view" | "assign">(null);
  return (
    <div className="rounded-2xl bg-gradient-to-br from-red-50 to-white border border-red-200 shadow-[0_8px_20px_rgba(255,0,0,0.08)] p-6 flex flex-col items-center justify-center text-center">
      <div className="text-xs font-medium text-red-700">Urgent</div>
      <div className="mt-2 text-5xl font-extrabold text-red-600">5</div>
      <div className="mt-1 text-sm text-red-700">SLA risks in queue</div>
      <div className="mt-4 flex gap-3">
        <button onClick={() => setOpen("view")} className="rounded-md bg-red-600 text-white px-4 py-2 text-sm">View</button>
        <button onClick={() => setOpen("assign")} className="rounded-md border border-red-300 text-red-700 px-4 py-2 text-sm">Assign</button>
      </div>
      {open && <UrgentModal kind={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function UrgentModal({ kind, onClose }: { kind: "view" | "assign"; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white border border-line/60 shadow-elevation-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[22px] md:text-[24px] font-semibold text-primary">{kind === "view" ? "View SLA Risks" : "Assign SLA Risks"}</h3>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-sm text-ink hover:bg-zinc-100">Close</button>
        </div>
        {kind === "view" ? (
          <div className="text-sm text-neutral-700">
            <p>5 items currently breaching or nearing SLA.</p>
            <ul className="mt-2 list-disc pl-5">
              <li>CLM-10172 • response 47h</li>
              <li>CLM-10168 • docs pending</li>
              <li>CLM-10166 • supervisor review</li>
              <li>CLM-10160 • additional investigation required</li>
              <li>CLM-10155 • pending customer callback</li>
            </ul>
          </div>
        ) : (
          <div className="grid gap-3">
            <label className="text-sm">Assign to
              <select className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm">
                <option>A. Patel</option>
                <option>M. Chen</option>
                <option>S. Gomez</option>
              </select>
            </label>
            <label className="text-sm">Note
              <textarea className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm" rows={3} placeholder="Optional message..." />
            </label>
            <div className="flex justify-end">
              <button onClick={onClose} className="rounded-md bg-primary text-white px-4 py-2 text-sm">Assign</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function UrgentModals() {
  return null;
}


