# Interlink Properties

Static landing page for Interlink Properties, Faridabad. Serves as the Google Ads
destination and verification URL (the ad's phone number must appear on this page).

Live: https://interlinkproperties.in
Hosting: GitHub Pages (free). Domain: GoDaddy.

## Editing

Everything lives in `index.html`: markup, CSS, and JS in one file, no build step
and no dependencies. Edit it, commit, push. GitHub Pages redeploys in about a minute.

## Design theme

The look comes from the brand assets in `brand/` (logo + visiting card): blue
watercolour texture, golden yellow accents, white text, lowercase Quicksand
display type.

- `brand/` holds the source assets (logo.jpg, visiting card front/back). Do not
  serve these directly; they are large.
- `assets/` holds the optimized derivatives the page actually loads: logo at
  192px, favicon, apple touch icon, og-image (1200x630), two watercolour
  textures cropped from the card (`wc-deep.jpg` hero/reviews, `wc-light.jpg`
  listings decoration), and the self-hosted Quicksand woff2 (latin subset only;
  Hindi falls back to system Devanagari fonts).
- Brand colors are CSS variables in `:root` at the top of the stylesheet.
- Keep Lighthouse scores above 90: font stays self-hosted and preloaded, hero
  texture stays preloaded and small (~35 KB), icons are inline SVG, images keep
  explicit width/height.

### Updating the property listings

Find the `LISTINGS` array near the bottom of `index.html`. The page shows a random
4 of these on each load.

Keep every entry deliberately non-identifiable, so competing agents cannot work out
which property it is:

- General area only ("Sector 15 area"), never a plot number or exact road
- Size and price as ranges, never exact figures
- One short hook line, in English and Hindi

The current 20 entries are SAMPLE DATA. Replace them with vague versions of real
inventory before relying on them, so callers always reach a real conversation.

### Other common edits

- Phone number: appears in `tel:` links, `wa.me` links, and the JSON-LD block. It
  must stay identical to the number in the Google Ads campaign.
- Hindi text: the `I18N.hi` object holds every translated string.
- Business hours: the `.hours` block plus `openingHours` in the JSON-LD.
- GSTIN: footer `.gst` block.

## Notes

- Do not use em dashes or en dashes in customer-facing copy.
- The Google Maps embed and the reviews link are keyless, so nothing to rotate.
- Reviews are quoted from the real Google Business Profile. Keep them verbatim.
