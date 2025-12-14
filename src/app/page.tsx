"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    try {
      // One-time auto reload on first ever visit (per browser)
      const reloadFlagKey = "app.initialReloadDone";
      const hasReloaded = localStorage.getItem(reloadFlagKey);
      if (!hasReloaded) {
        localStorage.setItem(reloadFlagKey, "1");
        window.location.reload();
        return;
      }

      // Default landing: Insurance dashboard, Claims Adjuster role
      // Ensure the Insurance dashboard persona starts as Claims Adjuster
      localStorage.setItem("niche.role.insurance-dashboard", "Claims Adjuster");
      // Notify any listeners that the niche role changed
      window.dispatchEvent(new Event("niche-role-changed"));

      router.replace("/insurance-dashboard");
    } catch {
      // ignore storage errors (e.g. SSR / privacy mode) and still navigate
      router.replace("/insurance-dashboard");
    }
  }, [router]);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold text-primary">Loading dashboard…</h1>
      <p className="text-neutral-dark/70">Redirecting to your dashboard.</p>
    </div>
  );
}
