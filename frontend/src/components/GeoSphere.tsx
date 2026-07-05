import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WireGlobe() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.12;
      mesh.current.rotation.x = 0.25;
    }
  });

  return (
    <>
      {/* Main wireframe sphere */}
      <mesh ref={mesh}>
        <icosahedronGeometry args={[2.2, 5]} />
        <meshBasicMaterial
          color="#10b981"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      {/* Inner solid sphere — very faint glow */}
      <mesh>
        <sphereGeometry args={[2.15, 32, 32]} />
        <meshBasicMaterial color="#059669" transparent opacity={0.04} />
      </mesh>
    </>
  );
}

export default function GeoSphere() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <WireGlobe />
      </Canvas>
    </div>
  );
}
