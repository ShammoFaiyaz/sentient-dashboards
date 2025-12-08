"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/components/role/RoleProvider";

export default function Home() {
  const router = useRouter();
  const { role } = useRole();

  useEffect(() => {
    // SU dashboards removed; default to a live niche dashboard
    router.replace("/fintech-dashboard");
  }, [role, router]);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold text-primary">Loading dashboard…</h1>
      <p className="text-neutral-dark/70">Redirecting to Sentient Dashboard.</p>
    </div>
  );
}
