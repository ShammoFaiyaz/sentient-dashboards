"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useNicheRole } from "@/components/niche/useNicheRole";
import { nicheRoleToSuRole } from "@/components/niche/roleMap";
import { usePathname } from "next/navigation";

export default function PatientOverviewPage() {
  const { agents } = useAgents();
  const config = NICHES["healthcare-dashboard"];
  const roleLabel = useNicheRole("healthcare-dashboard", "Doctor");
  const pathname = usePathname() || "";
  const suRole = nicheRoleToSuRole("healthcare-dashboard", roleLabel);
  const effectiveRole = pathname.includes("/healthcare-dashboard/admin/") ? "admin" : suRole;
  const base = agents.filter((a) => config.agentIds.includes(a.id) && a.role === effectiveRole);
  const featured = (base.length >= 3 ? base : [...base, ...agents.filter((a) => config.agentIds.includes(a.id) && a.role !== effectiveRole)]).slice(0, 3);
  const [patients, setPatients] = React.useState<[string,string,string,string,string][]>([
    ["Patel, R", "Follow‑up", "09:00", "Checked‑in", "3A"],
    ["Lee, S", "Telehealth", "09:30", "Waiting", "—"],
    ["Rivera, A", "New patient", "10:00", "In consultation", "4B"],
    ["Nguyen, T", "Procedure", "11:00", "Completed", "2C"],
    ["Chen, L", "Follow‑up", "11:30", "Waiting", "—"],
  ]);
  const [editing, setEditing] = React.useState<null | { index:number; draft:[string,string,string,string,string] }>(null);
  const openEdit = (i:number) => setEditing({ index:i, draft:[...patients[i]] as any });
  const closeEdit = () => setEditing(null);
  const saveEdit = () => {
    if(!editing) return;
    const next = [...patients];
    next[editing.index] = editing.draft;
    setPatients(next);
    setEditing(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted mt-0.5">
              Patient Summary Agent — consolidates active list, highlights risks, and prepares pre‑visit briefs.
            </p>
          </div>
          <a
            href="/healthcare-dashboard/agents"
            className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            View all agents
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Active Patients" value="1,240" hint="panel size" colorHex="#004AAD" />
        <Kpi label="New Patients This Month" value="42" hint="vs last month +5" colorHex="#008C74" />
        <Kpi label="High‑Risk Patients" value="24" hint="needs follow‑up" colorHex="#6D28D9" />
        <Kpi label="Pending Lab Reports" value="17" hint="awaiting review" colorHex="#F4B23E" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Today's patients table */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Today’s Patients</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Patient</th>
                  <th className="py-2 px-3">Reason for Visit</th>
                  <th className="py-2 px-3">Time</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Room</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((r, i) => (
                  <tr key={i} className="border-t border-line/60 hover:bg-zinc-50 cursor-pointer" onClick={()=>openEdit(i)}>
                    {r.map((c, j) => (
                      <td key={j} className="py-2 px-3">{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-[11px] text-muted">Live schedule and status for today's clinic.</div>
        </div>

        {/* Weekly bar chart with labels */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Weekly patient visits</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 360 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="30" y1="100" x2="340" y2="100" />
                <line x1="30" y1="20" x2="30" y2="100" />
              </g>
              {([18,22,17,24,21,26] as const).map((h, i) => (
                <g key={i}>
                  <rect x={50 + i*50} y={100 - h} width="20" height={h} fill="#3B82F6" rx="3" />
                  <text x={60 + i*50} y="112" fontSize="10" textAnchor="middle" fill="#64748b">{`W${i+1}`}</text>
                </g>
              ))}
            </svg>
          </div>
          <div className="text-[11px] text-muted">Number of completed visits per week for this doctor.</div>
        </div>
      </div>

      {/* Needs attention */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Needs Attention</div>
        <ul className="space-y-2">
          {[
            "3 high‑risk patients without follow‑up scheduled.",
            "5 patients with overdue lab results.",
            "2 patients missed their last appointment.",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Additional doctor + AI sections */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Care Gaps (AI)</div>
          <ul className="space-y-2 text-sm">
            {[
              "7 hypertensive patients without BP log in last 14 days.",
              "4 COPD patients due for inhaler technique check.",
              "6 diabetic patients eligible for foot exam this month.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Risk Segments</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="24" />
              <g transform="rotate(-90 100 100)">
                <circle cx="100" cy="100" r="60" fill="none" stroke="#EF4444" strokeWidth="24" strokeDasharray="50 320" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#F59E0B" strokeWidth="24" strokeDasharray="80 290" strokeDashoffset="-50" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#10B981" strokeWidth="24" strokeDasharray="120 250" strokeDashoffset="-130" />
              </g>
              <circle cx="100" cy="100" r="40" fill="white" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">High • Medium • Low risk patient segments.</div>
        </div>
      </div>

      {/* Agent-style sections */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Next Best Actions (AI)</div>
          <ul className="space-y-2 text-sm">
            {[
              "Auto‑compose follow‑up letter for patient Patel, R (hypertension education).",
              "Prepare pre‑visit brief for tomorrow’s diabetics clinic (5 patients).",
              "Suggest telehealth conversion for low‑complexity sore throat visits at 4PM block.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Automation Queue</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Task</th>
                  <th className="py-2 px-3">Assigned Agent</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Generate discharge summary (Nguyen, T)", "Records Review Agent", "Running"],
                  ["Book follow‑up BP check (Patel, R)", "Scheduling Agent", "Queued"],
                  ["Message patient on lifestyle goals (Chen, L)", "Care Coach Agent", "Completed"],
                ].map((r, i) => (
                  <tr key={i} className="border-t border-line/60">
                    <td className="py-2 px-3">{r[0]}</td>
                    <td className="py-2 px-3">{r[1]}</td>
                    <td className="py-2 px-3">
                      <span
                        className={
                          r[2] === "Completed"
                            ? "rounded-full bg-success/10 px-2 py-0.5 text-xs text-success"
                            : r[2] === "Queued"
                            ? "rounded-full bg-warning/10 px-2 py-0.5 text-xs text-warning"
                            : "rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                        }
                      >
                        {r[2]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-line/60 shadow-elevation-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[22px] md:text-[24px] font-semibold text-primary">Edit Patient Row</h3>
              <button onClick={closeEdit} className="rounded-md px-2 py-1 text-sm text-ink hover:bg-zinc-100">Close</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 met-3 gap-3">
              <label className="text-sm md:col-span-2">Patient
                <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={editing.draft[0]}
                  onChange={(e)=>setEditing({ ...(editing as any), draft:[e.target.value, editing.draft[1], editing.draft[2], editing.draft[3], editing.draft[4]] })}
                />
              </label>
              <label className="text-sm">Reason for Visit
                <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={editing.draft[1]}
                  onChange={(e)=>setEditing({ ...(editing as any), draft:[editing.draft[0], e.target.value, editing.draft[2], editing.draft[3], editing.draft[4]] })}
                />
              </label>
              <label className="text-sm">Time
                <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={editing.draft[2]}
                  onChange={(e)=>setEditing({ ...(editing as any), draft:[editing.draft[0], editing.draft[1], e.target.value, editing.draft[3], editing.draft[4]] })}
                />
              </label>
              <label className="text-sm">Status
                <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                  value={editing.draft[3]}
                  onChange={(e)=>setEditing({ ...(editing as any), draft:[editing.draft[0], editing.draft[1], editing.draft[2], e.target.value, editing.draft[4]] })}
                />
              </label>
              <label className="text-sm">Room
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
      style={{ background:
        colorHex === "#004AAD" ? "linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)"
        : colorHex === "#008C74" ? "linear-gradient(180deg, rgba(0,140,116,0.14) 0%, rgba(255,255,255,1) 100%)"
        : colorHex === "#6D28D9" ? "linear-gradient(180deg, rgba(109,40,217,0.12) 0%, rgba(255,255,255,1) 100%)"
        : "linear-gradient(180deg, rgba(244,178,62,0.18) 0%, rgba(255,255,255,1) 100%)"}}
    >
      <div className="text-xs text-muted">{label}</div>
      <div className="text-2xl font-semibold" style={{ color: colorHex }}>{value}</div>
      <div className="text-xs text-neutral-600">{hint}</div>
    </div>
  );
}
