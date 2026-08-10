#!/usr/bin/env node
/* ============================================================================
   build-pathways.js
   Generates the five personalised recipient pages from index.html.

   Run from inside the egypt-vision folder:      node build-pathways.js

   Output:
     health/index.html      →  /egypt-vision/health
     tourism/index.html     →  /egypt-vision/tourism
     government/index.html  →  /egypt-vision/government
     investment/index.html  →  /egypt-vision/investment
     media/index.html       →  /egypt-vision/media

   index.html is the single source of truth. Edit index.html, re-run this
   script, and all five variants are regenerated. The personalised COPY lives
   in script.js → CONFIG.PATHWAYS, so wording changes need no rebuild at all.

   Note: index.html already uses root-absolute paths (/assets/…, /images/…,
   /egypt-vision/styles.css), so no path rewriting is needed for sub-folders.

   No dependencies. Node 14+.
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const BASE = '/egypt-vision';
const ROOT = __dirname;

const PATHWAYS = {
  health: {
    label: 'Health & Medical Leadership',
    title: 'Egypt Global Health & Longevity Initiative | For Egypt’s Medical Leadership',
    desc: 'A strategic vision to connect Egypt’s clinical excellence, precision diagnostics, longevity medicine and international patient care into one coordinated, governed ecosystem.'
  },
  tourism: {
    label: 'Tourism & Hospitality',
    title: 'Egypt Global Health & Longevity Initiative | For Egypt’s Tourism & Hospitality Leadership',
    desc: 'A strategic vision to extend Egypt’s hospitality excellence into health, longevity and recovery travel — longer stays, year-round demand and a premium international segment.'
  },
  government: {
    label: 'Government & National Development',
    title: 'Egypt Global Health & Longevity Initiative | For Egypt’s National Leadership',
    desc: 'A strategic vision to organise Egypt’s existing medical, hospitality and development capabilities into a coordinated national health and longevity sector.'
  },
  investment: {
    label: 'Investment & Real Estate',
    title: 'Egypt Global Health & Longevity Initiative | For Developers & International Investors',
    desc: 'A strategic vision for longevity communities, medical districts, wellness resorts and recovery residences in Egypt — anchored to real clinical demand. Not an offer or solicitation.'
  },
  media: {
    label: 'Media & Global Positioning',
    title: 'Egypt Global Health & Longevity Initiative | For Media & Global Positioning',
    desc: 'A strategic vision — and an untold international story: modern Egyptian medicine, science and capability, told through evidence rather than assertion.'
  }
};

const src = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

let written = 0;

Object.keys(PATHWAYS).forEach(function (key) {
  const p = PATHWAYS[key];
  const url = 'https://drdalalakoury.com' + BASE + '/' + key;
  let out = src;

  // 1. Stamp the pathway on <body> so no URL parsing is needed at runtime.
  out = out.replace('<body id="top" data-pathway="">', '<body id="top" data-pathway="' + key + '">');

  // 2. Per-pathway title, description and canonical.
  out = out.replace(/<title>[\s\S]*?<\/title>/, '<title>' + esc(p.title) + '</title>');
  out = out.replace(/<meta name="description" content="[\s\S]*?">/, '<meta name="description" content="' + esc(p.desc) + '">');
  out = out.replace(/<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="' + url + '">');
  out = out.replace(/<meta property="og:title" content="[\s\S]*?">/, '<meta property="og:title" content="' + esc(p.title) + '">');
  out = out.replace(/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="' + url + '">');

  // 3. Reveal the personalised note band in the served HTML (script.js also
  //    does this, but doing it here means it is correct before JS runs).
  out = out.replace('<aside class="quoteband pathway-note"', '<aside class="quoteband pathway-note on"');

  // 4. Mark the pathway as the current item in the site nav dropdown.
  out = out.replace(/(<li><a href="\/egypt-vision\/" class="current")/, '$1');

  // 5. Generated-file marker.
  out = out.replace(
    '<!DOCTYPE html>',
    '<!DOCTYPE html>\n<!-- GENERATED FILE — do not edit directly.\n     Source: ' + BASE + '/index.html   ·   Rebuild: node build-pathways.js\n     Pathway: ' + key + ' (' + p.label + ') -->'
  );

  const dir = path.join(ROOT, key);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), out, 'utf8');
  console.log('  ✓ ' + BASE + '/' + key + '  →  ' + key + '/index.html');
  written++;
});

console.log('\n' + written + ' pathway page(s) generated from index.html.\n');
