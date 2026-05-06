import React from 'react';
import * as THREE from 'three';

export function NeuralCore({ scale = 1 }: { scale?: number }) {
  return (
    <group scale={scale} rotation={[0.2, 0.5, 0]}>
      <group>
        <mesh>
          <icosahedronGeometry args={[2, 2]} />
          <meshStandardMaterial
            color="#2563EB"
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshBasicMaterial color="#14B8A6" transparent opacity={0.15} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );
}
