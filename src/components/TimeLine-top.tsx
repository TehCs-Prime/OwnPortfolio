import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import { OrbitControls } from "three-stdlib";

const SpaceBoiScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // === Scene ===
    const scene = new THREE.Scene();

    // === Camera ===
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );

    // Set camera position based on screen size
    const isMobile = window.innerWidth <= 768;
    camera.position.set(isMobile ? 0.5 : 1, isMobile ? 4 : 7, isMobile ? 6 : 11);
    camera.lookAt(0, 0, 0);

    // === Renderer ===
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    // Tell OrbitControls not to block page scroll
    renderer.domElement.style.touchAction = "pan-y";
    mount.appendChild(renderer.domElement);
    
    // === Orbit Controls ===
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };
    // Get the current polar angle (the default starting angle)
    const currentPolar = controls.getPolarAngle();

    // Lock vertical rotation to that angle
    controls.minPolarAngle = currentPolar;
    controls.maxPolarAngle = currentPolar;


    // === Load GLTF Model ===
    let model: THREE.Object3D | null = null;
    const loader = new GLTFLoader();
    loader.load(
      "/assets/space_boi/scene.gltf",
      (gltf) => {
        model = gltf.scene;
        // Adjust model scale for mobile
        model.scale.setScalar(isMobile ? 0.5 : 1);
        scene.add(model);
      },
      (xhr) => {
        console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}%`);
      },
      (error) => {
        console.error("Error loading GLTF:", error);
      }
    );

    // We'll rotate the model directly on horizontal drags, and let vertical drags scroll the page.
    renderer.domElement.style.touchAction = "pan-y"; // important for mobile

    let isPointerDown = false;
    let isHorizontalDrag: boolean | null = null;
    let startX = 0;
    let startY = 0;
    let lastX = 0;

    const HORIZONTAL_THRESHOLD = 6; // pixels to decide direction (tweak if needed)
    const ROTATION_SPEED = 0.005; // tweak to change sensitivity

    const onPointerDown = (e: PointerEvent) => {
      // Only handle primary pointer (ignore multitouch for now)
      if (!e.isPrimary) return;
      isPointerDown = true;
      isHorizontalDrag = null;
      startX = e.clientX;
      startY = e.clientY;
      lastX = e.clientX;
      try {
        (e.target as Element).setPointerCapture(e.pointerId);
      } catch  {
        /* ignore if not supported */
      }
      // Temporarily disable OrbitControls so there is no conflict while deciding gesture
      controls.enabled = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown || !e.isPrimary) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      // Decide gesture direction once user moved enough
      if (isHorizontalDrag === null) {
        if (Math.abs(dx) > HORIZONTAL_THRESHOLD || Math.abs(dy) > HORIZONTAL_THRESHOLD) {
          isHorizontalDrag = Math.abs(dx) > Math.abs(dy);
          // If it was vertical, release pointer capture to allow page scrolling to continue smoothly
          if (!isHorizontalDrag) {
            try {
              (e.target as Element).releasePointerCapture(e.pointerId);
            } catch {}
            // restore controls (we disabled on pointerdown)
            controls.enabled = true;
            // stop tracking pointer drag, let browser handle vertical gesture
            isPointerDown = false;
            isHorizontalDrag = null;
            return;
          }
        } else {
          // not enough movement yet
          return;
        }
      }

      if (isHorizontalDrag) {
        // prevent the browser from hijacking the horizontal gesture
        // (pointermove passive isn't a thing, but in case we need to prevent)
        e.preventDefault?.();

        const delta = e.clientX - lastX;
        lastX = e.clientX;

        if (model) {
          // rotate the model horizontally
          model.rotation.y += delta * ROTATION_SPEED;
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!e.isPrimary) return;
      isPointerDown = false;
      isHorizontalDrag = null;
      try {
        (e.target as Element).releasePointerCapture(e.pointerId);
      } catch {}
      // re-enable OrbitControls for other interactions (but vertical is still locked)
      controls.enabled = true;
    };

    // Use passive: false for pointermove because we call preventDefault when rotating
    renderer.domElement.addEventListener("pointerdown", onPointerDown, { passive: true });
    renderer.domElement.addEventListener("pointermove", onPointerMove, { passive: false });
    renderer.domElement.addEventListener("pointerup", onPointerUp, { passive: true });
    renderer.domElement.addEventListener("pointercancel", onPointerUp, { passive: true });

    // === Animation loop ===
    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        model.rotation.y -= 0.001;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // === Handle resize ===
    const handleResize = () => {
      if (!mount) return;
      const isMobile = window.innerWidth <= 768;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();

      // Adjust camera position on resize
      camera.position.set(isMobile ? 0.5 : 1, isMobile ? 4 : 7, isMobile ? 6 : 11);

      // Adjust model scale if loaded
      if (model) {
        model.scale.setScalar(isMobile ? 0.5 : 1);
      }

      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // === Cleanup ===
    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        maxWidth:'100%',
        margin: 0,
        padding: 0,
        position: "relative",
        top: 0,
        left: 0,
      }}
    />
  );
};

export default SpaceBoiScene;
