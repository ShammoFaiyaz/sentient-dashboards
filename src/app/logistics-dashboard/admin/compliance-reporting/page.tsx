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

export default function LogisticsComplianceReportingPage() {
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
            Safety & Compliance Checker — monitors driver hours, inspections, and incidents for compliance risk.
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
        <Kpi label="Open Compliance Issues" value="23" hint="awaiting resolution" colorHex="#EF4444" />
        <Kpi label="Completed Audits" value="7" hint="last 90 days" colorHex="#008C74" />
        <Kpi label="Upcoming Filings" value="5" hint="next 30 days" colorHex="#6D28D9" />
        <Kpi label="Policy Acknowledgments" value="94%" hint="staff signed latest policy" colorHex="#004AAD" />
      </div>

      {/* Rich compliance & risk sections (10+, shuffled once) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* 1. Full-width audit & filing table */}
        <div className="md:col-span-3">
          <TableCard
            title="Regulatory Filings & Audits (Sample)"
            columns={["Type", "Region", "Due", "Status"]}
            rows={[
              ["Annual safety report", "EU", "Mar 31", "In progress"],
              ["Customs audit", "US", "Apr 15", "Scheduled"],
              ["DG certification", "Global", "May 10", "Completed"],
            ]}
            caption="Illustrative view of upcoming filings and audit activities."
          />
        </div>

        {/* 2. Incident breakdown bar chart */}
        <BarChartCard
          title="Safety Incidents by Category"
          caption="Sample incident distribution across key categories."
        />

        {/* 3. Dangerous goods & sanctions list */}
        <ListCard
          title="Dangerous Goods & Sanctions Watch"
          items={[
            "Monitor DG lane EU ↔ APAC for updated documentation rules.",
            "Sanctions list update pending for selected carriers.",
            "High‑risk commodities flagged for additional screening.",
          ]}
        />

        {/* 4. Policy & training donut */}
        <DonutCard
          title="Policy & Training Coverage"
          caption="Share of staff with completed training and policy acknowledgments."
        />

        {/* 5. Reporting calendar */}
        <CalendarCard title="Compliance Reporting Calendar" />

        {/* 6. Incident root cause table */}
        <TableCard
          title="Recent Incidents & Root Cause"
          columns={["Date", "Type", "Root cause", "Action owner"]}
          rows={[
            ["Mar 2", "Near‑miss", "Loading bay congestion", "DC Ops"],
            ["Mar 5", "DG paperwork", "Incorrect UN code", "Customs team"],
          ]}
          caption="Sample incidents with agreed corrective actions."
        />

        {/* 7. Vendor compliance list */}
        <ListCard
          title="Vendor Compliance Focus"
          items={[
            "Carrier A — outstanding documentation for 2 DG lanes.",
            "3PL B — HOS violations trending above threshold.",
            "Broker C — customs filing timeliness below target.",
          ]}
        />

        {/* 8. Data retention stats */}
        <StatGridCard
          title="Data Retention Status"
          stats={[
            { label: "Records nearing purge", value: "4.2k" },
            { label: "Legal holds active", value: "12" },
            { label: "Data domains compliant", value: "9 / 11" },
            { label: "Retention exceptions", value: "5" },
          ]}
        />

        {/* 9. Compliance action form */}
        <FormCard
          title="Log Compliance Action"
          fields={[
            { label: "Action type", placeholder: "e.g. audit follow-up, policy update" },
            { label: "Owner", placeholder: "e.g. Safety lead, Customs manager" },
            { label: "Due date / notes", placeholder: "Target date and key context" },
          ]}
          submitLabel="Record action"
        />

        {/* 10. Priority follow-up list */}
        <ListCard
          title="Compliance Priority Follow-Ups"
          items={[
            "Close out critical incident actions before next external audit.",
            "Refresh staff training for updated DG and sanctions rules.",
            "Verify evidence for all filings due in the next 30 days.",
          ]}
        />
      </div>
    </div>
  );
}


