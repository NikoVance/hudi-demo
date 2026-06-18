import { LIQUIDATIONS } from "@/lib/admin-data";
import { AdminHeader, Pill, Panel } from "@/components/admin-ui";

export default function LiquidationsPage() {
  return (
    <div>
      <AdminHeader title="Liquidations" desc="Forced-close events, filterable by market and time range." actions={<button className="btn-ghost">Filter ▾</button>} />
      <Panel title="Recent liquidations">
        <div className="overflow-x-auto">
          <table className="tbl min-w-[640px]">
            <thead>
              <tr><th>Time</th><th>User</th><th>Market</th><th>Side</th><th className="text-right">Size</th><th className="text-right">Loss</th><th>By</th></tr>
            </thead>
            <tbody>
              {LIQUIDATIONS.map((l, i) => (
                <tr key={i} className="row-hover">
                  <td className="mono text-xs text-muted">{l.time}</td>
                  <td className="mono">{l.user}</td>
                  <td><span className="chip chip-blue">{l.market}</span></td>
                  <td className={l.side === "LONG" ? "text-neon mono text-xs" : "text-pink mono text-xs"}>{l.side}</td>
                  <td className="tabular text-right">{l.size}</td>
                  <td className="tabular text-right text-pink">-${l.loss.toLocaleString()}</td>
                  <td><Pill>{l.by}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
