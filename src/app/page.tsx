"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Default landing: Insurance dashboard (SU removed)
    router.replace("/insurance-dashboard");
  }, [router]);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold text-primary">Loading dashboard…</h1>
      <p className="text-neutral-dark/70">Redirecting to your dashboard.</p>
    </div>
  );
}
