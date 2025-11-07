"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { Table, Th, Td } from "@/components/ui/Table";
import { capacity } from "@/mock/capacity";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useMemo, useState } from "react";
import { AgentTile } from "@/components/AgentTile";
import { agents, agentsForRole } from "@/mock/agents";

export default function AdminEnrollment() {
  const { show } = useToast();
  const initialConflicts = useMemo(() => ([
    { id: "c1", course: "Algorithms", section: "A", issue: "Overlap with Physics", suggestion: "Shift Algorithms to 11:30–12:45" },
    { id: "c2", course: "Human-AI Ethics", section: "B", issue: "Room capacity exceeded", suggestion: "Move 5 seats to section C" },
  ]), []);
  const [conflicts, setConflicts] = useState(initialConflicts);
  const [open, setOpen] = useState(false);
  const [showImpact, setShowImpact] = useState(false);

  const count = conflicts.length;

  function applyResolution() {
    const resolved = count;
    setConflicts([]);
    setOpen(false);
    show({ title: "Conflicts resolved", message: `${resolved} conflicts resolved`, variant: "success" });
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold text-primary">Enrollment</h1>
      <section className="mt-4">
        <h2 className="mb-1 font-medium">Featured Agents</h2>
        <p className="mb-2 text-xs text-muted">Transparent • Cites sources • Human override</p>
        <div className="grid gap-4 md:grid-cols-3">
          {agentsForRole("admin").slice(0,3).map((a) => (
            <AgentTile key={a.id} agent={a} />
          ))}
        </div>
      </section>
      
      
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardTitle>Capacity</CardTitle>
          <Table>
            <thead>
              <tr>
                <Th>Course</Th>
                <Th>Section</Th>
                <Th>Filled / Seats</Th>
              </tr>
            </thead>
            <tbody>
              {capacity.map((s, i) => (
                <tr key={i} className="odd:bg-neutral-light/40">
                  <Td>{s.course}</Td>
                  <Td>{s.section}</Td>
                  <Td>
                    {s.filled} / {s.seats}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <Card
          role="button"
          tabIndex={0}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); } }}
          className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          <CardTitle>Conflicts</CardTitle>
          <p className="text-sm text-neutral-dark/80">Timetable conflicts detected: {count}</p>
          <p className="mt-1 text-xs text-primary">Open resolver →</p>
        </Card>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div className="absolute left-1/2 top-1/2 w-[min(96vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-card border border-line/60 bg-white p-5 shadow-elevation-md dark:bg-slate-900">
            <div className="mb-3 flex items-start justify-between">
              <h2 className="text-lg font-semibold tracking-[-0.01em]">Conflict Resolver</h2>
              <button aria-label="Close" onClick={() => setOpen(false)} className="rounded-control px-2 py-1 text-sm hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">Close</button>
            </div>

            <div className="space-y-3 text-sm">
              <p className="text-muted">Suggestions below are proposed by <span className="font-medium text-ink">RegistrarAgent</span>.</p>
              <ul className="space-y-2">
                {conflicts.map((c) => (
                  <li key={c.id} className="rounded-md border border-line/60 p-3">
                    <div className="font-medium text-ink">{c.course} - Section {c.section}</div>
                    <div className="text-muted">Issue: {c.issue}</div>
                    <div className="text-ink/90">Suggestion: {c.suggestion}</div>
                  </li>
                ))}
                {conflicts.length === 0 && (
                  <li className="rounded-md border border-line/60 p-3 text-muted">No unresolved conflicts.</li>
                )}
              </ul>

              <div className="rounded-md border border-line/60 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div className="font-medium text-ink">Simulate impact</div>
                  <Button variant="ghost" onClick={() => setShowImpact((v) => !v)}>{showImpact ? "Hide" : "Show"}</Button>
                </div>
                {showImpact && (
                  <ul className="list-inside list-disc text-muted">
                    <li>Move 5 seats from Ethics B → C</li>
                    <li>Shift Algorithms A to 11:30–12:45</li>
                    <li>No instructor conflicts detected</li>
                  </ul>
                )}
              </div>

              <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={applyResolution} disabled={count === 0}>Apply</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


