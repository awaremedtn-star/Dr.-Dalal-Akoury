/* ============================================================================
   EGYPT GLOBAL HEALTH & LONGEVITY INITIATIVE  —  /egypt-vision/script.js
   Build 2026-08-07-B

   ┌──────────────────────────────────────────────────────────────────────────┐
   │  KYLE — EVERYTHING YOU NEED TO CHANGE IS IN THE "CONFIG" BLOCK BELOW.    │
   │  Nothing beneath the CONFIG block needs editing for a normal launch.     │
   └──────────────────────────────────────────────────────────────────────────┘

   This file deliberately does NOT re-implement the sticky nav, the nav
   dropdowns, the mobile accordion, reveal-on-scroll or setLang() — the site's
   shared /assets/app.js already provides all of those, and this page loads it.
   What lives here is only what is specific to the proposal page.

   No external dependencies. No third-party scripts. No cookies. No tracking.
   ========================================================================== */

/* ============================ CONFIG — EDIT HERE ========================== */
const CONFIG = {

  /* ---------------------------------------------------------------- 1. FORM
     Paste the endpoint that should receive the strategic-inquiry form.
     Leave as "" and the form stays in SAFE MODE: it validates fully, but on
     submit it opens a pre-filled email to FORM.fallbackEmail instead of
     posting anywhere. It never silently pretends to have sent something.     */
  FORM: {
    endpoint: "",                          // e.g. "https://services.leadconnectorhq.com/hooks/XXXX"
    method: "POST",
    fallbackEmail: "awaremed@gmail.com",   // VERIFY before distribution
    // Notification recipients are configured on the ENDPOINT side, not here:
    //   1. Dr. Akoury's designated office recipient  — ADDRESS PENDING
    //   2. Trichia                                    — ADDRESS PENDING
  },

  /* ------------------------------------------------------- 2. CONCEPT PAPER
     Set ready:true only once the PDF actually exists at `path`.
     While ready:false the button shows an explicit pending label and does not
     request the file — so there is never a 404 and never a dead download.    */
  PAPER: {
    ready: false,
    path: "/egypt-vision/assets/documents/egypt-global-health-longevity-executive-concept-paper.pdf",
    filename: "Egypt-Global-Health-and-Longevity-Initiative-Executive-Concept-Paper.pdf"
  },

  /* ------------------------------------------------------------- 3. ASSETS
     Photographic slots. A slot with an empty string renders the labelled
     placeholder already in the HTML and makes NO network request.
     Fill in a path to go live. Below-the-fold images lazy-load.
     Full subject briefs and licensing status: ASSET-CHECKLIST.md

     The hero background and the Vision section's cinematic photo are no
     longer slots here — they're plain CSS/HTML <img>s (.hero-bg and
     .vision-cine-img in styles.css/index.html), not JS-loaded, so there is
     nothing to configure here for either of them.                         */
  ASSETS: {
    portrait: {
      /* An authentic, owned photograph of Dr. Akoury that already exists in
         the site repository. Confirm it is live on the server before launch;
         if it is missing the placeholder returns automatically. */
      src: "/images/Dr_Dalal_Akoury_johnsoncity_TN_USA_Integrative_Medicine_Board-Certified_Physician.jpg",
      alt: "Dr. Dalal Akoury, MD — Egyptian-American physician and global health strategist"
    }
  },

  /* ------------------------------------------------------- 4. TRANSLATIONS
     The site's language bar (EN/AR/FR/ES) appears on every page. This page's
     Arabic, French and Spanish versions have NOT been translated yet, and a
     half-translated legal/strategic document is worse than an English one.

     While `translated` is false, the AR/FR/ES buttons render as unavailable
     with an explanatory title rather than silently producing English text in
     a right-to-left layout. Set it to true once a window.I18N object with
     reviewed translations is supplied (same shape as the other site pages).  */
  LANGUAGES: {
    translated: false,
    pendingTitle: "Arabic, French and Spanish versions of this proposal are in preparation."
  },

  /* ------------------------------------------------ 5. RECIPIENT PATHWAYS
     Five tailored introductions. Roughly 80% of the page is identical across
     all of them — only the hero eyebrow, the hero lead, a short personalised
     note, three stakeholder-specific benefits and the briefing invitation
     change.

     A pathway is selected by (in order of precedence):
       1. <body data-pathway="health">           ← what build-pathways.js writes
       2. the URL path  /egypt-vision/health
       3. the query string  ?pathway=health      ← handy for previewing

     IMPORTANT: none of this copy addresses the recipient by name, and none of
     it states or implies that the recipient supports the initiative.         */
  PATHWAYS: {
    health: {
      slug: "/egypt-vision/health",
      label: "Health & Medical Leadership",
      heroEyebrow: "Prepared for Egypt's Medical Leadership",
      heroLead: "A strategic initiative to connect Egypt's clinical excellence, precision diagnostics, longevity medicine and international patient care into one coordinated, governed ecosystem.",
      noteEyebrow: "For Medical & Scientific Leadership",
      noteTitle: "The clinical case comes first.",
      noteBody: "This proposal is written on the assumption that nothing proceeds unless it improves the standard of care. What follows is offered to Egypt's physicians and scientific leaders for examination — the coordination problem it describes, the governance it proposes, and the question of whether a single well-designed pathway is worth building first.",
      benefits: [
        "Structured collaboration between Egyptian centres of excellence, with shared standards and shared records",
        "International research, teaching and fellowship partnerships that keep Egyptian talent in Egypt",
        "Genuine continuity of care for international patients — properly prepared before arrival, properly followed after departure"
      ],
      inviteBody: "Dr. Akoury welcomes the opportunity to present this vision privately to Egypt's medical and scientific leadership, to hear where the clinical priorities actually lie, and to explore whether a carefully governed pilot pathway would be worth designing together."
    },

    tourism: {
      slug: "/egypt-vision/tourism",
      label: "Tourism & Hospitality",
      heroEyebrow: "Prepared for Egypt's Tourism & Hospitality Leadership",
      heroLead: "A strategic initiative to extend Egypt's hospitality excellence into health, longevity and recovery travel — longer stays, year-round demand, and a premium segment no competing destination has yet organised.",
      noteEyebrow: "For Tourism & Hospitality Leadership",
      noteTitle: "A visitor who stays three weeks, not three days.",
      noteBody: "Health travel changes the economics of a visit: longer stays, off-season demand, an accompanying family, and services Egyptian hospitality already delivers exceptionally well. This proposal asks what it would take to organise that opportunity properly — and whether Egypt's hospitality leadership sees the same opening.",
      benefits: [
        "Higher-value visitors staying substantially longer, travelling outside the conventional season",
        "New service lines in clinical nutrition, recovery, rehabilitation and family support",
        "Wellness and recovery destinations along the Mediterranean and Red Sea that extend well beyond resort tourism"
      ],
      inviteBody: "Dr. Akoury welcomes the opportunity to present this vision privately to Egypt's tourism and hospitality leadership, to understand current priorities across the sector, and to explore whether a carefully governed pilot could open a durable premium segment for Egypt."
    },

    government: {
      slug: "/egypt-vision/government",
      label: "Government & National Development",
      heroEyebrow: "Prepared for Egypt's National Leadership",
      heroLead: "A strategic initiative to organise Egypt's existing medical, hospitality and development capabilities into a coordinated national health and longevity sector — an export industry built from assets the country already holds.",
      noteEyebrow: "For Government & National Development",
      noteTitle: "An export industry Egypt can build from what it already has.",
      noteBody: "This proposal does not ask Egypt to build a new health system. It asks whether existing national strengths — clinical, hospitality, geographic and developmental — could be coordinated under one set of standards to earn foreign currency, create skilled employment and raise domestic quality at the same time. It is presented for consideration, not as a plan requiring approval.",
      benefits: [
        "Foreign-currency revenue from longer-staying, higher-value international visitors",
        "Skilled job creation and professional retention across clinical, hospitality and technology roles",
        "Stronger national quality, navigation and patient-protection standards, with clear public–private accountability"
      ],
      inviteBody: "Dr. Akoury welcomes the opportunity to present this vision privately to Egypt's national leadership, to listen to current national priorities, and to explore whether a carefully governed collaborative pilot could advance the country's health, tourism, development and international-positioning objectives."
    },

    investment: {
      slug: "/egypt-vision/investment",
      label: "Investment & Real Estate",
      heroEyebrow: "Prepared for Egypt's Developers & International Investors",
      heroLead: "A strategic initiative to open an asset class that is well established internationally and largely unbuilt in this region: longevity communities, medical districts, wellness resorts and recovery residences, anchored to real clinical demand.",
      noteEyebrow: "For Developers & Investors",
      noteTitle: "Demand driven by need, not by season.",
      noteBody: "Health-linked development behaves differently from conventional hospitality or residential product: occupancy is less seasonal, stays are longer, and demand is driven by need rather than discretionary spending. This proposal sets out the categories, and proposes proving demand through a single pilot pathway before any capital is committed.",
      benefits: [
        "Longevity communities, healthy-ageing residential development and recovery residences",
        "Medical and innovation districts anchored to clinical institutions and international patient flow",
        "A phased, evidence-led sequence — pilot demand established first, capital deployment second"
      ],
      inviteBody: "Dr. Akoury welcomes the opportunity to present this vision privately to Egypt's developers and to international investors, to understand how each assesses this category, and to explore whether a carefully governed pilot would produce the evidence a serious investment case requires. Nothing on this page constitutes an offer or a solicitation of investment."
    },

    media: {
      slug: "/egypt-vision/media",
      label: "Media & Global Positioning",
      heroEyebrow: "Prepared for Egypt's Media & Global-Positioning Leadership",
      heroLead: "A strategic initiative — and with it, an untold international story: modern Egyptian medicine, science and capability, told through evidence rather than assertion.",
      noteEyebrow: "For Media & Global Positioning",
      noteTitle: "Egypt's story is still told through its past.",
      noteBody: "The world knows Egypt's history extraordinarily well and its present hardly at all. Modern Egyptian medicine, science and institutional capability are a genuinely undertold story — and an unusually credible one, because it can be evidenced. This proposal describes the initiative; the narrative opportunity around it is offered for discussion.",
      benefits: [
        "A compelling international narrative about modern Egypt, grounded in verifiable capability",
        "Human-interest storytelling built around real patients, real clinicians and diaspora reconnection",
        "A positioning platform that supports tourism, investment and diplomatic objectives simultaneously"
      ],
      inviteBody: "Dr. Akoury welcomes the opportunity to present this vision privately to Egypt's media and global-positioning leadership, to understand how the story is best told, and to explore whether this initiative could support a broader international narrative about modern Egypt."
    }
  }
};
/* ========================== END CONFIG — EDIT ABOVE ======================= */


(function () {
  "use strict";

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.prototype.slice.call((c || document).querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------ 1. FOOTER */
  const yr = $("#yr");
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* --------------------------------------------- 1b. SPHINX GATE INTRO
     Two guardian Sphinx illustrations, positioned facing each other inside
     the hero, part like ceremonial curtains as the existing hero eyebrow /
     headline / lead / attribution reveal through the opening. Everything
     they animate is class-toggling only — the actual hidden/open/exit
     states live in styles.css §5b, gated behind `html.sg-js` so a page with
     JS disabled (no class ever added) just shows the finished hero as-is.

     Timings below implement the "EXACT IMPLEMENTATION FOR THIS HERO"
     choreography: ~2.8–3.4s full motion, or a single short fade under
     prefers-reduced-motion (well under 600ms, never a trap). */
  (function sphinxGateIntro() {
    const hero = $(".hero");
    const gate = hero && $(".sphinx-gate", hero);
    if (!hero || !gate) return;

    const left = $(".sphinx-gate-left", gate);
    const right = $(".sphinx-gate-right", gate);
    const eyebrow = $(".hero-eyebrow", hero);
    const headline = $("#hero-h", hero);
    const lead = $(".hero-lead", hero);
    const attr = $(".hero-attr", hero);

    function at(el, cls, delay) {
      if (!el) return;
      window.setTimeout(function () { el.classList.add(cls); }, delay);
    }

    function finish() {
      gate.classList.add("sg-done");
      [left, right].forEach(function (fig) { if (fig) fig.style.willChange = "auto"; });
    }

    function choreograph(t) {
      at(left, "sg-visible", t.visible);
      at(right, "sg-visible", t.visible + 40);
      at(left, "sg-open", t.open);
      at(right, "sg-open", t.open + 30);
      at(eyebrow, "sg-in", t.eyebrow);
      at(headline, "sg-in", t.headline);
      at(lead, "sg-in", t.lead);
      at(attr, "sg-in", t.attr);
      at(left, "sg-exit", t.exit);
      at(right, "sg-exit", t.exit + 40);
      window.setTimeout(finish, t.done);
    }

    function begin() {
      if (reduceMotion) {
        choreograph({ visible: 0, open: 60, eyebrow: 110, headline: 170, lead: 250, attr: 320, exit: 340, done: 620 });
      } else {
        choreograph({ visible: 150, open: 650, eyebrow: 1050, headline: 1250, lead: 1950, attr: 2150, exit: 2350, done: 3150 });
      }
    }

    // Don't open the gate on half-loaded artwork — wait for both Sphinx
    // images (or a short safety timeout, so a slow/broken image never
    // leaves the hero copy hidden).
    const figs = [left, right].filter(Boolean);
    let pending = figs.filter(function (img) { return !img.complete; }).length;
    if (pending === 0) {
      begin();
    } else {
      let started = false;
      const safety = window.setTimeout(function () {
        if (!started) { started = true; begin(); }
      }, 900);
      function check() {
        pending -= 1;
        if (pending <= 0 && !started) {
          started = true;
          window.clearTimeout(safety);
          begin();
        }
      }
      figs.forEach(function (img) {
        img.addEventListener("load", check);
        img.addEventListener("error", check);
      });
    }
  })();

  /* ------------------------------------------- 1c. CENTRAL IDEA VIDEO BG
     Loops a muted background video behind the "Central Idea" pull-quote
     only. The source is picked once here, at load, based on viewport width
     — not via <source media="...">, which Safari evaluates inconsistently
     — and is never re-swapped on resize (that would restart playback and
     read as a glitch). Skipped entirely under prefers-reduced-motion: no
     <source> is ever appended, so the video element stays sourceless and
     the aside's existing navy background/pattern is the finished state. */
  (function centralIdeaVideoBg() {
    const video = $(".quoteband-video-el");
    if (!video || reduceMotion) return;

    const src = window.matchMedia("(max-width: 768px)").matches
      ? "/assets/healing-bg-mobile.mp4"
      : "/assets/healing-bg-1080.mp4";

    const source = document.createElement("source");
    source.type = "video/mp4";
    source.src = src;
    video.appendChild(source);
    video.load();
    video.play().catch(function () {
      // Autoplay blocked (e.g. iOS Low Power Mode) — the section's navy
      // background and scrim already stand on their own with no video.
    });
  })();

  /* ------------------------------------------------------- 2. ASSET SLOTS
     Renders an <img> only for slots with a real path. Pending slots keep the
     labelled placeholder and issue no network request — no 404s, ever. */
  $$(".plate[data-asset]").forEach(function (plate) {
    const key = plate.getAttribute("data-asset");
    const cfg = CONFIG.ASSETS[key];
    if (!cfg || !cfg.src) return;                 // stays pending — intentional

    /* The <img> is inserted into the document BEFORE its src is read by the
       loader. A detached `new Image()` carrying loading="lazy" never starts
       its fetch — the lazy-load algorithm requires the element to be in a
       document — so building it in place is the only way lazy slots load. */
    const img = document.createElement("img");
    img.alt = cfg.alt || "";
    img.decoding = "async";
    img.loading = cfg.eager ? "eager" : "lazy";
    if (cfg.eager) img.setAttribute("fetchpriority", "high");

    img.addEventListener("load", function () {
      plate.classList.remove("is-pending");
    });
    img.addEventListener("error", function () {
      /* File missing or unauthorised — drop the broken image and keep the
         elegant labelled placeholder rather than a broken-image icon. */
      img.remove();
      if (window.console && console.info) {
        console.info('[egypt-vision] asset slot "' + key + '" unavailable; placeholder retained.');
      }
    });

    plate.insertBefore(img, plate.firstChild);
    img.src = cfg.src;
  });

  /* ------------------------------------------------------ 3. CONCEPT PAPER */
  const paperBtn = $("#paper-btn");
  if (paperBtn && CONFIG.PAPER.ready && CONFIG.PAPER.path) {
    paperBtn.href = CONFIG.PAPER.path;
    paperBtn.setAttribute("download", CONFIG.PAPER.filename || "");
    paperBtn.classList.remove("is-pending");
    paperBtn.textContent = paperBtn.getAttribute("data-ready-label") || "Download the Executive Concept Paper";
    const pend = $(".paper-mod .pend");
    if (pend) pend.remove();
    const note = $("#paper-note");
    if (note) note.textContent = "PDF · opens in a new tab or downloads, depending on your browser.";
  }

  /* ----------------------------------------------- 4. LANGUAGE AVAILABILITY
     Honest handling of the site language bar while this page is English-only:
     mark AR/FR/ES unavailable rather than rendering English inside an RTL
     layout. Remove this block (or set LANGUAGES.translated = true) once
     reviewed translations are supplied. */
  if (!CONFIG.LANGUAGES.translated) {
    $$(".langsw button").forEach(function (b) {
      const on = (b.getAttribute("onclick") || "").indexOf("'en'") > -1;
      if (on) return;
      b.setAttribute("aria-disabled", "true");
      b.setAttribute("title", CONFIG.LANGUAGES.pendingTitle);
      b.style.opacity = ".45";
      b.style.cursor = "not-allowed";
      b.removeAttribute("onclick");
      b.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
    });
  }

  /* -------------------------------------------------- 5. SUBNAV SCROLLSPY */
  const subLinks = $$('.subnav-links a[href^="#"]');
  const targets = subLinks
    .map(function (a) { return { link: a, el: document.getElementById(a.hash.slice(1)) }; })
    .filter(function (t) { return t.el; });

  if (targets.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        targets.forEach(function (t) {
          const on = t.el === entry.target;
          t.link.setAttribute("aria-current", String(on));
          if (on && t.link.parentElement) {
            // keep the active item visible in the horizontally scrolling rail
            const rail = t.link.parentElement;
            const lr = t.link.getBoundingClientRect();
            const rr = rail.getBoundingClientRect();
            if (lr.left < rr.left || lr.right > rr.right) {
              rail.scrollTo({ left: t.link.offsetLeft - 20, behavior: reduceMotion ? "auto" : "smooth" });
            }
          }
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    targets.forEach(function (t) { spy.observe(t.el); });
  }

  /* ------------------------------------------- 5b. VISION CINEMATIC BAND
     Reveal (staggered via CSS transition-delay, see .vc-* rules) plus a
     restrained scroll-linked parallax on the background photo. Same
     technique as the site's own .chapter parallax in assets/app.js —
     a passive scroll listener writing a CSS custom property that a
     transform: translateY() reads — kept here as page-specific code
     rather than editing that shared file. Skipped entirely under
     prefers-reduced-motion, per CONFIG-less site convention. */
  (function initVisionCinematic() {
    const section = $(".vision-cine");
    if (!section) return;

    if ("IntersectionObserver" in window) {
      const revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          section.classList.add("in");
          revealIO.unobserve(entry.target);
        });
      }, { threshold: .2 });
      revealIO.observe(section);
    } else {
      section.classList.add("in");
    }

    if (reduceMotion) return;
    const img = $(".vision-cine-img", section);
    if (!img) return;
    let queued = false;
    const update = function () {
      queued = false;
      const r = section.getBoundingClientRect();
      const offset = Math.max(-64, Math.min(64, r.top * 0.05));
      img.style.setProperty("--vc-parallax", offset + "px");
    };
    addEventListener("scroll", function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  })();

  /* ------------------------------------------- 5c. ASSET GRID CASCADE
     Nine cards. All per-card/per-element timing is CSS transition-delay
     (see .asset-card/.ac-rule/.an/h3/p in styles.css) — this only ever
     decides WHEN to add `.in` to each card; the choreography itself is
     pure CSS.

     Desktop/tablet: the 3x3 (or 2-col) grid fits within roughly a screen
     or two, so one grid-level trigger reveals all nine at once and their
     nth-child --card-delay values carry the cross-card wave.

     Mobile (<=660px, matches the CSS breakpoint): nine stacked cards run
     several screens tall, so batch-triggering off the grid would finish
     the whole cascade off-screen long before a visitor scrolls that far —
     each card is observed individually instead and reveals as it enters,
     with its own --card-delay zeroed out first so it starts immediately
     rather than waiting out a cross-card offset that no longer means
     anything once cards trigger on their own. DOM order still guarantees
     1-9 reading order either way. */
  (function initAssetCascade() {
    const cards = $$(".asset-card");
    if (!cards.length) return;

    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (c) { c.classList.add("in"); });
      return;
    }

    const isStackedMobile = window.matchMedia("(max-width: 660px)").matches;

    if (!isStackedMobile) {
      const grid = $(".assetgrid");
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          cards.forEach(function (c) { c.classList.add("in"); });
          io.unobserve(entry.target);
        });
      }, { threshold: 0, rootMargin: "0px 0px -22% 0px" });
      io.observe(grid);
      return;
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty("--card-delay", "0s");
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -12% 0px" });
    cards.forEach(function (c) { io.observe(c); });
  })();

  /* ------------------------------------------------ 6. STAKEHOLDER TABS
     Full ARIA tab pattern with arrow-key / Home / End navigation. */
  const tabs   = $$(".stake-tab");
  const panels = $$(".stake-panel");
  if (tabs.length && panels.length) {
    var activate = function (idx, focus) {
      tabs.forEach(function (t, i) {
        const on = i === idx;
        t.setAttribute("aria-selected", String(on));
        t.setAttribute("tabindex", on ? "0" : "-1");
      });
      panels.forEach(function (p, i) { p.hidden = i !== idx; });
      if (focus) tabs[idx].focus();
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { activate(i, false); });
      tab.addEventListener("keydown", function (e) {
        let next = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = tabs.length - 1;
        if (next !== null) { e.preventDefault(); activate(next, true); }
      });
    });
    activate(0, false);
  }

  /* ------------------------------------------------- 7. RECIPIENT PATHWAY */
  (function applyPathway() {
    const body = document.body;
    let key = (body.getAttribute("data-pathway") || "").trim();

    if (!key) {
      const seg = window.location.pathname.split("/").filter(Boolean).pop();
      if (seg && CONFIG.PATHWAYS[seg]) key = seg;
    }
    if (!key) {
      const q = new URLSearchParams(window.location.search).get("pathway");
      if (q && CONFIG.PATHWAYS[q]) key = q;
    }
    const p = CONFIG.PATHWAYS[key];
    if (!p) { body.setAttribute("data-pathway", ""); return; }

    body.setAttribute("data-pathway", key);

    const set = function (name, text) {
      const el = document.querySelector('[data-pw="' + name + '"]');
      if (el && text) el.textContent = text;
    };
    set("hero-eyebrow", p.heroEyebrow);
    set("hero-lead", p.heroLead);
    set("note-eyebrow", p.noteEyebrow);
    set("note-title", p.noteTitle);
    set("note-body", p.noteBody);
    set("invite-body", p.inviteBody);

    const note = $(".pathway-note");
    if (note) note.classList.add("on");

    const ul = $('[data-pw="note-benefits"]');
    if (ul && p.benefits) {
      ul.innerHTML = "";
      p.benefits.forEach(function (b) {
        const li = document.createElement("li");
        li.textContent = b;
        ul.appendChild(li);
      });
    }

    // Tag submissions so the office knows which introduction was sent
    const src = $("#form-source");
    if (src) src.value = "egypt-vision-" + key;

    // Open the matching stakeholder tab by default
    const tabMap = { government: 0, health: 1, tourism: 2, investment: 3, media: 4 };
    const idx = tabMap[key];
    if (typeof idx === "number" && tabs[idx] && typeof activate === "function") activate(idx, false);
  })();

  /* ---------------------------------------------------------- 8. THE FORM */
  const form = $("#briefing-form");
  if (form) {
    const card    = $("#form-card");
    const success = $("#form-success");
    const errBox  = $("#form-error");
    const submit  = $("#submit-btn");

    const fieldOf = function (input) {
      return input.closest(".field") || input.closest(".consent-field");
    };
    const emailOk = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); };

    const validate = function (input) {
      const f = fieldOf(input);
      if (!f) return true;
      let ok = true;
      if (input.type === "checkbox") ok = input.checked;
      else if (input.hasAttribute("required")) ok = input.value.trim() !== "";
      if (ok && input.type === "email" && input.value.trim() !== "") ok = emailOk(input.value);
      f.classList.toggle("invalid", !ok);
      input.setAttribute("aria-invalid", String(!ok));
      return ok;
    };

    const controls = $$("input, select, textarea", form).filter(function (i) {
      return i.name !== "company_website" && i.type !== "hidden";
    });

    controls.forEach(function (input) {
      input.addEventListener("blur", function () {
        if (input.value.trim() !== "" || input.hasAttribute("required")) validate(input);
      });
      ["input", "change"].forEach(function (evt) {
        input.addEventListener(evt, function () {
          const f = fieldOf(input);
          if (f && f.classList.contains("invalid")) validate(input);
        });
      });
    });

    const showError = function (msg) {
      if (!errBox) return;
      errBox.textContent = msg;
      errBox.classList.add("show");
    };
    const clearError = function () {
      if (errBox) { errBox.classList.remove("show"); errBox.textContent = ""; }
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearError();

      // Honeypot — a filled hidden field means an automated submission.
      const hp = $("#company-website");
      if (hp && hp.value !== "") return;

      let firstBad = null;
      controls.forEach(function (input) {
        const required = input.hasAttribute("required");
        if (!required && input.type !== "email") return;
        if (!required && input.type === "email" && input.value.trim() === "") return;
        if (!validate(input) && !firstBad) firstBad = input;
      });

      if (firstBad) {
        showError("Please complete the highlighted fields before submitting.");
        firstBad.focus();
        firstBad.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        return;
      }

      const data = {};
      new FormData(form).forEach(function (v, k) {
        if (k !== "company_website") data[k] = typeof v === "string" ? v.trim() : v;
      });
      data.privacy_ack = $("#f-consent").checked ? "acknowledged" : "";
      data.page = window.location.pathname;
      data.submitted_at = new Date().toISOString();

      const showSuccess = function () {
        if (card) card.classList.add("sent");
        if (success) {
          success.classList.add("show");
          success.setAttribute("tabindex", "-1");
          success.focus();
          success.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        }
      };

      /* SAFE MODE — no endpoint configured yet. The inquiry is handed to the
         visitor's email client, fully composed. Nothing is silently discarded
         and nothing pretends to have reached a server that does not exist. */
      if (!CONFIG.FORM.endpoint) {
        const lines = [
          "Full name: "                + (data.full_name || ""),
          "Official title: "           + (data.official_title || ""),
          "Organisation: "             + (data.organization || ""),
          "Email: "                    + (data.email || ""),
          "Telephone / WhatsApp: "     + (data.phone || "—"),
          "Country: "                  + (data.country || ""),
          "Area of interest: "         + (data.area_of_interest || ""),
          "Preferred meeting format: " + (data.meeting_format || ""),
          "",
          "Message:",
          (data.message || "—"),
          "",
          "— Sent from " + window.location.href
        ].join("\n");

        window.location.href =
          "mailto:" + CONFIG.FORM.fallbackEmail +
          "?subject=" + encodeURIComponent("Private Strategic Briefing Request — Egypt Global Health & Longevity Initiative") +
          "&body=" + encodeURIComponent(lines);

        showSuccess();
        return;
      }

      // LIVE MODE — POST to the configured endpoint.
      const original = submit ? submit.innerHTML : "";
      if (submit) { submit.disabled = true; submit.textContent = "Sending…"; }

      fetch(CONFIG.FORM.endpoint, {
        method: CONFIG.FORM.method || "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          showSuccess();
        })
        .catch(function () {
          showError(
            "We could not submit your inquiry just now. Please write directly to " +
            CONFIG.FORM.fallbackEmail + " and we will respond personally."
          );
          if (submit) { submit.disabled = false; submit.innerHTML = original; }
        });
    });
  }

  /* --------------------------------------------- 9. IN-PAGE ANCHOR FOCUS
     Keeps keyboard focus with the reader after an in-page jump. */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function () {
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      window.setTimeout(function () {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }, reduceMotion ? 0 : 420);
    });
  });

  /* ------------------------------------------- 10. REVEAL + PRINT SAFETY
     app.js reveals .reveal elements on scroll. These two guards make sure
     nothing is ever left invisible — under reduced motion, when printing, or
     in the rare case the observer never fires. */
  if (reduceMotion) {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  } else {
    window.setTimeout(function () {
      $$(".reveal").forEach(function (el) { el.classList.add("in"); });
    }, 2500);
  }
  window.addEventListener("beforeprint", function () {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
    $$(".stake-panel").forEach(function (p) { p.hidden = false; });
  });
})();
