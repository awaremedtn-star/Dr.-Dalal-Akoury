/* ============================================================================
   EGYPT GLOBAL HEALTH & HUMAN POTENTIAL INITIATIVE
   /assets/js/egypt-global-health.js          Build 2026-08-13-B

   ┌──────────────────────────────────────────────────────────────────────────┐
   │  EVERYTHING YOU NEED TO CHANGE IS IN THE "CONFIG" BLOCK BELOW.           │
   │  Nothing beneath the CONFIG block needs editing for a normal launch.     │
   └──────────────────────────────────────────────────────────────────────────┘

   Serves all four language versions of the page — English, Arabic, French and
   Spanish. It carries NO translated strings of its own: every message it can
   show is read out of the page's own markup (form labels, and the data-*
   attributes on <form id="briefing-form">), so a new language needs no change
   here.

   This file deliberately does NOT re-implement the sticky nav, the nav
   dropdowns, the mobile accordion or reveal-on-scroll — the site's shared
   /assets/app.js already provides all of those, and every page loads it.

   No external dependencies. No third-party scripts. No cookies. No tracking.
   ========================================================================== */

/* ============================ CONFIG — EDIT HERE ========================== */
const CONFIG = {

  /* ---------------------------------------------------------------- 1. FORM
     Paste the endpoint that should receive the institutional briefing form.
     Leave as "" and the form stays in SAFE MODE: it validates fully, but on
     submit it opens a pre-composed email to FORM.fallbackEmail instead of
     posting anywhere. It never silently pretends to have sent something.

     Government and public-institution enquiries are to be reviewed MANUALLY.
     Do not connect this endpoint to a nurture sequence, an event promotion,
     an investment mailing or any automated marketing workflow.               */
  FORM: {
    endpoint: "",                          // e.g. "https://services.leadconnectorhq.com/hooks/XXXX"
    method: "POST",
    fallbackEmail: "vip@drdalalakoury.com",   // VERIFY before launch
    // Notification recipients are configured on the ENDPOINT side, not here:
    //   1. Dr. Akoury's designated office recipient  — ADDRESS PENDING
    //   2. Trichia                                    — ADDRESS PENDING
  },

  /* -------------------------------------------------------------- 2. VIDEO
     The "Central Idea" band loops a muted background video. Set enabled:false
     to ship the band on its navy gradient alone (it is designed to stand on
     its own — the video is an enhancement, never a dependency).              */
  VIDEO: {
    enabled: true,
    desktop: "/assets/healing-bg-1080.mp4",
    mobile:  "/assets/healing-bg-mobile.mp4"
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

  /* --------------------------------------------- 2. SPHINX GATE HERO INTRO
     Two guardian illustrations part like ceremonial curtains as the hero
     copy reveals through the opening. Class-toggling only — the hidden /
     open / exit states live in the stylesheet behind `html.sg-js`, so with
     JavaScript disabled the hero simply renders finished. */
  (function sphinxGateIntro() {
    const hero = $(".hero");
    const gate = hero && $(".sphinx-gate", hero);
    if (!hero || !gate) return;

    const left     = $(".sphinx-gate-left", gate);
    const right    = $(".sphinx-gate-right", gate);
    const eyebrow  = $(".hero-eyebrow", hero);
    const headline = $("#hero-h", hero);
    const lead     = $(".hero-lead", hero);
    const cta      = $(".hero-cta", hero);
    const attr     = $(".hero-attr", hero);

    const at = (el, cls, delay) => {
      if (!el) return;
      window.setTimeout(function () { el.classList.add(cls); }, delay);
    };

    function choreograph(t) {
      at(left, "sg-visible", t.visible);
      at(right, "sg-visible", t.visible + 40);
      at(left, "sg-open", t.open);
      at(right, "sg-open", t.open + 30);
      at(eyebrow, "sg-in", t.eyebrow);
      at(headline, "sg-in", t.headline);
      at(lead, "sg-in", t.lead);
      at(cta, "sg-in", t.cta);
      at(attr, "sg-in", t.attr);
      at(left, "sg-exit", t.exit);
      at(right, "sg-exit", t.exit + 40);
      window.setTimeout(function () {
        gate.classList.add("sg-done");
        [left, right].forEach(function (f) { if (f) f.style.willChange = "auto"; });
      }, t.done);
    }

    const begin = () => reduceMotion
      ? choreograph({ visible: 0, open: 60, eyebrow: 110, headline: 170, lead: 250, cta: 290, attr: 320, exit: 340, done: 620 })
      : choreograph({ visible: 90, open: 380, eyebrow: 620, headline: 760, lead: 1180, cta: 1300, attr: 1400, exit: 1450, done: 2000 });

    /* Never open the gate on half-loaded artwork — but never let a slow or
       broken image leave the hero copy permanently hidden either.
       Total sequence is ~2.0s — deliberately brief. Egyptian heritage frames
       the page; it does not perform for it. */
    const figs = [left, right].filter(Boolean);
    let pending = figs.filter(function (img) { return !img.complete; }).length;
    if (pending === 0) { begin(); return; }

    let started = false;
    const safety = window.setTimeout(function () {
      if (!started) { started = true; begin(); }
    }, 900);
    const check = function () {
      pending -= 1;
      if (pending <= 0 && !started) {
        started = true;
        window.clearTimeout(safety);
        begin();
      }
    };
    figs.forEach(function (img) {
      img.addEventListener("load", check);
      img.addEventListener("error", check);
    });
  })();

  /* ------------------------------------------- 3. CENTRAL IDEA VIDEO BAND
     The source is picked once, at load, from viewport width — not via
     <source media>, which Safari evaluates inconsistently — and is never
     re-swapped on resize (that restarts playback and reads as a glitch).
     Skipped entirely under prefers-reduced-motion: no source is ever
     appended, so the band's navy gradient is the finished state. */
  (function centralIdeaVideoBg() {
    const video = $(".quoteband-video-el");
    if (!video || reduceMotion || !CONFIG.VIDEO.enabled) return;

    const source = document.createElement("source");
    source.type = "video/mp4";
    source.src = window.matchMedia("(max-width: 768px)").matches
      ? CONFIG.VIDEO.mobile : CONFIG.VIDEO.desktop;
    video.appendChild(source);
    video.load();
    video.play().catch(function () {
      /* Autoplay blocked (e.g. iOS Low Power Mode) — the band's own navy
         background and scrim already stand on their own with no video. */
    });
  })();

  /* --------------------------------------------------- 4. SUBNAV SCROLLSPY */
  (function subnavSpy() {
    const links = $$('.subnav-links a[href^="#"]');
    const targets = links
      .map(function (a) { return { link: a, el: document.getElementById(a.hash.slice(1)) }; })
      .filter(function (t) { return t.el; });
    if (!targets.length || !("IntersectionObserver" in window)) return;

    const rtl = document.documentElement.getAttribute("dir") === "rtl";
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        targets.forEach(function (t) {
          const on = t.el === entry.target;
          t.link.setAttribute("aria-current", String(on));
          if (!on || !t.link.parentElement) return;
          // keep the active item visible in the horizontally scrolling rail
          const rail = t.link.parentElement;
          const lr = t.link.getBoundingClientRect();
          const rr = rail.getBoundingClientRect();
          if (lr.left < rr.left || lr.right > rr.right) {
            rail.scrollTo({
              left: t.link.offsetLeft - (rtl ? rail.clientWidth - 20 : 20),
              behavior: reduceMotion ? "auto" : "smooth"
            });
          }
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    targets.forEach(function (t) { spy.observe(t.el); });
  })();

  /* ------------------------------------------ 5. CINEMATIC BAND + PARALLAX */
  (function visionCinematic() {
    const section = $(".vision-cine");
    if (!section) return;

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          section.classList.add("in");
          io.unobserve(entry.target);
        });
      }, { threshold: .2 });
      io.observe(section);
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
      img.style.setProperty("--vc-parallax", Math.max(-64, Math.min(64, r.top * 0.05)) + "px");
    };
    addEventListener("scroll", function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  })();

  /* ------------------------------------------------- 6. CARD GRID CASCADE
     Desktop/tablet: one grid-level trigger reveals a whole grid and the
     per-card CSS delays carry the wave across it. Mobile: the stacked cards
     run several screens tall, so each is observed individually with its own
     delay zeroed, otherwise the cascade finishes far off-screen. */
  (function cardCascade() {
    const grids = $$(".assetgrid");
    if (!grids.length) return;
    const cards = $$(".asset-card");

    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (c) { c.classList.add("in"); });
      return;
    }

    if (!window.matchMedia("(max-width: 660px)").matches) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          $$(".asset-card", entry.target).forEach(function (c) { c.classList.add("in"); });
          io.unobserve(entry.target);
        });
      }, { threshold: 0, rootMargin: "0px 0px -22% 0px" });
      grids.forEach(function (g) { io.observe(g); });
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

  /* -------------------------------------------- 7. TAB GROUPS (ARIA)
     Scoped per .stake container, so the platform-layer tabs and the
     stakeholder tabs operate independently. Full ARIA tab pattern with arrow-key / Home / End navigation, mirrored
     for right-to-left so the arrow keys follow what the reader sees. */
  $$(".stake").forEach(function tabGroup(root) {
    const tabs   = $$(".stake-tab", root);
    const panels = $$(".stake-panel", root);
    if (!tabs.length || !panels.length) return;

    const rtl = document.documentElement.getAttribute("dir") === "rtl";

    const activate = function (idx, focus) {
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
        const fwd = rtl ? "ArrowLeft" : "ArrowRight";
        const back = rtl ? "ArrowRight" : "ArrowLeft";
        let next = null;
        if (e.key === fwd || e.key === "ArrowDown") next = (i + 1) % tabs.length;
        else if (e.key === back || e.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = tabs.length - 1;
        if (next !== null) { e.preventDefault(); activate(next, true); }
      });
    });
    activate(0, false);

    /* The three "doors" high on the page each open a specific perspective. */
    $$('[data-open-tab]').forEach(function (link) {
      const id = link.getAttribute("data-open-tab");
      const idx = tabs.findIndex(function (t) { return t.id === id; });
      if (idx < 0) return;
      link.addEventListener("click", function () {
        activate(idx, false);
        window.setTimeout(function () { tabs[idx].focus({ preventScroll: true }); }, reduceMotion ? 0 : 500);
      });
    });
  });

  /* ---------------------------------------------------------- 8. THE FORM */
  (function briefingForm() {
    const form = $("#briefing-form");
    if (!form) return;

    const card    = $("#form-card");
    const success = $("#form-success");
    const errBox  = $("#form-error");
    const submit  = $("#submit-btn");

    /* All human-readable text comes from the page itself, so this file stays
       language-neutral across the four translations. */
    const MSG = {
      summary: form.getAttribute("data-err-summary") || "Please complete the highlighted fields.",
      send:    form.getAttribute("data-err-send") || "We could not submit your enquiry just now. Please write directly to",
      subject: form.getAttribute("data-mail-subject") || "Institutional briefing request",
      sending: form.getAttribute("data-sending") || "Sending…"
    };

    const fieldOf = (input) => input.closest(".field") || input.closest(".consent-field");
    const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

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
      if (!errBox) return;
      errBox.classList.remove("show");
      errBox.textContent = "";
    };

    /* Label text for the plain-text email body, taken from the rendered page
       so the mailto is composed in the reader's own language. */
    const labelFor = function (input) {
      const f = fieldOf(input);
      const l = f && f.querySelector("label");
      if (!l) return input.name;
      return l.textContent.replace(/\*/g, "").trim();
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
        showError(MSG.summary);
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
      data.review = "manual"; // institutional enquiries are never auto-nurtured

      const showSuccess = function () {
        if (card) card.classList.add("sent");
        if (!success) return;
        success.classList.add("show");
        success.setAttribute("tabindex", "-1");
        success.focus();
        success.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      };

      /* SAFE MODE — no endpoint configured yet. The enquiry is handed to the
         visitor's email client, fully composed. Nothing is silently discarded
         and nothing pretends to have reached a server that does not exist. */
      if (!CONFIG.FORM.endpoint) {
        const lines = controls
          .filter(function (i) { return i.type !== "checkbox"; })
          .map(function (i) { return labelFor(i) + ": " + (i.value.trim() || "—"); });
        lines.push("", "— " + window.location.href);

        window.location.href =
          "mailto:" + CONFIG.FORM.fallbackEmail +
          "?subject=" + encodeURIComponent(MSG.subject) +
          "&body=" + encodeURIComponent(lines.join("\n"));

        showSuccess();
        return;
      }

      // LIVE MODE — POST to the configured endpoint.
      const original = submit ? submit.innerHTML : "";
      if (submit) { submit.disabled = true; submit.textContent = MSG.sending; }

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
          showError(MSG.send + " " + CONFIG.FORM.fallbackEmail);
          if (submit) { submit.disabled = false; submit.innerHTML = original; }
        });
    });
  })();

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

  /* ------------------------------------------ 10. REVEAL + PRINT SAFETY
     app.js reveals .reveal elements on scroll. These guards make sure
     nothing is ever left invisible — under reduced motion, when printing,
     or in the rare case the observer never fires. */
  if (reduceMotion) {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  } else {
    window.setTimeout(function () {
      $$(".reveal").forEach(function (el) { el.classList.add("in"); });
    }, 2500);
  }
  window.addEventListener("beforeprint", function () {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
    $$(".asset-card").forEach(function (el) { el.classList.add("in"); });
    $$(".stake-panel").forEach(function (p) { p.hidden = false; });
  });
})();
