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
      e.innerHTML = (d && d[k] !== undefined) ? d[k] : EN[k];
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
    var p = new URLSearchParams(location.search).get('lang');
    if(p && ['ar','fr','es','en'].includes(p)) setLang(p);
  });
})();
