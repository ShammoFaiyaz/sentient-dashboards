"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function StorePerformancePage() {
  const { agents } = useAgents();
  const config = NICHES["retail-dashboard"];
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agent</h2>
          <p className="text-xs text-muted">Store Insights Agent — benchmarks revenue, traffic, and satisfaction signals.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Revenue" value="$4.6M" hint="MTD" colorHex="#004AAD" />
        <Kpi label="Transactions Today" value="12,840" hint="POS + online" colorHex="#008C74" />
        <Kpi label="Avg Basket Size" value="$43" hint="rolling 7d" colorHex="#6D28D9" />
        <Kpi label="Customer Satisfaction" value="4.6/5" hint="post‑visit" colorHex="#F4B23E" />
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Revenue Trend</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 340 120" className="w-full h-full">
              {/* grid */}
              <g stroke="#e5e7eb">
                {Array.from({ length: 4 }).map((_, i) => (
                  <line key={i} x1="30" y1={30 + i * 20} x2="320" y2={30 + i * 20} />
                ))}
              </g>
              {/* axes */}
              <g stroke="#cbd5e1" strokeWidth="1">
                <line x1="30" y1="20" x2="30" y2="100" />
                <line x1="30" y1="100" x2="320" y2="100" />
              </g>
              {/* ticks */}
              <g fill="#64748b" fontSize="10">
                <text x="5" y="100">0</text>
                <text x="5" y="80">50k</text>
                <text x="0" y="60">100k</text>
                <text x="0" y="40">150k</text>
              </g>
              <g fill="#64748b" fontSize="10">
                {["W1","W2","W3","W4","W5"].map((t,i)=>(
                  <text key={t} x={50 + i*60} y="112">{t}</text>
                ))}
              </g>
              {/* area */}
              <polyline
                points="30,95 60,90 90,86 120,88 150,84 180,80 210,78 240,74 270,76 300,70 320,68"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
              />
              {/* markers */}
              <g fill="#3B82F6">
                {[{x:60,y:90},{x:120,y:88},{x:180,y:80},{x:240,y:74},{x:300,y:70}].map((p,i)=>(
                  <circle key={i} cx={p.x} cy={p.y} r="2.5" />
                ))}
              </g>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Daily revenue progression for the current month with week labels.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Category Performance</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 340 120" className="w-full h-full">
              <g stroke="#e5e7eb">
                <line x1="40" y1="100" x2="320" y2="100" />
              </g>
              {([
                { x: 60, h: 70, label: "Apparel", v: 34 },
                { x: 120, h: 58, label: "Electronics", v: 28 },
                { x: 180, h: 46, label: "Home", v: 22 },
                { x: 240, h: 34, label: "Beauty", v: 16 },
                { x: 300, h: 24, label: "Other", v: 10 },
              ] as const).map((b, i) => (
                <g key={i}>
                  <rect x={b.x - 15} y={100 - b.h} width="30" height={b.h} fill="#4F79D6" rx="4" />
                  <text x={b.x} y={95 - b.h} textAnchor="middle" fontSize="12" fill="#334155">{b.v}%</text>
                  <text x={b.x} y="112" textAnchor="middle" fontSize="10" fill="#64748b">{b.label}</text>
                </g>
              ))}
            </svg>
          </div>
          <div className="text-[11px] text-muted">Revenue share by category with percentage labels.</div>
        </div>
      </div>

      {/* Performance notes */}
      <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Performance Notes</div>
        <ul className="space-y-2">
          {[
            "Marked uplift after weekend promo; sustain inventory for Apparel.",
            "Electronics funnel shows cart‑drop — investigate checkout UX.",
            "Customer satisfaction improved post staffing changes.",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Additional AI insights */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Customer Sentiment Monitor</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="24" />
              <g transform="rotate(-90 100 100)">
                <circle cx="100" cy="100" r="60" fill="none" stroke="#34D399" strokeWidth="24" strokeDasharray="180 190" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#FBBF24" strokeWidth="24" strokeDasharray="40 330" strokeDashoffset="-180" />
              </g>
              <circle cx="100" cy="100" r="40" fill="white" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Share of positive vs neutral/negative reviews.</div>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Agent Actions Queue</div>
          <ul className="space-y-2">
            {["Launch A/B for checkout flow this week.", "Auto‑reply to 12 reviews with coupon.", "Rebalance stock from Store #12 to #7."].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
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

