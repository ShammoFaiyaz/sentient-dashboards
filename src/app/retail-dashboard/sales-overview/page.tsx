"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function SalesOverviewPage() {
  const { agents } = useAgents();
  const config = NICHES["retail-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  type Row = { id: string; time: string; amount: string; category: string; status: string };
  const [rows, setRows] = React.useState<Row[]>([
    { id: "TX‑90231", time: "10:22 AM", amount: "$128.40", category: "Apparel", status: "Completed" },
    { id: "TX‑89714", time: "10:05 AM", amount: "$349.00", category: "Electronics", status: "Completed" },
    { id: "TX‑89102", time: "09:58 AM", amount: "$42.15", category: "Beauty", status: "Refunded" },
  ]);
  const [open, setOpen] = React.useState(false);
  const [idx, setIdx] = React.useState<number | null>(null);
  const [form, setForm] = React.useState<Row>({ id: "", time: "", amount: "", category: "", status: "" });
  function onRow(i: number) {
    setIdx(i);
    setForm(rows[i]);
    setOpen(true);
  }
  function save() {
    if (idx === null) return;
    const next = [...rows];
    next[idx] = form;
    setRows(next);
    setOpen(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agent</h2>
          <p className="text-xs text-muted">Store Insights Agent — highlights sales anomalies, channel mix, and promo impact.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Daily Sales" value="$182k" hint="POS + online" colorHex="#004AAD" />
        <Kpi label="Weekly Sales" value="$1.2M" hint="WTD" colorHex="#008C74" />
        <Kpi label="Refunds Today" value="$3.2k" hint="processed" colorHex="#EF4444" />
      </div>

      {/* Transactions table */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Sales Transactions</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">ID</th>
                <th className="py-2 px-3">Time</th>
                <th className="py-2 px-3">Amount</th>
                <th className="py-2 px-3">Category</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-line/60 hover:bg-zinc-50 cursor-pointer" onClick={() => onRow(i)}>
                  <td className="py-2 px-3">{r.id}</td>
                  <td className="py-2 px-3">{r.time}</td>
                  <td className="py-2 px-3">{r.amount}</td>
                  <td className="py-2 px-3">{r.category}</td>
                  <td className="py-2 px-3">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment methods donut + alerts */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Payment Methods Breakdown</div>
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
          <div className="text-[11px] text-muted">Card • Wallet • Cash (dummy distribution).</div>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Sales Alerts</div>
          <ul className="space-y-2">
            {[
              "Spike in refunds in Electronics — review reasons.",
              "Apparel conversion improved +0.7% after promo.",
              "Wallet payments increased 12% WoW.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI-driven actions */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">AI Price Suggestions</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">SKU</th>
                  <th className="py-2 px-3">Current</th>
                  <th className="py-2 px-3">Suggested</th>
                  <th className="py-2 px-3">Reason</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["TSH‑001", "$14.90", "$15.50", "High conversion; raise by 4%"],
                  ["ELE‑441", "$39.00", "$36.90", "Competitor discount detected"],
                  ["HOME‑882", "$59.00", "$57.50", "Elasticity improvement"],
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
          <div className="text-[11px] text-muted mt-2">Generated by Pricing Agent using competitor and elasticity signals.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Anomaly Detection</div>
          <ul className="space-y-2">
            {["Unusual refund spike at Store #18 (Beauty).", "Basket size dip in online channel after 6 PM.", "Potential coupon misuse pattern flagged."].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Edit modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-[min(720px,92vw)] rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-md">
            <div className="mb-3 text-lg font-semibold text-primary">Edit Transaction</div>
            <form className="grid gap-3 md:grid-cols-3">
              <label className="text-sm">
                <div className="mb-1 text-muted">ID</div>
                <input className="w-full rounded-md border border-line px-3 py-2 text-sm" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Time</div>
                <input className="w-full rounded-md border border-line px-3 py-2 text-sm" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Amount</div>
                <input className="w-full rounded-md border border-line px-3 py-2 text-sm" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
              </label>
              <label className="text-sm md:col-span-2">
                <div className="mb-1 text-muted">Category</div>
                <input className="w-full rounded-md border border-line px-3 py-2 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Status</div>
                <select className="w-full rounded-md border border-line px-3 py-2 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Completed</option>
                  <option>Refunded</option>
                  <option>Pending</option>
                </select>
              </label>
            </form>
            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-md border border-line px-4 py-2 text-sm" onClick={() => setOpen(false)}>Cancel</button>
              <button className="rounded-md bg-primary text-white px-4 py-2 text-sm" onClick={save}>Save changes</button>
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


