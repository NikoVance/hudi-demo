/* ----------------------------------------------------------------------------
   Hudi Points & Referrals — mock data (front-end prototype, display only).
   All numbers are illustrative. No backend, no wallet, no real balances.
---------------------------------------------------------------------------- */

export const SEASON = {
  number: 1,
  name: "Season 1 — Genesis",
  status: "Live" as const,
  endsInDays: 23,
  endsLabel: "Ends Jul 11, 2026",
  epochLabel: "Epoch 6 of 12",
  epochEndsIn: "5d 14h",
  totalParticipants: 18432,
  poolLabel: "8% of $HUDI supply",
  poolPoints: "142.8M",
  tracks: [
    { key: "retail", label: "Retail Traders", share: 70, color: "neon" },
    { key: "mm", label: "Market Makers", share: 25, color: "blue" },
    { key: "strategic", label: "Strategic / Manual", share: 5, color: "gold" },
  ],
};

/* ---- the signed-in user (mock) ---- */
export const USER = {
  handle: "0x3b95…7569",
  ens: "asia-degen.hudi",
  emoji: "🐬",
  tierKey: "dolphin",
  tierName: "Dolphin",
  totalPoints: 128_480,
  todayDelta: 1_840,
  seasonRank: 312,
  percentile: 2.4, // top X%
  multiplier: 1.25, // tier multiplier currently applied
  streakDays: 14,
  feeContribUsd: 41_230,
  realizedLossUsd: 6_180,
};

/* ---- 6-component retail score (re-optimized weighting) ---- */
export type Component = {
  key: string;
  label: string;
  weight: number; // % of composite
  points: number; // points earned this season from this component
  metric: string; // human readable contribution
  blurb: string;
  color: "neon" | "blue" | "pink" | "gold";
};

export const COMPONENTS: Component[] = [
  {
    key: "fee",
    label: "Fee Contribution",
    weight: 30,
    points: 41_900,
    metric: "$41,230 fees paid",
    blurb: "Real trading activity and protocol revenue. The backbone of your score.",
    color: "neon",
  },
  {
    key: "oi",
    label: "Time-Weighted OI",
    weight: 20,
    points: 25_300,
    metric: "Avg $18.4k held · 9.2d",
    blurb: "Notional × holding time × market multiplier. Rewards real positions, not flips.",
    color: "blue",
  },
  {
    key: "asia",
    label: "Asian Equity Participation",
    weight: 20,
    points: 27_600,
    metric: "68% of volume on Asia perps",
    blurb: "Trade the markets Hudi is built to own — HKEX, JPX, KRX perps earn the most.",
    color: "gold",
  },
  {
    key: "pnl",
    label: "Realized PnL / Loss",
    weight: 15,
    points: 19_100,
    metric: "$6,180 realized loss credited",
    blurb: "Genuine risk-taking. Real losses bootstrap early liquidity, so they earn a boost — within strict caps.",
    color: "pink",
  },
  {
    key: "risk",
    label: "Risk-Balancing Trades",
    weight: 10,
    points: 9_980,
    metric: "12 imbalance-reducing fills",
    blurb: "Take the underweight side of a skewed book and get a bonus. Healthier market, more points.",
    color: "neon",
  },
  {
    key: "ref",
    label: "Referral Quality",
    weight: 5,
    points: 4_600,
    metric: "8 active invitees",
    blurb: "Points for bringing real traders. Separate from cash fee rebates (see Referrals).",
    color: "blue",
  },
];

/* points earned per epoch (for the sparkline) */
export const EPOCH_POINTS = [9200, 12400, 15800, 14100, 21300, 24800, 30880];

/* ---- tiers / ranks ---- */
export type Tier = {
  key: string;
  name: string;
  emoji: string;
  min: number;
  feeDiscount: number; // %
  multiplier: number; // points multiplier
};
export const TIERS: Tier[] = [
  { key: "shrimp", name: "Shrimp", emoji: "🦐", min: 0, feeDiscount: 0, multiplier: 1.0 },
  { key: "fish", name: "Fish", emoji: "🐟", min: 10_000, feeDiscount: 2, multiplier: 1.1 },
  { key: "dolphin", name: "Dolphin", emoji: "🐬", min: 100_000, feeDiscount: 5, multiplier: 1.25 },
  { key: "shark", name: "Shark", emoji: "🦈", min: 500_000, feeDiscount: 8, multiplier: 1.4 },
  { key: "whale", name: "Whale", emoji: "🐳", min: 2_000_000, feeDiscount: 12, multiplier: 1.6 },
];

/* ---- "ways to earn" task cards ---- */
export const EARN_TASKS = [
  { title: "Trade an Asian equity perp", reward: "up to 2.0× points", icon: "🇭🇰", done: true },
  { title: "Hold a position > 24h", reward: "Time-weighted OI", icon: "⏳", done: true },
  { title: "Take the underweight side", reward: "Risk-balancing bonus", icon: "⚖️", done: false },
  { title: "Refer a trader", reward: "10% fee rebate + points", icon: "🤝", done: true },
  { title: "Keep a 7-day streak", reward: "+5% multiplier", icon: "🔥", done: true },
  { title: "Provide maker liquidity", reward: "Market-maker track", icon: "📘", done: false },
];

/* ---- Asian-equity market multipliers (from the design doc) ---- */
export const MULTIPLIERS = [
  { type: "Core Asian equity perps", example: "BABA-HK, NINTENDO, SAMSUNG", mult: "1.5× – 2.0×", color: "neon" },
  { type: "Asian equity index perps", example: "HSI, NKY, KOSPI", mult: "1.2× – 1.5×", color: "gold" },
  { type: "Gold, silver, macro hedges", example: "XAU, XAG", mult: "1.0× – 1.2×", color: "blue" },
  { type: "Generic crypto markets", example: "BTC, SUI", mult: "0.5× – 1.0×", color: "pink" },
];

/* ---- leaderboard ---- */
export type Row = {
  rank: number;
  handle: string;
  tier: string;
  emoji: string;
  points: number;
  delta: number; // rank change
  you?: boolean;
};
export const LEADERBOARD_TRADERS: Row[] = [
  { rank: 1, handle: "kabuto.hudi", tier: "Whale", emoji: "🐳", points: 4_812_300, delta: 0 },
  { rank: 2, handle: "0x9f…a12c", tier: "Whale", emoji: "🐳", points: 3_905_640, delta: 1 },
  { rank: 3, handle: "seoul-sniper", tier: "Whale", emoji: "🐳", points: 3_120_900, delta: -1 },
  { rank: 4, handle: "0x4d…77b9", tier: "Shark", emoji: "🦈", points: 1_984_120, delta: 2 },
  { rank: 5, handle: "nikkei-maxi", tier: "Shark", emoji: "🦈", points: 1_540_700, delta: 0 },
  { rank: 6, handle: "0x2a…0e41", tier: "Shark", emoji: "🦈", points: 1_201_450, delta: -2 },
  { rank: 7, handle: "hedge-san", tier: "Shark", emoji: "🦈", points: 988_300, delta: 3 },
  { rank: 8, handle: "0x71…ccaa", tier: "Shark", emoji: "🦈", points: 803_220, delta: 1 },
];
export const LEADERBOARD_MM: Row[] = [
  { rank: 1, handle: "Wintermute", tier: "MM", emoji: "📘", points: 9_204_000, delta: 0 },
  { rank: 2, handle: "GSR", tier: "MM", emoji: "📘", points: 7_115_300, delta: 0 },
  { rank: 3, handle: "Amber", tier: "MM", emoji: "📘", points: 5_980_100, delta: 1 },
  { rank: 4, handle: "0xDepthDesk", tier: "MM", emoji: "📘", points: 3_410_660, delta: -1 },
  { rank: 5, handle: "TwoSidedQuotes", tier: "MM", emoji: "📘", points: 2_220_540, delta: 2 },
];

/* ---- referral program (Hyperliquid-style rebate + points) ---- */
export const REFERRAL = {
  code: "ASIA-DEGEN",
  link: "https://hudi.com/join/ASIA-DEGEN",
  unlocked: true,
  unlockVolume: 10_000, // $ volume to create a code
  referrerRebate: 10, // % of referee fees, current tier
  refereeDiscount: 4, // % fee discount for the friend
  rebateVolumeCap: "1B", // referee volume that earns rebate
  discountVolumeCap: "25M",
  earnedUsd: 1_284.4,
  pendingUsd: 96.2,
  pointsFromReferrals: 4_600,
  invitees: 8,
  activeInvitees: 6,
  // referrer rebate scales with your own tier
  rebateTiers: [
    { tier: "Fish", rebate: 10, note: "Create code at $10k volume" },
    { tier: "Dolphin", rebate: 15, note: "You are here", you: true },
    { tier: "Shark", rebate: 20, note: "500k+ points" },
    { tier: "Whale", rebate: 25, note: "Top of the book" },
  ],
};

export type Invitee = {
  handle: string;
  joined: string;
  volume: number;
  feesPaid: number;
  yourRebate: number;
  active: boolean;
};
export const INVITEES: Invitee[] = [
  { handle: "0xa1…9f02", joined: "2026-06-02", volume: 412_300, feesPaid: 206.1, yourRebate: 30.9, active: true },
  { handle: "tokyo-bull", joined: "2026-06-04", volume: 188_900, feesPaid: 94.4, yourRebate: 14.2, active: true },
  { handle: "0x77…1ab3", joined: "2026-06-07", volume: 96_400, feesPaid: 48.2, yourRebate: 7.2, active: true },
  { handle: "kospi-kid", joined: "2026-06-09", volume: 61_200, feesPaid: 30.6, yourRebate: 4.6, active: true },
  { handle: "0x3e…77c1", joined: "2026-06-11", volume: 44_800, feesPaid: 22.4, yourRebate: 3.4, active: true },
  { handle: "hsi-hodler", joined: "2026-06-12", volume: 12_050, feesPaid: 6.0, yourRebate: 0.9, active: true },
  { handle: "0x90…ee2f", joined: "2026-06-14", volume: 2_400, feesPaid: 1.2, yourRebate: 0.18, active: false },
  { handle: "0x5c…b740", joined: "2026-06-16", volume: 0, feesPaid: 0, yourRebate: 0, active: false },
];

export type Rebate = {
  date: string;
  invitee: string;
  market: string;
  theirFee: number;
  yourRebate: number;
};
export const REBATE_RECORDS: Rebate[] = [
  { date: "2026-06-17 14:02", invitee: "0xa1…9f02", market: "BABA-HK-PERP", theirFee: 5.4, yourRebate: 0.81 },
  { date: "2026-06-17 11:48", invitee: "tokyo-bull", market: "NINTENDO-PERP", theirFee: 3.1, yourRebate: 0.47 },
  { date: "2026-06-16 22:15", invitee: "0xa1…9f02", market: "SAMSUNG-PERP", theirFee: 8.9, yourRebate: 1.34 },
  { date: "2026-06-16 09:30", invitee: "kospi-kid", market: "BTC-PERP", theirFee: 2.2, yourRebate: 0.33 },
  { date: "2026-06-15 19:51", invitee: "0x77…1ab3", market: "BABA-HK-PERP", theirFee: 4.7, yourRebate: 0.71 },
  { date: "2026-06-15 08:12", invitee: "tokyo-bull", market: "TENCENT-PERP", theirFee: 6.3, yourRebate: 0.95 },
];

/* ---- market-maker points model (separate track) ---- */
export const MM_COMPONENTS = [
  { label: "Maker Volume", weight: 30 },
  { label: "Orderbook Depth", weight: 25 },
  { label: "Spread Quality", weight: 20 },
  { label: "Uptime & Coverage", weight: 15 },
  { label: "Volatility-Time Support", weight: 5 },
  { label: "Risk-Balancing Liquidity", weight: 5 },
];

/* ---- anti-farming ---- */
export const ANTI_FARMING = [
  "Self-trading & wash trading",
  "Circular trading between related accounts",
  "Referral loops & abusive referrals",
  "Same-funding-source sybil clusters",
  "Artificial loss farming",
  "Very short-duration OI farming",
  "Quote stuffing (market makers)",
  "Far-from-mid orders with no real liquidity value",
];

/* ---- FAQ ---- */
export const FAQ = [
  {
    q: "How are points calculated?",
    a: "Each epoch, your composite score = a weighted blend of six components (fee contribution, time-weighted OI, Asian-equity participation, realized PnL/loss, risk-balancing trades, referral quality). Your share of the epoch pool = your score ÷ the sum of all eligible scores, times your tier multiplier.",
  },
  {
    q: "Why do realized losses earn points?",
    a: "Early Asian-equity perp liquidity needs traders to take directional risk before books get deep. Genuine realized losses are real economic contribution, so they earn a boost — but loss-based points are capped per user per epoch and only count for valid, non-manipulative trades.",
  },
  {
    q: "What is the difference between referral points and the fee rebate?",
    a: "Two separate things. Referral Quality (5% of your score) gives points for bringing real traders. The fee rebate is real revenue share: you earn a % of your invitees' trading fees in cash/credit, and they get a fee discount.",
  },
  {
    q: "Do points convert to a token?",
    a: "Season 1 points represent a claim on the Season 1 reward pool (a portion of $HUDI supply) at the end of the season. Final conversion, eligibility and timing are subject to review and anti-farming checks.",
  },
  {
    q: "Are points final?",
    a: "No. Hudi Points reward genuine trading, liquidity, and long-term participation. Points generated through self-trading, wash trading, artificial loss farming, sybil activity, abusive referrals, or other manipulation may be adjusted or excluded.",
  },
];

/* ---- helpers ---- */
export function fmt(n: number): string {
  return n.toLocaleString("en-US");
}
export function fmtUsd(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
export function compact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

export function tierProgress() {
  const i = TIERS.findIndex((t) => t.key === USER.tierKey);
  const cur = TIERS[i];
  const next = TIERS[i + 1];
  if (!next) return { cur, next: null, pct: 100, toGo: 0 };
  const pct = Math.min(
    100,
    Math.round(((USER.totalPoints - cur.min) / (next.min - cur.min)) * 100)
  );
  return { cur, next, pct, toGo: next.min - USER.totalPoints };
}
