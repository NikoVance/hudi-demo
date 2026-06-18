import { POINTS_ADMIN } from "@/lib/admin-data";
import { AdminHeader, Pill, Panel } from "@/components/admin-ui";

export default function PointsAdminPage() {
  const p = POINTS_ADMIN;
  return (
    <div>
      <AdminHeader
        title="Points & Referrals"
        desc="Configure the season, score weighting, referral economics, and review suspected farming."
        actions={<button className="btn-neon">Publish changes</button>}
      />

      {/* season */}
      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <div className="card p-5"><div className="label">Season</div><div className="font-semibold mt-2">{p.season.name}</div><Pill k="Live"><span className="mt-2 inline-block">{p.season.status}</span></Pill></div>
        <div className="card p-5"><div className="label">Epoch</div><div className="tabular text-2xl font-semibold mt-2">{p.season.epoch}</div></div>
        <div className="card p-5"><div className="label">Reward pool</div><div className="text-2xl font-semibold mt-2">{p.season.pool}</div></div>
        <div className="card p-5"><div className="label">Pool split</div><div className="mono text-sm mt-2 text-muted">70 / 25 / 5</div></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* weights */}
        <Panel title="Retail score weighting" actions={<span className="mono text-xs text-muted">Σ 100%</span>}>
          <div className="p-5 space-y-3">
            {p.weights.map((w) => (
              <div key={w.key} className="flex items-center gap-3">
                <span className="text-sm flex-1">{w.key}</span>
                <div className="meter w-32"><span style={{ width: `${w.value * 3.3}%` }} /></div>
                <input defaultValue={w.value} className="tabular text-sm w-14 text-right card !rounded-md px-2 py-1 bg-transparent outline-none" style={{ background: "var(--bg-2)" }} />
                <span className="mono text-xs text-muted">%</span>
              </div>
            ))}
          </div>
        </Panel>

        {/* referral config */}
        <Panel title="Referral economics">
          <div className="p-5 grid grid-cols-2 gap-4">
            <Field label="Referrer rebate" value={p.referral.referrerRebate} />
            <Field label="Referee discount" value={p.referral.refereeDiscount} />
            <Field label="Code unlock" value={p.referral.unlock} />
            <Field label="Rebate volume cap" value={p.referral.rebateCap} />
            <Field label="Discount volume cap" value={p.referral.discountCap} />
            <Field label="Default house code" value="HUDI" />
          </div>
        </Panel>
      </div>

      {/* farming review */}
      <Panel title="Anti-farming review queue" actions={<span className="chip chip-pink">{p.reviewQueue.filter((r) => r.action === "pending").length} pending</span>}>
        <div className="overflow-x-auto">
          <table className="tbl min-w-[680px]">
            <thead>
              <tr><th>Case</th><th>Account</th><th>Signal</th><th className="text-right">Points at risk</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {p.reviewQueue.map((r) => (
                <tr key={r.id} className="row-hover">
                  <td className="mono text-xs">{r.id}</td>
                  <td className="mono">{r.addr}</td>
                  <td className="text-sm">{r.signal}</td>
                  <td className="tabular text-right text-pink">{r.points.toLocaleString()}</td>
                  <td><Pill k={r.action}>{r.action}</Pill></td>
                  <td className="text-right whitespace-nowrap">
                    {r.action === "pending" ? (
                      <>
                        <button className="btn-ghost !py-1.5 !px-3 !text-[11px] mr-1.5">Clear</button>
                        <button className="btn-ghost !py-1.5 !px-3 !text-[11px]" style={{ color: "var(--pink)", borderColor: "rgba(255,92,147,.4)" }}>Exclude</button>
                      </>
                    ) : (
                      <button className="btn-ghost !py-1.5 !px-3 !text-[11px]">Restore</button>
                    )}
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

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="card !rounded-xl p-3.5" style={{ background: "var(--bg-2)" }}>
      <div className="label !text-[10px]">{label}</div>
      <div className="tabular text-lg font-semibold mt-1">{value}</div>
    </div>
  );
}
