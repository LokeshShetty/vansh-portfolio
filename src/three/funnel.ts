// The hero's 3D funnel: lime particles stream from a wide mouth down to a
// narrow pipeline. Loaded by components/Funnel.astro only after the page is
// idle, so the HTML still renders with no JavaScript at all.
//
// All particle motion runs in the vertex shader, so the CPU only updates two
// uniforms per frame. Rendering pauses while the canvas is off-screen or the
// tab is hidden.

import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  LineBasicMaterial,
  LineLoop,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";

const COUNT = 2400;
const TOP = 1.7; // y of the funnel mouth
const BOTTOM = -1.9; // y where the stream leaves
const MOUTH = 1.75; // radius at the top
const NECK = 0.16; // radius at the bottom

// Radius of the funnel at progress t (0 = top, 1 = bottom). Shared by the
// shader and the stage rings so they line up.
const radiusAt = (t: number) => NECK + (MOUTH - NECK) * Math.pow(1 - t, 1.8);

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute vec4 aSeed; // angle, phase, speed, jitter
  varying float vAlpha;

  void main() {
    float t = fract(aSeed.y + uTime * aSeed.z);
    float r = ${NECK.toFixed(3)} + ${(MOUTH - NECK).toFixed(3)} * pow(1.0 - t, 1.8);
    r *= 1.0 + aSeed.w * 0.18;
    // Swirl faster as the funnel narrows.
    float a = aSeed.x + uTime * 0.25 + t * 5.0;
    vec3 p = vec3(cos(a) * r, mix(${TOP.toFixed(2)}, ${BOTTOM.toFixed(2)}, t), sin(a) * r);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.0 + 3.0 * t) * uPixelRatio * (4.0 / -mv.z);
    // Fade in at the mouth, out after the neck, and dim the far side.
    vAlpha = smoothstep(0.0, 0.08, t) * (1.0 - smoothstep(0.9, 1.0, t))
           * (0.45 + 0.55 * smoothstep(-1.5, 1.5, p.z));
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(uColor, vAlpha * smoothstep(0.5, 0.1, d));
  }
`;

export function mount(canvas: HTMLCanvasElement) {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "low-power",
  });
  const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
  renderer.setPixelRatio(pixelRatio);

  const accent = new Color(
    getComputedStyle(canvas).getPropertyValue("--accent").trim() || "#d4ff3f",
  );

  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.set(0, 0.9, 7.2);
  camera.lookAt(0, -0.15, 0);

  const funnel = new Group();
  funnel.rotation.x = 0.18;
  scene.add(funnel);

  // Particles
  const seeds = new Float32Array(COUNT * 4);
  for (let i = 0; i < COUNT; i++) {
    seeds[i * 4] = Math.random() * Math.PI * 2;
    seeds[i * 4 + 1] = Math.random();
    seeds[i * 4 + 2] = 0.05 + Math.random() * 0.07;
    seeds[i * 4 + 3] = Math.random() * 2 - 1;
  }
  const geometry = new BufferGeometry();
  // Positions are computed in the shader; three still needs the attribute.
  geometry.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(COUNT * 3), 3),
  );
  geometry.setAttribute("aSeed", new BufferAttribute(seeds, 4));
  geometry.boundingSphere = null;

  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uColor: { value: accent },
    },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const points = new Points(geometry, material);
  points.frustumCulled = false;
  funnel.add(points);

  // Three faint rings marking the stages of the funnel.
  const ringMaterial = new LineBasicMaterial({
    color: accent,
    transparent: true,
    opacity: 0.18,
  });
  for (const t of [0.08, 0.42, 0.78]) {
    const r = radiusAt(t);
    const y = TOP + (BOTTOM - TOP) * t;
    const ring = new Float32Array(96 * 3);
    for (let i = 0; i < 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      ring.set([Math.cos(a) * r, y, Math.sin(a) * r], i * 3);
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(ring, 3));
    funnel.add(new LineLoop(g, ringMaterial));
  }

  // Size the drawing buffer to the canvas's CSS box.
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(canvas);
  resize();

  // Tilt toward the pointer, eased.
  const target = { x: 0, y: 0 };
  window.addEventListener(
    "pointermove",
    (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      target.y = (e.clientY / window.innerHeight - 0.5) * 0.25;
    },
    { passive: true },
  );

  let visible = true;
  let frame = 0;
  const start = performance.now();

  const tick = (now: number) => {
    frame = 0;
    material.uniforms.uTime.value = (now - start) / 1000;
    funnel.rotation.y += (target.x - funnel.rotation.y) * 0.05;
    funnel.rotation.x += (0.18 + target.y - funnel.rotation.x) * 0.05;
    renderer.render(scene, camera);
    schedule();
  };
  const schedule = () => {
    if (!frame && visible && !document.hidden) {
      frame = requestAnimationFrame(tick);
    }
  };

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  }).observe(canvas);
  document.addEventListener("visibilitychange", schedule);

  schedule();
  canvas.dataset.ready = "";
}
