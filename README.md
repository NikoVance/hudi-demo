# Hudi Points & Referrals — Prototype

Front-end **prototype** (display only) for Hudi’s points & referral (fee-rebate) system, plus the product spec in [`PRD.md`](./PRD.md).

> Illustrative mock data only · no wallet, no back-end, no real balances · points subject to review.

## Stack
- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 (CSS-first theme)
- Deployed on Vercel · all pages statically prerendered

## Screens
| Route | Page |
|---|---|
| `/` | Dashboard — your points, breakdown, tiers, ways to earn |
| `/referrals` | Referrals — code, share, rebate tiers, invitees, ledger |
| `/leaderboard` | Leaderboard — pool split, podium, traders / MMs / friends |
| `/how-it-works` | The model — formula, weighting, multipliers, anti-farming, FAQ |

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the build
```

## Structure
```
app/                 routes + globals.css (dark-neon theme)
components/          nav, footer, ui primitives (Sparkline, Donut), tabs, copy
lib/data.ts          all mock data + types + helpers
PRD.md               product requirements (re-optimized design)
```

## Design direction
Dark “season campaign” theme — near-black canvas, neon-green primary with glow, monospace numerics, magenta/blue/gold accents. Recognizably Hudi, tuned for an airdrop/season-campaign feel.
