"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { gradingQueue } from "@/mock/submissions";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ExplainBadge } from "@/components/ExplainBadge";
import { ExplainDrawer } from "@/components/admin/ExplainDrawer";
import { useToast } from "@/components/ui/Toast";

type Rubric = { criterion: string; points: number };
const rubric: Rubric[] = [
  { criterion: "Correctness", points: 5 },
  { criterion: "Efficiency", points: 3 },
  { criterion: "Style & Comments", points: 2 },
];

export default function GradeSubmission({ params }: { params: { id: string } }) {
  const sub = useMemo(() => gradingQueue.find((s) => s.id === params.id), [params.id]);
  const [checks, setChecks] = useState<boolean[]>(Array(rubric.length).fill(false));
  const [comment, setComment] = useState("");
  const score = checks.reduce((acc, on, i) => acc + (on ? rubric[i].points : 0), 0);
  const [open, setOpen] = useState(false);
  const { show } = useToast();

  if (!sub) return (
    <div className="mx-auto max-w-3xl p-6">
      <p className="text-neutral-dark">Submission not found.</p>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Link href="/teacher/grading" className="text-sm text-primary hover:underline">← Back to queue</Link>
      <h1 className="mt-2 text-2xl font-semibold text-primary">Grade: {sub.student} - {sub.assignment}</h1>

      <Card className="mt-4">
        <CardTitle>Rubric</CardTitle>
        <ul className="space-y-2">
          {rubric.map((r, i) => (
            <li key={i} className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={checks[i]} onChange={(e) => setChecks((prev) => prev.map((v, idx) => idx === i ? e.target.checked : v))} />
                {r.criterion}
              </label>
              <span className="text-neutral-dark/70">{r.points} pts</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center gap-2 text-sm">Score: <span className="font-medium">{score} / 10</span>
          <ExplainBadge
            dataUsed="Checked rubric criteria"
            reason="Sum of points for selected criteria"
            confidence={score >= 8 ? "High" : score >= 5 ? "Medium" : "Low"}
            onClick={() => setOpen(true)}
          />
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Feedback for the student"
          className="mt-3 w-full rounded-md border border-neutral-medium p-2 text-sm"
          rows={4}
        />
        <div className="mt-3 flex gap-2">
          <Button onClick={() => show({ title: "Grade published", message: `${sub.student} - ${sub.assignment}`, variant: "success" })}>Publish Grade</Button>
          <Button variant="ghost">Save Draft</Button>
        </div>
      </Card>
      <ExplainDrawer
        open={open}
        onClose={() => setOpen(false)}
        sections={[
          { title: "Inputs", items: rubric.map((r, i) => `${r.criterion}: ${checks[i] ? "checked" : "not checked"}`) },
          { title: "Computation", items: ["Score = sum(points for checked criteria)"] },
          { title: "Notes", items: ["You can override before publishing"] },
        ]}
        heading={`Explain grading for ${sub.student}`}
      />
    </div>
  );
}


