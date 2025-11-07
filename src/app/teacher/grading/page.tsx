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
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold text-primary">Grading</h1>
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
      <QuickGradeDrawer open={open} onClose={() => setOpen(false)} items={items as any} index={idx} setIndex={setIdx} onApprove={approve} />
    </div>
  );
}


