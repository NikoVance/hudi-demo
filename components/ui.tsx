import React from "react";

export const COLOR: Record<string, string> = {
  neon: "var(--neon)",
  blue: "var(--blue)",
  pink: "var(--pink)",
  gold: "var(--gold)",
};

/* Section heading with mono kicker */
export function SectionHeading({
  kicker,
  title,
  desc,
  right,
}: {
  kicker?: string;
  title: string;
  desc?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div>
        {kicker && <div className="label mb-2">{kicker}</div>}
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{title}</h2>
        {desc && <p className="text-muted text-sm mt-1.5 max-w-xl">{desc}</p>}
      </div>
      {right}
    </div>
  );
}

/* Glowing SVG sparkline */
export function Sparkline({
  data,
  width = 220,
  height = 56,
  color = "var(--neon)",
}: {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const stepX = width / (data.length - 1);
  const pts = data.map((d, i) => {
    const x = i * stepX;
    const y = height - 6 - ((d - min) / span) * (height - 12);
    return [x, y] as const;
  });
  const line = pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `0,${height} ${line} ${width},${height}`;
  const gid = "spark" + Math.round(color.length * 7 + data.length);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${gid})`} />
      <polyline
        points={line}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3.2" fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
    </svg>
  );
}

/* Donut ring built from segments [{value,color}] */
export function Donut({
  segments,
  size = 168,
  stroke = 16,
  centerTop,
  centerBottom,
}: {
  segments: { value: number; color: string }[];
  size?: number;
  stroke?: number;
  centerTop?: React.ReactNode;
  centerBottom?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  let offset = 0;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={stroke} />
        {segments.map((s, i) => {
          const len = (s.value / total) * c;
          const dash = `${len} ${c - len}`;
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={dash}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
              style={{ filter: `drop-shadow(0 0 4px ${s.color}66)` }}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {centerTop}
        {centerBottom}
      </div>
    </div>
  );
}

/* delta arrow for rank change */
export function Delta({ value }: { value: number }) {
  if (value === 0) return <span className="text-muted mono text-xs">—</span>;
  const up = value > 0;
  return (
    <span className={`mono text-xs ${up ? "text-neon" : "text-pink"}`}>
      {up ? "▲" : "▼"} {Math.abs(value)}
    </span>
  );
}
