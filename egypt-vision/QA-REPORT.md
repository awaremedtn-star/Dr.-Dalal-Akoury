# Quality-Assurance Report

**Egypt Global Health & Longevity Initiative** · Build 2026-08-07-B
Automated against headless Chromium 1194, served from a real site root so every
root-absolute path resolves exactly as it will in production. Every check below was
executed, not asserted.

---

## 1. Native to drdalalakoury.com — verified in the built page

| Check | Result |
|---|---|
| Body typeface | ✅ `Montserrat, system-ui, sans-serif` — identical to the homepage |
| Display typeface | ✅ `"Cormorant Garamond", Georgia, serif` — identical to the homepage |
| Page ground | ✅ `rgb(250, 247, 240)` = `--cream-soft #faf7f0` — identical to the homepage |
| FTC disclosure bar | ✅ Present, site-standard styling, wording adapted to this page |
| Language bar (EN/AR/FR/ES) | ✅ Present, site-standard |
| Primary nav | ✅ Site-standard, 3 dropdown groups, "Egypt Coming Back" marked current |
| Site logo — nav | ✅ `/assets/images/logo-full.jpg` loads |
| Site logo — footer | ✅ Loads |
| Shared behaviour | ✅ `/assets/app.js` loaded; `window.setLang` is a function |
| Nav dropdown | ✅ Opens on click, menu `visibility: visible`, closes on Escape — driven by the site's own `app.js`, not a second implementation |
| Mobile burger menu | ✅ `#mnav` `display:none` → `block` on tap, `.open` applied — the site's own burger |
| Reveal-on-scroll | ✅ Site's `.reveal` / `.in` mechanism, observed by `app.js` |

---

## 2. Content verification

| Check | Result |
|---|---|
| All 13 required sections present | ✅ Sticky nav (site nav + section subnav) · cinematic hero · executive vision · strategic opportunity · six pillars · flagship initiative · stakeholder pathways · proposed pilot · Dr. Akoury · governance · invitation · contact form · footer |
| No section of the brief omitted | ✅ Nine Egyptian advantages, ten proposed platform components, five stakeholder audiences, seven council objectives — all present |
| Placeholder / filler text | ✅ **None.** Automated sweep for `lorem ipsum`, `tbd`, `xxx`, `placeholder text`, `todo`, `[insert` returned zero matches |
| Names and titles | ✅ Consistent throughout |
| Credentials flagged for verification | ✅ Eight biographical claims and the personal quotation itemised in `ASSET-CHECKLIST.md` §D |
| Unsupported statistics | ✅ **Zero numeric claims.** The four figures in the stats band (6 pillars, 10 components, 90 days, 1 pilot pathway) describe the proposal's own structure — nothing about markets, revenue or patients |
| Endorsement implied anywhere | ✅ **None.** No ministry, hospital, company or public figure other than Dr. Akoury appears anywhere — no names, no logos, no photographs, no allusions |
| Heading hierarchy | ✅ One `h1`; `h2` per section; `h3`/`h4` nested correctly; no skipped levels |

---

## 3. Functional verification

| Check | Result |
|---|---|
| Internal anchor integrity | ✅ **64 links audited, 0 broken** |
| Section subnav | ✅ All 8 items scroll correctly; scrollspy sets `aria-current` and keeps the active item visible in the horizontally scrolling rail |
| Every CTA points somewhere real | ✅ Hero (2), invitation (3), subnav (1), nav (1), footer (14), in-body — all resolve to a section, a site page, a `mailto:`, or a documented pending state |
| Form validation — empty submit | ✅ 8 fields flagged, error banner shown, focus moved to first bad field, success **not** shown |
| Form validation — malformed email | ✅ Caught on blur and on submit |
| Form validation — valid submit (safe mode) | ✅ Success state shown, form hidden, inquiry composed to the fallback address |
| Form validation — valid submit (live endpoint) | ✅ Stubbed endpoint received a clean 13-field JSON payload; honeypot correctly stripped |
| Stakeholder tabs | ✅ Full ARIA tab pattern — click, arrow keys, Home/End; exactly one panel visible |
| Concept-paper button | ✅ Explicit pending label, `is-pending` class, and **no request** for the missing PDF |
| Language buttons | ✅ EN active; AR/FR/ES `aria-disabled="true"` with explanatory `title`, `onclick` removed — no half-translated RTL page is reachable |
| Asset slots | ✅ Two pending slots render the labelled placeholder and issue **no network request**; the portrait slot loads Dr. Akoury's real photograph (1122 × 1402), verified at all four capture widths |
| Broken asset paths | ✅ None |
| **HTTP 4xx responses** | ✅ **Zero**, across all breakpoints, all five pathway pages and every interaction |
| **JavaScript console errors** | ✅ **Zero** |
| **Uncaught page errors** | ✅ **Zero** |
| Pathway engine | ✅ All 5 variants inject the correct eyebrow, lead, note, 3 benefits and invitation; open the correct stakeholder tab; tag the form correctly |

---

## 4. Responsive verification

| Width | Horizontal overflow | Sub-10px text | Targets < 24px |
|---|---|---|---|
| 1440 px desktop | ✅ none | ✅ none | ✅ none |
| 1360 px laptop | ✅ none | ✅ none | ✅ none |
| 1280 px laptop | ✅ none | ✅ none | ✅ none |
| 1024 px tablet landscape | ✅ none | ✅ none | ✅ none |
| 768 px tablet | ✅ none | ✅ none | ✅ none |
| 390 px mobile | ✅ none | ✅ none | ✅ none |
| 360 px small mobile | ✅ none | ✅ none | ✅ none |

No overlapping text, no clipped buttons, CTAs go full-width below 640 px, image slots
re-crop from 4:5 to 3:2 as the viewport narrows, and every interactive target meets the
WCAG 2.2 §2.5.8 24 × 24 minimum.

### Defects found and fixed during QA

1. **Lazy-loaded images never loaded at all.** A detached `new Image()` carrying
   `loading="lazy"` never begins its fetch — the lazy-load algorithm requires the element
   to be in a document. Dr. Akoury's portrait silently stayed as a placeholder. The loader
   now builds the `<img>` in place before setting `src`.
2. **Horizontal overflow at 390 px and 360 px.** A `<select>` is sized by its longest
   option, and grid items default to `min-width: auto`, so the form track was forced 32 px
   wider than the viewport. Fixed with an explicit min-width guard on every grid and flex
   track.
3. **Empty grid cell after objective 07** — the seventh objective now spans the full row.
4. **Biography facts rendered as a broken two-column split** — the flex container was
   separating each `<b>` from its trailing text. Rebuilt as a positioned bullet.
5. **Text-only split columns vertically centred**, leaving the two columns misaligned.
   Now top-aligned.
6. **Hero headline dominated the fold**, pushing the CTAs and attribution out of view.
   Retuned so the whole hero resolves in one screen.
7. **Sub-10px text** in four places, raised to a 10 px floor.

---

## 5. Accessibility (WCAG 2.2 AA)

| Check | Result |
|---|---|
| **Colour contrast** | ✅ **Every text element passes AA**, verified by computing the actual composited contrast ratio for each rendered element. During QA the brand gold `#c9a55c` was found to measure only **2.2:1** on the cream sections, and `--gold-deep #9a7b3e` only **3.7:1** — both below AA. A deeper bronze `#7a5f2c` (**5.4:1**) was introduced as `--gold-ink` for gold-coloured text on light grounds; the brand golds are retained unchanged on navy, where they pass comfortably |
| Semantic HTML | ✅ `header`/`nav`/`main`/`section`/`article`/`aside`/`footer`, ordered lists for ordered content, `figure`/`figcaption` for imagery |
| Skip link | ✅ Present, visible on focus |
| Visible keyboard focus | ✅ 2 px gold outline with offset on every interactive element |
| Keyboard navigation | ✅ Whole page operable by keyboard. Tabs use arrow/Home/End. In-page jumps move focus to the destination. Escape closes the nav dropdowns |
| Form labels | ✅ Every control has an associated `<label>`; zero unlabelled inputs |
| Error handling | ✅ `role="alert"`, `aria-describedby`, `aria-invalid`, and never colour alone — a marker glyph and text accompany every error |
| Success state | ✅ `role="status"` + `aria-live="polite"`, receives focus |
| Image alt text | ✅ Zero images without `alt`. Decorative layers are `aria-hidden` |
| Tab interface | ✅ Complete `tablist`/`tab`/`tabpanel` pattern with roving `tabindex` |
| Reduced motion | ✅ `prefers-reduced-motion: reduce` disables every transition and reveal, and turns off smooth scrolling. Verified with the media feature emulated |
| Without JavaScript | ✅ All content, navigation and anchors work. The form shows a `<noscript>` notice directing the visitor to write directly |
| Language honesty | ✅ AR/FR/ES are disabled rather than serving English inside an RTL layout |

---

## 6. Performance

| Check | Result |
|---|---|
| Cumulative layout shift | ✅ None expected — every image slot reserves its space via `aspect-ratio` before the image loads |
| Third-party scripts | ✅ **None.** No analytics, no tag manager, no chat widget, no cookies |
| Page-specific JavaScript | ✅ ~10 KB on top of the site's existing `app.js`; no framework, no polyfills, deferred |
| Network requests beyond the HTML | ✅ `styles.css`, `/assets/app.js`, the site logo, and the two Google Fonts stylesheets the site already loads everywhere |
| Decorative graphics | ✅ All inline SVG — the Egyptian lattice, the select chevron, the nav chevrons and the success tick cost zero image requests |
| Lazy loading | ✅ Below-the-fold images lazy-load correctly (verified loading on scroll); the hero slot is eager with high fetch priority |
| Autoplay video with sound | ✅ None — no video at all |
| 404s on internal assets | ✅ **Zero** |
| Print | ✅ A dedicated print stylesheet produces a clean white document with the nav, subnav, language bar, form and decorative imagery suppressed and all five stakeholder panels expanded. Verified by generating an A4 PDF |

---

## 7. Visual verification

- **Indistinguishable from the rest of drdalalakoury.com** at first glance — same logo,
  same disclosure and language bars, same nav, same typefaces, same cream-and-navy rhythm,
  same button treatment, same footer.
- **Presidential and internationally credible** — Cormorant Garamond display type at
  generous scale, wide margins, hairline rules, one idea per band.
- **Restrained Egyptian identity** — a single fine interlocking-lattice geometry at 6–10%
  opacity in four places. No pyramids, no papyrus, no pharaonic motifs, no metallic effects.
- **Gold is elegant, not excessive** — hairlines, numerals, small labels and the site's own
  gold button. It never fills a large area.
- **Authentic imagery only** — Dr. Akoury's real photograph and the real site logo. Where
  licensed photography does not yet exist, the placeholder states the exact subject
  required rather than substituting stock or AI imagery.
- **Mobile treated with equal care** — the site's own burger menu, a horizontally scrolling
  section rail, full-width CTAs, re-cropped imagery, tightened gutters at 380 px.

---

## 8. Outstanding — cannot be closed from inside the code

Documented in `ASSET-CHECKLIST.md`. These are the only items standing between this build
and a link that can be sent to a minister.

1. Form endpoint not connected (deliberate safe mode)
2. Notification addresses for Dr. Akoury's office and Trichia not confirmed
3. Executive Concept Paper PDF not supplied
4. Hero and vision photography not licensed
5. `og:image` share graphic not supplied
6. `/privacy-policy` and `/terms` pages must exist
7. Office email and telephone to be confirmed
8. Dr. Akoury's biography and personal quotation require her sign-off
9. Arabic, French and Spanish translations not supplied
10. The other pages' nav copies need `/egypt-vision` added to the "Egypt Coming Back"
    dropdown so the page is reachable from anywhere on the site
