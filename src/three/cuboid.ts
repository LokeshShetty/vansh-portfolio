// The statement's 3D cube: a lattice of spheres, seen from above so a
// corner points at the viewer and the sides taper down to a point.
// Spheres near the pointer push outward and spring back; dragging turns the
// cube (with a little momentum); clicking a sphere lights it up lime, or
// turns it back. Left alone, it turns slowly. Loaded by
// components/Cuboid.astro only after the page is idle, so the HTML still
// renders with no JavaScript at all.
//
// Every sphere is one instance of a single mesh, so the whole cube is one
// draw call. Rendering pauses while the canvas is off-screen or the tab is
// hidden.

import {
  Color,
  DirectionalLight,
  DynamicDrawUsage,
  Group,
  HemisphereLight,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  PerspectiveCamera,
  Quaternion,
  Raycaster,
  Scene,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";

const N = 9; // spheres along each edge
const GAP = 0.26; // distance between sphere centres
const RADIUS = GAP * 0.62; // over half, so neighbours overlap
const PUSH = 0.6; // how far spheres move away from the pointer
const REACH = 0.85; // how far from the pointer spheres still react
const START_LIT = 6;

export function mount(canvas: HTMLCanvasElement) {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

  const scene = new Scene();
  // Close and fairly wide, for the strong taper toward the bottom corner.
  const camera = new PerspectiveCamera(38, 1, 0.1, 50);
  camera.position.set(0, 0, 6.4);
  camera.lookAt(0, -0.1, 0);

  scene.add(new HemisphereLight(0xffffff, 0x9a9a92, 1.6));
  const sun = new DirectionalLight(0xffffff, 2.2);
  sun.position.set(-3, 5, 6);
  scene.add(sun);

  // Only the outer shell: inner spheres would never be seen.
  const base: Vector3[] = [];
  const half = (N - 1) / 2;
  const edge = (v: number) => v === 0 || v === N - 1;
  for (let x = 0; x < N; x++)
    for (let y = 0; y < N; y++)
      for (let z = 0; z < N; z++) {
        if (!edge(x) && !edge(y) && !edge(z)) continue;
        base.push(
          new Vector3((x - half) * GAP, (y - half) * GAP, (z - half) * GAP),
        );
      }
  const count = base.length;

  const material = new MeshStandardMaterial({ roughness: 0.6, metalness: 0 });
  const mesh = new InstancedMesh(
    new SphereGeometry(RADIUS, 28, 20),
    material,
    count,
  );
  mesh.instanceMatrix.setUsage(DynamicDrawUsage);

  // Turned about its own vertical axis (drag and idle rotation), then tipped
  // toward the viewer so the top face shows as a diamond.
  const spin = new Group();
  spin.add(mesh);
  const tiltGroup = new Group();
  tiltGroup.add(spin);
  scene.add(tiltGroup);

  // Colours: white spheres, a few lit up in the site's lime.
  const lit = new Uint8Array(count);
  for (let i = 0; i < START_LIT; i++)
    lit[Math.floor(Math.random() * count)] = 1;
  const white = new Color();
  const lime = new Color();
  const isDark = () => document.documentElement.dataset.theme === "dark";
  const paint = () => {
    const css = getComputedStyle(canvas);
    lime.set(css.getPropertyValue("--accent").trim() || "#d4ff3f");
    white.set(isDark() ? "#e9e9e4" : "#ffffff");
    for (let i = 0; i < count; i++) mesh.setColorAt(i, lit[i] ? lime : white);
    mesh.instanceColor!.needsUpdate = true;
  };
  paint();

  // Per-sphere motion: an offset along its direction from the centre that
  // springs toward a target, and a scale that pops when it's clicked.
  const outward = base.map((v) => v.clone().normalize());
  const offset = new Float32Array(count);
  const speed = new Float32Array(count);
  const scale = new Float32Array(count).fill(1);
  const m = new Matrix4();
  const q = new Quaternion();
  const s = new Vector3();
  const p = new Vector3();
  const writeMatrices = () => {
    for (let i = 0; i < count; i++) {
      p.copy(outward[i]).multiplyScalar(offset[i]).add(base[i]);
      s.setScalar(scale[i]);
      mesh.setMatrixAt(i, m.compose(p, q, s));
    }
    mesh.instanceMatrix.needsUpdate = true;
  };
  writeMatrices();
  mesh.computeBoundingSphere();
  // Pushed-out spheres can leave the original bounds; widen them.
  mesh.boundingSphere!.radius += PUSH + RADIUS;

  // Turning: drag to spin and tilt, with momentum; idle, a slow turn.
  const IDLE_SPEED = 0.18;
  const REST_TILT = 0.62;
  let yaw = Math.PI / 4;
  let tilt = REST_TILT;
  let yawSpeed = IDLE_SPEED;
  let dragging = false;
  let moved = 0;
  let lastX = 0;
  let lastY = 0;
  let lastT = 0;

  // Pointer: where it meets the cube, in the cube's own coordinates.
  const raycaster = new Raycaster();
  const ndc = new Vector2();
  const hitLocal = new Vector3();
  let hovering = false;
  let hoveredId = -1;
  const updateHit = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(
      ((e.clientX - r.left) / r.width) * 2 - 1,
      -((e.clientY - r.top) / r.height) * 2 + 1,
    );
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObject(mesh)[0];
    hovering = !!hit;
    hoveredId = hit?.instanceId ?? -1;
    if (hit) hitLocal.copy(mesh.worldToLocal(hit.point.clone()));
    canvas.style.cursor = dragging ? "grabbing" : hit ? "pointer" : "grab";
  };

  canvas.addEventListener("pointerdown", (e) => {
    dragging = true;
    moved = 0;
    lastX = e.clientX;
    lastY = e.clientY;
    lastT = performance.now();
    canvas.setPointerCapture(e.pointerId);
    schedule();
  });
  canvas.addEventListener("pointermove", (e) => {
    if (dragging) {
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      moved += Math.abs(dx) + Math.abs(dy);
      yaw += dx * 0.008;
      tilt = Math.max(0.1, Math.min(1.1, tilt + dy * 0.006));
      yawSpeed = (dx * 0.008) / Math.max((now - lastT) / 1000, 0.008);
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
    }
    updateHit(e);
    schedule();
  });
  const release = (e: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    if (performance.now() - lastT > 80) yawSpeed = 0;
    // A press without a drag is a click: toggle that sphere.
    if (moved < 5) {
      updateHit(e);
      if (hoveredId >= 0) {
        lit[hoveredId] ^= 1;
        mesh.setColorAt(hoveredId, lit[hoveredId] ? lime : white);
        mesh.instanceColor!.needsUpdate = true;
        scale[hoveredId] = 1.35;
      }
    }
    canvas.style.cursor = hovering ? "pointer" : "grab";
  };
  canvas.addEventListener("pointerup", release);
  canvas.addEventListener("pointercancel", release);
  canvas.addEventListener("pointerleave", () => {
    if (!dragging) hovering = false;
  });

  const render = () => {
    spin.rotation.y = yaw;
    tiltGroup.rotation.x = tilt;
    renderer.render(scene, camera);
  };

  // Follow the theme toggle.
  new MutationObserver(() => {
    paint();
    render();
  }).observe(document.documentElement, { attributeFilter: ["data-theme"] });

  // Size the drawing buffer to the canvas's CSS box.
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    render();
  };

  let visible = true;
  let frame = 0;
  let last = performance.now();

  const tick = (now: number) => {
    frame = 0;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    if (!dragging) {
      // Momentum eases back into the slow idle turn.
      yawSpeed += (IDLE_SPEED - yawSpeed) * (1 - Math.exp(-dt * 1.5));
      yaw += yawSpeed * dt;
      tilt += (REST_TILT - tilt) * (1 - Math.exp(-dt * 1.2));
    }

    // Springs: spheres near the pointer push outward, the rest settle back.
    const k = 1 - Math.exp(-dt * 8);
    for (let i = 0; i < count; i++) {
      let goal = 0;
      if (hovering) {
        const d = base[i].distanceTo(hitLocal);
        if (d < REACH) goal = PUSH * (1 - d / REACH) ** 2;
      }
      speed[i] += (goal - offset[i]) * 90 * dt;
      speed[i] *= Math.exp(-dt * 9);
      offset[i] += speed[i] * dt;
      scale[i] += (1 - scale[i]) * k;
    }
    writeMatrices();
    render();
    schedule();
  };
  function schedule() {
    if (!frame && visible && !document.hidden) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }

  new ResizeObserver(resize).observe(canvas);
  resize();
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  }).observe(canvas);
  document.addEventListener("visibilitychange", schedule);

  schedule();
  canvas.closest("[data-cuboid]")?.setAttribute("data-ready", "");
}
