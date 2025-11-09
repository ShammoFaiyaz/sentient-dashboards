"use client";

import { MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { useMessageCenter } from "@/context/MessageCenterContext";
import { NotificationBell } from "@/components/notifications/Bell";

export default function TopbarActions() {
  const { setOpen, unread } = useMessageCenter();

  // Keyboard shortcut disabled per request

  return (
    <div className="flex items-center gap-2">
      <NotificationBell />
      <button
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center justify-center rounded-full p-2 border border-line/60 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        aria-label="Open messages"
      >
        <MessageCircle className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-white">
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}
 

