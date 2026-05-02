# Garage Warrior OS / WrenchTrack 2.0 — Product Requirements Document (PRD)
**Version:** 0.2
**Date:** 2026-05-02
**Status:** DRAFT
**Author:** Command / OpenClaw
**Depends on:** `brd.md`, `business-model.md`, `market-brief.md`
**Context:** Evolution of existing WrenchTrack.app product

---

## 1. Product Vision

> **WrenchTrack evolved:** The project-management operating system for the garage warrior. Born from WrenchTrack — now profit-aware, AI-powered, and free from app store gatekeeping.

### Origin Story
WrenchTrack.app was built by larrylegendrr as a free iOS/Android app for tracking automotive and small engine projects. It proved the core concept: garage warriors need project tracking. But it hit two walls:
1. **Acquire.com blocked it** — pre-revenue, no monetization story
2. **App store review jammed it** — in-app subscriptions not filed

**The solution:** Rebuild as a PWA. No app stores. No review hell. No 30% tax. Own the distribution. Layer profit tracking and AI on top of the proven WrenchTrack foundation.

---

## 2. Target Users

### Primary: Flipper Larry
- **Profile:** 35-55, suburban, works full-time, fixes small engines / bikes in evenings for side income
- **Tech level:** Comfortable with smartphone, Facebook Marketplace, basic spreadsheets
- **Goals:** Know if he's making money, don't lose track of disassembly, sell faster with better docs
- **Pain points:** Can't remember what parts cost, forgets reassembly order, garage is chaotic, loses money on projects

### Secondary: Restorer Rick
- **Profile:** 45-65, classic motorcycle / vintage car enthusiast, long-term projects
- **Tech level:** Moderate, uses forums, takes lots of photos
- **Goals:** Document the journey, prove value at resale, stay organized across multi-month projects
- **Pain points:** Projects stall for months, forgets where he left off, no single source of truth

### Tertiary: Tinkerer Tina
- **Profile:** 25-40, maker culture, multiple concurrent small projects
- **Tech level:** High, early adopter, loves new tools
- **Goals:** Switch between projects easily, find parts quickly, share builds online
- **Pain points:** Too many half-finished projects, parts scattered everywhere, no community

---

## 3. Feature Requirements

### Epic 1: Project Management Core

#### FR-1.1: Project Creation
- **User story:** As a garage warrior, I want to create a new project so I can start tracking a new flip or restoration.
- **Acceptance criteria:**
  - Project name, vehicle type (small engine / motorcycle / ATV / car / other), make/model/year (optional)
  - Status: Acquired → In Progress → Ready for Sale → Sold → Archived
  - Buy price, date acquired, source (Marketplace, auction, scrap, etc.)
  - Photo of item "as acquired"
  - Quick-add from camera or gallery
- **Priority:** P0

#### FR-1.2: Project Dashboard
- **User story:** As a garage warrior, I want to see all my projects at a glance so I can prioritize what to work on.
- **Acceptance criteria:**
  - Card/list view toggle
  - Filter by status, vehicle type, profitability
  - Sort by last modified, urgency (stalled project alert), profit potential
  - Quick-action buttons: Add photo, Add part, Add note, Mark sold
- **Priority:** P0

#### FR-1.3: Project Detail View
- **User story:** As a garage warrior, I want to drill into a single project and see everything about it.
- **Acceptance criteria:**
  - Tabs: Overview / Timeline / Parts / Costs / Photos / Notes / Valuation
  - Overview shows: status, days in project, total cost, estimated value, projected profit/loss, labor hours
  - Editable inline
- **Priority:** P0

---

### Epic 2: Disassembly Documentation

#### FR-2.1: Photo Step Capture
- **User story:** As a garage warrior, I want to take photos during disassembly and add notes so I can remember how to reassemble.
- **Acceptance criteria:**
  - Tap to capture photo → auto-tagged with timestamp
  - Add text note per photo (voice-to-text supported)
  - Reorder photos via drag-and-drop
  - Photos auto-compressed for storage efficiency
- **Priority:** P0

#### FR-2.2: Reverse Step Generation
- **User story:** As a garage warrior, I want the app to generate reassembly instructions from my disassembly photos.
- **Acceptance criteria:**
  - AI generates reverse order of steps with part labels
  - User can edit/correct generated steps
  - Export as checklist for reassembly day
  - Print-friendly view
- **Priority:** P1 (MVP v2 — can be manual for MVP)

#### FR-2.3: Before / After Timeline
- **User story:** As a garage warrior, I want to see a visual timeline of my project's transformation.
- **Acceptance criteria:**
  - Auto-generated from photos + status changes
  - Shareable as social card (Instagram-ready)
  - PDF export option
- **Priority:** P1

---

### Epic 3: Parts & Inventory

#### FR-3.1: Part Entry
- **User story:** As a garage warrior, I want to log every part I buy for a project so I know my total investment.
- **Acceptance criteria:**
  - Manual entry: name, part number (optional), cost, vendor, date ordered, date received, photo
  - Receipt photo capture with AI extraction (part name, cost, vendor)
  - Link to online order (URL)
  - Status: Ordered → Shipped → Received → Installed
- **Priority:** P0

#### FR-3.2: Parts Dashboard
- **User story:** As a garage warrior with multiple projects, I want to see all my pending parts orders in one place.
- **Acceptance criteria:**
  - Cross-project parts view: ordered, shipped, received
  - Vendor grouping
  - Cost rollup by project and by time period
- **Priority:** P1

#### FR-3.3: Spare Parts Inventory
- **User story:** As a garage warrior, I want to track parts I have left over from other projects that I might reuse.
- **Acceptance criteria:**
  - "Garage inventory" — parts not assigned to a project
  - Search/filter by name, part number, vehicle type
  - Quick-assign to a project
- **Priority:** P2

---

### Epic 4: Cost & Profit Tracking

#### FR-4.1: Cost Tracking
- **User story:** As a garage warrior, I want to see exactly how much I've spent on a project.
- **Acceptance criteria:**
  - Automatic from parts + labor hours × hourly rate (user-defined)
  - Additional cost categories: tools, supplies, transport, storage
  - Running total always visible on project card
- **Priority:** P0

#### FR-4.2: Profit / Loss Calculator
- **User story:** As a garage warrior, I want to know if I'm going to make money before I finish.
- **Acceptance criteria:**
  - Buy price + all costs = total investment
  - Estimated sell price (from AI valuation or user input)
  - Projected profit/loss with % margin
  - Actual sell price entry when sold
  - Final P&L summary
- **Priority:** P0

#### FR-4.3: Project Portfolio View
- **User story:** As a side-hustle operator, I want to see my overall garage business performance.
- **Acceptance criteria:**
  - Total projects completed, in progress, acquired
  - Total revenue, total costs, net profit
  - Average profit per project by vehicle type
  - Monthly/weekly performance charts
- **Priority:** P1

---

### Epic 5: AI Valuation

#### FR-5.1: AI Value Estimate
- **User story:** As a garage warrior, I want to know what my project is worth before and after repair.
- **Acceptance criteria:**
  - Input: project details + photos + current status
  - AI queries marketplace comps (eBay sold, Facebook Marketplace, Craigslist)
  - Returns: estimated range (low/mid/high) + confidence level
  - Updates dynamically as project progresses
  - User can override AI estimate
- **Priority:** P1 (MVP: basic LLM estimate without scraping; post-launch: scraping)

#### FR-5.2: "Should I Buy?" Pre-Flip Valuation
- **User story:** As a garage warrior, I want to evaluate a potential flip before I buy it.
- **Acceptance criteria:**
  - Quick valuation from marketplace listing URL or photos
  - Estimated repair cost range
  - Estimated sell price
  - Projected profit margin
  - Go / No-Go recommendation
- **Priority:** P2

---

### Epic 6: Offline-First PWA

#### FR-6.1: Offline Project Management
- **User story:** As a garage warrior, I want to use the app in my garage where WiFi is spotty.
- **Acceptance criteria:**
  - All CRUD operations work offline (create, read, update, delete)
  - Photos queued for upload when connectivity returns
  - Sync indicator showing pending changes
  - Conflict resolution for simultaneous edits (last-write-wins acceptable for MVP)
- **Priority:** P0

#### FR-6.2: Cross-Device Sync
- **User story:** As a garage warrior, I want to start on my phone in the garage and finish on my tablet at the kitchen table.
- **Acceptance criteria:**
  - Automatic cloud sync when online
  - Same account across all devices
  - Sync status visible
- **Priority:** P0

#### FR-6.3: PWA Install & Notifications
- **User story:** As a garage warrior, I want the app to feel like a real app on my phone.
- **Acceptance criteria:**
  - Add to home screen prompt
  - Push notifications: project reminders, stalled project alerts, parts arrival
  - Share target: receive photos from camera app directly into project
- **Priority:** P1

---

### Epic 7: Sharing & Export

#### FR-7.1: Shareable Build Card
- **User story:** As a garage warrior, I want to share my build on Instagram/forums with a slick graphic.
- **Acceptance criteria:**
  - Auto-generated card: before/after photos, total cost, hours, profit
  - Brandable with Garage Warrior OS watermark (removable on paid tier)
  - Download as PNG
  - Direct share to Instagram, Facebook, Reddit
- **Priority:** P1

#### FR-7.2: PDF Build Report
- **User story:** As a garage warrior selling a project, I want a professional document proving the work done.
- **Acceptance criteria:**
  - Multi-page PDF: project summary, photo timeline, parts list, costs, valuation
  - Professional layout suitable for buyer handover
  - Digital or printable
- **Priority:** P1

#### FR-7.3: Marketplace Listing Helper
- **User story:** As a garage warrior, I want to quickly list my finished project for sale.
- **Acceptance criteria:**
  - Auto-generate listing description from project data
  - Select best photos from timeline
  - Export to clipboard for Facebook Marketplace / eBay / Craigslist
  - (Future: direct API posting)
- **Priority:** P2

---

### Epic 8: User System & Tiers

#### FR-8.1: Authentication
- **User story:** As a user, I want to sign up quickly.
- **Acceptance criteria:**
  - Email + password
  - Google OAuth
  - Apple Sign-In (for iOS users)
  - Anonymous mode (local-only, optional account later)
- **Priority:** P0

#### FR-8.2: Free Tier
- **User story:** As a new user, I want to try the app without paying.
- **Acceptance criteria:**
  - 2 active projects
  - Unlimited archived projects
  - Basic photo tracking, parts, costs
  - Community access
  - Build cards with watermark
- **Priority:** P0

#### FR-8.3: Warrior Tier ($9.99/mo or $79/yr)
- **User story:** As a committed garage warrior, I want unlimited everything.
- **Acceptance criteria:**
  - Unlimited active projects
  - AI valuations (10/month)
  - Profit tracking + portfolio view
  - PDF exports
  - Cloud backup
  - No watermark on build cards
- **Priority:** P0

#### FR-8.4: Pro Tier ($19.99/mo or $149/yr)
- **User story:** As a power user or small shop, I want advanced features.
- **Acceptance criteria:**
  - Everything in Warrior
  - Unlimited AI valuations
  - Team/multi-garage (up to 3 users)
  - Parts database lookups
  - Priority support
  - Marketplace listing booster (future)
- **Priority:** P2

---

## 4. Non-Functional Requirements

### Performance
- App loads in < 3s on 4G
- Photo capture → saved locally in < 1s
- Sync completes in < 5s for typical project (50 photos, 20 parts)

### Reliability
- 99.9% uptime for sync backend
- Offline mode must not lose data even if app is force-quit
- Automatic retry for failed uploads (exponential backoff)

### Security
- All data encrypted in transit (TLS 1.3) and at rest
- User photos are private by default
- No PII shared with AI APIs (anonymized valuation requests)

### Accessibility
- Touch targets ≥ 44×44px (gloves-friendly)
- High contrast mode for garage lighting
- Voice input for notes (hands are greasy)

### Scalability
- Support 10K users on MVP infra without re-architecture
- Photo storage designed for 100K users (lifecycle policies, compression)

---

## 5. User Flows

### Flow 1: New Flip (Happy Path)
1. User sees broken generator on Facebook Marketplace
2. Opens Garage Warrior OS → "New Project"
3. Selects "Small Engine" → uploads Marketplace photos
4. Enters buy price ($25), source (Facebook Marketplace)
5. AI generates pre-flip valuation: "Fixed value $120–150"
6. User buys the generator
7. Starts disassembly → captures 12 photos with notes
8. Orders parts → logs $35 in carburetor + gaskets
9. Finishes rebuild → marks "Ready for Sale"
10. AI updated valuation: $140
11. User generates build card → shares on Facebook Marketplace
12. Sells for $135 → logs sell price
13. Final P&L: $135 - $25 - $35 = $75 profit (2.5 hours labor)

### Flow 2: Pick Up Stalled Project
1. User hasn't touched vintage Honda project in 4 months
2. Opens app → "Stalled Project" alert on dashboard
3. Taps project → Timeline tab shows last photo was "carburetor removed"
4. Reads reverse steps: "Install carburetor → Connect fuel line → ..."
5. Orders missing air filter (logs part)
6. Resumes project → status back to "In Progress"

---

## 6. Data Model (Simplified)

```
User
├── projects[]
│   ├── id, name, type, make, model, year
│   ├── status, createdAt, updatedAt
│   ├── acquisition: { price, source, date, photos[] }
│   ├── sale: { price, date, buyer, photos[] }
│   ├── timeline: { steps[] }
│   │   └── step: { order, photo, note, type: 'disassembly'|'assembly' }
│   ├── parts[]
│   │   └── part: { name, number, cost, vendor, status, photo, url }
│   ├── costs: { parts, labor, tools, supplies, transport }
│   ├── laborHours
│   ├── valuation: { aiEstimate, userEstimate, confidence, comps[] }
│   └── settings: { hourlyRate, isPublic }
└── garageInventory[]
    └── part: { name, number, cost, fromProject, photos[], tags[] }
```

---

## 7. Tech Stack Recommendations

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | Next.js 14 (App Router) + React | PWA support, SSR for SEO, Vercel hosting |
| State | Zustand + TanStack Query | Lightweight, offline-capable |
| Offline DB | Dexie.js (IndexedDB wrapper) | Proven offline-first, sync-friendly |
| Backend | Next.js API Routes / Edge Functions | Unified stack, serverless |
| Database | PostgreSQL (Neon/Supabase) + Prisma | Relational data, great free tier |
| Auth | Clerk or Supabase Auth | Quick OAuth, session management |
| Storage | Cloudflare R2 | S3-compatible, zero egress fees |
| AI | OpenAI GPT-4o / Claude 3.5 | Vision for receipt parsing, valuation reasoning |
| Hosting | Vercel + Cloudflare | Edge delivery, great PWA support |
| Payments | Stripe | Standard SaaS billing |

---

## 8. Milestones

| Milestone | Target | Deliverables |
|---|---|---|
| **M0: Foundation** | Week 2 | Auth, project CRUD, basic PWA shell |
| **M1: Core Tracking** | Week 4 | Photos, parts, costs, offline sync |
| **M2: Intelligence** | Week 6 | AI valuation v1, profit calculator, shareable cards |
| **M3: Polish** | Week 8 | PDF export, notifications, UX refinement |
| **M4: Beta** | Week 9 | Closed beta, feedback loop |
| **M5: Launch** | Week 10 | Public launch, Warrior tier live |

---

## 9. Open Questions

1. Should the first vehicle type focus be small engines (lower complexity) or motorcycles (higher engagement)?
2. Is AI valuation v1 (manual LLM prompt) sufficient for launch, or do we need marketplace scraping?
3. Should we build a "parts database" integration for MVP or defer to manual entry?
4. What's the right free tier limit — 2 projects vs. 1 project vs. time-limited?
5. Do we need native iOS/Android apps eventually, or is PWA sufficient?

---

## 10. Change Log

| Date | Version | Change |
|---|---|---|
| 2026-05-02 | 0.1 | Initial draft |

---

*Next: Project Board creation*
