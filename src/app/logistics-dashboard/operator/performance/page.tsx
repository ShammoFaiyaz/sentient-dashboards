"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";
import { TableCard, BarChartCard, DonutCard, ListCard, CalendarCard, StatGridCard, FormCard } from "@/components/logistics/LogisticsWidgets";

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

export default function LogisticsOperatorPerformancePage() {
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
            Driver Performance Coach — helps you improve on-time rate, safety, and earnings over time.
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
        <Kpi label="On-Time Deliveries" value="96%" hint="last 30 days" colorHex="#008C74" />
        <Kpi label="Safety Score" value="92" hint="out of 100" colorHex="#6D28D9" />
        <Kpi label="Customer Rating" value="4.8" hint="out of 5" colorHex="#004AAD" />
        <Kpi label="Earnings (This Week)" value="$1,120" hint="before tax" colorHex="#F4B23E" />
      </div>

      {/* Unique rich sections (10) for performance & earnings */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* 1. Performance trend table */}
        <div className="md:col-span-3">
          <TableCard
            title="Weekly Performance Trend"
            columns={["Week", "On-time rate", "Deliveries", "Safety score"]}
            rows={[
              ["This week", "96%", "172", "92"],
              ["Last week", "94%", "165", "90"],
              ["2 weeks ago", "93%", "158", "88"],
            ]}
            caption="Illustrative trend of your key performance metrics."
          />
        </div>

        {/* 2. On-time performance bar chart */}
        <BarChartCard
          title="On-Time Deliveries by Day"
          caption="Sample daily on-time performance across the last 7 days."
        />

        {/* 3. Safety events list */}
        <ListCard
          title="Recent Safety Events (Sample)"
          items={[
            "1 harsh braking event on wet roads — increase following distance.",
            "2 speeding alerts near school zones — watch posted limits.",
            "No mobile‑phone distraction events recorded this week.",
          ]}
        />

        {/* 4. Customer feedback table */}
        <TableCard
          title="Customer Feedback Highlights"
          columns={["Date", "Rating", "Comment"]}
          rows={[
            ["Mon", "5★", "“Super friendly and right on time.”"],
            ["Tue", "4★", "“Had to wait a few minutes but great service.”"],
          ]}
          caption="Sample comments from recent deliveries."
        />

        {/* 5. Earnings mix donut */}
        <DonutCard
          title="Earnings Mix"
          caption="Base pay vs route incentives vs bonuses."
        />

        {/* 6. Training & upskilling calendar */}
        <CalendarCard title="Training & Upskilling Schedule" />

        {/* 7. Peer benchmark stat grid */}
        <StatGridCard
          title="Peer Benchmark (Sample)"
          stats={[
            { label: "On-time vs peers", value: "+3 pts" },
            { label: "Safety score vs peers", value: "+5 pts" },
            { label: "Customer rating vs peers", value: "+0.4" },
            { label: "Stops / day vs peers", value: "+6" },
          ]}
        />

        {/* 8. Streak & milestones list */}
        <ListCard
          title="Streaks & Milestones"
          items={[
            "21 days without a safety incident.",
            "1500th successful delivery completed this quarter.",
            "3 months with on‑time rate above 93%.",
          ]}
        />

        {/* 9. Earnings snapshot (last) */}
        <div className="md:col-span-2">
          <StatGridCard
            title="Earnings Snapshot"
            stats={[
              { label: "This week", value: "$1,120" },
              { label: "Month to date", value: "$3,980" },
              { label: "Bonus eligible", value: "$260" },
              { label: "Next payout", value: "Fri, 18:00" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}


