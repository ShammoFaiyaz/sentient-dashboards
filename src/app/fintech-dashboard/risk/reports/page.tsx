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

export default function RiskReportsPage() {
  const { agents } = useAgents();
  const { role } = useRole();
  const pathname = usePathname() || "";
  const config = NICHES["fintech-dashboard"];
  const effectiveRole = pathname.includes("/fintech-dashboard/admin/") ? "admin" : role;
  const featuredBase = agents.filter((a)=>config.agentIds.includes(a.id) && a.role === effectiveRole);
  const featured =
    featuredBase.length >= 3
      ? featuredBase.slice(0,3)
      : [...featuredBase, ...agents.filter((a)=>config.agentIds.includes(a.id) && a.role !== effectiveRole)].slice(0,3);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Risk Insights Agent — prepares disclosures and model documentation.</p>
          </div>
          <a href="/fintech-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">{featured.map((a)=><AgentTile key={a.id} agent={a} status={a.online ? "online":"offline"} />)}</div>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Reports Generated" value="42" hint="last quarter" colorHex="#004AAD" />
        <Kpi label="Pending" value="6" hint="awaiting approval" colorHex="#6D28D9" />
        <Kpi label="Overdue" value="1" hint="needs attention" colorHex="#EF4444" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Risk Reports & Disclosures</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Report</th><th className="py-2 px-3">Type</th><th className="py-2 px-3">Owner</th><th className="py-2 px-3">Status</th></tr></thead><tbody>{
              [["VaR Methodology","Model","Risk","Approved"],["Quarterly Risk Report","Disclosure","Risk","Pending"],["Stress Testing Doc","Model","Quant","Review"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Report Types Frequency</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[14,10,8,6].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}} />))}</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Data Completeness Score</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb"><line x1="30" y1="100" x2="300" y2="100" /><line x1="30" y1="60" x2="300" y2="60" /></g>
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="30,90 60,88 90,84 120,82 150,78 180,76 210,72 240,70 270,68 300,66" />
            </svg>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Missing Data Alerts</div>
          <ul className="space-y-2">{["2 assets lack sector mapping","Counterparty ratings missing for 3 entities","FX series gap — Jan 12"].map((t)=>(<li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>))}</ul>
        </div>
      </div>

      {/* Additional AI-agent sections */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Disclosure Checklist</div>
          <ul className="space-y-2 text-sm">
            {["Methodology description attached","Backtesting results included","Model change log updated"].map((t)=>(
              <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Control Evidence Queue</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Control</th><th className="py-2 px-3">Owner</th><th className="py-2 px-3">Evidence</th><th className="py-2 px-3">Status</th></tr></thead><tbody>{
              [["Model validation","Quant","PDF","Ready"],["Limits approval","Risk","Minutes","Pending"],["Data lineage","Data","Diagram","Review"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Review Assignments</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Report</th><th className="py-2 px-3">Reviewer</th><th className="py-2 px-3">Due</th></tr></thead><tbody>{
              [["Quarterly Risk Report","Alice","Fri"],["Stress Doc","Ben","Mon"],["VaR Methodology","Cara","Wed"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Export Center</div>
          <div className="flex flex-wrap gap-2 text-sm">
            {["Download ZIP","Generate PDF Bundle","Send to Regulator Sandbox"].map((b)=>(
              <button key={b} className="rounded-md border border-line px-3 py-1">{b}</button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Narrative Generator (AI)</div>
          <ul className="space-y-2 text-sm">
            {["Summarize VaR changes vs last quarter.","Explain stress test outcomes and drivers.","Draft remediation plan for data gaps."].map((t)=>(
              <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>
            ))}
          </ul>
        </div>
        {/* Submission Calendar removed per request */}
      </div>
    </div>
  );
}


