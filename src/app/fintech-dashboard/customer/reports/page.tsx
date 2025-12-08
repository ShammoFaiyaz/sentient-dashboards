"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useRole } from "@/components/role/RoleProvider";
import { usePathname } from "next/navigation";

function Kpi({ label, value, hint, colorHex }: { label: string; value: string; hint: string; colorHex: string }) {
  return (
    <div
      className="rounded-2xl p-4 shadow-md bg-white border border-line/60"
      style={{
        background:
          colorHex === "#004AAD"
            ? "linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)"
            : colorHex === "#008C74"
            ? "linear-gradient(180deg, rgba(0,140,116,0.14) 0%, rgba(255,255,255,1) 100%)"
            : colorHex === "#6D28D9"
            ? "linear-gradient(180deg, rgba(109,40,217,0.12) 0%, rgba(255,255,255,1) 100%)"
            : colorHex === "#EF4444"
            ? "linear-gradient(180deg, rgba(239,68,68,0.12) 0%, rgba(255,255,255,1) 100%)"
            : "linear-gradient(180deg, rgba(244,178,62,0.18) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      <div className="text-xs text-muted">{label}</div>
      <div className="text-2xl font-semibold" style={{ color: colorHex }}>{value}</div>
      <div className="text-xs text-neutral-600">{hint}</div>
    </div>
  );
}

export default function FintechCustomerReportsPage() {
  const { agents } = useAgents();
  const { role } = useRole();
  const pathname = usePathname() || "";
  const config = NICHES["fintech-dashboard"];
  const effectiveRole = pathname.includes("/fintech-dashboard/admin/") ? "admin" : role;
  const featuredBase = agents.filter((a) => config.agentIds.includes(a.id) && a.role === effectiveRole);
  const featured =
    featuredBase.length >= 3
      ? featuredBase.slice(0, 3)
      : [...featuredBase, ...agents.filter((a) => config.agentIds.includes(a.id) && a.role !== effectiveRole)].slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Personal Finance Agent — generates summaries and helps file reports.</p>
          </div>
          <a href="/fintech-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)}
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Reports Generated" value="18" hint="last 12 months" colorHex="#004AAD" />
        <Kpi label="Pending" value="2" hint="awaiting review" colorHex="#6D28D9" />
        <Kpi label="Issues Found" value="1" hint="data mismatch" colorHex="#EF4444" />
      </div>

      {/* Statements & Reports */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Statements & Reports</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Month</th><th className="py-2 px-3">Type</th><th className="py-2 px-3">Download</th><th className="py-2 px-3">Status</th></tr></thead><tbody>{
            [["Jan 2025","Monthly Statement","PDF","Ready"],["2024","Tax Report","ZIP","Ready"],["Dec 2024","Spending Summary","PDF","Processing"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
          }</tbody></table>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Net Worth Growth (12 Months)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">{[20,40,60,80,100].map((y,i)=>(<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g>
              <g stroke="#cbd5e1"><line x1="30" y1="10" x2="30" y2="110" /><line x1="30" y1="110" x2="300" y2="110" /></g>
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="30,105 60,100 90,98 120,94 150,92 180,90 210,84 240,80 270,78 300,74" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Net worth = assets – liabilities.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Tax Categorized Spending</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[36,24,18,12].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}}/>))}</div>
          <div className="text-[11px] text-muted">Deductible vs non‑deductible categories.</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Missing Information Alerts</div>
          <ul className="space-y-2">{["Upload W‑2 for 2024","Connect brokerage for tax report","Update address on statements"].map((t)=>(<li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>))}</ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Income Summary</div>
          <div className="grid grid-cols-3 gap-3 text-sm">
            {[
              ["Salary","$5,200"],
              ["Freelance","$820"],
              ["Investments","$230"],
            ].map((r,i)=>(<div key={i} className="rounded-lg border border-line/60 p-3"><div className="text-muted text-[11px]">{r[0]}</div><div className="text-xl font-semibold text-primary">{r[1]}</div></div>))}
          </div>
        </div>
      </div>

      {/* Extra report sections */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Deductions Utilization</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
            {[65, 40, 28, 15].map((h, i) => (<div key={i} className="w-10 rounded-md bg-primary/70" style={{ height: `${h / 1.2}%` }} />))}
          </div>
          <div className="text-[11px] text-muted">Standard • Mortgage Interest • Donations • Education.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Refund Estimate</div>
          <div className="text-3xl font-semibold text-primary">$1,180</div>
          <div className="text-[11px] text-muted mt-1">Based on current inputs; subject to change after finalization.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Filing Status & Dependents</div>
          <ul className="space-y-2 text-sm">
            {["Status: Married Filing Jointly","Dependents: 2","Child credit eligibility: Yes"].map((t)=>(
              <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Document Checklist</div>
          <ul className="space-y-2 text-sm">
            {["W‑2 (Employer)","1099‑INT (Bank)","1099‑DIV (Brokerage)","1098‑E (Student Loan)"].map((t)=>(
              <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Quarterly Estimated Taxes</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Quarter</th><th className="py-2 px-3">Due</th><th className="py-2 px-3">Amount</th><th className="py-2 px-3">Status</th></tr></thead><tbody>{
              [["Q1","Apr 15","$520","Paid"],["Q2","Jun 15","$520","Upcoming"],["Q3","Sep 15","$520","Scheduled"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Audit Risk Indicators</div>
          <div className="mt-2 grid grid-cols-6 gap-1">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="h-4 rounded" style={{ background: i % 5 === 0 ? "#ef4444" : i % 3 === 0 ? "#fde68a" : "#d1fae5" }} />
            ))}
          </div>
          <div className="text-[11px] text-muted mt-2">Higher red density suggests elevated review probability.</div>
        </div>
      </div>
    </div>
  );
}


