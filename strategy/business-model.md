# Garage Warrior OS / WrenchTrack 2.0 — Business Model Canvas
**Date:** 2026-05-02
**Status:** DRAFT — pivoting WrenchTrack to PWA + monetization layer
**Context:** Existing product (WrenchTrack.app) going from free → freemium SaaS

---

## 0. Strategic Pivot

**From:** WrenchTrack — free native app, no revenue, stuck in app store review hell
**To:** WrenchTrack OS / Garage Warrior OS — PWA, freemium SaaS, profit-tracking + AI, no gatekeepers

**Why PWA:**
- No app store review blocking (Apple/Google can't reject a web app)
- No 30% platform tax on subscriptions
- Instant updates (no waiting for review)
- Cross-platform by default (iOS, Android, desktop)
- Shareable via URL (viral distribution)

**Why now:** WrenchTrack proved the core concept. Now we layer monetization, AI, and the profit-tracking differentiation that no competitor has.

---

## 2. Customer Segments

### Primary: Side-Hustle Fix-and-Flippers
- Buys broken equipment on Marketplace/Craigslist
- Repairs in home garage
- Sells for profit
- **Est. US market:** 300K–800K active operators
- **Willingness to pay:** High (ROI is measurable)

### Secondary: Hobby Restorers
- Long-term motorcycle/classic car restoration
- Values documentation and resale history
- **Est. US market:** 1M–2M
- **Willingness to pay:** Medium (emotional value)

### Tertiary: Makers / Tinkerers
- Multiple concurrent small projects
- Community-oriented
- **Est. US market:** 2M+
- **Willingness to pay:** Low (but high engagement)

---

## 3. Revenue Streams

### Freemium SaaS (Primary)

| Tier | Price | Features |
|---|---|---|
| **Free** | $0 | 2 active projects, basic tracking, photo log, community access |
| **Warrior** | $9.99/mo or $79/yr | Unlimited projects, AI valuations, profit tracking, PDF exports, cloud backup |
| **Pro** | $19.99/mo or $149/yr | Everything + parts database API, marketplace listings, team/multi-garage, priority support |

### One-Time Upsells
- **PDF Build Report**: $4.99 per export (for resale documentation)
- **AI Valuation Pack**: $9.99 for 10 AI valuations
- **Custom Build Cards**: $2.99 per branded shareable card

### Affiliate / Marketplace (Future)
- Parts affiliate links (Amazon, eBay, RockAuto, Partzilla)
- Marketplace listing boost (Facebook Marketplace, eBay)
- Sponsored parts recommendations

### B2B Expansion (Future)
- "Garage Warrior Pro for Shops" — white-label for small repair shops
- Technician time-tracking + invoicing

---

## 4. Cost Structure

### Fixed Costs (Monthly)
| Item | Est. Cost |
|---|---|
| Infrastructure (Vercel/Cloudflare + DB) | $200–500 |
| AI API (OpenAI/Claude for valuations) | $500–2,000 (usage-based) |
| Image storage (Cloudflare R2/S3) | $100–300 |
| Part number database API | $200–500 |
| Payment processing (Stripe) | ~3% of revenue |

### Variable Costs
- Customer acquisition (ads, influencer partnerships)
- Content moderation (community features)
- Support (async + community-driven)

### Development Costs
- Initial MVP: 2-3 months, 1-2 engineers
- Full v1: 4-6 months, 2-3 engineers + 1 designer

---

## 5. Key Resources

### Technical
- PWA framework (Next.js / React + Workbox)
- Offline-first database (Dexie.js / IndexedDB + sync)
- AI valuation engine (GPT-4 Vision + marketplace scraper)
- Image processing pipeline (Cloudflare Workers)
- Part compatibility database (integration with parts APIs)

### Human
- Full-stack engineer (PWA + backend)
- Mobile/design engineer (UX for garage environment)
- AI/ML engineer (valuation model)
- Community manager (builds network effects)

### Partnerships
- Parts vendors (Amazon, eBay, RockAuto affiliate programs)
- Marketplace platforms (Facebook, eBay API)
- Influencers (YouTube garage channels, TikTok mechanics)

---

## 6. Key Activities

1. **Product Development**: MVP → v1 → AI features → Marketplace
2. **Content / SEO**: Build guides, part identification, repair tutorials
3. **Community Building**: User galleries, build-of-the-month, forums
4. **Data Acquisition**: Marketplace sold-listings for AI training, part databases
5. **Partnership Development**: Affiliate deals, marketplace integrations

---

## 7. Channels

### Organic
- SEO ("how to track motorcycle restoration", "small engine flip tracker")
- YouTube / TikTok collaborations with garage influencers
- Reddit communities (r/motorcycles, r/smallengines, r/projectbike, r/CarRestorations)
- Facebook Groups (garage warrior communities, fix-and-flip groups)

### Paid
- Facebook/Instagram ads targeting motorcycle + small engine interests
- YouTube pre-roll on restoration channels
- Google Ads for high-intent keywords

### Viral
- Shareable build cards (Instagram-ready)
- "Before/After" auto-generated posts
- Marketplace listing enhancer (better photos + documentation)

---

## 8. Customer Relationships

- **Self-service**: Freemium onboarding, in-app tutorials
- **Community**: Discord/Reddit support, user galleries, build sharing
- **Personal**: Email support for paid tiers
- **Automated**: AI-powered tips, project reminders, "stalled project" nudges

---

## 9. Key Partnerships

| Partner Type | Examples | Value |
|---|---|---|
| Parts retailers | Amazon, eBay, RockAuto, Partzilla | Affiliate revenue, part lookup |
| Marketplaces | Facebook Marketplace, eBay, Craigslist | Listing integration, valuation data |
| Content creators | YouTube/TikTok garage channels | Distribution, trust |
| Insurance | Hagerty, Progressive | Build documentation for claims |

---

## 10. Unit Economics (Projected)

| Metric | Year 1 Est. | Notes |
|---|---|---|
| CAC (Customer Acquisition Cost) | $15–25 | Organic-heavy, low paid |
| ARPU (Average Revenue Per User) | $6–8/mo | Blended free + paid |
| LTV (Lifetime Value) | $120–180 | 18-24 month avg. retention |
| LTV:CAC Ratio | 6:1 – 10:1 | Healthy SaaS economics |
| Conversion (Free → Paid) | 5–8% | Standard freemium |
| Payback Period | 3–4 months | |
| Target MRR (Year 1) | $10K–$20K | ~1,500–2,500 paying users |
| Target MRR (Year 2) | $50K–$100K | Network effects + marketplace |

---

## 11. Monetization Philosophy

**The principle:** The tool pays for itself on the first flip. If a user tracks one trimmer restoration and avoids a $30 duplicate part order or gains $50 in resale value from better documentation, the $9.99/mo is instantly justified.

**Pricing psychology:**
- Free tier is genuinely useful (2 projects = 2 concurrent flips)
- Warrior tier priced below one good flip's profit
- Pro tier priced below one monthly side-hustle revenue

---

## 12. Risk Mitigation

| Risk | Mitigation |
|---|---|
| Competitor undercuts (WrenchTrack free) | Differentiate on AI + profit tracking + marketplace integration |
| Low willingness to pay (hobbyists are cheap) | Free tier is generous; paid tier ROI is demonstrable |
| Part data is expensive / incomplete | Start with manual entry + crowdsourcing; add APIs later |
| Marketplace APIs are restrictive | Build web scrapers + manual export tools as fallback |
| AI valuations are inaccurate | Position as "estimate range" not appraisal; user-adjustable |

---

*Next: BRD → `brd.md` | PRD → `prd.md`*
