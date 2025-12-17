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

      {/* Additional Routing & Modes visuals */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Mode split donut: Road / Air / Sea / Rail */}
        <DonutCard
          title="Mode Split"
          caption="Illustrative share of volume across road, air, sea, and rail."
        />

        {/* Active routes with cost & ETA comparison */}
        <TableCard
          title="Active Routes — Cost & ETA"
          columns={["Route", "Mode", "Cost / Shipment", "ETA", "Alt. Option"]}
          rows={[
            ["LA → Dallas", "Road", "$420", "2 days", "Rail: $360, 3 days"],
            ["Rotterdam → Berlin", "Rail", "€310", "1.5 days", "Road: €340, 1 day"],
            ["Shanghai → LA", "Sea", "$1,280", "14 days", "Air: $4,900, 2 days"],
          ]}
          caption="Side‑by‑side view of current routes and plausible alternates."
        />

        {/* Bar chart: Cost by Transport Mode */}
        <BarChartCard
          title="Cost by Transport Mode"
          caption="Relative spend mix across road, air, sea, and rail."
        />

        {/* Route congestion risk panel */}
        <StatGridCard
          title="Route Congestion Risk"
          stats={[
            { label: "High‑risk corridors", value: "7" },
            { label: "Moderate‑risk corridors", value: "18" },
            { label: "Avg delay on impacted lanes", value: "32 min" },
            { label: "Shipments affected (today)", value: "214" },
          ]}
        />

        {/* Rerouting recommendations (dummy AI text) */}
        <ListCard
          title="Rerouting Recommendations"
          items={[
            "Shift non-urgent LA → Dallas freight to rail overnight to reduce cost by ~14%.",
            "Use alternate border crossing on EU northbound traffic during evening peak hours.",
            "Promote sea‑air combo for select APAC lanes where SLAs allow +3 days of transit.",
          ]}
          caption="Dummy AI-style suggestions based on congestion and cost patterns."
        />

        {/* Fuel surcharge impact */}
        <StatGridCard
          title="Fuel Surcharge Impact"
          stats={[
            { label: "Avg surcharge vs baseline", value: "+8.3%" },
            { label: "Road lanes above +10%", value: "5" },
            { label: "Sea contracts with indexed fuel", value: "73%" },
            { label: "Est. weekly cost impact", value: "$184k" },
          ]}
        />
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

        {/* Re-optimization queue */}
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


