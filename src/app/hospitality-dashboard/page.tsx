"use client";

import * as React from "react";
import Link from "next/link";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import NewsCarousel from "@/components/news/NewsCarousel";
import WelcomeBanner from "@/components/topbar/WelcomeBanner";
import { useNicheRole } from "@/components/niche/useNicheRole";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

function KpiCard({ label, value, hint, colorHex }: { label: string; value: string; hint: string; colorHex: string }) {
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

export default function HospitalityDashboard() {
  const { agents } = useAgents();
  const config = NICHES["hospitality-dashboard"];
  const role = useNicheRole("hospitality-dashboard", "Guest");
  const featured = agentsForNicheAndRole("hospitality-dashboard", agents, { roleLabel: role }).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <WelcomeBanner />
      {/* KPI Card Row (role‑aware) */}
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {role === "Admin" ? (
          <>
            <KpiCard label="Total Guests Today" value="412" hint="checked‑in + arrivals" colorHex="#004AAD" />
            <KpiCard label="Total Staff On Duty" value="86" hint="across departments" colorHex="#008C74" />
            <KpiCard label="System Alerts" value="3" hint="requires review" colorHex="#EF4444" />
            <KpiCard label="Open Issues" value="14" hint="maintenance + service" colorHex="#6D28D9" />
          </>
        ) : role === "Front Desk" ? (
          <>
            <KpiCard label="Due Check‑ins" value="132" hint="today" colorHex="#004AAD" />
            <KpiCard label="Due Check‑outs" value="118" hint="today" colorHex="#008C74" />
            <KpiCard label="Late Check‑outs" value="9" hint="approved" colorHex="#6D28D9" />
            <KpiCard label="Rooms Ready" value="320" hint="ready to assign" colorHex="#F4B23E" />
          </>
        ) : role === "Ops Manager" ? (
          <>
            <KpiCard label="Occupancy" value="82%" hint="current" colorHex="#004AAD" />
            <KpiCard label="ADR" value="$168" hint="avg daily rate" colorHex="#008C74" />
            <KpiCard label="RevPAR" value="$138" hint="per available room" colorHex="#6D28D9" />
            <KpiCard label="Open Issues" value="14" hint="maintenance + service" colorHex="#EF4444" />
          </>
        ) : (
          <>
            <KpiCard label="Upcoming Stay" value="Feb 12–15" hint="3 nights • Deluxe King" colorHex="#004AAD" />
            <KpiCard label="Loyalty Points" value="18,450" hint="Gold tier" colorHex="#008C74" />
            <KpiCard label="Outstanding Bills" value="$0.00" hint="this trip" colorHex="#EF4444" />
            <KpiCard label="Completed Stays" value="14" hint="lifetime" colorHex="#6D28D9" />
          </>
        )}
      </div>

      {/* Hospitality news carousel */}
      <div className="mt-0">
        <NewsCarousel />
      </div>

      {/* Featured Agent (BOTTOM) — SU-style */}
      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">
              {role === "Admin"
                ? "Operational Master Agent — oversees system health, permissions, and escalations."
                : role === "Front Desk"
                ? "Front Desk Agent — speeds up lookups, arrivals, and quick issue triage."
                : role === "Ops Manager"
                ? "Operations Insights Agent — highlights bottlenecks, staffing, and forecasted risks."
                : "Guest Experience Agent — personalization across stays, offers, and preferences."}
            </p>
          </div>
          <Link href="/hospitality-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            View all agents
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.length > 0 ? (
            featured.map((a) => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)
          ) : (
            <div className="rounded-2xl border border-line/60 bg-white p-5 text-sm text-muted">No agent configured; placeholder card.</div>
          )}
        </div>
      </section>
    </div>
  );
}
