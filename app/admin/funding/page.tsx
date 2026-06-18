import { FUNDING, FUNDING_ALERT } from "@/lib/admin-hudi-data";
import { AdminHeader, Pill, Panel } from "@/components/admin-ui";

export default function FundingPage() {
  return (
    <div>
      <AdminHeader
        title="Funding control"
        desc="Monitor per-market funding, trigger manual settlement, and reconcile rates that are stuck or mis-calculated."
        actions={<button className="btn-ghost">Reconcile all</button>}
      />

      <div className="card p-4 mb-6" style={{ borderColor: "rgba(255,92,147,.35)", background: "radial-gradient(500px 140px at 0% 0%, rgba(255,92,147,.1), transparent 70%), linear-gradient(180deg,var(--surface-2),var(--surface))" }}>
        <span className="mono text-xs text-pink">⚠ {FUNDING_ALERT}</span>
      </div>

      <Panel title="Per-market funding">
        <div className="overflow-x-auto">
          <table className="tbl min-w-[760px]">
            <thead>
              <tr><th>Market</th><th className="text-right">Rate</th><th>Interval</th><th>Next settle</th><th>Last settle</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {FUNDING.map((f) => (
                <tr key={f.market} className="row-hover">
                  <td><span className="chip chip-blue">{f.market}</span></td>
                  <td className="tabular text-right">{f.rate}</td>
                  <td className="mono text-xs text-muted">{f.interval}</td>
                  <td className="mono text-xs">{f.nextSettle}</td>
                  <td className="mono text-xs text-muted">{f.lastSettle}</td>
                  <td>
                    <Pill k={f.status === "Settling on schedule" ? "Live" : f.status === "Stuck" ? "down" : "medium"}>
                      {f.status}
                    </Pill>
                  </td>
                  <td className="text-right whitespace-nowrap">
                    <button className="btn-ghost !py-1.5 !px-3 !text-[11px] mr-1.5">Settle now</button>
                    <button className="btn-ghost !py-1.5 !px-3 !text-[11px]">Reconcile</button>
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
