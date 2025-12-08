"use client";

import { AgentMonitor } from "@/components/monitor/AgentMonitor";

export default function RetailAdminMonitor() {
  return <AgentMonitor kpis={{ completed: "1,760", incomplete: "54", slaMet: "98.9%", avgLatency: "1.3s" }} />;
}


