import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { DoubleSide } from "three";

const FloatingScene = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.18;
      meshRef.current.rotation.y += delta * 0.24;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.35, 4]} />
        <meshStandardMaterial
          color="#5db9ff"
          roughness={0.12}
          metalness={0.85}
          emissive="#2a7ef2"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1.7, 1.7, 1.7]}>
        <ringGeometry args={[1.95, 2.08, 112]} />
        <meshBasicMaterial
          color="#56b6ff"
          transparent
          opacity={0.14}
          side={DoubleSide}
        />
      </mesh>
      <mesh rotation={[0, 0, 0]} scale={[1.2, 1.2, 1.2]}>
        <torusGeometry args={[1.7, 0.06, 32, 120]} />
        <meshStandardMaterial color="#55c8ff" transparent opacity={0.18} />
      </mesh>
    </group>
  );
};

const PortfolioScene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} />
      <directionalLight position={[-5, -3, -4]} intensity={0.6} />
      <Stars
        radius={40}
        depth={20}
        count={3000}
        factor={4}
        saturation={0.35}
        fade
        speed={0.3}
      />
      <FloatingScene />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.9}
      />
    </Canvas>
  );
};

export default PortfolioScene;
