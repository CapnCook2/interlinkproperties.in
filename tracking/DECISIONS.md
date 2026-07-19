# Conversion tracking: decision log (session of 2026-07-17/18)

What we set out to do, what we decided, what went wrong, and how each claim
was verified. `SETUP.md` describes the final live state; this file explains
how we got there.

## Goal and constraints

Measure Google Ads conversions for interlinkproperties.in with:

- No Google call tracking / number swapping. The real number (+91 98990
  14501) must always be what the customer sees. This ruled out every
  technology that can confirm a call actually connected, so the tracked
  conversion is the click on a `tel:` or `wa.me` link. That click is the
  industry-standard proxy for this constraint.
- Static hosting (GitHub Pages), no backend, no database. All tracking is
  client-side JavaScript firing to Google's servers; nothing is stored on
  our infrastructure.

## Decisions

### 1. GTM as the delivery layer (not raw gtag.js in HTML)

Every tracking change via raw gtag means git commit + push + Pages rebuild.
With one GTM container snippet installed once, all tag/trigger config lives
in the GTM web UI. On this hosting setup that trade wins decisively. The
loader in `website/index.html` is the standard GTM snippet wrapped in a
guard so it was a provable no-op until the container ID existed.

### 2. Original plan: direct Ads conversion tags, GA4 alongside

First architecture fired Google Ads conversion tags (awct) directly from
GTM on the click triggers, avoiding GA4-import lag, with GA4 events as
bonus analytics. This is what `gtm-container.json` originally seeded and
what Tag Assistant preview verified (all 6 tags fired correctly).

### 3. Pivot: GA4-event import (the live architecture)

The 2026 Ads "New conversion action" wizard no longer offers manual
tag-based website conversions when a GA4 property is the registered data
source. It creates conversion actions from GA4 key events. Rather than
fight the deprecated path, we imported the two existing GA4 key events
(`clicks_call`, `click_whatsapp`) as the conversion actions and reshaped
GTM to match: GA4 event tags renamed to those exact names, awct tags and
their 3 variables deleted, Conversion Linker kept for gclid capture.

Consequences: conversion labels became unnecessary (whole class of config
eliminated); cost is GA4 → Ads import lag of up to a few hours per event.
The GTM event names and GA4 key event names MUST stay identical.

Also unchecked the "Conversions from phone calls" data source in the Ads
wizard: that is the forwarding-number path (see constraint above).

## Bugs and traps hit (all documented in SETUP.md gotchas)

1. **`AW-AW-` double prefix.** GTM's awct Conversion ID field wants digits
   only; storing `AW-816057246` produced destination `AW-AW-816057246`.
   Caught live in Tag Assistant's top-bar chip before publish. (Moot after
   the pivot, but the lesson stands for any future awct tag.)
2. **Pages cache.** GitHub Pages serves `Cache-Control: max-age=600`; a
   Tag Assistant "tag not found" right after a merge was just the CDN/
   browser serving the pre-merge page.
3. **Own ad blocker.** The owner's Chrome profile blocks Google
   measurement endpoints (beacons answered with 503). Terminal curl from
   the same network got 204, proving network and implementation are fine.
   Do not test tracking from that Chrome profile; use a phone on cellular.

## Verification evidence

- Tag Assistant preview: all tags fired on the right clicks, none unfired.
- Published container: served `gtm.js?id=GTM-TGTC6VC5` contains
  `clicks_call`, `click_whatsapp`, `G-1SH3KXHGCV`, `"tel:"`, `wa.me\/`.
- Live site network log: GTM loads, GA4 config fires, `page_view`
  dispatched to `/g/collect`.
- `curl` to `/g/collect` from the same network: 204 accepted.

## State at session end

Live: loader on main (PR #2), GTM Version 2 published, both Ads conversion
actions created (Contact category, Primary), GA4 property G-1SH3KXHGCV
collecting with Enhanced measurement on.

Open items:

- Phone test on cellular: tap the WhatsApp button, watch GA4 Realtime show
  `click_whatsapp`. Only remaining end-to-end proof with a clean client.
- Ads conversion actions flip from "Inactive" within ~24h of real events.
- Optional: rename GA4 property from "Property 1"; link GA4 ↔ Ads product
  link for remarketing audiences; review call assets if the no-forwarding-
  number principle should extend to the ads themselves.
