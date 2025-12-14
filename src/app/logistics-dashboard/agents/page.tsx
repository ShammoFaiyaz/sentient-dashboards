"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";
import { useNicheRole } from "@/components/niche/useNicheRole";

export default function LogisticsAgents() {
  const config = NICHES["logistics-dashboard"];
  const { agents, setOnline, setAllOffline } = useAgents();
  const [filter, setFilter] = React.useState<"all" | "online" | "offline">("all");
  const roleLabel = useNicheRole(config.slug, config.roles[0]);
  const filtered = agentsForNicheAndRole(config.slug, agents, { roleLabel });

  React.useEffect(() => {
    const hasSaved = typeof window !== "undefined" && !!window.localStorage.getItem(config.storageKey);
    if (!hasSaved) {
      setAllOffline();
      config.baselineOnlineIds.forEach((id) => setOnline(id, true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filteredByStatus = filtered.filter((a) =>
    filter === "all" ? true : filter === "online" ? a.online : !a.online,
  );

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <div className="mt-2 flex items-center justify-start">
        <label className="text-sm" htmlFor="logistics-agent-filter">
          <div className="mb-1 text-neutral-dark/70">Status</div>
          <select
            id="logistics-agent-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="w-[180px] rounded-md border border-neutral-medium p-2 text-sm"
          >
            <option value="all">All</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </label>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredByStatus.map((a) => (
          <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
        ))}
      </div>
    </div>
  );
}





