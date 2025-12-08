"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function GuestDirectoryPage() {
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
            <p className="text-xs text-muted">Guest Lookup Agent — quick search and guest history at a glance.</p>
          </div>
          <a href="/hospitality-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards — SU style */}
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="In‑house Guests" value="412" hint="currently checked in" colorHex="#004AAD" />
        <Kpi label="Due Arrivals Today" value="38" hint="remaining arrivals" colorHex="#6D28D9" />
        <Kpi label="Check‑ins Completed" value="126" hint="so far today" colorHex="#008C74" />
        <Kpi label="Check‑outs Completed" value="118" hint="so far today" colorHex="#F4B23E" />
      </div>

      {/* Search */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="text-sm md:col-span-2">
            <div className="mb-1 text-muted">Search guests</div>
            <input className="w-full rounded-md border border-line px-3 py-2 text-sm" placeholder="Name, room, note…" />
          </label>
          <label className="text-sm">
            <div className="mb-1 text-muted">Status</div>
            <select className="w-full rounded-md border border-line px-3 py-2 text-sm">
              <option>All</option>
              <option>In‑house</option>
              <option>Checked‑out</option>
              <option>Due arrival</option>
            </select>
          </label>
        </div>
      </div>

      {/* Guests table */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Guests</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Room</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Alex Rivera", "1203", "In‑house", "VIP; Late checkout approved"],
                ["Rina Patel", "1602", "Due arrival", "Needs baby crib"],
                ["Sam Lee", "803", "Checked‑out", "Asked for invoice by email"],
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

      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Important Notes</div>
        <ul className="space-y-2">
          {[
            "Anniversary celebration for room 1401 — arrange flowers.",
            "Two airport pickups scheduled at 7 PM.",
            "Language preference: French for guest in room 903.",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Extra detailed sections (6) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">VIP Watchlist</div>
          <ul className="space-y-2 text-sm">
            {["Rivera, Alex — Gold", "Patel, Rina — Platinum", "Lee, Sam — Silver"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Guest Sentiment Trend</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full"><g stroke="#e5e7eb">{[20,40,60,80,100].map((y,i)=>(<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g><g stroke="#cbd5e1"><line x1="30" y1="10" x2="30" y2="110" /><line x1="30" y1="110" x2="300" y2="110" /></g><polyline fill="none" stroke="#10B981" strokeWidth="2" points="30,90 60,92 90,86 120,82 150,78 180,76 210,74 240,72 270,70 300,68" /></svg>
          </div>
          <div className="text-[11px] text-muted">Composite from recent feedback.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Preference Cohorts</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">High floor</div><div className="text-xl font-semibold text-primary">38%</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Quiet side</div><div className="text-xl font-semibold text-primary">29%</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Late checkout</div><div className="text-xl font-semibold text-primary">41%</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Vegetarian</div><div className="text-xl font-semibold text-primary">12%</div></div>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Recently Contacted</div>
          <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-2">Guest</th><th className="py-2 px-2">Method</th><th className="py-2 px-2">Time</th></tr></thead><tbody>{[["A. Rivera","SMS","09:05"],["R. Patel","Email","08:52"],["S. Lee","Call","08:35"]].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-2">{r[0]}</td><td className="py-2 px-2">{r[1]}</td><td className="py-2 px-2">{r[2]}</td></tr>))}</tbody></table>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Follow‑up Reminders</div>
          <ul className="space-y-2 text-sm">
            {["Confirm crib for 1205", "Set arrival note for 1802 (late)", "Add preferences for 1610"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">ID & Verification</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between"><span className="text-muted">Pending KYC</span><span className="text-ink">3</span></div>
            <div className="flex items-center justify-between"><span className="text-muted">Flagged duplicates</span><span className="text-ink">1</span></div>
            <div className="flex items-center justify-between"><span className="text-muted">Verified this week</span><span className="text-ink">42</span></div>
          </div>
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

