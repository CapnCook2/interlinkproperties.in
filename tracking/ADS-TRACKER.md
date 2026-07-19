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

### 2. Brought spend to the INR 333/day target and concentrated it

- **Paused** `Leads-Performance Max-3` (was enabled at INR 200/day). It had
  produced 0 impressions and 0 spend. Performance Max is a poor fit for this
  account: it needs conversion history it does not have, and it scatters a small
  local budget across Display/YouTube/Discover, where call intent is lowest.
  Paused, not removed.
- **Raised** `Leads-Search-6` from INR 300/day to **INR 333/day**. It is the only
  campaign now serving. It loses 88.36% of impression share to budget and 0.00%
  to rank, meaning it already wins the auctions it enters and is purely
  money-limited, so extra budget converts directly into more traffic at its
  current INR 6.46 CPC.

Result: **Total: Account = INR 333.00/day**, exactly on target, with one enabled
campaign. Verified in the campaigns table.

### 3. Conversion actions reviewed (no changes yet)

The "Contact" goal holds 5 primary conversion actions:

| Action | Source | Conv. (30d) | Status |
|---|---|---|---|
| Clicks to call | Google hosted | **42.00** (value 31,000) | Active |
| Interlink Properties (web) click_whatsapp | Website (GA4) | 0 | Awaiting conversions |
| Interlink Properties (web) clicks_call | Website (GA4) | 0 | Awaiting conversions |
| Smart campaign ad clicks to call | Call from Ads | 0 | Awaiting conversions |
| Smart campaign map clicks to call | Google hosted | 0 | Awaiting conversions |

Important correction to the earlier assumption: the account was **not** completely
blind. `Clicks to call` is a Google-hosted action that tracks clicks on the "Call"
button on location-based ads, and it has recorded 42 conversions, most recently
17 Jul 2026. It needs no number swapping (it counts a click on the button showing
the real number), so it is consistent with the no-forwarding-number rule. The two
GA4 website actions are the ones that were dark, and they are the ones fixed above.

The two "Smart campaign ..." actions are system-locked leftovers from a Smart
campaign and cannot be edited.

### 4. Added four sitelinks at account level

Google's own recommendation on the account was "add at least six sitelinks"
(estimated +2% optimisation score). Leads-Search-6 had only two (Reviews and
Photos, both pointing at Google Maps).

Added four new sitelinks at **account level**, so they serve on every campaign
including any created later, rather than being tied to one campaign:

| Sitelink text | Description lines | Final URL |
|---|---|---|
| Current Listings | Flats, plots and houses / See available properties | https://interlinkproperties.in/#listings |
| Areas We Cover | Sectors across Faridabad / Find your preferred area | https://interlinkproperties.in/#areas |
| Our Services | Buying and selling help / Guidance at every step | https://interlinkproperties.in/#services |
| Contact Us | Call or WhatsApp us / Speak to our team today | https://interlinkproperties.in/#contact |

The URLs use anchors that genuinely exist in `website/index.html`. Copy avoids em
dashes and makes no claims that the site does not already support (no invented
opening hours, no invented guarantees). Sitelink count went from 4 to 8, verified
in the assets table.

### 5. Verified: no Google forwarding numbers anywhere

Every campaign has a call asset, and all of them use the real number
**9899014501**. The "Add call" dialog also confirmed **call reporting is off**
for the account, with Google prompting to turn it on. Call reporting is the
feature that substitutes a Google forwarding number, so leaving it off is
correct and deliberate for this account. Do not enable it.

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

### 6. Fixed a missing day in the ad schedule

`Leads-Search-6` was scheduled for **Mondays, Tuesdays, Wednesdays, Fridays,
Saturdays and Sundays, 09:00 to 22:00. Thursday was missing entirely**, so the
campaign did not run one day in seven, roughly 14% of the week, for no reason.

This was a mistake rather than a deliberate closure: the site states
"Open daily: 10:00 AM to 7:00 PM" and the JSON-LD says `Mo-Su 10:00-19:00`, so
the business trades on Thursdays. Opening the schedule editor confirmed the
intent was a single "All days 09:00 to 22:00" rule that had lost a day.

Re-saved the schedule as **All days, 09:00 to 22:00**. Verified: the ad schedule
table now returns 21 rows, which is 3 campaigns x 7 days, where the same view
previously returned 20.

**Open question for Himank (deliberate, not changed):** the ad schedule runs
09:00 to 22:00 but the business is open 10:00 to 19:00. Ads therefore serve for
one hour before opening and three hours after closing. That is not necessarily
waste, because a WhatsApp message sent at 21:00 can be answered next morning,
but a *phone call* at 21:00 rings an empty office and the click is still paid
for. Options: leave as is to maximise WhatsApp volume, or narrow to roughly
09:00 to 20:00 to cut the deadest hours. Worth deciding once the new conversion
data shows which of call versus WhatsApp dominates by hour.

### 7. Ads reviewed

| Ad | Campaign | Type | Status | Ad strength |
|---|---|---|---|---|
| 4 x "Call 9899014501 ..." | Interlink Properties Call Ads | Call ad | **Not eligible: "Update to call assets"** | n/a |
| Property in Faridabad | Interlink Properties Web Ads 2 | Responsive display | Not eligible (campaign paused) | Good |
| Buy & Sell Property Now ... | Leads-Search-6 | Responsive search | **Eligible** | Good |

Two things worth knowing:

1. **The four legacy call-only ads are dead.** They are marked "Not eligible:
   Update to call assets" because Google retired call-only ads in favour of call
   assets. These were the historic workhorses (1,766 / 1,122 / 814 / 478
   impressions at 9.58% to 14.02% CTR). Even if "Interlink Properties Call Ads"
   were re-enabled tomorrow, **those ads would not serve**. That campaign would
   need new responsive search ads first. This materially changes the case for
   re-enabling it.
2. **Leads-Search-6 has exactly one responsive search ad**, ad strength "Good",
   with 15 headlines and 4 descriptions, so the asset counts are already maxed.
   A second RSA in the ad group would give Google something to test against,
   which is the normal next step once there is traffic.

---

## Keyword and search term analysis

The account has **326 keywords** and **1,317 search terms** in the last 30 days,
and **290 negative keywords** already in place, so the negative list is already
substantial. Nearly all spend history belongs to the now-paused "Interlink
Properties Call Ads", which used **broad match on everything**.

Where the money went (30 days), worst to best cost per click:

| Search term / keyword | CPC | Note |
|---|---|---|
| magicbricks (exact, **added as a keyword**) | INR 51.75 | Property portal brand. Wrong intent, most expensive click in the account |
| plots in faridabad (exact) | INR 41.20 | Expensive, only 8.00% CTR |
| plot in faridabad (close variant) | INR 25.23 | 5.88% CTR |
| "real estate" (phrase) | INR 24.73 | Low Quality Score, 19 impressions and 0 clicks |
| properties for sale (broad) | INR 20.77 | Generic, national intent |
| property sites in india (broad) | INR 20.26 | Wrong intent, people want portals |
| property dealer faridabad | INR 17.45 | |
| homes for sale (broad) | INR 10.62 | |
| flats in faridabad (broad) | INR 6.07 | Workhorse: 233 clicks, 14.38% CTR |
| property dealer near me | INR 4.20 | 14.44% CTR |
| homes near me (broad) | INR 3.36 | 14.61% CTR |
| **sector 21 faridabad** | **INR 1.48** | **68.29% CTR**, the single best term in the account |

The pattern is unambiguous: **hyper-local, sector-level and "near me" searches are
cheap and engage strongly; generic national real-estate terms and portal brand
names are expensive and do not convert.** "sector 21 faridabad" got a 68% CTR at
under INR 1.50 a click, while "magicbricks" cost INR 51.75 for one click.

Also seen: `kala malhotra property dealer` (a competitor's name) took 20
impressions and 0 clicks.

Note: `Rent` is set as a negative keyword. **Confirmed correct by Himank: no
rentals.** Leave it in place.

---

## Deletions for Himank to do (nothing deleted by me)

- Two orphaned GA4 properties named "Interlink Properties" under the **Cakewalk**
  account (546058021 and 546148340), already struck through / pending deletion.
  One of them holds the dead `G-1SH3KXHGCV` stream. Safe to remove once you have
  confirmed the new pipeline reports data.
- The keyword **`magicbricks`** in "Interlink Properties Call Ads". It is a
  property-portal brand term that cost INR 51.75 for one click at 3.70% CTR.
  It is currently harmless because that campaign is paused, but pause or remove
  the keyword before ever re-enabling the campaign, and consider adding
  `magicbricks`, `99acres`, `nobroker` and `housing.com` as negatives.
- Two "Smart campaign ..." conversion actions under the Contact goal. They are
  leftovers from an old Smart campaign, are system-locked (cannot be edited),
  and sit at 0 conversions. Harmless, but they clutter the goal.

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

### Bid strategy: decision and reasoning

Leads-Search-6 was left on **Maximise conversions** rather than switched to
Maximise clicks. Reasoning, since this was a genuine judgement call:

- The account is not actually starved of conversion signal. `Clicks to call` has
  42 conversions in 30 days, above the ~30/month threshold where Google's smart
  bidding becomes reliable.
- The campaign's engagement numbers are already good: 13.02% CTR at INR 6.46 CPC,
  better than the paused campaign's 11.56% at INR 8.89.
- It loses 0.00% of impression share to rank, so it is not being out-bid. Its only
  constraint was budget, which the change above fixed directly.
- Switching bid strategy resets the learning period. Switching now and switching
  back in two weeks would cost two resets for no clear gain.

**Revisit around 2 August 2026.** If `clicks_call` / `click_whatsapp` are landing
in Ads by then and cost per conversion is stable, consider moving to Target CPA
using the observed cost/conv as the starting target. If the campaign is spending
the full INR 333 but conversions are flat, switch to Maximise clicks with a max
CPC cap of about INR 10 and re-evaluate.

### Where to spend the next hour of effort

Ranked by expected return at this budget:

1. **Mine the search terms weekly.** The data already shows sector-level searches
   convert attention 10x cheaper than generic ones. Add generic and portal-brand
   terms as negatives as they appear.
2. **Add sector-specific keywords.** "sector 21 faridabad" got a 68% CTR at
   INR 1.48. Build out phrase-match keywords for the sectors the business actually
   covers (sector 15, 16, 21 and others per the site's areas section). This is the
   single clearest opportunity visible in the data.
3. **Move off broad match.** Every keyword in the old campaign was broad match,
   which is what pulled in "magicbricks" and competitor names. Phrase and exact
   match on a INR 333/day budget will waste far less.
4. **Consider re-testing "Interlink Properties Call Ads"** only after conversions
   are flowing, and only if Leads-Search-6 stops being budget-limited. Splitting
   INR 333/day across two campaigns slows both campaigns' learning. Note that its
   four ads are call-only ads and are no longer eligible to serve, so re-enabling
   it requires writing new responsive search ads first.
5. **Add a second responsive search ad** to Leads-Search-6 once it has traffic,
   so Google has something to test the current ad against.

---

## Verification checklist for Himank

Things worth confirming yourself, with what to expect:

1. **Tracking end to end.** From a phone on mobile data (not your own Chrome,
   which has an ad blocker that suppresses Google measurement calls and even
   blocked parts of the Ads console during this session), open
   interlinkproperties.in and tap the WhatsApp button. Within seconds
   `click_whatsapp` should appear in GA4 Realtime for property 256366131. This is
   the one piece of the chain that has never been proven with a clean client.
2. **Google Ads conversion import.** Within about 24 hours of the first real
   event, "Interlink Properties (web) clicks_call" and
   "Interlink Properties (web) click_whatsapp" should move from
   "Awaiting conversions" to recording. Import lag is up to a few hours per event.
3. **Spend.** Daily spend should now sit at or under INR 333. Only Leads-Search-6
   is enabled.
4. **Thursday.** Confirm the campaign serves this Thursday.

## Summary of what changed in this session

| # | Change | Where |
|---|---|---|
| 1 | Created web data stream G-MSHD09RL53 | GA4 property 256366131 |
| 2 | Repointed GTM variable from dead G-1SH3KXHGCV, published Version 3 | GTM GTM-TGTC6VC5 |
| 3 | Paused Leads-Performance Max-3 (was INR 200/day, 0 impressions) | Google Ads |
| 4 | Raised Leads-Search-6 budget INR 300 to INR 333/day | Google Ads |
| 5 | Added 4 account-level sitelinks (4 to 8 total) | Google Ads |
| 6 | Restored missing Thursday in the ad schedule | Google Ads |

Nothing was deleted.
