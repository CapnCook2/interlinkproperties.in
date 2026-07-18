# Interlink Properties

Landing page for Interlink Properties, Faridabad. Serves as the Google Ads
destination and verification URL (the ad's phone number must appear on this page).

Live: https://interlinkproperties.in
Hosting: GitHub Pages via Actions (deploys `website/` on every push to `main`).
Domain: GoDaddy.

## Structure

```
website/            the site (only this folder is deployed)
  index.html        markup
  css/styles.css    all styles; brand tokens in :root at the top
  js/data.js        EDIT THIS: property listings + all EN/HI text
  js/main.js        logic (language toggle, listings, animations)
  assets/           photos, icons, og-image, self-hosted font
.github/workflows/pages.yml   deploy workflow
tracking/           Google Ads/GA4 conversion tracking config (not deployed)
```

Photos and brand source material stay outside the repo history (`.gitignore`).

## Brand

Taken from the physical shop sign: charcoal (#23272c), white lowercase type,
yellow accent (#f7b500, from the BUY|SELL|RENT board). Font: Manrope
(self-hosted latin subset; Hindi uses system Devanagari fonts). The mark is a
yellow roof chevron with a white door dot on a charcoal tile, inline SVG in
index.html and drawn as PNG for favicon/apple-touch/og.

## Editing

### Property listings and text

Everything editable lives in `website/js/data.js`: the `LISTINGS` array
(the page shows a random 4 per load) and the `I18N` EN/HI strings.

Keep every listing deliberately non-identifiable, so competing agents cannot
work out which property it is:

- General area only ("Sector 15 area"), never a plot number or exact road
- Size and price as ranges, never exact figures
- One short hook line, in English and Hindi

The current 20 entries are SAMPLE DATA. Replace them with vague versions of
real inventory (see `questions-for-dad.md` at the repo root, untracked).

### Other common edits

- Phone number: appears in `tel:` links, `wa.me` links, and the JSON-LD block
  in index.html. It must stay identical to the number in the Google Ads
  campaign (+91 98990 14501, the only number used in text).
- Business hours: `conHours` strings in data.js plus `openingHours` in the
  JSON-LD.
- GSTIN: footer `.gst` block once available.
- Photos: originals in `office photos/` (untracked); web derivatives generated
  into `website/assets/img/` (resized, EXIF-rotated, jpg+webp).

## Performance / SEO invariants

Keep Lighthouse at 100: font stays self-hosted and preloaded, hero image uses
srcset + fetchpriority, icons are inline SVG, all images have explicit
width/height. SEO files: robots.txt, sitemap.xml, canonical, JSON-LD
RealEstateAgent (with founder), og/twitter tags.

Known limitation: Hindi is a client-side toggle, so Google indexes only the
English text. Fine while traffic is Ads-driven; revisit with a real `/hi/`
page only if organic Hindi traffic becomes a goal.

## Conversion tracking

Google Ads conversions are click-to-call (`tel:`) and click-to-WhatsApp
(`wa.me`) link clicks, tracked via Google Tag Manager; GA4 rides along for
analytics. `website/index.html` has a guarded GTM loader (inert until the
container ID is pasted in). All tag/trigger config lives in the GTM web UI,
seeded from `tracking/gtm-container.json`. Setup and testing steps:
`tracking/SETUP.md`. Deliberately no Google call tracking: it swaps the
displayed phone number, and the real number must stay visible (see above).

## Notes

- Do not use em dashes or en dashes in customer-facing copy.
- The Google Maps embed and the reviews link are keyless, so nothing to rotate.
- Reviews are quoted from the real Google Business Profile. Keep them verbatim.
- Devanagari text must not get letter-spacing (breaks conjuncts); a CSS rule
  handles this for `html[lang="hi"]`.
