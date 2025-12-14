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

export default function LogisticsNetworkOversightPage() {
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
            Network Capacity Planner — simulates utilization, costs, and service impact across the network.
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
        <Kpi label="Network OTIF" value="95.4%" hint="rolling 30 days" colorHex="#004AAD" />
        <Kpi label="Avg Transit Time" value="3.8d" hint="door-to-door median" colorHex="#008C74" />
        <Kpi label="Lanes At Risk" value="12" hint="capacity or service risk" colorHex="#EF4444" />
        <Kpi label="Active Nodes" value="42" hint="warehouses + cross-docks" colorHex="#6D28D9" />
      </div>

      {/* Rich network oversight sections (shuffled once) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* 1. Full-width lane performance table */}
        <div className="md:col-span-3">
          <TableCard
            title="Lane Performance (Sample)"
            columns={["Lane", "Mode", "OTIF", "Transit", "Margin"]}
            rows={[
              ["Shanghai → LA", "Ocean", "93%", "13.2d", "18%"],
              ["Rotterdam → Chicago", "Rail + Road", "96%", "7.5d", "15%"],
              ["Dallas → Phoenix", "Road", "98%", "1.1d", "22%"],
            ]}
            caption="Illustrative view of key global and regional lanes."
          />
        </div>

        {/* 3. Mode mix donut */}
        <DonutCard
          title="Mode Mix"
          caption="Share of ocean, air, road, and rail volume."
        />

        {/* 4. Node throughput bar chart */}
        <BarChartCard
          title="Node Throughput"
          caption="Sample weekly volume across top hubs and DCs."
        />

        {/* 5. Bottleneck lanes list */}
        <ListCard
          title="Bottleneck Lanes"
          items={[
            "Asia → EU ocean lane constrained by port congestion.",
            "US Midwest → West Coast rail lane with recurring delays.",
            "Intra‑EU road lane impacted by driver shortages.",
          ]}
        />

        {/* 6. Planned outages calendar */}
        <CalendarCard title="Planned Outages & Maintenance" />

        {/* 7. Lane contracts table */}
        <TableCard
          title="Contracts Expiring Soon"
          columns={["Lane", "Carrier", "Expires", "Status"]}
          rows={[
            ["CN → USWC", "Carrier A", "30 days", "Review"],
            ["EU Hub → UK", "Carrier B", "45 days", "Renewal draft"],
          ]}
          caption="Sample contracts that may impact capacity and service."
        />

        {/* 8. Risk watchlist list */}
        <ListCard
          title="Network Risk Watchlist"
          items={[
            "Storm season in Atlantic affecting ocean schedules.",
            "Rail strikes risk in specific EU corridor.",
            "High geopolitical risk in selected APAC region.",
          ]}
        />

        {/* 9. Capacity alerts stat grid */}
        <StatGridCard
          title="Capacity Alerts Summary"
          stats={[
            { label: "Lanes near max capacity", value: "7" },
            { label: "Under‑utilized lanes", value: "5" },
            { label: "Active reroute scenarios", value: "3" },
            { label: "Pending network changes", value: "4" },
          ]}
        />

        {/* 10. Scenario planning form */}
        <FormCard
          title="Scenario Sandbox Setup"
          fields={[
            { label: "Disrupted node or lane", placeholder: "e.g. LA port, EU hub" },
            { label: "Time window", placeholder: "e.g. next 7 days" },
            { label: "Objective", placeholder: "e.g. minimize cost, protect OTIF" },
          ]}
          submitLabel="Create what-if scenario"
        />

        {/* 11. Governance actions list */}
        <ListCard
          title="Network Governance Actions"
          items={[
            "Schedule quarterly review of top 20 strategic lanes.",
            "Align network design scenarios with latest demand forecast.",
            "Confirm escalation paths for red‑status nodes before peak season.",
          ]}
        />
      </div>
    </div>
  );
}


