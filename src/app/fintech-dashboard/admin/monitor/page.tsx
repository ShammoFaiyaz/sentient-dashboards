"use client";

import { AgentMonitor } from "@/components/monitor/AgentMonitor";

export default function FintechAdminMonitor() {
  return <AgentMonitor kpis={{ completed: "3,120", incomplete: "76", slaMet: "99.1%", avgLatency: "1.2s" }} />;
}


