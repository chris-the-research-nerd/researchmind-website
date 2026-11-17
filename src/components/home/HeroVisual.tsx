"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type * as T from "three";
import { practices } from "@/content/home";
import { AskYourAI } from "@/components/AskYourAI";

// Glossy 3D brain (three.js, loaded after the page) with no text labels.
// Regions: 0 front of the brain (Research & Strategy), 1 cerebellum + brainstem
// (AI Solutions), 2 back of the brain (AI Visibility). State 3 = "how it fits
// together": soft signals travel between all three regions.

const STATES = 4;
const AUTO_MS = 8000;
const IDLE_MS = 15000;

// Each label sits above or below its dot and extends away from the brain's
// centre; it flips sides if it would run past the edge of the visual.
const LABEL_EXTENDS: ("left" | "right")[] = ["left", "left", "right"];

const TOGETHER = {
  eyebrow: "How it fits together",
  text: "Research tells you what customers need and what to fix first. AI helps your team deliver it faster. AI visibility brings new customers to you when they ask AI.",
};

export function HeroVisual() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState(3); // rest on "how it fits together"
  const stateRef = useRef(3);
  const returnTimer = useRef<number | undefined>(undefined);
  const lastInteraction = useRef(0);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    // Touch screens can't hover, so they get a slow tour; mouse users explore by hovering.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: hover)").matches) return;
    const id = window.setInterval(() => {
      if (Date.now() - lastInteraction.current < IDLE_MS) return;
      setState((s) => (s + 1) % STATES);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { ImprovedNoise } = await import("three/examples/jsm/math/ImprovedNoise.js");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = mount.clientWidth < 520;
      const noise = new ImprovedNoise();

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.touchAction = "pan-y";

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environmentIntensity = 0.75;
      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(-2, 3, 3);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xdfe6f2, 0.9);
      rim.position.set(3, 1, -3);
      scene.add(rim);

      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
      camera.position.set(0, 0.2, 4.6);
      camera.lookAt(0, -0.12, 0);

      const brain = new THREE.Group();
      scene.add(brain);

      // Shared material: vertex colours carry groove shading; a small shader
      // patch tints the active region (crossfading from the previous one).
      const uniforms = {
        uActive: { value: 0 },
        uPrev: { value: 0 },
        uMix: { value: 1 },
        uHover: { value: -1 },
        uAll: { value: 0 },
        uTime: { value: 0 },
      };
      // See-through "glass" brain: nearly clear where the surface faces you,
      // denser at the edges and along the folds (a fresnel falloff).
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        vertexColors: true,
        roughness: 0.35,
        metalness: 0,
        clearcoat: 0.4,
        clearcoatRoughness: 0.3,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      material.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, uniforms);
        shader.vertexShader = shader.vertexShader
          .replace("#include <common>", "#include <common>\nattribute float aRegion;\nattribute float aWeight;\nvarying float vRegion;\nvarying float vWeight;")
          .replace("#include <begin_vertex>", "#include <begin_vertex>\nvRegion = aRegion;\nvWeight = aWeight;");
        shader.fragmentShader = shader.fragmentShader
          .replace(
            "#include <common>",
            "#include <common>\nvarying float vRegion;\nvarying float vWeight;\nuniform float uActive;\nuniform float uPrev;\nuniform float uMix;\nuniform float uHover;\nuniform float uAll;\nuniform float uTime;"
          )
          .replace(
            "#include <color_fragment>",
            `#include <color_fragment>
            float isA = 1.0 - step(0.5, abs(vRegion - uActive));
            float isP = 1.0 - step(0.5, abs(vRegion - uPrev));
            float isH = 1.0 - step(0.5, abs(vRegion - uHover));
            float inRegion = step(-0.5, vRegion);
            float breathe = 0.85 + 0.15 * sin(uTime * 1.2);
            float w = (isA * uMix + isP * (1.0 - uMix)) * 0.7 * breathe;
            w = max(w, inRegion * uAll * 0.5 * breathe);
            w = max(w, isH * 0.25);
            w *= vWeight;
            diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.70, 0.2, 0.2), w);`
          )
          .replace(
            "#include <opaque_fragment>",
            `float fres = pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0);
            diffuseColor.a = 0.06 + fres * 0.62 + w * 0.35;
            #include <opaque_fragment>`
          );
      };

      const BASE = new THREE.Color(0x8fa2bd); // cool slate so the glass reads on white
      const regionPoints: T.Vector3[][] = [[], [], []];

      function finish(geo: T.BufferGeometry, region: Float32Array, shade: Float32Array, weight?: Float32Array) {
        const n = region.length;
        const col = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) {
          const s = shade[i];
          col[i * 3] = BASE.r * s;
          col[i * 3 + 1] = BASE.g * s;
          col[i * 3 + 2] = BASE.b * s;
        }
        geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
        geo.setAttribute("aRegion", new THREE.BufferAttribute(region, 1));
        geo.setAttribute("aWeight", new THREE.BufferAttribute(weight ?? new Float32Array(n).fill(1), 1));
        geo.computeVertexNormals();
        const mesh = new THREE.Mesh(geo, material);
        brain.add(mesh);
        return mesh;
      }

      // Cerebral hemispheres. Front of the brain is -x (faces left, like the references).
      const segW = small ? 200 : 340;
      const segH = small ? 150 : 250;
      for (const side of [-1, 1]) {
        const geo = new THREE.SphereGeometry(1, segW, segH);
        const pos = geo.attributes.position as T.BufferAttribute;
        const region = new Float32Array(pos.count).fill(-1);
        const shade = new Float32Array(pos.count).fill(1);
        const weight = new Float32Array(pos.count).fill(1);
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const z = pos.getZ(i);
          const front = Math.max(0, -x);
          const back = Math.max(0, x);
          let px = x * 0.92;
          let py = y * 0.72 + 0.14;
          let pz = z * 0.6 * (1 - 0.14 * front - 0.1 * back * back);
          if (z * side < 0) pz *= 0.06; // flat inner face; the halves meet in a thin fissure
          const outer = z * side > 0 ? 1 : 0;
          // Underside: frontal lobe sits up, temporal lobe hangs low in the middle,
          // and the back lifts to make room for the cerebellum.
          const temporal = Math.exp(-(((px + 0.12) / 0.36) ** 2)) * (0.45 + 0.55 * outer);
          const floor = -0.14 - 0.3 * temporal + 0.12 * Math.max(0, px - 0.3);
          if (py < floor) py = floor + (py - floor) * 0.35;
          pz += side * Math.max(0, -(py + 0.1)) * temporal * 0.18 * outer; // temporal lobe bulges outward
          py -= 0.06 * front * front; // frontal pole dips slightly
          py -= 0.07 * Math.max(0, px - 0.45); // occipital pole tilts down
          const wz = pz + side * 0.045;

          // sulci: zero-crossings of warped noise give winding grooves
          const wx = noise.noise(px * 1.6, py * 1.6, wz * 1.6) * 0.7;
          const wy = noise.noise(px * 1.6 + 5, py * 1.6, wz * 1.6) * 0.7;
          const n = noise.noise(px * 3.9 + wx, py * 3.9 + 7.3 + wy, wz * 3.9 - wx);
          const a = Math.abs(n);
          let d = -0.05 * Math.exp(-((a / 0.1) ** 2)) + 0.012 * Math.min(1, a / 0.35);
          // lateral fissure above the temporal lobe
          const line = -0.1 + 0.26 * (px + 0.1);
          if (px > -0.6 && px < 0.35 && outer) d -= 0.07 * Math.exp(-(((py - line) / 0.028) ** 2));
          const len = Math.hypot(x / 0.92, y / 0.72, z / 0.6) || 1;
          const nx = x / 0.92 / len;
          const ny = y / 0.72 / len;
          const nz = z / 0.6 / len;
          pos.setXYZ(i, px + nx * d, py + ny * d, wz + nz * d);
          shade[i] = 0.62 + 0.38 * Math.min(1, Math.max(0, 1 + d / 0.05));
          const ss = (e0: number, e1: number, v: number) => {
            const k = Math.min(1, Math.max(0, (v - e0) / (e1 - e0)));
            return k * k * (3 - 2 * k);
          };
          if (px < -0.28 && py > -0.3) {
            region[i] = 0;
            weight[i] = ss(-0.28, -0.6, px);
          } else if (px > 0.42 && py > -0.25) {
            region[i] = 2;
            weight[i] = ss(0.42, 0.72, px);
          }
          if (region[i] >= 0 && weight[i] > 0.6 && i % 7 === 0 && outer && d > -0.01)
            regionPoints[region[i]].push(new THREE.Vector3(px + nx * 0.03, py + ny * 0.03, wz + nz * 0.03));
        }
        finish(geo, region, shade, weight);
      }

      // Cerebellum: two lobes with fine folia, tucked under the back
      for (const side of [-1, 1]) {
        const geo = new THREE.SphereGeometry(1, small ? 90 : 140, small ? 70 : 110);
        const pos = geo.attributes.position as T.BufferAttribute;
        const region = new Float32Array(pos.count).fill(1);
        const shade = new Float32Array(pos.count).fill(1);
        const c = [0.46, -0.4, side * 0.24];
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const z = pos.getZ(i);
          let py = y * 0.21;
          if (py > 0.08) py = 0.08 + (py - 0.08) * 0.4;
          const t = Math.atan2(py, x * 0.3);
          const f = 0.5 + 0.5 * Math.sin(t * 46);
          const d = -0.012 * f;
          const px = c[0] + x * (0.32 + d);
          const pz = c[2] + z * (0.3 + d);
          pos.setXYZ(i, px, c[1] + py * (1 + d * 4), pz);
          shade[i] = 0.78 + 0.22 * (1 - f);
          if (i % 9 === 0 && z * side > 0) regionPoints[1].push(new THREE.Vector3(px, c[1] + py, pz));
        }
        finish(geo, region, shade);
      }

      // Brainstem
      {
        const geo = new THREE.CylinderGeometry(0.07, 0.1, 0.5, 48, 8, true);
        geo.rotateZ(-0.3);
        geo.translate(0.16, -0.58, 0);
        const count = geo.attributes.position.count;
        finish(geo, new Float32Array(count).fill(1), new Float32Array(count).fill(0.92));
      }

      // Inner structures, visible through the glass: corpus callosum and thalamus
      {
        const arc = new THREE.CatmullRomCurve3(
          [
            [-0.42, 0.02], [-0.3, 0.16], [-0.1, 0.22], [0.12, 0.22], [0.32, 0.14], [0.4, 0.0], [0.3, -0.04],
          ].map(([x, y]) => new THREE.Vector3(x, y, 0))
        );
        const geo = new THREE.TubeGeometry(arc, 80, 0.045, 16, false);
        geo.scale(1, 1, 3.2);
        const count = geo.attributes.position.count;
        finish(geo, new Float32Array(count).fill(-1), new Float32Array(count).fill(0.85));
        for (const side of [-1, 1]) {
          const g = new THREE.SphereGeometry(1, 48, 32);
          g.scale(0.17, 0.11, 0.09);
          g.translate(0.05, -0.07, side * 0.1);
          const c = g.attributes.position.count;
          finish(g, new Float32Array(c).fill(-1), new Float32Array(c).fill(0.85));
        }
      }
      brain.scale.setScalar(1.15);

      // Soft glow sprites for sparks and travelling signals
      const glowCanvas = document.createElement("canvas");
      glowCanvas.width = glowCanvas.height = 64;
      const gctx = glowCanvas.getContext("2d")!;
      const grad = gctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,170,170,1)");
      grad.addColorStop(0.35, "rgba(200,70,70,0.6)");
      grad.addColorStop(1, "rgba(180,58,58,0)");
      gctx.fillStyle = grad;
      gctx.fillRect(0, 0, 64, 64);
      const glowTex = new THREE.CanvasTexture(glowCanvas);
      const makeSprite = () => {
        const m = new THREE.SpriteMaterial({
          map: glowTex,
          transparent: true,
          depthWrite: false,
          depthTest: false,
          blending: THREE.AdditiveBlending,
          opacity: 0,
        });
        const s = new THREE.Sprite(m);
        s.scale.setScalar(0.09);
        brain.add(s);
        return s;
      };
      const sparks = Array.from({ length: 6 }, () => ({ s: makeSprite(), life: Math.random(), speed: 0.006 }));

      // Connections between regions for the "together" state
      const anchors = [
        // On the midline, between the two hemispheres
        new THREE.Vector3(-0.7, 0.55, 0),
        new THREE.Vector3(0.5, -0.56, 0),
        new THREE.Vector3(0.8, 0.44, 0),
      ];
      const curves = [
        [0, 1],
        [1, 2],
        [2, 0],
      ].map(([a, b]) => {
        const A = anchors[a];
        const B = anchors[b];
        const mid = A.clone().add(B).multiplyScalar(0.5);
        // bow outward from the centre of the brain
        mid.add(mid.clone().sub(new THREE.Vector3(0.1, 0, 0)).normalize().multiplyScalar(0.3));
        return new THREE.QuadraticBezierCurve3(A, mid, B);
      });
      const lineMat = new THREE.LineBasicMaterial({ color: 0xb33a3a, transparent: true, opacity: 0, depthTest: false });
      const lines = curves.map((c) => {
        const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(c.getPoints(48)), lineMat);
        brain.add(l);
        return l;
      });
      const signals = curves.map((_, i) => ({ s: makeSprite(), t: i / 3 }));

      // Layout
      let vw = mount.clientWidth;
      let vh = mount.clientHeight;
      let mountLeft = mount.getBoundingClientRect().left;
      const resize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        vw = w;
        vh = h;
        mountLeft = mount.getBoundingClientRect().left;
        renderer.setSize(w, h, false);
        renderer.domElement.style.width = `${w}px`;
        renderer.domElement.style.height = `${h}px`;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(mount);

      // Interaction
      // Camera-facing view for each state: [rotation.y, rotation.x]. Selecting a
      // practice turns the brain to show its region.
      const VIEWS: [number, number][] = [
        [0.42, 0.06], // front of the brain
        [-0.28, -0.16], // cerebellum, slightly from below
        [-0.5, 0.06], // back of the brain
        [0.12, 0.08], // whole brain
      ];
      let offY = 0;
      let offX = 0;
      let pointerInside = false;
      const ray = new THREE.Raycaster();
      const ndc = new THREE.Vector2();
      const meshes = brain.children.filter((c): c is T.Mesh => (c as T.Mesh).isMesh);
      const regionUnder = (cx: number, cy: number) => {
        const r = renderer.domElement.getBoundingClientRect();
        ndc.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(ndc, camera);
        const hit = ray.intersectObjects(meshes, false)[0];
        if (!hit || !hit.face) return -1;
        const attr = (hit.object as T.Mesh).geometry.getAttribute("aRegion") as T.BufferAttribute;
        return attr.getX(hit.face.a);
      };
      let lastHover = 0;
      let hoverCandidate = -1;
      let hoverSince = 0;
      // Drag (mouse) or swipe (touch) to turn the brain by hand
      let down: { x: number; y: number; lastX: number; lastY: number; t: number; id: number } | null = null;
      let dragging = false;
      let spinVel = 0; // rad/s left over after a flick
      let manualUntil = 0; // auto-rotation waits until this time
      const onMove = (e: PointerEvent) => {
        const r = renderer.domElement.getBoundingClientRect();
        pointerInside = true;
        if (down && e.pointerId === down.id) {
          const dx = e.clientX - down.lastX;
          const dy = e.clientY - down.lastY;
          if (!dragging && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) {
            dragging = true;
            renderer.domElement.style.cursor = "grabbing";
            uniforms.uHover.value = -1;
          }
          if (dragging) {
            const now = performance.now();
            const dtm = Math.max(1, now - down.t) / 1000;
            brain.rotation.y += dx * 0.012;
            brain.rotation.x = Math.max(-0.6, Math.min(0.6, brain.rotation.x + dy * 0.006));
            spinVel = (dx * 0.012) / dtm;
            down.lastX = e.clientX;
            down.lastY = e.clientY;
            down.t = now;
            manualUntil = now + 4000;
            lastInteraction.current = Date.now();
          }
          return;
        }
        offY = ((e.clientX - r.left) / r.width - 0.5) * 0.45;
        offX = ((e.clientY - r.top) / r.height - 0.5) * 0.18;
        const now = performance.now();
        if (e.pointerType === "mouse" && now - lastHover > 60) {
          lastHover = now;
          const reg = regionUnder(e.clientX, e.clientY);
          uniforms.uHover.value = reg;
          renderer.domElement.style.cursor = reg >= 0 ? "pointer" : "grab";
          // Hover selects a region once the pointer rests on it briefly
          if (reg !== hoverCandidate) {
            hoverCandidate = reg;
            hoverSince = now;
          } else if (reg >= 0 && reg !== stateRef.current && now - hoverSince > 180) {
            lastInteraction.current = Date.now();
            setState(reg);
          }
        }
      };
      const onLeave = () => {
        pointerInside = false;
        if (!down) uniforms.uHover.value = -1;
      };
      const onDown = (e: PointerEvent) => {
        down = { x: e.clientX, y: e.clientY, lastX: e.clientX, lastY: e.clientY, t: performance.now(), id: e.pointerId };
        dragging = false;
        spinVel = 0;
        try {
          renderer.domElement.setPointerCapture(e.pointerId);
        } catch {}
      };
      const onUp = (e: PointerEvent) => {
        if (!down || e.pointerId !== down.id) return;
        const wasDrag = dragging;
        const stillFor = performance.now() - down.t; // time since the last movement
        down = null;
        dragging = false;
        renderer.domElement.style.cursor = "grab";
        lastInteraction.current = Date.now();
        if (wasDrag) {
          if (stillFor > 120) spinVel = 0; // held still before letting go, so no coasting
          return;
        }
        // A tap or click: show that region; tap it again (or empty space) to see how it all fits together
        const reg = regionUnder(e.clientX, e.clientY);
        setState(reg >= 0 && reg !== stateRef.current ? reg : 3);
      };
      const onCancel = () => {
        // The browser took over (e.g. a vertical scroll on a phone)
        down = null;
        dragging = false;
      };
      const el = renderer.domElement;
      el.style.cursor = "grab";
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointerup", onUp);
      el.addEventListener("pointercancel", onCancel);

      // Render loop
      let raf = 0;
      let shown = stateRef.current;
      const tmp = new THREE.Vector3();
      const clock = new THREE.Clock();
      const loop = () => {
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;
        uniforms.uTime.value = reduce ? 0 : t;
        const st = stateRef.current;

        if (st !== shown) {
          uniforms.uPrev.value = shown < 3 ? shown : -9;
          uniforms.uActive.value = st < 3 ? st : -9;
          uniforms.uMix.value = 0;
          shown = st;
        }
        uniforms.uMix.value = Math.min(1, uniforms.uMix.value + dt * 1.2);
        const together = st === 3 ? 1 : 0;
        uniforms.uAll.value += (together - uniforms.uAll.value) * Math.min(1, dt * 2);
        lineMat.opacity += (together * 0.4 - lineMat.opacity) * Math.min(1, dt * 2);

        if (!pointerInside && !reduce) {
          offY = Math.sin(t * 0.18) * 0.12;
          offX = Math.sin(t * 0.13) * 0.02;
        }
        const [vy, vx] = VIEWS[st];
        const nowMs = performance.now();
        if (dragging) {
          // the pointer is turning it
        } else if (nowMs < manualUntil) {
          // let a flick coast to a stop, then hold where the visitor left it
          brain.rotation.y += spinVel * dt;
          spinVel *= Math.pow(0.04, dt);
        } else if (st === 3 && !reduce) {
          // Resting on "how it fits together": a slow, continuous spin
          brain.rotation.y += dt * 0.14;
        } else {
          // Turn the shortest way round to face the selected region
          let dy = vy + offY - brain.rotation.y;
          dy = Math.atan2(Math.sin(dy), Math.cos(dy));
          brain.rotation.y += dy * Math.min(1, dt * 1.6);
        }
        if (!dragging && nowMs >= manualUntil)
          brain.rotation.x += (vx + offX - brain.rotation.x) * Math.min(1, dt * 1.6);

        // Sparks: a few slow, soft flashes in the active region
        for (const sp of sparks) {
          const pts = st < 3 ? regionPoints[st] : null;
          if (!pts || reduce) {
            (sp.s.material as T.SpriteMaterial).opacity = 0;
            continue;
          }
          sp.life += sp.speed;
          if (sp.life >= 1) {
            sp.life = 0;
            sp.s.position.copy(pts[Math.floor(Math.random() * pts.length)]);
          }
          (sp.s.material as T.SpriteMaterial).opacity = Math.sin(sp.life * Math.PI) * 0.55;
        }
        // Signals travelling along the connections
        signals.forEach((sg, i) => {
          sg.t = (sg.t + dt * 0.12) % 1;
          sg.s.position.copy(curves[i].getPoint(sg.t));
          (sg.s.material as T.SpriteMaterial).opacity = reduce ? 0 : uniforms.uAll.value * 0.85;
        });
        lines.forEach((l) => (l.visible = lineMat.opacity > 0.01));

        brain.updateMatrixWorld();
        const boxes: { x0: number; x1: number; below: boolean }[] = [];
        anchors.forEach((a, i) => {
          const el = labelRefs.current[i];
          if (!el) return;
          tmp.copy(a).applyMatrix4(brain.matrixWorld);
          // Labels stay visible all the way round; dim slightly when the dot is behind
          const depthFade = i === st ? 1 : Math.min(1, Math.max(0.5, 0.75 + tmp.z));
          el.style.opacity = String(depthFade);
          tmp.project(camera);
          const lx = ((tmp.x + 1) / 2) * vw;
          el.style.transform = `translate(${lx}px, ${((1 - tmp.y) / 2) * vh}px)`;
          const btn = el.children[1] as HTMLElement | undefined;
          if (!btn) return;
          // flip sides if the label would run off the page
          const bw = btn.offsetWidth;
          const pageX = mountLeft + lx;
          let dir = LABEL_EXTENDS[i];
          if (dir === "right" && pageX + 10 + bw > window.innerWidth - 8) dir = "left";
          else if (dir === "left" && pageX - 10 - bw < Math.max(8, mountLeft - 16)) dir = "right"; // never over the headline
          btn.style.left = dir === "right" ? "10px" : "";
          btn.style.right = dir === "left" ? "10px" : "";
          let below = i === 1;
          // if the two upper labels would overlap, drop the back one below its dot
          if (i === 2 && boxes[0]) {
            const x0 = dir === "right" ? lx + 10 : lx - 10 - bw;
            const o = boxes[0];
            if (x0 < o.x1 + 6 && x0 + bw > o.x0 - 6) below = true;
          }
          btn.style.top = below ? "10px" : "";
          btn.style.bottom = below ? "" : "10px";
          boxes[i] = { x0: dir === "right" ? lx + 10 : lx - 10 - bw, x1: dir === "right" ? lx + 10 + bw : lx - 10, below };
        });

        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointerup", onUp);
        el.removeEventListener("pointercancel", onCancel);
        brain.traverse((o) => {
          const m = o as T.Mesh;
          if (m.geometry) m.geometry.dispose();
        });
        material.dispose();
        lineMat.dispose();
        glowTex.dispose();
        pmrem.dispose();
        renderer.dispose();
        el.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  const router = useRouter();
  // Clicking a selected service label opens its section on the services page.
  // On desktop hover already selects it, so one click navigates; on touch the
  // first tap selects and shows the list, the second tap navigates.
  const openService = (i: number) => {
    if (state === i) router.push(`/services#${practices[i].id}`);
    else pick(i);
  };
  const pick = (i: number) => {
    lastInteraction.current = Date.now();
    window.clearTimeout(returnTimer.current);
    setState(i);
  };
  const onEnterVisual = () => window.clearTimeout(returnTimer.current);
  const onLeaveVisual = () => {
    window.clearTimeout(returnTimer.current);
    returnTimer.current = window.setTimeout(() => setState(3), 1100);
  };
  const p = state < 3 ? practices[state] : null;

  return (
    <div className="w-full">
      <p className="font-heading text-sm tracking-[0.04em] text-secondary text-center">
        The anatomy of our services
      </p>
      <div
        className="relative w-full aspect-[6/5] max-h-[540px]"
        onMouseEnter={onEnterVisual}
        onMouseLeave={onLeaveVisual}
      >
        <div
          ref={mountRef}
          className="absolute inset-0"
          role="img"
          aria-label="Interactive 3D brain. Different regions light up for research and strategy, AI solutions, and AI visibility."
        />
        <div className="pointer-events-none absolute inset-0">
          {practices.map((pr, i) => {
            const on = i === state || state === 3;
            const open = i === state;
            return (
              <div
                key={pr.id}
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                className="absolute left-0 top-0 will-change-transform transition-opacity duration-500"
              >
                <span
                  className={`absolute -translate-x-1/2 -translate-y-1/2 block w-2 h-2 rounded-full ring-4 transition-colors ${
                    on ? "bg-accent ring-accent/15" : "bg-secondary/60 ring-black/5"
                  }`}
                />
                <button
                  onClick={() => openService(i)}
                  onMouseEnter={() => pick(i)}
                  className={`pointer-events-auto absolute text-left rounded-lg border bg-white/90 backdrop-blur-sm px-2.5 py-1.5 shadow-sm whitespace-nowrap transition-colors ${
                    open ? "border-accent/50" : "border-border hover:border-secondary/50"
                  }`}
                >
                  <span className={`block text-xs font-semibold ${on ? "text-accent" : "text-foreground"}`}>
                    {pr.titleBefore}
                    {pr.titleAccent}
                    {pr.titleAfter}
                  </span>
                  {open ? (
                    <ul className="mt-1 space-y-0.5">
                      {pr.included.map((item, k) => (
                        <li
                          key={item.name}
                          className="hero-chip text-[11px] text-secondary"
                          style={{ animationDelay: `${k * 70}ms` }}
                        >
                          {item.name}
                        </li>
                      ))}
                      <li className="pt-0.5 text-[11px] font-medium text-accent">See details →</li>
                    </ul>
                  ) : null}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-3 min-h-[7rem]" aria-live="polite">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase text-accent">
          {p ? `${p.titleBefore}${p.titleAccent}${p.titleAfter}` : TOGETHER.eyebrow}
        </p>
        <p className="font-heading text-lg leading-snug text-foreground mt-2">{p ? p.hook : TOGETHER.text}</p>

        <div className="mt-3 flex items-center gap-4">
          <Link
            href={p ? `/services#${p.id}` : "/services"}
            className="text-sm font-medium hover:text-accent transition-colors"
          >
            Learn more →
          </Link>
          <AskYourAI reason={p ? p.agentReason : "general"} variant="link" />
          <div className="flex gap-1.5 ml-auto" aria-label="Choose a view">
            {Array.from({ length: STATES }, (_, i) => (
              <button
                key={i}
                onClick={() => pick(i)}
                aria-label={i < 3 ? `${practices[i].titleBefore}${practices[i].titleAccent}${practices[i].titleAfter}` : TOGETHER.eyebrow}
                className={`h-1.5 rounded-full transition-all ${i === state ? "w-5 bg-accent" : "w-1.5 bg-border hover:bg-secondary"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
