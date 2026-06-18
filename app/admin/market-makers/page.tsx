import { MARKET_MAKERS, MM_PROGRAM } from "@/lib/admin-hudi-data";
import { MM_COMPONENTS, compact } from "@/lib/data";
import { AdminHeader, Pill, Panel, Kpi } from "@/components/admin-ui";

export default function MarketMakersPage() {
  return (
    <div>
      <AdminHeader
        title="Market makers"
        desc="Hudi is a CLOB venue — book quality comes from MMs. Monitor depth, spread and uptime, and run the separate MM points track."
        actions={<button className="btn-neon">+ Onboard MM</button>}
      />

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Kpi label="Active MMs" value={`${MARKET_MAKERS.filter((m) => m.status !== "Offline").length} / ${MARKET_MAKERS.length}`} />
        <Kpi label="MM track" value={MM_PROGRAM.track.replace(" of Season 1 pool", "")} delta="of Season pool" up />
        <Kpi label="Maker rebate" value={MM_PROGRAM.rebate} />
      </div>

      <Panel title="Market makers" actions={<span className="mono text-[11px] text-muted">{MM_PROGRAM.weights}</span>}>
        <div className="overflow-x-auto">
          <table className="tbl min-w-[760px]">
            <thead>
              <tr>
                <th>Maker</th><th className="text-right">Markets</th><th className="text-right">Top depth</th>
                <th className="text-right">Avg spread</th><th className="text-right">Uptime</th><th className="text-right">MM points</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MARKET_MAKERS.map((m) => (
                <tr key={m.name} className="row-hover">
                  <td className="font-medium">{m.name}</td>
                  <td className="tabular text-right">{m.markets}</td>
                  <td className="tabular text-right">${m.depth}k</td>
                  <td className={`tabular text-right ${m.spreadBps > 10 ? "text-pink" : ""}`}>{m.spreadBps} bps</td>
                  <td className={`tabular text-right ${m.uptime < 90 ? "text-pink" : "text-neon"}`}>{m.uptime}%</td>
                  <td className="tabular text-right">{compact(m.mmPoints)}</td>
                  <td><Pill k={m.status === "Healthy" ? "Live" : m.status === "Offline" ? "down" : "medium"}>{m.status}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="MM points weighting">
        <div className="p-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MM_COMPONENTS.map((c) => (
            <div key={c.label} className="flex items-center justify-between card !rounded-xl px-4 py-3" style={{ background: "var(--bg-2)" }}>
              <span className="text-sm">{c.label}</span>
              <span className="tabular text-blue">{c.weight}%</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
