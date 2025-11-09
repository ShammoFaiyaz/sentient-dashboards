 "use client";

import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";

export default function StudentAgents() {
  const { agentsByRole } = useAgents();
  const list = agentsByRole("student", { onlyOnline: true });
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* <h1 className="text-2xl font-semibold text-primary">Student Agents</h1>
      <p className="mt-1 text-xs text-muted">Transparent • Cites sources • Human override</p> */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => (
          <AgentTile key={a.id} agent={a} status="online" />
        ))}
      </div>
    </div>
  );
}


