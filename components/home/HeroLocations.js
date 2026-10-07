"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";

const locations = [
  {
    src: "/images/sigiriya-hero.jpg",
    place: "Sigiriya",
    region: "Cultural Triangle",
    focal: [0.68, 0.42],
  },
  {
    src: "/images/kandy-temple.jpg",
    place: "Kandy",
    region: "Hill capital",
    focal: [0.58, 0.48],
  },
  {
    src: "/images/ella-valley.jpg",
    place: "Ella",
    region: "Hill country",
    focal: [0.5, 0.5],
  },
  {
    src: "/images/yala-elephants.jpg",
    place: "Yala",
    region: "Wildlife",
    focal: [0.4, 0.52],
  },
  {
    src: "/images/galle-fort.jpg",
    place: "Galle",
    region: "South coast",
    focal: [0.5, 0.42],
  },
];

let snapshot = {
  index: 0,
  place: locations[0].place,
  region: locations[0].region,
};
let requested = null;
const listeners = new Set();

function emit(next) {
  snapshot = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

export function chooseHeroLocation(index) {
  requested = index;
}

function useHeroLocation() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

function wrapDelta(placeIndex, shown, count) {
  let delta = placeIndex - shown;
  delta = ((delta % count) + count) % count;
  if (delta > count / 2) delta -= count;
  return delta;
}

function coverTexture(texture, aspect, focalX, focalY) {
  const imageAspect = texture.image.width / texture.image.height;
  if (imageAspect > aspect) {
    const repeatX = aspect / imageAspect;
    texture.repeat.set(repeatX, 1);
    texture.offset.set((1 - repeatX) * focalX, 0);
    return;
  }
  const repeatY = imageAspect / aspect;
  texture.repeat.set(1, repeatY);
  texture.offset.set(0, (1 - repeatY) * (1 - focalY));
}

export function HeroLocations() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setClearColor(0x173f35, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    camera.position.set(0, 0.15, 8);

    const planes = [];
    const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    const loader = new THREE.TextureLoader();

    locations.forEach((location, index) => {
      const material = new THREE.MeshBasicMaterial({ color: 0x173f35 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.visible = false;
      scene.add(mesh);
      planes.push({ mesh, material, texture: null, focal: location.focal });

      loader.load(location.src, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        material.map = texture;
        material.color.set(0xffffff);
        material.needsUpdate = true;
        mesh.visible = true;
        planes[index].texture = texture;
        fit();
      });
    });

    let width = 1;
    let height = 1;

    function fit() {
      const nextWidth = host.clientWidth;
      const nextHeight = host.clientHeight;
      if (!nextWidth || !nextHeight) return;
      renderer.setSize(nextWidth, nextHeight, false);
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      const distance = camera.position.z;
      const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * distance;
      height = viewHeight * 1.16;
      width = height * camera.aspect * 1.08;
      planes.forEach((plane) => {
        plane.mesh.scale.set(width, height, 1);
        if (plane.texture) coverTexture(plane.texture, width / height, plane.focal[0], plane.focal[1]);
      });
    }

    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(host);
    fit();

    let shown = 0;
    let index = 0;
    let lastAdvance = performance.now();
    let visible = true;
    const count = locations.length;

    function goTo(target) {
      const current = Math.round(shown);
      const currentMod = ((current % count) + count) % count;
      let forward = (target - currentMod + count) % count;
      const back = forward - count;
      if (Math.abs(back) < forward) forward = back;
      index = current + forward;
      lastAdvance = performance.now();
    }

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(host);

    let frame = 0;
    function tick(now) {
      frame = requestAnimationFrame(tick);
      if (requested !== null) {
        goTo(requested);
        requested = null;
      }
      if (!reduce && visible && !document.hidden && now - lastAdvance > 6200) {
        index += 1;
        lastAdvance = now;
      }
      const ease = reduce ? 1 : 0.04;
      shown += (index - shown) * ease;
      if (Math.abs(index - shown) < 0.0008) shown = index;

      planes.forEach((plane, placeIndex) => {
        const delta = wrapDelta(placeIndex, shown, count);
        const abs = Math.abs(delta);
        plane.mesh.visible = Boolean(plane.texture) && abs < 1.35;
        plane.mesh.position.set(delta * width * 0.74, 0, -abs * 1.5);
        plane.mesh.rotation.y = -delta * 0.46;
      });

      const active = ((Math.round(shown) % count) + count) % count;
      if (active !== snapshot.index) {
        const location = locations[active];
        emit({ index: active, place: location.place, region: location.region });
      }
      renderer.render(scene, camera);
    }
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      geometry.dispose();
      planes.forEach((plane) => {
        plane.texture?.dispose();
        plane.material.dispose();
      });
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}

export function HeroLocationCaption() {
  const active = useHeroLocation();

  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
      <p className="text-sm text-ivory/85">
        {active.place}, {active.region}
      </p>
      <div className="flex" role="tablist" aria-label="Places in the hero">
        {locations.map((location, index) => {
          const selected = index === active.index;
          return (
            <button
              key={location.place}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={`${location.place}, ${location.region}`}
              onClick={() => chooseHeroLocation(index)}
              className="inline-flex size-11 items-center justify-center"
            >
              <span className={selected ? "block size-2.5 rounded-full bg-ivory" : "block size-2 rounded-full bg-ivory/45"} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
