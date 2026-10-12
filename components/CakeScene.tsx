"use client";

import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
} from "@react-three/drei";
import Cake3D from "./Cake3D";

export default function CakeScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.15, 5.6], fov: 36 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 7, 5]} intensity={1.5} />
      <directionalLight position={[-5, 4, -3]} intensity={0.45} color="#ffd9e6" />

      <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.55}>
        <Cake3D />
      </Float>

      <ContactShadows
        position={[0, -2.15, 0]}
        opacity={0.3}
        scale={10}
        blur={2.8}
        far={4}
        color="#7a4652"
      />

      {/* Environment procedural local (sin red): reflejos en los dorados */}
      <Environment resolution={256}>
        <group>
          <Lightformer
            form="rect"
            intensity={4}
            position={[0, 5, 6]}
            scale={[8, 6, 1]}
            color="#fff5f8"
          />
          <Lightformer
            form="rect"
            intensity={2}
            position={[-6, 2, 1]}
            rotation-y={Math.PI / 2}
            scale={[6, 3, 1]}
            color="#ffd3e0"
          />
          <Lightformer
            form="rect"
            intensity={1.6}
            position={[6, 1, 0]}
            rotation-y={-Math.PI / 2}
            scale={[6, 3, 1]}
            color="#ffe9c4"
          />
        </group>
      </Environment>
    </Canvas>
  );
}
