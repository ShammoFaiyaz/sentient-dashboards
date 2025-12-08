"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import Link from "next/link";

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

export default function RetailAdminProducts() {
  const { agents } = useAgents();
  const config = NICHES["retail-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Catalog Quality Agent — flags media, pricing, and metadata issues with suggested fixes.</p>
          </div>
          <Link href="/retail-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>
      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Active Products" value="8,420" hint="catalog" colorHex="#004AAD" />
        <Kpi label="Issues Found" value="64" hint="media, pricing, metadata" colorHex="#EF4444" />
        <Kpi label="New This Week" value="220" hint="ingested" colorHex="#008C74" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Products</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Name</th><th className="py-2 px-3">SKU</th><th className="py-2 px-3">Category</th><th className="py-2 px-3">Price</th><th className="py-2 px-3">Status</th></tr></thead><tbody>{
              [["Cotton T‑Shirt","TSH‑001","Apparel","$14.90","Active"],["Bluetooth Headset","ELE‑441","Electronics","$39.00","Active"],["Coffee Maker","HOME‑882","Home","$59.00","Active"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Product Mix by Category</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[34,28,20,14,6].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}}/>))}</div>
          <div className="text-[11px] text-muted">Share of SKU count across categories.</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Notes</div>
        <ul className="space-y-2">
          {["10 SKUs missing images — auto‑request sent.","3 pricing anomalies detected by rules engine.","Migrate 2 legacy categories to consolidated taxonomy."].map((t)=>(<li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>))}
        </ul>
      </div>

      {/* Additional admin controls */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Approval Queue</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">SKU</th><th className="py-2 px-3">Change</th><th className="py-2 px-3">Action</th></tr></thead><tbody>{
              [["TSH‑001","Price ↓ $1","Approve/Reject"],["ELE‑441","New images","Approve/Reject"],["HOME‑882","Copy update","Approve/Reject"]].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-3">{r[0]}</td><td className="py-2 px-3">{r[1]}</td><td className="py-2 px-3"><button className="rounded-md border border-line px-2 py-0.5 mr-2">Approve</button><button className="rounded-md border border-line px-2 py-0.5">Reject</button></td></tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Rules & Toggles</div>
          <ul className="space-y-2 text-sm">
            {["Auto‑reject missing main image","Enforce min price margin 12%","Prevent duplicate titles","Require category mapping"].map((t)=>(
              <li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2">
                <span className="text-ink">{t}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Enabled</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Extra admin controls (dummy sections) */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Pricing Rules Panel</div>
          <ul className="space-y-2 text-sm">
            {["Enforce MAP by brand","Auto‑round prices to .99","Block price drops > 25% without approval"].map((t)=>(
              <li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2"><span className="text-ink">{t}</span><span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Enabled</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Media Quality Issues</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">SKU</th><th className="py-2 px-3">Issue</th><th className="py-2 px-3">Owner</th></tr></thead><tbody>{
              [["TSH‑001","Low resolution image","Content"],["ELE‑441","Missing alt text","Content"],["HOME‑882","No lifestyle image","Content"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Category Health</div>
          <div className="mt-2 h-40 border border-line/60 rounded-md p-3 flex items-end gap-3">{[88,76,69,92,81].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-emerald-500/70" style={{height:`${h/2}%`}}/>))}</div>
          <div className="text-[11px] text-muted">Quality score by category (images, data, price completeness).</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Bulk Price Update</div>
          <div className="grid gap-2 md:grid-cols-3">
            <select className="rounded-md border border-line px-3 py-2 text-sm"><option>All Categories</option><option>Apparel</option><option>Electronics</option><option>Home</option></select>
            <input className="rounded-md border border-line px-3 py-2 text-sm" placeholder="% change e.g. +5 or -3" />
            <button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:opacity-90">Preview</button>
          </div>
          <div className="text-[11px] text-muted mt-2">Preview shows affected SKUs before applying.</div>
        </div>
      </div>
    </div>
  );
}

