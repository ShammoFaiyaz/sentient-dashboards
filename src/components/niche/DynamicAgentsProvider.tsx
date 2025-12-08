"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import { AgentsProvider } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";

export default function DynamicAgentsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const slug = (Object.keys(NICHES) as Array<keyof typeof NICHES>).find((s) => pathname.startsWith("/" + s));
  const storageKey = slug ? NICHES[slug].storageKey : "su_agents_state";
  return <AgentsProvider storageKey={storageKey}>{children}</AgentsProvider>;
}


