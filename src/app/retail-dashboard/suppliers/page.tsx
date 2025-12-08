"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function SupplierManagementPage() {
  const { agents } = useAgents();
  const config = NICHES["retail-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agent</h2>
          <p className="text-xs text-muted">Supplier Insights Agent — tracks performance, lead times, and delivery SLAs.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Total Suppliers" value="86" hint="active" colorHex="#004AAD" />
        <Kpi label="Pending Orders" value="42" hint="in pipeline" colorHex="#008C74" />
        <Kpi label="Delays" value="7" hint="reported" colorHex="#EF4444" />
      </div>

      {/* Supplier list */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Supplier List</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Category</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Lead Time</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Alpha Textiles", "Apparel", "Active", "7 days"],
                ["Nova Electronics", "Electronics", "Active", "5 days"],
                ["Urban Home Co.", "Home", "Watchlist", "10 days"],
              ].map((r, i) => (
                <tr key={i} className="border-t border-line/60">
                  {r.map((c, j) => (
                    <td key={j} className="py-2 px-3">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timeliness + notes */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Delivery Timeliness Trend</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="0" y1="100" x2="320" y2="100" />
              </g>
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="10,95 40,92 70,90 100,88 130,86 160,88 190,84 220,86 250,82 280,80 310,78" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">On‑time percentage for deliveries across suppliers.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Supplier Notes</div>
          <ul className="space-y-2">
            {[
              "Alpha Textiles: add capacity for spring line.",
              "Nova Electronics: improve packaging to reduce damages.",
              "Urban Home Co.: audit scheduled next month.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Additional merchandiser sections (no line graphs) */}
      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">OTIF (On‑Time In‑Full)</div>
          <div className="space-y-3 text-sm">
            {[["Alpha Textiles", 92], ["Nova Electronics", 88], ["Urban Home Co.", 76]].map(([k, v]) => (
              <div key={k as string}>
                <div className="mb-1 flex justify-between"><span className="text-ink">{k as string}</span><span className="text-muted">{v as number}%</span></div>
                <div className="h-2 w-full rounded bg-ink/10"><div className="h-full rounded bg-primary" style={{ width: `${v}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Quality Incidents</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead><tr className="text-muted"><th className="py-2 px-3">Supplier</th><th className="py-2 px-3">Incidents</th><th className="py-2 px-3">Notes</th></tr></thead>
              <tbody>
                {[["Alpha Textiles","1","Seam defects"],["Nova Electronics","2","DoA devices"],["Urban Home Co.","0","—"]].map((r,i)=>(
                  <tr key={i} className="border-t border-line/60"><td className="py-2 px-3">{r[0]}</td><td className="py-2 px-3">{r[1]}</td><td className="py-2 px-3">{r[2]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Cost Changes</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[12, 8, 4].map((h,i)=>(<div key={i} className="w-12 rounded-md bg-primary/70" style={{ height: `${h}%` }} />))}
          </div>
          <div className="text-[11px] text-muted">Recent % cost changes by category.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Compliance Checklist</div>
          <ul className="space-y-2 text-sm">
            {["Signed SLA", "Insurance verified", "Ethical sourcing docs"].map((t)=>(
              <li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2">
                <span className="text-ink">{t}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Complete</span>
              </li>
            ))}
          </ul>
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

