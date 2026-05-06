import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Upload, Focus, RotateCcw, Box, RefreshCw } from "lucide-react";
import * as THREE from "three";

function Loader({ progress }: { progress: number }) {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
        <span className="text-sm font-medium text-foreground whitespace-nowrap">{progress.toFixed(0)}% Loaded</span>
      </div>
    </Html>
  );
}

function StlModel({
  url,
  wireframe,
  color,
  onLoaded,
}: {
  url: string;
  wireframe: boolean;
  color: string;
  onLoaded: () => void;
}) {
  const [geom, setGeom] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    if (!url) return;
    const loader = new STLLoader();
    loader.load(url, (geometry) => {
      setGeom(geometry);
      onLoaded();
    });
  }, [url, onLoaded]);

  if (!geom) return null;
  
  return (
    <Center>
      <mesh geometry={geom} castShadow receiveShadow>
        <meshStandardMaterial 
          color={color} 
          wireframe={wireframe} 
          roughness={0.4} 
          metalness={0.1} 
          side={THREE.DoubleSide} 
        />
      </mesh>
    </Center>
  );
}

export function Viewer3D() {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [wireframe, setWireframe] = useState(false);
  const color = "#e2e8f0"; // Default tooth-like light grey
  const [autoRotate, setAutoRotate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const controlsRef = useRef<any>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setIsLoading(true);
      setModelUrl(url);
    }
  };

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4 shrink-0">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-foreground">3D Viewer</h1>
          <p className="text-muted-foreground mt-1 text-sm">Standalone STL model inspector with lighting and materials.</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileSelect}
            accept=".stl"
          />
          <Button onClick={() => fileInputRef.current?.click()} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm">
            <Upload className="w-4 h-4 mr-2" /> Load STL
          </Button>
        </div>
      </div>

      <Card className="flex-1 w-full rounded-2xl border-border shadow-sm overflow-hidden relative flex flex-col md:flex-row bg-muted/10">
        <div className="flex-1 relative min-h-[400px]">
          {!modelUrl ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
              <Box className="w-12 h-12 mb-3 text-muted-foreground/30" strokeWidth={1} />
              <p className="font-medium text-foreground">No model loaded</p>
              <p className="text-sm mt-1 mb-4">Upload an STL file to inspect it.</p>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="rounded-xl">
                Browse Files
              </Button>
            </div>
          ) : (
            <>
              {/* Overlay Controls */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-card/80 backdrop-blur-md p-2 rounded-2xl border border-border shadow-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={resetView}
                  title="Reset View"
                  className="rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground"
                >
                  <Focus className="w-4 h-4" />
                </Button>
                <Button 
                  variant={autoRotate ? "default" : "ghost"} 
                  size="icon" 
                  onClick={() => setAutoRotate(!autoRotate)}
                  title="Auto Rotate"
                  className={`rounded-xl ${autoRotate ? 'shadow-sm' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button 
                  variant={wireframe ? "default" : "ghost"} 
                  size="icon" 
                  onClick={() => setWireframe(!wireframe)}
                  title="Toggle Wireframe"
                  className={`rounded-xl ${wireframe ? 'shadow-sm' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                >
                  <Box className="w-4 h-4" />
                </Button>
              </div>

              <Canvas shadows camera={{ position: [0, 0, 100], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[50, 50, 50]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-50, -50, -50]} intensity={0.5} />
                
                {isLoading && <Loader progress={50} />}
                
                <Suspense fallback={null}>
                   <StlModel url={modelUrl} wireframe={wireframe} color={color} onLoaded={() => setIsLoading(false)} />
                   <Environment preset="city" />
                   <ContactShadows position={[0, -50, 0]} opacity={0.5} scale={100} blur={2} far={50} />
                </Suspense>

                <OrbitControls 
                  ref={controlsRef}
                  autoRotate={autoRotate}
                  autoRotateSpeed={2}
                  makeDefault
                  minDistance={10}
                  maxDistance={500}
                />
              </Canvas>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
