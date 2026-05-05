import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Center, Box, Cylinder } from "@react-three/drei";
import { Suspense } from "react";
import { useTheme } from "../lib/useTheme";

function MockJawModel() {
  return (
    <group>
      {/* Arch representation */}
      <Cylinder args={[2, 2, 0.5, 32, 1, false, 0, Math.PI]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#6366F1" roughness={0.4} opacity={0.6} transparent />
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
  const { theme } = useTheme();
  
  return (
    <div className="w-full h-[400px] bg-muted/30 rounded-t-2xl sm:rounded-t-none overflow-hidden relative flex items-center justify-center">
      <Suspense fallback={<div className="text-muted-foreground font-mono text-sm tracking-wider">LOADING SECURE 3D MODEL...</div>}>
        <Canvas shadows camera={{ position: [0, 4, 6], fov: 45 }}>
          {theme === "dark" ? <color attach="background" args={["#0B1120"]} /> : <color attach="background" args={["#f1f5f9"]} />}
          <Stage environment="city" intensity={theme === "dark" ? 0.4 : 0.6}>
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
