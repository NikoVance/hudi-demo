import React from "react";

export function AdminHeader({ title, desc, actions }: { title: string; desc?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {desc && <p className="text-muted text-sm mt-1">{desc}</p>}
      </div>
      {actions}
    </div>
  );
}

const PILL: Record<string, string> = {
  ok: "chip-neon", healthy: "chip-neon", Live: "chip-neon", Active: "chip-neon", low_risk: "chip-neon", excluded: "chip-pink",
  lagging: "chip", "Reduce-only": "chip", Pending: "chip", Settling: "chip", rebalance: "chip", pending: "chip",
  down: "chip-pink", Frozen: "chip-pink", Flagged: "chip-pink", Disabled: "chip-pink", low: "chip-pink", high: "chip-pink",
  medium: "chip", Whale: "chip-blue", Shark: "chip-blue",
};

export function Pill({ children, k }: { children: React.ReactNode; k?: string }) {
  const cls = (k && PILL[k]) || "chip";
  return <span className={`chip ${cls}`}>{children}</span>;
}

export function Kpi({ label, value, delta, up }: { label: string; value: string; delta?: string; up?: boolean }) {
  return (
    <div className="card p-5">
      <div className="label">{label}</div>
      <div className="tabular text-2xl font-semibold mt-2">{value}</div>
      {delta && (
        <div className={`mono text-xs mt-1 ${up ? "text-neon" : "text-pink"}`}>
          {up ? "▲" : "▼"} {delta}
        </div>
      )}
    </div>
  );
}

export function Panel({ title, children, actions }: { title: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section className="card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-line">
        <h2 className="label !text-[11px]">{title}</h2>
        {actions}
      </div>
      {children}
    </section>
  );
}
