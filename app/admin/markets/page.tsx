import { MARKETS } from "@/lib/admin-data";
import { AdminHeader, Pill, Panel } from "@/components/admin-ui";

export default function MarketsPage() {
  return (
    <div>
      <AdminHeader
        title="Markets"
        desc="List, delist, configure margin tiers, fees and oracle sources. Delist runs in two phases: reduce-only, then settlement."
        actions={<button className="btn-neon">+ List market</button>}
      />
      <Panel title={`${MARKETS.length} markets`}>
        <div className="overflow-x-auto">
          <table className="tbl min-w-[760px]">
            <thead>
              <tr>
                <th>Symbol</th><th>Venue</th><th>Status</th><th className="text-right">Max lev</th>
                <th className="text-right">Maker</th><th className="text-right">Taker</th><th>Oracle</th><th></th>
              </tr>
            </thead>
            <tbody>
              {MARKETS.map((m) => (
                <tr key={m.symbol} className="row-hover">
                  <td><div className="mono text-sm">{m.symbol}</div><div className="text-muted text-xs">{m.name}</div></td>
                  <td><Pill k={m.venue}>{m.venue}</Pill></td>
                  <td><Pill k={m.status}>{m.status}</Pill></td>
                  <td className="tabular text-right">{m.maxLev}×</td>
                  <td className="tabular text-right text-neon">{m.maker}%</td>
                  <td className="tabular text-right">{m.taker}%</td>
                  <td>
                    <span className="flex items-center gap-1.5 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: m.oracle === "ok" ? "var(--neon)" : m.oracle === "lagging" ? "var(--gold)" : "var(--pink)" }} />
                      {m.oracle}
                    </span>
                  </td>
                  <td className="text-right"><button className="btn-ghost !py-1.5 !px-3 !text-[11px]">Configure</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <p className="mono text-[11px] text-muted mt-3">Listing requires icon, precision, tick/lot sizes, min/max order, min notional, max leverage, margin tiers, fee schedule and matching/trigger engine instances before a go-live time can be set.</p>
    </div>
  );
}
