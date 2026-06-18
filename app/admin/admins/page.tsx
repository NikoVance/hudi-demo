import { ADMINS } from "@/lib/admin-data";
import { AdminHeader, Pill, Panel } from "@/components/admin-ui";

export default function AdminsPage() {
  return (
    <div>
      <AdminHeader title="Admins" desc="Back-office accounts, roles and status." actions={<button className="btn-neon">+ Add admin</button>} />
      <Panel title={`${ADMINS.length} admins`}>
        <table className="tbl">
          <thead>
            <tr><th>Account</th><th>Role</th><th>2FA</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {ADMINS.map((a) => (
              <tr key={a.name} className="row-hover">
                <td className="mono text-sm">{a.name}</td>
                <td>{a.role}</td>
                <td>{a.twofa ? <span className="chip chip-neon">on</span> : <span className="chip chip-pink">off</span>}</td>
                <td><Pill k={a.status}>{a.status}</Pill></td>
                <td className="text-right"><button className="btn-ghost !py-1.5 !px-3 !text-[11px]">Manage</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
