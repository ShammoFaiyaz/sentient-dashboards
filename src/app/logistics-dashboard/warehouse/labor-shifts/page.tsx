"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { TableCard, BarChartCard, ListCard, StatGridCard, CalendarCard, FormCard } from "@/components/logistics/LogisticsWidgets";
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

export default function LogisticsLaborShiftsPage() {
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
            Staffing Planner — aligns staffing to forecasted workload and task mix in the warehouse.
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
        <Kpi label="Headcount On Shift" value="86" hint="current shift" colorHex="#004AAD" />
        <Kpi label="Labor Utilization" value="91%" hint="productive vs idle" colorHex="#008C74" />
        <Kpi label="Overtime This Week" value="312 h" hint="all associates" colorHex="#6D28D9" />
        <Kpi label="Open Positions" value="7" hint="roles yet to fill" colorHex="#F4B23E" />
      </div>

      {/* Rich dummy sections (10) for Labor & Shifts */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* 1. Full-width shift roster */}
        <div className="md:col-span-3">
          <TableCard
            title="Shift Roster"
            columns={["Associate", "Role", "Shift", "Zone"]}
            rows={[
              ["Alex R.", "Picker", "Day", "A"],
              ["Sam L.", "Loader", "Eve", "Docks"],
              ["Priya P.", "Supervisor", "Day", "A/B"],
            ]}
            caption="Who is scheduled on each shift and where they are assigned."
          />
        </div>

        {/* 2–3. Attendance + task mix */}
        <StatGridCard
          title="Attendance Status"
          stats={[
            { label: "Present", value: "94%" },
            { label: "Late arrivals", value: "3%" },
            { label: "Absent", value: "3%" },
            { label: "Agency workers on shift", value: "11" },
          ]}
        />
        <BarChartCard
          title="Task Assignments"
          caption="Illustrative mix of associates by primary task (picking, packing, loading, receiving)."
        />

        {/* 4–5. Overtime actions + labor forecast */}
        <FormCard
          title="Overtime Review & Actions"
          fields={[
            { label: "Teams to review", placeholder: "e.g. Night shift, Docks, Inbound" },
            { label: "Overtime threshold (%)", placeholder: "e.g. 12%" },
            { label: "Max hours per associate / week", placeholder: "e.g. 45h" },
          ]}
          submitLabel="Review overtime exceptions"
        />
        <StatGridCard
          title="Labor Forecast vs Workload"
          stats={[
            { label: "Forecasted hours (today)", value: "920" },
            { label: "Required hours", value: "880" },
            { label: "Coverage buffer", value: "4.5%" },
            { label: "Next shift shortfall", value: "‑3 FTE" },
          ]}
        />

        {/* 6–7. Cross-training + skill gaps */}
        <TableCard
          title="Cross-training Matrix (Sample)"
          columns={["Associate", "Primary", "Secondary", "Certified"]}
          rows={[
            ["Alex R.", "Picking", "Packing", "Yes"],
            ["Sam L.", "Loading", "Receiving", "No"],
            ["Jordan S.", "Inventory", "Picking", "Yes"],
          ]}
          caption="Illustrative cross‑training coverage across key tasks."
        />
        <ListCard
          title="Skill Gaps"
          items={[
            "Insufficient certified forklift drivers on night shift.",
            "Limited cross‑training for reverse‑logistics processing.",
            "Few associates trained on new WMS features.",
          ]}
        />

        {/* 8–10. Breaks, alerts, planning */}
        <CalendarCard title="Break & Shift Calendar" />
        <ListCard
          title="Staffing Alerts"
          items={[
            "Tomorrow’s evening shift under forecast by 5 heads in Zone B.",
            "High fatigue risk flagged for 3 associates with long stretches.",
            "Peak weekend requires temp labor in receiving and packing.",
          ]}
        />
        <ListCard
          title="Coaching & Safety Briefings"
          items={[
            "Daily start‑of‑shift safety huddle scheduled at 08:00 and 20:00.",
            "Three associates queued for performance coaching this week.",
            "Monthly ergonomics refresher planned for next Friday.",
          ]}
        />
      </div>
    </div>
  );
}


