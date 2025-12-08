"use client";

import { AgentMonitor } from "@/components/monitor/AgentMonitor";

export default function HospitalityAdminMonitor() {
  return <AgentMonitor title="Agent Monitor" kpis={{ completed: "980", incomplete: "35", slaMet: "99.4%", avgLatency: "1.1s" }} />;
}


