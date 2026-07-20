/* Shared behavior across all Egypt Vision pages */
(function(){
  // sticky nav solidify on scroll
  var nav = document.getElementById('nav');
  if(nav){
    addEventListener('scroll', function(){ nav.classList.toggle('solid', scrollY > 60); });
  }

  // mobile menu toggle
  var burger = document.getElementById('burger');
  var mnav = document.getElementById('mnav');
  if(burger && mnav){
    burger.addEventListener('click', function(){ mnav.classList.toggle('open'); });
  }

  // reveal-on-scroll (fires once per element)
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: .12 });

  var chapterIO = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); }
    });
  }, { threshold: .4 });

  // parallax on chapter background photos (coming-home.html only)
  function initParallax(){
    var chapters = Array.prototype.slice.call(document.querySelectorAll('.chapter')).map(function(ch){
      return { el: ch, img: ch.querySelector('.bg img') };
    }).filter(function(c){ return c.img; });
    if(!chapters.length) return;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    addEventListener('scroll', function(){
      chapters.forEach(function(c){
        var r = c.el.getBoundingClientRect();
        c.img.style.setProperty('--parallax-offset', (r.top * 0.15) + 'px');
      });
    }, { passive: true });
  }

  // fixed gold progress rail with one dot per chapter (coming-home.html only)
  function initStoryRail(){
    var chapters = Array.prototype.slice.call(document.querySelectorAll('.chapter'));
    var rail = document.querySelector('.story-rail');
    if(!rail || !chapters.length) return;
    var dotsWrap = rail.querySelector('.story-rail-dots');
    chapters.forEach(function(_, i){
      var d = document.createElement('div');
      d.className = 'dot';
      d.style.top = (i / (chapters.length - 1) * 100) + '%';
      dotsWrap.appendChild(d);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);
    var fill = rail.querySelector('.story-rail-fill');
    addEventListener('scroll', function(){
      var doc = document.documentElement;
      var pct = scrollY / (doc.scrollHeight - innerHeight);
      fill.style.height = Math.min(100, Math.max(0, pct * 100)) + '%';
      var activeIdx = chapters.findIndex(function(ch){
        var r = ch.getBoundingClientRect();
        return r.top < innerHeight * 0.5 && r.bottom > innerHeight * 0.5;
      });
      dots.forEach(function(d, i){ d.classList.toggle('active', i === activeIdx); });
    }, { passive: true });
  }

  // word-by-word stagger reveal on chapter lines; re-run after every setLang() swap
  function splitLinesIntoWords(){
    document.querySelectorAll('.chapter .line').forEach(function(line){
      var html = line.innerHTML;
      line.innerHTML = html.replace(/(<[^>]+>)|([^\s<]+)/g, function(m, tag, word){
        return tag ? tag : '<span class="word">' + word + '</span> ';
      });
      line.querySelectorAll('.word').forEach(function(w, i){ w.style.transitionDelay = (i * 30) + 'ms'; });
    });
  }

  // click-to-enlarge lightbox for the press photo gallery (media.html only)
  function initLightbox(){
    var tiles = Array.prototype.slice.call(document.querySelectorAll('.press-tile'));
    if(!tiles.length) return;
    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img alt=""/><div class="lightbox-cap"></div>';
    document.body.appendChild(overlay);
    var img = overlay.querySelector('img');
    var cap = overlay.querySelector('.lightbox-cap');
    function open(src, caption){
      img.src = src;
      cap.textContent = caption || '';
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close(){
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    tiles.forEach(function(t){
      t.addEventListener('click', function(){
        var im = t.querySelector('img');
        var capSpan = t.querySelector('figcaption span');
        open(im.currentSrc || im.src, capSpan ? capSpan.textContent : im.alt);
      });
    });
    overlay.addEventListener('click', function(e){ if(e.target === overlay) close(); });
    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    addEventListener('keydown', function(e){ if(e.key === 'Escape') close(); });
  }

  // click/tap-driven nav dropdown ("Media" merges Interviews + Press & Photos).
  // Most triggers are a single <button class="nav-drop-trigger">. The Home
  // trigger instead splits into a <a class="nav-drop-label"> (navigates to
  // index.html normally) plus a separate <button class="nav-drop-caret">
  // that owns aria-haspopup/aria-expanded and toggles the menu — so the
  // label click isn't hijacked into a toggle. Fall back to the trigger
  // itself wherever no dedicated caret exists.
  function initNavDropdowns(){
    document.querySelectorAll('.nav-drop').forEach(function(drop){
      var toggle = drop.querySelector('.nav-drop-caret') || drop.querySelector('.nav-drop-trigger');
      toggle.addEventListener('click', function(e){
        e.stopPropagation();
        var isOpen = drop.classList.contains('open');
        document.querySelectorAll('.nav-drop.open').forEach(function(d){
          d.classList.remove('open');
          (d.querySelector('.nav-drop-caret') || d.querySelector('.nav-drop-trigger')).setAttribute('aria-expanded', 'false');
        });
        if(!isOpen){ drop.classList.add('open'); toggle.setAttribute('aria-expanded', 'true'); }
      });
    });
    document.addEventListener('click', function(){
      document.querySelectorAll('.nav-drop.open').forEach(function(d){
        d.classList.remove('open');
        (d.querySelector('.nav-drop-caret') || d.querySelector('.nav-drop-trigger')).setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){
        document.querySelectorAll('.nav-drop.open').forEach(function(d){
          d.classList.remove('open');
          (d.querySelector('.nav-drop-caret') || d.querySelector('.nav-drop-trigger')).setAttribute('aria-expanded', 'false');
        });
      }
    });
    // mobile accordion group, same open/close pattern, same label/caret split for Home
    document.querySelectorAll('.mnav-group').forEach(function(group){
      var toggle = group.querySelector('.mnav-group-caret') || group.querySelector('.mnav-group-trigger');
      toggle.addEventListener('click', function(){
        var isOpen = group.classList.contains('open');
        group.classList.toggle('open', !isOpen);
        toggle.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  }

  var EN = null;
  function cacheEN(){
    EN = {};
    document.querySelectorAll('[data-i18n]').forEach(function(e){ EN[e.getAttribute('data-i18n')] = e.innerHTML; });
  }

  window.setLang = function(l){
    if(!EN) cacheEN();
    var root = document.getElementById('html-root') || document.documentElement;
    var d = (l === 'en') ? EN : (window.I18N && window.I18N[l]);
    document.querySelectorAll('[data-i18n]').forEach(function(e){
      var k = e.getAttribute('data-i18n');
      var hasTranslation = d && d[k] !== undefined;
      e.innerHTML = hasTranslation ? d[k] : EN[k];
      // Guards against the classic RTL bug where leftover/untranslated
      // English text (falling back to EN[k]) inherits the page's
      // dir="rtl" and has its trailing punctuation reordered to the
      // front of the sentence. Any element still showing English gets
      // an explicit LTR embedding regardless of page direction; a real
      // translation clears it so Arabic renders RTL normally.
      if(l !== 'en' && !hasTranslation){ e.setAttribute('dir','ltr'); e.style.unicodeBidi='isolate'; }
      else { e.removeAttribute('dir'); e.style.unicodeBidi=''; }
    });
    root.setAttribute('lang', l);
    root.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
    document.querySelectorAll('.langsw button').forEach(function(b){ b.classList.remove('on'); });
    var active = Array.prototype.find.call(document.querySelectorAll('.langsw button'), function(b){
      return b.getAttribute('onclick') === "setLang('" + l + "')";
    });
    if(active) active.classList.add('on');
    splitLinesIntoWords();
  };

  addEventListener('DOMContentLoaded', function(){
    cacheEN();
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
    document.querySelectorAll('.chapter').forEach(function(el){ chapterIO.observe(el); });
    splitLinesIntoWords();
    initParallax();
    initStoryRail();
    initLightbox();
    initNavDropdowns();
    var p = new URLSearchParams(location.search).get('lang');
    if(p && ['ar','fr','es','en'].includes(p)) setLang(p);
  });
})();
