import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";

const AmbientObjects = () => {
  const group = useRef<Group>(null!);
  const knot = useRef<Mesh>(null!);

  useFrame(({ clock, pointer }, delta) => {
    if (!group.current || !knot.current) return;
    group.current.rotation.y += delta * 0.025;
    group.current.rotation.x += delta * 0.008;
    group.current.position.x += (pointer.x * 0.35 - group.current.position.x) * 0.01;
    group.current.position.y += (pointer.y * 0.2 - group.current.position.y) * 0.01;
    knot.current.rotation.z = clock.elapsedTime * 0.035;
  });

  return (
    <group ref={group}>
      <Float speed={0.45} rotationIntensity={0.2} floatIntensity={0.35}>
        <mesh ref={knot} position={[4.4, 1.5, -3]} scale={1.7}>
          <torusKnotGeometry args={[1, 0.24, 120, 16]} />
          <meshBasicMaterial color="#4aa8ff" wireframe transparent opacity={0.1} />
        </mesh>
      </Float>
      <Float speed={0.35} rotationIntensity={0.25} floatIntensity={0.4}>
        <mesh position={[-4.7, -2.2, -4]} scale={1.5}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#9b7cff" wireframe transparent opacity={0.09} />
        </mesh>
      </Float>
      <mesh position={[0, -4.5, -6]} rotation={[Math.PI / 2.8, 0, 0]} scale={5}>
        <torusGeometry args={[1.6, 0.008, 8, 100]} />
        <meshBasicMaterial color="#56b6ff" transparent opacity={0.08} />
      </mesh>
    </group>
  );
};

const AmbientBackground = () => (
  <div className="ambient-background" aria-hidden="true">
    <Canvas
      camera={{ position: [0, 0, 8], fov: 48 }}
      dpr={[1, 1.35]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
    >
      <Stars radius={45} depth={25} count={1100} factor={2.2} saturation={0.35} fade speed={0.12} />
      <AmbientObjects />
    </Canvas>
  </div>
);

export default AmbientBackground;
