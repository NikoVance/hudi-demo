"use client";

import { useState } from "react";

export function CopyButton({
  value,
  label = "Copy",
  variant = "neon",
}: {
  value: string;
  label?: string;
  variant?: "neon" | "ghost";
}) {
  const [done, setDone] = useState(false);
  return (
    <button
      className={variant === "neon" ? "btn-neon" : "btn-ghost"}
      onClick={() => {
        navigator.clipboard?.writeText(value).catch(() => {});
        setDone(true);
        setTimeout(() => setDone(false), 1400);
      }}
    >
      {done ? "✓ Copied" : label}
    </button>
  );
}
