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

export default function LogisticsWarehouseSafetyPage() {
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
            Safety & Compliance Checker — monitors incidents, inspections, and training for warehouse compliance risk.
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
        <Kpi label="Recordable Incidents (12M)" value="4" hint="warehouse-wide" colorHex="#EF4444" />
        <Kpi label="Days Since Last Incident" value="48" hint="recordable" colorHex="#004AAD" />
        <Kpi label="Training Completion" value="97%" hint="mandatory safety courses" colorHex="#008C74" />
        <Kpi label="Open Safety Actions" value="11" hint="awaiting closure" colorHex="#6D28D9" />
      </div>

      {/* Rich dummy sections (10) for Safety & Compliance */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* 1. Full-width incident log */}
        <div className="md:col-span-3">
          <TableCard
            title="Incident Log"
            columns={["ID", "Type", "Severity", "Status"]}
            rows={[
              ["IN-341", "Near‑miss – forklift", "Medium", "Under review"],
              ["IN-332", "Slip / trip", "Low", "Closed"],
              ["IN-329", "Racking impact", "High", "Action in progress"],
            ]}
            caption="Recorded warehouse safety incidents and near‑misses (dummy data)."
          />
        </div>

        {/* 2–3. Root cause + corrective actions */}
        <TableCard
          title="Root Cause Analysis"
          columns={["Incident", "Primary Cause", "Owner"]}
          rows={[
            ["IN-329", "Visibility / blind corner", "Safety lead"],
            ["IN-332", "Wet floor", "Facilities"],
            ["IN-341", "Speed in shared aisle", "Ops supervisor"],
          ]}
          caption="Sample mapping of incidents to root causes and owners."
        />
        <ListCard
          title="Corrective Actions"
          items={[
            "Install convex mirrors at high‑risk intersections.",
            "Add anti‑slip mats near dock doors in wet season.",
            "Refresh speed‑limit signage and operator training.",
          ]}
        />

        {/* 4–5. PPE & training */}
        <StatGridCard
          title="PPE & Training Compliance"
          stats={[
            { label: "PPE compliance this week", value: "98%" },
            { label: "Expired certifications", value: "3" },
            { label: "New hires needing onboarding", value: "7" },
            { label: "Forklift recertification due", value: "12 ops" },
          ]}
        />
        <BarChartCard
          title="Training Completion by Team"
          caption="Illustrative view of safety course completion across teams."
        />

        {/* 6–7. Hazards & near-miss reporting */}
        <ListCard
          title="Open Hazard Reports"
          items={[
            "Damaged guardrail reported in aisle B12.",
            "Loosened dock plate lip at door D3.",
            "Obstructed fire exit near maintenance bay.",
          ]}
        />
        <ListCard
          title="Near‑Miss Reporting Culture"
          items={[
            "Average of 6 near‑misses reported per week (target ≥ 5).",
            "Quarterly recognition program for proactive reporting.",
            "Anonymous channel available for safety concerns.",
          ]}
        />

        {/* 8–10. Safety programs & insights */}
        <ListCard
          title="Safety Walks & Drills"
          items={[
            "Weekly safety walk scheduled every Tuesday at 09:00.",
            "Fire drill completed last month — evacuation in 3m 40s.",
            "Next emergency drill planned for end of quarter.",
          ]}
        />
        <ListCard
          title="Signage & Housekeeping"
          items={[
            "High‑visibility line markings refreshed in zones A and C.",
            "5S audit score: 4.3 / 5 across all zones.",
            "Temporary signage posted in areas under repair.",
          ]}
        />
        <ListCard
          title="AI Safety Insights"
          items={[
            "Increased near‑miss frequency on Friday evenings around docks.",
            "Higher incident risk predicted when overtime exceeds 15% of hours.",
            "Suggest rotating tasks to reduce repetitive‑strain risk in zone B.",
          ]}
        />
      </div>
    </div>
  );
}


