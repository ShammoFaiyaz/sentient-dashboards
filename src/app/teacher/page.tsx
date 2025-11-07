"use client";

import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import { agentsForRole } from "@/mock/agents";
import { AgentTile } from "@/components/AgentTile";

export default function TeacherDashboard() {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold text-primary">Teacher Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card role="button" tabIndex={0} onClick={() => router.push("/teacher/grading")} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.push("/teacher/grading"); } }} className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          <CardTitle>Grading Queue</CardTitle>
          <ul className="list-inside list-disc text-sm text-neutral-dark/80">
            <li>Algorithms: 12 submissions</li>
            <li>Human-AI Ethics: 5 submissions</li>
          </ul>
        </Card>
        <Card role="button" tabIndex={0} onClick={() => router.push("/teacher/schedule")} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.push("/teacher/schedule"); } }} className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          <CardTitle>Today’s Schedule</CardTitle>
          <ul className="list-inside list-disc text-sm text-neutral-dark/80">
            <li>10:00—11:15 Algorithms (Room 204)</li>
            <li>13:00—14:00 Office Hours</li>
          </ul>
        </Card>
        <Card role="button" tabIndex={0} onClick={() => router.push("/teacher/courses")} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.push("/teacher/courses"); } }} className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          <CardTitle>Drafts</CardTitle>
          <p className="text-sm text-neutral-dark/80">Lecture 7 slides - needs examples.</p>
        </Card>
      </div>
      <section className="mt-8">
        <h2 className="mb-1 font-medium">Featured Agents</h2>
        <p className="mb-2 text-xs text-muted">Transparent • Cites sources • Human override</p>
        <div className="grid gap-4 md:grid-cols-3">
          {agentsForRole("teacher").slice(0,3).map((a) => (
            <AgentTile key={a.id} agent={a} />
          ))}
        </div>
      </section>
    </div>
  );
}


