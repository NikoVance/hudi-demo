"use client";

import { useState, type ReactNode } from "react";

export function Tabs({ tabs }: { tabs: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="flex gap-1.5 mb-5 flex-wrap">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="chip"
            style={
              i === active
                ? {
                    color: "var(--neon)",
                    borderColor: "rgba(46,242,166,.45)",
                    background: "var(--neon-soft)",
                  }
                : undefined
            }
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>{tabs[active].content}</div>
    </div>
  );
}
