import React, { useMemo } from 'react';
import { Line, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function HolographicTeeth() {
  // Create a jaw-like curve of points
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 60; i++) {
      const t = i / 60;
      const angle = t * Math.PI - Math.PI / 2;
      const radius = 3 + Math.cos(angle * 1.5) * 1.5;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius - 2;
      const y = Math.sin(t * Math.PI * 4) * 0.2 + (Math.random() - 0.5) * 0.5;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);
  
  const meshRadiuses = useMemo(() => {
    return points.map(() => 0.03 + Math.random() * 0.05);
  }, [points]);

  const particlePositions = useMemo(() => {
    const pos = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 4 + Math.random() * 2;
      
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius + (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = Math.cos(phi) * radius;
    }
    return pos;
  }, []);

  return (
    <group position={[0, -1, 0]} rotation={[0.2, 0.5, 0]}>
      <group>
        <Line 
          points={points}
          color="#2563EB"
          lineWidth={2}
          transparent
          opacity={0.6}
        />
        {points.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[meshRadiuses[i]]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#14B8A6" : "#2563EB"} 
              emissive={i % 2 === 0 ? "#14B8A6" : "#2563EB"}
              emissiveIntensity={2}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Ambient Neural Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color="#6366F1"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Glowing core connections */}
      <Line
        points={[new THREE.Vector3(0, -2, 0), new THREE.Vector3(0, 2, 0)]}
        color="#ffffff"
        lineWidth={1}
        transparent
        opacity={0.2}
      />
    </group>
  );
}
