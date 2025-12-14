"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { TableCard, BarChartCard, ListCard, StatGridCard } from "@/components/logistics/LogisticsWidgets";
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

export default function LogisticsServicePerformancePage() {
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
            Carrier Performance Analyst — benchmarks carriers by on-time, damage rate, and cost per mile.
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
        <Kpi label="Global OTIF" value="95.4%" hint="rolling 30 days" colorHex="#004AAD" />
        <Kpi label="Damage Rate" value="0.7%" hint="claims as % of shipments" colorHex="#EF4444" />
        <Kpi label="Avg Delay" value="22 min" hint="late shipments" colorHex="#6D28D9" />
        <Kpi label="Customer Ticket Rate" value="0.3%" hint="tickets per shipment" colorHex="#008C74" />
      </div>

      {/* Rich dummy sections (8) tuned for Service Performance */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* OTIF by lane full-width */}
        <div className="md:col-span-3">
          <TableCard
            title="OTIF by Lane"
            columns={["Lane", "OTIF (30d)", "Trend vs Prior", "Shipments"]}
            rows={[
              ["LA → Dallas", "96.2%", "+0.8%", "1,240"],
              ["DC-East → NYC", "94.1%", "-0.4%", "980"],
              ["Shanghai → LA", "92.7%", "+1.1%", "760"],
            ]}
            caption="On-time in-full performance broken down by key lanes."
          />
        </div>

        {/* OTIF by customer + delay reasons */}
        <div className="md:col-span-2">
          <TableCard
            title="OTIF by Customer"
            columns={["Customer", "OTIF (30d)", "Late Shipments"]}
            rows={[
              ["Retailer A", "97.4%", "18"],
              ["Retailer B", "94.9%", "24"],
              ["Marketplace C", "92.1%", "31"],
            ]}
            caption="Service performance for top strategic customers."
          />
        </div>
        <ListCard
          title="Top Delay Reasons"
          items={[
            "Weather-related road closures on US Midwest lanes.",
            "Port congestion causing late departures on Asia–US routes.",
            "Late pickup from origin facilities on select corridors.",
          ]}
        />

        {/* Damage + regional view */}
        <BarChartCard
          title="Damage Rate by Product Family"
          caption="Illustrative damage and claims rate across key product groups."
        />
        <BarChartCard
          title="Regional Performance Snapshot"
          caption="Dummy comparison of OTIF and delay minutes by region."
        />

        {/* Tickets, SLAs, and improvement plan */}
        <ListCard
          title="Customer Tickets & SLA Watchlist"
          items={[
            "Five open tickets linked to repeated late deliveries in EU North.",
            "Two key customers approaching SLA breach thresholds.",
            "One carrier flagged for high claims frequency this quarter.",
          ]}
        />
        <StatGridCard
          title="Service Health Summary"
          stats={[
            { label: "Global OTIF (90d)", value: "94.7%" },
            { label: "Average damage rate", value: "0.7%" },
            { label: "Tickets per 1,000 shipments", value: "3.2" },
            { label: "Recoveries successfully processed", value: "89%" },
          ]}
        />

        <ListCard
          title="Service Improvement Plan"
          items={[
            "Tighten cutoff times and handoff checks for high-risk hubs.",
            "Expand proactive ETA notifications for premium customers.",
            "Pilot additional packaging standards on fragile SKUs.",
          ]}
        />
        <TableCard
          title="Recovery Actions"
          columns={["Case ID", "Issue", "Action", "Status"]}
          rows={[
            ["RC-1042", "Late delivery", "Fee waiver", "Completed"],
            ["RC-1038", "Damaged goods", "Replacement shipment", "In progress"],
            ["RC-1029", "Missed pickup", "Credit note", "Completed"],
          ]}
          caption="Illustrative examples of compensations and remediation steps taken."
        />
      </div>
    </div>
  );
}


