# WrenchTrack → PWA Migration Strategy
**Date:** 2026-05-02
**Status:** DRAFT
**Owner:** larrylegendrr + OpenClaw

---

## 1. Why PWA?

### The Problems WrenchTrack Hit

| Problem | Impact | PWA Solution |
|---|---|---|
| **App store review blocking** | Can't ship updates, can't add subscriptions | Web app — no review process |
| **In-app subscription filing** | Required legal entity, tax forms, banking setup | Stripe checkout — web-native |
| **30% Apple/Google tax** | $3 of every $10 goes to platform | Keep 100% of revenue |
| **Cross-platform duplication** | Two codebases (Swift + Kotlin) | One codebase (React/Next.js) |
| **Distribution friction** | Users must go to app store, search, install | URL → add to home screen |
| **Update lag** | 1-7 day review cycle | Instant deploy |

### What WrenchTrack Already Proves
- ✅ Users want project tracking for garage builds
- ✅ Small engine + motorcycle focus resonates
- ✅ Photo documentation is core to the workflow
- ✅ Parts inventory is a must-have
- ✅ Mobile-first is non-negotiable

**We're not starting from zero.** We're porting the proven WrenchTrack concepts to a better distribution model and layering monetization + AI.

---

## 2. Migration Options

### Option A: Full Rewrite (Recommended)
**Approach:** Build new PWA from scratch, referencing WrenchTrack UX patterns
**Pros:**
- Clean architecture from day one (offline-first, sync, AI hooks)
- Modern stack (Next.js 14, React Server Components, Edge)
- No legacy Swift/Kotlin debt
- PWA-native design (not ported from native)

**Cons:**
- Longer initial build (but faster iteration long-term)
- Existing users need to migrate (can offer import tool)

**Timeline:** 8-10 weeks for MVP

---

### Option B: Hybrid Wrapper
**Approach:** Keep native apps, wrap a web view for new features
**Pros:**
- Existing users stay on native app
- Gradual migration

**Cons:**
- Still have app store review for native shell
- Two codebases (native + web)
- PWA features (offline, background sync) are limited in web view
- Doesn't solve the core gatekeeping problem

**Verdict:** ❌ Doesn't solve the actual problem

---

### Option C: Capacitor / React Native
**Approach:** Use Capacitor to wrap web app as quasi-native
**Pros:**
- One codebase, quasi-native feel
- App store presence

**Cons:**
- Still have app store review
- Still have 30% tax
- PWA superpowers (instant updates, URL sharing) are lost

**Verdict:** ❌ Compromise that keeps the problems

---

## 3. Recommended Path: Option A (Full PWA Rewrite)

### What We Keep from WrenchTrack
1. **UX patterns** — project creation, photo capture, parts entry, timeline
2. **User feedback** — what worked, what didn't, feature requests
3. **Brand equity** — WrenchTrack name or Garage Warrior OS rebrand?
4. **Audience insights** — who used it, what they built

### What We Add (The WrenchTrack → OS Upgrade)

| WrenchTrack v1 | WrenchTrack OS v2 |
|---|---|
| Free only | Freemium (Free / Warrior $9.99 / Pro $19.99) |
| Basic cost tracking | **Profit/loss calculator with ROI** |
| Parts inventory | **AI receipt scanning + auto-extraction** |
| Photo log | **AI reverse-step generation from photos** |
| Manual status | **AI valuation (marketplace comps)** |
| Native iOS/Android | **PWA (all platforms, offline-first)** |
| Local storage only | **Cloud sync + cross-device** |
| No sharing | **Shareable build cards + PDF exports** |
| No marketplace | **Listing helper (auto-description)** |

---

## 4. Brand Decision

**DECIDED: Keep "WrenchTrack"**

- ✅ Domain already owned
- ✅ No existing public users to confuse (v1 never launched)
- ✅ Clean slate to build the brand right from the first public release
- Product will be **"WrenchTrack"** — simple, clean, the OS positioning comes from the product itself

**Note:** v1 was Flutter, never publicly released. No user migration needed. Clean build.

---

## 5. Technical Migration Plan

### Phase 1: Foundation (Weeks 1-2)
- [ ] PWA shell: Next.js 14 + Workbox service worker
- [ ] Auth: Clerk (email + Google + Apple OAuth)
- [ ] Database: PostgreSQL (Supabase/Neon) + Prisma schema
- [ ] Offline-first: Dexie.js (IndexedDB) with sync layer
- [ ] Image pipeline: Cloudflare R2 + compression
- [ ] Basic project CRUD (matches WrenchTrack v1 features)

### Phase 2: Core Features (Weeks 3-4)
- [ ] Photo capture + gallery (camera API + file picker)
- [ ] Parts entry + inventory
- [ ] Cost tracking + labor hours
- [ ] Project timeline / status workflow
- [ ] Cloud sync (offline → online reconciliation)

### Phase 3: Intelligence (Weeks 5-6)
- [ ] AI receipt scanning (GPT-4 Vision)
- [ ] AI valuation v1 (manual prompt, no scraping yet)
- [ ] Profit/loss calculator
- [ ] Portfolio dashboard

### Phase 4: Polish + Monetization (Weeks 7-8)
- [ ] Stripe billing (Free / Warrior / Pro tiers)
- [ ] PDF export
- [ ] Shareable build cards
- [ ] PWA install prompts + push notifications

### Phase 5: Beta + Launch (Weeks 9-10)
- [ ] Closed beta (invite WrenchTrack v1 users?)
- [ ] Bug fixes, UX refinement
- [ ] Public launch

---

## 6. User Migration Strategy

### WrenchTrack v1 Users
| Approach | Details |
|---|---|
| **Email announcement** | "WrenchTrack is evolving — here's what's new" |
| **Data import tool** | Export from v1 → import to OS (manual or automated) |
| **Grandfather offer** | Existing users get Warrior tier free for 3 months |
| **Sunset v1** | Keep v1 running but don't update; nudge to OS |

### New Users
| Channel | Tactic |
|---|---|
| Reddit | r/smallengines, r/motorcycles, r/CarRestorations |
| Facebook Groups | Garage warrior communities, fix-and-flip groups |
| TikTok/YouTube | Influencer partnerships with garage channels |
| SEO | "how to track motorcycle restoration", "small engine flip tracker" |
| WrenchTrack.app redirect | Keep domain, redirect to PWA |

---

## 7. Revenue Model: From $0 to SaaS

| Milestone | Revenue Target | What Unlocks |
|---|---|---|
| Month 1 | $0 | Free tier only, gather feedback |
| Month 2-3 | $500/mo | Warrior tier live, early adopters |
| Month 4-6 | $2K-5K/mo | Organic growth, shareable cards driving viral |
| Month 7-12 | $10K-20K/mo | AI features mature, word-of-mouth |
| Year 2 | $50K+/mo | Marketplace integrations, B2B tier |

---

## 8. Risk: What If WrenchTrack Competitors Notice?

**Good news:** You're the incumbent. You built WrenchTrack. Anyone entering now is competing with:
1. Your existing user base (however small, they know the brand)
2. Your proven UX patterns
3. Your understanding of the garage warrior pain points
4. Your head start on the PWA + AI stack

**The real risk is moving too slowly.** The app store jam gave you time to think. The PWA pivot gives you speed. Use it.

---

## 9. Open Questions

1. **Brand:** WrenchTrack OS or Garage Warrior OS?
2. **Tech stack:** Are you comfortable with Next.js/React, or do you want to stick closer to what you know?
3. **WrenchTrack v1 code:** Can we reuse any backend/logic, or is it fully native (Swift/Kotlin)?
4. **Database:** What was WrenchTrack v1 using for data storage?
5. **User base:** How many WrenchTrack v1 users do you have? Can we email them for the beta?
6. **Budget:** Is this bootstrapped, or do you want to explore funding after revenue?

---

## 10. Next Immediate Actions

| Action | Owner | Timeline |
|---|---|---|
| Decide brand (WrenchTrack OS vs Garage Warrior OS) | larrylegendrr | 24 hours |
| Confirm tech stack comfort | larrylegendrr | 24 hours |
| Share WrenchTrack v1 codebase / data model | larrylegendrr | 48 hours |
| Set up repo + CI/CD | OpenClaw/Engineering | Week 1 |
| Create landing page ("WrenchTrack is evolving") | OpenClaw/Design | Week 1 |
| Email existing WrenchTrack users | larrylegendrr | Week 2 |

---

*Generated by Command / OpenClaw — 2026-05-02*
