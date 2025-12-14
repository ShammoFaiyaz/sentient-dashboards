"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
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

export default function LogisticsCapacitySlasPage() {
  const { agents } = useAgents();
  const config = NICHES["logistics-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent (TOP) */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agent</h2>
          <p className="text-xs text-muted">
            Capacity & SLA Agent — balances promised service levels with real network capacity.
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
        <Kpi label="Lane SLA Breaches" value="18" hint="last 7 days" colorHex="#EF4444" />
        <Kpi label="Tender Reject Rate" value="3.2%" hint="carrier tenders" colorHex="#6D28D9" />
        <Kpi label="Reserved Capacity" value="82%" hint="of contracted" colorHex="#008C74" />
      </div>

      {/* Rich capacity & SLA sections (10+, shuffled once) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* 1. Full-width carrier SLA table */}
        <div className="md:col-span-3">
          <TableCard
            title="Carrier SLA Scorecard (Sample)"
            columns={["Carrier", "OTIF", "Damage rate", "Rejection rate"]}
            rows={[
              ["Carrier A", "97%", "0.3%", "1.2%"],
              ["Carrier B", "94%", "0.6%", "2.1%"],
              ["Carrier C", "91%", "0.9%", "4.0%"],
            ]}
            caption="Illustrative carrier performance across key SLA dimensions."
          />
        </div>

        {/* 2. Spot vs contract donut */}
        <DonutCard
          title="Spot vs Contract Mix"
          caption="Proportion of moves on contract vs spot capacity."
        />

        {/* 3. Capacity utilization bar chart */}
        <BarChartCard
          title="Capacity Utilization by Lane Group"
          caption="Sample utilization across strategic lane groups."
        />

        {/* 4. SLA tier rules list */}
        <ListCard
          title="Customer SLA Tier Highlights"
          items={[
            "Gold: OTIF ≥ 98%, dedicated support, priority capacity.",
            "Silver: OTIF ≥ 95%, shared capacity, standard support.",
            "Bronze: best‑effort OTIF, opportunistic capacity.",
          ]}
        />

        {/* 5. Peak season calendar */}
        <CalendarCard title="Peak Season Capacity Calendar" />

        {/* 6. Penalty tracking table */}
        <TableCard
          title="Penalty & Credit Tracking"
          columns={["Period", "Carrier", "Type", "Amount"]}
          rows={[
            ["Last month", "Carrier B", "Penalty", "$12,400"],
            ["Last month", "Carrier A", "Credit", "$4,800"],
          ]}
          caption="Sample penalties and credits due to SLA performance."
        />

        {/* 7. Capacity alert list */}
        <ListCard
          title="Capacity Alerts"
          items={[
            "Asia → EU lane at 95% of reserved capacity.",
            "US domestic expedited air lane trending above cost guardrail.",
            "Regional road lane under‑utilized; consider reallocating volume.",
          ]}
        />

        {/* 8. Guardrail summary stats */}
        <StatGridCard
          title="Cost Guardrail Summary"
          stats={[
            { label: "Lanes above cost target", value: "4" },
            { label: "Lanes below target", value: "11" },
            { label: "Active cost exceptions", value: "3" },
            { label: "Approved what‑if scenarios", value: "5" },
          ]}
        />

        {/* 9. Change approval form */}
        <FormCard
          title="Propose Capacity / SLA Change"
          fields={[
            { label: "Lane or region", placeholder: "e.g. EU hub → UK" },
            { label: "Change type", placeholder: "e.g. capacity increase, SLA relaxation" },
            { label: "Justification", placeholder: "Service or cost rationale" },
          ]}
          submitLabel="Submit for approval"
        />

        {/* 10. Governance checklist */}
        <ListCard
          title="Capacity & SLA Governance Checklist"
          items={[
            "Review high‑variance lanes with carriers each week.",
            "Align SLA tiers with latest customer segmentation.",
            "Reconfirm peak‑season capacity holds with strategic partners.",
          ]}
        />
      </div>
    </div>
  );
}


