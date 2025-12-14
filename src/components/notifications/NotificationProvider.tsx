"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useRole } from "@/components/role/RoleProvider";
import { useNicheRole } from "@/components/niche/useNicheRole";

export type NotificationItem = {
  id: string;
  title: string;
  time?: string;
  unread?: boolean;
};

type Ctx = {
  notifications: NotificationItem[];
  unreadCount: number;
  markAllRead: () => void;
  add: (item: Omit<NotificationItem, "id">) => void;
  markRead: (id: string) => void;
};

const NotificationContext = React.createContext<Ctx | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([
    { id: "n1", title: "Quiz today 3:00 PM", time: "2m ago", unread: true },
    { id: "n2", title: "Docs missing - Admissions", time: "1h ago", unread: true },
    { id: "n3", title: "New grading submissions", time: "3h ago", unread: false },
  ]);

  const pathname = usePathname();
  const { role } = useRole();
  const insRole = useNicheRole("insurance-dashboard", "Claims Adjuster");
  const finRole = useNicheRole("fintech-dashboard", "Portfolio Manager");
  const hcRole = useNicheRole("healthcare-dashboard", "Doctor");
  const hospRole = useNicheRole("hospitality-dashboard", "Guest");
  const retailRole = useNicheRole("retail-dashboard", "Store Manager");
  const logRole = useNicheRole("logistics-dashboard", "Operations Manager");

  // Role-aware demo notifications
  React.useEffect(() => {
    // SU roles (only when on SU routes)
    if (pathname?.startsWith("/student")) {
      setNotifications([
        { id: "s1", title: "New course material posted", time: "5m ago", unread: true },
        { id: "s2", title: "Assignment due tomorrow", time: "2h ago", unread: true },
      ]);
      return;
    }
    if (pathname?.startsWith("/teacher")) {
      setNotifications([
        { id: "t1", title: "3 submissions awaiting grading", time: "12m ago", unread: true },
        { id: "t2", title: "Student asked a question on Forum", time: "1h ago", unread: false },
      ]);
      return;
    }

    // Insurance niche roles
    if (pathname?.startsWith("/insurance-dashboard")) {
      if (insRole === "Claims Adjuster") {
        setNotifications([
          { id: "i1", title: "SLA breach nearing: CLM-10172", time: "4m ago", unread: true },
          { id: "i2", title: "New FNOL submitted: CLM-10245", time: "22m ago", unread: true },
        ]);
      } else if (insRole === "Underwriter") {
        setNotifications([
          { id: "i3", title: "Application UWR-884 requires risk review", time: "10m ago", unread: true },
          { id: "i4", title: "Pricing rule update published", time: "1h ago", unread: false },
        ]);
      } else if (insRole === "Customer") {
        setNotifications([
          { id: "i5", title: "Policy renewal available", time: "3h ago", unread: false },
          { id: "i6", title: "Claim CLM-10199 status changed to FNOL", time: "1d ago", unread: false },
        ]);
      } else if (insRole === "Admin") {
        setNotifications([
          { id: "i7", title: "2 new agents deployed to production", time: "35m ago", unread: true },
        ]);
      }
      return;
    }

    // Fintech
    if (pathname?.startsWith("/fintech-dashboard")) {
      if (finRole === "Portfolio Manager") {
        setNotifications([
          { id: "f1", title: "Order filled: ETF Rebalance", time: "8m ago", unread: true },
          { id: "f2", title: "Drawdown exceeded 5% on SmallCap", time: "28m ago", unread: true },
        ]);
      } else if (finRole === "Customer") {
        setNotifications([
          { id: "f3", title: "Card payment posted", time: "12m ago", unread: true },
          { id: "f4", title: "Suspicious login blocked", time: "1h ago", unread: false },
        ]);
      } else if (finRole === "Risk Officer") {
        setNotifications([
          { id: "f5", title: "VaR 95% up 1.3% d/d", time: "14m ago", unread: true },
          { id: "f6", title: "Limit nearing for Energy sector", time: "2h ago", unread: false },
        ]);
      } else {
        setNotifications([{ id: "f7", title: "Rule changes deployed to prod", time: "10m ago", unread: true }]);
      }
      return;
    }

    // Healthcare
    if (pathname?.startsWith("/healthcare-dashboard")) {
      if (hcRole === "Doctor") {
        setNotifications([
          { id: "h1", title: "New lab results available", time: "7m ago", unread: true },
          { id: "h2", title: "Patient added symptoms ahead of visit", time: "35m ago", unread: true },
        ]);
      } else if (hcRole === "Patient") {
        setNotifications([
          { id: "h3", title: "Appointment confirmed for Fri 10:00", time: "1h ago", unread: true },
          { id: "h4", title: "Medication reminder for tonight", time: "3h ago", unread: false },
        ]);
      } else {
        setNotifications([{ id: "h5", title: "EHR integration healthy", time: "just now", unread: false }]);
      }
      return;
    }

    // Hospitality
    if (pathname?.startsWith("/hospitality-dashboard")) {
      if (hospRole === "Front Desk") {
        setNotifications([
          { id: "hp1", title: "Late arrival noted: Room 1602", time: "9m ago", unread: true },
          { id: "hp2", title: "Keycard encoder maintenance 16:00", time: "1h ago", unread: false },
        ]);
      } else if (hospRole === "Guest") {
        setNotifications([
          { id: "hp3", title: "Airport pickup confirmed", time: "20m ago", unread: true },
          { id: "hp4", title: "Spa booking at 7:30 PM", time: "1h ago", unread: false },
        ]);
      } else if (hospRole === "Ops Manager") {
        setNotifications([
          { id: "hp5", title: "Water leak resolved at Block B", time: "12m ago", unread: true },
          { id: "hp6", title: "Expected lobby peak 17:00–19:00", time: "1h ago", unread: false },
        ]);
      } else {
        setNotifications([{ id: "hp7", title: "All integrations healthy", time: "just now", unread: false }]);
      }
      return;
    }

    // Retail
    if (pathname?.startsWith("/retail-dashboard")) {
      if (retailRole === "Store Manager") {
        setNotifications([
          { id: "r1", title: "Backorder ETA updated", time: "6m ago", unread: true },
          { id: "r2", title: "Promo live on homepage", time: "18m ago", unread: true },
        ]);
      } else if (retailRole === "Customer") {
        setNotifications([
          { id: "r3", title: "Order shipped with tracking", time: "1h ago", unread: true },
        ]);
      } else if (retailRole === "Merchandiser") {
        setNotifications([
          { id: "r4", title: "New supplier catalog available", time: "30m ago", unread: true },
        ]);
      } else {
        setNotifications([{ id: "r5", title: "System: nightly sync complete", time: "2h ago", unread: false }]);
      }
      return;
    }

    // Logistics
    if (pathname?.startsWith("/logistics-dashboard")) {
      if (logRole === "Operations Manager") {
        setNotifications([
          { id: "l1", title: "Control tower flagged 5 at-risk routes today", time: "6m ago", unread: true },
          { id: "l2", title: "Service dip on West Coast lane — review shipments board", time: "21m ago", unread: true },
        ]);
      } else if (logRole === "Warehouse Supervisor") {
        setNotifications([
          { id: "l3", title: "Inbound wave arriving early at Phoenix DC", time: "9m ago", unread: true },
          { id: "l4", title: "Two aisles above 95% utilization — consider re-slotting", time: "47m ago", unread: true },
        ]);
      } else if (logRole === "Distributions Operator") {
        setNotifications([
          { id: "l5", title: "New high-priority stop added to afternoon route", time: "12m ago", unread: true },
          { id: "l6", title: "2 deliveries require photo proof at drop-off", time: "1h ago", unread: false },
        ]);
      } else if (logRole === "Admin") {
        setNotifications([
          { id: "l7", title: "New agent deployed: Network Capacity Planner", time: "18m ago", unread: true },
          { id: "l8", title: "Access review overdue for EU warehouse supervisors", time: "2h ago", unread: true },
        ]);
      } else {
        setNotifications([{ id: "l9", title: "Logistics platform health: all services operational", time: "just now", unread: false }]);
      }
      return;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, role, insRole, finRole, hcRole, hospRole, retailRole, logRole]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = React.useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  const add = React.useCallback((item: Omit<NotificationItem, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setNotifications((prev) => [{ id, ...item }, ...prev]);
  }, []);

  const markRead = React.useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  }, []);

  const value = React.useMemo<Ctx>(() => ({ notifications, unreadCount, markAllRead, add, markRead }), [notifications, unreadCount, markAllRead, add, markRead]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const ctx = React.useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}


