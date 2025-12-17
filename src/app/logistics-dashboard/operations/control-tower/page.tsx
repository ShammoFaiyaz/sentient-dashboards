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

      {/* Additional control tower visual sections */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Line chart: Network Throughput (dummy) */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-md md:col-span-2">
          <div className="mb-1 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Network Throughput</h3>
              <p className="text-xs text-muted">Last 24h / 7d (Sequential line chart)</p>
            </div>
            <div className="flex gap-1 text-[10px]">
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-neutral-600">24h</span>
              <span className="rounded-full bg-neutral-50 px-2 py-0.5 text-neutral-400">7d</span>
            </div>
          </div>
          {/* Simple inline SVG line chart (dummy data) */}
          <div className="mt-3 overflow-hidden rounded-xl bg-gradient-to-r from-sky-100 via-cyan-50 to-sky-100">
            <svg
              viewBox="0 0 400 120"
              className="h-24 w-full"
              preserveAspectRatio="none"
            >
              {/* subtle grid */}
              <g stroke="#dbeafe" strokeWidth="1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <line key={i} x1="0" y1={24 * (i + 1)} x2="400" y2={24 * (i + 1)} />
                ))}
              </g>
              {/* baseline */}
              <line x1="0" y1="100" x2="400" y2="100" stroke="#bfdbfe" strokeWidth="1" />
              {/* area under line */}
              <defs>
                <linearGradient id="throughputFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,80 L40,82 L80,70 L120,78 L160,60 L200,66 L240,50 L280,58 L320,46 L360,52 L400,48 L400,120 L0,120 Z"
                fill="url(#throughputFill)"
              />
              {/* line */}
              <polyline
                points="0,80 40,82 80,70 120,78 160,60 200,66 240,50 280,58 320,46 360,52 400,48"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Heatmap: Operational Load by Region / Hub (dummy) */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-md">
          <h3 className="text-sm font-medium">Operational Load by Region / Hub</h3>
          <p className="text-xs text-muted">Heatmap of network pressure</p>
          <div className="mt-3 grid grid-cols-4 gap-1">
            {["bg-emerald-100", "bg-emerald-200", "bg-amber-200", "bg-red-200", "bg-emerald-50", "bg-amber-100", "bg-amber-300", "bg-red-300", "bg-emerald-200", "bg-emerald-300", "bg-amber-200", "bg-red-100"].map(
              (c, idx) => (
                <div key={idx} className={`h-6 rounded ${c}`} />
              )
            )}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted">
            <span>Low load</span>
            <span>High load</span>
          </div>
        </div>

        {/* Exceptions summary panel */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-md">
          <h3 className="text-sm font-medium">Exceptions Summary</h3>
          <p className="text-xs text-muted">Weather, congestion, customs</p>
          <ul className="mt-3 space-y-2 text-xs">
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                Weather-related
              </span>
              <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] text-sky-700">14 open</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Network congestion
              </span>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] text-amber-800">9 open</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Customs & clearance
              </span>
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] text-rose-800">5 open</span>
            </li>
          </ul>
        </div>

        {/* SLA risk indicator bar */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-md">
          <h3 className="text-sm font-medium">SLA Risk Indicator</h3>
          <p className="text-xs text-muted">Approaching breach vs safe (Signal)</p>
          <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full w-full bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-500" />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted">
            <span>Safe</span>
            <span>Approaching breach</span>
          </div>
          <p className="mt-2 text-[11px] text-amber-700">
            11% of monitored orders are trending towards SLA risk in the next 6 hours.
          </p>
        </div>

        {/* Recent events feed */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-md">
          <h3 className="text-sm font-medium">Recent Events</h3>
          <p className="text-xs text-muted">Handoffs, escalations, reroutes</p>
          <ul className="mt-3 space-y-2 text-xs">
            <li>
              <span className="text-[10px] text-muted">2 min ago</span>
              <div className="text-neutral-800">Shipment SH-10341 rerouted via alternate hub (AMS) due to storm.</div>
            </li>
            <li>
              <span className="text-[10px] text-muted">18 min ago</span>
              <div className="text-neutral-800">Exception EX-891 escalated to Tier 2 for medical supply delivery.</div>
            </li>
            <li>
              <span className="text-[10px] text-muted">36 min ago</span>
              <div className="text-neutral-800">Cross-dock handoff completed at ORD with no dwell.</div>
            </li>
          </ul>
        </div>

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

