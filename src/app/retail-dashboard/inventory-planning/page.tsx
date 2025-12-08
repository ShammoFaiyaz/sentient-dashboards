"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function InventoryPlanningPage() {
  const { agents } = useAgents();
  const config = NICHES["retail-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agent</h2>
          <p className="text-xs text-muted">Demand Forecast Agent — suggests restocks and highlights forecast error.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-2">
        <Kpi label="Forecasted Demand" value="▲ 6.4%" hint="next 14 days" colorHex="#004AAD" />
        <Kpi label="Restock Needed" value="142 SKUs" hint="by end of week" colorHex="#6D28D9" />
      </div>

      {/* Restock recommendations */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Restock Recommendations</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Item</th>
                <th className="py-2 px-3">SKU</th>
                <th className="py-2 px-3">Suggested Qty</th>
                <th className="py-2 px-3">Reason</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Cotton T‑Shirt", "TSH‑001", "300", "Low days cover"],
                ["Bluetooth Headset", "ELE‑441", "200", "Back in demand"],
                ["Coffee Maker", "HOME‑882", "120", "Promo uplift"],
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

      {/* Forecast accuracy + alerts */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Forecast Accuracy</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[82, 84, 78, 86, 80].map((h, i) => (
              <div key={i} className="w-10 rounded-md bg-primary/70" style={{ height: `${Math.max(10, h/1.2)}%` }} />
            ))}
          </div>
          <div className="text-[11px] text-muted">Weekly MAPE‑based accuracy trend (higher is better).</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Planning Alerts</div>
          <ul className="space-y-2">
            {[
              "Electronics demand spike forecast for Super Weekend.",
              "Apparel lead time extended by 2 days — adjust orders.",
              "Consider pull‑forward for Coffee Maker before promo.",
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
          <div className="text-sm font-semibold text-ink mb-2">Safety Stock Coverage</div>
          <div className="space-y-3 text-sm">
            {[["Apparel", 18], ["Electronics", 12], ["Home", 22]].map(([k, v]) => (
              <div key={k as string}>
                <div className="mb-1 flex justify-between"><span className="text-ink">{k as string}</span><span className="text-muted">{v as number} days</span></div>
                <div className="h-2 w-full rounded bg-ink/10"><div className="h-full rounded bg-primary" style={{ width: `${(v as number) * 3}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Backorder Risk</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead><tr className="text-muted"><th className="py-2 px-3">SKU</th><th className="py-2 px-3">Risk</th><th className="py-2 px-3">Reason</th></tr></thead>
            <tbody>
              {[["ELE‑441","High","Stockout + promo"],["TSH‑001","Medium","Low cover"],["HOME‑882","Low","Stable demand"]].map((r,i)=>(
                <tr key={i} className="border-t border-line/60"><td className="py-2 px-3">{r[0]}</td><td className="py-2 px-3">{r[1]}</td><td className="py-2 px-3">{r[2]}</td></tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Warehouse Capacity</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="24" />
              <g transform="rotate(-90 100 100)">
                <circle cx="100" cy="100" r="60" fill="none" stroke="#34D399" strokeWidth="24" strokeDasharray="200 170" />
              </g>
              <circle cx="100" cy="100" r="40" fill="white" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Utilization across DCs (dummy gauge).</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Aging Inventory</div>
          <ul className="space-y-2 text-sm">
            {["Apparel — 14% > 90 days","Electronics — 6% > 60 days","Home — 9% > 120 days"].map((t)=>(
              <li key={t} className="flex items-center gap-2 rounded-md border border-line/60 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-primary" /><span className="text-ink">{t}</span>
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

