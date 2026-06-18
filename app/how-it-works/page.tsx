import {
  SEASON,
  COMPONENTS,
  MULTIPLIERS,
  MM_COMPONENTS,
  ANTI_FARMING,
  FAQ,
} from "@/lib/data";
import { SectionHeading, COLOR } from "@/components/ui";

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-10">
      {/* intro */}
      <SectionHeading
        kicker={SEASON.name}
        title="How Hudi Points work"
        desc="Hudi does not run a generic volume-farming program. Because Hudi is built for Asian equity perpetuals, points reward behaviour that genuinely improves the exchange: real fee contribution, meaningful positions, quality liquidity, and risk-balancing activity."
      />

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {[
          ["Real trading activity", "Fees and genuine risk, not wash volume."],
          ["Asian equity adoption", "Push liquidity into the markets Hudi owns."],
          ["CLOB liquidity quality", "Depth, spread and uptime — not just size."],
          ["Protocol risk alignment", "Trades that reduce net-OI imbalance."],
        ].map(([t, d]) => (
          <div key={t} className="card p-5">
            <div className="font-medium">{t}</div>
            <div className="text-muted text-sm mt-1">{d}</div>
          </div>
        ))}
      </div>

      {/* formula */}
      <section className="mb-12">
        <SectionHeading kicker="The math" title="How points are computed" />
        <div className="card p-6 sm:p-8">
          <div className="mono text-sm leading-relaxed space-y-3">
            <p><span className="text-neon">composite score</span> = Σ (component value × weight) — normalised per epoch</p>
            <p><span className="text-neon">your epoch points</span> = (your score ÷ Σ all eligible scores) × epoch pool × <span className="text-gold">tier multiplier</span></p>
          </div>
          <p className="text-muted text-sm mt-5 leading-relaxed">
            Each epoch distributes a fixed slice of the Season pool. You compete for a <span className="text-text">share</span> of that slice — so points reflect your contribution relative to everyone else, and your tier multiplier scales the result. The Season pool is split across three tracks:
          </p>
          <div className="flex h-3 rounded-full overflow-hidden mt-4">
            {SEASON.tracks.map((t) => (
              <div key={t.key} style={{ width: `${t.share}%`, background: COLOR[t.color], boxShadow: `0 0 12px ${COLOR[t.color]}66` }} />
            ))}
          </div>
          <div className="flex gap-6 mt-3 flex-wrap">
            {SEASON.tracks.map((t) => (
              <span key={t.key} className="text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: COLOR[t.color] }} />
                {t.label} <span className="tabular text-muted">{t.share}%</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* retail weighting */}
      <section className="mb-12">
        <SectionHeading kicker="Retail track" title="Score weighting" desc="Six components, totalling 100%. Tuned for Asian-equity perps." />
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="tbl min-w-[520px]">
              <thead>
                <tr><th>Component</th><th className="w-20 text-right">Weight</th><th>What it rewards</th></tr>
              </thead>
              <tbody>
                {COMPONENTS.map((c) => (
                  <tr key={c.key}>
                    <td className="font-medium">
                      <span className="inline-block w-2.5 h-2.5 rounded-sm mr-2 align-middle" style={{ background: COLOR[c.color] }} />
                      {c.label}
                    </td>
                    <td className="tabular text-right text-neon">{c.weight}%</td>
                    <td className="text-muted text-sm">{c.blurb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* realized loss callout */}
      <section className="mb-12">
        <div className="card p-6 sm:p-7" style={{ background: "radial-gradient(500px 160px at 0% 0%, rgba(255,92,147,.12), transparent 70%), linear-gradient(180deg,var(--surface-2),var(--surface))", borderColor: "rgba(255,92,147,.3)" }}>
          <div className="label mb-2" style={{ color: "var(--pink)" }}>Why losses earn points</div>
          <p className="text-sm leading-relaxed">
            Bootstrapping Asian-equity perp liquidity needs traders to take directional risk before books are deep. Genuine realized losses are <span className="text-text font-medium">real economic contribution</span>, so they earn a boost — adapted carefully from the Papertrade insight, inside a CLOB venue.
          </p>
          <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-muted">
            <li>· Capped per user, per epoch</li>
            <li>· Only valid, non-manipulative trades</li>
            <li>· No credit for self-traded losses</li>
            <li>· Never more attractive than real trading</li>
          </ul>
        </div>
      </section>

      {/* multipliers */}
      <section className="mb-12">
        <SectionHeading kicker="Market multipliers" title="Trade Asia, earn more" />
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="tbl min-w-[520px]">
              <thead>
                <tr><th>Market type</th><th>Examples</th><th className="text-right">Multiplier</th></tr>
              </thead>
              <tbody>
                {MULTIPLIERS.map((m) => (
                  <tr key={m.type}>
                    <td className="font-medium">{m.type}</td>
                    <td className="mono text-xs text-muted">{m.example}</td>
                    <td className="tabular text-right" style={{ color: COLOR[m.color] }}>{m.mult}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* market maker track */}
      <section className="mb-12">
        <SectionHeading kicker="Market-maker track" title="A separate book for liquidity" desc="Market makers earn on a separate 25% track — judged on whether they actually improve the book, not just volume." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MM_COMPONENTS.map((m) => (
            <div key={m.label} className="card p-4 flex items-center justify-between">
              <span className="text-sm">{m.label}</span>
              <span className="tabular text-blue">{m.weight}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* anti farming */}
      <section className="mb-12">
        <SectionHeading kicker="Integrity" title="Anti-farming" desc="Points are subject to review. The following are excluded or penalised:" />
        <div className="card p-6">
          <div className="grid sm:grid-cols-2 gap-y-2 gap-x-6">
            {ANTI_FARMING.map((a) => (
              <div key={a} className="flex items-start gap-2 text-sm">
                <span className="text-pink mt-0.5">✕</span>
                <span className="text-muted">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* faq */}
      <section>
        <SectionHeading kicker="FAQ" title="Questions" />
        <div className="card divide-y divide-[var(--line)] overflow-hidden">
          {FAQ.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none p-5 text-sm font-medium">
                {f.q}
                <span className="text-muted group-open:rotate-45 transition-transform text-lg leading-none">+</span>
              </summary>
              <p className="px-5 pb-5 -mt-1 text-sm text-muted leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
