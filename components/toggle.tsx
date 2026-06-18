"use client";

import { useState } from "react";

export function Toggle({ initial = false }: { initial?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="relative inline-flex items-center rounded-full transition-colors"
      style={{
        width: 46,
        height: 26,
        background: on ? "var(--pink)" : "rgba(255,255,255,.12)",
        boxShadow: on ? "0 0 16px rgba(255,92,147,.5)" : "none",
      }}
      aria-pressed={on}
    >
      <span
        className="absolute rounded-full bg-white transition-all"
        style={{ width: 20, height: 20, top: 3, left: on ? 23 : 3 }}
      />
    </button>
  );
}
