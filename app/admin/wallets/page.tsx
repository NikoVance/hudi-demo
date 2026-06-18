import { VAULTS } from "@/lib/admin-data";
import { AdminHeader, Pill } from "@/components/admin-ui";

export default function WalletsPage() {
  return (
    <div>
      <AdminHeader title="Wallets / Vaults" desc="Per-chain Vault water levels, pending flows and rebalancing status. Top-up or collect when a vault drifts from target." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {VAULTS.map((v) => {
          const pct = Math.min(100, Math.round((v.balance / v.target) * 100));
          return (
            <div key={v.chain} className="card p-5">
              <div className="flex items-center justify-between">
                <span className="font-medium">{v.chain}</span>
                <Pill k={v.status}>{v.status}</Pill>
              </div>
              <div className="tabular text-2xl font-semibold mt-3">{v.balance.toFixed(2)}M <span className="text-muted text-sm">/ {v.target.toFixed(1)}M</span></div>
              <div className="meter mt-3">
                <span style={{ width: `${pct}%`, background: pct < 60 ? "linear-gradient(90deg,#ff7aa8,var(--pink))" : "linear-gradient(90deg,var(--neon-dim),var(--neon))" }} />
              </div>
              <div className="flex justify-between mono text-[11px] text-muted mt-2">
                <span>water level {pct}%</span>
                <span>pending {v.pending.toFixed(2)}M</span>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="btn-ghost !py-1.5 !px-3 !text-[11px]">Top up</button>
                <button className="btn-ghost !py-1.5 !px-3 !text-[11px]">Collect</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
