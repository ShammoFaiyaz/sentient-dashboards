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

export default function LogisticsOperatorExceptionsPage() {
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
            Delivery Exception Copilot — guides you through failed delivery, bad address, and damage workflows.
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
        <Kpi label="Open Exceptions" value="4" hint="for today’s route" colorHex="#EF4444" />
        <Kpi label="Resolved Today" value="9" hint="exceptions cleared" colorHex="#008C74" />
        <Kpi label="Avg Time to Resolve" value="16 min" hint="per exception" colorHex="#6D28D9" />
        <Kpi label="Customer Impacted" value="4" hint="customers with issues" colorHex="#004AAD" />
      </div>

      {/* Unique rich sections (10) for managing exceptions */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* 1. Exception queue table */}
        <div className="md:col-span-3">
          <TableCard
            title="Active Exception Queue"
            columns={["ID", "Type", "Stop", "Age", "Status"]}
            rows={[
              ["EX‑104", "Failed delivery", "07", "18 min", "Needs action"],
              ["EX‑105", "Address issue", "11", "32 min", "Waiting info"],
              ["EX‑106", "Damage", "15", "5 min", "New"],
            ]}
            caption="Sample set of open exceptions with age and current handling status."
          />
        </div>

        {/* 2. Next best actions list */}
        <ListCard
          title="Immediate Next-Best Actions"
          items={[
            "Call customer for EX‑104 to confirm new delivery window.",
            "Capture photos and damage notes for EX‑106.",
            "Share updated address details with dispatcher for EX‑105.",
          ]}
        />

        {/* 3. SLA risk stat grid */}
        <StatGridCard
          title="SLA Risk Snapshot"
          stats={[
            { label: "At risk of SLA miss", value: "3" },
            { label: "High-priority customers", value: "2" },
            { label: "Avg age of open EX", value: "24 min" },
            { label: "Escalated to ops", value: "1" },
          ]}
        />

        {/* 4. Reattempt calendar */}
        <CalendarCard title="Reattempt & Follow-Up Schedule" />

        {/* 5. Exception volume bar chart */}
        <BarChartCard
          title="Exceptions by Type"
          caption="Illustrative mix of the most common exception categories."
        />

        {/* 6. Policy quick reference */}
        <ListCard
          title="Policy Reminders"
          items={[
            "Failed first attempt — reattempt within 24 hours when possible.",
            "Damage with photos — log claim before depot return.",
            "Bad address — verify with dispatcher before marking undeliverable.",
          ]}
        />

        {/* 7. Support tickets table */}
        <TableCard
          title="Support Tickets Opened"
          columns={["Ticket", "Linked EX", "Channel", "Status"]}
          rows={[
            ["T‑2201", "EX‑105", "Chat", "Waiting reply"],
            ["T‑2202", "EX‑102", "Phone", "Resolved"],
          ]}
          caption="Illustrative support tickets tied to today’s exceptions."
        />

        {/* 8. Resolution outcome donut */}
        <DonutCard
          title="Resolution Outcome Split"
          caption="Share of reattempted, returned to depot, and written off."
        />

        {/* 9. Coaching notes list */}
        <ListCard
          title="Coaching Notes from Last Week"
          items={[
            "Capture more photos for address and access issues.",
            "Use standard reason codes to speed up resolution.",
            "Notify dispatcher early when multiple exceptions cluster on a route.",
          ]}
        />

        {/* 10. AI suggestions form */}
        <FormCard
          title="Improve Exception Workflows"
          fields={[
            { label: "Where do you lose the most time?", placeholder: "e.g. address corrections, customer calls" },
            { label: "Suggested automations", placeholder: "e.g. auto-texts, pre-filled forms" },
          ]}
          submitLabel="Send feedback to exception copilot"
        />
      </div>
    </div>
  );
}


