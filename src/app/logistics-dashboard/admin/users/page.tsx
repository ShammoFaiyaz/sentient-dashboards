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

export default function LogisticsAdminUsersPage() {
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
            Access Governance Agent — reviews who has access to sensitive logistics data and automations.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Active Users" value="486" hint="logistics org" colorHex="#004AAD" />
        <Kpi label="Pending Invites" value="12" hint="not yet activated" colorHex="#6D28D9" />
        <Kpi label="High-Privilege Accounts" value="34" hint="review regularly" colorHex="#EF4444" />
      </div>

      {/* Rich user management sections (10, unique types and shuffled once) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* 1. Full-width user directory table */}
        <div className="md:col-span-3">
          <TableCard
            title="User Directory"
            columns={["Name", "Role", "Region", "Status", "Actions"]}
            rows={[
              [
                "Avery Kim",
                "Ops Manager",
                "EU",
                "Active",
                <div className="flex gap-1" key="avery-actions">
                  <button className="rounded border border-line/60 px-2 py-0.5 text-[11px] text-primary">
                    Edit
                  </button>
                  <button className="rounded border border-line/60 px-2 py-0.5 text-[11px] text-muted">
                    Disable
                  </button>
                  <button className="rounded border border-line/60 px-2 py-0.5 text-[11px] text-red-500">
                    Remove
                  </button>
                </div>,
              ],
              [
                "Samir Rao",
                "Warehouse Supervisor",
                "US-East",
                "Active",
                <div className="flex gap-1" key="samir-actions">
                  <button className="rounded border border-line/60 px-2 py-0.5 text-[11px] text-primary">
                    Edit
                  </button>
                  <button className="rounded border border-line/60 px-2 py-0.5 text-[11px] text-muted">
                    Disable
                  </button>
                  <button className="rounded border border-line/60 px-2 py-0.5 text-[11px] text-red-500">
                    Remove
                  </button>
                </div>,
              ],
              [
                "Lina Costa",
                "Admin",
                "LATAM",
                "Invite pending",
                <div className="flex gap-1" key="lina-actions">
                  <button className="rounded border border-line/60 px-2 py-0.5 text-[11px] text-primary">
                    Edit
                  </button>
                  <button className="rounded border border-line/60 px-2 py-0.5 text-[11px] text-muted">
                    Resend invite
                  </button>
                  <button className="rounded border border-line/60 px-2 py-0.5 text-[11px] text-red-500">
                    Remove
                  </button>
                </div>,
              ],
            ]}
            caption="Illustrative view of logistics users by role and region."
          />
        </div>

        {/* 2. Role distribution donut */}
        <DonutCard
          title="Role Distribution"
          caption="Share of admins, planners, supervisors, and operators."
        />

        {/* 3. Training completion bar chart */}
        <BarChartCard
          title="Mandatory Training Completion"
          caption="Sample completion levels for safety and compliance modules."
        />

        {/* 4. Access policy list */}
        <ListCard
          title="Key Access Policies"
          items={[
            "Admins require MFA and quarterly access reviews.",
            "Warehouse supervisors limited to DCs they manage.",
            "Operators have mobile-only access to route tools.",
          ]}
        />

        {/* 5. Onboarding / offboarding calendar */}
        <CalendarCard title="Onboarding & Offboarding Calendar" />

        {/* 6. Agent access mapping table */}
        <TableCard
          title="Agent Access Mapping (Sample)"
          columns={["Role", "Agents Enabled", "Last Review"]}
          rows={[
            ["Admin", "All 10", "7 days ago"],
            ["Ops Manager", "7", "14 days ago"],
            ["Operator", "3", "30 days ago"],
          ]}
          caption="Illustrative mapping between user roles and AI agents."
        />

        {/* 7. Regional coverage list */}
        <ListCard
          title="Regional Admin Coverage"
          items={[
            "US-East — primary: A. Kim, backup: J. Miller.",
            "EU — primary: C. Novak, backup: L. Costa.",
            "APAC — primary: R. Singh, backup: M. Tan.",
          ]}
        />

        {/* 8. User change history stats (last) */}
        <StatGridCard
          title="Change History Summary"
          stats={[
            { label: "Role changes (30d)", value: "62" },
            { label: "Access escalations", value: "7" },
            { label: "Deactivations", value: "19" },
            { label: "New invites", value: "45" },
          ]}
        />
      </div>
    </div>
  );
}


