import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, SpotLight, Stars } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'motion/react';
import { NeuralCore } from '../3d/NeuralCore';
import { HolographicTeeth } from '../3d/HolographicTeeth';

export const CinematicBackground = () => {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020617]">
        <motion.div style={{ y: yBg }} className="absolute inset-0">
          <div className="absolute top-[10%] left-[20%] w-[800px] h-[800px] bg-[#2563EB]/10 blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute top-[40%] right-[10%] w-[600px] h-[600px] bg-[#14B8A6]/10 blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-10%] left-[30%] w-[1000px] h-[1000px] bg-[#6366F1]/10 blur-[200px] rounded-full mix-blend-screen" />
        </motion.div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
      </div>
      
      <div className="fixed inset-0 z-0 h-screen pointer-events-none opacity-80 mix-blend-screen">
        <Canvas frameloop="demand" camera={{ position: [0, 0, 15], fov: 45 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <SpotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} color="#2563EB" />
          <SpotLight position={[-10, -15, -10]} angle={0.3} penumbra={1} intensity={2} color="#14B8A6" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <group position={[0, 0, 0]}>
            <NeuralCore scale={1.2} />
          </group>
          <group position={[0, -1.5, 3]}>
            <HolographicTeeth />
          </group>
        </Canvas>
        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#020617] to-transparent"></div>
      </div>
    </>
  );
};
