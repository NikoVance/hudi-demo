/* ----------------------------------------------------------------------------
   Hudi-native admin modules — the things a generic perp-DEX admin lacks but an
   Asian-equity perp venue genuinely needs: trading sessions/calendar, funding
   control, per-market risk (circuit breakers + net-OI skew), and market makers.
   Mock data, display only. Grounded in Hudi's real venues & QA findings.
---------------------------------------------------------------------------- */

/* ---- Market sessions / trading calendar ---- */
export type Venue = {
  venue: string;
  tz: string;
  hours: string;
  localTime: string;
  status: "Open" | "Lunch break" | "Closed" | "Pre-open";
  nextChange: string;
  markets: number;
  reduceOnly: boolean;
  note?: string;
};
export const VENUES: Venue[] = [
  { venue: "HKEX", tz: "Asia/Hong_Kong", hours: "09:30–12:00 · 13:00–16:00", localTime: "13:12", status: "Open", nextChange: "closes 16:00 (2h48m)", markets: 4, reduceOnly: false },
  { venue: "JPX", tz: "Asia/Tokyo", hours: "09:00–11:30 · 12:30–15:30", localTime: "14:12", status: "Open", nextChange: "closes 15:30 (1h18m)", markets: 4, reduceOnly: false, note: "App currently mislabels JPX as closed — see H-34/H-39/H-63." },
  { venue: "KRX", tz: "Asia/Seoul", hours: "09:00–15:30", localTime: "14:12", status: "Open", nextChange: "closes 15:30 (1h18m)", markets: 13, reduceOnly: false },
  { venue: "Crypto", tz: "24/7", hours: "Always open", localTime: "—", status: "Open", nextChange: "never", markets: 2, reduceOnly: false },
];

export const HOLIDAYS = [
  { date: "2026-07-17", venue: "JPX", name: "Marine Day", type: "Full close" },
  { date: "2026-08-11", venue: "JPX", name: "Mountain Day", type: "Full close" },
  { date: "2026-09-29", venue: "HKEX", name: "Day after Mid-Autumn", type: "Half day" },
  { date: "2026-10-03", venue: "KRX", name: "National Foundation Day", type: "Full close" },
];

/* ---- Funding control ---- */
export type Funding = {
  market: string;
  rate: string; // per interval
  interval: string;
  nextSettle: string;
  lastSettle: string;
  status: "Settling on schedule" | "Pending" | "Stuck" | "Paused";
};
export const FUNDING: Funding[] = [
  { market: "BABA-HK-PERP", rate: "+0.0100%", interval: "8h", nextSettle: "02:48", lastSettle: "Jun 18 05:20 · ok", status: "Settling on schedule" },
  { market: "SAMSUNG-PERP", rate: "+0.0042%", interval: "8h", nextSettle: "02:48", lastSettle: "Jun 18 05:20 · ok", status: "Settling on schedule" },
  { market: "BTC-PERP", rate: "0.0000%", interval: "8h", nextSettle: "02:48", lastSettle: "Jun 14 21:20 · $0.00", status: "Stuck" },
  { market: "NINTENDO-PERP", rate: "—", interval: "8h", nextSettle: "—", lastSettle: "never", status: "Pending" },
];
export const FUNDING_ALERT =
  "Indexer is not reflecting on-chain funding for several markets (keeper live 06-14). 2 markets stuck/pending — investigate before season payout. (ref H-35)";

/* ---- Per-market risk: circuit breakers + net-OI skew ---- */
export type RiskMarket = {
  market: string;
  oi: number; // $M
  longPct: number; // 0..100
  breaker: "Normal" | "Slowed" | "Tripped";
  band: string; // price band
  bonusSide: "Long" | "Short" | "Balanced";
};
export const RISK_MARKETS: RiskMarket[] = [
  { market: "BABA-HK-PERP", oi: 1.55, longPct: 72, breaker: "Normal", band: "±8%", bonusSide: "Short" },
  { market: "NINTENDO-PERP", oi: 0.89, longPct: 64, breaker: "Slowed", band: "±10%", bonusSide: "Short" },
  { market: "SAMSUNG-PERP", oi: 0.19, longPct: 38, breaker: "Normal", band: "±8%", bonusSide: "Long" },
  { market: "BTC-PERP", oi: 1.20, longPct: 51, breaker: "Normal", band: "±5%", bonusSide: "Balanced" },
  { market: "HMM-PERP", oi: 1.85, longPct: 86, breaker: "Tripped", band: "±10%", bonusSide: "Short" },
];

/* ---- Market makers ---- */
export type MM = {
  name: string;
  markets: number;
  depth: number; // $k top-of-book each side
  spreadBps: number;
  uptime: number; // %
  mmPoints: number;
  status: "Healthy" | "Thin" | "Offline";
};
export const MARKET_MAKERS: MM[] = [
  { name: "Wintermute", markets: 19, depth: 142, spreadBps: 4.2, uptime: 99.4, mmPoints: 9_204_000, status: "Healthy" },
  { name: "GSR", markets: 16, depth: 118, spreadBps: 5.1, uptime: 98.7, mmPoints: 7_115_300, status: "Healthy" },
  { name: "Amber", markets: 12, depth: 86, spreadBps: 6.8, uptime: 97.1, mmPoints: 5_980_100, status: "Healthy" },
  { name: "0xDepthDesk", markets: 7, depth: 34, spreadBps: 11.5, uptime: 91.2, mmPoints: 3_410_660, status: "Thin" },
  { name: "TwoSidedQuotes", markets: 4, depth: 12, spreadBps: 18.0, uptime: 72.4, mmPoints: 2_220_540, status: "Offline" },
];
export const MM_PROGRAM = {
  track: "25% of Season 1 pool",
  rebate: "−0.02% maker rebate",
  weights: "Volume 30 · Depth 25 · Spread 20 · Uptime 15 · Vol-time 5 · Risk-bal 5",
};
