import { INSURANCE } from "@/lib/admin-data";
import { AdminHeader, Kpi, Panel } from "@/components/admin-ui";

export default function InsurancePage() {
  const pct = Math.round((INSURANCE.balance / INSURANCE.min) * 100);
  return (
    <div>
      <AdminHeader title="Insurance Fund" desc="On-chain insurance balance and flows. Top up if it falls below the minimum threshold." actions={<button className="btn-neon">Top up fund</button>} />

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Kpi label="Balance" value={`$${(INSURANCE.balance / 1e6).toFixed(2)}M`} delta={`${pct}% of min`} up />
        <Kpi label="Minimum threshold" value={`$${(INSURANCE.min / 1e6).toFixed(1)}M`} />
        <Kpi label="Headroom" value={`$${((INSURANCE.balance - INSURANCE.min) / 1e6).toFixed(2)}M`} delta="above min" up />
      </div>

      <Panel title="Fund flows">
        <table className="tbl">
          <thead>
            <tr><th>Time</th><th>Type</th><th>Market</th><th className="text-right">Amount</th></tr>
          </thead>
          <tbody>
            {INSURANCE.flows.map((f, i) => (
              <tr key={i} className="row-hover">
                <td className="mono text-xs text-muted">{f.time}</td>
                <td>{f.type}</td>
                <td className="mono text-xs text-muted">{f.market}</td>
                <td className={`tabular text-right ${f.amount >= 0 ? "text-neon" : "text-pink"}`}>
                  {f.amount >= 0 ? "+" : "-"}${Math.abs(f.amount).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
