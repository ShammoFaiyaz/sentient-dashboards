"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NicheConfig } from "@/niches/config";

export default function NicheSidebar({ config }: { config: NicheConfig }) {
  const pathname = usePathname();
  return (
    <aside
      className="hidden h-screen w-[300px] shrink-0 overflow-y-auto border-r lg:flex lg:flex-col lg:sticky lg:top-0 lg:self-start shadow-[10px_0_30px_-12px_rgba(0,0,0,0.18)]"
      style={{ background: "var(--color-neutral-light)" }}
    >
      <div className="px-4 py-4">
        <div className="text-xl font-semibold">{config.title}</div>
        <div className="mt-1 text-xs text-muted">Hidden dashboard</div>
      </div>
      <nav className="mt-2 flex flex-col gap-1 px-2">
        {config.menu.map((m) => {
          const active = pathname === m.href || pathname?.startsWith(m.href + "/");
          return (
            <Link
              key={m.href}
              href={m.href}
              className={
                "rounded-md px-2 py-2 text-sm " +
                (active ? "bg-white text-primary" : "text-zinc-700 hover:bg-zinc-100")
              }
            >
              {m.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}


