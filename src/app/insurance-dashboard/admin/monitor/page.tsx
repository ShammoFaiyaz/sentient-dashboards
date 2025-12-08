"use client";

import { AgentMonitor } from "@/components/monitor/AgentMonitor";

export default function InsuranceAdminMonitor() {
  return <AgentMonitor kpis={{ completed: "2,780", incomplete: "184", slaMet: "98.6%", avgLatency: "1.4s" }} />;
}


