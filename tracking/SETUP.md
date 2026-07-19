# Conversion tracking

Live since 2026-07-18. Counts **phone-link clicks** and **WhatsApp-link
clicks** as Google Ads conversions, with GA4 analytics. No number swapping,
no backend.

## Final architecture (GA4-event import, not direct Ads tags)

```
site (GitHub Pages)
  └─ GTM loader in website/index.html (id GTM-TGTC6VC5)
       └─ GTM container, published Version 2
            ├─ Google Tag - GA4 (config, fires on Initialization)
            ├─ Conversion Linker (stores gclid, fires on All Pages)
            ├─ GA4 Event clicks_call     ← Click URL starts with "tel:"
            └─ GA4 Event click_whatsapp  ← Click URL contains "wa.me/"
                 └─ GA4 property G-MSHD09RL53 (Interlink Properties, 256366131)
                      └─ key events clicks_call / click_whatsapp
                           └─ imported by Google Ads 515-222-6123 as the two
                              "Contact" conversion actions (both Primary)
```

Why import instead of the originally planned direct Ads conversion tags:
the 2026 Ads "New conversion action" flow no longer offers manual tag-based
website conversions when a GA4 property is the registered data source; it
creates conversions from GA4 key events. This also removed the need for
conversion labels entirely (the awct tags and label variables were deleted
before publish). Trade-off: GA4 → Ads import adds up to a few hours of
reporting lag; attribution still uses the gclid via Conversion Linker.

Event names are `clicks_call` / `click_whatsapp` (not call_click etc.)
because those key events already existed in GA4 and the Ads conversion
actions were created from them. The GTM tag event names MUST match exactly.

## IDs

| Thing | Value |
|---|---|
| GTM container | GTM-TGTC6VC5 |
| GA4 property | Interlink Properties, 256366131, stream 15282859457, G-MSHD09RL53 |
| Ads account | 515-222-6123 (conversion id 816057246, unused now) |

## Verifying it works

1. GTM → Preview → interlinkproperties.in → click Call / WhatsApp buttons →
   the matching GA4 Event tag fires.
2. GA4 → Reports → Realtime: click a tel:/wa.me link on the live site from a
   phone; `clicks_call` / `click_whatsapp` appear within seconds.
3. Ads → Goals → Conversions: the two Contact actions leave "Inactive" within
   ~24h of the first real event. Import lag is up to a few hours per event.

## Coverage notes

- Triggers match on clicked URL, so every current and future call/WhatsApp
  link is tracked with zero code changes, including the dynamically rendered
  listing buttons from `js/main.js`.
- The WhatsApp trigger uses "wait for tags" (2 s) because wa.me navigates
  away; tel: clicks don't unload the page.
- Consent banners: not required for an India-only audience.

## Gotchas learned (keep for future setups)

- GTM's Google Ads conversion tag prepends `AW-` to the Conversion ID field;
  storing `AW-816057246` produced a malformed `AW-AW-816057246` destination
  (caught in Tag Assistant's top-bar chip before publish).
- The container seed in `tracking/gtm-container.json` mirrors published
  Version 2 and can be re-imported to rebuild the container from scratch.
- GitHub Pages serves HTML with `Cache-Control: max-age=600`; give a deploy
  10 minutes (or hard-refresh) before concluding a tag is missing.
