# Hudi Points & Referrals — Product Requirements (Season 1)

**Status:** Draft **v2** · **Owner:** Growth / Product · **Updated:** 2026-06-18
**Scope:** the points (rewards) system **and** the referral (fee-rebate) program, plus the front-end prototype that demonstrates them.

This re-optimizes the original internal note *“Ideas on Hudi Points.”* It keeps that thesis — *reward behaviour that improves the exchange, not generic volume* — and turns it into a buildable spec.

### Changelog v1 → v2
v2 closes the gaps that made v1 a *direction* rather than a shippable spec:
1. **Scoring is now fully specified** — concave normalization curve + per-identity floor (§4.2), resolving the whale-vs-sybil tension v1 left open.
2. **Realized-loss points** get a value-source rationale for a CLOB, hard anti-collusion guardrails, and a **Season-1-only sunset** (§4.5).
3. **Fee economics / waterfall** added — proves the referral payout closes and bounds the top rebate (§6).
4. **Market-hours accrual rules** added — what does/doesn’t accrue while an Asian market is closed (§4.7).
5. **Data-integrity dependencies** made explicit (marks, funding) + funding-in-PnL defined (§9). Grounded in live QA findings (H-35 funding null, H-30/H-42 stale marks).
6. **Sustainability & retention** — emission curve, vesting, post-season reserve (§10).
7. **Compliance/eligibility**, **governance/change-management**, and an **appeals process** added (§11–13).

---

## 1. Background & objective

Hudi is a CLOB perpetuals exchange focused on **Asian equity perps** (HKEX / JPX / KRX names such as BABA-HK, NINTENDO, SAMSUNG) alongside some crypto and macro markets, with market makers and a fixed reward pool. It already ships ranks (🦐→🐟→🐬→🦈→🐳), a leaderboard, a vault, and a basic referral link.

A generic volume-farming program attracts wash volume and mercenary capital without building what Hudi needs: **deep, two-sided liquidity in Asian-equity perps, with healthy net-OI balance across market-hour gaps.**

**Objective — optimize for four outcomes:** (1) real trading activity, (2) Asian-equity perp adoption, (3) CLOB liquidity quality, (4) protocol risk alignment.

**Non-goals (Season 1):** TGE mechanics, on-chain claim contracts, MM back-office. The prototype is **front-end display only** (mock data).

---

## 2. What changed vs. the original note

| Original note | v2 decision | Why |
|---|---|---|
| “Collateral Stickiness” category | Removed; folded into Time-Weighted OI | Held positions already commit margin; rewarding idle collateral double-counts. |
| Realized PnL/Loss = 15% | Kept 15%, **capped, anti-collusion, Season-1 sunset** | Endorse the insight but ring-fence it (§4.5). |
| Single 5% “referral quality” | Split: referral **points** (5%) + referral **cash rebate** (§5) | Different incentives — one grows score, one pays revenue. |
| Formula implied | **Fully specified**: concave normalization + identity floor + share-of-pool + tier multiplier (§4) | Predictable, auditable, sybil/whale-aware. |
| Ranks not tied to points | Tiers drive multiplier + fee discount + rebate % (§4.8) | Real progression loop. |

---

## 3. Personas
Retail trader · Asian-equity power trader (primary) · Referrer/KOL · Market maker (separate track).

---

## 4. Points model (retail track)

### 4.1 Six components

| Component | Weight | Rewards | Guardrail |
|---|---:|---|---|
| Fee Contribution | 30% | Fees actually paid | Hardest to fake (costs real money). |
| Time-Weighted OI | 20% | `notional × holding_time × market_mult × quality_factor` | Short holds ≈ 0; capped vs fees; closed-hours rule §4.7. |
| Asian-Equity Participation | 20% | Share of activity in Asia perps | Driven by market multiplier §4.6. |
| Realized PnL / Loss | 15% | Genuine realized losses (boosted) + some realized-PnL activity | Capped, anti-collusion, **Season-1 only** §4.5. |
| Risk-Balancing Trades | 10% | Taking the underweight side of a skewed book | `eligible_notional × holding_time × imbalance_reduction`; closed-hours rule §4.7. |
| Referral Quality | 5% | Bringing real, active traders | Decays for inactive invitees; distinct from cash rebate §5. |

**`quality_factor`** (was undefined in v1): a 0–1 multiplier on OI that penalizes positions that are economically inert — e.g. opened then immediately hedged flat across the same account set, parked at far-from-mark prices, or held only across a settlement boundary. Default 1.0; reduced by the anti-farming engine.

### 4.2 Normalization & the whale-vs-sybil curve (the core fix)

Each raw component metric is mapped to a score with a **concave transform**, then weighted:

```
norm_i(user) = ( clamp(raw_i, 0, P99_i) / P99_i ) ^ k        with k = 0.5  (square-root)
composite     = Σ ( norm_i × weight_i )
```

- **Concave (k≈0.5)** rewards the long tail and prevents one mega-whale from compressing everyone to ~0 (linear min-max would). Winsorize at the 99th percentile so a single outlier can’t set the ceiling.
- **Concavity increases sybil incentive** (splitting sits on the steep part of the curve). We counter it with:
  - **Per-identity floor:** an account earns *zero* points until it clears minimum real activity (e.g. ≥ $X fees AND ≥ N distinct trading days in the epoch). Kills dust-account splitting.
  - **Sybil clustering:** accounts flagged as one cluster (shared funding source, timing, withdrawal target) are **scored as a single identity** before normalization (see §8).
- **k is a tunable** (0.4–0.7). Lower k = flatter/more egalitarian; higher k = more whale-weighted. Default k = 0.5.

### 4.3 From score to points

```
epoch_points(user) = ( composite(user) / Σ composite(all eligible) )
                     × epoch_pool
                     × tier_multiplier(user)
                     × streak_multiplier(user)
```
Share-based ⇒ bounded emission. **Points bank cumulatively** across epochs into a Season total (they do **not** decay); the Season total drives tiers and the end-of-season conversion.

### 4.4 Multiplier caps
- `tier_multiplier`: 1.00× (Shrimp) → 1.60× (Whale).
- `streak_multiplier`: +5% per qualifying week, **capped at +15%** (1.15× max).
- **Combined multiplier hard cap = 1.8×** so multipliers can’t dominate genuine contribution.

### 4.5 Realized-loss participation — rationale + guardrails (rewritten)

**Why it can exist in a CLOB.** Unlike a vAMM/Papertrade pool (user-vs-pool, where losses literally fund the pool), on a CLOB the counterparty to a losing taker is usually a maker. So losses do **not** automatically accrue to the protocol. We therefore treat loss-points narrowly: as a **bootstrap subsidy** that pays early traders for providing the directional risk that lets MMs quote and books mature — funded from the fixed reward pool, **not** from other users.

**Hard guardrails:**
- Loss credit per user/epoch is **capped at a fraction of that user’s Fee Contribution** (you can’t earn loss-points without genuine paid activity).
- **Exclude losses whose counterparty is a related/sybil account or a partnered market maker** (anti-collusion — the key CLOB gap v1 missed).
- No credit for self-traded or wash losses; only valid, non-manipulative fills.
- Loss farming must **never** beat normal trading on expected points.
- **Season-1-only sunset:** this component is a launch bootstrap; it is reviewed for removal/reduction in Season 2 once books are deep.

### 4.6 Asian-equity market multiplier
Core Asian equity perps **1.5–2.0×** · index perps 1.2–1.5× · gold/macro 1.0–1.2× · generic crypto 0.5–1.0×. Exact value per market is set by governance and **frozen for the epoch** (§13). New-listing bootstrap boost (first 2 epochs of a new market) up to +0.3× on top.

### 4.7 Market-hours accrual (Hudi-specific, new)
Asian markets close overnight/weekends. Rules while a market is **closed / reduce-only**:
- **Time-Weighted OI does NOT accrue** during closed sessions — you can’t earn “holding” points for risk you can’t exit or that can’t be liquidated.
- **Risk-Balancing does NOT accrue** while closed (no live book to balance).
- **Fee Contribution** only accrues on actual fills (so naturally pauses).
- This depends on a **single, correct session source of truth** — the same defect surfaced in QA (H-34/H-39/H-63 open/close inconsistency) must be fixed first, or accrual will be wrong.

### 4.8 Tiers
Set by **cumulative Season points** (not all-time), refreshed each epoch:

| Tier | Min pts | Pts mult | Fee discount | Referral rebate |
|---|---:|---:|---:|---:|
| 🦐 Shrimp | 0 | 1.00× | 0% | — |
| 🐟 Fish | 10k | 1.10× | 2% | 10% |
| 🐬 Dolphin | 100k | 1.25× | 5% | 15% |
| 🦈 Shark | 500k | 1.40× | 8% | 20% |
| 🐳 Whale | 2M | 1.60× | 12% | 25% |

---

## 5. Referral program (cash rebate + points)

Hyperliquid-style, tier-scaled, with qualifiers to stop rebate farming.

- **Unlock:** create a code after **$10,000** lifetime volume.
- **Referrer reward:** **10% → 25%** of invitee fees (scales with referrer tier), paid in cash/credit.
- **Invitee discount:** **4%** fee discount; auto-applied to organic users via the **default house code** (house share routes to treasury).
- **Caps:** rebate on invitee’s first **$1B** volume; discount on first **$25M**.
- **Anti-farm qualifiers (new):** rebate **accrues only after the invitee pays ≥ $50 in real fees** and is **held in pending for 7 days** before it’s claimable; rebates are **clawed back** on detected wash/self-referral. Binding is set on the invitee’s first login and is permanent.

**Top rebate (25%) is deliberately bounded** by the fee waterfall in §6 — it only applies to the highest tiers and is validated to keep protocol net take-rate positive.

**Referral points vs cash rebate stay separate:** points (5% of score, decays if invitees go inactive) vs revenue share (cash ledger).

---

## 6. Fee economics / waterfall (new)

A referred taker trade at base **taker 0.05% / maker −0.02%** distributes as:

```
taker fee (0.050%)
  − maker rebate paid to MM         (0.020%)
  − invitee discount (4% of fee)    (0.002%)
  − referrer rebate (≤25% of fee)   (≤0.0125%)
  = protocol net take-rate          (≥ ~0.0035% in the worst case)  → must stay > 0
```
- The model **must be validated per market** (maker/taker schedules differ) so net take-rate is positive even at the top rebate tier; if not, cap the rebate tier or the maker rebate.
- Fee split also funds: **insurance fund top-ups** and the **reward pool** is *separate* (token, not fees). Admin “Fee Accounts” surfaces cumulative → insurance / → referrers.

---

## 7. Market-maker track (separate, 25% of pool)
Judged on book quality, not volume: Maker Volume 30 · Orderbook Depth 25 · Spread Quality 20 · Uptime & Coverage 15 · Volatility-Time Support 5 · Risk-Balancing Liquidity 5.

---

## 8. Anti-farming & integrity

**Detected/penalized:** self-trading, wash trading, circular trading, referral loops, same-funding-source sybil clusters, artificial loss farming, very short OI farming, quote stuffing, far-from-mid orders.
**Added in v2:**
- **Delta-neutral / paired-position farming** — offsetting long+short across related accounts (or perp + external hedge) to harvest fee+OI+loss points at ~zero risk → detected via correlated paired positions and netted out via `quality_factor`.
- **Sybil clusters scored as one identity** before normalization (§4.2).
- **Appeals process:** flagged users are notified and may appeal within a window before exclusion is finalized (reduces false-positive backlash).

**Public wording:** *“Hudi Points reward genuine trading, liquidity contribution, and long-term market participation. Points generated through self-trading, wash trading, artificial loss farming, sybil activity, abusive referrals, or other manipulation may be adjusted or excluded.”*

---

## 9. Data integrity & dependencies (new)
Points are only as correct as their inputs:
- **Marks/oracle:** realized PnL, OI valuation and liquidation all depend on mark prices. QA found **stale marks (H-30/H-42)** — points must read from a reconciled, freshness-checked price, and an epoch is **not finalized** until price data passes integrity checks.
- **Funding:** QA found **funding null/stuck platform-wide (H-35)**. Decision: **funding PnL is included in “realized PnL”** for the points component — therefore funding must settle correctly first, or this component is biased. Until funding is reliable, this sub-input is **frozen/zero-weighted**.
- **Snapshotting:** component metrics are snapshotted per epoch from the reconciled ledger, not live UI values.

---

## 10. Seasons, sustainability & conversion (expanded)
- **Season 1 — Genesis:** ~12 epochs (≈ weekly). Pool = fixed slice of $HUDI supply (placeholder 8%); split **Retail 70 / MM 25 / Strategic 5**.
- **Emission curve:** **front-loaded but tapering** (e.g. larger epoch pools early to seed cold-start liquidity, declining ~linearly) — published in advance so users can reason about share.
- **Anti-mercenary / retention (new):**
  - Converted rewards **vest** (e.g. cliff + linear) rather than fully liquid at TGE.
  - A **post-season reserve** (slice of pool) is paid only to wallets that keep trading after the snapshot — directly fights the post-airdrop volume cliff.
- **Conversion:** Season points represent a claim on the Season pool at season end; final conversion/eligibility/timing **subject to review** and anti-farming checks.

---

## 11. Compliance & eligibility (new)
- Hudi is **not available to US persons** (live geo banner). The points→token conversion has **securities / sanctions / geo** implications.
- **Claim is geo-gated and sanctions-screened**; ineligible regions can earn nothing or cannot claim (decision required with legal).
- “Subject to review” is **not** a substitute for a compliance workstream — legal sign-off is a launch blocker for the conversion, not for earning display.

---

## 12. Appeals & dispute (new)
- Flagged accounts receive a notice with the signal category and a **window to appeal** before points are excluded.
- A logged review decision (clear / exclude / restore) is kept for auditability (admin “Points & Referrals → review queue”).

---

## 13. Governance & change management (new)
- Weights, multipliers and market multipliers are **frozen within an epoch**.
- Any parameter change is **announced in advance and applies from the next epoch — never retroactively**. (The admin console should enforce/flag “effective next epoch”.)
- Material changes (pool size, conversion ratio) require a documented approval (multi-sig / governance).

---

## 14. Prototype scope (this repo)
Front-end only, English, mock data. Public: Dashboard `/`, Referrals `/referrals`, Leaderboard `/leaderboard`, How-it-works `/how-it-works`. Admin `/admin`: dashboard, **points & referral ops**, markets, **sessions/calendar**, **funding**, **risk & breakers**, **market makers**, users, liquidations, withdrawals, wallets, insurance, fees, emergency, audit, admins. Dark “season campaign” theme.
**Out of scope:** real auth, live data, claim flow, MM portal.

---

## 15. Success & guardrail metrics
**Success:** % volume on Asian-equity perps · net-OI imbalance reduction · share of fees from referred users · referrer retention · D30 retention of points-earning traders.
**Guardrails / anti-goals (new):** % volume flagged as wash/sybil (target ↓) · Gini of points distribution (avoid extreme concentration) · cost-per-retained-user · protocol **net take-rate > 0** after rebates · loss-component share of total points (must stay small).

---

## 16. Open questions
1. Final pool size & $HUDI % per season; emission taper shape.
2. Exact caps: loss-points vs fee ratio; OI cap vs fees; `k` value.
3. Vesting schedule & post-season reserve size.
4. Referral payout asset (credit vs stable vs points-boost) and whether 25% top tier survives the §6 waterfall on every market.
5. KYC/geo threshold for claim.
6. Index perps (HSI/NKY/KOSPI) in Season 1 or later.
7. Is `k`/normalization published (trust) or kept opaque (anti-farm)? — recommend publish weights, keep anti-farm scoring opaque.
