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

      {/* Additional Shipments & Orders visuals */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Bar chart: Orders by Status */}
        <BarChartCard
          title="Orders by Status"
          caption="Illustrative distribution of open, shipped, delivered, and cancelled orders."
        />

        {/* Line chart: Order Volume Trend (30 days) */}
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="mb-1 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-ink">Order Volume Trend</h3>
              <p className="text-xs text-muted">Last 30 days (sequential line chart)</p>
            </div>
            <div className="rounded-full bg-neutral-light/60 px-2 py-0.5 text-[10px] text-muted">30d</div>
          </div>
          <div className="mt-2 overflow-hidden rounded-lg bg-gradient-to-r from-sky-50 via-cyan-50 to-sky-50">
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
                <linearGradient id="ordersVolumeFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* area under curve */}
              <path
                d="M0,100 L20,98 L40,96 L60,92 L80,88 L100,90 L120,86 L140,80 L160,78 L180,82 L200,76 L220,72 L240,70 L260,74 L280,68 L300,66 L320,70 L340,64 L360,62 L380,58 L400,60 L400,140 L0,140 Z"
                fill="url(#ordersVolumeFill)"
              />
              {/* line */}
              <polyline
                points="0,100 20,98 40,96 60,92 80,88 100,90 120,86 140,80 160,78 180,82 200,76 220,72 240,70 260,74 280,68 300,66 320,70 340,64 360,62 380,58 400,60"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Priority shipments panel */}
        <ListCard
          title="Priority Shipments"
          items={[
            "Hospital replenishment order ORD-8812 (air, ETA today 19:30).",
            "Platinum customer launch shipment ORD-8799 (road, at risk of delay).",
            "Temperature-controlled pharma load ORD-8773 (monitor handoffs closely).",
          ]}
          caption="High-visibility moves requiring closer monitoring."
        />

        {/* Split shipments & partial fulfillment summary */}
        <TableCard
          title="Split Shipments & Partial Fulfillment"
          columns={["Pattern", "Orders", "Avg. Lines / Order", "Notes"]}
          rows={[
            ["Single order → 2+ shipments", "146", "5.2", "Common for multi-node inventory."],
            ["Backordered lines", "73", "3.1", "Awaiting inbound replenishment."],
            ["Partial delivered", "58", "4.4", "Follow-up delivery scheduled."],
          ]}
          caption="Illustrative patterns where orders are fulfilled in multiple legs."
        />

        {/* Customer SLA tier distribution */}
        <DonutCard
          title="Customer SLA Tier Distribution"
          caption="Relative share of platinum, gold, silver, and standard SLA tiers."
        />

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
        {/* Time windows */}
        <CalendarCard title="Pickup & Delivery Windows" />
      </div>
    </div>
  );
}


