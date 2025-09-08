import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { ReactNode } from "react";

interface TriangularCornerProps {
  children?: ReactNode;
}

export default function TriangularCorner({ children }: TriangularCornerProps) {
  return (
    <div className="w-screen h-screen">
      {/* x: Red ; y: Green ; z: Blue */}
      <Canvas camera={{ position: [20, 20, 40], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Floor (XZ planes, top + bottom) */}
        <gridHelper args={[100, 10, "white", "green"]} position={[0, -50, 0]} />
        <gridHelper args={[100, 10, "white", "green"]} position={[0, 50, 0]} />

        {/* Back wall (YZ planes, left + right) */}
        <gridHelper
          args={[100, 10, "white", "blue"]}
          rotation={[0, 0, Math.PI / 2]}
          position={[-50, 0, 0]}
        />
        <gridHelper
          args={[100, 10, "white", "blue"]}
          rotation={[0, 0, Math.PI / 2]}
          position={[50, 0, 0]}
        />

        {/* Side wall (XY planes, front + back) */}
        <gridHelper
          args={[100, 10, "white", "red"]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, -50]}
        />
        <gridHelper
          args={[100, 10, "white", "red"]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 50]}
        />

        {/* Axes reference */}
        <axesHelper args={[5]} />

        {/* Render whatever is passed in */}
        {children}

        {/* Camera controls */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}
