import { REFERRAL, INVITEES, REBATE_RECORDS, fmt, fmtUsd, compact } from "@/lib/data";
import { SectionHeading } from "@/components/ui";
import { CopyButton } from "@/components/copy-button";

export default function Referrals() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
      <SectionHeading
        kicker="Referrals"
        title="Invite traders. Earn forever."
        desc="Share a share of every fee your invitees pay — paid in cash/credit — and collect referral points on top. Your friends start with a fee discount."
      />

      {/* ---- code + share ---- */}
      <section className="card p-6 sm:p-8">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
          <div>
            <div className="label mb-2">Your referral code</div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="tabular text-3xl sm:text-4xl font-semibold glow tracking-wider">{REFERRAL.code}</div>
              {REFERRAL.unlocked && <span className="chip chip-neon">unlocked</span>}
            </div>

            <div className="mt-5 flex items-stretch gap-2 max-w-lg">
              <div className="card !rounded-xl flex-1 px-4 py-3 mono text-sm text-muted truncate flex items-center" style={{ background: "var(--bg-2)" }}>
                {REFERRAL.link}
              </div>
              <CopyButton value={REFERRAL.link} label="Copy link" />
            </div>

            <div className="mt-4 flex gap-2 flex-wrap">
              <CopyButton value={REFERRAL.code} label="Copy code" variant="ghost" />
              <button className="btn-ghost">𝕏 Share</button>
              <button className="btn-ghost">✈ Telegram</button>
              <button className="btn-ghost">🔗 More</button>
            </div>

            <p className="text-muted text-xs mt-5 max-w-lg leading-relaxed">
              Create a code once you reach {fmtUsd(REFERRAL.unlockVolume).replace(".00", "")} in trading volume.
              Organic visitors who don&apos;t use a code are auto-assigned the default house code and still receive the{" "}
              {REFERRAL.refereeDiscount}% discount.
            </p>
          </div>

          {/* terms box */}
          <div className="card !rounded-xl p-6" style={{ background: "var(--bg-2)" }}>
            <div className="label mb-4">Current terms</div>
            <Term k="You earn" v={`${REFERRAL.referrerRebate}–25%`} note="of invitee trading fees" accent />
            <Term k="They save" v={`${REFERRAL.refereeDiscount}%`} note="fee discount for invitees" />
            <Term k="Rebate cap" v={`$${REFERRAL.rebateVolumeCap}`} note="of invitee volume earns rebate" />
            <Term k="Discount cap" v={`$${REFERRAL.discountVolumeCap}`} note="of invitee volume gets discount" />
          </div>
        </div>
      </section>

      {/* ---- earnings stats ---- */}
      <section className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <BigStat label="Total earned" value={fmtUsd(REFERRAL.earnedUsd)} accent />
        <BigStat label="Pending" value={fmtUsd(REFERRAL.pendingUsd)} />
        <BigStat label="Active invitees" value={`${REFERRAL.activeInvitees} / ${REFERRAL.invitees}`} />
        <BigStat label="Referral points" value={fmt(REFERRAL.pointsFromReferrals)} />
      </section>

      {/* ---- rebate tiers ---- */}
      <section className="mt-12">
        <SectionHeading kicker="Rebate tiers" title="Your rebate scales with your tier" desc="The further up the Hudi ladder you climb, the bigger your cut of invitee fees." />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {REFERRAL.rebateTiers.map((t) => (
            <div
              key={t.tier}
              className="card p-5"
              style={t.you ? { borderColor: "rgba(46,242,166,.5)", boxShadow: "0 0 40px -16px rgba(46,242,166,.6)" } : undefined}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{t.tier}</span>
                {t.you && <span className="chip chip-neon">you</span>}
              </div>
              <div className="tabular text-3xl font-semibold mt-3 text-neon">{t.rebate}%</div>
              <div className="mono text-[11px] text-muted mt-1">of invitee fees</div>
              <div className="text-muted text-xs mt-3">{t.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- invitees ---- */}
      <section className="mt-12">
        <SectionHeading kicker="Network" title="Your invitees" right={<span className="chip">{INVITEES.length} total</span>} />
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="tbl min-w-[640px]">
              <thead>
                <tr>
                  <th>Trader</th>
                  <th>Joined</th>
                  <th className="text-right">Volume</th>
                  <th className="text-right">Fees paid</th>
                  <th className="text-right">Your rebate</th>
                  <th className="text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {INVITEES.map((iv) => (
                  <tr key={iv.handle} className="row-hover">
                    <td className="mono">{iv.handle}</td>
                    <td className="mono text-muted text-xs">{iv.joined}</td>
                    <td className="tabular text-right">${compact(iv.volume)}</td>
                    <td className="tabular text-right text-muted">{fmtUsd(iv.feesPaid)}</td>
                    <td className="tabular text-right text-neon">{fmtUsd(iv.yourRebate)}</td>
                    <td className="text-right">
                      {iv.active ? <span className="chip chip-neon">active</span> : <span className="chip">idle</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---- rebate records ---- */}
      <section className="mt-12">
        <SectionHeading kicker="Ledger" title="Rebate records" />
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="tbl min-w-[560px]">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Invitee</th>
                  <th>Market</th>
                  <th className="text-right">Their fee</th>
                  <th className="text-right">Your rebate</th>
                </tr>
              </thead>
              <tbody>
                {REBATE_RECORDS.map((r, i) => (
                  <tr key={i} className="row-hover">
                    <td className="mono text-muted text-xs">{r.date}</td>
                    <td className="mono">{r.invitee}</td>
                    <td><span className="chip chip-blue">{r.market}</span></td>
                    <td className="tabular text-right text-muted">{fmtUsd(r.theirFee)}</td>
                    <td className="tabular text-right text-neon">+{fmtUsd(r.yourRebate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mono text-[11px] text-muted mt-3">
          Referral rewards are subject to anti-farming review. Referral loops, sybil clusters and same-funding-source accounts are excluded.
        </p>
      </section>
    </div>
  );
}

function Term({ k, v, note, accent }: { k: string; v: string; note: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between py-2.5 border-b border-line last:border-0">
      <span className="text-sm text-muted">{k}</span>
      <span className="text-right">
        <span className={`tabular text-lg font-semibold ${accent ? "text-neon" : ""}`}>{v}</span>
        <span className="block mono text-[10px] text-muted">{note}</span>
      </span>
    </div>
  );
}

function BigStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="card p-5">
      <div className="label">{label}</div>
      <div className={`tabular text-2xl sm:text-3xl font-semibold mt-2 ${accent ? "text-neon glow" : ""}`}>{value}</div>
    </div>
  );
}
