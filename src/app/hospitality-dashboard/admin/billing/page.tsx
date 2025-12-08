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

export default function HospitalityAdminBilling() {
  const { agents } = useAgents();
  const config = NICHES["hospitality-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent at TOP (Admin) */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Revenue Ops Agent — billing rules, anomalies, and integration health.</p>
          </div>
          <Link href="/hospitality-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            View all agents
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Outstanding Invoices" value="$182k" hint="open" colorHex="#004AAD" />
        <Kpi label="Payments Today" value="$64k" hint="processed" colorHex="#008C74" />
        <Kpi label="Refunds Processed" value="$2.4k" hint="today" colorHex="#6D28D9" />
        <Kpi label="Billing Errors" value="6" hint="need review" colorHex="#EF4444" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Billing History</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Date</th><th className="py-2 px-3">Guest</th><th className="py-2 px-3">Total</th><th className="py-2 px-3">Method</th><th className="py-2 px-3">Status</th></tr></thead><tbody>{[["2025‑02‑03","Sofia Rossi","$420","VISA","Paid"],["2025‑02‑03","Noah Martinez","$86","MC","Pending"],["2025‑02‑02","Liam Turner","$128","AMEX","Failed"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))}</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Billing Volume Trend (Last 30 Days)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full"><g stroke="#e5e7eb"><line x1="30" y1="100" x2="300" y2="100" /><line x1="30" y1="60" x2="300" y2="60" /></g><polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="30,90 60,88 90,80 120,86 150,78 180,84 210,76 240,82 270,74 300,70" /></svg>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Billing Integrations Status</div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            {["Gateway A • OK","Terminal Sync • OK","Gateway B • Delay"].map((t)=>(<div key={t} className="rounded-md border border-line/60 p-2">{t}</div>))}
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Refund Requests Needing Action</div>
          <ul className="space-y-2 text-sm">{["INV‑1203 — card failed, guest contacted","INV‑1210 — service charge dispute"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span>{t}</span></li>))}</ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Automated Billing Rules</div>
          <ul className="space-y-2 text-sm">{["Nightly room charge at 23:00","Auto‑retry failed payments at 03:00","Email invoice every checkout"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span>{t}</span></li>))}</ul>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Fraud Detection Summary</div>
        <ul className="space-y-2 text-sm">{["Velocity alert: 3 payments in 2m","Proxy IP flagged for guest #10322"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span>{t}</span></li>))}</ul>
      </div>
    </div>
  );
}

