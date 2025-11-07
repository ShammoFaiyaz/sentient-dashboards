"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

type Item = { id: string; course: string; assignment: string; student: string; submittedAt: string };
type Rubric = { criterion: string; points: number };

const defaultRubric: Rubric[] = [
  { criterion: "Correctness", points: 5 },
  { criterion: "Efficiency", points: 3 },
  { criterion: "Style & Comments", points: 2 },
];

export function QuickGradeDrawer({
  open,
  onClose,
  items,
  index,
  setIndex,
  onApprove,
}: {
  open: boolean;
  onClose: () => void;
  items: Item[];
  index: number;
  setIndex: (idx: number) => void;
  onApprove: (item: Item, score: number, feedback: string) => void;
}) {
  const item = items[index];
  const [checks, setChecks] = React.useState<boolean[]>(Array(defaultRubric.length).fill(false));
  const [feedback, setFeedback] = React.useState<string>("");

  React.useEffect(() => {
    if (!item) return;
    const score = checks.reduce((acc, on, i) => acc + (on ? defaultRubric[i].points : 0), 0);
    const lines = [
      `Feedback for ${item.student} - ${item.assignment}:`,
      checks[0] ? "• Correctness: Meets expected output on main cases." : "• Correctness: Some failing cases detected.",
      checks[1] ? "• Efficiency: Reasonable time/space usage." : "• Efficiency: Consider optimizing loops/data structures.",
      checks[2] ? "• Style: Clear naming and comments." : "• Style: Improve variable naming and add comments.",
      `Overall score preview: ${score} / 10`,
    ];
    setFeedback(lines.join("\n"));
  }, [item, checks]);

  if (!open || !item) return null;

  const score = checks.reduce((acc, on, i) => acc + (on ? defaultRubric[i].points : 0), 0);

  const prev = () => setIndex(Math.max(0, index - 1));
  const next = () => setIndex(Math.min(items.length - 1, index + 1));

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-[720px] overflow-y-auto border-l border-line/60 bg-white p-5 shadow-elevation-md dark:bg-slate-900">
        <div className="mb-3 flex items-start justify-between">
          <h2 className="text-lg font-semibold tracking-[-0.01em]">Quick Grade</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={prev} disabled={index === 0} aria-label="Previous">
              ← Prev
            </Button>
            <Button variant="ghost" onClick={next} disabled={index >= items.length - 1} aria-label="Next">
              Next →
            </Button>
            <button aria-label="Close" onClick={onClose} className="rounded-control px-2 py-1 text-sm hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">Close</button>
          </div>
        </div>

        <div className="text-sm text-muted">{item.course} - {item.assignment} • {item.student} • submitted {item.submittedAt}</div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <section className="rounded-md border border-line/60 p-3">
            <div className="mb-2 font-medium text-ink">Rubric selector</div>
            <ul className="space-y-2">
              {defaultRubric.map((r, i) => (
                <li key={r.criterion} className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={checks[i]} onChange={(e) => setChecks((prev) => prev.map((v, idx) => idx === i ? e.target.checked : v))} />
                    {r.criterion}
                  </label>
                  <span className="text-muted">{r.points} pts</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 text-sm">Score: <span className="font-medium">{score} / 10</span></div>
          </section>

          <section className="rounded-md border border-line/60 p-3">
            <div className="mb-2 font-medium text-ink">AI‑drafted feedback</div>
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={10} className="w-full rounded-md border border-line p-2 text-sm" />
            <div className="mt-2 flex items-center gap-2">
              <Button onClick={() => onApprove(item, score, feedback)}>Approve</Button>
              <Button variant="ghost" onClick={() => window.location.assign(`/teacher/grading/${item.id}`)}>Override in full editor</Button>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}


