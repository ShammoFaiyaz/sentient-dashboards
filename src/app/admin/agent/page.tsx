"use client";

import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";

export default function AdminAgentActive() {
  const { agentsByRole } = useAgents();
  const active = agentsByRole("admin", { onlyOnline: true });
  return (
    <div className="mx-auto max-w-7xl px-1.5 py-4">
      {/* <h1 className="text-2xl font-semibold text-primary">Admin & Outreach Agents</h1>
      <p className="mt-1 text-xs text-muted">Showing active agents only</p> */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {active.map((a) => (
          <AgentTile key={a.id} agent={a} status="online" />
        ))}
        {active.length === 0 && (
          <div className="text-sm text-muted">No active agents. Enable agents in Agent Management.</div>
        )}
      </div>
    </div>
  );
}


