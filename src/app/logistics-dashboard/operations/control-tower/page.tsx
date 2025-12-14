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

export default function LogisticsControlTowerPage() {
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
            Control Tower Agent — surfaces cross-network exceptions, forecasts impact, and suggests playbooks.
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
        <Kpi label="Shipments In Exception" value="42" hint="requires triage" colorHex="#EF4444" />
        <Kpi label="Average Delay" value="26 min" hint="affected shipments" colorHex="#6D28D9" />
        <Kpi label="At-Risk Orders" value="63" hint="risk of SLA miss" colorHex="#004AAD" />
        <Kpi label="Resolved Today" value="118" hint="exceptions cleared" colorHex="#008C74" />
      </div>

      {/* Rich dummy sections (8) with joined tiles */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Full-width live board */}
        <div className="md:col-span-3">
          <TableCard
            title="Live Shipments Board"
            columns={["Shipment", "Status", "Mode", "ETA"]}
            rows={[
              ["SH-10293", "On time", "Road", "Today 14:20"],
              ["SH-10271", "Delayed", "Ocean", "Fri"],
              ["SH-10244", "At risk", "Air", "Tomorrow 09:10"],
            ]}
            caption="Consolidated view of in-flight shipments with high-level status."
          />
        </div>

        {/* Exception queue + critical orders (joined horizontally) */}
        <div className="md:col-span-2">
          <TableCard
            title="Exception Queue"
            columns={["ID", "Type", "Region", "Severity"]}
            rows={[
              ["EX-884", "Port delay", "EU", "High"],
              ["EX-871", "Weather", "US Midwest", "Medium"],
              ["EX-862", "Capacity", "APAC", "Medium"],
            ]}
            caption="Exceptions requiring human attention for delays or holds."
          />
        </div>
        <ListCard
          title="Critical Orders"
          items={[
            "Three platinum customers with shipments at risk of SLA breach.",
            "Two emergency replenishment orders for key SKUs.",
            "One hospital delivery flagged as time-sensitive.",
          ]}
        />

        {/* Regional activity and mode mix */}
        <BarChartCard
          title="Regional Volume Index"
          caption="Relative activity across regions based on shipment count."
        />
        <DonutCard
          title="Mode Mix"
          caption="Share of ocean, air, and road in today’s network moves."
        />
        <TableCard
          title="Carrier Performance Snapshot"
          columns={["Carrier", "OTIF", "Tracking Quality"]}
          rows={[
            ["Carrier A", "97.2%", "High"],
            ["Carrier B", "93.5%", "Medium"],
            ["Carrier C", "88.1%", "Low"],
          ]}
          caption="Today’s composite view of top carriers."
        />

        {/* Capacity & service summary (joined horizontally) */}
        <div className="md:col-span-2">
          <StatGridCard
            title="Capacity & Utilization"
            stats={[
              { label: "Road capacity used", value: "82%" },
              { label: "Ocean capacity used", value: "76%" },
              { label: "Air capacity used", value: "64%" },
              { label: "Rail capacity used", value: "58%" },
            ]}
          />
        </div>
        <StatGridCard
          title="Service Level Summary"
          stats={[
            { label: "Global OTIF (7d)", value: "95.4%" },
            { label: "Avg delay (impacted)", value: "28 min" },
            { label: "Exceptions / 100 shipments", value: "3.1" },
            { label: "Automation coverage", value: "72%" },
          ]}
        />
      </div>
    </div>
  );
}

