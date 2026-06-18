"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/referrals", label: "Referrals" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/how-it-works", label: "How it works" },
];

export function Nav() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-line backdrop-blur-md" style={{ background: "rgba(6,7,10,.72)" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span
            className="grid place-items-center w-8 h-8 rounded-lg font-bold text-[#04120c]"
            style={{ background: "linear-gradient(180deg,#45ffba,var(--neon))", boxShadow: "0 0 18px rgba(46,242,166,.5)" }}
          >
            h
          </span>
          <span className="mono text-sm tracking-widest hidden sm:block">
            HUDI<span className="text-muted"> / POINTS</span>
          </span>
        </Link>

        <nav className="flex items-center gap-5 overflow-x-auto">
          {LINKS.map((l) => {
            const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} className="navlink" data-active={active}>
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span className="chip chip-neon hidden md:inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon)] animate-pulse" /> Season 1 · Live
          </span>
          <button className="btn-ghost !py-2 !px-3.5">Connect Wallet</button>
        </div>
      </div>
    </header>
  );
}
