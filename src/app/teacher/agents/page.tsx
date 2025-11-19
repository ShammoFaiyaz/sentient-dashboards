"use client";

import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function TeacherAgents() {
  const { agentsByRole } = useAgents();
  const list = agentsByRole("teacher");
  const [filter, setFilter] = React.useState<"all" | "online" | "offline">("all");
  const filtered = list.filter((a) => (filter === "all" ? true : filter === "online" ? a.online : !a.online));
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* <h1 className="text-2xl font-semibold text-primary">Faculty Agents</h1>
      <p className="mt-1 text-xs text-muted">Transparent • Cites sources • Human override</p> */}
      <div className="mt-2 flex items-center justify-start">
        <label className="text-sm" htmlFor="teacher-agent-filter">
          <div className="mb-1 text-neutral-dark/70">Status</div>
          <select
            id="teacher-agent-filter"
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
        <AnimatePresence mode="popLayout">
          {filtered.map((a) => (
            <motion.div
              key={a.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <AgentTile agent={a} status={a.online ? "online" : "offline"} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}


