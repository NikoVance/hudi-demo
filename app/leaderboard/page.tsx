import {
  SEASON,
  USER,
  LEADERBOARD_TRADERS,
  LEADERBOARD_MM,
  type Row,
  fmt,
  compact,
} from "@/lib/data";
import { SectionHeading, Delta, COLOR } from "@/components/ui";
import { Tabs } from "@/components/tabs";

const FRIENDS: Row[] = [
  { rank: 41, handle: "tokyo-bull", tier: "Shark", emoji: "🦈", points: 612_400, delta: 4 },
  { rank: 188, handle: "kospi-kid", tier: "Dolphin", emoji: "🐬", points: 198_900, delta: -3 },
  { rank: 312, handle: USER.ens, tier: USER.tierName, emoji: USER.emoji, points: USER.totalPoints, delta: 6, you: true },
  { rank: 904, handle: "hsi-hodler", tier: "Fish", emoji: "🐟", points: 41_200, delta: 12 },
];

export default function Leaderboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
      <SectionHeading
        kicker="Season 1 — Genesis"
        title="Leaderboard"
        desc={`${fmt(SEASON.totalParticipants)} participants competing for the Season 1 reward pool.`}
        right={<span className="chip chip-neon">Pool · {SEASON.poolLabel}</span>}
      />

      {/* pool split banner */}
      <div className="card p-5 mb-8">
        <div className="label mb-3">Reward pool split</div>
        <div className="flex h-3 rounded-full overflow-hidden">
          {SEASON.tracks.map((t) => (
            <div key={t.key} style={{ width: `${t.share}%`, background: COLOR[t.color], boxShadow: `0 0 12px ${COLOR[t.color]}66` }} />
          ))}
        </div>
        <div className="flex gap-6 mt-3 flex-wrap">
          {SEASON.tracks.map((t) => (
            <div key={t.key} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: COLOR[t.color] }} />
              <span className="text-sm">{t.label}</span>
              <span className="tabular text-sm text-muted">{t.share}%</span>
            </div>
          ))}
        </div>
      </div>

      <Tabs
        tabs={[
          { label: "Traders", content: <Board rows={LEADERBOARD_TRADERS} /> },
          { label: "Market Makers", content: <Board rows={LEADERBOARD_MM} mm /> },
          { label: "Friends", content: <Board rows={FRIENDS} /> },
        ]}
      />
    </div>
  );
}

function Board({ rows, mm }: { rows: Row[]; mm?: boolean }) {
  const podium = rows.slice(0, 3);
  const rest = rows.slice(3);
  return (
    <div>
      {/* podium */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        {[podium[1], podium[0], podium[2]].map((r, idx) => {
          if (!r) return <div key={idx} />;
          const place = r.rank;
          const tall = place === 1;
          const medal = place === 1 ? "🥇" : place === 2 ? "🥈" : "🥉";
          return (
            <div
              key={r.handle}
              className="card p-5 text-center self-end"
              style={
                tall
                  ? { paddingTop: 28, paddingBottom: 28, borderColor: "rgba(46,242,166,.5)", boxShadow: "0 0 50px -18px rgba(46,242,166,.7)" }
                  : undefined
              }
            >
              <div className="text-2xl">{medal}</div>
              <div className="text-2xl mt-1">{r.emoji}</div>
              <div className="mono text-sm mt-2 truncate">{r.handle}</div>
              <div className="label mt-0.5">{r.tier}</div>
              <div className={`tabular text-xl font-semibold mt-2 ${tall ? "text-neon glow" : ""}`}>{compact(r.points)}</div>
            </div>
          );
        })}
      </div>

      {/* table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="tbl min-w-[560px]">
            <thead>
              <tr>
                <th className="w-16">Rank</th>
                <th>{mm ? "Market maker" : "Trader"}</th>
                <th>Tier</th>
                <th className="text-right">Points</th>
                <th className="text-right w-20">24h</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((r) => (
                <tr
                  key={r.handle}
                  className="row-hover"
                  style={r.you ? { background: "var(--neon-soft)" } : undefined}
                >
                  <td className="tabular text-muted">#{r.rank}</td>
                  <td className="mono">
                    {r.emoji} {r.handle} {r.you && <span className="chip chip-neon ml-1">you</span>}
                  </td>
                  <td className="text-sm text-muted">{r.tier}</td>
                  <td className="tabular text-right">{fmt(r.points)}</td>
                  <td className="text-right"><Delta value={r.delta} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
