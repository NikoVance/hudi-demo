/* ----------------------------------------------------------------------------
   Hudi Admin console — mock data (front-end prototype, display only).
   Illustrative numbers. No backend, no real funds, no real controls.
---------------------------------------------------------------------------- */

export const ADMIN_USER = { name: "ops.hudi", role: "Super Admin", initials: "OP" };

/* ---- dashboard KPIs ---- */
export const KPIS = [
  { label: "24h Volume", value: "$48.2M", delta: "+12.4%", up: true },
  { label: "Open Interest", value: "$9.41M", delta: "+3.1%", up: true },
  { label: "24h Fees", value: "$24,180", delta: "+8.7%", up: true },
  { label: "Active Users (24h)", value: "3,902", delta: "-1.2%", up: false },
  { label: "Total Users", value: "18,432", delta: "+214", up: true },
  { label: "Insurance Fund", value: "$1.86M", delta: "stable", up: true },
];

export const VOLUME_7D = [31.2, 28.9, 35.4, 41.1, 38.6, 44.0, 48.2]; // $M
export const OI_BY_VENUE = [
  { label: "HKEX", value: 3.9, color: "neon" },
  { label: "KRX", value: 2.6, color: "gold" },
  { label: "JPX", value: 1.7, color: "blue" },
  { label: "Crypto", value: 1.2, color: "pink" },
];

/* ---- markets ---- */
export type Market = {
  symbol: string;
  name: string;
  venue: string;
  status: "Live" | "Reduce-only" | "Settling" | "Pending";
  maxLev: number;
  maker: number; // %
  taker: number;
  oracle: "ok" | "lagging" | "down";
};
export const MARKETS: Market[] = [
  { symbol: "BABA-HK-PERP", name: "Alibaba (HK)", venue: "HKEX", status: "Live", maxLev: 10, maker: -0.02, taker: 0.05, oracle: "ok" },
  { symbol: "TENCENT-PERP", name: "Tencent", venue: "HKEX", status: "Live", maxLev: 10, maker: -0.02, taker: 0.05, oracle: "ok" },
  { symbol: "NINTENDO-PERP", name: "Nintendo", venue: "JPX", status: "Reduce-only", maxLev: 10, maker: -0.02, taker: 0.05, oracle: "ok" },
  { symbol: "SONY-PERP", name: "Sony Group", venue: "JPX", status: "Reduce-only", maxLev: 10, maker: -0.02, taker: 0.05, oracle: "lagging" },
  { symbol: "SAMSUNG-PERP", name: "Samsung Elec", venue: "KRX", status: "Live", maxLev: 10, maker: -0.02, taker: 0.05, oracle: "ok" },
  { symbol: "SKHYNIX-PERP", name: "SK Hynix", venue: "KRX", status: "Live", maxLev: 10, maker: -0.02, taker: 0.05, oracle: "ok" },
  { symbol: "BTC-PERP", name: "Bitcoin", venue: "Crypto", status: "Live", maxLev: 10, maker: -0.02, taker: 0.05, oracle: "ok" },
  { symbol: "ADVANTEST-PERP", name: "Advantest", venue: "JPX", status: "Pending", maxLev: 5, maker: -0.02, taker: 0.05, oracle: "down" },
];

/* ---- users ---- */
export type AdminUser = {
  addr: string;
  equity: number;
  positions: number;
  tier: string;
  status: "Active" | "Frozen" | "Flagged";
  joined: string;
};
export const ADMIN_USERS: AdminUser[] = [
  { addr: "0x3b95…7569", equity: 23.25, positions: 1, tier: "Dolphin", status: "Active", joined: "2026-06-01" },
  { addr: "kabuto.hudi", equity: 482_300, positions: 6, tier: "Whale", status: "Active", joined: "2026-05-12" },
  { addr: "0x9f…a12c", equity: 190_120, positions: 3, tier: "Whale", status: "Active", joined: "2026-05-18" },
  { addr: "0x4d…77b9", equity: 41_980, positions: 2, tier: "Shark", status: "Flagged", joined: "2026-06-03" },
  { addr: "tokyo-bull", equity: 12_400, positions: 1, tier: "Shark", status: "Active", joined: "2026-06-04" },
  { addr: "0x71…ccaa", equity: 803, positions: 0, tier: "Fish", status: "Frozen", joined: "2026-06-10" },
];

/* ---- withdrawal approvals ---- */
export type Withdrawal = {
  id: string;
  user: string;
  amount: number;
  asset: string;
  tier: "T3" | "T4";
  approvals: number;
  needed: number;
  risk: "low" | "medium" | "high";
  age: string;
};
export const WITHDRAWALS: Withdrawal[] = [
  { id: "WD-10293", user: "kabuto.hudi", amount: 420_000, asset: "aUSDC", tier: "T4", approvals: 1, needed: 3, risk: "high", age: "12m" },
  { id: "WD-10292", user: "0x9f…a12c", amount: 96_500, asset: "aUSDC", tier: "T3", approvals: 1, needed: 2, risk: "medium", age: "44m" },
  { id: "WD-10291", user: "nikkei-maxi", amount: 61_200, asset: "aUSDC", tier: "T3", approvals: 0, needed: 2, risk: "medium", age: "1h" },
  { id: "WD-10288", user: "0x4d…77b9", amount: 18_900, asset: "aUSDC", tier: "T3", approvals: 2, needed: 2, risk: "low", age: "2h" },
];

/* ---- wallet / vault monitoring ---- */
export type Vault = {
  chain: string;
  balance: number;
  target: number;
  pending: number;
  status: "healthy" | "rebalance" | "low";
};
export const VAULTS: Vault[] = [
  { chain: "Arbitrum", balance: 4.21, target: 5.0, pending: 0.18, status: "healthy" },
  { chain: "Base", balance: 1.92, target: 2.0, pending: 0.04, status: "healthy" },
  { chain: "Solana", balance: 0.61, target: 1.5, pending: 0.22, status: "low" },
];

/* ---- liquidations ---- */
export const LIQUIDATIONS = [
  { time: "2026-06-18 05:42", user: "0x71…ccaa", market: "BTC-PERP", side: "LONG", size: "0.18", loss: 1_204, by: "engine" },
  { time: "2026-06-18 03:11", user: "0x4d…77b9", market: "SAMSUNG-PERP", side: "SHORT", size: "120", loss: 880, by: "engine" },
  { time: "2026-06-17 22:50", user: "tokyo-bull", market: "NINTENDO-PERP", side: "LONG", size: "60", loss: 540, by: "engine" },
  { time: "2026-06-17 14:08", user: "0x9f…a12c", market: "BABA-HK-PERP", side: "LONG", size: "900", loss: 3_120, by: "engine" },
];

/* ---- insurance fund flows ---- */
export const INSURANCE = {
  balance: 1_862_400,
  min: 1_000_000,
  flows: [
    { time: "2026-06-18 05:42", type: "Liquidation surplus", market: "BTC-PERP", amount: +420 },
    { time: "2026-06-18 03:11", type: "Liquidation surplus", market: "SAMSUNG-PERP", amount: +180 },
    { time: "2026-06-17 14:08", type: "Bad-debt cover", market: "BABA-HK-PERP", amount: -640 },
    { time: "2026-06-16 09:00", type: "Manual top-up", market: "—", amount: +250_000 },
  ],
};

/* ---- fee accounts ---- */
export const FEES = {
  cumulative: 3_184_220,
  last24h: 24_180,
  toInsurance: 318_422,
  toReferrers: 412_990,
  ledger: [
    { time: "2026-06-18 05:42", market: "BABA-HK-PERP", taker: 5.4, maker: -0.8, net: 4.6 },
    { time: "2026-06-18 05:41", market: "BTC-PERP", taker: 2.2, maker: -0.3, net: 1.9 },
    { time: "2026-06-18 05:40", market: "SAMSUNG-PERP", taker: 8.9, maker: -1.2, net: 7.7 },
    { time: "2026-06-18 05:38", market: "NINTENDO-PERP", taker: 3.1, maker: -0.4, net: 2.7 },
  ],
};

/* ---- emergency controls ---- */
export const EMERGENCY = [
  { key: "trading", label: "Global trading", paused: false, desc: "Pause all order placement across every market." },
  { key: "withdrawals", label: "Withdrawals", paused: false, desc: "Halt all withdrawal processing and approvals." },
  { key: "newpos", label: "New positions (JPX)", paused: true, desc: "JPX is outside trading hours — reduce-only enforced." },
];

/* ---- audit log ---- */
export const AUDIT = [
  { time: "2026-06-18 05:30", admin: "ops.hudi", action: "MARKET_REDUCE_ONLY", resource: "NINTENDO-PERP", ip: "10.0.2.4" },
  { time: "2026-06-18 04:02", admin: "risk.hudi", action: "WITHDRAWAL_APPROVE", resource: "WD-10288", ip: "10.0.2.9" },
  { time: "2026-06-18 01:15", admin: "ops.hudi", action: "MARKET_FEE_UPDATE", resource: "BTC-PERP", ip: "10.0.2.4" },
  { time: "2026-06-17 21:40", admin: "finance.hudi", action: "INSURANCE_TOPUP", resource: "$250,000", ip: "10.0.3.1" },
  { time: "2026-06-17 18:22", admin: "growth.hudi", action: "POINTS_WEIGHT_UPDATE", resource: "Season 1", ip: "10.0.4.7" },
];

/* ---- admins ---- */
export const ADMINS = [
  { name: "ops.hudi", role: "Super Admin", status: "Active", twofa: true },
  { name: "risk.hudi", role: "Risk / Approver", status: "Active", twofa: true },
  { name: "finance.hudi", role: "Finance", status: "Active", twofa: true },
  { name: "growth.hudi", role: "Growth (Points)", status: "Active", twofa: false },
  { name: "readonly.hudi", role: "Read-only", status: "Disabled", twofa: false },
];

/* ---- points & referral operations ---- */
export const POINTS_ADMIN = {
  season: { name: "Season 1 — Genesis", epoch: "6 / 12", pool: "8% of supply", status: "Live" },
  weights: [
    { key: "Fee Contribution", value: 30 },
    { key: "Time-Weighted OI", value: 20 },
    { key: "Asian-Equity Participation", value: 20 },
    { key: "Realized PnL / Loss", value: 15 },
    { key: "Risk-Balancing Trades", value: 10 },
    { key: "Referral Quality", value: 5 },
  ],
  referral: { referrerRebate: "10–25%", refereeDiscount: "4%", unlock: "$10k volume", rebateCap: "$1B", discountCap: "$25M" },
  reviewQueue: [
    { id: "FARM-441", addr: "0x4d…77b9", signal: "Same-funding sybil cluster (6 accts)", points: 182_400, action: "pending" },
    { id: "FARM-440", addr: "0x71…ccaa", signal: "Artificial loss farming", points: 41_900, action: "pending" },
    { id: "FARM-438", addr: "0xab…0c2e", signal: "Referral loop", points: 12_050, action: "excluded" },
    { id: "FARM-435", addr: "0x55…91fa", signal: "Wash trading (self-match)", points: 96_200, action: "excluded" },
  ],
};
