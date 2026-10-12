"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PINK = "#f0b4c9";
const PINK_DEEP = "#dd8fae";
const CREAM = "#f9dce7";
const BLACK = "#1a1216";
const GOLD = "#d4af5a";

function Tier({
  radius,
  height,
  y,
  color,
}: {
  radius: number;
  height: number;
  y: number;
  color: string;
}) {
  return (
    <mesh position={[0, y, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[radius, radius, height, 96]} />
      <meshStandardMaterial color={color} roughness={0.42} metalness={0.02} />
    </mesh>
  );
}

/** Piping de crema: esferitas alrededor del borde del tier */
function CreamBorder({
  radius,
  y,
  bead = 0.075,
  color = CREAM,
}: {
  radius: number;
  y: number;
  bead?: number;
  color?: string;
}) {
  const beads = useMemo(() => {
    const count = Math.floor((radius * 2 * Math.PI) / (bead * 1.55));
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2;
      return {
        pos: [Math.cos(a) * radius, y, Math.sin(a) * radius] as const,
        scale: 1 + Math.sin(i * 2.7) * 0.12,
      };
    });
  }, [radius, y, bead]);

  return (
    <group>
      {beads.map((b, i) => (
        <mesh key={i} position={[...b.pos]} scale={[1, b.scale * 0.72, 1]}>
          <sphereGeometry args={[bead, 20, 20]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/** Moño coquette: dos loops + nudo + cintas colgando */
function Bow({
  position,
  rotationY = 0,
  scale = 1,
}: {
  position: [number, number, number];
  rotationY?: number;
  scale?: number;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* loops */}
      <mesh position={[-0.16, 0.02, 0]} rotation={[0.15, 0, 0.62]} scale={[1, 0.78, 0.55]}>
        <torusGeometry args={[0.13, 0.045, 14, 28]} />
        <meshStandardMaterial color={BLACK} roughness={0.55} />
      </mesh>
      <mesh position={[0.16, 0.02, 0]} rotation={[0.15, 0, -0.62]} scale={[1, 0.78, 0.55]}>
        <torusGeometry args={[0.13, 0.045, 14, 28]} />
        <meshStandardMaterial color={BLACK} roughness={0.55} />
      </mesh>
      {/* nudo */}
      <mesh>
        <sphereGeometry args={[0.058, 16, 16]} />
        <meshStandardMaterial color={BLACK} roughness={0.5} />
      </mesh>
      {/* tails */}
      <mesh position={[-0.085, -0.25, 0]} rotation={[0, 0, 0.28]}>
        <boxGeometry args={[0.068, 0.4, 0.02]} />
        <meshStandardMaterial color={BLACK} roughness={0.6} />
      </mesh>
      <mesh position={[0.085, -0.26, 0]} rotation={[0, 0, -0.24]}>
        <boxGeometry args={[0.068, 0.42, 0.02]} />
        <meshStandardMaterial color={BLACK} roughness={0.6} />
      </mesh>
      {/* perla dorada en el centro del nudo */}
      <mesh position={[0, 0, 0.065]}>
        <sphereGeometry args={[0.028, 14, 14]} />
        <meshStandardMaterial color={GOLD} metalness={0.95} roughness={0.22} />
      </mesh>
    </group>
  );
}

/** Perlas doradas distribuidas en un tier */
function GoldPearls({
  radius,
  y,
  count,
  offset = 0,
}: {
  radius: number;
  y: number;
  count: number;
  offset?: number;
}) {
  const pearls = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = offset + (i / count) * Math.PI * 2;
        return [Math.cos(a) * radius, y + Math.sin(i * 3.1) * 0.05, Math.sin(a) * radius] as const;
      }),
    [radius, y, count, offset],
  );
  return (
    <group>
      {pearls.map((p, i) => (
        <mesh key={i} position={[...p]}>
          <sphereGeometry args={[0.028, 14, 14]} />
          <meshStandardMaterial color={GOLD} metalness={0.95} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

/** Vela dorada ondulada — la firma de la torta de la foto */
function WavyCandle({
  position,
  height = 1,
  phase = 0,
}: {
  position: [number, number, number];
  height?: number;
  phase?: number;
}) {
  const geometry = useMemo(() => {
    const points = Array.from({ length: 24 }, (_, i) => {
      const t = i / 23;
      return new THREE.Vector3(
        Math.sin(t * 6.4 + phase) * 0.085 * t,
        t * height,
        Math.cos(t * 5.6 + phase) * 0.07 * t,
      );
    });
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 48, 0.016, 10, false);
  }, [height, phase]);

  return (
    <mesh position={position} geometry={geometry}>
      <meshStandardMaterial
        color={GOLD}
        metalness={1}
        roughness={0.18}
        emissive="#3a2c0a"
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

export default function Cake3D() {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.32;
    if (tilt.current) {
      const targetX = state.pointer.y * -0.14;
      const targetZ = state.pointer.x * 0.09;
      tilt.current.rotation.x = THREE.MathUtils.lerp(
        tilt.current.rotation.x,
        targetX,
        0.045,
      );
      tilt.current.rotation.z = THREE.MathUtils.lerp(
        tilt.current.rotation.z,
        targetZ,
        0.045,
      );
    }
  });

  return (
    <group ref={tilt} position={[0, -0.55, 0]}>
      <group ref={spin}>
        {/* Bandeja dorada */}
        <mesh position={[0, -0.06, 0]} receiveShadow>
          <cylinderGeometry args={[1.62, 1.5, 0.1, 96]} />
          <meshStandardMaterial
            color="#dcb96a"
            metalness={0.72}
            roughness={0.34}
            emissive="#4a3512"
            emissiveIntensity={0.28}
          />
        </mesh>
        <mesh position={[0, -0.005, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.6, 0.02, 12, 96]} />
          <meshStandardMaterial color={GOLD} metalness={0.95} roughness={0.2} />
        </mesh>

        {/* Tier inferior */}
        <Tier radius={1.15} height={1.05} y={0.53} color={PINK} />
        <CreamBorder radius={1.13} y={0.04} />
        <CreamBorder radius={1.13} y={1.04} bead={0.085} />
        {/* swags de crema en el tier inferior */}
        <CreamBorder radius={1.16} y={0.82} bead={0.045} color={PINK_DEEP} />

        {/* Tier superior */}
        <Tier radius={0.82} height={0.8} y={1.45} color={PINK} />
        <CreamBorder radius={0.8} y={1.07} bead={0.065} />
        <CreamBorder radius={0.8} y={1.85} bead={0.08} />

        {/* Cinta negra entre tiers */}
        <mesh position={[0, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.94, 0.035, 12, 96]} />
          <meshStandardMaterial color={BLACK} roughness={0.5} />
        </mesh>

        {/* Moños alrededor del tier inferior */}
        <Bow position={[0, 0.78, 1.2]} scale={1.25} />
        <Bow position={[1.1, 0.76, 0.46]} rotationY={1.18} />
        <Bow position={[-1.1, 0.76, 0.46]} rotationY={-1.18} />
        <Bow position={[0.62, 0.76, -1.03]} rotationY={2.6} scale={0.9} />
        <Bow position={[-0.62, 0.76, -1.03]} rotationY={-2.6} scale={0.9} />

        {/* Moño principal arriba */}
        <Bow position={[0, 1.52, 0.88]} scale={1.05} />

        {/* Perlas doradas */}
        <GoldPearls radius={1.16} y={0.55} count={9} offset={0.2} />
        <GoldPearls radius={0.83} y={1.62} count={7} offset={0.6} />

        {/* Velas doradas onduladas */}
        <WavyCandle position={[0, 1.85, 0]} height={1.5} phase={0} />
        <WavyCandle position={[0.32, 1.85, 0.18]} height={1.28} phase={1.4} />
        <WavyCandle position={[-0.3, 1.85, 0.2]} height={1.38} phase={2.8} />
        <WavyCandle position={[0.14, 1.85, -0.3]} height={1.18} phase={4.1} />
        <WavyCandle position={[-0.2, 1.85, -0.24]} height={1.32} phase={5.3} />
      </group>
    </group>
  );
}
