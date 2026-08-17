# Egypt Global Health & Longevity Initiative — Developer Handoff

**Build 2026-08-07-B** · Master URL: `https://drdalalakoury.com/egypt-vision`
**Status: private strategic proposal — ships in private-review mode (`noindex, nofollow`).**

---

## 1. What this is

A native page of **drdalalakoury.com** plus five personalised recipient variants. No build
step, no framework, no dependencies, no third-party scripts, no cookies, no tracking.

**It is not a visitor to the site — it is part of it.** The palette, type scale, buttons,
section rhythm, FTC disclosure bar, language bar, primary nav (with its dropdowns and
mobile accordion) and footer are taken **verbatim from the site homepage** (`index.html`):

| | |
|---|---|
| Display type | Cormorant Garamond |
| Body type | Montserrat |
| Grounds | `--cream-soft #faf7f0`, `--cream #f7f3ea`, `--white`, `--navy #0f1b33`, `--navy-deep #0a1425` |
| Gold | `--gold #c9a55c`, `--gold-light #d4af7a`, `--gold-pale #f0e4c4`, `--gold-deep #9a7b3e` |
| Nav chrome | `--lapis #16305C`, `--lapis-deep #0C1B33` |
| Container | `.container` max-width 1200px |

The page loads the site's shared **`/assets/app.js`**, so the sticky nav, the nav
dropdowns, the mobile burger menu, reveal-on-scroll and `setLang()` are the site's own
code — not a second implementation that could drift out of sync.

`egypt-vision/styles.css` contains those shared tokens and chrome (section 1–2, copied
verbatim), then the page-specific work below a clearly marked divider. It deliberately
does not `@import` `/assets/style.css`, for the same reason the homepage doesn't: that
file is the older lapis/papyrus "Egypt Vision Brand Book" system used by
`coming-home.html`, `investment.html`, `legacy.html` and `media.html`, whereas the
homepage — and now this page — use the newer navy/cream/Montserrat system.

---

## 2. Where the files go

Copy the whole `egypt-vision/` folder to the web root, so it sits alongside `index.html`:

```
/                                            ← existing site root (drdalalakoury.com)
├── index.html                               ← existing, untouched
├── dr-akoury-bio.html                       ← existing, untouched
├── assets/…                                 ← existing, untouched
├── images/…                                 ← existing, untouched
│
└── egypt-vision/                            ← NEW — everything below is this delivery
    ├── index.html                           ← the master proposal page
    ├── styles.css                            ← site tokens + chrome, then page styles
    ├── script.js                            ← ALL configuration lives at the top of this file
    ├── build-pathways.js                    ← regenerates the 5 variants; not served
    │
    ├── health/index.html                    ← generated · /egypt-vision/health
    ├── tourism/index.html                   ← generated · /egypt-vision/tourism
    ├── government/index.html                ← generated · /egypt-vision/government
    ├── investment/index.html                ← generated · /egypt-vision/investment
    ├── media/index.html                     ← generated · /egypt-vision/media
    │
    ├── assets/
    │   ├── documents/                       ← the executive concept-paper PDF goes here
    │   ├── images/egypt/                    ← licensed modern-Egypt photography
    │   ├── images/dr-akoury/                ← Dr. Akoury's own photographs
    │   └── og/                              ← the 1200 × 630 social-share image
    │
    ├── KYLE-HANDOFF.md                      ← this file (do not deploy)
    ├── ASSET-CHECKLIST.md                   ← (do not deploy)
    ├── RECIPIENT-PATHWAYS.md                ← (do not deploy)
    └── QA-REPORT.md                         ← (do not deploy)
```

The four `.md` files are documentation. Delete them from the server or leave them —
they are unlinked and `noindex`, so they are harmless either way.

**Local preview — important:** serve the **site root**, not this folder:

```bash
npx --yes serve . -l 5000        # run from the repo root, alongside index.html
# then open http://localhost:5000/egypt-vision/
```

Every path in the page is root-absolute (`/assets/style-tokens…`, `/assets/app.js`,
`/assets/images/logo-full.jpg`, `/images/…`, `/egypt-vision/styles.css`) because the page
lives one level down. Opening `egypt-vision/index.html` directly as a `file://` URL will
show unstyled text — that is expected, not a fault.

---

## 3. Pretty URLs

The five variants are real folders with `index.html` inside, so `/egypt-vision/health`
resolves on Apache, Nginx, Netlify, Vercel, Cloudflare Pages and GitHub Pages with **no
configuration at all**. Nothing to add unless the host disables directory indexes.

If the host strips trailing behaviour, add one line:

- **Apache** (`.htaccess`): `DirectoryIndex index.html`
- **Nginx**: `index index.html;`

---

## 4. Connecting the form  ⚠️ REQUIRED BEFORE SENDING TO ANYONE

The form is **fully built and fully validating**, but it is not yet posting anywhere.
This is deliberate and visible, not an oversight.

**Right now (SAFE MODE):** the form validates every field, then opens the visitor's mail
client with the whole inquiry pre-composed to `vip@drdalalakoury.com`, and shows the success
state. Nothing is silently swallowed and nothing pretends to reach a server that does not
exist.

**To go live:** open `script.js` and set one value at the very top:

```js
FORM: {
  endpoint: "https://services.leadconnectorhq.com/hooks/XXXXXXXX",   // ← paste here
  method: "POST",
  fallbackEmail: "vip@drdalalakoury.com",
},
```

The page then sends a JSON `POST` with exactly these fields:

| Field | Notes |
|---|---|
| `source` | `egypt-vision-master`, or `egypt-vision-government` etc. — tells you which introduction the recipient received |
| `full_name`, `official_title`, `organization` | required |
| `email` | required, validated |
| `phone` | optional (telephone / WhatsApp) |
| `country` | required |
| `meeting_format` | required |
| `area_of_interest` | required, one of the eight listed options |
| `message` | optional |
| `privacy_ack` | `"acknowledged"` |
| `page`, `submitted_at` | the URL and an ISO timestamp |

A hidden honeypot field (`company_website`) silently drops bot submissions and is never
included in the payload.

**Works with:** a GoHighLevel inbound webhook, Formspree, a Netlify Function, a
Zapier/Make webhook, or any endpoint accepting a JSON POST. If the POST fails, the
visitor sees a clear message directing them to write to the fallback address — the
inquiry is never lost in silence.

### Notifications — ADDRESSES STILL PENDING

Configure these on the **endpoint** side (GoHighLevel workflow, Zapier action, etc.),
not in the page:

1. **Dr. Akoury's designated office recipient** — ⚠️ address to be confirmed
2. **Trichia** — ⚠️ address to be confirmed

Until those two addresses are confirmed, leave `endpoint` empty so the form stays in
safe mode and everything routes to `vip@drdalalakoury.com`.

---

## 5. The Executive Concept Paper PDF

The download module is built and prominent, and the button currently reads
**“Executive Concept Paper — Final PDF Pending.”** It does not request the file, so
there is no 404 and no dead download.

To activate it:

1. Place the PDF at exactly:
   `/egypt-vision/assets/documents/egypt-global-health-longevity-executive-concept-paper.pdf`
2. In `script.js`, change `PAPER: { ready: false` to `ready: true`.

The button label, the `download` attribute (suggested filename
`Egypt-Global-Health-and-Longevity-Initiative-Executive-Concept-Paper.pdf`), the pending
badge and the helper note all update automatically.

---

## 6. Photography

Three photographic slots exist. Each renders an elegant, clearly labelled placeholder
that names the exact subject and the required dimensions — and **makes no network
request while pending**, so the page never 404s or shows a broken image.

To go live, put a path into `script.js` → `CONFIG.ASSETS`:

```js
hero:     { src: "/egypt-vision/assets/images/egypt/cairo-skyline-dusk.jpg", … }
vision:   { src: "/egypt-vision/assets/images/egypt/new-capital-architecture.jpg", … }
portrait: { src: "/images/Dr_Dalal_Akoury_johnsoncity_TN_USA_Integrative_Medicine_Board-Certified_Physician.jpg", … }
```

`portrait` is **already pointed at an authentic photograph that exists in the site
repository**. Confirm the file is present at that path on the live server before sending
the link out. If it is missing the placeholder returns automatically rather than breaking.

Below-the-fold images lazy-load; the hero loads eagerly with high fetch priority. Full
subject briefs, aspect ratios, pixel targets and licensing status are in
**`ASSET-CHECKLIST.md`**.

---

## 7. Private review vs. public launch

Ships in **private-review mode**. Two things change for a public launch:

1. **`index.html` `<head>`** — swap the robots line for the commented-out alternative
   directly beneath it (`index, follow, max-image-preview:large, max-snippet:-1`), then
   re-run `node build-pathways.js` to propagate it to all five variants.
2. **Remove the ribbon** — delete the `<div class="proposal-bar">…</div>` block near the
   top of `<body>`, and the `Private Strategic Proposal` chip in the footer. The site's
   standard `.ftc` disclosure bar above it stays.

While in private-review mode, also add to `robots.txt`:

```
User-agent: *
Disallow: /egypt-vision/
```

The `og:image` currently points at a file that does not exist yet. Until it is supplied,
links shared in WhatsApp/LinkedIn/iMessage will show a title-and-text card with no
picture — acceptable for private circulation, but supply the image before any public share.

---

## 8. Regenerating the five recipient pages

`index.html` is the single source of truth. The variants are generated:

```bash
cd egypt-vision
node build-pathways.js
```

- Changing **structure or shared copy** → edit `index.html`, then re-run the script.
- Changing **personalised copy** (eyebrow, intro, three benefits, invitation) → edit
  `script.js` → `CONFIG.PATHWAYS`. **No rebuild needed.**

To preview any variant instantly without deploying:
`/egypt-vision/index.html?pathway=government`

---

## 9. Languages — read this before sending

The site's EN/AR/FR/ES language bar appears on this page because it appears on every
page. **This proposal has not been translated yet**, and a half-translated legal and
strategic document is worse than an English one.

So `script.js` → `CONFIG.LANGUAGES.translated` is `false`, and the AR/FR/ES buttons render
dimmed and inert with an explanatory tooltip rather than silently producing English text
inside a right-to-left layout.

Arabic matters a great deal for this audience. When reviewed translations are ready,
supply a `window.I18N` object in the same shape the other site pages use (keyed on the
`data-i18n` attributes already present on every text element in this page), then set
`translated: true`. Nothing else needs to change.

---

## 10. Browser support & performance

Tested in Chromium at 1440, 1360, 1280, 1024, 768, 390 and 360 px. Uses only
widely-supported CSS (grid, custom properties, `clamp()`, `aspect-ratio`,
`backdrop-filter`) — current Chrome, Safari, Firefox and Edge all render it identically.
`backdrop-filter` degrades to a solid navy bar in anything that lacks it.

- No JavaScript framework, no polyfills, ~10 KB of page-specific JS on top of the site's
  existing `app.js`.
- Four network requests beyond the HTML: `styles.css`, `/assets/app.js`, the site logo,
  and the Google Fonts stylesheets the site already loads on every page.
- No layout shift: every image slot has a fixed aspect ratio reserved in CSS before the
  image arrives.
- All decoration (the Egyptian lattice, the select chevron, the success tick) is inline
  SVG — zero image requests.
- `prefers-reduced-motion: reduce` disables every transition and reveal.
- A print stylesheet is included: the page prints as a clean document on white, with
  navigation, form and decorative imagery suppressed and all five stakeholder panels
  expanded.

---

## 11. Known-pending items — read before sending this link to anyone

1. Form endpoint not connected (safe mode) — **§4**
2. Notification addresses for Dr. Akoury's office and Trichia not confirmed — **§4**
3. Executive Concept Paper PDF not supplied — **§5**
4. Hero and vision photography not supplied — **ASSET-CHECKLIST.md**
5. `og:image` share graphic not supplied — **ASSET-CHECKLIST.md**
6. `/privacy-policy` and `/terms` pages linked in the footer must exist — **ASSET-CHECKLIST.md**
7. Office email and telephone marked `VERIFY` in `index.html` need confirming
8. Dr. Akoury's biographical details and her personal quotation need her sign-off —
   **ASSET-CHECKLIST.md**
9. Arabic, French and Spanish translations not supplied — **§9**
10. Add `/egypt-vision` to the site nav's "Egypt Coming Back" dropdown on the **other**
    pages too, so the page is reachable from anywhere on the site. This page already
    lists it; the other pages' navs are separate copies and need the same one-line entry:
    `<li><a href="/egypt-vision/">Egypt Vision</a></li>`
