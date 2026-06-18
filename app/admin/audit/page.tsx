import { AUDIT } from "@/lib/admin-data";
import { AdminHeader, Panel } from "@/components/admin-ui";

export default function AuditPage() {
  return (
    <div>
      <AdminHeader title="Audit Log" desc="Every back-office action, filterable by admin, action and resource." actions={<button className="btn-ghost">Filter ▾</button>} />
      <Panel title="Admin actions">
        <div className="overflow-x-auto">
          <table className="tbl min-w-[640px]">
            <thead>
              <tr><th>Time</th><th>Admin</th><th>Action</th><th>Resource</th><th>IP</th></tr>
            </thead>
            <tbody>
              {AUDIT.map((a, i) => (
                <tr key={i} className="row-hover">
                  <td className="mono text-xs text-muted">{a.time}</td>
                  <td className="mono text-sm">{a.admin}</td>
                  <td><span className="chip chip-blue">{a.action}</span></td>
                  <td className="mono text-xs">{a.resource}</td>
                  <td className="mono text-xs text-muted">{a.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
