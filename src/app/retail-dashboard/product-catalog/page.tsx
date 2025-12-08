"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function ProductCatalogPage() {
  const { agents } = useAgents();
  const config = NICHES["retail-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agent</h2>
          <p className="text-xs text-muted">Merchandising Agent — assists with catalog curation and category mix.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Total Products" value="8,420" hint="active" colorHex="#004AAD" />
        <Kpi label="New Arrivals" value="120" hint="last 14 days" colorHex="#008C74" />
        <Kpi label="Discontinued Items" value="48" hint="archived" colorHex="#6D28D9" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Product List</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">SKU</th>
                  <th className="py-2 px-3">Price</th>
                  <th className="py-2 px-3">Stock Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Cotton T‑Shirt", "TSH‑001", "$14.90", "In Stock"],
                  ["Bluetooth Headset", "ELE‑441", "$39.00", "Out of Stock"],
                  ["Coffee Maker", "HOME‑882", "$59.00", "Low Stock"],
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
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Category Distribution</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="24" />
              <g transform="rotate(-90 100 100)">
                <circle cx="100" cy="100" r="60" fill="none" stroke="#60A5FA" strokeWidth="24" strokeDasharray="120 250" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#34D399" strokeWidth="24" strokeDasharray="70 300" strokeDashoffset="-120" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#FBBF24" strokeWidth="24" strokeDasharray="60 310" strokeDashoffset="-190" />
              </g>
              <circle cx="100" cy="100" r="40" fill="white" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Share of products across Apparel • Electronics • Home.</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Catalog Alerts</div>
        <ul className="space-y-2">
          {[
            "10 SKUs missing images — add media.",
            "Price conflict on 3 SKUs across channels.",
            "Apparel size guide update required.",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Additional merchandiser sections (no line graphs) */}
      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Attribute Completeness</div>
          <div className="space-y-3 text-sm">
            {[["Images", 86], ["Descriptions", 92], ["Specs", 74], ["Category Tags", 81]].map(([k, v]) => (
              <div key={k as string}>
                <div className="mb-1 flex justify-between"><span className="text-ink">{k as string}</span><span className="text-muted">{v as number}%</span></div>
                <div className="h-2 w-full rounded bg-ink/10"><div className="h-full rounded bg-primary" style={{ width: `${v}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Variant Coverage</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[58, 40, 26].map((h, i) => (
              <div key={i} className="w-12 rounded-md bg-primary/70" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="text-[11px] text-muted">Share of products with size • color • bundle variants.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Content Quality Checklist</div>
          <ul className="space-y-2 text-sm">
            {["Alt text present on images", "Title length within limits", "Bullet points ≥ 3", "No duplicate SKUs"].map((t) => (
              <li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2">
                <span className="text-ink">{t}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">OK</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Top Missing Attributes</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead><tr className="text-muted"><th className="py-2 px-3">Attribute</th><th className="py-2 px-3">Affected SKUs</th></tr></thead>
              <tbody>
                {[["Material", "64"], ["Dimensions", "42"], ["Country of Origin", "28"]].map((r,i)=>(
                  <tr key={i} className="border-t border-line/60"><td className="py-2 px-3">{r[0]}</td><td className="py-2 px-3">{r[1]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
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

