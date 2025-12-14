"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { TableCard, BarChartCard, DonutCard, ListCard, StatGridCard } from "@/components/logistics/LogisticsWidgets";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

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
      <div className="text-2xl font-semibold" style={{ color: colorHex }}>
        {value}
      </div>
      <div className="text-xs text-neutral-600">{hint}</div>
    </div>
  );
}

export default function LogisticsRoutingPage() {
  const { agents } = useAgents();
  const config = NICHES["logistics-dashboard"];
  const featured = agentsForNicheAndRole("logistics-dashboard", agents, {
    roleLabel: "Operations Manager",
  }).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent (TOP) */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agent</h2>
          <p className="text-xs text-muted">
            Fleet Route Optimizer — builds cost-aware routes that respect SLAs, driver hours, and constraints.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Routes Planned Today" value="184" hint="all depots" colorHex="#004AAD" />
        <Kpi label="Avg Stops / Route" value="18" hint="multi-stop rounds" colorHex="#008C74" />
        <Kpi label="Empty Miles" value="6.8%" hint="of total distance" colorHex="#6D28D9" />
        <Kpi label="Re-optimized Routes" value="22" hint="dynamic adjustments" colorHex="#F4B23E" />
      </div>

      {/* Rich dummy sections (8) tuned for Routing & Modes */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Full-width routing guide */}
        <div className="md:col-span-3">
          <TableCard
            title="Routing Guide"
            columns={["Corridor", "Preferred Mode", "Primary Carrier", "Backup"]}
            rows={[
              ["LA ↔ Dallas", "Road", "Carrier A", "Carrier B"],
              ["DC-East ↔ NYC", "Road", "Carrier B", "Carrier C"],
              ["Shanghai ↔ LA", "Ocean", "Carrier O1", "Carrier O2"],
            ]}
            caption="Preferred lanes, modes, and carriers for the control tower to follow."
          />
        </div>

        {/* Optimization runs + mode shift candidates */}
        <div className="md:col-span-2">
          <TableCard
            title="Recent Optimization Runs"
            columns={["Run ID", "Scope", "Empty Miles Δ", "Status"]}
            rows={[
              ["RT-401", "US Road", "-4.2%", "Applied"],
              ["RT-398", "EU Parcel", "-1.8%", "Applied"],
              ["RT-392", "APAC Air", "-0.6%", "Draft"],
            ]}
            caption="Sample of recent optimization jobs and their outcomes."
          />
        </div>
        <ListCard
          title="Mode Shift Candidates"
          items={[
            "Shift two LA ↔ Dallas lanes from air to road for non-urgent freight.",
            "Move coastal EU moves from truckload to rail where service allows.",
            "Promote ocean-plus-truck for Asia to US interior for selected SKUs.",
          ]}
        />

        {/* Lane balancing + constraints */}
        <BarChartCard
          title="Lane Balancing"
          caption="Illustrative volume vs target balance across key lanes."
        />
        <StatGridCard
          title="Routing Constraints Snapshot"
          stats={[
            { label: "Routes tight vs HOS", value: "12%" },
            { label: "Routes with narrow time windows", value: "28%" },
            { label: "Geo-fenced segments", value: "34" },
            { label: "Toll-sensitive routes", value: "19" },
          ]}
        />

        {/* Re-optimization queue + KPIs */}
        <TableCard
          title="Re-optimization Queue"
          columns={["Route", "Reason", "Age"]}
          rows={[
            ["LA metro last mile", "Traffic spike", "22 min"],
            ["Dallas outbound", "Capacity shift", "45 min"],
            ["EU cross-border", "Weather", "1 h 10 min"],
          ]}
          caption="Routes queued for dynamic re-optimization."
        />
        <StatGridCard
          title="Routing KPIs"
          stats={[
            { label: "On-time arrival (routing dependent)", value: "94.1%" },
            { label: "Avg route distance", value: "284 km" },
            { label: "Empty miles share", value: "6.8%" },
            { label: "Auto-routed volume", value: "71%" },
          ]}
        />

        {/* Additional time-window and overlay sections */}
        <ListCard
          title="Time Window Policies"
          items={[
            "Premium deliveries must hit a 2‑hour delivery window; standard get 4‑hour windows.",
            "Pickup windows are padded by 30 minutes on lanes with chronic congestion.",
            "Night routes avoid residential delivery windows unless customer opts in.",
          ]}
        />
        <TableCard
          title="Traffic & Weather Overlays"
          columns={["Region", "Overlay Source", "Refresh Cadence"]}
          rows={[
            ["US Metro", "Live traffic API", "Every 5 min"],
            ["EU Cross‑border", "Road authority feeds", "Every 15 min"],
            ["Global Ocean", "Port congestion indices", "Hourly"],
          ]}
          caption="Illustrative data feeds used to adjust routing decisions in real time."
        />
      </div>
    </div>
  );
}


