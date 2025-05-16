import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  reduceMotion: boolean;
}

// Dummy model - in a real scenario, you'd use actual GLTF models
const DumbbellModel: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0], reduceMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && !reduceMotion) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group position={new THREE.Vector3(...position)} rotation={new THREE.Euler(...rotation)} scale={scale}>
      <mesh ref={meshRef} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 5, 32]} />
        <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Left weight */}
      <mesh position={[-2.5, 0, 0]} castShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.8, 32]} />
        <meshStandardMaterial color="#ff3333" metalness={0.5} roughness={0.2} />
      </mesh>
      {/* Right weight */}
      <mesh position={[2.5, 0, 0]} castShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.8, 32]} />
        <meshStandardMaterial color="#ff3333" metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  );
};

interface HeroCanvasProps {
  reduceMotion: boolean;
}

const Scene: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 0, 10);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <DumbbellModel position={[0, 0, 0]} scale={1} reduceMotion={reduceMotion} />
      {/* We would add more equipment models in a real implementation */}
      <Environment preset="city" />
      {!reduceMotion && <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />}
    </>
  );
};

const HeroCanvas: React.FC<HeroCanvasProps> = ({ reduceMotion }) => {
  return (
    <Canvas shadows dpr={[1, 2]} style={{ background: 'black' }}>
      <Scene reduceMotion={reduceMotion} />
    </Canvas>
  );
};

export default HeroCanvas;