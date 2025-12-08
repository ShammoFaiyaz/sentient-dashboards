"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function InventoryPage() {
  const { agents } = useAgents();
  const config = NICHES["retail-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  type Row = { item: string; sku: string; qty: string; status: string };
  const [rows, setRows] = React.useState<Row[]>([
    { item: "Cotton T‑Shirt", sku: "TSH‑001", qty: "124", status: "In Stock" },
    { item: "Bluetooth Headset", sku: "ELE‑441", qty: "0", status: "Out of Stock" },
    { item: "Coffee Maker", sku: "HOME‑882", qty: "18", status: "Low Stock" },
  ]);
  const [open, setOpen] = React.useState(false);
  const [editIdx, setEditIdx] = React.useState<number | null>(null);
  const [form, setForm] = React.useState<Row>({ item: "", sku: "", qty: "", status: "" });

  // Proposals table state
  type ProposalRow = { sku: string; qty: string; eta: string; note: string };
  const [propRows, setPropRows] = React.useState<ProposalRow[]>([
    { sku: "TSH‑001", qty: "300", eta: "2 days", note: "Refill fast sellers" },
    { sku: "ELE‑441", qty: "200", eta: "3 days", note: "Recover stockout" },
    { sku: "HOME‑882", qty: "120", eta: "2 days", note: "Support weekend promo" },
  ]);
  const [propOpen, setPropOpen] = React.useState(false);
  const [propIdx, setPropIdx] = React.useState<number | null>(null);
  const [propForm, setPropForm] = React.useState<ProposalRow>({ sku: "", qty: "", eta: "", note: "" });

  function onRowClick(i: number) {
    setEditIdx(i);
    setForm(rows[i]);
    setOpen(true);
  }
  function save() {
    if (editIdx === null) return;
    const next = [...rows];
    next[editIdx] = form;
    setRows(next);
    setOpen(false);
  }

  function onPropRowClick(i: number) {
    setPropIdx(i);
    setPropForm(propRows[i]);
    setPropOpen(true);
  }
  function saveProp() {
    if (propIdx === null) return;
    const next = [...propRows];
    next[propIdx] = propForm;
    setPropRows(next);
    setPropOpen(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agent</h2>
          <p className="text-xs text-muted">Inventory Agent — flags low stock, predicts demand, and suggests restocks.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Items In Stock" value="12,840" hint="across categories" colorHex="#004AAD" />
        <Kpi label="Out of Stock" value="42" hint="requires action" colorHex="#EF4444" />
        <Kpi label="Low Stock Items" value="318" hint="< 7 days cover" colorHex="#6D28D9" />
      </div>

      {/* Inventory list */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Inventory List</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Item</th>
                <th className="py-2 px-3">SKU</th>
                <th className="py-2 px-3">Qty</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={i}
                  className="border-t border-line/60 hover:bg-zinc-50 cursor-pointer"
                  onClick={() => onRowClick(i)}
                >
                  <td className="py-2 px-3">{r.item}</td>
                  <td className="py-2 px-3">{r.sku}</td>
                  <td className="py-2 px-3">{r.qty}</td>
                  <td className="py-2 px-3">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top sellers + restock alerts */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Top Selling Products</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[38, 32, 24, 18, 12].map((h, i) => (
              <div key={i} className="w-10 rounded-md bg-primary/70" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="text-[11px] text-muted">Unit sales in the last 7 days for top 5 products.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Restock Alerts</div>
          <ul className="space-y-2">
            {["HEADSET ELE‑441 at 0 stock — expedite order.", "HOME‑882 below par; reorder 60 units.", "TSH‑001 nearing threshold in 5 stores."].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI auto‑replenishment proposals */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Auto‑Replenishment Proposals</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">SKU</th>
                <th className="py-2 px-3">Qty</th>
                <th className="py-2 px-3">ETA</th>
                <th className="py-2 px-3">Note</th>
              </tr>
            </thead>
            <tbody>
              {propRows.map((r, i) => (
                <tr
                  key={i}
                  className="border-t border-line/60 hover:bg-zinc-50 cursor-pointer"
                  onClick={() => onPropRowClick(i)}
                >
                  <td className="py-2 px-3">{r.sku}</td>
                  <td className="py-2 px-3">{r.qty}</td>
                  <td className="py-2 px-3">{r.eta}</td>
                  <td className="py-2 px-3">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-[11px] text-muted mt-2">Proposals generated by Inventory Agent using demand forecasts and lead times.</div>
      </div>

      {/* Edit modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-[min(640px,92vw)] rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-md">
            <div className="mb-3 text-lg font-semibold text-primary">Edit Inventory Item</div>
            <form className="grid gap-3 md:grid-cols-2">
              <label className="text-sm">
                <div className="mb-1 text-muted">Item</div>
                <input className="w-full rounded-md border border-line px-3 py-2 text-sm" value={form.item} onChange={(e) => setForm({ ...form, item: e.target.value })} />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">SKU</div>
                <input className="w-full rounded-md border border-line px-3 py-2 text-sm" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Qty</div>
                <input className="w-full rounded-md border border-line px-3 py-2 text-sm" value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Status</div>
                <select className="w-full rounded-md border border-line px-3 py-2 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>In Stock</option>
                  <option>Low Stock</option>
                  <option>Out of Stock</option>
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

      {/* Proposals edit modal */}
      {propOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setPropOpen(false)} />
          <div className="relative z-10 w-[min(640px,92vw)] rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-md">
            <div className="mb-3 text-lg font-semibold text-primary">Edit Replenishment Proposal</div>
            <form className="grid gap-3 md:grid-cols-2">
              <label className="text-sm">
                <div className="mb-1 text-muted">SKU</div>
                <input className="w-full rounded-md border border-line px-3 py-2 text-sm" value={propForm.sku} onChange={(e) => setPropForm({ ...propForm, sku: e.target.value })} />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Qty</div>
                <input className="w-full rounded-md border border-line px-3 py-2 text-sm" value={propForm.qty} onChange={(e) => setPropForm({ ...propForm, qty: e.target.value })} />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">ETA</div>
                <input className="w-full rounded-md border border-line px-3 py-2 text-sm" value={propForm.eta} onChange={(e) => setPropForm({ ...propForm, eta: e.target.value })} />
              </label>
              <label className="text-sm md:col-span-2">
                <div className="mb-1 text-muted">Note</div>
                <input className="w-full rounded-md border border-line px-3 py-2 text-sm" value={propForm.note} onChange={(e) => setPropForm({ ...propForm, note: e.target.value })} />
              </label>
            </form>
            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-md border border-line px-4 py-2 text-sm" onClick={() => setPropOpen(false)}>Cancel</button>
              <button className="rounded-md bg-primary text-white px-4 py-2 text-sm" onClick={saveProp}>Save changes</button>
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
