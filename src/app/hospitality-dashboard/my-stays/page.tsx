"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

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

export default function HospitalityMyStaysPage() {
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
            <p className="text-xs text-muted">Guest Experience Agent — summarises stay history and suggests improvements.</p>
          </div>
          <a href="/hospitality-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)}
        </div>
      </section>

      {/* KPI Cards */}
      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Total Nights Stayed" value="42" hint="lifetime" colorHex="#004AAD" />
        <Kpi label="Next Stay Countdown" value="4 days" hint="check‑in at 16:00" colorHex="#6D28D9" />
        <Kpi label="Average Spend" value="$286/night" hint="last 12 stays" colorHex="#008C74" />
      </div>

      {/* Stay History table */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">Stay History</div>
        <div className="overflow-x-auto border border-line/60 rounded-md">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 px-3">Dates</th>
                <th className="py-2 px-3">Property</th>
                <th className="py-2 px-3">Room</th>
                <th className="py-2 px-3">Nights</th>
                <th className="py-2 px-3">Spend</th>
                <th className="py-2 px-3">Rating</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Jan 10–12, 2025", "Downtown Suites", "Deluxe King", "2", "$540", "5"],
                ["Dec 2–5, 2024", "Harbor View", "Executive", "3", "$1,020", "4"],
                ["Oct 14–16, 2024", "Midtown", "Standard", "2", "$380", "4"],
              ].map((r, i) => (
                <tr key={i} className="border-t border-line/60">{r.map((c, j) => <td key={j} className="py-2 px-3">{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Spend per Stay trend + Stay Types donut */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Spend per Stay Trend (12 Months)</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb">{[20,40,60,80,100].map((y,i)=>(<line key={i} x1="30" y1={y} x2="300" y2={y} />))}</g>
              <g stroke="#cbd5e1"><line x1="30" y1="10" x2="30" y2="110" /><line x1="30" y1="110" x2="300" y2="110" /></g>
              <polyline fill="none" stroke="#10B981" strokeWidth="2" points="30,100 60,92 90,95 120,90 150,84 180,86 210,80 240,78 270,82 300,76" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">Average spend per stay over the last year.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Stay Types Breakdown</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 grid place-items-center">
            <svg viewBox="0 0 120 120" className="h-32 w-32">
              <circle cx="60" cy="60" r="40" fill="#e5e7eb" />
              <path d="M60 60 L60 20 A40 40 0 0 1 100 60 Z" fill="#3B82F6" />{/* Business */}
              <path d="M60 60 L100 60 A40 40 0 0 1 45 94 Z" fill="#22C55E" />{/* Leisure */}
              <path d="M60 60 L45 94 A40 40 0 0 1 60 20 Z" fill="#F59E0B" />{/* Other */}
            </svg>
          </div>
          <div className="text-[11px] text-muted">Business • leisure • other</div>
        </div>
      </div>

      {/* Preference consistency + Special notes */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Room Preference Consistency</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between"><span className="text-muted">High floor</span><span className="text-ink">82% of stays</span></div>
            <div className="flex items-center justify-between"><span className="text-muted">King bed</span><span className="text-ink">76% of stays</span></div>
            <div className="flex items-center justify-between"><span className="text-muted">Quiet side</span><span className="text-ink">68% of stays</span></div>
          </div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Special Notes</div>
          <ul className="space-y-2">
            {["Prefers late checkout when possible", "Allergies: feather‑free bedding", "Enjoys spa access (off‑peak)"].map((t)=>(
              <li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-ink">{t}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Extra detailed sections (6) – local helper, not exported as a Page field
function MyStaysExtraSections() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">AI Stay Optimization Tips</div>
        <ul className="space-y-2 text-sm">
          {["Shift check‑in to 17:30 to avoid lobby peak", "Bundle spa + dinner for −12% cost", "Choose corner rooms for lower noise"].map((t)=>(
            <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Amenity Usage Forecast</div>
        <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">
          {[48,36,28,22,16].map((h,i)=>(<div key={i} className="w-8 rounded-md bg-primary/70" style={{height:`${h}%`}} />))}
        </div>
        <div className="text-[11px] text-muted">Projected visits this stay: gym • spa • pool • bar • lounge</div>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Travel Companions</div>
        <table className="w-full text-left text-sm">
          <thead><tr className="text-muted"><th className="py-2 px-2">Name</th><th className="py-2 px-2">Notes</th></tr></thead>
          <tbody>
            {[
              ["Jamie R.", "Needs gluten‑free breakfast"],
              ["Priya S.", "Prefers firm pillows"],
            ].map((r,i)=>(<tr key={i} className="border-t border-line/60"><td className="py-2 px-2">{r[0]}</td><td className="py-2 px-2">{r[1]}</td></tr>))}
          </tbody>
        </table>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Noise Heatmap (Floor)</div>
        <div className="mt-2 h-44 border border-line/60 rounded-md p-3 grid grid-cols-6 gap-1">
          {Array.from({length:36}).map((_,i)=>(
            <div key={i} className="h-6 rounded" style={{background: `rgba(59,130,246,${0.15 + (i%6)/10})`}} />
          ))}
        </div>
        <div className="text-[11px] text-muted">Darker cells indicate higher evening noise (demo).</div>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Packing Checklist</div>
        <ul className="space-y-2 text-sm">
          {["Adapter (Type C)", "Gym shoes", "Swimwear", "Medication (AM/PM)"].map((t)=>(
            <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-ink mb-2">Transportation Plans</div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between"><span className="text-muted">Arrival</span><span className="text-ink">Airport pickup • 18:10</span></div>
          <div className="flex items-center justify-between"><span className="text-muted">In‑city</span><span className="text-ink">Metro day‑pass suggested</span></div>
          <div className="flex items-center justify-between"><span className="text-muted">Departure</span><span className="text-ink">Taxi booked • 13:30</span></div>
        </div>
      </div>
    </div>
  );
}
