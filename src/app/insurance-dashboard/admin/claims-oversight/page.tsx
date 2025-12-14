"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

export default function InsuranceAdminClaimsOversightPage() {
  const { agents } = useAgents();
  const config = NICHES["insurance-dashboard"];
  const featured = agentsForNicheAndRole("insurance-dashboard", agents, { suRole: "admin" }).slice(0, 3);
  const [queue, setQueue] = React.useState<Array<[string,string,string,string,string]>>([
    ["CLM-12001", "Auto", "Review", "R. Patel", "7d"],
    ["CLM-11980", "Property", "Investigation", "S. Lee", "12d"],
    ["CLM-11944", "Travel", "Decision", "A. Rivera", "3d"],
  ]);
  const [editing, setEditing] = React.useState<null | { index:number; draft:[string,string,string,string,string] }>(null);
  function openEdit(i:number){ setEditing({ index:i, draft:[...queue[i]] as any }); }
  function closeEdit(){ setEditing(null); }
  function saveEdit(){
    if(!editing) return;
    const next = [...queue];
    next[editing.index] = editing.draft;
    setQueue(next);
    setEditing(null);
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured agents */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium text-primary">Featured Agents</h2>
          <p className="text-xs text-muted">
            Monitor end‑to‑end claims performance—assistants surface risks, SLA breaches, and workload hotspots.
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
        <Kpi label="Open Claims" value="1,248" hint="portfolio" colorHex="#004AAD" />
        <Kpi label="Avg Aging" value="16.2d" hint="rolling 30d" colorHex="#6D28D9" />
        <Kpi label="SLA Breaches" value="9" hint="last 24h" colorHex="#EF4444" />
        <Kpi label="Reopen Rate" value="3.1%" hint="90d" colorHex="#008C74" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {/* Open claims */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Open Claims</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Claim #</th>
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Stage</th>
                  <th className="py-2 px-3">Adjuster</th>
                  <th className="py-2 px-3">Aging</th>
                  <th className="py-2 px-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((r, i) => (
                  <tr key={i} className="border-t border-line/60 hover:bg-zinc-50 cursor-pointer" onClick={()=>openEdit(i)}>
                    {r.map((c, j) => (
                      <td key={j} className="py-2 px-3">
                        {c}
                      </td>
                    ))}
                    <td className="py-2 px-3">
                      <div className="flex gap-2">
                        <button className="rounded-md border border-line px-3 py-1 text-xs" onClick={(e)=>{e.stopPropagation(); openEdit(i);}}>View</button>
                        <button className="rounded-md border border-line px-3 py-1 text-xs" onClick={(e)=>{e.stopPropagation(); openEdit(i);}}>Reassign</button>
                        <button className="rounded-md bg-primary text-white px-3 py-1 text-xs" onClick={(e)=>{e.stopPropagation(); openEdit(i);}}>Close</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-[11px] text-muted">Live queue overview across all lines of business.</div>
        </div>

        {/* SLA trend */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">SLA Breaches Trend</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="0" y1="100" x2="320" y2="100" />
              </g>
              <polyline
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                points="10,95 60,90 110,85 160,82 210,76 260,70 310,62"
              />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Breaches declining over the last 6 months.</div>
          <ul className="mt-2 space-y-1">
            {["Auto", "Property", "Travel"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-line/60 shadow-elevation-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[22px] md:text-[24px] font-semibold text-primary">Edit Queue Item</h3>
              <button onClick={closeEdit} className="rounded-md px-2 py-1 text-sm text-ink hover:bg-zinc-100">Close</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="text-sm md:col-span-2">Claim #
                <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={editing.draft[0]}
                  onChange={(e)=>setEditing({ ...(editing as any), draft:[e.target.value, editing.draft[1], editing.draft[2], editing.draft[3], editing.draft[4]] })}
                />
              </label>
              <label className="text-sm">Type
                <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={editing.draft[1]}
                  onChange={(e)=>setEditing({ ...(editing as any), draft:[editing.draft[0], e.target.value, editing.draft[2], editing.draft[3], editing.draft[4]] })}
                />
              </label>
              <label className="text-sm">Stage
                <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={editing.draft[2]}
                  onChange={(e)=>setEditing({ ...(editing as any), draft:[editing.draft[0], editing.draft[1], e.target.value, editing.draft[3], editing.draft[4]] })}
                />
              </label>
              <label className="text-sm">Adjuster
                <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={editing.draft[3]}
                  onChange={(e)=>setEditing({ ...(editing as any), draft:[editing.draft[0], editing.draft[1], editing.draft[2], e.target.value, editing.draft[4]] })}
                />
              </label>
              <label className="text-sm">Aging
                <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={editing.draft[4]}
                  onChange={(e)=>setEditing({ ...(editing as any), draft:[editing.draft[0], editing.draft[1], editing.draft[2], editing.draft[3], e.target.value] })}
                />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={closeEdit} className="rounded-md border border-line px-3 py-2 text-sm">Cancel</button>
              <button onClick={saveEdit} className="rounded-md bg-primary text-white px-4 py-2 text-sm">Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {/* Workload */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Adjuster Workload</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g fill="#93C5FD">
                <rect x="30" y="50" width="30" height="50" />
                <rect x="100" y="30" width="30" height="70" />
                <rect x="170" y="40" width="30" height="60" />
                <rect x="240" y="20" width="30" height="80" />
              </g>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Open claims per adjuster (sample).</div>
        </div>

        {/* Fraud alerts */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Fraud Watchlist</div>
          <ul className="space-y-2">
            {[
              "Spike in duplicate invoices (auto glass)",
              "High‑risk postal codes with surge in theft claims",
              "Repeat claimant pattern detected",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 text-[11px] text-muted">Investigate anomalies flagged by models.</div>
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

