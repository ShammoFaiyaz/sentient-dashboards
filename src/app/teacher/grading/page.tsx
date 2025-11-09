"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Card, CardTitle } from "@/components/ui/Card";
import { Table, Th, Td } from "@/components/ui/Table";
import { gradingQueue } from "@/mock/submissions";
import { QuickGradeDrawer } from "@/components/teacher/QuickGradeDrawer";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function TeacherGrading() {
  const items = useMemo(() => gradingQueue, []);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const { show } = useToast();

  const pending = items.length;
  const gradedToday = 6;
  const avgTurnaround = "14h";
  const aiDraftCoverage = "78%";

  function openQuick(id: string) {
    const i = items.findIndex((x) => x.id === id);
    if (i >= 0) { setIdx(i); setOpen(true); }
  }

  function approve(item: any, score: number, feedback: string) {
    setOpen(false);
    show({ title: "Grade drafted", message: `${item.student} - ${item.assignment} (${score}/10)`, variant: "success" });
  }

  function autoDraftAll() {
    show({ title: "Auto‑draft complete", message: `Feedback drafted for ${items.length} pending submissions`, variant: "success" });
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* <h1 className="text-2xl font-semibold text-primary">Grading</h1> */}

      {/* KPI strip */}
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <Kpi label="Pending" value={String(pending)} hint="submissions" color="primary" />
        <Kpi label="Graded today" value={String(gradedToday)} hint="items" color="success" />
        <Kpi label="Avg turnaround" value={avgTurnaround} hint="last 7d" color="accent" />
        <Kpi label="AI draft coverage" value={aiDraftCoverage} hint="have feedback" color="warning" />
      </div>

      {/* Queue table */}
      <div className="mt-6">
        <Card>
          <CardTitle>Queue</CardTitle>
          {items.length > 0 && (
            <div className="mb-2 flex items-center justify-end">
              <Button size="sm" variant="neutral" onClick={autoDraftAll}>Auto‑draft feedback for all pending</Button>
            </div>
          )}
          {items.length === 0 ? (
            <p className="text-sm text-neutral-dark/70">No submissions in the queue.</p>
          ) : (
          <Table>
            <thead>
              <tr>
                <Th>Student</Th>
                <Th>Course</Th>
                <Th>Assignment</Th>
                <Th>Submitted</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id} className="odd:bg-neutral-light/40">
                  <Td>{s.student}</Td>
                  <Td>{s.course}</Td>
                  <Td>{s.assignment}</Td>
                  <Td>{s.submittedAt}</Td>
                  <Td>
                    <button onClick={() => openQuick(s.id)} className="text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">Grade</button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
          )}
        </Card>
      </div>

      {/* Assessments overview cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { course: "Algorithms", assessment: "Quiz 2", due: "Nov 12", submissions: 48, graded: 32 },
          { course: "Human‑AI Ethics", assessment: "Essay Draft", due: "Nov 15", submissions: 32, graded: 12 },
          { course: "Data Structures", assessment: "Lab 3", due: "Nov 14", submissions: 55, graded: 20 },
        ].map((a) => (
          <Card key={a.course + a.assessment}>
            <CardTitle>{a.course} — {a.assessment}</CardTitle>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-neutral-dark/80">
              <div>Due: <span className="text-ink/90">{a.due}</span></div>
              <div>Submissions: <span className="text-ink/90">{a.submissions}</span></div>
              <div className="col-span-2">
                <div className="mb-1 text-xs text-neutral-dark/70">Graded: {a.graded} / {a.submissions}</div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
                  <div className="h-full bg-primary" style={{ width: `${Math.round((a.graded / a.submissions) * 100)}%` }} />
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end">
              <Link href="/teacher/grading" className="text-sm text-primary hover:underline">Open grading →</Link>
            </div>
          </Card>
        ))}
      </div>
      <QuickGradeDrawer open={open} onClose={() => setOpen(false)} items={items as any} index={idx} setIndex={setIdx} onApprove={approve} />
    </div>
  );
}

function Kpi({ label, value, hint, color }: { label: string; value: string; hint: string; color: "primary" | "success" | "accent" | "warning" }) {
  const bg =
    color === "success" ? "linear-gradient(180deg, rgba(14,159,110,0.14) 0%, rgba(255,255,255,1) 100%)" :
    color === "accent" ? "linear-gradient(180deg, rgba(229,106,84,0.12) 0%, rgba(255,255,255,1) 100%)" :
    color === "warning" ? "linear-gradient(180deg, rgba(192,130,0,0.14) 0%, rgba(255,255,255,1) 100%)" :
    "linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)";
  const colorHex =
    color === "success" ? "#0E9F6E" :
    color === "accent" ? "#B54834" :
    color === "warning" ? "#C08200" :
    "#004AAD";
  return (
    <div className="rounded-2xl p-4 shadow-md" style={{ background: bg, border: "1px solid var(--color-neutral)" }}>
      <div className="text-xs text-muted">{label}</div>
      <div className="text-2xl font-semibold" style={{ color: colorHex }}>{value}</div>
      <div className="text-xs text-neutral-600">{hint}</div>
    </div>
  );
}

