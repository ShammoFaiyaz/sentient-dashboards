"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import { agentsForRole } from "@/mock/agents";
import { AgentTile } from "@/components/AgentTile";
import { useToast } from "@/components/ui/Toast";

export default function StudentDashboard() {
  const { show } = useToast();
  const router = useRouter();
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-[28px] md:text-[32px] font-semibold text-primary">Student Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card role="button" tabIndex={0} onClick={() => router.push("/student/assessments")} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.push("/student/assessments"); } }} className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          <CardTitle className="text-[18px]">Morning Digest</CardTitle>
          <ul className="list-inside list-disc text-sm text-neutral-dark/80">
            <li>PSYC204 quiz today at 3:00 PM</li>
            <li>Project checkpoint due Friday</li>
            <li>Advisor hours available tomorrow</li>
          </ul>
        </Card>
        <Card role="button" tabIndex={0} onClick={() => router.push("/student/courses")} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.push("/student/courses"); } }} className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          <CardTitle className="text-[18px]">Continue Course</CardTitle>
          <p className="text-sm text-neutral-dark/80">Resume: Algorithms → Lesson 3: Greedy Strategy.</p>
          <div className="mt-3 flex justify-center">
            <Button onClick={() => show({ title: "Plan updated", message: "Next lesson scheduled in your study plan", variant: "success" })}>Continue</Button>
          </div>
        </Card>
        <Card role="button" tabIndex={0} onClick={() => router.push("/student/assessments")} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.push("/student/assessments"); } }} className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          <CardTitle className="text-[18px]">Upcoming Deadlines</CardTitle>
          <ul className="list-inside list-disc text-sm text-neutral-dark/80">
            <li>Ethics essay draft - Nov 12</li>
            <li>Data structures lab - Nov 14</li>
          </ul>
        </Card>
      </div>
      <section className="mt-8">
        <h2 className="mb-1 font-medium">Featured Agents</h2>
        <p className="mb-2 text-xs text-muted">Transparent • Cites sources • Human override</p>
        <div className="grid gap-4 md:grid-cols-3">
          {agentsForRole("student").slice(0,3).map((a) => (
            <AgentTile key={a.id} agent={a} />
          ))}
        </div>
      </section>
    </div>
  );
}


