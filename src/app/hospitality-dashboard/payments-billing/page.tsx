"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

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

export default function HospitalityPaymentsBillingPage() {
  const { agents } = useAgents();
  const config = NICHES["hospitality-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Billing Helper Agent — reconciles charges, applies rewards, and prepares invoices.</p>
          </div>
          <a href="/hospitality-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)}
        </div>
      </section>

      {/* KPI Cards */}
      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Outstanding Bills" value="$0.00" hint="this trip" colorHex="#EF4444" />
        <Kpi label="Paid This Stay" value="$628.40" hint="including tax" colorHex="#008C74" />
        <Kpi label="Refunds" value="$0.00" hint="processed in 5–7 days" colorHex="#6D28D9" />
      </div>

      {/* Billing history table */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Billing History</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Description</th>
                <th className="py-2 px-3">Amount</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Feb 02, 2025", "Room charge — Deluxe King", "$420.00", "Paid"],
                ["Feb 02, 2025", "Dinner — Tasting Menu", "$96.00", "Paid"],
                ["Feb 01, 2025", "Airport pickup", "$36.40", "Paid"],
              ].map((r, i) => (
                <tr key={i} className="border-t border-line/60">{r.map((c, j) => <td key={j} className="py-2 px-3">{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trend + Category spend */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Billing Trend (6 Months)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">{[20,40,60,80,100].map((y,i)=>(<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g>
              <g stroke="#cbd5e1"><line x1="30" y1="10" x2="30" y2="110" /><line x1="30" y1="110" x2="300" y2="110" /></g>
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="30,96 60,92 90,84 120,86 150,82 180,78 210,74 240,80 270,76 300,72" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Total billed per month including taxes and fees.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Spend by Category</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[50, 34, 28, 18].map((h, i) => <div key={i} className="w-10 rounded-md bg-primary/70" style={{ height: `${h}%` }} />)}
          </div>
          <div className="text-[11px] text-muted">Room • food • transport • services</div>
        </div>
      </div>

      {/* Saved methods + Invoice highlights */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Saved Payment Methods</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between"><span className="text-ink">Visa **** 1428</span><span className="text-muted">Default</span></div>
            <div className="flex items-center justify-between"><span className="text-ink">Mastercard **** 9055</span><button className="rounded-md border border-line px-2 py-1 text-xs">Make default</button></div>
            <div className="flex items-center justify-between"><span className="text-ink">Apple Pay</span><button className="rounded-md border border-line px-2 py-1 text-xs">Remove</button></div>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Invoice Highlights</div>
          <ul className="space-y-2">
            {["Loyalty discount applied: $24.00", "City tax capped at $18.40", "No minibar charges this stay"].map((t)=>(
              <li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-ink">{t}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Extra detailed sections (6) – local helper, not exported
function PaymentsBillingExtraSections() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Charge Breakdown (This Stay)</div>
        <ul className="space-y-2 text-sm">
          {["Room: $420.00", "Dining: $96.00", "Transport: $36.40", "Fees & Taxes: $76.00"].map((t)=>(
            <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Wallet Impact Forecast</div>
        <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
          <svg viewBox="0 0 320 120" className="w-full h-full">
            <g stroke="#e5e7eb">{[20,40,60,80,100].map((y,i)=>(<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g>
            <g stroke="#cbd5e1"><line x1="30" y1="10" x2="30" y2="110" /><line x1="30" y1="110" x2="300" y2="110" /></g>
            <polyline fill="none" stroke="#F59E0B" strokeWidth="2" points="30,92 60,90 90,88 120,86 150,84 180,82 210,78 240,74 270,70 300,68" />
          </svg>
        </div>
        <div className="text-[11px] text-muted">Projected spend vs. budget remainder.</div>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Policy & Limits</div>
        <table className="w-full text-left text-sm">
          <thead><tr className="text-muted"><th className="py-2 px-2">Item</th><th className="py-2 px-2">Value</th></tr></thead>
          <tbody>
            {[
              ["Daily incidental cap", "$50.00"],
              ["Deposit hold", "$120.00"],
              ["Late checkout fee", "$30.00/hr"],
            ].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-2">{r[0]}</td><td className="py-2 px-2">{r[1]}</td></tr>))}
          </tbody>
        </table>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Anomalies Scanner</div>
        <ul className="space-y-2 text-sm">
          {["No minibar charges detected", "Tax line matches jurisdiction", "All tips within 18–22% band"].map((t)=>(
            <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Auto‑Apply Rewards (Preview)</div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between"><span className="text-muted">Nights multiplier</span><span className="text-ink">x2 (promo)</span></div>
          <div className="flex items-center justify-between"><span className="text-muted">Dining partner</span><span className="text-ink">+3x points</span></div>
          <div className="flex items-center justify-between"><span className="text-muted">Upgrade credit</span><span className="text-ink">$20.00</span></div>
        </div>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Invoice Export Center</div>
        <div className="space-y-2 text-sm">
          <button className="rounded-md border border-line px-2 py-1 text-xs">Export PDF</button>
          <button className="rounded-md border border-line px-2 py-1 text-xs">Email to Employer</button>
          <button className="rounded-md border border-line px-2 py-1 text-xs">Send to Accounting App</button>
        </div>
      </div>
    </div>
  );
}
