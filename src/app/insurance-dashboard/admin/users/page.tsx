"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function InsuranceAdminUsersPage() {
  const { agents } = useAgents();
  const config = NICHES["insurance-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  type UserRow = { name: string; email: string; role: string; status: string };
  const [rows, setRows] = React.useState<UserRow[]>([
    { name: "Alex Rivera", email: "alex@example.com", role: "Admin", status: "Active" },
    { name: "Rina Patel", email: "rina@example.com", role: "Claims Adjuster", status: "Active" },
    { name: "Sam Lee", email: "sam@example.com", role: "Underwriter", status: "Invited" },
  ]);
  const [open, setOpen] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [form, setForm] = React.useState<UserRow>({ name: "", email: "", role: "Admin", status: "Active" });

  function openModal(index: number) {
    setEditIndex(index);
    setForm(rows[index]);
    setOpen(true);
  }

  function saveModal() {
    if (editIndex === null) return;
    const next = [...rows];
    next[editIndex] = form;
    setRows(next);
    setOpen(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured agents */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium text-primary">Featured Agents</h2>
          <p className="text-xs text-muted">
            Accelerate admin tasks—invite users, manage roles, and audit activity with assistant help.
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
        <Kpi label="Total Users" value="1,420" hint="org‑wide" colorHex="#004AAD" />
        <Kpi label="Pending Invites" value="6" hint="awaiting accept" colorHex="#6D28D9" />
        <Kpi label="Suspended" value="3" hint="policy breaches" colorHex="#EF4444" />
        <Kpi label="MFA Enabled" value="92%" hint="security coverage" colorHex="#008C74" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {/* Users table */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Users</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Email</th>
                  <th className="py-2 px-3">Role</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={i}
                    className="border-t border-line/60 hover:bg-zinc-50 cursor-pointer"
                    onClick={() => openModal(i)}
                  >
                    <td className="py-2 px-3">{r.name}</td>
                    <td className="py-2 px-3">{r.email}</td>
                    <td className="py-2 px-3">{r.role}</td>
                    <td className="py-2 px-3">{r.status}</td>
                    <td className="py-2 px-3">
                      <div className="flex gap-2">
                        <button
                          className="rounded-md border border-line px-3 py-1 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(i);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="rounded-md bg-primary text-white px-3 py-1 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            // demo reset
                            alert("Password reset link sent.");
                          }}
                        >
                          Reset
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-[11px] text-muted">Manage roles, invitations, and status.</div>
        </div>

        {/* Roles distribution */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Roles Distribution</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              <circle cx="100" cy="100" r="70" fill="#93C5FD" />
              <path d="M100,30 A70,70 0 0,1 175,115 L100,100Z" fill="#A7F3D0" />
              <path d="M100,100 L175,115 A70,70 0 0,1 60,160 Z" fill="#FDE68A" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Share of Admin, Claims, and Underwriting users.</div>
          <ul className="mt-3 space-y-1">
            {["Admins", "Claims Adjusters", "Underwriters"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Invitations and audit */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Invite User</div>
          <form className="space-y-2">
            <label className="text-sm block">
              <div className="mb-1 text-muted">Email</div>
              <input className="w-full rounded-md border border-line px-3 py-2 text-sm" placeholder="name@example.com" />
            </label>
            <label className="text-sm block">
              <div className="mb-1 text-muted">Role</div>
              <select className="w-full rounded-md border border-line px-3 py-2 text-sm">
                <option>Admin</option>
                <option>Claims Adjuster</option>
                <option>Underwriter</option>
              </select>
            </label>
            <div className="flex justify-end">
              <button type="button" className="rounded-md bg-primary text-white px-4 py-2 text-sm">Send invite</button>
            </div>
          </form>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Recent Activity</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Time</th>
                  <th className="py-2 px-3">User</th>
                  <th className="py-2 px-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["10:21", "Alex Rivera", "Updated role for Sam Lee → Underwriter"],
                  ["09:03", "System", "Invitation sent to rina@example.com"],
                  ["Yesterday", "Rina Patel", "Logged in from new device"],
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
          <div className="mt-2 text-[11px] text-muted">Audit trail of recent administrative actions.</div>
        </div>
      </div>

      {/* Edit modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-[min(640px,92vw)] rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-md">
            <div className="mb-3 text-lg font-semibold text-primary">Edit User</div>
            <form className="grid gap-3 md:grid-cols-2">
              <label className="text-sm">
                <div className="mb-1 text-muted">Name</div>
                <input
                  className="w-full rounded-md border border-line px-3 py-2 text-sm"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Email</div>
                <input
                  className="w-full rounded-md border border-line px-3 py-2 text-sm"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Role</div>
                <select
                  className="w-full rounded-md border border-line px-3 py-2 text-sm"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option>Admin</option>
                  <option>Claims Adjuster</option>
                  <option>Underwriter</option>
                </select>
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Status</div>
                <select
                  className="w-full rounded-md border border-line px-3 py-2 text-sm"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option>Active</option>
                  <option>Invited</option>
                  <option>Suspended</option>
                </select>
              </label>
            </form>
            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-md border border-line px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="rounded-md bg-primary text-white px-4 py-2 text-sm" onClick={saveModal}>
                Save changes
              </button>
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

