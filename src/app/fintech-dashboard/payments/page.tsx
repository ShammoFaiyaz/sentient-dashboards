"use client";

import { useNicheRole } from "@/components/niche/useNicheRole";

export default function PaymentsPage() {
  const role = useNicheRole("fintech-dashboard", "Ops");
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <h1 className="text-2xl font-semibold text-primary">Payments</h1>
      <div className="text-sm text-muted mb-3">Role: {role}</div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Volume</div>
          <div className="h-48 rounded-md bg-gradient-to-br from-zinc-50 to-zinc-100/60 border border-dashed border-zinc-300 flex items-center justify-center text-xs text-zinc-500">line chart placeholder</div>
        </div>
        <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
          <div className="text-sm font-semibold text-ink mb-2">Failures</div>
          <div className="h-48 rounded-md bg-gradient-to-br from-zinc-50 to-zinc-100/60 border border-dashed border-zinc-300 flex items-center justify-center text-xs text-zinc-500">bar chart placeholder</div>
        </div>
      </div>
    </div>
  );
}


