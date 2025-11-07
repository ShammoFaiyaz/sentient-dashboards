"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getCourseById } from "@/mock/courses";
import { Button } from "@/components/ui/Button";
import { AgentTile } from "@/components/AgentTile";
import { agents } from "@/mock/agents";
import { useToast } from "@/components/ui/Toast";

type Tab = "Syllabus" | "Completion" | "Assessments" | "Q&A" | "Agents";

export default function CourseDetail({ params }: { params: { id: string } }) {
  // Hooks must be called unconditionally at the top of the component
  const [tab, setTab] = useState<Tab>("Syllabus");
  const { show } = useToast();
  const course = getCourseById(params.id);
  if (!course) return notFound();

  const meta: Record<string, { instructor: string; period: string }> = {
    "algorithms": { instructor: "Prof. Rivera", period: "Oct–Dec, 10 weeks" },
    "ethics": { instructor: "Dr. Patel", period: "Oct–Dec, 8 weeks" },
    "data-structures": { instructor: "Prof. Chen", period: "Oct–Dec, 10 weeks" },
  };

  const assessments = [
    { title: "Quiz 2", due: "Nov 12", type: "Quiz", est: "20 mins" },
    { title: "Essay Draft", due: "Nov 15", type: "Essay", est: "45–60 mins" },
  ];

  const completedCount = Math.round((course.progressPercent / 100) * course.lessons.length);

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Hero */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">{course.title}</h1>
          <div className="mt-1 text-sm text-neutral-dark/80">
            Instructor: <span className="text-ink/90">{meta[course.id]?.instructor ?? "—"}</span> • Period: <span className="text-ink/90">{meta[course.id]?.period ?? "—"}</span>
          </div>
          <div className="mt-2 max-w-md">
            <div className="mb-1 text-xs text-neutral-dark/70">Progress: {course.progressPercent}%</div>
            <ProgressBar value={course.progressPercent} />
          </div>
        </div>
        <div className="shrink-0">
          <Link href={`/student/courses/${course.id}/lesson/${course.lessons[0]?.id || "1"}`} className="inline-block">
            <Button>Continue</Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 inline-flex rounded-md border border-line/60 bg-white p-1 text-sm shadow-elevation-sm">
        {(["Syllabus","Completion","Assessments","Q&A","Agents"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-3 py-1 ${tab === t ? "bg-primary/10 text-ink" : "text-muted hover:bg-primary/5"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Panels */}
      {tab === "Syllabus" && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {course.lessons.map((l) => (
            <Card key={l.id}>
              <CardTitle>{l.title}</CardTitle>
              <p className="text-sm text-neutral-dark/80">{l.summary}</p>
              <Link href={`/student/courses/${course.id}/lesson/${l.id}`} className="mt-3 inline-block text-sm text-primary hover:underline">Open lesson</Link>
            </Card>
          ))}
        </div>
      )}

      {tab === "Completion" && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card>
            <CardTitle>Completion</CardTitle>
            <p className="mt-2 text-sm text-neutral-dark/80">
              Completed {completedCount} of {course.lessons.length} lessons.
            </p>
            <div className="mt-3 max-w-md">
              <ProgressBar value={course.progressPercent} />
            </div>
          </Card>
        </div>
      )}

      {tab === "Assessments" && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {assessments.map((a, i) => (
            <Card key={i}>
              <CardTitle>{a.title}</CardTitle>
              <div className="mt-2 grid gap-2 text-sm md:grid-cols-3">
                <div>Due: <span className="text-ink/90">{a.due}</span></div>
                <div>Type: <span className="text-ink/90">{a.type}</span></div>
                <div>Est. time: <span className="text-ink/90">{a.est}</span></div>
              </div>
              <Link href="/student/assessments" className="mt-3 inline-block text-sm text-primary hover:underline">View in Assessments</Link>
            </Card>
          ))}
        </div>
      )}

      {tab === "Q&A" && (
        <div className="mt-6">
          <div className="mb-2 border-t border-line/60 pt-3 text-xs text-muted">Course Discussions (demo)</div>
          <div className="grid gap-3 md:grid-cols-2">
            <Card className="rounded-lg shadow-elevation-sm transition-shadow hover:shadow-elevation-md">
              <div className="flex items-start justify-between">
                <CardTitle className="text-[18px]">What’s the format for the Ethics essay?</CardTitle>
                <span className="text-xs text-muted">Yesterday</span>
              </div>
              <div className="mt-2 space-y-1 text-sm text-neutral-dark/80">
                <p>Student: Is it APA or MLA? Any word count target?</p>
                <p className="text-neutral-dark/70">AI Tutor Agent: Use APA, aim for 1200–1500 words with 3+ sources.</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted">
                <span>2 replies • last by AI Tutor Agent</span>
                <button
                  className="rounded-control px-2 py-1 text-[12px] text-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  onClick={() => show({ title: "Thread", message: "Opening thread (demo)", variant: "primary" })}
                >
                  View thread →
                </button>
              </div>
            </Card>
            <Card className="rounded-lg shadow-elevation-sm transition-shadow hover:shadow-elevation-md">
              <div className="flex items-start justify-between">
                <CardTitle className="text-[18px]">Will Quiz 2 cover Lesson 3?</CardTitle>
                <span className="text-xs text-muted">2 days ago</span>
              </div>
              <div className="mt-2 space-y-1 text-sm text-neutral-dark/80">
                <p>Student: Is Lesson 3 included?</p>
                <p className="text-neutral-dark/70">Instructor: Quiz 2 covers Lessons 1–3. Focus on greedy vs. divide & conquer.</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted">
                <span>1 reply • last by Instructor</span>
                <button
                  className="rounded-control px-2 py-1 text-[12px] text-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  onClick={() => show({ title: "Thread", message: "Opening thread (demo)", variant: "primary" })}
                >
                  View thread →
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === "Agents" && (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {(["ai-tutor-writer","digital-fluency-ethics","student-chatbot"] as const).map((id) => {
            const a = agents.find((x) => x.id === id);
            return a ? <AgentTile key={a.id} agent={a} /> : null;
          })}
        </div>
      )}
    </div>
  );
}


