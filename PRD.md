# Hudi Points & Referrals — Product Requirements (Season 1)

**Status:** Draft v1 · **Owner:** Growth / Product · **Updated:** 2026-06-18
**Scope of this doc:** the points (rewards) system **and** the referral (fee-rebate) program, plus the front-end prototype that demonstrates them.

This is a re-optimization of the original internal note *“Ideas on Hudi Points.”* It keeps that note’s core thesis — *reward behaviour that improves the exchange, not generic volume* — and turns it into a buildable spec: an explicit scoring formula, a clear split between **referral points** and **referral cash rebates**, a tier/season structure, and anti-farming rules.

---

## 1. Background & objective

Hudi is a CLOB perpetuals exchange focused on **Asian equity perps** (HKEX / JPX / KRX names such as BABA-HK, NINTENDO, SAMSUNG) alongside some crypto and macro markets. It already ships ranks (🦐→🐟→🐬→🦈→🐳), a leaderboard, a vault, and a basic referral link.

A generic volume-farming points program would attract wash volume and mercenary capital without building the thing Hudi actually needs: **deep, two-sided liquidity in Asian-equity perps**, with healthy net-OI balance across market-hour gaps.

**Objective.** Design a points + referral system that optimizes for four outcomes:

1. **Real trading activity** — fees and genuine risk, not wash volume.
2. **Asian-equity perp adoption** — push flow into Hudi’s differentiated markets.
3. **CLOB liquidity quality** — depth, spread, uptime (not just size).
4. **Protocol risk alignment** — trades that reduce net-OI imbalance.

**Non-goals (Season 1):** token generation event mechanics, on-chain claim contracts, KYC/identity, market-maker portal back-office. The prototype is **front-end display only** (mock data).

---

## 2. What changed vs. the original note

| # | Original note | Re-optimized decision | Why |
|---|---|---|---|
| 1 | “Collateral Stickiness” as a possible category | **Removed**; folded into Time-Weighted OI | A held position already commits margin; rewarding idle collateral double-counts and invites parking. |
| 2 | Realized PnL / Loss = 15% | **Kept at 15%**, with hard caps + eligibility | Endorse the Papertrade-style insight (losses = real contribution) but ring-fence it so it can’t become the dominant farm. |
| 3 | Referral = a single 5% “quality” weight | **Split into two mechanisms**: (a) Referral **points** (5% of score) and (b) Referral **cash rebate** (10–25% of invitee fees, Hyperliquid-style) | These are different incentives — one grows your score, one pays you revenue. Conflating them confused the model. |
| 4 | Points formula implied but unspecified | **Explicit share-of-pool formula** + tier multiplier | Makes points predictable, auditable, and bounded by a fixed pool. |
| 5 | Ranks existed but weren’t tied to points | **Tiers drive multipliers + fee discounts + rebate %** | Turns the existing 🐟→🐳 ranks into a real progression loop. |
| 6 | Seasons mentioned once | **Season → Epoch cadence** with per-epoch pools and a season-end conversion | Gives users a clock and the protocol levers to tune mid-flight. |

---

## 3. Personas

- **Retail trader** — wants the highest points-per-effort; cares about “how do I earn more.”
- **Power/Asian-equity trader** — directional risk in HKEX/JPX/KRX; biggest target persona.
- **Referrer / KOL** — wants a clean link, share tools, and a transparent rebate ledger.
- **Market maker** — separate track; judged on book quality, not volume.

---

## 4. Points model (retail track)

### 4.1 Composite score (per epoch)

A user’s **composite score** is a weighted blend of six normalized components:

| Component | Weight | Rewards | Notes / guardrails |
|---|---:|---|---|
| **Fee Contribution** | 30% | Fees actually paid | The backbone; hardest to fake (costs real money). |
| **Time-Weighted OI** | 20% | `notional × holding_time × market_mult × quality` | Very short holds get ~0 credit; capped relative to fees. |
| **Asian-Equity Participation** | 20% | Share of activity in Asia perps | Driven by the market multiplier (§4.3). |
| **Realized PnL / Loss** | 15% | Genuine realized losses (boosted) + some realized-PnL activity | Capped per user/epoch; valid trades only (§4.4). |
| **Risk-Balancing Trades** | 10% | Taking the underweight side of a skewed book | `eligible_notional × holding_time × imbalance_reduction`. |
| **Referral Quality** | 5% | Bringing real, active traders | Distinct from cash rebate (§5); decays for inactive invitees. |
| **Total** | **100%** | | |

Each component is **normalized to [0,1]** across the eligible population before weighting, so no single raw metric (e.g. one whale’s fees) dominates the blend.

### 4.2 From score to points

Each **epoch** mints a fixed pool. Your points are your **share** of that pool, scaled by your tier multiplier:

```
composite_score   = Σ ( normalized_componentᵢ × weightᵢ )
epoch_points(you) = ( composite_score(you) / Σ composite_score(all) )
                    × epoch_pool
                    × tier_multiplier(you)
```

- **Share-based** ⇒ points reflect *relative* contribution and the pool is bounded (no infinite emission).
- **tier_multiplier** comes from the user’s rank (§4.5): 1.0× (Shrimp) → 1.6× (Whale).
- A **streak bonus** (e.g. +5% for a 7-day active streak) is an additional small multiplier, capped.

### 4.3 Asian-equity market multiplier

Applied inside Time-Weighted OI and Asian-Equity Participation:

| Market type | Examples | Multiplier |
|---|---|---|
| Core Asian equity perps | BABA-HK, NINTENDO, SAMSUNG | **1.5× – 2.0×** |
| Asian equity index perps | HSI, NKY, KOSPI | 1.2× – 1.5× |
| Gold / silver / macro hedges | XAU, XAG | 1.0× – 1.2× |
| Generic crypto markets | BTC, SUI | 0.5× – 1.0× |

### 4.4 Realized-loss participation (the careful part)

Bootstrapping early Asian-equity books needs traders to take directional risk before depth exists. Genuine realized losses are real economic contribution, so they earn a **boost** — adapted from the Papertrade idea, inside a CLOB venue. Guardrails:

- **Cap** loss-based points per user per epoch.
- **Valid trades only** — no credit for self-traded or wash losses.
- Loss farming must **never** be more profitable than normal trading.
- Give *some* credit to realized-PnL activity generally; a *stronger* boost specifically to losses that reflect real risk-taking.

### 4.5 Tiers (ranks)

Cumulative season points set the tier; the tier feeds the multiplier, a fee discount, and the referral rebate %:

| Tier | Min pts | Points multiplier | Fee discount | Referral rebate |
|---|---:|---:|---:|---:|
| 🦐 Shrimp | 0 | 1.00× | 0% | — |
| 🐟 Fish | 10k | 1.10× | 2% | 10% |
| 🐬 Dolphin | 100k | 1.25× | 5% | 15% |
| 🦈 Shark | 500k | 1.40× | 8% | 20% |
| 🐳 Whale | 2M | 1.60× | 12% | 25% |

---

## 5. Referral program (cash rebate + points)

Modeled on the Hyperliquid referral design (validated in the reference case study), with a tier-scaled twist.

### 5.1 Mechanics

- **Unlock:** a user can create a referral code after **$10,000** lifetime trading volume.
- **Referrer reward:** **10% → 25%** of invitee trading fees (scales with the referrer’s tier, §4.5), paid in cash/credit.
- **Invitee discount:** **4%** fee discount.
- **Default house code:** organic visitors with no code are auto-bound to a default code and still get the 4% discount.
- **Caps (anti-whale-farm):** referral rebate applies to the invitee’s first **$1B** of volume; the invitee discount applies to their first **$25M** of volume.
- **Binding:** relationship is set on the invitee’s **first login** via the link; permanent thereafter.

### 5.2 Referral points vs. referral rebate (must stay separate)

- **Referral points** (5% of composite score) → grows your *points*, decays if invitees go inactive, subject to anti-farming.
- **Referral rebate** (10–25% / 4%) → real *revenue share*, shown as a cash ledger.

A user should never be confused about which is which; the UI labels them explicitly.

### 5.3 Surfaces

- Code + shareable link, with X / Telegram / copy share actions.
- Earnings stats: total earned, pending, active invitees, referral points.
- Rebate tier ladder (10/15/20/25%).
- **Invitees** table (address, joined, volume, fees paid, your rebate, status).
- **Rebate records** ledger (time, invitee, market, their fee, your rebate).

---

## 6. Market-maker track (separate, 25% of season pool)

MMs are judged on whether they improve the book, not on volume:

| Component | Weight |
|---|---:|
| Maker Volume | 30% |
| Orderbook Depth | 25% |
| Spread Quality | 20% |
| Uptime & Coverage | 15% |
| Volatility-Time Support | 5% |
| Risk-Balancing Liquidity | 5% |

---

## 7. Seasons, epochs & conversion

- **Season 1 — Genesis:** ~12 epochs (≈ weekly). Pool = a fixed slice of $HUDI supply (placeholder: 8%).
- **Season pool split:** Retail **70%** / Market Makers **25%** / Strategic & Manual **5%**.
- **Per-epoch pool** is fixed in advance so users can reason about share.
- **Conversion:** Season points represent a claim on the Season reward pool at season end; final conversion/eligibility/timing are **subject to review** and anti-farming checks.

---

## 8. Anti-farming & integrity

Points are **subject to review**. Excluded or penalized:

- Self-trading, wash trading, circular trading between related accounts
- Referral loops, abusive referrals, same-funding-source sybil clusters
- Artificial loss farming, very short-duration OI farming
- Quote stuffing, far-from-mid orders with no real liquidity value

**Public wording:** *“Hudi Points reward genuine trading, liquidity contribution, and long-term market participation. Points generated through self-trading, wash trading, artificial loss farming, sybil activity, abusive referrals, or other manipulative behaviour may be adjusted or excluded.”*

---

## 9. Prototype scope (this repo)

Front-end only, English, mock data, no wallet/back-end. Four screens:

1. **Dashboard (`/`)** — your points, today’s delta, season/epoch, tier progress, points-per-epoch sparkline, six-component breakdown (donut + list), ways to earn, tier ladder, referral CTA.
2. **Referrals (`/referrals`)** — code + share, terms, earnings stats, rebate tiers, invitees table, rebate records ledger.
3. **Leaderboard (`/leaderboard`)** — pool split, tabs (Traders / Market Makers / Friends), top-3 podium, ranking table with 24h delta.
4. **How it works (`/how-it-works`)** — philosophy, the formula, retail weighting, realized-loss explainer, market multipliers, MM track, anti-farming, FAQ.

### Visual direction
Dark “season campaign” theme: near-black canvas, neon-green (Hudi green) primary with glow, magenta/blue/gold accents, monospace numerics, subtle grid + ambient glow. Inspired by airdrop/season campaign pages, while staying recognizably Hudi.

### Out of scope for the prototype
Real auth, live data, the claim flow, the MM portal, and the admin back-office (dashboard, market mgmt, withdrawals, etc. — tracked separately).

---

## 10. Success metrics (when live)

- % of trading volume on Asian-equity perps (primary).
- Net-OI imbalance reduction over a season.
- Share of fees from referred users; referrer retention.
- Sybil/wash share flagged & excluded (integrity).
- D30 retention of points-earning traders.

---

## 11. Open questions

1. Final **pool size** and $HUDI % per season.
2. Exact **caps** (loss points/epoch; OI cap relative to fees).
3. Should the **streak** multiplier stack with the tier multiplier, or be capped jointly?
4. Referral rebate **payout asset** — credit vs. stable vs. points-boost.
5. KYC threshold (if any) before claim/rebate withdrawal.
6. Index perps (HSI/NKY/KOSPI) — launch in Season 1 or later?
