import  { useEffect, useRef } from "react";
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
    camera.position.set(1, 7, 11);
    camera.lookAt(0, 0, 0);


    // === Renderer ===
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    

    // === Orbit Controls ===
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // smooth movement
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false; // pan only in camera plane
    controls.enablePan = true; // allow click+drag pan
    controls.enableZoom = false; // scroll to zoom
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };

    // === Load GLTF Model ===
    let model: THREE.Object3D | null = null;
    const loader = new GLTFLoader();
    loader.load(
      "/assets/space_boi/scene.gltf",
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
      },
      (xhr) => {
        console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}%`);
      },
      (error) => {
        console.error("Error loading GLTF:", error);
      }
    );

    // === Animation loop ===
    const animate = () => {
      requestAnimationFrame(animate);
       // Rotate the model slowly to the left (y-axis)
    if (model) {
        model.rotation.y -= 0.001; // adjust speed here
    }
      controls.update(); // required for damping
      renderer.render(scene, camera);
    };
    animate();

    // === Handle resize ===
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
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
