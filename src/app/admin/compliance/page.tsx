"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import Link from "next/link";

export default function AdminCompliance() {
  const { agentsByRole } = useAgents();
  const featured = agentsByRole("admin", { onlyOnline: true }).slice(0, 4);
  return (
    <div className="mx-auto max-w-7xl px-1.5 py-4">
      {/* <h1 className="text-2xl font-semibold text-primary">Compliance</h1> */}
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
      
      {/* KPI strip */}
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <KpiCard title="Accreditation progress" value="82%" hint="Self‑study + evidence" pct={82} color="primary" />
        <KpiCard title="Policy coverage" value="68%" hint="Published & acknowledged" pct={68} color="accent" />
        <KpiCard title="Open issues" value="7" hint="Audit findings" pct={30} color="warning" />
        <KpiCard title="Last audit score" value="92" hint="/100 (external)" pct={92} color="success" />
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardTitle>Policy Adherence</CardTitle>
          <div className="mt-3 flex items-center gap-4">
            <div
              className="relative h-28 w-28 rounded-full"
              style={{
                background:
                  "conic-gradient(rgb(var(--color-success)) 0deg, rgb(var(--color-success)) 259.2deg, rgb(var(--color-line)) 259.2deg)",
              }}
              aria-hidden
            >
              <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-base font-semibold text-primary">72%</div>
                <div className="text-[10px] text-muted">Adherence</div>
              </div>
            </div>
            <ul className="text-sm text-neutral-dark/80">
              <li className="mb-1 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-success" /> Adhered (72%)
              </li>
              <li className="mb-1 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-warning" /> At risk (18%)
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-error" /> Non‑compliant (10%)
              </li>
            </ul>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardTitle>Incidents by Category (last 90 days)</CardTitle>
          <div className="mt-4 grid grid-cols-6 items-end gap-3">
            {[
              { label: "PII", value: 6, color: "bg-error" },
              { label: "Access", value: 9, color: "bg-warning" },
              { label: "Network", value: 3, color: "bg-accent" },
              { label: "Vendor", value: 2, color: "bg-primary" },
              { label: "Policy", value: 4, color: "bg-success" },
              { label: "Other", value: 1, color: "bg-ink/30" },
            ].map((b) => (
              <div key={b.label} className="text-center">
                <div
                  className={`mx-auto w-8 rounded-md ${b.color}`}
                  style={{ height: `${Math.max(4, b.value * 8)}px` }}
                  aria-label={`${b.label}: ${b.value}`}
                />
                <div className="mt-1 text-xs text-muted">{b.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Checklist and tables */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardTitle>Audit Readiness Checklist</CardTitle>
          <ul className="mt-2 divide-y divide-line/60 text-sm">
            {[
              { label: "Evidence repository complete", status: "pass" },
              { label: "Data retention policy updated", status: "pass" },
              { label: "Third‑party DPAs on file", status: "warn" },
              { label: "FERPA training completion", status: "warn" },
              { label: "Incident response playbook tested", status: "fail" },
            ].map((item) => (
              <li key={item.label} className="flex items-center justify-between py-2">
                <span className="text-ink/90">{item.label}</span>
                <span
                  className={
                    item.status === "pass"
                      ? "rounded-full bg-success/10 px-2 py-0.5 text-xs text-success"
                      : item.status === "warn"
                      ? "rounded-full bg-warning/10 px-2 py-0.5 text-xs text-warning"
                      : "rounded-full bg-error/10 px-2 py-0.5 text-xs text-error"
                  }
                >
                  {item.status === "pass" ? "Pass" : item.status === "warn" ? "At risk" : "Pending"}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardTitle>Data Processing Agreements</CardTitle>
          <div className="mt-2 text-sm">
            <div className="mb-2 grid grid-cols-3 gap-2 rounded-md border border-line/60 p-2">
              <div className="font-medium text-ink">Vendor</div>
              <div className="font-medium text-ink">Status</div>
              <div className="font-medium text-ink">Renewal</div>
              <div>ProctorCo</div>
              <div><span className="rounded-full bg-success/10 px-2 py-0.5 text-xs text-success">Signed</span></div>
              <div>2026‑01‑15</div>
              <div>CloudDocs</div>
              <div><span className="rounded-full bg-warning/10 px-2 py-0.5 text-xs text-warning">In review</span></div>
              <div>2025‑06‑30</div>
              <div>Analytics360</div>
              <div><span className="rounded-full bg-error/10 px-2 py-0.5 text-xs text-error">Missing</span></div>
              <div>—</div>
            </div>
            <div className="text-xs text-muted">Manage DPAs in Vendor Management → Contracts</div>
          </div>
        </Card>
      </div>

      {/* Training completion by dept (bar list) */}
      <Card className="mt-6">
        <CardTitle>Training Completion by Department</CardTitle>
        <div className="mt-3 space-y-3">
          {[
            { dept: "Admissions", pct: 94 },
            { dept: "Faculty", pct: 81 },
            { dept: "Advising", pct: 76 },
            { dept: "IT", pct: 88 },
          ].map((d) => (
            <div key={d.dept}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-ink/90">{d.dept}</span>
                <span className="text-muted">{d.pct}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
                <div className="h-full bg-primary" style={{ width: `${d.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function KpiCard({ title, value, hint, pct, color }: { title: string; value: string; hint: string; pct: number; color: "primary" | "accent" | "warning" | "success" }) {
  const barColor =
    color === "accent"
      ? "bg-accent"
      : color === "warning"
      ? "bg-warning"
      : color === "success"
      ? "bg-success"
      : "bg-primary";
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-muted">{title}</div>
          <div className="text-xl font-semibold text-primary">{value}</div>
          <div className="text-[11px] text-muted">{hint}</div>
        </div>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink/10">
        <div className={`h-full ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
    </Card>
  );
}


