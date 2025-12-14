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

export default function LogisticsMyRoutesPage() {
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
            Route Companion Agent — last-mile ETAs, navigation hints, and proactive alerts for today’s route.
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
        <Kpi label="Stops Today" value="34" hint="on this route" colorHex="#004AAD" />
        <Kpi label="Distance" value="182 km" hint="planned" colorHex="#008C74" />
        <Kpi label="Time Remaining" value="6h 12m" hint="estimated drive + service" colorHex="#6D28D9" />
        <Kpi label="On-Time Status" value="On Track" hint="based on current progress" colorHex="#F4B23E" />
      </div>

      {/* Unique rich sections (10) for driver route planning */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* 1. Full-width route manifest table */}
        <div className="md:col-span-3">
          <TableCard
            title="Today’s Route Manifest"
            columns={["Stop #", "Customer", "Window", "ETA", "Status"]}
            rows={[
              ["01", "Urban Market", "08:00–09:00", "08:22", "On time"],
              ["02", "Central Pharmacy", "09:00–10:00", "09:48", "At risk"],
              ["03", "Riverside Condos", "10:00–12:00", "10:35", "On time"],
            ]}
            caption="Sample view of your next stops with windows and running ETA."
          />
        </div>

        {/* 2. Stat grid for route health */}
        <StatGridCard
          title="Route Health Snapshot"
          stats={[
            { label: "Stops completed", value: "8 / 34" },
            { label: "Ahead / behind", value: "+12 min" },
            { label: "Distance remaining", value: "126 km" },
            { label: "Next hard window", value: "11:00–11:30" },
          ]}
        />

        {/* 3. List of key instructions */}
        <ListCard
          title="Critical Special Instructions"
          items={[
            "Stop 03 requires dock appointment; call 15 min before arrival.",
            "Stop 07 has low bridge — follow alternate path from route notes.",
            "Stop 12 is contactless; photo proof required at delivery point.",
          ]}
        />

        {/* 4. Calendar view for upcoming routes */}
        <CalendarCard title="Upcoming Route Schedule" />

        {/* 5. Route progress bar chart */}
        <BarChartCard
          title="Route Progress"
          caption="Illustrative completion by stop and drive segment."
        />

        {/* 6. Route risk overview list */}
        <ListCard
          title="Route Risks & Alerts"
          items={[
            "Dense urban traffic expected between Stops 04–06.",
            "Chance of showers after 15:00 — watch braking distance.",
            "Construction near Stop 10; expect minor detour.",
          ]}
        />

        {/* 7. Fuel & break planning form */}
        <FormCard
          title="Fuel & Break Planner"
          fields={[
            { label: "Target fuel stop", placeholder: "e.g. Station near km 85" },
            { label: "Break window", placeholder: "e.g. between Stop 05 and 06" },
            { label: "Notes", placeholder: "Add any preferences or constraints" },
          ]}
          submitLabel="Lock in plan for today"
        />

        {/* 8. Time-window mix donut */}
        <DonutCard
          title="Time Window Mix"
          caption="Share of tight vs standard vs flexible delivery windows."
        />

        {/* 9. Checklist-style list for pre-trip */}
        <ListCard
          title="Pre-Trip Checklist"
          items={[
            "Walk-around vehicle inspection completed.",
            "Load secured and sealed.",
            "Scanner and device battery above 80%.",
          ]}
        />

        {/* 10. AI guidance notes form */}
        <FormCard
          title="AI Guidance Feedback"
          fields={[
            { label: "What worked well today?", placeholder: "e.g. turn-by-turn hints, alerts…" },
            { label: "What needs tuning?", placeholder: "e.g. ETA sensitivity, stop priority" },
          ]}
          submitLabel="Send feedback to route coach"
        />
      </div>
    </div>
  );
}


