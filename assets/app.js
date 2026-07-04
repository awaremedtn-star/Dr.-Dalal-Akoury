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
  };

  addEventListener('DOMContentLoaded', function(){
    cacheEN();
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
    document.querySelectorAll('.chapter').forEach(function(el){ chapterIO.observe(el); });
    var p = new URLSearchParams(location.search).get('lang');
    if(p && ['ar','fr','es','en'].includes(p)) setLang(p);
  });
})();
