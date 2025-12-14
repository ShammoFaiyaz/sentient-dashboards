"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

export default function CustomerMyClaimsPage() {
  const { agents } = useAgents();
  const config = NICHES["insurance-dashboard"];
  const featured = agentsForNicheAndRole("insurance-dashboard", agents, { roleLabel: "Customer" }).slice(0, 3);
  const [claims, setClaims] = React.useState<Array<[string,string,string,string,string]>>([
    ["CLM-10021", "Auto", "Review", "2025‑01‑25", "$—"],
    ["CLM-09988", "Property", "Approved", "2024‑11‑02", "$2,140"],
    ["CLM-09910", "Travel", "Closed", "2024‑09‑15", "$320"],
  ]);
  const [editing, setEditing] = React.useState<null | { index:number; draft:[string,string,string,string,string] }>(null);
  function openEdit(index:number) {
    setEditing({ index, draft: [...claims[index]] as [string,string,string,string,string] });
  }
  function closeEdit(){ setEditing(null); }
  function saveEdit(){
    if(!editing) return;
    const next = [...claims];
    next[editing.index] = editing.draft;
    setClaims(next);
    setEditing(null);
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured agents */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agents</h2>
          <p className="text-xs text-muted">
            Track status, upload documents, and chat with support—assistants keep your claim moving.
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
        <Kpi label="Open Claims" value="3" hint="active across lines" colorHex="#004AAD" />
        <Kpi label="In Review" value="1" hint="awaiting decision" colorHex="#6D28D9" />
        <Kpi label="Approved" value="1" hint="payout in progress" colorHex="#008C74" />
        <Kpi label="Avg Response" value="1.4h" hint="last 24h" colorHex="#F4B23E" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Claims table */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">My Claims</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Claim #</th>
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Opened</th>
                  <th className="py-2 px-3">Payout</th>
                  <th className="py-2 px-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((r, i) => (
                  <tr key={i} className="border-t border-line/60 hover:bg-zinc-50 cursor-pointer" onClick={()=>openEdit(i)}>
                    {r.map((c, j) => (
                      <td key={j} className="py-2 px-3">
                        {c}
                      </td>
                    ))}
                    <td className="py-2 px-3">
                      <div className="flex gap-2">
                        <button className="rounded-md bg-primary text-white px-3 py-1 text-xs">View</button>
                        <button className="rounded-md border border-line px-3 py-1 text-xs">Upload</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-[11px] text-muted">Recent claims with quick actions for documents and status.</div>
        </div>

        {/* Status chart */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Status Distribution</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              <circle cx="100" cy="100" r="70" fill="#A7F3D0" />
              <path d="M100,30 A70,70 0 0,1 175,115 L100,100Z" fill="#93C5FD" />
              <path d="M100,100 L175,115 A70,70 0 0,1 60,160 Z" fill="#FDE68A" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Proportion of claims in Review, Approved, and Closed states.</div>
          <ul className="mt-3 space-y-1">
            {["Review", "Approved", "Closed"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* More insights */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Claim Timeline</div>
          <div className="mt-2 h-36 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="20" y1="60" x2="300" y2="60" />
              </g>
              <g fill="#3B82F6">
                <circle cx="40" cy="60" r="6" />
                <circle cx="120" cy="60" r="6" />
                <circle cx="200" cy="60" r="6" />
                <circle cx="280" cy="60" r="6" />
              </g>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Intake → Review → Decision → Payout.</div>
        </div>

        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Messages</div>
          <div className="border border-line/60 rounded-md p-3 space-y-3 text-sm">
            <div>
              <div className="font-medium text-ink">You</div>
              <div className="text-ink">Uploaded additional photos from the repair shop.</div>
            </div>
            <div>
              <div className="font-medium text-ink">Adjuster</div>
              <div className="text-ink">Thanks—reviewing them now. Expect an update tomorrow.</div>
            </div>
            <div>
              <div className="font-medium text-ink">System</div>
              <div className="text-ink">Status changed to Review.</div>
            </div>
          </div>
          <div className="mt-2 text-[11px] text-muted">Conversation and status updates for your active claim.</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Payout History</div>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="0" y1="100" x2="320" y2="100" />
              </g>
              <g fill="#93C5FD">
                <rect x="20" y="80" width="30" height="20" />
                <rect x="70" y="70" width="30" height="30" />
                <rect x="120" y="60" width="30" height="40" />
                <rect x="170" y="85" width="30" height="15" />
                <rect x="220" y="65" width="30" height="35" />
                <rect x="270" y="75" width="30" height="25" />
              </g>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Monthly payouts across your claims (if any).</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Next Steps</div>
          <ul className="space-y-2">
            {[
              "Upload any missing receipts or estimates.",
              "Confirm your preferred payout method.",
              "Schedule a call if an inspection is requested.",
            ].map((t) => (
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
              <h3 className="text-[22px] md:text-[24px] font-semibold text-primary">Edit Claim</h3>
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
              <label className="text-sm">Status
                <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={editing.draft[2]}
                  onChange={(e)=>setEditing({ ...(editing as any), draft:[editing.draft[0], editing.draft[1], e.target.value, editing.draft[3], editing.draft[4]] })}
                />
              </label>
              <label className="text-sm">Opened
                <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={editing.draft[3]}
                  onChange={(e)=>setEditing({ ...(editing as any), draft:[editing.draft[0], editing.draft[1], editing.draft[2], e.target.value, editing.draft[4]] })}
                />
              </label>
              <label className="text-sm">Payout
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

