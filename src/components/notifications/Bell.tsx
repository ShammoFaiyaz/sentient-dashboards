"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import { useNotifications } from "./NotificationProvider";

export function NotificationBell() {
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        className="relative inline-flex items-center justify-center rounded-full p-2 border border-line/60 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <Bell className="h-5 w-5 text-ink" />
        {unreadCount > 0 && (
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-accentStrong px-1 text-[10px] font-semibold leading-none text-white"
          >
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-[92vw] max-w-[320px] sm:w-80 sm:max-w-none rounded-xl border border-line/60 bg-white p-2 shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
          <div className="mb-1 flex items-center justify-between px-2">
            <div className="text-xs text-muted">Notifications</div>
            <button onClick={markAllRead} className="rounded-control px-2 py-1 text-[11px] text-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
              Mark all read
            </button>
          </div>
          <ul className="max-h-80 overflow-auto">
            {notifications.map((n) => (
              <li key={n.id} className="flex items-start gap-2 rounded-md px-2 py-2 hover:bg-primary/5">
                <span className={`mt-1 h-2 w-2 rounded-full ${n.unread ? "bg-accentStrong" : "bg-line"}`} />
                <div>
                  <div className="text-sm text-ink/90">{n.title}</div>
                  {n.time && <div className="text-xs text-muted">{n.time}</div>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


