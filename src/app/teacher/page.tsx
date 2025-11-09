"use client";

import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import NewsCarousel from "@/components/news/NewsCarousel";

export default function TeacherDashboard() {
  const router = useRouter();
  const { agentsByRole } = useAgents();
  const featured = agentsByRole("teacher", { onlyOnline: true }).slice(0, 4);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* <h1 className="text-2xl font-semibold text-primary">Teacher Dashboard</h1> */}
      {/* KPI tiles */}
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <KpiTile label="Courses this term" value="3" hint="active" colorHex="#004AAD" bgGradient="linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)" onClick={() => router.push("/teacher/courses")}>
          <ul className="mt-2 list-inside list-disc text-xs text-neutral-700">
            <li>10:00—11:15 Algorithms (Room 204)</li>
            <li>13:00—14:00 Office Hours</li>
          </ul>
        </KpiTile>
        <KpiTile label="Pending grading" value="10" hint="submissions" colorHex="#008C74" bgGradient="linear-gradient(180deg, rgba(0,140,116,0.14) 0%, rgba(255,255,255,1) 100%)" onClick={() => router.push("/teacher/grading")}>
          <ul className="mt-2 list-inside list-disc text-xs text-neutral-700">
            <li>Algorithms: 12 submissions</li>
            <li>Human‑AI Ethics: 5 submissions</li>
          </ul>
        </KpiTile>
        <KpiTile label="Avg turnaround" value="14h" hint="last 7d" colorHex="#6D28D9" bgGradient="linear-gradient(180deg, rgba(109,40,217,0.12) 0%, rgba(255,255,255,1) 100%)" onClick={() => router.push("/teacher/grading")}>
          <div className="mt-2 text-xs text-neutral-700">Lecture 7 slides — needs examples.</div>
        </KpiTile>
        <KpiTile label="Office hours" value="Today" hint="1–2 PM" colorHex="#F4B23E" bgGradient="linear-gradient(180deg, rgba(244,178,62,0.18) 0%, rgba(255,255,255,1) 100%)" onClick={() => router.push("/teacher/schedule")}>
          <div className="mt-2 text-xs text-neutral-700">Next: Today 1–2 PM • Faculty Lounge.</div>
        </KpiTile>
      </div>
      <NewsCarousel />
      <section className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Transparent • Cites sources • Human override</p>
          </div>
          <Link
            href="/teacher/agents"
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
    </div>
  );
}

function KpiTile({ label, value, hint, colorHex, bgGradient, children, onClick }: { label: string; value: string; hint: string; colorHex: string; bgGradient: string; children?: React.ReactNode; onClick?: () => void }) {
  return (
    <div
      className={`rounded-2xl p-4 shadow-md ${onClick ? "cursor-pointer" : ""}`}
      style={{ background: bgGradient, border: "1px solid var(--color-neutral)" }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="text-xs text-muted">{label}</div>
      <div className="text-2xl font-semibold" style={{ color: colorHex }}>{value}</div>
      <div className="text-xs text-neutral-600">{hint}</div>
      {children}
    </div>
  );
}

