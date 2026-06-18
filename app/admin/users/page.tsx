import { ADMIN_USERS } from "@/lib/admin-data";
import { AdminHeader, Pill, Panel } from "@/components/admin-ui";

export default function UsersPage() {
  return (
    <div>
      <AdminHeader
        title="Users"
        desc="Look up any account — funds, positions, orders, fills, funding, realized PnL and deposit/withdrawal history."
        actions={<input placeholder="Search address…" className="card !rounded-xl px-4 py-2.5 text-sm mono bg-transparent outline-none w-64" style={{ background: "var(--bg-2)" }} />}
      />
      <Panel title={`${ADMIN_USERS.length} of 18,432 users`}>
        <div className="overflow-x-auto">
          <table className="tbl min-w-[680px]">
            <thead>
              <tr><th>Account</th><th>Tier</th><th className="text-right">Equity</th><th className="text-right">Positions</th><th>Status</th><th>Joined</th><th></th></tr>
            </thead>
            <tbody>
              {ADMIN_USERS.map((u) => (
                <tr key={u.addr} className="row-hover">
                  <td className="mono">{u.addr}</td>
                  <td><Pill k={u.tier}>{u.tier}</Pill></td>
                  <td className="tabular text-right">${u.equity.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="tabular text-right">{u.positions}</td>
                  <td><Pill k={u.status}>{u.status}</Pill></td>
                  <td className="mono text-xs text-muted">{u.joined}</td>
                  <td className="text-right"><button className="btn-ghost !py-1.5 !px-3 !text-[11px]">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
