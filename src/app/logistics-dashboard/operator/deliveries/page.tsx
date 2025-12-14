"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { TableCard, BarChartCard, DonutCard, ListCard, CalendarCard, StatGridCard, FormCard } from "@/components/logistics/LogisticsWidgets";
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

export default function LogisticsDeliveriesPage() {
  const { agents } = useAgents();
  const config = NICHES["logistics-dashboard"];
  const featured = agentsForNicheAndRole("logistics-dashboard", agents, {
    roleLabel: "Distributions Operator",
  }).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent (TOP) */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agent</h2>
          <p className="text-xs text-muted">
            Last-Mile ETA Predictor — predicts stop-level ETAs using traffic, dwell time, and history.
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
        <Kpi label="Deliveries Completed" value="18" hint="so far today" colorHex="#008C74" />
        <Kpi label="Remaining Deliveries" value="16" hint="planned" colorHex="#004AAD" />
        <Kpi label="On-Time Deliveries" value="94%" hint="for this route" colorHex="#6D28D9" />
        <Kpi label="Exceptions" value="2" hint="failed or partial" colorHex="#EF4444" />
      </div>

      {/* Unique rich sections (10) for today’s deliveries */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* 1. Full-width stop list */}
        <div className="md:col-span-3">
          <TableCard
            title="Stop List Overview"
            columns={["Stop", "Customer", "Window", "ETA", "Status"]}
            rows={[
              ["01", "Urban Market", "08:00–09:00", "08:22", "Delivered"],
              ["02", "Central Pharmacy", "09:00–10:00", "09:55", "At risk"],
              ["03", "Riverside Condos", "10:00–12:00", "10:40", "Pending"],
            ]}
            caption="Illustrative list of today’s stops with live status."
          />
        </div>

        {/* 3. Special handling list */}
        <ListCard
          title="Special Handling Today"
          items={[
            "3 refrigerated stops — ensure cold chain maintained.",
            "2 high‑value deliveries — signature and ID required.",
            "1 oversize item — confirm dock access before arrival.",
          ]}
        />

        {/* 4. Delivery completion bar chart */}
        <BarChartCard
          title="Deliveries Completed by Hour"
          caption="Sample throughput by hour across your shift."
        />

        {/* 5. Customer contact quick list */}
        <ListCard
          title="Customer Contact Reminders"
          items={[
            "Call ahead for Stop 05 — gated community.",
            "Confirm availability for Stop 09 — limited receiving hours.",
            "Use in‑app chat for Stop 14 — prefers messages.",
          ]}
        />

        {/* 6. POD quality stats */}
        <StatGridCard
          title="Proof of Delivery Quality"
          stats={[
            { label: "POD captured", value: "94%" },
            { label: "With photos", value: "68%" },
            { label: "With signature", value: "81%" },
            { label: "Issues flagged", value: "3%" },
          ]}
        />

        {/* 7. Calendar of reverse pickups */}
        <CalendarCard title="Reverse Pickups & Returns" />

        {/* 8. Exception summary table */}
        <TableCard
          title="Exception Summary"
          columns={["Stop", "Type", "Reason", "Next Step"]}
          rows={[
            ["07", "Failed delivery", "Customer not home", "Reattempt tomorrow AM"],
            ["11", "Address issue", "Suite missing", "Call dispatcher"],
          ]}
          caption="Sample view of delivery exceptions and follow‑up actions."
        />

        {/* 9. Delivery type donut */}
        <DonutCard
          title="Delivery Type Mix"
          caption="Share of home, business, hub, and locker deliveries."
        />

        {/* 10. Post-route notes form */}
        <FormCard
          title="Post-Route Notes"
          fields={[
            { label: "What went well today?", placeholder: "e.g. new shortcut, great customer interaction" },
            { label: "What was challenging?", placeholder: "e.g. loading delays, difficult access" },
          ]}
          submitLabel="Save route notes"
        />

        {/* 11. Customer rating stats */}
        <StatGridCard
          title="Customer Experience Snapshot"
          stats={[
            { label: "Avg rating (7d)", value: "4.8 / 5" },
            { label: "5-star streak", value: "9 days" },
            { label: "Feedback received", value: "23" },
            { label: "Follow-ups needed", value: "2" },
          ]}
        />
      </div>
    </div>
  );
}


