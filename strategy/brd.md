# Garage Warrior OS / WrenchTrack 2.0 — Business Requirements Document (BRD)
**Version:** 0.2
**Date:** 2026-05-02
**Status:** DRAFT
**Author:** Command / OpenClaw
**Product Owner:** larrylegendrr (WrenchTrack founder)

---

## 1. Executive Summary

**WrenchTrack.app** is an existing free iOS/Android app for tracking automotive and small engine projects, parts, labor, and costs. It was blocked on Acquire.com (pre-revenue) and jammed in app store review (in-app subscriptions not filed).

**Strategic Pivot:** Evolve WrenchTrack into a **Progressive Web Application (PWA)** with a freemium SaaS model, adding profit tracking, AI valuations, and advanced garage warrior features. The PWA approach eliminates app store gatekeeping, enables instant updates, and avoids platform subscription taxes.

**Business Objective:** Launch WrenchTrack OS MVP within 8-10 weeks, validate monetization within 90 days, and establish it as the definitive project-management OS for the garage warrior.

---

## 2. Business Objectives

| # | Objective | KPI | Target |
|---|---|---|---|
| 1 | Acquire early users in the fix-and-flip community | Signups | 1,000 in first 90 days |
| 2 | Validate willingness to pay | Free → Paid conversion | ≥ 5% |
| 3 | Prove ROI story | User-reported profit tracking | ≥ 70% of paid users actively track costs |
| 4 | Build organic distribution | Shareable build cards generated | ≥ 500/month by month 6 |
| 5 | Establish data moat | Marketplace comps indexed | ≥ 10K sold listings for AI training |

---

## 3. Scope

### In Scope (MVP)
- Project creation and management (small engines, motorcycles, ATVs, cars)
- Photo-based disassembly documentation with step sequencing
- Parts inventory and cost tracking per project
- Profit/loss tracking (buy price, parts cost, labor hours, sell price)
- Basic AI valuation (marketplace comp estimate)
- Offline-first PWA with cloud sync
- Shareable build cards / PDF export
- Free + Warrior ($9.99/mo) tiers

### Out of Scope (MVP — Future Phases)
- Full marketplace integration (auto-listing to Facebook/eBay)
- Parts database with compatibility lookup
- Community/feed features
- Team/multi-garage support
- Shop-in-a-Box B2B features (invoicing, quotes, client management)
- OBD2 integration
- Video documentation (beyond photos)
- Mobile native apps (iOS/Android stores)

---

## 4. Success Criteria

### User Success
- A user can start a new project, document a full disassembly with photos, track all parts costs, and see projected profit in under 30 minutes of app usage
- A user can pick up a stalled project after 3+ months and understand exactly where they left off
- A user can generate a shareable build summary for resale in under 2 minutes

### Business Success
- MRR of $5K+ within 6 months of launch
- Organic traffic ≥ 30% of new signups
- NPS ≥ 40 among paid users
- Churn < 8% monthly among paid users

---

## 5. Constraints

### Technical
- Must be a PWA (no app store dependency, faster iteration)
- Must work offline (garages often have poor connectivity)
- Must support photo-heavy workflows (gallery access, camera)
- Must sync across devices (cloud backend)

### Business
- No external funding for MVP (bootstrapped approach)
- Must launch with AI features using existing APIs (no custom model training for MVP)
- Must comply with marketplace ToS for scraping (read-only, rate-limited)

### Legal
- Photo storage compliance (user owns their content)
- Affiliate disclosure requirements
- GDPR/CCPA readiness (even if US-first)

---

## 6. Stakeholders

| Role | Responsibility |
|---|---|
| **Product Owner** | Larry / larrylegendrr — vision, user stories, validation |
| **Engineering Lead** | TBD — architecture, MVP build, infra |
| **Design Lead** | TBD — UX for garage environment, offline flows |
| **AI/ML Engineer** | TBD — valuation model, receipt parsing |
| **Community Manager** | TBD — Reddit/Discord engagement, content |

---

## 7. Assumptions

1. Garage warriors are willing to pay $9.99/mo if the tool demonstrably saves money or increases profit
2. The fix-and-flip community is active on Facebook Marketplace, Reddit, and TikTok
3. AI valuations can be "good enough" using marketplace scraping + LLM reasoning (not appraisal-grade)
4. Photo documentation is the primary disassembly record format (video is nice-to-have)
5. PWA technology (IndexedDB, Service Workers, Web Share API) is mature enough for offline-first use

---

## 8. Dependencies

| Dependency | Owner | Status |
|---|---|---|
| OpenAI / Claude API access | Engineering | Available |
| Image storage (R2/S3) | Engineering | Available |
| Payment processing (Stripe) | Engineering | Available |
| Parts database API | Engineering | Research phase |
| Marketplace scraper | Engineering | To build |
| PWA hosting (Vercel/Cloudflare) | Engineering | Available |

---

## 9. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| WrenchTrack.app launches paid AI features | Medium | High | Move fast, differentiate on profit tracking + marketplace adjacency |
| Users prefer free tools (spreadsheets) | Medium | Medium | Free tier must be genuinely useful; paid tier ROI must be obvious |
| AI valuations are wildly inaccurate | Medium | High | Position as "estimate range"; allow user overrides; improve with data |
| Part number data is too fragmented | High | Medium | Start with manual entry + UPC scanning; crowdsource compatibility |
| Photo storage costs explode | Low | Medium | Compression pipeline, R2/S3 with lifecycle policies, user quotas |

---

## 10. Timeline (High-Level)

| Phase | Duration | Deliverable |
|---|---|---|
| **Discovery** | 2 weeks | User interviews (10), competitive deep-dive, refined PRD |
| **MVP Build** | 6-8 weeks | Core PWA: projects, photos, parts, costs, basic AI valuation |
| **Beta** | 2 weeks | Closed beta with 50 garage warriors |
| **Launch** | 1 week | Public launch, Reddit/Discord announcement |
| **Growth** | Ongoing | SEO, content, influencer partnerships, feature expansion |

---

## 11. Approval

| Role | Name | Status |
|---|---|---|
| Product Owner | larrylegendrr | ⏳ Pending review |
| Engineering Lead | TBD | — |
| Design Lead | TBD | — |

---

*Next: PRD → `prd.md`*
