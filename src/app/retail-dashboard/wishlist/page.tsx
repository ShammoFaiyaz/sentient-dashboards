"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function RetailCustomerWishlistPage() {
  const { agents } = useAgents();
  const config = NICHES["retail-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agent</h2>
          <p className="text-xs text-muted">Shopping Insights Agent — tracks price drops and stock availability.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-2">
        <Kpi label="Total Saved" value="22" hint="wishlist items" colorHex="#004AAD" />
        <Kpi label="In‑Stock Items" value="14" hint="available now" colorHex="#008C74" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Wishlist</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Price</th>
                  <th className="py-2 px-3">Stock</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Cotton T‑Shirt", "$14.90", "In Stock"],
                  ["Bluetooth Headset", "$39.00", "Out of Stock"],
                  ["Coffee Maker", "$59.00", "In Stock"],
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
          <div className="text-sm font-semibold text-ink mb-2">Wishlist Category Breakdown</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[36, 28, 22, 14].map((h, i) => (
              <div key={i} className="w-10 rounded-md bg-primary/70" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="text-[11px] text-muted">Apparel • Electronics • Home • Beauty.</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Wishlist Notes</div>
        <ul className="space-y-2">
          {["2 items dropped in price this week.", "3 items restocked in your size.", "Consider bundle for kitchen items."].map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* AI helpers for savings */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Discount Code Scanner</div>
          <div className="grid gap-2 md:grid-cols-3">
            <label className="text-sm md:col-span-2">
              <div className="mb-1 text-muted">Websites to scan</div>
              <input className="w-full rounded-md border border-line px-3 py-2 text-sm" placeholder="e.g., couponfollow.com, deals.example" defaultValue="coupons.example, retailmenot.com" />
            </label>
            <div className="flex items-end">
              <button className="w-full rounded-md bg-primary text-white px-4 py-2 text-sm">Scan now</button>
            </div>
          </div>
          <div className="mt-3 text-sm">
            <div className="text-muted text-xs mb-1">Found codes (dummy):</div>
            <ul className="space-y-1">
              {["WELCOME15 • 15% off first order", "BUNDLE5 • $5 off bundles"].map((r) => (
                <li key={r} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-ink">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Smart Bundle Suggestions</div>
          <ul className="space-y-2">
            {["Coffee Maker + Filters → save $8", "T‑Shirt 2‑pack → save 12%", "Headset + Case → free shipping"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
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

