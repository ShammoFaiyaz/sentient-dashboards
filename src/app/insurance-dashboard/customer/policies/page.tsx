"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function CustomerPoliciesPage() {
  const { agents } = useAgents();
  const config = NICHES["insurance-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);
  const [policies, setPolicies] = React.useState<Array<[string,string,string,string,string]>>([
    ["POL-123456", "Auto", "Active", "$92/mo", "2025‑02‑14"],
    ["POL-778900", "Property", "Active", "$148/mo", "2025‑07‑01"],
    ["POL-552210", "Travel", "Expired", "$18/mo", "2023‑11‑30"],
  ]);
  const [invoices, setInvoices] = React.useState<Array<[string,string,string,string]>>([
    ["INV-90231", "Jan 2025", "$92.00", "Paid"],
    ["INV-89714", "Dec 2024", "$92.00", "Paid"],
    ["INV-89102", "Nov 2024", "$92.00", "Overdue"],
  ]);
  const [editing, setEditing] = React.useState<null | { table:"policies"|"invoices"; index:number; draft:string[] }>(null);

  function openEdit(table:"policies"|"invoices", index:number) {
    const src = table === "policies" ? policies : invoices;
    setEditing({ table, index, draft: [...src[index]] });
  }
  function closeEdit(){ setEditing(null); }
  function saveEdit(){
    if(!editing) return;
    if(editing.table==="policies"){
      const next = [...policies];
      next[editing.index] = editing.draft as any;
      setPolicies(next);
    } else {
      const next = [...invoices];
      next[editing.index] = editing.draft as any;
      setInvoices(next);
    }
    setEditing(null);
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured agents */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agents</h2>
          <p className="text-xs text-muted">
            Manage your policies, download documents, and understand coverage—our assistants guide you at every step.
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
        <Kpi label="Active Policies" value="3" hint="across lines" colorHex="#004AAD" />
        <Kpi label="Upcoming Renewal" value="1" hint="within 30 days" colorHex="#6D28D9" />
        <Kpi label="Outstanding Balance" value="$92.00" hint="due this month" colorHex="#EF4444" />
        <Kpi label="Claims (12m)" value="1" hint="filed last year" colorHex="#008C74" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">My Policies</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Policy #</th>
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Premium</th>
                  <th className="py-2 px-3">Renewal</th>
                  <th className="py-2 px-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((r, i) => (
                  <tr key={i} className="border-t border-line/60 hover:bg-zinc-50 cursor-pointer" onClick={()=>openEdit("policies", i)}>
                    {r.slice(0, 5).map((c, j) => (
                      <td key={j} className="py-2 px-3">
                        {c}
                      </td>
                    ))}
                    <td className="py-2 px-3">
                      <div className="flex gap-2">
                        <button className="rounded-md bg-primary text-white px-3 py-1 text-xs">View</button>
                        <button className="rounded-md border border-line px-3 py-1 text-xs">Download</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-[11px] text-muted">Your active and past policies with quick actions.</div>
        </div>

        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Coverage by Type</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
            {/* donut chart */}
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              <circle cx="100" cy="100" r="70" fill="#93C5FD" />
              <path d="M100,30 A70,70 0 0,1 160,150 L100,100Z" fill="#A7F3D0" />
              <path d="M100,100 L160,150 A70,70 0 0,1 60,160 Z" fill="#FDE68A" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Distribution across Auto, Property, and Travel policies.</div>
          <ul className="mt-3 space-y-1">
            {[
              "Auto coverage includes collision & comprehensive.",
              "Property coverage includes structure & contents.",
              "Travel coverage includes trip delay & medical.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Billing & Documents */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Billing & Payments</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Invoice #</th>
                  <th className="py-2 px-3">Period</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((r, i) => (
                  <div key={i} className="contents">
                    <tr className="border-t border-line/60 hover:bg-zinc-50 cursor-pointer" onClick={()=>openEdit("invoices", i)}>
                      <td className="py-2 px-3">{r[0]}</td>
                      <td className="py-2 px-3">{r[1]}</td>
                      <td className="py-2 px-3">{r[2]}</td>
                      <td className="py-2 px-3">{r[3]}</td>
                      <td className="py-2 px-3">
                        {r[3] === "Overdue" ? (
                          <button className="rounded-md bg-primary text-white px-3 py-1 text-xs">Pay now</button>
                        ) : (
                          <button className="rounded-md border border-line px-3 py-1 text-xs">Receipt</button>
                        )}
                      </td>
                    </tr>
                  </div>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-[11px] text-muted">Track past invoices and quickly settle any outstanding payments.</div>
        </div>

        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Policy Documents</div>
          <ul className="mt-2 space-y-2">
            {[
              { name: "Auto Policy - Declarations", size: "PDF • 320KB" },
              { name: "Property Policy - Terms", size: "PDF • 410KB" },
              { name: "Travel Policy - Certificate", size: "PDF • 220KB" },
            ].map((d, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <div className="text-sm">
                    <div className="text-ink">{d.name}</div>
                    <div className="text-[11px] text-muted">{d.size}</div>
                  </div>
                </div>
                <button className="rounded-md border border-line px-3 py-1 text-xs">Download</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Snapshot & Help */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Claims Snapshot</div>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="0" y1="100" x2="320" y2="100" />
              </g>
              <g fill="#A7F3D0">
                <rect x="20" y="70" width="40" height="30" rx="4" />
                <rect x="90" y="55" width="40" height="45" rx="4" />
                <rect x="160" y="40" width="40" height="60" rx="4" />
                <rect x="230" y="80" width="40" height="20" rx="4" />
              </g>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Open vs. closed claims over recent months.</div>
        </div>

        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Support & Quick Links</div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <ul className="space-y-2">
                {[
                  "Request policy changes (address, drivers, vehicles)",
                  "Add an additional insured to your policy",
                  "Update billing method or auto‑pay settings",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-ink">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-line/60 rounded-md p-3">
              <div className="text-sm text-primary font-medium mb-2">Contact your agent</div>
              <div className="text-sm text-ink">Alex Rivera</div>
              <div className="text-sm text-muted">Mon–Fri, 9am–6pm</div>
              <div className="mt-3 flex gap-2">
                <button className="rounded-md bg-primary text-white px-3 py-1 text-xs">Call</button>
                <button className="rounded-md border border-line px-3 py-1 text-xs">Email</button>
                <button className="rounded-md border border-line px-3 py-1 text-xs">Schedule</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* More insights */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Upcoming Renewals</div>
          <ul className="space-y-2">
            {[
              "Auto policy renews on Feb 14, 2025.",
              "Property policy renews on Jul 01, 2025.",
              "Enable auto‑renew to avoid coverage gaps.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 text-[11px] text-muted">We’ll remind you 30 days before renewal.</div>
        </div>

        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Discounts & Savings</div>
          <ul className="space-y-2">
            {[
              "Bundle auto + property for up to 12% off.",
              "Set higher deductibles to lower monthly premium.",
              "Safe‑driver program available for Auto.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Recent Activity</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Event</th>
                  <th className="py-2 px-3">Policy</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["2025‑01‑20", "Address updated", "Auto"],
                  ["2024‑12‑05", "Payment received", "Auto"],
                  ["2024‑11‑30", "Renewal quote viewed", "Property"],
                ].map((r, i) => (
                  <tr key={i} className="border-t border-line/60">
                    {r.map((c, j) => (
                      <td key={j} className="py-2 px-3">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-[11px] text-muted">Recent actions taken on your policies.</div>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-line/60 shadow-elevation-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[22px] md:text-[24px] font-semibold text-primary">
                Edit {editing.table === "policies" ? "Policy" : "Invoice"}
              </h3>
              <button onClick={closeEdit} className="rounded-md px-2 py-1 text-sm text-ink hover:bg-zinc-100">Close</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {editing.table === "policies" ? (
                <>
                  <label className="text-sm md:col-span-2">Policy #
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
                  <label className="text-sm">Premium
                    <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                      value={editing.draft[3]}
                      onChange={(e)=>setEditing({ ...(editing as any), draft:[editing.draft[0], editing.draft[1], editing.draft[2], e.target.value, editing.draft[4]] })}
                    />
                  </label>
                  <label className="text-sm">Renewal
                    <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                      value={editing.draft[4]}
                      onChange={(e)=>setEditing({ ...(editing as any), draft:[editing.draft[0], editing.draft[1], editing.draft[2], editing.draft[3], e.target.value] })}
                    />
                  </label>
                </>
              ) : (
                <>
                  <label className="text-sm">Invoice #
                    <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                      value={editing.draft[0]}
                      onChange={(e)=>setEditing({ ...(editing as any), draft:[e.target.value, editing.draft[1], editing.draft[2], editing.draft[3]] })}
                    />
                  </label>
                  <label className="text-sm">Period
                    <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                      value={editing.draft[1]}
                      onChange={(e)=>setEditing({ ...(editing as any), draft:[editing.draft[0], e.target.value, editing.draft[2], editing.draft[3]] })}
                    />
                  </label>
                  <label className="text-sm">Amount
                    <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                      value={editing.draft[2]}
                      onChange={(e)=>setEditing({ ...(editing as any), draft:[editing.draft[0], editing.draft[1], e.target.value, editing.draft[3]] })}
                    />
                  </label>
                  <label className="text-sm">Status
                    <input className="mt-1 w-full rounded-md border border-line/60 p-2"
                      value={editing.draft[3]}
                      onChange={(e)=>setEditing({ ...(editing as any), draft:[editing.draft[0], editing.draft[1], editing.draft[2], e.target.value] })}
                    />
                  </label>
                </>
              )}
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

