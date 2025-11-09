"use client";

import { Lightbulb } from "lucide-react";
import * as React from "react";

export default function BackgroundToggle() {
  const [white, setWhite] = React.useState<boolean>(false);

  React.useEffect(() => {
    setWhite(document.body.classList.contains("force-white-surface"));
  }, []);

  function toggle() {
    const next = !white;
    setWhite(next);
    if (next) {
      document.body.classList.add("force-white-surface");
    } else {
      document.body.classList.remove("force-white-surface");
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle white background"
      className="relative inline-flex items-center justify-center rounded-full p-2 border border-line/60 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      title="Toggle white background"
    >
      <Lightbulb className={`h-5 w-5 ${white ? "text-primary" : "text-ink"}`} />
    </button>
  );
}


