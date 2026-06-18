"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const GROUPS: { title: string; items: { href: string; label: string; icon: string }[] }[] = [
  {
    title: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: "▤" },
      { href: "/admin/points", label: "Points & Referrals", icon: "✦" },
    ],
  },
  {
    title: "Trading",
    items: [
      { href: "/admin/markets", label: "Markets", icon: "≣" },
      { href: "/admin/users", label: "Users", icon: "◎" },
      { href: "/admin/liquidations", label: "Liquidations", icon: "⚠" },
    ],
  },
  {
    title: "Treasury",
    items: [
      { href: "/admin/withdrawals", label: "Withdrawals", icon: "↥" },
      { href: "/admin/wallets", label: "Wallets / Vaults", icon: "◈" },
      { href: "/admin/insurance", label: "Insurance Fund", icon: "⛨" },
      { href: "/admin/fees", label: "Fee Accounts", icon: "％" },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/admin/emergency", label: "Emergency", icon: "⏻" },
      { href: "/admin/audit", label: "Audit Log", icon: "❏" },
      { href: "/admin/admins", label: "Admins", icon: "⚙" },
    ],
  },
];

export function AdminSidebar() {
  const path = usePathname();
  return (
    <aside className="w-60 shrink-0 border-r border-line min-h-screen sticky top-0 hidden lg:flex flex-col" style={{ background: "var(--bg-2)" }}>
      <Link href="/admin" className="flex items-center gap-2.5 px-5 h-16 border-b border-line">
        <span className="grid place-items-center w-8 h-8 rounded-lg font-bold text-[#04120c]" style={{ background: "linear-gradient(180deg,#45ffba,var(--neon))" }}>h</span>
        <span className="mono text-sm tracking-widest">HUDI<span className="text-muted"> / ADMIN</span></span>
      </Link>

      <nav className="p-3 flex-1 overflow-y-auto">
        {GROUPS.map((g) => (
          <div key={g.title} className="mb-5">
            <div className="label px-3 mb-1.5 !text-[10px]">{g.title}</div>
            {g.items.map((it) => {
              const active = it.href === "/admin" ? path === "/admin" : path.startsWith(it.href);
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
                  style={
                    active
                      ? { background: "var(--neon-soft)", color: "var(--neon)" }
                      : { color: "var(--muted)" }
                  }
                >
                  <span className="w-4 text-center opacity-80">{it.icon}</span>
                  {it.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <Link href="/" className="navlink px-5 py-4 border-t border-line text-xs">← Back to app</Link>
    </aside>
  );
}
