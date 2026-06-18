import { RISK_MARKETS } from "@/lib/admin-hudi-data";
import { AdminHeader, Pill, Panel } from "@/components/admin-ui";

export default function RiskPage() {
  return (
    <div>
      <AdminHeader
        title="Risk & circuit breakers"
        desc="Per-market net-OI skew and circuit-breaker state. The underweight side earns the risk-balancing points bonus — keep books healthy across market-hour gaps."
      />

      <Panel title="Per-market risk">
        <div className="overflow-x-auto">
          <table className="tbl min-w-[820px]">
            <thead>
              <tr>
                <th>Market</th><th className="text-right">OI</th>
                <th className="w-56">Net-OI skew (long / short)</th>
                <th>Bonus side</th><th>Price band</th><th>Breaker</th><th></th>
              </tr>
            </thead>
            <tbody>
              {RISK_MARKETS.map((r) => {
                const skewed = r.longPct >= 70 || r.longPct <= 30;
                return (
                  <tr key={r.market} className="row-hover">
                    <td><span className="chip chip-blue">{r.market}</span></td>
                    <td className="tabular text-right">${r.oi.toFixed(2)}M</td>
                    <td>
                      <div className="flex h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,.06)" }}>
                        <div style={{ width: `${r.longPct}%`, background: "var(--neon)" }} />
                        <div style={{ width: `${100 - r.longPct}%`, background: "var(--pink)" }} />
                      </div>
                      <div className="flex justify-between mono text-[10px] text-muted mt-1">
                        <span className="text-neon">{r.longPct}% L</span>
                        <span className={skewed ? "text-gold" : ""}>{skewed ? "skewed" : "balanced"}</span>
                        <span className="text-pink">{100 - r.longPct}% S</span>
                      </div>
                    </td>
                    <td>
                      {r.bonusSide === "Balanced" ? <span className="mono text-xs text-muted">—</span>
                        : <span className={`mono text-xs ${r.bonusSide === "Long" ? "text-neon" : "text-pink"}`}>+{r.bonusSide}</span>}
                    </td>
                    <td className="mono text-xs text-muted">{r.band}</td>
                    <td><Pill k={r.breaker === "Normal" ? "Live" : r.breaker === "Tripped" ? "down" : "medium"}>{r.breaker}</Pill></td>
                    <td className="text-right whitespace-nowrap">
                      {r.breaker === "Tripped"
                        ? <button className="btn-neon !py-1.5 !px-3 !text-[11px]">Resume</button>
                        : <button className="btn-ghost !py-1.5 !px-3 !text-[11px]" style={{ color: "var(--pink)", borderColor: "rgba(255,92,147,.4)" }}>Pause</button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
      <p className="mono text-[11px] text-muted mt-3">A tripped breaker halts matching on that market only. Net-OI skew feeds the risk-balancing points component — the underweight side is boosted to pull the book back toward balance.</p>
    </div>
  );
}
