"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function StaffShiftsPage() {
  const { agents } = useAgents();
  const config = NICHES["retail-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  type Row = { name: string; role: string; shift: string; status: string };
  const [rows, setRows] = React.useState<Row[]>([
    { name: "Alex Rivera", role: "Cashier", shift: "9:00 AM – 5:00 PM", status: "On duty" },
    { name: "Rina Patel", role: "Floor Associate", shift: "10:00 AM – 6:00 PM", status: "On duty" },
    { name: "Sam Lee", role: "Stock", shift: "12:00 PM – 8:00 PM", status: "Absent" },
    { name: "Jin Park", role: "Supervisor", shift: "8:00 AM – 4:00 PM", status: "On duty" },
    { name: "Priya N.", role: "Cashier", shift: "1:00 PM – 9:00 PM", status: "Off duty" },
    { name: "Marcus B.", role: "Floor Associate", shift: "7:00 AM – 3:00 PM", status: "On duty" },
  ]);
  const [open, setOpen] = React.useState(false);
  const [idx, setIdx] = React.useState<number | null>(null);
  const [form, setForm] = React.useState<Row>({ name: "", role: "", shift: "", status: "" });
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
          <p className="text-xs text-muted">Staff Scheduling Agent — suggests optimal staffing levels and resolves conflicts.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Staff On Duty" value="38" hint="current shift" colorHex="#004AAD" />
        <Kpi label="Shifts Today" value="72" hint="across roles" colorHex="#008C74" />
        <Kpi label="Absences" value="3" hint="reported" colorHex="#EF4444" />
      </div>

      {/* Staff list */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Staff List</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-base">
            <thead>
              <tr className="text-muted">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Shift</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-line/60 hover:bg-zinc-50 cursor-pointer" onClick={() => onRow(i)}>
                  <td className="py-3 px-4">{r.name}</td>
                  <td className="py-3 px-4">{r.role}</td>
                  <td className="py-3 px-4">{r.shift}</td>
                  <td className="py-3 px-4">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role distribution + alerts */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Role Distribution</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="24" />
              <g transform="rotate(-90 100 100)">
                <circle cx="100" cy="100" r="60" fill="none" stroke="#60A5FA" strokeWidth="24" strokeDasharray="110 260" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#34D399" strokeWidth="24" strokeDasharray="80 290" strokeDashoffset="-110" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#FBBF24" strokeWidth="24" strokeDasharray="60 310" strokeDashoffset="-190" />
              </g>
              <circle cx="100" cy="100" r="40" fill="white" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Cashier • Floor • Stock (dummy distribution).</div>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">HR Alerts</div>
          <ul className="space-y-2">
            {[
              "Three overtime approvals pending.",
              "Shift swap requested for tomorrow evening.",
              "Two training certifications expiring this week.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI scheduling helpers */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Traffic Forecast (Next 24h)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="0" y1="100" x2="320" y2="100" />
              </g>
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="10,95 40,92 70,90 100,88 130,80 160,70 190,66 220,72 250,78 280,86 310,92" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Projected foot traffic to guide staffing per hour.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">AI Shift Recommendations</div>
          <ul className="space-y-2">
            {["Add 2 cashiers between 6–8 PM based on forecast.", "Move 1 stock associate to floor from 2–4 PM.", "Schedule training at 10 AM on low‑traffic window."].map((t) => (
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
            <div className="mb-3 text-lg font-semibold text-primary">Edit Staff Entry</div>
            <form className="grid gap-3 md:grid-cols-2">
              <label className="text-sm">
                <div className="mb-1 text-muted">Name</div>
                <input className="w-full rounded-md border border-line px-3 py-2 text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Role</div>
                <input className="w-full rounded-md border border-line px-3 py-2 text-sm" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
              </label>
              <label className="text-sm md:col-span-2">
                <div className="mb-1 text-muted">Shift (e.g., 9:00 AM – 5:00 PM)</div>
                <input className="w-full rounded-md border border-line px-3 py-2 text-sm" value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value })} />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Status</div>
                <select className="w-full rounded-md border border-line px-3 py-2 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>On duty</option>
                  <option>Off duty</option>
                  <option>Absent</option>
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

