import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useMediaQuery';

const LOW_END =
  (typeof navigator !== 'undefined' && navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4) ||
  (typeof window !== 'undefined' && window.devicePixelRatio > 0 && window.innerWidth < 480);

/**
 * Lightweight Three.js particle field (custom, no R3F so it treeshakes small).
 * - Pauses when the tab is hidden or the canvas leaves the viewport.
 * - Caps pixel ratio, scales particle count by device class.
 * - Renders a single static frame under prefers-reduced-motion.
 */
export default function ParticlesScene({ className = '' }) {
  const mountRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    let scene;
    let camera;
    let points;
    let raf = 0;
    let running = true;
    let disposed = false;

    const isMobile = window.innerWidth < 768;
    const count = reduced ? 120 : isMobile ? 260 : LOW_END ? 380 : 620;

    const init = async () => {
      if (disposed) return;
      const THREE = await import('three');
      if (disposed) return;

      let supportsGL = true;
      try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
        if (!gl) supportsGL = false;
      } catch {
        supportsGL = false;
      }
      if (!supportsGL) return;

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x05060f, 0.0032);

      camera = new THREE.PerspectiveCamera(
        75,
        mount.clientWidth / mount.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 30;

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      const palette = [
        new THREE.Color('#22d3ee'),
        new THREE.Color('#a78bfa'),
        new THREE.Color('#f472b6'),
        new THREE.Color('#f2f5ff'),
      ];

      for (let i = 0; i < count; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * 90;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
        const c = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.32,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);

      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'low-power',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.6));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      if (reduced) {
        renderer.render(scene, camera);
        return;
      }

      const tick = () => {
        if (!running || disposed) return;
        const t = Date.now() * 0.00006;
        points.rotation.y = t * 0.12;
        points.rotation.x = Math.sin(t * 0.7) * 0.06;
        points.rotation.z = Math.cos(t * 0.5) * 0.05;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      if (!renderer) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tickOnce);
      }
    };

    const tickOnce = () => {
      if (!running || disposed || !renderer) return;
      points.rotation.y += 0.002;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tickOnce);
    };

    let obs;
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
    }) : null;

    init();
    if (io && mount) io.observe(mount);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (io) io.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      if (points) {
        points.geometry.dispose();
        points.material.dispose();
      }
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, [reduced]);

  return <div ref={mountRef} className={`pointer-events-none fixed inset-0 z-[1] ${className}`} aria-hidden="true" />;
}
