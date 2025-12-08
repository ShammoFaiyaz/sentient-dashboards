"use client";

import { Card, CardTitle } from "@/components/ui/Card";

export function AgentMonitor({
  kpis = {
    completed: "1,240",
    incomplete: "96",
    slaMet: "98.2%",
    avgLatency: "1.4s",
  },
  title = "",
}: {
  kpis?: { completed: string; incomplete: string; slaMet: string; avgLatency: string };
  title?: string;
}) {
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {title ? <h1 className="text-2xl font-semibold text-primary">{title}</h1> : null}

      {/* KPI ribbon (screenshot-style gradient cards) */}
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <KpiCard
          label="Completed tasks"
          value={kpis.completed}
          hint="last 24h"
          bullets={["High success rate", "Throughput trending up"]}
          gradient="linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)"
          valueColor="#004AAD"
        />
        <KpiCard
          label="Incomplete tasks"
          value={kpis.incomplete}
          hint="action needed"
          bullets={["Retries scheduled", "Check agent configs"]}
          gradient="linear-gradient(180deg, rgba(0,140,116,0.14) 0%, rgba(255,255,255,1) 100%)"
          valueColor="#008C74"
        />
        <KpiCard
          label="SLA met"
          value={kpis.slaMet}
          hint="within target"
          bullets={["95% target → green", "Alert at < 90%"]}
          gradient="linear-gradient(180deg, rgba(109,40,217,0.12) 0%, rgba(255,255,255,1) 100%)"
          valueColor="#6D28D9"
        />
        <KpiCard
          label="Avg latency"
          value={kpis.avgLatency}
          hint="last hour"
          bullets={["P95: 2.3s", "P99: 3.1s"]}
          gradient="linear-gradient(180deg, rgba(244,178,62,0.18) 0%, rgba(255,255,255,1) 100%)"
          valueColor="#F4B23E"
        />
      </div>

      {/* Techie graphs */}
      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardTitle>Throughput Over Time</CardTitle>
          <ChartPlaceholder kind="area" />
        </Card>
        <Card>
          <CardTitle>Status Distribution</CardTitle>
          <ChartPlaceholder kind="donut" />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card>
          <CardTitle>Top Agents by Tasks</CardTitle>
          <ChartPlaceholder kind="bars" />
        </Card>
        <Card>
          <CardTitle>Error Types</CardTitle>
          <ChartPlaceholder kind="pie" />
        </Card>
        <Card>
          <CardTitle>Latency Percentiles</CardTitle>
          <div className="mt-3 space-y-3">
            <GaugeRow label="P50" value={72} />
            <GaugeRow label="P90" value={54} />
            <GaugeRow label="P95" value={38} />
            <GaugeRow label="P99" value={22} />
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardTitle>Agent Health Heatmap</CardTitle>
          <HeatmapPlaceholder />
        </Card>
        <Card>
          <CardTitle>Queue Depth</CardTitle>
          <ChartPlaceholder kind="line" />
        </Card>
      </div>

      {/* Additional high‑tech monitoring sections */}
      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardTitle>Token Usage (Last Hour)</CardTitle>
          <ChartPlaceholder kind="area" />
        </Card>
        <Card>
          <CardTitle>Model Mix</CardTitle>
          <ChartPlaceholder kind="donut" />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card>
          <CardTitle>Retrieval Hit Rate</CardTitle>
          <ChartPlaceholder kind="line" />
        </Card>
        <Card>
          <CardTitle>Cost by Service (USD)</CardTitle>
          <ChartPlaceholder kind="bars" />
        </Card>
        <Card>
          <CardTitle>Anomaly Score (7d)</CardTitle>
          <ChartPlaceholder kind="line" />
        </Card>
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  hint,
  bullets,
  gradient,
  valueColor,
}: {
  label: string;
  value: string;
  hint: string;
  bullets: string[];
  gradient: string;
  valueColor: string;
}) {
  return (
    <div
      className="rounded-2xl p-4 shadow-md"
      style={{ background: gradient, border: "1px solid var(--color-neutral)" }}
    >
      <div className="text-xs text-muted">{label}</div>
      <div className="text-2xl font-semibold" style={{ color: valueColor }}>
        {value}
      </div>
      <div className="text-xs text-neutral-600">{hint}</div>
      <ul className="mt-2 list-inside list-disc text-xs text-neutral-700">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function ChartPlaceholder({ kind }: { kind: "area" | "donut" | "bars" | "pie" | "line" }) {
  // Lightweight inline SVG charts (mock data) so panels never look empty
  const common = { width: "100%", height: 200, viewBox: "0 0 400 200" } as const;
  const Grid = () => (
    <g stroke="#eef" strokeWidth="1">
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={i} x1="0" y1={40 * (i + 1)} x2="400" y2={40 * (i + 1)} />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`v-${i}`} x1={60 * (i + 1)} y1="0" x2={60 * (i + 1)} y2="200" />
      ))}
    </g>
  );

  let body: React.ReactNode = null;
  if (kind === "area") {
    body = (
      <svg {...common} style={{ width: "100%", display: "block", margin: "0 auto" }}>
        <Grid />
        {/* axes */}
        <g stroke="#cbd5e1" strokeWidth="1">
          <line x1="30" y1="10" x2="30" y2="180" />
          <line x1="30" y1="180" x2="380" y2="180" />
        </g>
        {/* y ticks */}
        <g fill="#64748b" fontSize="10">
          <text x="5" y="182">0</text>
          <text x="0" y="142">50</text>
          <text x="0" y="102">100</text>
          <text x="0" y="62">150</text>
        </g>
        {/* x ticks with extended times and wider gaps */}
        <g fill="#64748b" fontSize="10">
          {["09:00","11:00","13:00","15:00","17:00","19:00","21:00","23:00","25:00"].map((t,i)=>(
            <text key={t} x={40 + i*40} y="195">{t}</text>
          ))}
        </g>
        <polyline
          points="30,150 60,160 95,120 130,130 165,90 200,100 235,70 270,80 305,60 340,65"
          fill="url(#gradBlue)"
          stroke="#6C8CF5"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="gradBlue" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>
    );
  } else if (kind === "line") {
    body = (
      <svg {...common} style={{ width: "100%", display: "block", margin: "0 auto" }}>
        <Grid />
        <g stroke="#cbd5e1" strokeWidth="1">
          <line x1="30" y1="10" x2="30" y2="180" />
          <line x1="30" y1="180" x2="380" y2="180" />
        </g>
        <g fill="#64748b" fontSize="10">
          <text x="5" y="182">0</text>
          <text x="0" y="142">50</text>
          <text x="0" y="102">100</text>
          <text x="0" y="62">150</text>
        </g>
        <g fill="#64748b" fontSize="10">
          {["Mon","Tue","Wed","Thu","Fri"].map((t,i)=>(
            <text key={t} x={70 + i*70} y="195">{t}</text>
          ))}
        </g>
        <polyline
          points="30,150 70,140 110,130 150,120 190,100 230,110 270,90 310,95 350,80 380,85"
          fill="none"
          stroke="#10B981"
          strokeWidth="3"
        />
      </svg>
    );
  } else if (kind === "bars") {
    body = (
      <svg {...common} style={{ width: "100%", display: "block", margin: "0 auto" }}>
        <Grid />
        {/*
          Raise the baseline so bars and x‑axis labels sit higher
          (reduces bottom whitespace and improves visual alignment)
        */}
        {(() => {
          const baseY = 176; // nudge bars and labels further higher
          return ([
          { x: 20, h: 60, label: "Concierge", v: 62 },
          { x: 100, h: 110, label: "Admissions", v: 118 },
          { x: 180, h: 85, label: "Scheduler", v: 90 },
          { x: 260, h: 140, label: "DocBot", v: 145 },
          { x: 340, h: 120, label: "Helpdesk", v: 126 },
        ] as const).map((b, i) => (
            <g key={i}>
              <rect x={b.x} y={baseY - b.h} width="30" height={b.h} fill="#8B5CF6" rx="4" />
              <text x={b.x + 15} y={baseY - b.h - 16} textAnchor="middle" fontSize="12" fill="#64748b">
                {b.v}
              </text>
              {/* x-axis labels lowered slightly for spacing */}
              <text x={b.x + 15} y={baseY + 12} textAnchor="middle" fontSize="12" fill="#64748b">
                {b.label}
              </text>
            </g>
          ));
        })()}
      </svg>
    );
  } else if (kind === "donut") {
    // Simple donut with 3 segments
    const cx = 100,
      cy = 100,
      r = 70,
      t = 18;
    body = (
      <svg {...common} style={{ width: "100%", display: "block", margin: "0 auto" }}>
        <g transform={`translate(${200},0)`}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth={t} />
          {/* segments using strokeDasharray */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#34D399"
            strokeWidth={t}
            strokeDasharray={`${2.2 * r} ${2 * Math.PI * r}`}
            strokeDashoffset="0"
          />
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#60A5FA"
            strokeWidth={t}
            strokeDasharray={`${1.6 * r} ${2 * Math.PI * r}`}
            strokeDashoffset={-2.2 * r}
          />
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#F59E0B"
            strokeWidth={t}
            strokeDasharray={`${1.0 * r} ${2 * Math.PI * r}`}
            strokeDashoffset={-(2.2 * r + 1.6 * r)}
          />
        </g>
        {/* legend */}
        <g fontSize="14" fill="#334155">
          <rect x="20" y="70" width="10" height="10" fill="#34D399" />
          <text x="36" y="79">Running (35%)</text>
          <rect x="20" y="90" width="10" height="10" fill="#60A5FA" />
          <text x="36" y="99">Idle (25%)</text>
          <rect x="20" y="110" width="10" height="10" fill="#F59E0B" />
          <text x="36" y="119">Error (16%)</text>
        </g>
      </svg>
    );
  } else if (kind === "pie") {
    // Simple pie with arcs
    const cx = 120,
      cy = 100,
      r = 70;
    const arc = (start: number, end: number, color: string) => {
      const rad = (a: number) => (Math.PI / 180) * a;
      const x1 = cx + r * Math.cos(rad(start));
      const y1 = cy + r * Math.sin(rad(start));
      const x2 = cx + r * Math.cos(rad(end));
      const y2 = cy + r * Math.sin(rad(end));
      const large = end - start > 180 ? 1 : 0;
      return <path d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`} fill={color} />;
    };
    body = (
      <svg {...common} style={{ width: "100%", display: "block", margin: "0 auto" }}>
        <g>
          {arc(0, 120, "#93C5FD")}
          {arc(120, 240, "#A7F3D0")}
          {arc(240, 360, "#FDE68A")}
        </g>
        {/* labels */}
        <g fontSize="14" fill="#334155">
          <rect x="230" y="80" width="10" height="10" fill="#93C5FD" />
          <text x="246" y="89">Timeout (33%)</text>
          <rect x="230" y="100" width="10" height="10" fill="#A7F3D0" />
          <text x="246" y="109">Validation (33%)</text>
          <rect x="230" y="120" width="10" height="10" fill="#FDE68A" />
          <text x="246" y="129">Network (34%)</text>
        </g>
      </svg>
    );
  }

  return (
    <div className="mt-3">
      {body}
    </div>
  );
}

function HeatmapPlaceholder() {
  // More controlled layout to prevent misalignment
  const hours = ["00h", "04h", "08h", "12h", "16h", "20h"];
  return (
    <div className="mt-3">
      <div className="flex">
        {/* y-axis */}
        <div className="pr-2">
          <div className="flex flex-col items-end justify-between" style={{ height: 6 * 28 }}>
            {hours.map((t) => (
              <div key={t} className="h-6 flex items-center justify-end text-[11px] text-muted">
                {t}
              </div>
            ))}
          </div>
        </div>
        {/* heat columns - stretch to fill */}
        <div className="grid gap-1 flex-1" style={{ gridTemplateColumns: "repeat(20, minmax(30px, 1fr))" }}>
          {Array.from({ length: 20 }).map((_, col) => (
            <div key={col} className="flex flex-col gap-1">
              {Array.from({ length: 6 }).map((__, row) => {
                const val = Math.floor((Math.sin((col + row) * 1.3) + 1) * 50 + ((col % 3) * 10));
                const color =
                  val > 80 ? "#7c3aed" :
                  val > 60 ? "#8b5cf6" :
                  val > 40 ? "#a78bfa" :
                  val > 20 ? "#c7d2fe" : "#e2e8f0";
                return <div key={row} title={`${val} tasks`} className="h-6 w-full rounded" style={{ background: color }} />;
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
        <span>Mon Tue Wed Thu Fri Sat Sun</span>
        <span>heatmap (darker = more tasks)</span>
      </div>
      <div className="mt-1 flex items-center gap-2 text-[11px] text-muted">
        <span>0</span>
        <div className="h-2 w-24 rounded" style={{ background: "linear-gradient(90deg,#e2e8f0,#c7d2fe,#a78bfa,#8b5cf6,#7c3aed)" }} />
        <span>100+</span>
      </div>
    </div>
  );
}

function GaugeRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-neutral-600">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded bg-ink/10">
        <div className="h-full bg-primary" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}


