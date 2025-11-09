"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { Table, Th, Td } from "@/components/ui/Table";
import { capacity } from "@/mock/capacity";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useMemo, useState } from "react";
import { AgentTile } from "@/components/AgentTile";
import { agents } from "@/mock/agents";
import { useAgents } from "@/context/AgentsProvider";
import Link from "next/link";

export default function AdminEnrollment() {
  const { show } = useToast();
  const { agentsByRole } = useAgents();
  const featured = agentsByRole("admin", { onlyOnline: true }).slice(0, 4);
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
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* <h1 className="text-2xl font-semibold text-primary">Enrollment</h1> */}
      <section className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Transparent • Cites sources • Human override</p>
          </div>
          <Link
            href="/admin/agents"
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

      {/* Extra widgets to avoid empty space */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardTitle>Waitlist Overview</CardTitle>
          <Table>
            <thead>
              <tr>
                <Th>Course</Th>
                <Th>Section</Th>
                <Th>Waitlisted</Th>
              </tr>
            </thead>
            <tbody>
              {[
                { course: "Algorithms", section: "B", num: 6 },
                { course: "Data Structures", section: "A", num: 3 },
                { course: "Databases", section: "C", num: 1 },
              ].map((w) => (
                <tr key={`${w.course}-${w.section}`} className="odd:bg-neutral-light/40">
                  <Td>{w.course}</Td>
                  <Td>{w.section}</Td>
                  <Td>{w.num}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <Card>
          <CardTitle>Daily Signups</CardTitle>
          <div className="mt-3 space-y-2">
            {[
              { day: "Mon", val: 42 },
              { day: "Tue", val: 36 },
              { day: "Wed", val: 58 },
              { day: "Thu", val: 33 },
              { day: "Fri", val: 21 },
            ].map((d) => (
              <div key={d.day}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">{d.day}</span>
                  <span className="text-ink/90">{d.val}</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-ink/10">
                  <div className="h-full bg-primary" style={{ width: `${Math.min(100, d.val)}%` }} />
                </div>
              </div>
            ))}
          </div>
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


