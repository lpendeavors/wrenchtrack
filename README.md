# WrenchTrack

> The project-management operating system for the garage warrior. Track every bolt, every dollar, and every flip — all from your phone, even offline, in the grease and the grit.

---

## 🔄 The Story

**WrenchTrack** was originally built in Flutter as a native iOS/Android app but never publicly launched — jammed in app store review over subscription filing. Rather than fight the gatekeepers, we're rebuilding it properly:

- ✅ **PWA** — no app store review hell, no 30% tax, instant updates
- ✅ **Profit-aware** — the only tracker that tells you if your flip made money
- ✅ **AI-powered** — valuations, receipt scanning, reverse-step generation
- ✅ **Offline-first** — works in the garage where WiFi is spotty

**This is WrenchTrack done right.**

---

## 📁 Repository Structure

```
garage-warrior-os/
├── research/
│   └── market-brief.md          ← Competitive landscape, market size, personas
├── strategy/
│   ├── pwa-migration.md         ← WrenchTrack → PWA migration strategy
│   ├── lane-recommendation.md   ← Recommended go-to-market lane (GO/HOLD verdict)
│   ├── business-model.md        ← Business Model Canvas + unit economics
│   ├── brd.md                   ← Business Requirements Document
│   ├── prd.md                   ← Product Requirements Document (full feature specs)
│   └── project-board.md         ← GitHub Projects board structure + issues
├── web/                          ← Next.js PWA application
│   ├── src/
│   │   ├── app/                 ← Next.js App Router pages
│   │   │   ├── page.tsx         ← Landing page
│   │   │   ├── layout.tsx       ← Root layout with Clerk provider
│   │   │   ├── globals.css      ← Tailwind + custom styles
│   │   │   ├── sign-in/         ← Clerk sign-in
│   │   │   ├── sign-up/         ← Clerk sign-up
│   │   │   └── dashboard/       ← Main app
│   │   │       ├── page.tsx     ← Project dashboard
│   │   │       ├── new/         ← New project form
│   │   │       └── projects/
│   │   │           └── [localId]/
│   │   │               └── page.tsx  ← Project detail (tabs)
│   │   ├── components/
│   │   │   ├── ui/              ← shadcn/ui components
│   │   │   │   └── button.tsx
│   │   │   └── offline-indicator.tsx
│   │   ├── lib/
│   │   │   ├── utils.ts         ← cn() + format helpers
│   │   │   └── db.ts            ← Dexie offline-first database
│   │   └── middleware.ts        ← Clerk auth middleware
│   ├── prisma/
│   │   └── schema.prisma        ← PostgreSQL schema
│   ├── public/
│   │   └── manifest.json          ← PWA manifest
│   ├── package.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   └── .env.example
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (local or Neon/Supabase)
- Clerk account (free tier)
- Stripe account (for billing)

### Installation

```bash
cd web
npm install
```

### Environment Setup

```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

### Database

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

---

## 🛣️ The Lane: Fix & Flip OS → Garage Warrior OS

**Phase 1 (Wedge):** "The only project tracker that tells you if your flip actually made money."
- Target: Side-hustle fix-and-flip operators
- Key differentiator: Profit tracking + AI valuations
- Pricing: Free → $9.99/mo Warrior → $19.99/mo Pro

**Phase 2 (Platform):** Full Garage Warrior OS with community, marketplace, and B2B expansion.
- Trigger: 2,500+ paying users or $20K MRR

---

## 📊 Market Size

| Layer | Metric |
|---|---|
| TAM | ~8.6M registered motorcycles (US) + 8%+ of US households |
| SAM | US motorcycle & bike parts market: $6.8B (2024) |
| SOM | 300K–800K active fix-and-flip operators |

---

## 🏗️ Architecture

| Layer | Tech |
|---|---|
| Frontend | Next.js 14 + React (PWA via next-pwa) |
| Offline DB | Dexie.js (IndexedDB) |
| Backend | Next.js API Routes / Edge Functions |
| Database | PostgreSQL (Neon/Supabase) + Prisma |
| Auth | Clerk |
| Storage | Cloudflare R2 |
| AI | OpenAI GPT-4o / Claude 3.5 |
| Payments | Stripe |
| Hosting | Vercel + Cloudflare |

---

## 📋 Status

| Document | Status |
|---|---|
| Market Research Brief | ✅ Complete |
| PWA Migration Strategy | ✅ Complete |
| Lane Recommendation | ✅ Complete — **GO** |
| Business Model Canvas | ✅ Complete |
| BRD | ✅ Complete |
| PRD | ✅ Complete |
| Project Board | ✅ Complete (ready for GitHub import) |
| **MVP Codebase** | ✅ **Started — Next.js PWA scaffold** |

---

## 🚦 Next Gates

| Gate | Status | Blocker |
|---|---|---|
| Brand decision | ✅ | WrenchTrack |
| Tech stack | ✅ | Next.js + PWA |
| MVP scaffold | ✅ | Code started |
| Clerk setup | ⏳ | Need publishable key |
| Database setup | ⏳ | Need DATABASE_URL |
| AI integration | ⏳ | Need OpenAI key |
| Stripe billing | ⏳ | Need Stripe keys |
| PWA icons | ⏳ | Need design assets |

---

## 🚀 Next Steps

1. ✅ **MVP scaffold** — Next.js + PWA + offline DB + Clerk auth
2. ⏳ **Install dependencies** and verify build
3. ⏳ **Add real auth** (Clerk keys)
4. ⏳ **Photo capture** (camera API + gallery)
5. ⏳ **AI valuation** (OpenAI integration)
6. ⏳ **Stripe billing** (subscription tiers)
7. ⏳ **Deploy to Vercel** (staging)

---

*Generated by Command / OpenClaw — 2026-05-02*
