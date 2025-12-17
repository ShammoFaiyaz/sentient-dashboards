"use client";

import { AgentMonitor } from "@/components/monitor/AgentMonitor";

export default function LogisticsAdminMonitor() {
  return (
    <AgentMonitor
      kpis={{
        completed: "3,420",
        incomplete: "128",
        slaMet: "97.6%",
        avgLatency: "1.8s",
      }}
    />
  );
}








