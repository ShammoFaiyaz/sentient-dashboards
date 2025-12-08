"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function CustomerBillingPage() {
  const { agents } = useAgents();
  const config = NICHES["insurance-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured agents */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agents</h2>
          <p className="text-xs text-muted">
            Update payment methods, set auto‑pay, and download receipts—assistants streamline your billing.
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
        <Kpi label="Outstanding Balance" value="$92.00" hint="due this month" colorHex="#EF4444" />
        <Kpi label="Auto‑pay" value="Enabled" hint="Visa ••42" colorHex="#008C74" />
        <Kpi label="Invoices (YTD)" value="12" hint="issued" colorHex="#004AAD" />
        <Kpi label="Refunds (YTD)" value="$18.00" hint="processed" colorHex="#6D28D9" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Invoices */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Invoices</div>
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
                {[
                  ["INV-90231", "Jan 2025", "$92.00", "Paid"],
                  ["INV-89714", "Dec 2024", "$92.00", "Paid"],
                  ["INV-89102", "Nov 2024", "$92.00", "Overdue"],
                ].map((r, i) => (
                  <tr key={i} className="border-t border-line/60">
                    {r.map((c, j) => (
                      <td key={j} className="py-2 px-3">
                        {c}
                      </td>
                    ))}
                    <td className="py-2 px-3">
                      {r[3] === "Overdue" ? (
                        <button className="rounded-md bg-primary text-white px-3 py-1 text-xs">Pay now</button>
                      ) : (
                        <button className="rounded-md border border-line px-3 py-1 text-xs">Receipt</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-[11px] text-muted">All recent invoices with quick actions.</div>
        </div>

        {/* Payment method */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Payment Method</div>
          <form className="space-y-2">
            <label className="text-sm block">
              <div className="mb-1 text-muted">Card holder</div>
              <input className="w-full rounded-md border border-line px-3 py-2 text-sm" placeholder="Alex Rivera" />
            </label>
            <label className="text-sm block">
              <div className="mb-1 text-muted">Card number</div>
              <input className="w-full rounded-md border border-line px-3 py-2 text-sm" placeholder="4242 4242 4242 4242" />
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="text-sm">
                <div className="mb-1 text-muted">Expiry</div>
                <input className="w-full rounded-md border border-line px-3 py-2 text-sm" placeholder="02/27" />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">CVC</div>
                <input className="w-full rounded-md border border-line px-3 py-2 text-sm" placeholder="123" />
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[11px] text-muted">We do not store sensitive card details.</div>
              <button type="button" className="rounded-md bg-primary text-white px-4 py-2 text-sm">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Spending trend and autopay */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Premium Spend Trend</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="0" y1="100" x2="320" y2="100" />
              </g>
              <polyline
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                points="10,90 50,80 90,75 130,70 170,75 210,65 250,60 290,55"
              />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Monthly premiums over time across policies.</div>
        </div>

        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Auto‑Pay</div>
          <ul className="space-y-2">
            {[
              "Auto‑pay is enabled for Auto policy (••42).",
              "Configure reminders 3 days before due date.",
              "Switch payment method anytime from this page.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <button className="rounded-md border border-line px-3 py-1 text-xs">Disable auto‑pay</button>
          </div>
        </div>
      </div>
      
      {/* More billing details */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Saved Methods</div>
          <ul className="space-y-2 text-sm">
            {[
              "Visa ••42 (default)",
              "Mastercard ••77",
              "Bank account ••01",
            ].map((t) => (
              <li key={t} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-ink">{t}</span>
                </div>
                <button className="rounded-md border border-line px-3 py-1 text-xs">Set default</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Adjustments & Refunds</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Reason</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["2024‑12‑03", "Prorated refund", "-$12.50", "Completed"],
                  ["2024‑10‑15", "Discount applied", "-$5.00", "Completed"],
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
          <div className="mt-2 text-[11px] text-muted">Recent billing adjustments on your account.</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Notifications & Reminders</div>
          <ul className="space-y-2">
            {[
              "Reminder 3 days before due date",
              "Email receipts after payment",
              "Monthly statement summary",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <button className="rounded-md border border-line px-3 py-1 text-xs">Manage preferences</button>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Projected Yearly Spend</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="0" y1="100" x2="320" y2="100" />
              </g>
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                points="10,95 60,92 110,90 160,86 210,80 260,78 310,75"
              />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Forecast based on current policies and billing cadence.</div>
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
