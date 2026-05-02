# Garage Warrior OS — Project Board
**Repo:** `garage-warrior-os` (to be created)
**Board Type:** GitHub Projects (beta) — Kanban + Roadmap view
**Date:** 2026-05-02

---

## Board Columns

| Column | Purpose |
|---|---|
| **📥 Backlog** | Unprioritized ideas, user requests, future epics |
| **📋 Ready** | Groomed, estimated, ready for pickup |
| **🚧 In Progress** | Active development (WIP limit: 3 per person) |
| **👀 In Review** | PR open, awaiting review |
| **🧪 In Beta** | Merged, deployed to beta environment |
| **✅ Done** | Live in production, validated |
| **🧊 Icebox** | Deferred, not rejected |

---

## Milestones (GitHub Milestones)

| Milestone | Target Date | Description |
|---|---|---|
| **M0: Foundation** | 2026-05-16 | Auth, project CRUD, basic PWA shell |
| **M1: Core Tracking** | 2026-05-30 | Photos, parts, costs, offline sync |
| **M2: Intelligence** | 2026-06-13 | AI valuation v1, profit calculator, shareable cards |
| **M3: Polish** | 2026-06-27 | PDF export, notifications, UX refinement |
| **M4: Beta** | 2026-07-04 | Closed beta, feedback loop |
| **M5: Launch** | 2026-07-11 | Public launch, Warrior tier live |

---

## Epic Issues

### Epic 1: Project Management Core
**Label:** `epic`, `core`, `p0`
**Milestone:** M0: Foundation
**Issues:**
- [ ] `#1` FR-1.1: Project Creation (vehicle types, status workflow, acquisition capture)
- [ ] `#2` FR-1.2: Project Dashboard (card/list view, filters, sort, quick actions)
- [ ] `#3` FR-1.3: Project Detail View (tabs, overview stats, inline editing)

### Epic 2: Disassembly Documentation
**Label:** `epic`, `documentation`, `p0`
**Milestone:** M1: Core Tracking
**Issues:**
- [ ] `#4` FR-2.1: Photo Step Capture (camera/gallery, timestamp, note, reorder)
- [ ] `#5` FR-2.2: Reverse Step Generation (AI reverse order, user edit, checklist export)
- [ ] `#6` FR-2.3: Before/After Timeline (auto-generated, social card, PDF)

### Epic 3: Parts & Inventory
**Label:** `epic`, `inventory`, `p0`
**Milestone:** M1: Core Tracking
**Issues:**
- [ ] `#7` FR-3.1: Part Entry (manual + AI receipt extraction, status tracking)
- [ ] `#8` FR-3.2: Parts Dashboard (cross-project view, vendor grouping, cost rollup)
- [ ] `#9` FR-3.3: Spare Parts Inventory (garage inventory, search, quick-assign)

### Epic 4: Cost & Profit Tracking
**Label:** `epic`, `finance`, `p0`
**Milestone:** M1: Core Tracking
**Issues:**
- [ ] `#10` FR-4.1: Cost Tracking (auto from parts, labor, additional categories)
- [ ] `#11` FR-4.2: Profit/Loss Calculator (investment vs. estimate vs. actual)
- [ ] `#12` FR-4.3: Project Portfolio View (overall performance, charts, averages)

### Epic 5: AI Valuation
**Label:** `epic`, `ai`, `p1`
**Milestone:** M2: Intelligence
**Issues:**
- [ ] `#13` FR-5.1: AI Value Estimate (marketplace comps, range, confidence, dynamic update)
- [ ] `#14` FR-5.2: "Should I Buy?" Pre-Flip Valuation (listing URL/photos, repair estimate, go/no-go)

### Epic 6: Offline-First PWA
**Label:** `epic`, `pwa`, `p0`
**Milestone:** M0: Foundation (infra) + M1: Core Tracking (features)
**Issues:**
- [ ] `#15` FR-6.1: Offline Project Management (IndexedDB, sync queue, conflict resolution)
- [ ] `#16` FR-6.2: Cross-Device Sync (cloud sync, same account, sync status)
- [ ] `#17` FR-6.3: PWA Install & Notifications (A2HS, push notifications, share target)

### Epic 7: Sharing & Export
**Label:** `epic`, `sharing`, `p1`
**Milestone:** M2: Intelligence
**Issues:**
- [ ] `#18` FR-7.1: Shareable Build Card (auto-generated, watermark, PNG export, social share)
- [ ] `#19` FR-7.2: PDF Build Report (multi-page, professional layout, buyer handover)
- [ ] `#20` FR-7.3: Marketplace Listing Helper (auto-description, photo select, clipboard export)

### Epic 8: User System & Tiers
**Label:** `epic`, `auth`, `billing`, `p0`
**Milestone:** M0: Foundation
**Issues:**
- [ ] `#21` FR-8.1: Authentication (email/password, Google OAuth, Apple Sign-In, anonymous)
- [ ] `#22` FR-8.2: Free Tier (2 active projects, basic features, watermark)
- [ ] `#23` FR-8.3: Warrior Tier ($9.99/mo — unlimited, AI, PDF, no watermark)
- [ ] `#24` FR-8.4: Pro Tier ($19.99/mo — team, unlimited AI, parts DB, priority support)

---

## Non-Epic Issues (Infrastructure & Ops)

- [ ] `#25` Setup: Repo, CI/CD, Vercel project, staging environment
- [ ] `#26` Setup: Database schema + migrations (Prisma + PostgreSQL)
- [ ] `#27` Setup: Image storage pipeline (R2 + compression + CDN)
- [ ] `#28` Setup: Stripe billing integration (checkout, webhooks, portal)
- [ ] `#29` Setup: AI API integration (OpenAI/Claude, rate limiting, cost monitoring)
- [ ] `#30` Setup: PWA manifest, service worker, offline shell
- [ ] `#31` Design: UI kit + component library (mobile-first, touch-friendly, high contrast)
- [ ] `#32` SEO: Landing page + meta setup + Google Search Console
- [ ] `#33` Analytics: PostHog or Plausible setup (funnel tracking, feature usage)
- [ ] `#34` Legal: Privacy policy, ToS, affiliate disclosure
- [ ] `#35` Ops: Error monitoring (Sentry), uptime monitoring

---

## Icebox (Deferred)

- Native iOS/Android apps (evaluate PWA performance first)
- Video documentation (beyond photos)
- OBD2 integration (car-focused feature)
- Marketplace API integration (Facebook, eBay direct posting)
- Community feed / build social network
- Parts database with compatibility lookup
- Shop-in-a-Box B2B tier (invoicing, quotes, client management)
- Multi-currency support
- Dark mode (high contrast is MVP priority)

---

## Sprint Structure (Post-Launch)

| Sprint | Duration | Focus |
|---|---|---|
| Sprint 0 | 2 weeks | Foundation: auth, project CRUD, PWA shell |
| Sprint 1 | 2 weeks | Core tracking: photos, parts, costs, offline |
| Sprint 2 | 2 weeks | Intelligence: AI valuation, profit calc, sharing |
| Sprint 3 | 2 weeks | Polish: PDF, notifications, UX, beta prep |
| Sprint 4 | 1 week | Beta: closed beta, bug fixes, feedback |
| Sprint 5 | 1 week | Launch: public release, marketing, monitoring |

---

## Labels

| Label | Color | Use |
|---|---|---|
| `epic` | #0052CC | Epic-level issues |
| `p0` | #B60205 | Must have for MVP |
| `p1` | #D93F0B | Should have for MVP |
| `p2` | #FBCA04 | Nice to have, defer |
| `core` | #0E8A16 | Core product features |
| `ai` | #5319E7 | AI/ML features |
| `pwa` | #1D76DB | PWA/offline features |
| `finance` | #006B75 | Cost/profit/billing |
| `design` | #FF7619 | UI/UX work |
| `infrastructure` | #666666 | DevOps, setup, tooling |
| `bug` | #EE0701 | Bugs |
| `research` | #C5DEF5 | Market/competitive research |

---

## How to Import to GitHub Projects

1. Create repo `garage-warrior-os`
2. Create GitHub Project (beta) linked to repo
3. Add custom fields: `Priority`, `Milestone`, `Epic`
4. Create milestones M0–M5
5. Bulk-create issues from this list (can use GitHub CLI or API)
6. Set up automated workflows:
   - PR merged → move to "In Beta"
   - Issue closed → move to "Done"
   - Label `blocked` → move to "Icebox"

---

*Generated by Command / OpenClaw — 2026-05-02*
