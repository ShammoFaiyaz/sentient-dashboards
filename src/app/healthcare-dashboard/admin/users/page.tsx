"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

type User = { name: string; role: string; status: string; lastActive: string };

export default function HealthcareAdminUsers() {
  const { agents } = useAgents();
  const config = NICHES["healthcare-dashboard"];
  const featured = agentsForNicheAndRole("healthcare-dashboard", agents, {
    suRole: "admin",
  }).slice(0, 3);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<User | null>(null);
  const rows: User[] = [
    { name: "Alex Rivera", role: "Doctor", status: "Active", lastActive: "10:21" },
    { name: "Rina Patel", role: "Patient", status: "Active", lastActive: "09:15" },
    { name: "Sam Lee", role: "Staff", status: "Suspended", lastActive: "Yesterday" },
    { name: "T. Nguyen", role: "Patient", status: "Pending", lastActive: "—" },
  ];

  function openEdit(u: User) {
    setSelected(u);
    setEditOpen(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted mt-0.5">Admin Control Agent — assists with user provisioning, access anomalies, and audit trails.</p>
          </div>
          <a href="/healthcare-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            View all agents
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Total Users" value="14,220" hint="system‑wide" colorHex="#004AAD" />
        <Kpi label="Doctors" value="1,180" hint="active" colorHex="#008C74" />
        <Kpi label="Patients" value="12,640" hint="registered" colorHex="#6D28D9" />
        <Kpi label="Pending Verifications" value="22" hint="action needed" colorHex="#F4B23E" />
      </div>

      {/* Filters */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="grid gap-3 md:grid-cols-4">
          <label className="text-sm md:col-span-2">
            <div className="mb-1 text-muted">Search</div>
            <input className="w-full rounded-md border border-line px-3 py-2 text-sm" placeholder="Search users…" />
          </label>
          <label className="text-sm">
            <div className="mb-1 text-muted">Role</div>
            <select className="w-full rounded-md border border-line px-3 py-2 text-sm">
              <option>All</option>
              <option>Doctor</option>
              <option>Patient</option>
              <option>Staff</option>
            </select>
          </label>
          <label className="text-sm">
            <div className="mb-1 text-muted">Status</div>
            <select className="w-full rounded-md border border-line px-3 py-2 text-sm">
              <option>All</option>
              <option>Active</option>
              <option>Suspended</option>
              <option>Pending</option>
            </select>
          </label>
        </div>
      </div>

      {/* Users table */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Users</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Role</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Last Active</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={i}
                  className="border-t border-line/60 cursor-pointer hover:bg-primary/5"
                  onClick={() => openEdit(r)}
                >
                  <td className="py-2 px-3">{r.name}</td>
                  <td className="py-2 px-3">{r.role}</td>
                  <td className="py-2 px-3">{r.status}</td>
                  <td className="py-2 px-3">{r.lastActive}</td>
                  <td className="py-2 px-3">
                    <div className="flex gap-2">
                      <button className="rounded-md border border-line px-3 py-1 text-xs">Edit</button>
                      <button className="rounded-md bg-primary text-white px-3 py-1 text-xs">Reset</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin controls & insights */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Admin Alerts</div>
          <ul className="space-y-2">
            {[
              "5 new user sign‑ups waiting for verification.",
              "2 suspended accounts require review.",
              "Doctor onboarding training overdue for 3 users.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Role Permissions Matrix</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Role</th>
                  <th className="py-2 px-3">Patients</th>
                  <th className="py-2 px-3">Records</th>
                  <th className="py-2 px-3">Billing</th>
                  <th className="py-2 px-3">Admin</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Doctor", "Read/Write", "Read", "Read", "—"],
                  ["Patient", "Self", "Self", "Self", "—"],
                  ["Staff", "Read", "Read/Write", "Read", "—"],
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
          <div className="text-sm font-semibold text-primary mb-2">Bulk Actions</div>
          <div className="flex flex-wrap gap-2 text-sm">
            {["Suspend", "Reset MFA", "Require Password Change", "Verify Accounts", "Export CSV"].map((b) => (
              <button key={b} className="rounded-md border border-line px-3 py-1">{b}</button>
            ))}
          </div>
          <div className="text-[11px] text-muted mt-2">Applies to selected filters.</div>
        </div>

        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">User Activity Insights</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="0" y1="100" x2="320" y2="100" />
              </g>
              <polyline fill="none" stroke="#2563EB" strokeWidth="2" points="10,95 30,88 50,80 70,72 90,65 110,60 130,58 150,60 170,66 190,74 210,82 230,88 250,92 270,95 290,96" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Active sessions and sign‑in volume (last 14 days).</div>
        </div>

        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Verification Queue</div>
          <ul className="space-y-2 text-sm">
            {[
              "M. Gomez — Patient — ID Verification",
              "B. Singh — Doctor — License Check",
              "K. Tan — Patient — Insurance Proof",
            ].map((t) => (
              <li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2">
                <span className="text-ink">{t}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Review</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Edit modal */}
      {editOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={() => setEditOpen(false)}>
          <div className="w-full max-w-lg rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 text-sm font-semibold text-primary">Edit User</div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm">
                <div className="mb-1 text-muted">Name</div>
                <input defaultValue={selected.name} className="w-full rounded-md border border-line px-3 py-2 text-sm" />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Role</div>
                <select defaultValue={selected.role} className="w-full rounded-md border border-line px-3 py-2 text-sm">
                  <option>Doctor</option>
                  <option>Patient</option>
                  <option>Staff</option>
                  <option>Admin</option>
                </select>
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Status</div>
                <select defaultValue={selected.status} className="w-full rounded-md border border-line px-3 py-2 text-sm">
                  <option>Active</option>
                  <option>Suspended</option>
                  <option>Pending</option>
                </select>
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Last Active</div>
                <input defaultValue={selected.lastActive} className="w-full rounded-md border border-line px-3 py-2 text-sm" />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-md border border-line px-3 py-1 text-sm" onClick={() => setEditOpen(false)}>Cancel</button>
              <button className="rounded-md bg-primary text-white px-3 py-1 text-sm" onClick={() => setEditOpen(false)}>Save</button>
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

