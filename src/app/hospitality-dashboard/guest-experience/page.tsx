"use client";

import { useNicheRole } from "@/components/niche/useNicheRole";
import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function GuestExperiencePage() {
  const role = useNicheRole("hospitality-dashboard", "Ops Manager");
  const { agents } = useAgents();
  const config = NICHES["hospitality-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Guest Experience Agent — aggregates feedback, patterns, and recovery actions.</p>
          </div>
          <a href="/hospitality-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards — SU style */}
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="CSAT (30d)" value="78%" hint="composite score" colorHex="#004AAD" />
        <Kpi label="NPS" value="42" hint="last 30 days" colorHex="#008C74" />
        <Kpi label="Avg First Response" value="12m" hint="service requests" colorHex="#F4B23E" />
        <Kpi label="Open Recovery Cases" value="5" hint="in progress" colorHex="#EF4444" />
      </div>

      {/* spacer */}
      <div className="mb-3" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Satisfaction Score</div>
          <div className="h-40 rounded-md border border-line/60 p-3 grid place-items-center">
            {/* simple donut */}
            <svg viewBox="0 0 140 140" className="h-28 w-28">
              <circle cx="70" cy="70" r="48" fill="none" stroke="#e5e7eb" strokeWidth="16" />
              <g transform="rotate(-90 70 70)">
                <circle cx="70" cy="70" r="48" fill="none" stroke="#10B981" strokeWidth="16" strokeDasharray="210 320" />
              </g>
              <circle cx="70" cy="70" r="34" fill="white" />
              <text x="70" y="76" textAnchor="middle" fontSize="16" fill="#0ea5e9">78%</text>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Composite CSAT last 30 days.</div>
        </div>
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Top Feedback Themes</div>
          <div className="h-40 rounded-md border border-line/60 p-3 flex items-end gap-3">
            {[60, 44, 36, 28, 18].map((h, i) => (
              <div key={i} className="w-10 rounded-md bg-primary/70" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="text-[11px] text-muted">Cleanliness • service • food • check‑in • facilities (demo).</div>
        </div>
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Response Time</div>
          <div className="h-40 rounded-md border border-line/60 p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                {[20, 40, 60, 80, 100].map((y, i) => (
                  <line key={i} x1="30" y1={y} x2="300" y2={y} />
                ))}
              </g>
              <g stroke="#cbd5e1">
                <line x1="30" y1="10" x2="30" y2="110" />
                <line x1="30" y1="110" x2="300" y2="110" />
              </g>
              <polyline
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                points="30,98 60,92 90,86 120,80 150,78 180,74 210,70 240,68 270,66 300,62"
              />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Avg first response (requests) by day.</div>
        </div>
      </div>

      {/* Extra detailed sections (6) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Theme Sentiment Trend</div>
          <div className="h-40 rounded-md border border-line/60 p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full"><g stroke="#e5e7eb">{[20,40,60,80,100].map((y,i)=>(<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g><g stroke="#cbd5e1"><line x1="30" y1="10" x2="30" y2="110" /><line x1="30" y1="110" x2="300" y2="110" /></g><polyline fill="none" stroke="#10B981" strokeWidth="2" points="30,96 60,92 90,88 120,90 150,84 180,82 210,76 240,72 270,70 300,66" /></svg>
          </div>
          <div className="text-[11px] text-muted">Composite satisfaction score by week.</div>
        </div>
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Promoter vs Detractor Mix</div>
          <div className="h-40 rounded-md border border-line/60 p-3 flex items-end gap-3">
            {[64,22,14].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}} />))}
          </div>
          <div className="text-[11px] text-muted">Promoters • passives • detractors.</div>
        </div>
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Feedback Queue Health</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Unreviewed</div><div className="text-xl font-semibold text-primary">12</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Actioned</div><div className="text-xl font-semibold text-primary">38</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Escalated</div><div className="text-xl font-semibold text-primary">2</div></div>
            <div className="rounded-lg border border-line/60 p-3"><div className="text-[11px] text-muted">Resolved</div><div className="text-xl font-semibold text-primary">24</div></div>
          </div>
        </div>
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Experience Playbook (AI)</div>
          <ul className="space-y-2 text-sm">{["Offer lounge access for early arrivals","Proactive call after maintenance visit","Personalize minibar by preference"].map((t)=>(<li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>))}</ul>
        </div>
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Service Recovery Cases</div>
          <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-2">Case</th><th className="py-2 px-2">Status</th></tr></thead><tbody>{[["MX‑14","Comped"],["HK‑18","In progress"],["FD‑05","Resolved"]].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-2">{r[0]}</td><td className="py-2 px-2">{r[1]}</td></tr>))}</tbody></table>
        </div>
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Touchpoint Map</div>
          <div className="h-40 rounded-md border border-line/60 p-3 grid grid-cols-6 gap-1">{Array.from({length:24}).map((_,i)=>(<div key={i} className="h-6 rounded" style={{background:`rgba(59,130,246,${0.2+(i%6)/10})`}} />))}</div>
          <div className="text-[11px] text-muted">Heat indicates where guests interact most.</div>
        </div>
      </div>

      {/* Recent guest ratings */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Recent Guest Ratings</div>
        <ul className="space-y-2 text-sm">
          {[
            { name: "Alex Rivera", stars: 5, comment: "Fantastic staff, smooth check‑in." },
            { name: "Rina Patel", stars: 4, comment: "Great room, breakfast could improve." },
            { name: "Sam Lee", stars: 3, comment: "Okay stay, but transport was delayed." },
          ].map((g) => (
            <li key={g.name} className="flex items-start justify-between rounded-md border border-line/60 p-2">
              <div>
                <div className="font-medium text-ink">{g.name}</div>
                <div className="text-xs text-muted">{g.comment}</div>
              </div>
              <div className="shrink-0 text-primary" aria-label={`${g.stars} star rating`}>
                {"★".repeat(g.stars)}
                <span className="text-neutral-300">{"★".repeat(5 - g.stars)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

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

