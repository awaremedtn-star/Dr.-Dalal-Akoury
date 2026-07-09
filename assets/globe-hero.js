// Rotating wireframe-globe hero background — plain Three.js (ES module, no
// bundler). Self-hosted from assets/vendor/ rather than a CDN so the effect
// doesn't depend on any third-party host being reachable. Fails silently:
// if WebGL or the module can't load, .hero-scrim's gradient is already the
// full background, so the hero degrades to a plain dark hero with no visible
// broken state.
import * as THREE from './vendor/three.module.min.js';

const canvas = document.getElementById('hero-globe-canvas');
if (canvas) {
  try {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rootStyles = getComputedStyle(document.documentElement);
    const gold = rootStyles.getPropertyValue('--gold-lt').trim() || '#D9BE7E';

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10);
    camera.position.z = 4.2;

    const group = new THREE.Group();
    group.rotation.x = 0.25;

    const wireGeometry = new THREE.SphereGeometry(1.4, 30, 20);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: gold,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    group.add(new THREE.Mesh(wireGeometry, wireMaterial));

    const dotGeometry = new THREE.SphereGeometry(1.41, 64, 48);
    const dotMaterial = new THREE.PointsMaterial({
      color: gold,
      size: 0.016,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    group.add(new THREE.Points(dotGeometry, dotMaterial));

    scene.add(group);

    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    window.addEventListener('resize', resize);
    resize();

    let frameId = null;
    function animate() {
      if (!prefersReducedMotion) {
        group.rotation.y += 0.0016;
        group.rotation.z += 0.00025;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (frameId) cancelAnimationFrame(frameId);
        frameId = null;
      } else if (!frameId) {
        animate();
      }
    });

    animate();
    if (prefersReducedMotion) renderer.render(scene, camera);
  } catch (err) {
    console.warn('Hero globe skipped (WebGL unavailable):', err);
  }
}
