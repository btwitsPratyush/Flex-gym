import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface EquipmentCanvasProps {
  modelType: string;
  reduceMotion: boolean;
}

const TreadmillModel: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const beltRef = useRef<THREE.Mesh>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!reduceMotion) {
      if (groupRef.current) {
        groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      }
      if (beltRef.current) {
        beltRef.current.position.z = (state.clock.getElapsedTime() % 1) * 0.5;
      }
      if (screenRef.current) {
        screenRef.current.material.emissiveIntensity = 0.5 + Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 0.5, 2]} />
        <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Treadmill Belt */}
      <group position={[0, 0, 0]}>
        {[...Array(10)].map((_, i) => (
          <mesh 
            key={i}
            ref={i === 0 ? beltRef : undefined}
            position={[0, 0, i * 0.2 - 1]} 
            castShadow
          >
            <boxGeometry args={[4, 0.1, 0.1]} />
            <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
      </group>
      
      {/* Side Rails with Glow */}
      {[-2, 2].map((x) => (
        <group key={x} position={[x, 0.5, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.2, 1, 1.5]} />
            <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[x > 0 ? -0.1 : 0.1, 0, 0]}>
            <boxGeometry args={[0.05, 0.8, 1.3]} />
            <meshStandardMaterial 
              color="#ff3333" 
              emissive="#ff3333"
              emissiveIntensity={0.5} 
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      ))}
      
      {/* Console with Dynamic Screen */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[2, 0.5, 0.8]} />
        <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
      </mesh>
      
      <mesh 
        ref={screenRef}
        position={[0, 1.5, 0.45]} 
        castShadow
      >
        <boxGeometry args={[1.5, 0.4, 0.05]} />
        <meshStandardMaterial 
          color="#66aaff" 
          emissive="#66aaff"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

const SmithMachineModel: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const barRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!reduceMotion) {
      if (groupRef.current) {
        groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      }
      if (barRef.current) {
        barRef.current.position.y = 0.5 + Math.sin(state.clock.getElapsedTime()) * 0.3;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Frame Pillars with Glow */}
      {[-1.5, 1.5].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.1, 4, 16]} />
            <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[x > 0 ? -0.12 : 0.12, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 3.8, 8]} />
            <meshStandardMaterial 
              color="#ff3333" 
              emissive="#ff3333"
              emissiveIntensity={0.5}
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      ))}
      
      {/* Top Crossbar with Glow */}
      <group position={[0, 2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.1, 3.2, 16]} />
          <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.12]}>
          <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
          <meshStandardMaterial 
            color="#ff3333" 
            emissive="#ff3333"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
      
      {/* Animated Barbell Group */}
      <group ref={barRef}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 3, 16]} />
          <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Weights with Glow */}
        {[-1.2, 1.2].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.3, 32]} />
              <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[x > 0 ? -0.2 : 0.2, 0, 0]}>
              <cylinderGeometry args={[0.32, 0.32, 0.1, 32]} />
              <meshStandardMaterial 
                color="#ff3333" 
                emissive="#ff3333"
                emissiveIntensity={0.5}
                transparent
                opacity={0.3}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

const BikeMachineModel: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const wheelRef = useRef<THREE.Mesh>(null);
  const pedalRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!reduceMotion) {
      if (groupRef.current) {
        groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      }
      if (wheelRef.current) {
        wheelRef.current.rotation.z = state.clock.getElapsedTime() * 3;
      }
      if (pedalRef.current) {
        pedalRef.current.rotation.z = state.clock.getElapsedTime() * 3;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base with Glow */}
      <group position={[0, -0.5, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 0.2, 2]} />
          <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[2.1, 0.05, 2.1]} />
          <meshStandardMaterial 
            color="#ff3333" 
            emissive="#ff3333"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
      
      {/* Main frame with Glow */}
      <group position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.1, 2.5, 16]} />
          <meshStandardMaterial color="#ff3333" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.12, 0.12, 2.5, 16]} />
          <meshStandardMaterial 
            color="#ff3333" 
            emissive="#ff3333"
            emissiveIntensity={0.3}
            transparent
            opacity={0.2}
          />
        </mesh>
      </group>
      
      {/* Seat */}
      <mesh position={[0.8, 1.2, 0]} castShadow>
        <boxGeometry args={[0.6, 0.1, 0.6]} />
        <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Animated Wheel with Spokes */}
      <group position={[-0.8, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh ref={wheelRef} castShadow>
          <torusGeometry args={[0.7, 0.05, 16, 32]} />
          <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.3} />
        </mesh>
        {[...Array(8)].map((_, i) => (
          <mesh 
            key={i} 
            rotation={[0, 0, (Math.PI * 2 * i) / 8]}
            castShadow
          >
            <cylinderGeometry args={[0.02, 0.02, 1.4, 8]} />
            <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>
      
      {/* Animated Pedals */}
      <group ref={pedalRef} position={[-0.4, 0.5, 0]}>
        {[-0.2, 0.2].map((z) => (
          <mesh key={z} position={[0, 0, z]} castShadow>
            <boxGeometry args={[0.3, 0.05, 0.1]} />
            <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
      </group>
      
      {/* Handle bars with Glow */}
      <group position={[-0.4, 1.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
          <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 1, 16]} />
          <meshStandardMaterial 
            color="#ff3333" 
            emissive="#ff3333"
            emissiveIntensity={0.3}
            transparent
            opacity={0.2}
          />
        </mesh>
      </group>
    </group>
  );
};

const EquipmentCanvas: React.FC<EquipmentCanvasProps> = ({ modelType, reduceMotion }) => {
  let Model;
  
  switch (modelType) {
    case 'treadmill':
      Model = <TreadmillModel reduceMotion={reduceMotion} />;
      break;
    case 'smith':
      Model = <SmithMachineModel reduceMotion={reduceMotion} />;
      break;
    case 'bike':
      Model = <BikeMachineModel reduceMotion={reduceMotion} />;
      break;
    default:
      Model = <TreadmillModel reduceMotion={reduceMotion} />;
  }
  
  return (
    <Canvas shadows dpr={[1, 2]} style={{ background: '#1f1f1f' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <spotLight
        position={[0, 5, 0]}
        intensity={0.5}
        angle={0.5}
        penumbra={1}
        castShadow
      />
      {Model}
      <Environment preset="city" />
      {!reduceMotion && <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={1}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />}
    </Canvas>
  );
};

export default EquipmentCanvas;