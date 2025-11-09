"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { ReadOnlyCalendar } from "@/components/schedule/ReadOnlyCalendar";
import Link from "next/link";

export default function AdminSchedule() {
  const { show } = useToast();
  const { agentsByRole } = useAgents();
  const featured = agentsByRole("admin", { onlyOnline: true }).slice(0, 4);
  const openResolver = () => show({ title: "Resolver", message: "Opening conflict resolver (demo)", variant: "primary" });
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* <h1 className="text-2xl font-semibold text-primary">Scheduling (Admin)</h1> */}
      <section className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Transparent • Cites sources • Human override</p>
          </div>
          <Link
            href="/admin/agents"
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
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardTitle>Calendar</CardTitle>
            <ReadOnlyCalendar />
          </Card>
        </div>
        <div>
          <Card>
            <CardTitle>Conflicts</CardTitle>
            <ul className="mt-2 list-inside list-disc text-sm text-neutral-dark/80">
              <li>Algorithms A overlaps Physics</li>
              <li>Ethics B near capacity</li>
            </ul>
            <Button variant="ghost" className="mt-3" onClick={openResolver}>Open resolver →</Button>
          </Card>
        </div>
      </div>
      {/* Extra widgets to avoid empty space */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card>
          <CardTitle>Upcoming Events</CardTitle>
          <ul className="mt-2 space-y-2 text-sm text-neutral-dark/80">
            <li>Registrar sync — Thu 10:00 AM</li>
            <li>Room audit — Fri 2:00 PM</li>
            <li>Faculty council — Mon 11:30 AM</li>
          </ul>
        </Card>
        <Card className="md:col-span-2">
          <CardTitle>Resource Utilization</CardTitle>
          <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
            {[
              { label: "Rooms", pct: 74 },
              { label: "Instructors", pct: 81 },
              { label: "Labs", pct: 65 },
            ].map((r) => (
              <div key={r.label}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-ink/90">{r.label}</span>
                  <span className="text-muted">{r.pct}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
                  <div className="h-full bg-primary" style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}


