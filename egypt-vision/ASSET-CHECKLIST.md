# Asset, Authorisation & Verification Checklist

**Egypt Global Health & Longevity Initiative** · Build 2026-08-07-B

Nothing in this list blocks the page from working. Every pending item renders as an
elegant, clearly labelled placeholder or an explicit pending state. This checklist is
what turns a complete draft into a document ready to send to a minister.

---

## A. Photography — required

| Slot | Subject brief | Ratio | Pixels | File name to use | Status |
|---|---|---|---|---|---|
| `hero` | ~~Modern Cairo at dusk — the Nile corniche or the New Administrative Capital. Cinematic, wide, contemporary. No monuments, no pyramids.~~ Superseded at the owner's explicit direction: wired to an existing repo photo of hieroglyphic wall relief instead (see note below). | 16:9 | 1672 × 941 | wired to `/images/blocks-egyptian-DalalAkoury-Homecoming.jpg` | ✅ Live — see deviation note |
| `vision` | ~~Contemporary Egyptian architecture or new urban development. Vertical, restrained, human-scale.~~ Superseded at the owner's explicit direction: the Vision section was rebuilt as a full-bleed cinematic photo band rather than a 4:5 side panel — wired to an existing repo photo of an aircraft on an airport apron instead (see note below). | 16:9 | 1672 × 941 | wired to `/images/airplane-medical-tourism.jpg` | ✅ Live — see deviation note |
| `portrait` | Authentic professional photograph of Dr. Dalal Akoury. **An AI-generated or stock substitute for her face is not permitted under any circumstance.** | 4:5 | 1200 × 1500, ≤220 KB | wired to `/images/Dr_Dalal_Akoury_johnsoncity_TN_USA_Integrative_Medicine_Board-Certified_Physician.jpg` | ✅ **Verified rendering** — the file exists in the repo (1122 × 1402) and was confirmed loading in the built page |
| `og:image` | Social/share card. Wordmark and initiative name over a modern Egypt image or the navy/gold field. Legible at thumbnail size. | 1.91:1 | 1200 × 630, ≤200 KB | `assets/og/egypt-vision-share-1200x630.jpg` | ⚠️ Pending |

Alt text for all three photographic slots is already written in
`script.js` → `CONFIG.ASSETS` and will apply automatically.

**Sourcing rules for this page.** Licensed editorial or commercial stock only, or
photography the office owns outright. No hotlinking. No images of identifiable patients.
No private-event or celebrity photographs. No hospital, corporate, institutional or
government logos, seals or crests — the page carries none today and none should be added
without written authorisation from the owner.

**Already used from the repo.** The site logo (`/assets/images/logo-full.jpg`) appears in
the nav and footer exactly as on every other page, and Dr. Akoury's portrait above. No
other image is used.

**Optional additions.** If licensed photography becomes available for Egyptian clinical
environments, Egyptian physicians and scientists, Red Sea / Mediterranean recovery
settings, or luxury Egyptian hospitality, additional slots can be added in minutes using
the same `.plate` component — the pattern is documented in `styles.css` §9.

---

## B. Documents — required

| Item | Exact path | Status |
|---|---|---|
| Executive Concept Paper (PDF) | `/egypt-vision/assets/documents/egypt-global-health-longevity-executive-concept-paper.pdf` | ⚠️ Pending. Button reads “Final PDF Pending” until it exists **and** `PAPER.ready` is set to `true`. |
| Privacy Policy page | `/privacy-policy` — linked from the consent checkbox and the footer | ⚠️ Must exist before distribution |
| Terms / Legal Notice page | `/terms` — linked from the footer | ⚠️ Must exist before distribution |

Suggested download filename (already configured):
`Egypt-Global-Health-and-Longevity-Initiative-Executive-Concept-Paper.pdf`

---

## C. Contact details to confirm

| Item | Currently on the page | Action |
|---|---|---|
| Office email | `awaremed@gmail.com` | ⚠️ Confirm this is the right address for correspondence with Egyptian ministers, hospital leadership and investors — a dedicated address may be more appropriate for a document of this standing |
| Telephone | `+1 (423) 430-6170` | ⚠️ Confirm this is the right number for Egypt-facing correspondence; consider adding an Egypt number or WhatsApp line |
| Form notification recipient 1 | not set | ⚠️ Dr. Akoury's designated office recipient |
| Form notification recipient 2 | not set | ⚠️ Trichia |
| Languages line | “English · العربية · Français · Español” | ⚠️ Confirm which languages the office can actually correspond in |
| AR / FR / ES page translations | not supplied | ⚠️ The site language bar is present but AR/FR/ES are dimmed and inert until reviewed translations exist. Every text element already carries a `data-i18n` key, so supplying a `window.I18N` object is all that is needed. **Arabic matters for this audience — treat as high priority.** |

---

## D. Claims and credentials requiring Dr. Akoury's sign-off

Every biographical statement on the page was drawn from material already published
across her existing site and drafts. Nothing was invented. These are the specific claims
to confirm before the link is sent:

| Statement on the page | Confirm |
|---|---|
| “Born and educated in Egypt” | Correct wording? Earlier drafts specify **Alexandria** — naming the city is stronger, if she is comfortable with it |
| “More than four decades in medicine” | Correct as of 2026 |
| “Pediatric hematology and oncology **associated with** St. Jude Children's Research Hospital and Emory University” | The wording is deliberately careful. Confirm the exact nature and years of each affiliation, and whether it may be stated more precisely (e.g. “fellowship at…”) |
| “Integrative, functional, anti-aging and regenerative medicine” | Correct |
| “Founder of AWAREmed — a physician-led practice for complex and chronic conditions” | Correct |
| “International educator, author and speaker… across several continents” | Deliberately unquantified. If specific institutions, book titles or a publication count are to be named, supply the verified list |
| “Working relationships across medicine, leadership, entrepreneurship and international business” | Correct, and deliberately non-specific — no third party is named anywhere on this page |
| **The personal quotation** — “I did not come home merely to build another clinic…” | ⚠️ **Requires Dr. Akoury's explicit authorisation of the exact wording before publication.** It is presented as a direct quotation from her |

**Originally not on the page, by design** — ~~no statistics, no market-size figures, no
revenue projections, no patient volumes, no growth percentages~~ — no named hospitals, no
named individuals other than Dr. Akoury, no institutional logos remain absent. **This
changed at the owner's explicit direction** (see §G): the stats band under the hero now
carries four real-world sector figures. Confirm a citable source for each before this page
goes to a minister, physician or investor:

| Figure | Claim | Source |
|---|---|---|
| 440,000+ | Healthcare professionals (in Egypt, presumably) | ⚠️ **Unsourced** |
| 1,850+ | Hospitals across Egypt | ⚠️ **Unsourced** |
| 50+ | Medical specialties | ⚠️ **Unsourced** |
| 35,000 | Medical tourists in 2025 | ⚠️ **Unsourced** — also note 2025 isn't finished at time of writing, so this reads as either a projection or a partial-year count; whichever it is should be stated on the page |

If any of these can't be sourced to something citable, the original guidance still applies:
an unsourced number in this band would undermine exactly the audience it's written for.

---

## E. Endorsement and legal protections already built in

These are implemented in the page. Confirm they still read correctly after any edit.

- **No endorsement is stated or implied anywhere.** Sir Magdi Yacoub, the Sawiris family
  and companies, any Egyptian ministry, JT Foxx, Lamborghini, Memorial Hospital, and every
  other hospital, business, government body and public figure are **entirely absent from
  this page.** No names, no logos, no photographs, no allusions.
- All ten flagship components are explicitly labelled **“proposed for strategic
  discussion,”** with a standing notice stating that none represents an existing
  programme, agreement, partnership, licence or institutional commitment.
- The 90-day council and the pilot are described as **proposed** throughout.
- A clinical-and-regulatory notice states that all clinical programmes would be developed
  with appropriate Egyptian medical leadership, licensing, regulatory compliance, clinical
  governance, patient-safety oversight and evidence-guided standards.
- The footer carries three standing notices: **status of the document** (not an offer, not
  a solicitation of investment, no endorsement by anyone), **medical and professional
  notice** (no medical advice, no doctor–patient relationship, integrative approaches
  complementary to and never a replacement for conventional care, no outcome or return
  promised or guaranteed), and **names, marks and imagery** (no affiliation implied).
- The consent checkbox requires the sender to acknowledge that the page is a proposal for
  discussion and that no partnership, endorsement or approval is stated or implied.
- The investment pathway explicitly repeats that nothing on the page constitutes an offer
  or a solicitation of investment.

**Vocabulary discipline.** The page uses “proposed for strategic discussion,” “potential
areas of collaboration,” “invitation to participate,” “a proposed national platform,” and
“to be developed with appropriate leadership and governance.” It never uses “official
partner,” “endorsed by,” “in partnership with,” “government-approved” or “nationally
authorised.” Preserve this distinction in any future edit.

---

## F. Pre-send checklist

Before the link goes to a minister, a physician of standing, a developer or an investor:

- [ ] Form endpoint connected, and a live test submission received by both recipients
- [ ] Notification addresses confirmed for Dr. Akoury's office and Trichia
- [ ] Executive Concept Paper PDF uploaded and `PAPER.ready` set to `true`
- [ ] Hero and vision photography licensed, optimised and wired in
- [ ] `og:image` supplied — or accept a text-only share card
- [ ] `/privacy-policy` and `/terms` pages live
- [ ] Office email and telephone confirmed
- [ ] Dr. Akoury has approved her biography and authorised her personal quotation verbatim
- [x] `robots.txt` disallows `/egypt-vision/` while circulation is private — done at integration (see §G)
- [ ] The correct pathway URL is sent to each recipient (see `RECIPIENT-PATHWAYS.md`)
- [ ] The four stats-band figures (440,000+ healthcare professionals, 1,850+ hospitals,
      50+ specialties, 35,000 medical tourists in 2025) are confirmed against a citable
      source, and the 2025 figure's projected-vs-actual status is clarified — see §D

---

## G. Integration notes — what changed when this was wired into the live repo

These are notes from integrating this delivery into the actual drdalalakoury.com
repository, not part of the original delivery package:

- **Nav parity fix.** The reference package's copy of the site nav was missing
  three live items — "Questions" (Home dropdown), "About JT Foxx" and "The
  Partnership" (Egypt Coming Back dropdown) — and its Home-dropdown "Legacy"
  link pointed at `/legacy.html` instead of the homepage's own `#legacy`
  anchor. Both were corrected in `index.html` (desktop and mobile copies)
  against the live `index.html`/`coming-home.html` markup, then propagated to
  all five pathway pages via `node build-pathways.js`.
- **`robots.txt` created.** The live repo had no `robots.txt` at all, so one
  was added at the site root containing only `Disallow: /egypt-vision/` — a
  new file, not a modification of an existing one.
- **`single-file/` not shipped.** The reference package included six
  standalone single-file HTML exports for emailing/page-builder use. They
  were generated before the nav fix above and there is no script in this
  delivery to regenerate them, so shipping them would mean distributing
  pages with the missing nav items. They were left out of this integration;
  regenerate them from the corrected `index.html` if that edition is still
  wanted.
- **Not done, on purpose:** the other site pages' own nav copies
  (`coming-home.html`, `investment.html`, etc.) were **not** edited to add an
  `/egypt-vision/` link, per this delivery's private-review requirement that
  the page stay unlinked from primary nav — and per the standing rule that
  shared/existing files outside `/egypt-vision/` are not touched without
  separate approval. This page's own nav copy already marks itself current in
  the "Egypt Coming Back" dropdown, which is enough for anyone who lands on
  it directly to navigate the rest of the site.
- **Hero background wired to an existing repo photo, at the owner's explicit
  direction — deviates from the original subject brief.** The hero now uses
  `/images/blocks-egyptian-DalalAkoury-Homecoming.jpg` (a hieroglyphic wall
  relief) as a CSS `background-image` on `.hero-bg`, not the "modern Cairo
  skyline, no monuments, no pyramids" brief this file originally specified.
  That original brief existed specifically because `QA-REPORT.md` §7 and this
  page's own restrained-Egyptian-identity design intent called out avoiding
  pharaonic/monument imagery so the page reads as a modern, presidential
  proposal rather than a tourism piece for the minister/investor/physician
  audience it's written for. Flagging this here rather than silently updating
  the brief, since it's a deliberate reversal of that stated design intent —
  worth a second look before this link goes out widely. The pending-slot
  markup and its `CONFIG.ASSETS.hero` entry were removed since the hero no
  longer uses the JS-driven `.plate` asset-slot mechanism the `portrait`
  slot still uses (the `vision` slot no longer exists either — see below).
- **Vision section rebuilt as a full-bleed cinematic photo band, at the
  owner's explicit direction.** Previously a two-column layout (text +
  a 4:5 pending-image side panel). It's now a `min-height:clamp(680px,92vh,980px)`
  section with `/images/airplane-medical-tourism.jpg` as a plain `<img>`
  background layer, a two-axis navy overlay (strong on the text side,
  lighter over the photo), a left-aligned ~620px editorial text column, a
  staggered reveal (gold rule draw → eyebrow → headline → each paragraph →
  CTA, via CSS `transition-delay`, triggered once by IntersectionObserver),
  and a restrained scroll-linked parallax on the image (`transform:
  translateY()` driven by a passive scroll listener, clamped to ±64px) —
  the same technique as the site's own `.chapter` parallax in
  `assets/app.js`/`assets/style.css` (used on `coming-home.html`), ported
  into `egypt-vision/script.js`/`styles.css` as page-specific code rather
  than editing that shared file. No `background-attachment:fixed`
  anywhere; parallax and the reveal's transform/transition are skipped
  entirely under `prefers-reduced-motion:reduce` (content shows immediately,
  fully opaque, no motion). All existing copy (all three paragraphs and
  the "Read the strategic case" CTA) was preserved verbatim — only the
  CTA's button class changed, from `btn-dark` (styled for light
  backgrounds — its gold-ink text would be unreadable on navy) to
  `btn-ghost` (this stylesheet's existing dark-background button variant).
  The nine-item asset grid immediately below is unchanged, just now
  wrapped in its own `<section class="block bg-cream">` so it keeps the
  page's standard section padding independently of the cinematic band
  above it.
  Like the hero photo, this is a repo photo chosen for its composition
  (an aerial airport-apron shot), not literal Egypt imagery — flagged
  the same way for the same reason. An earlier candidate for this section,
  `Airplane-Egypt-Tourism.jpg`, was rejected before being wired in anywhere
  because it visibly showed United Airlines' wordmark and tail livery; this
  file is the same photograph with that branding removed.
- **Stats band changed from structural counts to sector statistics, at the
  owner's explicit direction — reverses a documented no-unsourced-numbers
  decision.** The four figures under the hero were originally "6 strategic
  pillars / 10 proposed components / 90 days to first findings / 1 governed
  pilot pathway" — counts of the proposal's own structure, called out in
  both the in-file HTML comment ("qualitative, no invented figures") and
  `QA-REPORT.md` §2 as deliberately containing zero market/patient/revenue
  numbers, precisely because this page goes to ministers, physicians and
  investors who would discount an unsourced statistic. They're now
  440,000+ healthcare professionals, 1,850+ hospitals, 50+ specialties,
  and 35,000 medical tourists in 2025 — real sector claims with no source
  attached on the page. The fourth figure is styled in red (`#ff5c5c`,
  ~6:1 against `--navy-deep`) as an intentional "flagged metric," per the
  request. See §D for the per-figure sourcing table and §F for the
  pre-send checklist item — none of these should go out to the page's
  actual audience unsourced.
