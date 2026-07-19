# Google Ads + tracking change tracker

Session started 2026-07-19. Goal: maximise phone calls and WhatsApp messages for
Interlink Properties while keeping total spend at or under **INR 333/day**.

Rules followed in this session: **nothing is deleted**, only paused. Anything that
looks like it should be deleted is listed under "Deletions for Himank to do".

---

## Account IDs

| Thing | Value |
|---|---|
| Google Ads account | 515-222-6123 (ocid 258155640) |
| GA4 account / property | Interlink Properties 185641243 / property 256366131 |
| GA4 web stream (NEW, live) | interlinkproperties.in website, stream 15282859457, **G-MSHD09RL53** |
| GA4 stream (Business Profile) | Interlink Properties Google maps, 2209562302, G-STLNXTE1GZ |
| GTM container | GTM-TGTC6VC5 (account 6366795132, container 258728751) |

---

## Changes made

### 1. Fixed the root cause: conversion tracking was pointed at a dead property

**Problem found.** GTM was sending every GA4 event to measurement ID
`G-1SH3KXHGCV`. That ID does not exist in property 256366131 (the property Google
Ads imports conversions from). It belonged to one of two "Interlink Properties"
properties under the unrelated **Cakewalk** account (546058021 / 546148340), both
of which are struck through in the GA4 picker, meaning deleted / pending deletion.

Property 256366131 had exactly one data stream, an auto-created Google Business
Profile stream for a maps.google.com URL (`G-STLNXTE1GZ`). There was no website
stream at all. So: site events went to a dead property, the live property received
nothing, and Google Ads could never import a single conversion. This is why every
campaign shows 0 conversions and why GA4 said "No data received from your website
yet".

**Fixes applied.**

- Created a new GA4 **web data stream** in property 256366131 for
  `https://interlinkproperties.in` (stream 15282859457, measurement ID
  `G-MSHD09RL53`). Enhanced measurement left on.
- Did **not** touch the Google Business Profile maps stream (it serves a different
  purpose).
- Updated the GTM constant variable `GA4 Measurement ID` from `G-1SH3KXHGCV` to
  `G-MSHD09RL53`. All three tags (Google Tag - GA4, GA4 Event - clicks_call,
  GA4 Event - click_whatsapp) reference that one variable, so a single edit fixed
  all of them.
- Published GTM **Version 3** ("Point GA4 tags at live website stream
  G-MSHD09RL53").

**Verified.** The served container now contains the new ID and no trace of the old
one:

```
curl -s "https://www.googletagmanager.com/gtm.js?id=GTM-TGTC6VC5"
G-MSHD09RL53     1
G-1SH3KXHGCV     0
clicks_call      1
click_whatsapp   1
tel:             1
wa.me            1
```

GA4 key events `clicks_call` and `click_whatsapp` already exist in property
256366131 and are starred as key events, so no change was needed there.

---

## Findings in the Google Ads account (audit in progress)

Performance, last 30 days (19 Jun - 16 Jul 2026): 4,564 impressions, 533 clicks,
11.68% CTR, INR 4,616.78 spent (~INR 165/day actual), **0 conversions recorded**
(explained by the tracking break above).

| Campaign | Type | Budget/day | Status | Impr | Clicks | Cost | Bid strategy |
|---|---|---|---|---|---|---|---|
| Interlink Properties Web Ads 2 | Search | INR 100 | Paused | 0 | 0 | INR 0 | Maximise clicks |
| Interlink Properties Call Ads | Search | INR 166 | Paused | 4,180 | 483 | INR 4,293.68 | Maximise conversions |
| Leads-Performance Max-3 | Perf Max | INR 200 | Enabled (learning) | 0 | 0 | INR 0 | Maximise conversions |
| Leads-Search-6 | Search | INR 300 | Enabled (learning) | 384 | 50 | INR 323.10 | Maximise conversions |

Total configured budget across all four: **INR 500/day**. Enabled only:
**INR 500/day** (PMax 200 + Search-6 300), which is over the INR 333/day target.

Issues identified so far:

1. **Over budget.** Enabled campaigns total INR 500/day vs the INR 333/day target.
2. **Smart bidding with no conversion signal.** Three campaigns run "Maximise
   conversions" while conversion tracking has never once fired. Smart bidding with
   zero conversion history has no model to optimise against.
3. **The only campaign with real traction is paused.** "Interlink Properties Call
   Ads" produced 4,180 impressions and 483 clicks at 11.56% CTR, then was paused.
   The two enabled campaigns are new and barely serving.
4. **Performance Max is a poor fit at this budget.** PMax has produced 0
   impressions, needs conversion data it does not have, and spreads a tiny local
   budget across Display/YouTube/Discover where call intent is lowest.
5. **Leads-Search-6 is budget-starved, not rank-starved.** It loses 88.36% of
   impression share to budget and 0.00% to rank, meaning it wins the auctions it
   enters and simply runs out of money. Extra budget here converts directly into
   more traffic.
6. **Call Ads loses 58.29% of impression share to rank** (quality/bid issue), a
   different problem from Search-6.
7. **Conversion goals need attention.** Three goal groups (Phone call lead,
   Contact, Get directions) all show "Needs attention". The Contact goal has
   **5 primary conversion actions**, which looks like duplicates from repeated
   setup attempts. Under review.

---

## Deletions for Himank to do (nothing deleted by me)

- Two orphaned GA4 properties named "Interlink Properties" under the **Cakewalk**
  account (546058021 and 546148340), already struck through / pending deletion.
  One of them holds the dead `G-1SH3KXHGCV` stream. Safe to remove once you have
  confirmed the new pipeline reports data.
- Possible duplicate conversion actions under the "Contact" goal (5 primary
  actions where 2 are expected). To be confirmed below before you remove any.

---

## Long-term strategy (revisit dates)

- **Now to ~2 weeks:** let the fixed tracking accumulate real `clicks_call` /
  `click_whatsapp` conversions. Bidding stays on click-maximising until there is a
  conversion history to optimise against.
- **At ~30 conversions in 30 days:** switch the main Search campaign to Maximise
  conversions (or Target CPA once cost/conv is known). This is the threshold where
  Google's smart bidding becomes reliable.
- **Ongoing:** review the search terms report weekly for the first month and add
  negative keywords. Wasted clicks are the biggest controllable loss at this budget.
