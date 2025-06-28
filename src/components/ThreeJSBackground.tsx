
import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape: React.FC<{ position: [number, number, number]; color: string; shape: 'sphere' | 'box' | 'octahedron' }> = ({ position, color, shape }) => {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  let geometry;
  if (shape === 'sphere') {
    geometry = <sphereGeometry args={[0.5, 32, 32]} />;
  } else if (shape === 'box') {
    geometry = <boxGeometry args={[0.5, 0.5, 0.5]} />;
  } else {
    geometry = <octahedronGeometry args={[0.5]} />;
  }

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
};

const Scene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.2} />
      
      <FloatingShape position={[-4, 2, -2]} color="#3B82F6" shape="sphere" />
      <FloatingShape position={[4, -1, -3]} color="#8B5CF6" shape="box" />
      <FloatingShape position={[-2, -3, -1]} color="#06B6D4" shape="octahedron" />
      <FloatingShape position={[3, 3, -4]} color="#F59E0B" shape="sphere" />
      <FloatingShape position={[-5, -2, -2]} color="#EF4444" shape="box" />
      <FloatingShape position={[2, -4, -3]} color="#10B981" shape="octahedron" />
    </>
  );
};

const ThreeJSBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeJSBackground;
