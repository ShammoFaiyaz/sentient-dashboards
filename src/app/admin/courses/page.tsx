"use client";

import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { studentCourses } from "@/mock/courses";
import { AgentTile } from "@/components/AgentTile";
import { agentsForRole } from "@/mock/agents";

type AdminCourseMeta = { id: string; sections: number; enrolled: number; lead: string };

const meta: Record<string, AdminCourseMeta> = {
  "algorithms": { id: "algorithms", sections: 3, enrolled: 148, lead: "Prof. Rivera" },
  "ethics": { id: "ethics", sections: 2, enrolled: 96, lead: "Dr. Patel" },
  "data-structures": { id: "data-structures", sections: 3, enrolled: 172, lead: "Prof. Chen" },
};

const agentChips = ["Personalized Outreach Orchestrator", "Staff Onboarding"] as const;

export default function AdminCourses() {
  return (
    <div className="mx-auto max-w-7xl px-1.5 py-4">
      {/* <h1 className="text-2xl font-semibold text-primary">Courses (Admin)</h1> */}
      <section className="mt-4">
        <h2 className="mb-1 font-medium">Featured Agents</h2>
        <p className="mb-2 text-xs text-muted">Transparent • Cites sources • Human override</p>
        <div className="grid gap-4 md:grid-cols-4">
          {agentsForRole("admin").slice(0,4).map((a) => (
            <AgentTile key={a.id} agent={a} />
          ))}
        </div>
      </section>
      
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {studentCourses.map((c) => {
          const m = meta[c.id];
          const slug = c.id;
          return (
            <Card key={c.id} role="button" tabIndex={0} className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
              <CardTitle>{c.title}</CardTitle>
              <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-neutral-dark/80">
                <div>Sections: <span className="text-ink/90">{m?.sections ?? "—"}</span></div>
                <div>Enrolled: <span className="text-ink/90">{m?.enrolled ?? "—"}</span></div>
                <div className="col-span-2">Lead Instructor: <span className="text-ink/90">{m?.lead ?? "—"}</span></div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {agentChips.slice(0,2).map((label) => (
                    <span key={label} className="rounded-full border border-line/60 bg-white px-2 py-0.5 text-[11px] text-muted">{label}</span>
                  ))}
                </div>
                <Button as="a" href={`/admin/courses/${slug}`} size="sm" variant="ghost">Manage</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}


