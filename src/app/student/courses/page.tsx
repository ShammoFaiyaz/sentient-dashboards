 "use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { studentCourses } from "@/mock/courses";
import { EmptyState } from "@/components/EmptyState";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { Button } from "@/components/ui/Button";

export default function StudentCourses() {
  const router = useRouter();
  const { agents } = useAgents();
  const meta: Record<string, { instructor: string; period: string }> = {
    "algorithms": { instructor: "Prof. Rivera", period: "Oct–Dec, 10 weeks" },
    "ethics": { instructor: "Dr. Patel", period: "Oct–Dec, 8 weeks" },
    "data-structures": { instructor: "Prof. Chen", period: "Oct–Dec, 10 weeks" },
  };
  return (
    <div className="mx-auto max-w-7xl px-1.5 py-4">
      {/* <h1 className="text-2xl font-semibold text-primary">Courses</h1> */}
      <section className="mt-3">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Transparent • Cites sources • Human override</p>
          </div>
          <Link
            href="/student/agents"
            className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            View all agents
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {["ai-tutor-writer","digital-fluency-ethics","student-chatbot"].map(id => {
            const a = agents.find(x=>x.id===id);
            return a ? <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} /> : null;
          })}
        </div>
      </section>
      {studentCourses.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No courses yet"
            body="Explore catalog to start your learning journey."
            ctaLabel="Explore catalog"
            ctaHref="/student/catalog"
            variant="primary"
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {studentCourses.map((c) => (
            <Card
              key={c.id}
              role="button"
              tabIndex={0}
              onClick={() => router.push(`/student/courses/${c.id}`)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.push(`/student/courses/${c.id}`); } }}
              className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 19V7a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="2"/><path d="M4 19h14a2 2 0 0 0 2-2V5" stroke="currentColor" strokeWidth="2"/></svg>
                </div>
                <div>
                  <CardTitle className="text-[18px] md:text-[20px]">{c.title}</CardTitle>
                  <p className="text-[13px] text-muted">{c.lessons[0]?.summary}</p>
                </div>
              </div>
              <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
                <div>Instructor: <span className="text-ink/90">{meta[c.id]?.instructor ?? "—"}</span></div>
                <div>Teaching Period: <span className="text-ink/90">{meta[c.id]?.period ?? "—"}</span></div>
                <div className="md:col-span-2">
                  <div className="mb-1 text-xs text-neutral-dark/70">Progress: {c.progressPercent}%</div>
                  <ProgressBar value={c.progressPercent} />
                </div>
              </div>
              <div className="mt-3 flex justify-center">
                <Button
                  as="a"
                  href={`/student/courses/${c.id}`}
                  variant="ghost"
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  View details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


