"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { ReadOnlyCalendar } from "@/components/schedule/ReadOnlyCalendar";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import Link from "next/link";

export default function TeacherSchedule() {
  const { agentsByRole } = useAgents();
  const featured = agentsByRole("teacher", { onlyOnline: true }).slice(0, 4);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* <h1 className="text-2xl font-semibold text-primary">Schedule</h1> */}
      <section className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Transparent • Cites sources • Human override</p>
          </div>
          <Link
            href="/teacher/agents"
            className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            View all agents
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status="online" />
          ))}
        </div>
      </section>
      <div className="mt-6">
        <Card>
          <CardTitle>Calendar</CardTitle>
          <ReadOnlyCalendar />
        </Card>
      </div>
    </div>
  );
}


