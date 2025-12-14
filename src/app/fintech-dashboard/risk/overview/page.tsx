"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useRole } from "@/components/role/RoleProvider";
import { usePathname } from "next/navigation";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

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

export default function RiskOverviewPage() {
  const { agents } = useAgents();
  const { role } = useRole();
  const pathname = usePathname() || "";
  const config = NICHES["fintech-dashboard"];
  const effectiveRole = pathname.includes("/fintech-dashboard/admin/") ? "admin" : role;
  const featured = agentsForNicheAndRole("fintech-dashboard", agents, {
    suRole: effectiveRole,
  }).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">Risk Insights Agent — surfaces exposures, breaches, and scenario outcomes.</p>
          </div>
          <a href="/fintech-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">{featured.map((a)=><AgentTile key={a.id} agent={a} status={a.online ? "online":"offline"} />)}</div>
      </section>

      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Market Risk" value="Medium" hint="volatility adjusted" colorHex="#004AAD" />
        <Kpi label="Credit Risk" value="Low" hint="PD/LGD models" colorHex="#008C74" />
        <Kpi label="Liquidity Risk" value="Medium" hint="stress CFR" colorHex="#6D28D9" />
        <Kpi label="Operational Risk" value="Low" hint="incidents" colorHex="#F4B23E" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Risk Score by Category</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
            <svg viewBox="0 0 220 220" className="w-52 h-52">
              {/* simple radar polygon */}
              <g transform="translate(110,110)" fill="none" stroke="#e5e7eb">
                {[1,2,3,4,5].map((k)=> <polygon key={k} points="0,-80 76,-24 47,64 -47,64 -76,-24" transform={`scale(${k*0.2})`} />)}
              </g>
              <g transform="translate(110,110)" fill="rgba(79,121,214,0.25)" stroke="#4F79D6">
                <polygon points="0,-60 60,-18 40,40 -30,48 -58,-18" />
              </g>
            </svg>
          </div>
          <div className="text-[11px] text-muted">Radar chart of normalized risk scores.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-ink mb-2">Risk Segmentation</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm"><thead><tr className="text-muted"><th className="py-2 px-3">Segment</th><th className="py-2 px-3">Assets</th><th className="py-2 px-3">Exposure</th><th className="py-2 px-3">Risk Score</th></tr></thead><tbody>{
              [["Equities","120","$42M","0.42"],["Credit","30","$18M","0.35"],["Crypto","15","$6M","0.61"]].map((r,i)=>(<tr key={i} className="border-t border-line/60">{r.map((c,j)=><td key={j} className="py-2 px-3">{c}</td>)}</tr>))
            }</tbody></table>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Portfolio Sensitivity Analysis</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-end gap-3">{[18,12,8,5].map((h,i)=>(<div key={i} className="w-10 rounded-md bg-primary/70" style={{height:`${h}%`}}/>))}</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">Scenario Analysis Summary</div>
          <ul className="space-y-2">{["+100bps rates → -2.1% PnL","-10% equity shock → -3.8% PnL","Oil +$15 → +0.4% PnL"].map((t)=>(<li key={t} className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>))}</ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-ink mb-2">High‑Risk Assets</div>
          <ul className="space-y-2 text-sm">{["ASSET‑X (VaR 1.9M)","ASSET‑Y (VaR 1.2M)","ASSET‑Z (VaR 0.9M)"].map((t)=>(<li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2"><span className="text-ink">{t}</span><span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Review</span></li>))}</ul>
        </div>
      </div>

      {/* Additional AI-agent sections */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Early‑Warning Signals (AI)</div>
          <ul className="space-y-2 text-sm">
            {["Options skew indicates downside tail risk in Tech.","Credit spreads widening in HY by 24 bps.","Liquidity dry‑up risk on small caps (order book depth ↓)."].map((t)=>(
              <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/><span className="text-ink">{t}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Breach Probability Forecast</div>
          <div className="mt-2 h-44 border border-line/60 rounded-md p-3">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <g stroke="#e5e7eb"><line x1="0" y1="100" x2="320" y2="100" /></g>
              <polyline fill="none" stroke="#6C8CF5" strokeWidth="2" points="10,98 40,94 70,88 100,85 130,82 160,78 190,75 220,72 250,70 280,68 310,66" />
            </svg>
          </div>
          <div className="text-[11px] text-muted">AI‑predicted probability of any limit breach (next 7 days).</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Auto‑Hedge Suggestions</div>
          <ul className="space-y-2 text-sm">
            {["Buy SPY puts (delta‑neutral) to cap equity beta.","Enter payer swap to hedge rates DV01 +$250k.","Long XLE vs short QQQ pair to neutralize sector skew."].map((t)=>(
              <li key={t} className="flex items-center justify-between rounded-md border border-line/60 px-3 py-2"><span className="text-ink">{t}</span><button className="rounded-md border border-line px-2 py-0.5 text-xs">Simulate</button></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Correlation Hotspots (AI)</div>
          <div className="mt-2 grid grid-cols-12 gap-1">
            {Array.from({length:96}).map((_,i)=>(<div key={i} className="h-4 rounded" style={{background: i%9===0?"#7c3aed":i%4===0?"#a78bfa":i%3===0?"#c7d2fe":"#e2e8f0"}}/>))}
          </div>
          <div className="text-[11px] text-muted mt-2">Dark cells highlight clusters with high co‑movement.</div>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Risk Appetite Alignment</div>
          <div className="space-y-2 text-sm">
            {["Market risk","Liquidity","Concentration"].map((k,i)=>(
              <div key={k}>
                <div className="mb-1 text-muted">{k}</div>
                <div className="h-2 w-full rounded bg-ink/10"><div className="h-2 rounded bg-primary" style={{width:`${60+i*12}%`}}/></div>
              </div>
            ))}
          </div>
        </div>
        {/* Actions Queue removed per request */}
      </div>
    </div>
  );
}


