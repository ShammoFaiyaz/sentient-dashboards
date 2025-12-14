"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import {
  TableCard,
  BarChartCard,
  DonutCard,
  ListCard,
  CalendarCard,
  StatGridCard,
} from "@/components/logistics/LogisticsWidgets";
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

export default function LogisticsInboundOutboundPage() {
  const { agents } = useAgents();
  const config = NICHES["logistics-dashboard"];
  const featured = agentsForNicheAndRole("logistics-dashboard", agents, {
    roleLabel: "Warehouse Supervisor",
  }).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent (TOP) */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agent</h2>
          <p className="text-xs text-muted">
            Dock Scheduling Assistant — optimizes dock appointments to reduce yard congestion and dwell.
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
        <Kpi label="Inbound Today" value="84" hint="trucks scheduled" colorHex="#004AAD" />
        <Kpi label="Outbound Today" value="76" hint="departures scheduled" colorHex="#008C74" />
        <Kpi label="Avg Turn Time" value="62 min" hint="gate-in to gate-out" colorHex="#6D28D9" />
        <Kpi label="Late Arrivals" value="9" hint="past 30 min window" colorHex="#EF4444" />
      </div>

      {/* Rich dummy sections (10) for Inbound & Outbound */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* 1. Full-width inbound schedule */}
        <div className="md:col-span-3">
          <TableCard
            title="Inbound Appointments"
            columns={["Time", "Dock", "Carrier", "Status"]}
            rows={[
              ["08:15", "D1", "Carrier A", "Checked-in"],
              ["08:45", "D3", "Carrier B", "At gate"],
              ["09:10", "D2", "Carrier C", "Delayed"],
            ]}
            caption="Scheduled inbound trucks and their appointment windows."
          />
        </div>

        {/* 2–3. Outbound schedule + yard queue */}
        <div className="md:col-span-2">
          <TableCard
            title="Outbound Appointments"
            columns={["Time", "Dock", "Destination", "Status"]}
            rows={[
              ["10:00", "D5", "Dallas DC", "Loading"],
              ["10:30", "D4", "LA Store 18", "Staged"],
              ["11:15", "D6", "Phoenix DC", "Planned"],
            ]}
            caption="Departures and required departure times by dock."
          />
        </div>
        <ListCard
          title="Yard Queue"
          items={[
            "Trailer TR-184 waiting 12 min for door assignment.",
            "Live load TR-201 queued behind late inbound.",
            "Drop trailer TR-176 ready to be pulled to D2.",
          ]}
        />

        {/* 4–5. Turn time + door utilization */}
        <BarChartCard
          title="Turn Time by Dock"
          caption="Illustrative gate‑in to gate‑out times for active docks."
        />
        <BarChartCard
          title="Door Utilization"
          caption="Relative utilization of dock doors over the last shift."
        />

        {/* 6–7. Drop vs live loads + appointment adherence */}
        <DonutCard
          title="Drop vs Live Loads"
          caption="Mix of drop trailers vs live loading for today’s schedule."
        />
        <StatGridCard
          title="Appointment Adherence"
          stats={[
            { label: "On‑time arrivals", value: "82%" },
            { label: "Early arrivals", value: "9%" },
            { label: "Late arrivals", value: "9%" },
            { label: "No‑shows", value: "3" },
          ]}
        />

        {/* 8–9. Yard movements */}
        <div className="md:col-span-2">
          <TableCard
            title="Yard Movements"
            columns={["Move", "From", "To", "Status"]}
            rows={[
              ["YM-2201", "Yard row B", "D4", "Completed"],
              ["YM-2202", "D1", "Yard row C", "In progress"],
              ["YM-2203", "Yard row A", "Maintenance bay", "Planned"],
            ]}
            caption="Illustrative jockey moves requested and completed."
          />
        </div>
      </div>
    </div>
  );
}


