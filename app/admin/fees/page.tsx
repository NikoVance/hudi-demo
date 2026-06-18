import { FEES } from "@/lib/admin-data";
import { AdminHeader, Kpi, Panel } from "@/components/admin-ui";

export default function FeesPage() {
  return (
    <div>
      <AdminHeader title="Fee Accounts" desc="Cumulative protocol fee income and a per-trade ledger." actions={<button className="btn-ghost">Export CSV</button>} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Kpi label="Cumulative fees" value={`$${(FEES.cumulative / 1e6).toFixed(2)}M`} />
        <Kpi label="Last 24h" value={`$${FEES.last24h.toLocaleString()}`} delta="+8.7%" up />
        <Kpi label="→ Insurance" value={`$${(FEES.toInsurance / 1e3).toFixed(0)}k`} />
        <Kpi label="→ Referrers" value={`$${(FEES.toReferrers / 1e3).toFixed(0)}k`} />
      </div>

      <Panel title="Fee ledger (latest)">
        <table className="tbl">
          <thead>
            <tr><th>Time</th><th>Market</th><th className="text-right">Taker</th><th className="text-right">Maker rebate</th><th className="text-right">Net</th></tr>
          </thead>
          <tbody>
            {FEES.ledger.map((f, i) => (
              <tr key={i} className="row-hover">
                <td className="mono text-xs text-muted">{f.time}</td>
                <td><span className="chip chip-blue">{f.market}</span></td>
                <td className="tabular text-right">${f.taker.toFixed(2)}</td>
                <td className="tabular text-right text-muted">{f.maker.toFixed(2)}</td>
                <td className="tabular text-right text-neon">+${f.net.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
