"use client";

import * as React from "react";

type TableRow = React.ReactNode[];

export function TableCard({
  title,
  columns,
  rows,
  caption,
}: {
  title: string;
  columns: string[];
  rows: TableRow[];
  caption?: string;
}) {
  return (
    <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
      <div className="text-sm font-semibold text-primary mb-2">{title}</div>
      <div className="overflow-x-auto border border-line/60 rounded-md">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="text-muted">
              {columns.map((c) => (
                <th key={c} className="py-2 px-2 sm:px-3 whitespace-nowrap">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-line/60">
                {r.map((cell, j) => (
                  <td key={j} className="py-2 px-2 sm:px-3 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <div className="mt-1 text-[11px] text-muted">{caption}</div>}
    </div>
  );
}

export function BarChartCard({ title, caption }: { title: string; caption?: string }) {
  return (
    <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
      <div className="text-sm font-semibold text-ink mb-2">{title}</div>
      <div className="mt-1 h-40 border border-line/60 rounded-md p-3 flex items-end gap-2">
        {[32, 48, 24, 40, 18].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-md bg-primary/70"
            style={{ height: `${Math.max(10, h)}%` }}
          />
        ))}
      </div>
      {caption && <div className="mt-1 text-[11px] text-muted">{caption}</div>}
    </div>
  );
}

export function DonutCard({ title, caption }: { title: string; caption?: string }) {
  return (
    <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
      <div className="text-sm font-semibold text-ink mb-2">{title}</div>
      <div className="mt-1 h-40 border border-line/60 rounded-md p-3 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-32 h-32">
          <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="22" />
          <g transform="rotate(-90 100 100)">
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="22"
              strokeDasharray="160 240"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="#34D399"
              strokeWidth="22"
              strokeDasharray="80 320"
              strokeDashoffset="-160"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="22"
              strokeDasharray="40 360"
              strokeDashoffset="-240"
            />
          </g>
          <circle cx="100" cy="100" r="40" fill="white" />
        </svg>
      </div>
      {caption && <div className="mt-1 text-[11px] text-muted">{caption}</div>}
    </div>
  );
}

export function ListCard({
  title,
  items,
  caption,
}: {
  title: string;
  items: string[];
  caption?: string;
}) {
  return (
    <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
      <div className="text-sm font-semibold text-ink mb-2">{title}</div>
      <ul className="space-y-2 text-xs sm:text-sm">
        {items.map((t) => (
          <li key={t} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-ink">{t}</span>
          </li>
        ))}
      </ul>
      {caption && <div className="mt-1 text-[11px] text-muted">{caption}</div>}
    </div>
  );
}

export function FormCard({
  title,
  fields,
  submitLabel = "Save",
}: {
  title: string;
  fields: { label: string; placeholder?: string }[];
  submitLabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
      <div className="text-sm font-semibold text-ink mb-2">{title}</div>
      <form className="space-y-2">
        {fields.map((f) => (
          <label key={f.label} className="block text-xs sm:text-sm">
            <div className="mb-0.5 text-muted">{f.label}</div>
            <input
              className="w-full rounded-md border border-line/60 px-2 py-1.5 text-xs sm:text-sm"
              placeholder={f.placeholder}
            />
          </label>
        ))}
        <button
          type="button"
          className="mt-1 rounded-md bg-primary px-3 py-1.5 text-xs sm:text-sm font-medium text-white"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
}

export function CalendarCard({ title }: { title: string }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
      <div className="text-sm font-semibold text-ink mb-2">{title}</div>
      <div className="border border-line/60 rounded-md p-2 text-center">
        <div className="mb-1 text-xs text-muted">This Week</div>
        <div className="grid grid-cols-7 gap-1 text-xs">
          {days.map((d) => (
            <div key={d} className="py-1 text-muted">
              {d}
            </div>
          ))}
          {Array.from({ length: 21 }).map((_, i) => (
            <div
              key={i}
              className={`h-7 rounded text-[11px] flex items-center justify-center ${
                i === 9 ? "bg-primary text-white" : "bg-neutral-light/60 text-ink"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StatGridCard({
  title,
  stats,
}: {
  title: string;
  stats: { label: string; value: string }[];
}) {
  return (
    <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
      <div className="text-sm font-semibold text-ink mb-2">{title}</div>
      <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-line/60 px-2 py-1.5 flex flex-col gap-0.5"
          >
            <span className="text-[11px] text-muted">{s.label}</span>
            <span className="text-sm font-semibold text-primary">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}



