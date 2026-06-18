import Link from "next/link";
import {
  SEASON,
  USER,
  COMPONENTS,
  EPOCH_POINTS,
  EARN_TASKS,
  TIERS,
  fmt,
  compact,
  tierProgress,
} from "@/lib/data";
import { SectionHeading, Sparkline, Donut, COLOR } from "@/components/ui";

export default function Dashboard() {
  const tp = tierProgress();
  const segments = COMPONENTS.map((c) => ({ value: c.points, color: COLOR[c.color] }));
  const maxComp = Math.max(...COMPONENTS.map((c) => c.points));

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
      {/* ---------- HERO ---------- */}
      <section className="card overflow-hidden">
        <div className="grid lg:grid-cols-[1.4fr_1fr]">
          {/* left */}
          <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-line">
            <div className="flex items-center gap-2 flex-wrap mb-6">
              <span className="chip chip-neon">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon)] animate-pulse" /> {SEASON.name}
              </span>
              <span className="chip">{SEASON.epochLabel}</span>
              <span className="chip">Pool · {SEASON.poolLabel}</span>
            </div>

            <div className="label mb-2">Your Points</div>
            <div className="flex items-end gap-4 flex-wrap">
              <div className="tabular glow text-5xl sm:text-6xl font-semibold leading-none">
                {fmt(USER.totalPoints)}
              </div>
              <div className="chip chip-neon mb-1">▲ +{fmt(USER.todayDelta)} today</div>
            </div>

            {/* tier progress */}
            <div className="mt-7">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">
                  <span className="mr-1.5">{tp.cur.emoji}</span>
                  <span className="font-medium">{tp.cur.name}</span>
                  <span className="text-muted"> · {USER.multiplier}× multiplier</span>
                </span>
                {tp.next && (
                  <span className="mono text-xs text-muted">
                    {fmt(tp.toGo)} pts → {tp.next.emoji} {tp.next.name}
                  </span>
                )}
              </div>
              <div className="meter">
                <span style={{ width: `${tp.pct}%` }} />
              </div>
            </div>

            <div className="mt-7 flex gap-3 flex-wrap">
              <Link href="/referrals" className="btn-neon">🤝 Refer &amp; earn</Link>
              <Link href="/how-it-works" className="btn-ghost">How points work</Link>
            </div>
          </div>

          {/* right */}
          <div className="p-6 sm:p-8 grid grid-rows-[auto_1fr] gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Season Rank" value={`#${fmt(USER.seasonRank)}`} sub={`Top ${USER.percentile}%`} />
              <Stat label="Streak" value={`${USER.streakDays}d 🔥`} sub="+5% multiplier" />
            </div>
            <div className="card !rounded-xl p-4 flex flex-col justify-between" style={{ background: "var(--bg-2)" }}>
              <div className="flex items-center justify-between">
                <span className="label">Points / epoch</span>
                <span className="mono text-xs text-neon">▲ trending</span>
              </div>
              <div className="mt-2">
                <Sparkline data={EPOCH_POINTS} width={300} height={70} />
              </div>
              <div className="flex justify-between mono text-[11px] text-muted mt-1">
                <span>E1</span><span>E6 · {compact(EPOCH_POINTS[EPOCH_POINTS.length - 1])}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- BREAKDOWN ---------- */}
      <section className="mt-12">
        <SectionHeading
          kicker="Season 1 score"
          title="How your points break down"
          desc="Your score is a weighted blend of six behaviours. Hudi rewards real trading, Asian-equity adoption, liquidity quality and risk-balancing — not raw volume."
        />
        <div className="card p-6 sm:p-8 grid lg:grid-cols-[auto_1fr] gap-8 items-center">
          <div className="flex justify-center">
            <Donut
              segments={segments}
              centerTop={<div className="tabular text-3xl font-semibold glow">{compact(USER.totalPoints)}</div>}
              centerBottom={<div className="label mt-1">total pts</div>}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {COMPONENTS.map((c) => (
              <div key={c.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: COLOR[c.color], boxShadow: `0 0 8px ${COLOR[c.color]}` }} />
                    <span className="text-sm font-medium">{c.label}</span>
                    <span className="chip !py-0.5 !px-1.5">{c.weight}%</span>
                  </div>
                  <span className="tabular text-sm">{fmt(c.points)}</span>
                </div>
                <div className="meter mb-1.5">
                  <span style={{ width: `${(c.points / maxComp) * 100}%`, background: `linear-gradient(90deg, ${COLOR[c.color]}99, ${COLOR[c.color]})` }} />
                </div>
                <p className="text-muted text-xs leading-relaxed">
                  <span className="text-text">{c.metric}.</span> {c.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WAYS TO EARN ---------- */}
      <section className="mt-12">
        <SectionHeading kicker="Boosters" title="Ways to earn more" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EARN_TASKS.map((t) => (
            <div key={t.title} className="card card-hover p-5 flex items-start gap-4">
              <div className="text-2xl shrink-0">{t.icon}</div>
              <div className="min-w-0">
                <div className="font-medium text-sm">{t.title}</div>
                <div className="mono text-xs text-neon mt-1">{t.reward}</div>
              </div>
              <div className="ml-auto">
                {t.done ? <span className="chip chip-neon">✓ active</span> : <span className="chip">todo</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- TIER LADDER ---------- */}
      <section className="mt-12">
        <SectionHeading kicker="Ranks" title="The Hudi tier ladder" desc="Higher tiers unlock fee discounts and a points multiplier. Your tier is set by cumulative season points." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {TIERS.map((t) => {
            const me = t.key === USER.tierKey;
            return (
              <div
                key={t.key}
                className="card p-5 text-center"
                style={me ? { borderColor: "rgba(46,242,166,.5)", boxShadow: "0 0 0 1px rgba(46,242,166,.3), 0 0 40px -16px rgba(46,242,166,.6)" } : undefined}
              >
                <div className="text-3xl">{t.emoji}</div>
                <div className="mt-2 font-medium">{t.name}</div>
                <div className="label mt-1">{compact(t.min)}+ pts</div>
                <div className="mt-3 mono text-xs space-y-0.5">
                  <div className="text-neon">{t.multiplier}× points</div>
                  <div className="text-muted">{t.feeDiscount}% fee off</div>
                </div>
                {me && <div className="chip chip-neon mt-3 mx-auto w-fit">you</div>}
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mt-12">
        <div className="card p-7 sm:p-9 text-center overflow-hidden" style={{ background: "radial-gradient(600px 200px at 50% -40%, rgba(46,242,166,.16), transparent 70%), linear-gradient(180deg,var(--surface-2),var(--surface))" }}>
          <div className="label mb-2">Referrals</div>
          <h3 className="text-2xl font-semibold">Earn a share of your friends&apos; fees — forever</h3>
          <p className="text-muted text-sm mt-2 max-w-lg mx-auto">
            Share your code, earn up to 25% of every invitee&apos;s trading fees in cash, and collect referral points on top. Your friends start with a 4% fee discount.
          </p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <Link href="/referrals" className="btn-neon">Open Referrals</Link>
            <Link href="/leaderboard" className="btn-ghost">View Leaderboard</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card !rounded-xl p-4" style={{ background: "var(--bg-2)" }}>
      <div className="label">{label}</div>
      <div className="tabular text-2xl font-semibold mt-1.5">{value}</div>
      {sub && <div className="mono text-[11px] text-muted mt-0.5">{sub}</div>}
    </div>
  );
}
