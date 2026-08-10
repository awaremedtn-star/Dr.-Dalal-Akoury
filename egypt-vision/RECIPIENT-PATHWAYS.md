# Personalised Recipient Pathways

**Egypt Global Health & Longevity Initiative** · Build 2026-08-07-B

Five tailored introductions to the same proposal. Approximately **80% of every pathway
page is identical to the master.** Only five things change: the hero eyebrow, the hero
lead paragraph, a personalised note band placed immediately under the hero, three
stakeholder-specific benefits, and the wording of the strategic-briefing invitation. The
matching stakeholder tab also opens by default, and form submissions are tagged so the
office knows which introduction the recipient received.

**No pathway names, addresses or implies anything about the individual recipient**, and
none suggests that the recipient supports the initiative. They tailor the *framing*, never
the *claims*.

To edit any of this copy: `script.js` → `CONFIG.PATHWAYS`. No rebuild required.
To preview without deploying: `/egypt-vision/index.html?pathway=government`

---

## 1. Health & Medical Leadership

**URL:** `https://drdalalakoury.com/egypt-vision/health`
**Form tag:** `egypt-vision-health` · **Opens tab:** Medical & Scientific

**Eyebrow:** Prepared for Egypt's Medical Leadership

**Hero lead:** A strategic initiative to connect Egypt's clinical excellence, precision
diagnostics, longevity medicine and international patient care into one coordinated,
governed ecosystem.

**Note — “The clinical case comes first.”** This proposal is written on the assumption
that nothing proceeds unless it improves the standard of care. What follows is offered to
Egypt's physicians and scientific leaders for examination — the coordination problem it
describes, the governance it proposes, and the question of whether a single well-designed
pathway is worth building first.

**Three benefits:**
1. Structured collaboration between Egyptian centres of excellence, with shared standards and shared records
2. International research, teaching and fellowship partnerships that keep Egyptian talent in Egypt
3. Genuine continuity of care for international patients — properly prepared before arrival, properly followed after departure

**Invitation:** Dr. Akoury welcomes the opportunity to present this vision privately to
Egypt's medical and scientific leadership, to hear where the clinical priorities actually
lie, and to explore whether a carefully governed pilot pathway would be worth designing
together.

---

## 2. Tourism & Hospitality

**URL:** `https://drdalalakoury.com/egypt-vision/tourism`
**Form tag:** `egypt-vision-tourism` · **Opens tab:** Tourism & Hospitality

**Eyebrow:** Prepared for Egypt's Tourism & Hospitality Leadership

**Hero lead:** A strategic initiative to extend Egypt's hospitality excellence into
health, longevity and recovery travel — longer stays, year-round demand, and a premium
segment no competing destination has yet organised.

**Note — “A visitor who stays three weeks, not three days.”** Health travel changes the
economics of a visit: longer stays, off-season demand, an accompanying family, and
services Egyptian hospitality already delivers exceptionally well. This proposal asks what
it would take to organise that opportunity properly — and whether Egypt's hospitality
leadership sees the same opening.

**Three benefits:**
1. Higher-value visitors staying substantially longer, travelling outside the conventional season
2. New service lines in clinical nutrition, recovery, rehabilitation and family support
3. Wellness and recovery destinations along the Mediterranean and Red Sea that extend well beyond resort tourism

**Invitation:** Dr. Akoury welcomes the opportunity to present this vision privately to
Egypt's tourism and hospitality leadership, to understand current priorities across the
sector, and to explore whether a carefully governed pilot could open a durable premium
segment for Egypt.

---

## 3. Government & National Development

**URL:** `https://drdalalakoury.com/egypt-vision/government`
**Form tag:** `egypt-vision-government` · **Opens tab:** Government & Ministries

**Eyebrow:** Prepared for Egypt's National Leadership

**Hero lead:** A strategic initiative to organise Egypt's existing medical, hospitality
and development capabilities into a coordinated national health and longevity sector — an
export industry built from assets the country already holds.

**Note — “An export industry Egypt can build from what it already has.”** This proposal
does not ask Egypt to build a new health system. It asks whether existing national
strengths — clinical, hospitality, geographic and developmental — could be coordinated
under one set of standards to earn foreign currency, create skilled employment and raise
domestic quality at the same time. It is presented for consideration, not as a plan
requiring approval.

**Three benefits:**
1. Foreign-currency revenue from longer-staying, higher-value international visitors
2. Skilled job creation and professional retention across clinical, hospitality and technology roles
3. Stronger national quality, navigation and patient-protection standards, with clear public–private accountability

**Invitation:** Dr. Akoury welcomes the opportunity to present this vision privately to
Egypt's national leadership, to listen to current national priorities, and to explore
whether a carefully governed collaborative pilot could advance the country's health,
tourism, development and international-positioning objectives.

---

## 4. Investment & Real Estate

**URL:** `https://drdalalakoury.com/egypt-vision/investment`
**Form tag:** `egypt-vision-investment` · **Opens tab:** Developers & Investors

**Eyebrow:** Prepared for Egypt's Developers & International Investors

**Hero lead:** A strategic initiative to open an asset class that is well established
internationally and largely unbuilt in this region: longevity communities, medical
districts, wellness resorts and recovery residences, anchored to real clinical demand.

**Note — “Demand driven by need, not by season.”** Health-linked development behaves
differently from conventional hospitality or residential product: occupancy is less
seasonal, stays are longer, and demand is driven by need rather than discretionary
spending. This proposal sets out the categories, and proposes proving demand through a
single pilot pathway before any capital is committed.

**Three benefits:**
1. Longevity communities, healthy-ageing residential development and recovery residences
2. Medical and innovation districts anchored to clinical institutions and international patient flow
3. A phased, evidence-led sequence — pilot demand established first, capital deployment second

**Invitation:** Dr. Akoury welcomes the opportunity to present this vision privately to
Egypt's developers and to international investors, to understand how each assesses this
category, and to explore whether a carefully governed pilot would produce the evidence a
serious investment case requires. **Nothing on this page constitutes an offer or a
solicitation of investment.**

> This pathway carries an explicit non-solicitation sentence in the invitation itself, in
> addition to the standing footer notice. Do not remove it.

---

## 5. Media & Global Positioning

**URL:** `https://drdalalakoury.com/egypt-vision/media`
**Form tag:** `egypt-vision-media` · **Opens tab:** Media & Positioning

**Eyebrow:** Prepared for Egypt's Media & Global-Positioning Leadership

**Hero lead:** A strategic initiative — and with it, an untold international story: modern
Egyptian medicine, science and capability, told through evidence rather than assertion.

**Note — “Egypt's story is still told through its past.”** The world knows Egypt's history
extraordinarily well and its present hardly at all. Modern Egyptian medicine, science and
institutional capability are a genuinely undertold story — and an unusually credible one,
because it can be evidenced. This proposal describes the initiative; the narrative
opportunity around it is offered for discussion.

**Three benefits:**
1. A compelling international narrative about modern Egypt, grounded in verifiable capability
2. Human-interest storytelling built around real patients, real clinicians and diaspora reconnection
3. A positioning platform that supports tourism, investment and diplomatic objectives simultaneously

**Invitation:** Dr. Akoury welcomes the opportunity to present this vision privately to
Egypt's media and global-positioning leadership, to understand how the story is best told,
and to explore whether this initiative could support a broader international narrative
about modern Egypt.

---

## Which link to send

| Recipient type | Send |
|---|---|
| Ministry of Health and Population; Ministry of Tourism and Antiquities; national development bodies | `/egypt-vision/government` |
| Physicians of standing, hospital leadership, medical and scientific institutions | `/egypt-vision/health` |
| Hotel groups, resort operators, tourism boards, hospitality leadership | `/egypt-vision/tourism` |
| Developers, real-estate groups, family offices, international investors | `/egypt-vision/investment` |
| Editors, broadcasters, publishers, communications leadership | `/egypt-vision/media` |
| Anyone who spans several of the above, or where the framing is uncertain | `/egypt-vision` (the master page) |

**Adding a sixth pathway** takes about five minutes: add an entry to `CONFIG.PATHWAYS` in
`script.js`, add a matching entry to `PATHWAYS` in `build-pathways.js`, and re-run
`node build-pathways.js`.
