"use client";

import { useNicheRole } from "@/components/niche/useNicheRole";

export default function PromotionsPage() {
  const role = useNicheRole("retail-dashboard", "Admin");
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <h1 className="text-2xl font-semibold text-primary">Promotions</h1>
      <div className="text-sm text-muted mb-3">Role: {role}</div>
      <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
        <div className="text-sm font-semibold text-ink mb-2">Active Campaigns</div>
        <div className="h-56 rounded-md bg-gradient-to-br from-zinc-50 to-zinc-100/60 border border-dashed border-zinc-300 flex items-center justify-center text-xs text-zinc-500">campaign list placeholder</div>
      </div>
    </div>
  );
}


