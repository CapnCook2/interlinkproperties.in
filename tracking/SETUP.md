# Conversion tracking setup

Goal: count **phone-link clicks** and **WhatsApp-link clicks** as Google Ads conversions, plus GA4 analytics. No number swapping, no backend. The site side is already done: `website/index.html` has a guarded GTM loader that stays inert until you paste a container ID into it.

Total console time: ~15 minutes. Do the steps in order; later steps need IDs from earlier ones.

## 1. Create the GTM container (tagmanager.google.com)

1. Create Account: name `Interlink Properties`, country India.
2. Container: name `interlinkproperties.in`, target platform **Web**.
3. Note the container ID (`GTM-XXXXXXX`, shown top bar).
4. Skip the install-code popup; the site already has the loader.

## 2. Create the GA4 property (analytics.google.com)

1. Admin → Create → Property: name `Interlink Properties`, timezone India, currency INR.
2. Business details: Real Estate, small. Skip goals or pick "Generate leads".
3. Add a **Web** data stream for `https://interlinkproperties.in`.
4. Note the **Measurement ID** (`G-XXXXXXXXXX`).
5. Leave "Enhanced measurement" on (free page-view/scroll data, no downside here).

## 3. Create the two conversion actions (ads.google.com, account 515-222-6123)

Goals → Conversions → Summary → **+ New conversion action** → **Website** → enter `interlinkproperties.in` → scan → choose **"Add a conversion action manually"** (do this twice):

| Field | Action 1 | Action 2 |
|---|---|---|
| Goal & category | Contact | Contact |
| Name | `Phone call click` | `WhatsApp click` |
| Value | Don't use a value (or set one later) | same |
| Count | One | One |
| Click-through window | 30 days | 30 days |
| Attribution | Data-driven | Data-driven |

Important: do NOT pick the "Phone calls" conversion types. Those are Google call tracking and swap the displayed number, which we are deliberately avoiding. Plain **Website** conversion actions fired by our own tag keep the real number on screen.

After creating, open each action → "Use Google Tag Manager" → note the **Conversion ID** (`AW-XXXXXXXXX`, same for both) and each action's **Conversion label**.

## 4. Import the container config

1. GTM → Admin → **Import Container**.
2. File: `tracking/gtm-container.json` from this repo.
3. Workspace: Existing → Default Workspace. Option: **Merge / Overwrite conflicting** (empty container, so either is fine).
4. Confirm. You should see: 6 tags, 2 triggers, 4 variables.
5. Open Variables → fill in the remaining constants with real values
   (`Ads Conversion ID` is already set to the real `AW-816057246` in the JSON):
   - `Ads Label - Call Click` = label of "Phone call click"
   - `Ads Label - WhatsApp Click` = label of "WhatsApp click"
   - `GA4 Measurement ID` = `G-XXXXXXXXXX` (step 2)

If the import errors (hand-authored export files occasionally trip validation), the manual equivalent is small; see "Manual fallback" below.

## 5. Put the container ID in the site and deploy

In `website/index.html`, find the Google Tag Manager comment and set the empty `id` string:

```js
(function(){var id='GTM-XXXXXXX';
```

Commit and push to main; GitHub Pages redeploys. This is the only code change ever needed; everything after this is configured in the GTM web UI.

## 6. Test, then publish

1. GTM → **Preview** → enter `https://interlinkproperties.in` (works once step 5 is deployed).
2. In the debug session: click the Call button and a WhatsApp button.
3. Verify in Tag Assistant: on the tel: click, `Ads Conversion - Call Click` + `GA4 Event - call_click` fired; on the wa.me click, the WhatsApp pair fired; `Conversion Linker` and `Google Tag - GA4` fired on page load.
4. GTM → **Submit** → Publish. Nothing goes live to real visitors until this publish.
5. Within ~24h the two conversion actions in Ads should change from "Inactive" to "Recording conversions". Click your own ad once from your phone and call/WhatsApp to give it a first conversion if you want to verify end to end (then optionally exclude it later; one self-click is noise, not a problem).

## Notes

- Coverage: the triggers match on `tel:` prefix and `wa.me/` in the clicked URL, so every call/WhatsApp link on the page is covered, including the dynamically rendered listing buttons from `js/main.js`. New links added later are tracked automatically; no code changes.
- The WhatsApp trigger uses "wait for tags" (2s) because wa.me navigates away; tel: clicks don't unload the page so the call trigger doesn't need it.
- Consent banners: not required for an India-only audience; nothing to configure.
- GA4 → Ads linking (Admin → Product links) is optional with this direct-tag setup; do it anyway when convenient, it enables remarketing audiences later.

## Manual fallback (only if the import fails)

In GTM create:

- 4 **Constant** variables as listed in step 4.5.
- Trigger `Click - Phone (tel:) link`: type "Click - Just Links", fire on Some Link Clicks, `Click URL` starts with `tel:`.
- Trigger `Click - WhatsApp (wa.me) link`: same type, `Click URL` contains `wa.me/`, and enable "Wait for Tags" (2000 ms) on all pages.
- Tag `Conversion Linker` (type Conversion Linker), trigger: All Pages.
- Tag `Google Tag - GA4` (type Google Tag), Tag ID `{{GA4 Measurement ID}}`, trigger: Initialization.
- Tag `Ads Conversion - Call Click` (type Google Ads Conversion Tracking), ID `{{Ads Conversion ID}}`, label `{{Ads Label - Call Click}}`, trigger: phone trigger.
- Tag `Ads Conversion - WhatsApp Click`: same with the WhatsApp label and trigger.
- Tag `GA4 Event - call_click` (type GA4 Event), event name `call_click`, Measurement ID `{{GA4 Measurement ID}}`, trigger: phone trigger.
- Tag `GA4 Event - whatsapp_click`: same with `whatsapp_click` and the WhatsApp trigger.
