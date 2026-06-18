import { AdminSidebar } from "@/components/admin-sidebar";
import { ADMIN_USER } from "@/lib/admin-data";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-1">
      <AdminSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        {/* topbar */}
        <header className="h-16 border-b border-line flex items-center gap-4 px-5 sticky top-0 z-40 backdrop-blur-md" style={{ background: "rgba(6,7,10,.72)" }}>
          <span className="chip chip-neon"><span className="w-1.5 h-1.5 rounded-full bg-[var(--neon)] animate-pulse" /> Testnet</span>
          <div className="mono text-xs text-muted hidden sm:block">Engine · ok · WS connected</div>
          <div className="ml-auto flex items-center gap-3">
            <button className="btn-ghost !py-2 !px-3.5 hidden sm:inline-flex">Search ⌘K</button>
            <div className="flex items-center gap-2.5">
              <span className="grid place-items-center w-8 h-8 rounded-full text-xs font-semibold" style={{ background: "var(--surface-2)", border: "1px solid var(--line-strong)" }}>{ADMIN_USER.initials}</span>
              <div className="hidden sm:block leading-tight">
                <div className="text-sm">{ADMIN_USER.name}</div>
                <div className="mono text-[10px] text-muted">{ADMIN_USER.role}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-7 max-w-[1200px] w-full">{children}</main>
      </div>
    </div>
  );
}
