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

      {/* Additional Service Performance visuals */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Line chart: SLA Performance Over Time */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="mb-1 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-ink">SLA Performance Over Time</h3>
              <p className="text-xs text-muted">Last 90 days (sequential line chart)</p>
            </div>
            <div className="rounded-full bg-neutral-light/60 px-2 py-0.5 text-[10px] text-muted">90d</div>
          </div>
          <div className="mt-2 overflow-hidden rounded-lg bg-gradient-to-r from-emerald-50 via-sky-50 to-emerald-50">
            <svg viewBox="0 0 400 140" className="h-28 w-full" preserveAspectRatio="none">
              {/* grid */}
              <g stroke="#e5e7eb" strokeWidth="1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <line key={i} x1="0" y1={25 * (i + 1)} x2="400" y2={25 * (i + 1)} />
                ))}
              </g>
              {/* baseline */}
              <line x1="0" y1="115" x2="400" y2="115" stroke="#d1d5db" strokeWidth="1" />
              <defs>
                <linearGradient id="slaPerfFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* area under curve */}
              <path
                d="M0,70 L20,68 L40,66 L60,64 L80,62 L100,63 L120,60 L140,58 L160,57 L180,59 L200,56 L220,55 L240,54 L260,56 L280,53 L300,52 L320,51 L340,52 L360,50 L380,49 L400,48 L400,140 L0,140 Z"
                fill="url(#slaPerfFill)"
              />
              {/* line */}
              <polyline
                points="0,70 20,68 40,66 60,64 80,62 100,63 120,60 140,58 160,57 180,59 200,56 220,55 240,54 260,56 280,53 300,52 320,51 340,52 360,50 380,49 400,48"
                fill="none"
                stroke="#059669"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Bar chart: Carrier Performance Comparison */}
        <BarChartCard
          title="Carrier Performance Comparison"
          caption="Illustrative on-time and damage performance for top carriers."
        />

        {/* Table: SLA breaches with root cause */}
        <TableCard
          title="SLA Breaches — Root Cause View"
          columns={["Case", "Customer", "Lane", "Root Cause"]}
          rows={[
            ["SLA-219", "Retailer A", "LA → Dallas", "Weather & congestion"],
            ["SLA-214", "Retailer B", "DC-East → NYC", "Late pickup at origin"],
            ["SLA-207", "Marketplace C", "Shanghai → LA", "Port dwell beyond target"],
          ]}
          caption="Dummy list of recent SLA misses and their primary drivers."
        />

        {/* First-attempt delivery success rate */}
        <StatGridCard
          title="First-Attempt Delivery"
          stats={[
            { label: "Global success rate", value: "93.6%" },
            { label: "Urban routes", value: "91.2%" },
            { label: "Suburban routes", value: "95.4%" },
            { label: "Rural routes", value: "89.7%" },
          ]}
        />

        {/* Escalations trend panel */}
        <ListCard
          title="Escalations Trend"
          items={[
            "Escalations down 12% vs last quarter driven by better ETA transparency.",
            "Peak-season spike observed on EU northbound lanes in the last 14 days.",
            "Top three customers account for 48% of open escalations this month.",
          ]}
          caption="Narrative view of how service escalations are evolving."
        />
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

        {/* Damage view */}
        <BarChartCard
          title="Damage Rate by Product Family"
          caption="Illustrative damage and claims rate across key product groups."
        />

        {/* Tickets, SLAs, and improvement plan */}
        <StatGridCard
          title="Service Health Summary"
          stats={[
            { label: "Global OTIF (90d)", value: "94.7%" },
            { label: "Average damage rate", value: "0.7%" },
            { label: "Tickets per 1,000 shipments", value: "3.2" },
            { label: "Recoveries successfully processed", value: "89%" },
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


