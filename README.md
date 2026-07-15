# Interlink Properties

Static landing page for Interlink Properties, Faridabad. Serves as the Google Ads
destination and verification URL (the ad's phone number must appear on this page).

Live: https://interlinkproperties.in
Hosting: GitHub Pages (free). Domain: GoDaddy.

## Editing

Everything lives in `index.html`: markup, CSS, and JS in one file, no build step
and no dependencies. Edit it, commit, push. GitHub Pages redeploys in about a minute.

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
