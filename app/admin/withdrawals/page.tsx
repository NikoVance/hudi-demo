import { WITHDRAWALS } from "@/lib/admin-data";
import { AdminHeader, Pill, Panel } from "@/components/admin-ui";

export default function WithdrawalsPage() {
  return (
    <div>
      <AdminHeader
        title="Withdrawal approvals"
        desc="Large withdrawals require multi-party sign-off. T3 needs 2 approvers, T4 needs 3. Approvers are configured on-chain."
      />
      <Panel title={`${WITHDRAWALS.length} pending`}>
        <div className="overflow-x-auto">
          <table className="tbl min-w-[760px]">
            <thead>
              <tr><th>Request</th><th>User</th><th className="text-right">Amount</th><th>Tier</th><th>Approvals</th><th>Risk</th><th>Age</th><th></th></tr>
            </thead>
            <tbody>
              {WITHDRAWALS.map((w) => (
                <tr key={w.id} className="row-hover">
                  <td className="mono text-xs">{w.id}</td>
                  <td className="mono">{w.user}</td>
                  <td className="tabular text-right">${w.amount.toLocaleString()} <span className="text-muted text-xs">{w.asset}</span></td>
                  <td><Pill k={w.tier === "T4" ? "high" : "medium"}>{w.tier}</Pill></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="meter w-20"><span style={{ width: `${(w.approvals / w.needed) * 100}%` }} /></div>
                      <span className="mono text-xs text-muted">{w.approvals}/{w.needed}</span>
                    </div>
                  </td>
                  <td><Pill k={w.risk}>{w.risk}</Pill></td>
                  <td className="mono text-xs text-muted">{w.age}</td>
                  <td className="text-right whitespace-nowrap">
                    <button className="btn-neon !py-1.5 !px-3 !text-[11px] mr-1.5">Approve</button>
                    <button className="btn-ghost !py-1.5 !px-3 !text-[11px]">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
