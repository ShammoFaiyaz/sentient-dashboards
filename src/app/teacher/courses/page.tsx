"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Users, Calendar, MapPin } from "lucide-react";

export default function TeacherCourses() {
  const { agentsByRole } = useAgents();
  const featured = agentsByRole("teacher", { onlyOnline: true }).slice(0, 4);
  const meta: Record<string, { enrolled: number; room: string; next: string; gradingCompletePct: number; tags: string[] }> = {
    "algorithms": { enrolled: 48, room: "Room 204", next: "Mon 10:00–11:15", gradingCompletePct: 62, tags: ["Syllabus updated", "Attendance 92%"] },
    "ethics": { enrolled: 32, room: "Hall B", next: "Tue 13:00–14:15", gradingCompletePct: 74, tags: ["Drafts due Fri", "Q&A active"] },
    "data-structures": { enrolled: 55, room: "Lab 2", next: "Thu 09:00–10:15", gradingCompletePct: 40, tags: ["Lab this week", "TA office hrs"] },
    "operating-systems": { enrolled: 44, room: "Room 310", next: "Wed 11:30–12:45", gradingCompletePct: 58, tags: ["Project kickoff", "Kernel module demo"] },
    "databases": { enrolled: 61, room: "Room 118", next: "Fri 14:00–15:15", gradingCompletePct: 33, tags: ["SQL practice", "Schema review"] },
    "machine-learning": { enrolled: 37, room: "Hall C", next: "Mon 15:30–16:45", gradingCompletePct: 21, tags: ["Scikit tutorial", "Dataset release"] },
  };
  return (
    <div className="mx-auto max-w-7xl px-1.5 py-4">
      {/* <h1 className="text-2xl font-semibold text-primary">Courses</h1> */}
      <section className="mt-2">
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
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Algorithms */}
        <Card>
          <CardTitle>Algorithms</CardTitle>
          <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-neutral-dark/80">
            <div className="inline-flex items-center gap-2"><Users className="h-4 w-4" /> Enrolled: <span className="text-ink/90">{meta["algorithms"].enrolled}</span></div>
            <div className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> <span className="text-ink/90">{meta["algorithms"].room}</span></div>
            <div className="col-span-2 inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> Next: <span className="text-ink/90">{meta["algorithms"].next}</span></div>
          </div>
          <div className="mt-3">
            <div className="mb-1 text-xs text-neutral-dark/70">Grading completion: {meta["algorithms"].gradingCompletePct}%</div>
            <ProgressBar value={meta["algorithms"].gradingCompletePct} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {meta["algorithms"].tags.map((t) => (
              <span key={t} className="rounded-full border border-line/60 bg-white px-2 py-0.5 text-[11px] text-muted">{t}</span>
            ))}
          </div>
          <div className="mt-3 flex w-full flex-wrap items-center justify-center gap-2">
            <Button as="a" href="/teacher/courses/algorithms/students" variant="ghost">Students</Button>
            <Button as="a" href="/teacher/courses/algorithms/grading" variant="ghost">Grading</Button>
            <Button as="a" href="/teacher/courses/algorithms/schedule" variant="ghost">Schedule</Button>
          </div>
        </Card>
        {/* Ethics */}
        <Card>
          <CardTitle>Human-AI Ethics</CardTitle>
          <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-neutral-dark/80">
            <div className="inline-flex items-center gap-2"><Users className="h-4 w-4" /> Enrolled: <span className="text-ink/90">{meta["ethics"].enrolled}</span></div>
            <div className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> <span className="text-ink/90">{meta["ethics"].room}</span></div>
            <div className="col-span-2 inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> Next: <span className="text-ink/90">{meta["ethics"].next}</span></div>
          </div>
          <div className="mt-3">
            <div className="mb-1 text-xs text-neutral-dark/70">Grading completion: {meta["ethics"].gradingCompletePct}%</div>
            <ProgressBar value={meta["ethics"].gradingCompletePct} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {meta["ethics"].tags.map((t) => (
              <span key={t} className="rounded-full border border-line/60 bg-white px-2 py-0.5 text-[11px] text-muted">{t}</span>
            ))}
          </div>
          <div className="mt-3 flex w-full flex-wrap items-center justify-center gap-2">
            <Button as="a" href="/teacher/courses/ethics/students" variant="ghost">Students</Button>
            <Button as="a" href="/teacher/courses/ethics/grading" variant="ghost">Grading</Button>
            <Button as="a" href="/teacher/courses/ethics/schedule" variant="ghost">Schedule</Button>
          </div>
        </Card>
        {/* Data Structures */}
        <Card>
          <CardTitle>Data Structures</CardTitle>
          <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-neutral-dark/80">
            <div className="inline-flex items-center gap-2"><Users className="h-4 w-4" /> Enrolled: <span className="text-ink/90">{meta["data-structures"].enrolled}</span></div>
            <div className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> <span className="text-ink/90">{meta["data-structures"].room}</span></div>
            <div className="col-span-2 inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> Next: <span className="text-ink/90">{meta["data-structures"].next}</span></div>
          </div>
          <div className="mt-3">
            <div className="mb-1 text-xs text-neutral-dark/70">Grading completion: {meta["data-structures"].gradingCompletePct}%</div>
            <ProgressBar value={meta["data-structures"].gradingCompletePct} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {meta["data-structures"].tags.map((t) => (
              <span key={t} className="rounded-full border border-line/60 bg-white px-2 py-0.5 text-[11px] text-muted">{t}</span>
            ))}
          </div>
          <div className="mt-3 flex w-full flex-wrap items-center justify-center gap-2">
            <Button as="a" href="/teacher/courses/data-structures/students" variant="ghost">Students</Button>
            <Button as="a" href="/teacher/courses/data-structures/grading" variant="ghost">Grading</Button>
            <Button as="a" href="/teacher/courses/data-structures/schedule" variant="ghost">Schedule</Button>
          </div>
        </Card>
        {/* Operating Systems */}
        <Card>
          <CardTitle>Operating Systems</CardTitle>
          <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-neutral-dark/80">
            <div className="inline-flex items-center gap-2"><Users className="h-4 w-4" /> Enrolled: <span className="text-ink/90">{meta["operating-systems"].enrolled}</span></div>
            <div className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> <span className="text-ink/90">{meta["operating-systems"].room}</span></div>
            <div className="col-span-2 inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> Next: <span className="text-ink/90">{meta["operating-systems"].next}</span></div>
          </div>
          <div className="mt-3">
            <div className="mb-1 text-xs text-neutral-dark/70">Grading completion: {meta["operating-systems"].gradingCompletePct}%</div>
            <ProgressBar value={meta["operating-systems"].gradingCompletePct} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {meta["operating-systems"].tags.map((t) => (
              <span key={t} className="rounded-full border border-line/60 bg-white px-2 py-0.5 text-[11px] text-muted">{t}</span>
            ))}
          </div>
          <div className="mt-3 flex w-full flex-wrap items-center justify-center gap-2">
            <Button as="a" href="/teacher/courses/operating-systems/students" variant="ghost">Students</Button>
            <Button as="a" href="/teacher/courses/operating-systems/grading" variant="ghost">Grading</Button>
            <Button as="a" href="/teacher/courses/operating-systems/schedule" variant="ghost">Schedule</Button>
          </div>
        </Card>
        {/* Databases */}
        <Card>
          <CardTitle>Databases</CardTitle>
          <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-neutral-dark/80">
            <div className="inline-flex items-center gap-2"><Users className="h-4 w-4" /> Enrolled: <span className="text-ink/90">{meta["databases"].enrolled}</span></div>
            <div className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> <span className="text-ink/90">{meta["databases"].room}</span></div>
            <div className="col-span-2 inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> Next: <span className="text-ink/90">{meta["databases"].next}</span></div>
          </div>
          <div className="mt-3">
            <div className="mb-1 text-xs text-neutral-dark/70">Grading completion: {meta["databases"].gradingCompletePct}%</div>
            <ProgressBar value={meta["databases"].gradingCompletePct} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {meta["databases"].tags.map((t) => (
              <span key={t} className="rounded-full border border-line/60 bg-white px-2 py-0.5 text-[11px] text-muted">{t}</span>
            ))}
          </div>
          <div className="mt-3 flex w-full flex-wrap items-center justify-center gap-2">
            <Button as="a" href="/teacher/courses/databases/students" variant="ghost">Students</Button>
            <Button as="a" href="/teacher/courses/databases/grading" variant="ghost">Grading</Button>
            <Button as="a" href="/teacher/courses/databases/schedule" variant="ghost">Schedule</Button>
          </div>
        </Card>
        {/* Machine Learning */}
        <Card>
          <CardTitle>Machine Learning</CardTitle>
          <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-neutral-dark/80">
            <div className="inline-flex items-center gap-2"><Users className="h-4 w-4" /> Enrolled: <span className="text-ink/90">{meta["machine-learning"].enrolled}</span></div>
            <div className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> <span className="text-ink/90">{meta["machine-learning"].room}</span></div>
            <div className="col-span-2 inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> Next: <span className="text-ink/90">{meta["machine-learning"].next}</span></div>
          </div>
          <div className="mt-3">
            <div className="mb-1 text-xs text-neutral-dark/70">Grading completion: {meta["machine-learning"].gradingCompletePct}%</div>
            <ProgressBar value={meta["machine-learning"].gradingCompletePct} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {meta["machine-learning"].tags.map((t) => (
              <span key={t} className="rounded-full border border-line/60 bg-white px-2 py-0.5 text-[11px] text-muted">{t}</span>
            ))}
          </div>
          <div className="mt-3 flex w-full flex-wrap items-center justify-center gap-2">
            <Button as="a" href="/teacher/courses/machine-learning/students" variant="ghost">Students</Button>
            <Button as="a" href="/teacher/courses/machine-learning/grading" variant="ghost">Grading</Button>
            <Button as="a" href="/teacher/courses/machine-learning/schedule" variant="ghost">Schedule</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}


