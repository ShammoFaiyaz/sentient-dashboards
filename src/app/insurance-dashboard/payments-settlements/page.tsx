"use client";

import * as React from "react";
import { Card, CardTitle } from "@/components/ui/Card";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { AgentTile } from "@/components/AgentTile";
import { useNicheRole } from "@/components/niche/useNicheRole";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

export default function PaymentsSettlements() {
  const config = NICHES["insurance-dashboard"];
  const { agents } = useAgents();
  const roleLabel = useNicheRole("insurance-dashboard", config.roles[0]);
  const featured = agentsForNicheAndRole("insurance-dashboard", agents, { roleLabel }).slice(0, 3);
  const [pending, setPending] = React.useState<Array<[string,string,string]>>([
    ["CLM-10234", "$2,300", "2d"],
    ["CLM-10199", "$1,120", "3d"],
    ["CLM-10172", "$4,050", "5d"],
  ]);
  const [settled, setSettled] = React.useState<Array<[string,string,string]>>([
    ["CLM-10163", "$3,700", "2024-05-15"],
    ["CLM-10158", "$980", "2024-05-14"],
    ["CLM-10151", "$5,120", "2024-05-13"],
  ]);
  const [editing, setEditing] = React.useState<null | { table: "pending" | "settled"; index: number; draft: [string,string,string] }>(null);

  function openEdit(table: "pending" | "settled", index: number) {
    const src = table === "pending" ? pending : settled;
    setEditing({ table, index, draft: [...src[index]] as [string,string,string] });
  }
  function closeEdit() { setEditing(null); }
  function saveEdit() {
    if (!editing) return;
    if (editing.table === "pending") {
      const next = [...pending];
      next[editing.index] = editing.draft;
      setPending(next);
    } else {
      const next = [...settled];
      next[editing.index] = editing.draft;
      setSettled(next);
    }
    setEditing(null);
  }
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents on top */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agents</h2>
          <p className="text-xs text-muted">Validate payouts, detect anomalies, and prepare settlement offers.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map(a => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)}
        </div>
      </section>

      {/* KPI cards */}
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <Kpi label="Pending Payouts" value="$7.5k" hint="3 claims" colorHex="#004AAD" />
        <Kpi label="Avg Payout" value="$2.1k" hint="last 30d" colorHex="#008C74" />
        <Kpi label="Disputes Open" value="2" hint="requires review" colorHex="#EF4444" />
        <Kpi label="Recovery Rate" value="62%" hint="subrogation/refunds" colorHex="#6D28D9" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardTitle className="text-primary">Pending Payments</CardTitle>
          <div className="mt-2 overflow-x-auto rounded-md border border-line/60">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Claim</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Due</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((r,i)=>(
                  <tr key={i} className="border-t border-line/60 cursor-pointer hover:bg-zinc-50" onClick={()=>openEdit("pending", i)}>
                    <td className="py-2 px-3">{r[0]}</td>
                    <td className="py-2 px-3">{r[1]}</td>
                    <td className="py-2 px-3">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-[11px] text-muted px-3 py-1">Items due within the next week</div>
          </div>
        </Card>

        <Card>
          <CardTitle className="text-primary">Recent Settlements</CardTitle>
          <div className="mt-2 overflow-x-auto rounded-md border border-line/60">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Claim</th>
                  <th className="py-2 px-3">Payout</th>
                  <th className="py-2 px-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {settled.map((r,i)=>(
                  <tr key={i} className="border-t border-line/60 cursor-pointer hover:bg-zinc-50" onClick={()=>openEdit("settled", i)}>
                    <td className="py-2 px-3">{r[0]}</td>
                    <td className="py-2 px-3">{r[1]}</td>
                    <td className="py-2 px-3">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-[11px] text-muted px-3 py-1">Latest completed payouts</div>
          </div>
        </Card>

        <Card>
          <CardTitle className="text-primary">Payout Analytics</CardTitle>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3">
            <svg width="100%" height="100%" viewBox="0 0 300 120" aria-hidden="true">
              {/* line trend */}
              <polyline fill="none" stroke="#0EA5E9" strokeWidth="3"
                points="0,90 50,80 100,70 150,60 200,55 250,50 300,48"/>
            </svg>
            <div className="text-[11px] text-muted -mt-2">Average payout (last 6 months)</div>
          </div>
        </Card>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-line/60 shadow-elevation-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[22px] md:text-[24px] font-semibold text-primary">
                Edit {editing.table === "pending" ? "Pending Payment" : "Settlement"}
              </h3>
              <button onClick={closeEdit} className="rounded-md px-2 py-1 text-sm text-ink hover:bg-zinc-100">Close</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="text-sm md:col-span-2">Claim
                <input
                  className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={editing.draft[0]}
                  onChange={(e)=>setEditing({ ...(editing as any), draft: [e.target.value, editing.draft[1], editing.draft[2]] })}
                />
              </label>
              <label className="text-sm">Amount / Payout
                <input
                  className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={editing.draft[1]}
                  onChange={(e)=>setEditing({ ...(editing as any), draft: [editing.draft[0], e.target.value, editing.draft[2]] })}
                />
              </label>
              <label className="text-sm">Due / Date
                <input
                  className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={editing.draft[2]}
                  onChange={(e)=>setEditing({ ...(editing as any), draft: [editing.draft[0], editing.draft[1], e.target.value] })}
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
        <Card>
          <CardTitle className="text-primary">Recovery Rate</CardTitle>
          <div className="mt-2 h-40 border border-line/60 rounded-md flex items-center justify-center">
            <svg width="70%" height="70%" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="70" stroke="#e5e7eb" strokeWidth="18" fill="none" />
              <circle cx="100" cy="100" r="70" stroke="#10B981" strokeWidth="18" fill="none"
                strokeDasharray="275 440" strokeLinecap="round" transform="rotate(-90 100 100)" />
              <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fontSize="24" fill="#065F46">62%</text>
            </svg>
          </div>
          <div className="text-[11px] text-muted px-3 py-1">Recovered via subrogation or refunds</div>
        </Card>

        <Card>
          <CardTitle className="text-primary">Avg Payout by Type</CardTitle>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-2 flex items-center justify-center">
            <svg width="80%" height="80%" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="70" fill="#93C5FD" />
              <path d="M100,30 A70,70 0 0,1 170,100 L100,100Z" fill="#FDE68A" />
              <path d="M100,100 L170,100 A70,70 0 0,1 130,165 Z" fill="#A7F3D0" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Auto • Property • Injury (relative scale)</div>
        </Card>

        <Card>
          <CardTitle className="text-primary">Disputes</CardTitle>
          <div className="mt-2 overflow-x-auto rounded-md border border-line/60">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Claim</th>
                  <th className="py-2 px-3">Reason</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["CLM-10148", "Amount discrepancy", "Review"],
                  ["CLM-10139", "Missing docs", "Awaiting customer"],
                ].map((r,i)=>(
                  <tr key={i} className="border-t border-line/60">
                    <td className="py-2 px-3">{r[0]}</td>
                    <td className="py-2 px-3">{r[1]}</td>
                    <td className="py-2 px-3">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-[11px] text-muted px-3 py-1">Open disputes requiring attention</div>
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

