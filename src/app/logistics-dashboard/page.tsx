"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
      <div className="text-2xl font-semibold" style={{ color: colorHex }}>
        {value}
      </div>
      <div className="text-xs text-neutral-600">{hint}</div>
    </div>
  );
}

export default function LogisticsDashboard() {
  const { agents } = useAgents();
  const config = NICHES["logistics-dashboard"];
  const roleLabel = useNicheRole("logistics-dashboard", "Operations Manager");
  const pathname = usePathname() || "";
  const featured = React.useMemo(
    () => agentsForNicheAndRole("logistics-dashboard", agents, { roleLabel }).slice(0, 3),
    [agents, roleLabel],
  );

  function renderRoleKpis() {
    switch (roleLabel) {
      case "Operations Manager":
        return (
          <>
            <KpiCard label="Shipments In Transit" value="1,284" hint="all modes" colorHex="#004AAD" />
            <KpiCard label="OTIF" value="96.2%" hint="on-time in-full (7d)" colorHex="#008C74" />
            <KpiCard label="Active Exceptions" value="42" hint="needs triage" colorHex="#EF4444" />
            <KpiCard label="Avg Linehaul Utilization" value="88%" hint="last 24h" colorHex="#6D28D9" />
          </>
        );
      case "Warehouse Supervisor":
        return (
          <>
            <KpiCard label="Lines Picked / Hr" value="1,920" hint="all shifts" colorHex="#004AAD" />
            <KpiCard label="Order Fill Rate" value="98.7%" hint="yesterday" colorHex="#008C74" />
            <KpiCard label="Dock-to-Stock Time" value="2.4h" hint="avg receiving" colorHex="#6D28D9" />
            <KpiCard label="Pick Accuracy" value="99.2%" hint="scanned vs expected" colorHex="#F4B23E" />
          </>
        );
      case "Distributions Operator":
        return (
          <>
            <KpiCard label="Stops Today" value="34" hint="assigned route" colorHex="#004AAD" />
            <KpiCard label="On-Time Deliveries" value="94%" hint="today so far" colorHex="#008C74" />
            <KpiCard label="Packages Remaining" value="18" hint="before end of route" colorHex="#6D28D9" />
            <KpiCard label="Safety Events" value="0" hint="harsh events today" colorHex="#EF4444" />
          </>
        );
      case "Admin":
      default:
        return (
          <>
            <KpiCard label="Network OTIF" value="95.4%" hint="rolling 30 days" colorHex="#004AAD" />
            <KpiCard label="Cost / Shipment" value="$18.40" hint="all-in avg" colorHex="#008C74" />
            <KpiCard label="Open Incidents" value="27" hint="compliance + safety" colorHex="#EF4444" />
            <KpiCard label="Utilized Capacity" value="84%" hint="across lanes" colorHex="#6D28D9" />
          </>
        );
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <WelcomeBanner />

      {/* KPI cards (role-aware) */}
      <div className="mt-4 grid gap-3 md:grid-cols-4">{renderRoleKpis()}</div>

      {/* Logistics news carousel */}
      <div className="mt-6">
        <NewsCarousel />
      </div>

      {/* Featured agents (BOTTOM) */}
      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">
              {roleLabel === "Admin"
                ? "Network Control Agent — cost, capacity, and compliance snapshots for the full network."
                : roleLabel === "Operations Manager"
                ? "Control Tower Agent — exceptions, carrier performance, and proactive rerouting suggestions."
                : roleLabel === "Warehouse Supervisor"
                ? "Warehouse Flow Agent — dock utilization, slotting, and labor balance across shifts."
                : "Route Companion Agent — last‑mile ETAs, exceptions, and customer updates for today’s route."}
            </p>
          </div>
          <Link
            href="/logistics-dashboard/agents"
            className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            View all agents
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.length > 0 ? (
            featured.map((a) => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)
          ) : (
            <div className="rounded-2xl border border-line/60 bg-white p-5 text-sm text-muted">
              No agents configured; placeholder card.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


