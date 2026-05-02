# Garage Warrior OS — Lane Recommendation
**Date:** 2026-05-02
**Decision Owner:** larrylegendrr (pending approval)
**Status:** DRAFT

---

## The Four Lanes Evaluated

| Lane | Description | Verdict |
|---|---|---|
| **A. "Fix & Flip OS"** | Wedge into the side-hustle operator. Profit tracking, AI valuations, marketplace adjacency. | **RECOMMENDED** |
| **B. "Build Journal"** | Community-first. Instagram for garage builds. | Defer — hard to monetize, content moderation burden |
| **C. "Garage Warrior OS"** | Full vertical stack from day one. | Long-term vision, but too broad for MVP wedge |
| **D. "Shop-in-a-Box"** | Hobbyists who want to look professional. Invoicing, quotes, client tracking. | Defer — competes with established B2B players (GlobalWorkshop, Orderry) |

---

## Recommendation: Lane A → Lane C

### Phase 1: The Wedge (Fix & Flip OS)
**Duration:** MVP through first 6 months post-launch
**Positioning:** *"The only project tracker that tells you if your flip actually made money."*

**Why this lane:**
1. **No competitor owns it.** WrenchTrack is free but shallow. BuildSheet is car-only. RestoLog is generic. None track profit.
2. **ROI is demonstrable.** A user who saves one duplicate $30 part order or gains $50 in resale value from documentation justifies the $9.99/mo instantly.
3. **Word-of-mouth is organic.** Fix-and-flip communities (Facebook groups, Reddit r/smallengines, Marketplace forums) are tight-knit and trust-driven.
4. **Data moat builds naturally.** Every flip adds marketplace comps, parts costs, and labor estimates to the AI training set.
5. **Expansion paths are clear.** Fix-and-flip users naturally become restorers. Restorers naturally become community members.

### Phase 2: The Platform (Garage Warrior OS)
**Trigger:** 2,500+ paying users OR $20K MRR
**Adds:**
- Community features (build galleries, forums)
- Parts marketplace / affiliate integration
- Multi-project portfolio for serious hobbyists
- B2B "Shop Lite" tier for side hustles that grow into micro-businesses

---

## Why NOT the other lanes

### Lane B (Build Journal / Community)
- **Problem:** Community features don't differentiate from Instagram, Reddit, or existing car forums
- **Monetization:** Ads or sponsored content — low ARPU, high moderation cost
- **Timing:** Community needs critical mass first; product value can exist at n=1

### Lane D (Shop-in-a-Box)
- **Problem:** Directly competes with GlobalWorkshop (£54+/mo), Orderry, RepairShopr — all established, well-funded
- **Differentiation:** None. We'd be a worse version of existing tools
- **Customer:** Hobbyists don't need invoicing and client management

### Lane C (Full OS from Day 1)
- **Problem:** Too broad for MVP. Risk of being mediocre at everything instead of excellent at one thing
- **Execution:** Longer build time, higher burn, slower validation

---

## The Lane in One Sentence

> **"We are the profit-tracking project manager for the garage fix-and-flip side hustle — starting with small engines and motorcycles, expanding to every vehicle a garage warrior touches."**

---

## Evidence

1. Reddit r/CarRestorations: "Do any of you DIY'ers use an app you'd recommend? I've just been using Reminders and Notes on iOS, and folders full of PDFs." — **Validation that hobbyists hack together generic tools**
2. BuildSheet ($4.99/mo Pro) has proven willingness to pay for car build tracking — **Validation of monetization model**
3. WrenchTrack.app is free and feature-thin — **Validation that the space is open**
4. RestoLog ($2.99 one-time) has no recurring revenue — **Validation that one-time purchase is insufficient for sustainable product**
5. GlobalWorkshop is £54+/mo for professional shops — **Validation that B2B pricing exists but is wrong for hobbyists**
6. Side-hustle small engine repair: "decent side money and you get experience" — Reddit r/smallengines — **Validation that the flipper persona exists**

---

## Open Questions for Decision

1. **Vehicle type priority:** Small engines (simpler, faster flips) vs. motorcycles (higher engagement, bigger community)?
2. **AI valuation depth:** Basic LLM estimate for MVP, or invest in marketplace scraping pre-launch?
3. **Free tier generosity:** 2 active projects vs. 1? The more generous, the slower monetization; the less generous, the slower adoption.
4. **Launch channel:** Reddit communities first, or Facebook Groups, or TikTok/YouTube influencers?

---

## Gate Status

| Gate | Status | Evidence |
|---|---|---|
| Market opportunity validated | ✅ GO | No direct competitor for fix-and-flip profit tracking |
| Competitive gap identified | ✅ GO | WrenchTrack free but thin; BuildSheet car-only; RestoLog generic |
| Monetization model defined | ✅ GO | Freemium SaaS with clear ROI justification |
| Tech stack feasible | ✅ GO | PWA + Next.js + PostgreSQL + OpenAI — all proven |
| User validation | ⏳ HOLD | Need 5-10 interviews with garage warriors |
| Funding / team confirmed | ⏳ HOLD | Bootstrapped MVP assumed; team TBD |

**Overall Recommendation: GO — with user validation sprint as the next gate before MVP build.**

---

*Decision required from: larrylegendrr*
