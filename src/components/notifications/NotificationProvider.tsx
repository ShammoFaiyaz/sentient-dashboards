"use client";

import * as React from "react";

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


