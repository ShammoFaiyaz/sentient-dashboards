"use client";

import { useMessageCenter } from "@/context/MessageCenterContext";
import { usePathname } from "next/navigation";
import { useNicheRole } from "@/components/niche/useNicheRole";
import { useRole } from "@/components/role/RoleProvider";
import { X, Search, SquarePen } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

function useRoleAwareThreads() {
  const pathname = usePathname();
  const { role } = useRole();
  const insRole = useNicheRole("insurance-dashboard", "Claims Adjuster");
  const finRole = useNicheRole("fintech-dashboard", "Portfolio Manager");
  const hcRole = useNicheRole("healthcare-dashboard", "Doctor");
  const hospRole = useNicheRole("hospitality-dashboard", "Guest");
  const retailRole = useNicheRole("retail-dashboard", "Store Manager");
  const logRole = useNicheRole("logistics-dashboard", "Operations Manager");
  if (pathname?.startsWith("/insurance-dashboard")) {
    if (insRole === "Claims Adjuster") {
      return [
        { id: "t1", name: "Customer • CLM-10245", last: "Uploaded photos for FNOL.", avatar: "/news/policy.svg", unread: 1 },
        { id: "t2", name: "Supervisor", last: "Please prioritize SLA cases.", avatar: "/news/lab.svg", unread: 1 },
      ];
    } else if (insRole === "Underwriter") {
      return [
        { id: "t3", name: "Broker • UWR-884", last: "Shared additional docs.", avatar: "/news/ai.svg", unread: 1 },
        { id: "t4", name: "Pricing Team", last: "Review the new rate card.", avatar: "/news/lab.svg", unread: 0 },
      ];
    } else if (insRole === "Customer") {
      return [
        { id: "t5", name: "Support", last: "Your claim moved to review.", avatar: "/news/policy.svg", unread: 1 },
      ];
    }
  }
  if (pathname?.startsWith("/fintech-dashboard")) {
    if (finRole === "Portfolio Manager") {
      return [
        { id: "ft1", name: "Trader Desk", last: "Filled order for ETF rebalancing.", avatar: "/news/ai.svg", unread: 1 },
        { id: "ft2", name: "Risk Officer", last: "Please review VaR jump (1d).", avatar: "/news/lab.svg", unread: 0 },
      ];
    } else if (finRole === "Customer") {
      return [
        { id: "ft3", name: "Support", last: "Your card dispute is under review.", avatar: "/news/policy.svg", unread: 1 },
        { id: "ft4", name: "Personal Finance Agent", last: "Budget suggestion for this month.", avatar: "/news/ai.svg", unread: 0 },
      ];
    } else if (finRole === "Risk Officer") {
      return [
        { id: "ft5", name: "PM – Growth Fund", last: "Hedging proposal acknowledged.", avatar: "/news/lab.svg", unread: 1 },
      ];
    } else {
      return [{ id: "ft6", name: "System", last: "New rule changes deployed.", avatar: "/news/policy.svg", unread: 1 }];
    }
  }
  if (pathname?.startsWith("/healthcare-dashboard")) {
    if (hcRole === "Doctor") {
      return [
        { id: "hc1", name: "Patient – J. Evans", last: "Shared new symptoms before visit.", avatar: "/news/lab.svg", unread: 1 },
        { id: "hc2", name: "Lab Services", last: "CBC results available.", avatar: "/news/policy.svg", unread: 1 },
      ];
    } else if (hcRole === "Patient") {
      return [
        { id: "hc3", name: "Clinic Desk", last: "Appointment confirmed for Fri 10:00.", avatar: "/news/ai.svg", unread: 1 },
        { id: "hc4", name: "Care Team", last: "Medication reminder for tonight.", avatar: "/news/lab.svg", unread: 0 },
      ];
    } else {
      return [{ id: "hc5", name: "IT Admin", last: "EHR integration running normally.", avatar: "/news/policy.svg", unread: 0 }];
    }
  }
  if (pathname?.startsWith("/hospitality-dashboard")) {
    if (hospRole === "Front Desk") {
      return [
        { id: "hp1", name: "Guest – S. Patel", last: "Late arrival noted, prepare key.", avatar: "/news/ai.svg", unread: 1 },
        { id: "hp2", name: "Housekeeping Lead", last: "Room 1602 needs crib setup.", avatar: "/news/lab.svg", unread: 0 },
      ];
    } else if (hospRole === "Guest") {
      return [
        { id: "hp3", name: "Front Desk", last: "Your airport pickup is confirmed.", avatar: "/news/policy.svg", unread: 1 },
        { id: "hp4", name: "Concierge", last: "Dinner reservation set for 7:30 PM.", avatar: "/news/ai.svg", unread: 0 },
      ];
    } else if (hospRole === "Ops Manager") {
      return [
        { id: "hp5", name: "Maintenance", last: "Leak fixed at Block B.", avatar: "/news/lab.svg", unread: 1 },
        { id: "hp6", name: "Front Desk", last: "Need extra agent 18:00–20:00.", avatar: "/news/policy.svg", unread: 0 },
      ];
    } else {
      return [{ id: "hp7", name: "System", last: "All integrations healthy.", avatar: "/news/policy.svg", unread: 0 }];
    }
  }
  if (pathname?.startsWith("/retail-dashboard")) {
    if (retailRole === "Store Manager") {
      return [
        { id: "rt1", name: "Floor Lead", last: "Promotion signs placed.", avatar: "/news/ai.svg", unread: 1 },
        { id: "rt2", name: "Inventory", last: "Backorder ETA updated.", avatar: "/news/lab.svg", unread: 0 },
      ];
    } else if (retailRole === "Customer") {
      return [
        { id: "rt3", name: "Support", last: "Order shipped with tracking.", avatar: "/news/policy.svg", unread: 1 },
      ];
    } else if (retailRole === "Merchandiser") {
      return [
        { id: "rt4", name: "Supplier – O‑Textiles", last: "New fabric samples shared.", avatar: "/news/lab.svg", unread: 1 },
      ];
    } else {
      return [{ id: "rt5", name: "System", last: "New analytics dashboard enabled.", avatar: "/news/policy.svg", unread: 0 }];
    }
  }
  if (pathname?.startsWith("/logistics-dashboard")) {
    if (logRole === "Operations Manager") {
      return [
        {
          id: "lg1",
          name: "Control Tower Team",
          last: "Flagged service dip on West Coast lane – check live board.",
          avatar: "/news/ai.svg",
          unread: 1,
        },
        {
          id: "lg2",
          name: "Carrier Success • Carrier A",
          last: "Shared updated capacity plan for next week.",
          avatar: "/news/lab.svg",
          unread: 0,
        },
      ];
    } else if (logRole === "Warehouse Supervisor") {
      return [
        {
          id: "lg3",
          name: "Inbound Planner",
          last: "Early inbound wave arriving 30 min ahead of schedule.",
          avatar: "/news/policy.svg",
          unread: 1,
        },
        {
          id: "lg4",
          name: "Yard Lead",
          last: "Two trailers queued for D3 – confirm door swap?",
          avatar: "/news/ai.svg",
          unread: 1,
        },
      ];
    } else if (logRole === "Distributions Operator") {
      return [
        {
          id: "lg5",
          name: "Dispatch",
          last: "New high-priority stop added to afternoon route.",
          avatar: "/news/lab.svg",
          unread: 1,
        },
        {
          id: "lg6",
          name: "Customer Chat – Today’s First Stop",
          last: "Gate code and delivery notes shared.",
          avatar: "/news/policy.svg",
          unread: 0,
        },
      ];
    } else if (logRole === "Admin") {
      return [
        {
          id: "lg7",
          name: "Network Design Lead",
          last: "Requested review of new lane proposal for APAC.",
          avatar: "/news/ai.svg",
          unread: 1,
        },
        {
          id: "lg8",
          name: "Security & Compliance",
          last: "Access review for DC admins due this week.",
          avatar: "/news/policy.svg",
          unread: 0,
        },
      ];
    }
  }
  if (role === "teacher") {
    return [
      { id: "t6", name: "Class – Section A", last: "Quiz opens today 3pm.", avatar: "/news/lab.svg", unread: 2 },
      { id: "t7", name: "Dept. Admin", last: "Room change confirmed.", avatar: "/news/ai.svg", unread: 0 },
    ];
  }
  if (role === "student") {
    return [
      { id: "t8", name: "Admissions", last: "We received your docs ✔", avatar: "/news/policy.svg", unread: 1 },
      { id: "t9", name: "Career Coach", last: "Mock interview link shared.", avatar: "/news/ai.svg", unread: 0 },
    ];
  }
  return [
    { id: "t10", name: "System", last: "Welcome to the platform!", avatar: "/news/policy.svg", unread: 0 },
  ];
}

export default function MessageCenterSheet() {
  const { isOpen, setOpen, setUnread } = useMessageCenter();
  const threads = useRoleAwareThreads();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[110] h-full w-[min(96vw,420px)] bg-white dark:bg-neutral-900 shadow-elevation-md border-l border-neutral-200/70 dark:border-neutral-800 flex flex-col"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            role="dialog"
            aria-label="Messaging Center"
          >
            <header className="flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-800 px-4 py-3">
              <h2 className="text-base font-semibold">Messaging Center</h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="p-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                <input
                  className="w-full rounded-lg border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-900 pl-9 pr-3 py-2 text-sm outline-none"
                  placeholder="Search conversations"
                />
              </div>

              <ul className="mt-4 space-y-2">
                {threads.map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => setUnread((u) => Math.max(0, u - t.unread))}
                      className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      <div className="relative h-9 w-9 overflow-hidden rounded-full">
                        <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{t.name}</span>
                          {t.unread > 0 && (
                            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                              {t.unread}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-500">{t.last}</div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compose floating action button */}
            <button
              aria-label="New message"
              className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
              onClick={() => {/* UI-only compose */}}
            >
              <SquarePen className="h-6 w-6" />
            </button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}


