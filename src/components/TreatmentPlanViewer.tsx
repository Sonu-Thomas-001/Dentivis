import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Center, Box, Cylinder } from "@react-three/drei";
import { Suspense } from "react";

function MockJawModel() {
  return (
    <group>
      {/* Arch representation */}
      <Cylinder args={[2, 2, 0.5, 32, 1, false, 0, Math.PI]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#f87171" roughness={0.3} />
      </Cylinder>
      {/* Mock teeth */}
      {[-1.5, -1, -0.5, 0, 0.5, 1, 1.5].map((x, i) => (
        <Box key={i} args={[0.3, 0.4, 0.3]} position={[x, Math.sin(x * Math.PI) * 0.5 + 1.8, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </Box>
      ))}
    </group>
  );
}

export function TreatmentPlanViewer() {
  return (
    <div className="w-full h-[400px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-inner relative flex items-center justify-center">
      <Suspense fallback={<div className="text-slate-400 font-mono text-sm tracking-wider">LOADING 3D MODEL...</div>}>
        <Canvas shadows camera={{ position: [0, 4, 6], fov: 45 }}>
          <color attach="background" args={["#0f172a"]} />
          <Stage environment="city" intensity={0.5}>
            <Center>
              <MockJawModel />
            </Center>
          </Stage>
          <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
        </Canvas>
      </Suspense>
    </div>
  );
}
