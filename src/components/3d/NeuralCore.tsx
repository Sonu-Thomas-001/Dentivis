import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function NeuralCore({ scale = 1 }: { scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = state.clock.elapsedTime * -0.1;
      glowRef.current.rotation.y = state.clock.elapsedTime * -0.2;
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <group scale={scale}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2, 2]} />
          <MeshDistortMaterial
            color="#2563EB"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.8}
            roughness={0.2}
            distort={0.4}
            speed={2}
            wireframe
          />
        </mesh>
        <mesh ref={glowRef}>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshBasicMaterial color="#14B8A6" transparent opacity={0.15} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
        </mesh>
      </Float>
    </group>
  );
}
