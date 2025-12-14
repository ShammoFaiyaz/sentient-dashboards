"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useNicheRole } from "@/components/niche/useNicheRole";
import {
  TableCard,
  BarChartCard,
  DonutCard,
  ListCard,
  CalendarCard,
  StatGridCard,
} from "@/components/logistics/LogisticsWidgets";

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

export default function LogisticsNetworkOverviewPage() {
  const { agents } = useAgents();
  const config = NICHES["logistics-dashboard"];
  const roleLabel = useNicheRole("logistics-dashboard", "Operations Manager");
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent (TOP) */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agent</h2>
          <p className="text-xs text-muted">
            Network Overview Agent — summarizes utilization, risks, and opportunities across the full logistics network.
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
        <Kpi label="Shipments In Network" value="4,862" hint="all statuses" colorHex="#004AAD" />
        <Kpi label="Network OTIF" value="95.4%" hint="last 30 days" colorHex="#008C74" />
        <Kpi label="At-Risk Hubs" value="5" hint="congestion or staffing" colorHex="#EF4444" />
        <Kpi label="Avg Transit Time" value="3.8d" hint="door-to-door median" colorHex="#6D28D9" />
      </div>

      {/* Rich dummy sections (16) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <TableCard
          title="Node Throughput"
          columns={["Node", "Inbound", "Outbound", "Utilization"]}
          rows={[
            ["DC-East", "1,420", "1,180", "86%"],
            ["DC-West", "980", "1,050", "79%"],
            ["Crossdock-North", "640", "630", "91%"],
          ]}
          caption="Yesterday’s volume across key hubs."
        />
        <BarChartCard
          title="Lane Utilization"
          caption="Dummy distribution of utilization across top 5 lanes."
        />
        <DonutCard
          title="Mode Mix"
          caption="Share of ocean, air, road, and rail movements this month."
        />
        <TableCard
          title="Disruption Feed"
          columns={["Type", "Region", "Impact"]}
          rows={[
            ["Weather", "US Midwest", "Snow slowing road transit"],
            ["Port Congestion", "Rotterdam", "2–3 day delay risk"],
            ["Strike", "FR Rail", "Service reduced 40%"],
          ]}
          caption="Aggregated signals coming into the control tower."
        />
        <ListCard
          title="Network Alerts"
          items={[
            "Lane LA → Dallas at 97% capacity for next 3 days.",
            "Ocean lane Shanghai → LA drifting 2 days late on average.",
            "Hub DC-East at 92% storage utilization.",
          ]}
        />
        <CalendarCard title="Planned Network Changes" />
        <StatGridCard
          title="Service Tiers by Region"
          stats={[
            { label: "North America Premium", value: "78% lanes" },
            { label: "EMEA Premium", value: "64% lanes" },
            { label: "APAC Premium", value: "52% lanes" },
            { label: "Rest of World", value: "31% lanes" },
          ]}
        />
        <TableCard
          title="Lane Cost Snapshot"
          columns={["Lane", "Cost / Shipment", "Cost / Kg"]}
          rows={[
            ["NYC → LA (Road)", "$182", "$0.42"],
            ["Shanghai → LA (Ocean)", "$940", "$0.21"],
            ["Frankfurt → JFK (Air)", "$1,820", "$1.34"],
          ]}
        />
        <ListCard
          title="Emissions Highlights"
          items={[
            "Top 3 lanes account for 41% of total emissions.",
            "Air moves are 9% of volume but 46% of emissions.",
            "Two ocean lanes moved to slower, greener service this quarter.",
          ]}
        />
        <BarChartCard
          title="Lead Time Variability"
          caption="Illustrative spread of lead times for selected corridors."
        />
        <TableCard
          title="Redundancy Score"
          columns={["Region", "Alt. Carriers", "Alt. Modes"]}
          rows={[
            ["North America", "High", "Medium"],
            ["Europe", "Medium", "High"],
            ["APAC", "Low", "Low"],
          ]}
        />
        <ListCard
          title="In-Flight Network Projects"
          items={[
            "Add regional hub in Mexico for nearshoring flows.",
            "Pilot rail service for EU cross-border traffic.",
            "Consolidate two overlapping ocean lanes from Asia.",
          ]}
        />
        <StatGridCard
          title="Data Quality Score"
          stats={[
            { label: "Tracking events completeness", value: "96%" },
            { label: "ETA updates within SLA", value: "93%" },
            { label: "Shipment master data", value: "98%" },
            { label: "Carrier status latency", value: "7 min" },
          ]}
        />
        <TableCard
          title="Customer Heatmap (Top 5)"
          columns={["Customer", "Shipments (30d)", "Primary Lane"]}
          rows={[
            ["Retailer A", "1,240", "LA → Dallas"],
            ["Retailer B", "980", "DC-East → NYC"],
            ["Manufacturer C", "760", "Shanghai → LA"],
          ]}
        />
        <ListCard
          title="Network Risk Watchlist"
          items={[
            "Atlantic hurricane season starting in 3 weeks.",
            "Truckload capacity tightening in US Southeast.",
            "Customs rule change proposed for EU exports.",
          ]}
        />
      </div>
    </div>
  );
}


