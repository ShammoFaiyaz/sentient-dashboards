/* eslint-disable @next/next/no-img-element */
"use client";

import { usePathname } from "next/navigation";

export function AppFooter() {
  const pathname = usePathname();
  const isNonSU =
    pathname?.startsWith("/insurance-dashboard") ||
    pathname?.startsWith("/healthcare-dashboard") ||
    pathname?.startsWith("/fintech-dashboard") ||
    pathname?.startsWith("/hospitality-dashboard") ||
    pathname?.startsWith("/retail-dashboard");

  const logoSrc = isNonSU ? "/bldr-logo.svg" : "/inova-logo.svg";
  const aria = isNonSU ? "Powered by BLDR" : "Powered by Inova AI Solutions";
  const alt = isNonSU ? "BLDR" : "Inova AI Solutions";

  return (
    <div className="flex w-full items-center justify-center px-4">
      <a
        href="https://www.inovasolutions.ai/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={aria}
        className="inline-flex items-center gap-2 rounded-full border border-line/60 bg-white/95 px-5 py-2.5 text-lg text-muted shadow-[0_6px_16px_rgba(0,0,0,0.08)] whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <span>Powered by</span>
        <img
          src={logoSrc}
          alt={alt}
          className={isNonSU ? "h-12 w-auto md:h-16" : "h-8 w-auto"}
        />
      </a>
    </div>
  );
}


