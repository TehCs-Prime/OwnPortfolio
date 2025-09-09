import { useEffect, useRef } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three-stdlib"
import { OrbitControls } from "three-stdlib"


const TimeLine = () => {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // === Scene, Camera, Renderer ===
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf5f5dc) // darker background

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, -50, 10)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mount.appendChild(renderer.domElement)

    // === Lights ===
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5)
    hemiLight.position.set(0, 20, 0)
    scene.add(hemiLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 2)
    dirLight.position.set(5, 10, 7.5)
    scene.add(dirLight)

    // === Load GLTF Model ===
    const loader = new GLTFLoader()
    loader.load(
    "/assets/scene.gltf",
    (gltf) => {
        gltf.scene.scale.set(0.01, 0.01, 0.01) // adjust scale if needed
        scene.add(gltf.scene)

        // === Auto-fit camera ===
        const box = new THREE.Box3().setFromObject(gltf.scene)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())

        // calculate the distance the camera needs to be
        const maxDim = Math.max(size.x, size.y, size.z)
        const fov = camera.fov * (Math.PI / 180)
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))

        cameraZ *= 1.0 // optional: padding so it's not too tight

        camera.position.set(-26.0933, 23.8651, -1.0641)
        //camera.position.set(center.x + cameraZ, center.y + cameraZ, center.z + cameraZ)

        //camera.lookAt(center)
        controls.target.set(-0.0001, 23.8582, -0.0018)


        controls.minDistance = cameraZ * 0.3 // how close you can zoom
        controls.maxDistance = cameraZ * 1.0   // how far you can zoom

        // make OrbitControls rotate around the model
        controls.target.copy(center)
        controls.update()
    },
    undefined,
    (error) => {
        console.error("Error loading model:", error)
    }
    )
    loader.load(
    "/assets/bckground.gltf",
    (gltf) => {
        const bg = gltf.scene
        bg.scale.set(50, 50, 50) // make it huge
        bg.position.set(0, 0, 0)
        
        // Flip normals so we can view inside it
        bg.traverse((child) => {
        if (child.isMesh) {
            child.material.side = THREE.BackSide
        }
        })

        scene.add(bg)
    },
    undefined,
    (error) => console.error("Error loading background:", error)
    )

    // === Controls ===
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    // === Animation Loop (always rendering) ===
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // === Resize Handling ===
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    // === Cleanup ===
    return () => {
      mount.removeChild(renderer.domElement)
      controls.dispose()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        position: "fixed",
        top: 0,
        left: 0,
      }}
    />
  )
}

export default TimeLine
