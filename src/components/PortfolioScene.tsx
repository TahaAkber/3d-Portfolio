import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  Float,
  OrbitControls,
  Sparkles,
  Stars,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/models/Poimandres.gltf";

const PoimandresModel = () => {
  const modelRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(MODEL_PATH);

  const polishedScene = useMemo(() => {
    const copy = scene.clone(true);

    copy.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = true;
      child.receiveShadow = true;
      const originalMaterials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      child.material = originalMaterials.map((original, index) => {
        const source = original as THREE.MeshStandardMaterial;
        const material = new THREE.MeshPhysicalMaterial({
          color: index === 0 ? "#07172f" : "#bcecff",
          metalness: index === 0 ? 0.82 : 0.58,
          roughness: index === 0 ? 0.2 : 0.14,
          clearcoat: 1,
          clearcoatRoughness: 0.18,
          emissive: index === 0 ? "#073f86" : "#2e9ee8",
          emissiveIntensity: index === 0 ? 0.28 : 0.16,
          side: THREE.DoubleSide,
        });
        material.name = `${source.name || "Poimandres"}-polished`;
        return material;
      });

      if (originalMaterials.length === 1) {
        child.material = (child.material as THREE.Material[])[0];
      }
    });

    return copy;
  }, [scene]);

  useFrame((state, delta) => {
    if (!modelRef.current) return;
    const targetX = state.pointer.y * 0.09;
    const targetY = state.pointer.x * 0.16;
    modelRef.current.rotation.x = THREE.MathUtils.damp(
      modelRef.current.rotation.x,
      targetX,
      4,
      delta,
    );
    modelRef.current.rotation.y = THREE.MathUtils.damp(
      modelRef.current.rotation.y,
      targetY,
      4,
      delta,
    );
  });

  return (
    <Float speed={1.35} rotationIntensity={0.08} floatIntensity={0.22}>
      <group ref={modelRef} scale={0.62} rotation={[-0.03, 0, -0.02]}>
        <Center>
          <primitive object={polishedScene} />
        </Center>
      </group>
    </Float>
  );
};

const OrbitalRings = () => {
  const outerRef = useRef<THREE.Group>(null!);
  const innerRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.z += delta * 0.13;
      outerRef.current.rotation.x =
        Math.PI / 2.7 + Math.sin(state.clock.elapsedTime * 0.35) * 0.06;
    }
    if (innerRef.current) {
      innerRef.current.rotation.z -= delta * 0.2;
      innerRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.42) * 0.15;
    }
  });

  return (
    <group>
      <group ref={outerRef} rotation={[Math.PI / 2.7, 0.18, 0]}>
        <mesh>
          <torusGeometry args={[2.42, 0.018, 16, 180]} />
          <meshBasicMaterial
            color="#58c8ff"
            transparent
            opacity={0.72}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 3]}>
          <torusGeometry args={[2.42, 0.006, 12, 180, Math.PI * 1.38]} />
          <meshBasicMaterial
            color="#c18cff"
            transparent
            opacity={0.95}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <group ref={innerRef} rotation={[0.3, 0, Math.PI / 2]}>
        <mesh>
          <torusGeometry args={[2.08, 0.025, 20, 160]} />
          <meshStandardMaterial
            color="#7ad8ff"
            emissive="#2798ef"
            emissiveIntensity={1.2}
            transparent
            opacity={0.34}
          />
        </mesh>
      </group>

      <mesh position={[0, 0, -0.7]}>
        <circleGeometry args={[2.05, 96]} />
        <meshBasicMaterial
          color="#0b4d91"
          transparent
          opacity={0.075}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 0, -0.74]}>
        <ringGeometry args={[1.76, 2.04, 96]} />
        <meshBasicMaterial
          color="#7657e8"
          transparent
          opacity={0.09}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

const LoadingCore = () => (
  <mesh>
    <icosahedronGeometry args={[0.36, 2]} />
    <meshBasicMaterial color="#56b6ff" wireframe transparent opacity={0.65} />
  </mesh>
);

const PortfolioScene: React.FC = () => {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0.1, 7.4], fov: 38 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.52} />
        <hemisphereLight args={["#9bdcff", "#050817", 0.8]} />
        <spotLight
          position={[4, 5, 5]}
          color="#8edcff"
          intensity={34}
          angle={0.46}
          penumbra={0.9}
          distance={16}
        />
        <pointLight position={[-4, -2, 3]} color="#8b5cf6" intensity={16} />
        <pointLight position={[0, 1, -2]} color="#2eb7ff" intensity={12} />

        <Stars
          radius={38}
          depth={18}
          count={1800}
          factor={3.1}
          saturation={0.5}
          fade
          speed={0.22}
        />
        <Sparkles
          count={42}
          scale={[5.2, 5.2, 2.2]}
          size={2.4}
          speed={0.22}
          color="#79d4ff"
          opacity={0.6}
        />

        <OrbitalRings />
        <Suspense fallback={<LoadingCore />}>
          <PoimandresModel />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.055}
          rotateSpeed={0.45}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 1.55}
        />
      </Canvas>
      <div className="scene-label scene-label-top" aria-hidden="true">
        <span /> Poimandres / 3D
      </div>
      <div className="scene-label scene-label-bottom" aria-hidden="true">
        Drag to explore
      </div>
    </>
  );
};

useGLTF.preload(MODEL_PATH);

export default PortfolioScene;
