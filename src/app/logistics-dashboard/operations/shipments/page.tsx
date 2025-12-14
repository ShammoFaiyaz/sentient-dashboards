"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";
import {
  TableCard,
  BarChartCard,
  DonutCard,
  ListCard,
  CalendarCard,
  StatGridCard,
  FormCard,
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

export default function LogisticsShipmentsPage() {
  const { agents } = useAgents();
  const config = NICHES["logistics-dashboard"];
  const featured = agentsForNicheAndRole("logistics-dashboard", agents, { roleLabel: "Operations Manager" }).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent (TOP) */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agent</h2>
          <p className="text-xs text-muted">
            Inventory Visibility Agent — surfaces where inventory is and which orders are at risk.
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
        <Kpi label="Open Shipments" value="1,284" hint="in flight" colorHex="#004AAD" />
        <Kpi label="Orders Shipped Today" value="6,420" hint="all channels" colorHex="#008C74" />
        <Kpi label="Blocked Orders" value="27" hint="data or compliance" colorHex="#EF4444" />
        <Kpi label="Tracking Coverage" value="98%" hint="events in last 4h" colorHex="#6D28D9" />
      </div>

      {/* Rich dummy sections (8) tuned for Shipments & Orders */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Full-width operational shipment list */}
        <div className="md:col-span-3">
          <TableCard
            title="Shipment List"
            columns={["Shipment", "Order", "Status", "Mode", "ETA"]}
            rows={[
              ["SH-10293", "ORD-7781", "In transit", "Road", "Today 14:20"],
              ["SH-10271", "ORD-7774", "Delayed", "Ocean", "Fri"],
              ["SH-10244", "ORD-7760", "At risk", "Air", "Tomorrow 09:10"],
            ]}
            caption="Operational grid of open shipments and their linked orders."
          />
        </div>

        {/* Order allocation & mode mix */}
        <div className="md:col-span-2">
          <TableCard
            title="Order Allocation"
            columns={["Lane", "Orders", "Shipments", "Fill %"]}
            rows={[
              ["LA → Dallas", "82", "16", "94%"],
              ["DC-East → NYC", "64", "12", "89%"],
              ["Shanghai → LA", "48", "10", "92%"],
            ]}
            caption="How orders are grouped into shipments across key lanes."
          />
        </div>
        <DonutCard
          title="Mode Choice"
          caption="Share of orders moved by road, air, ocean, and parcel this week."
        />

        {/* Booking status and documentation health */}
        <BarChartCard
          title="Booking Status"
          caption="Illustrative mix of confirmed, pending, and failed bookings."
        />
        <TableCard
          title="Documentation Panel"
          columns={["Doc Type", "Complete", "Missing / Error"]}
          rows={[
            ["Bills of lading", "96%", "4%"],
            ["Labels", "99%", "1%"],
            ["Customs docs", "93%", "7%"],
          ]}
          caption="High-level view of documentation readiness for outbound loads."
        />

        {/* Time windows */}
        <CalendarCard title="Pickup & Delivery Windows" />
      </div>
    </div>
  );
}


