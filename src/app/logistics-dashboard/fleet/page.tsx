"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useNicheRole } from "@/components/niche/useNicheRole";
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

export default function LogisticsFleetPage() {
  const { agents } = useAgents();
  const config = NICHES["logistics-dashboard"];
  const roleLabel = useNicheRole("logistics-dashboard", "Operations Manager");
  const featured = agentsForNicheAndRole("logistics-dashboard", agents, {
    roleLabel: "Operations Manager",
  }).slice(0, 3);

  const sections = [
    { title: "Fleet Overview", description: "Total tractors, trailers, vans, and third-party vehicles." },
    { title: "Utilization by Asset Type", description: "How heavily each asset type is being used." },
    { title: "Maintenance Calendar", description: "Upcoming planned maintenance and inspections." },
    { title: "Breakdown Hotspots", description: "Assets or regions with repeated breakdowns." },
    { title: "Fuel Efficiency", description: "Average fuel economy by vehicle class and route." },
    { title: "Telematics Alerts", description: "Harsh events and diagnostic alerts from the fleet." },
    { title: "Idling Analysis", description: "Where idling is highest and how to reduce it." },
    { title: "Driver Assignments", description: "Which drivers are paired to which assets." },
    { title: "Fleet Age Profile", description: "Age and mileage distribution across vehicles." },
    { title: "Spare Capacity", description: "Which assets are available as backup." },
    { title: "Utilization Heatmap", description: "Utilization by depot, region, and day of week." },
    { title: "Lease vs Owned", description: "Mix of leased and owned vehicles and cost tradeoffs." },
    { title: "Compliance Status", description: "Registration, insurance, and inspection status." },
    { title: "Downtime Cost", description: "Estimate of cost from unscheduled downtime." },
    { title: "Fleet Initiatives", description: "Key projects like electrification or retrofits." },
    { title: "Sustainability Metrics", description: "Emissions and efficiency improvements over time." },
  ];

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent (TOP) */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agent</h2>
          <p className="text-xs text-muted">
            Fleet Route Optimizer — builds efficient routes that respect SLAs, driver hours, and constraints.
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
        <Kpi label="Active Vehicles" value="324" hint="currently dispatched" colorHex="#004AAD" />
        <Kpi label="Utilization" value="86%" hint="rolling 7 days" colorHex="#008C74" />
        <Kpi label="Fleet Availability" value="92%" hint="ready for dispatch" colorHex="#6D28D9" />
        <Kpi label="Open Maintenance Issues" value="14" hint="requires scheduling" colorHex="#EF4444" />
      </div>

      {/* Dummy sections (16) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {sections.map((s) => (
          <div key={s.title} className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
            <div className="text-sm font-semibold text-ink mb-1">{s.title}</div>
            <p className="text-xs text-muted">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}





