import React, { useState, useRef, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Center, OrbitControls, Environment, ContactShadows, Html, SpotLight } from "@react-three/drei";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Upload, Focus, RotateCcw, Box, RefreshCw, Sparkles, Send, Stethoscope, AlertCircle, TrendingUp } from "lucide-react";
import * as THREE from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "../components/ui/sheet";
import { Input } from "../components/ui/input";

function Loader({ progress }: { progress?: number }) {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 relative flex items-center justify-center">
           <RefreshCw className="w-8 h-8 animate-spin text-secondary absolute" />
           <div className="absolute inset-0 rounded-full border border-t border-primary animate-[spin_2s_linear_infinite]"></div>
        </div>
        <span className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">Translating Mesh...</span>
      </div>
    </Html>
  );
}

function STLModel({ url, wireframe, color }: any) {
  const geometry = useLoader(STLLoader, url);
  return (
    <mesh geometry={geometry}>
       <meshPhysicalMaterial 
         color={color === '#e2e8f0' ? '#0F172A' : color} 
         emissive="#14B8A6"
         emissiveIntensity={0.2}
         wireframe={wireframe} 
         roughness={0.1} 
         metalness={0.8} 
         transmission={0.9}
         thickness={2}
         clearcoat={1}
         side={THREE.DoubleSide} 
       />
    </mesh>
  );
}

function OBJModel({ url, wireframe, color }: any) {
  const obj = useLoader(OBJLoader, url) as THREE.Group;
  const meshColor = color === '#e2e8f0' ? '#0F172A' : color;
  
  React.useEffect(() => {
    obj.traverse((child: any) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
             color: meshColor,
             emissive: "#14B8A6",
             emissiveIntensity: 0.2,
             wireframe: wireframe,
             roughness: 0.1,
             metalness: 0.8,
             transmission: 0.9,
             thickness: 2,
             clearcoat: 1,
             side: THREE.DoubleSide
        });
      }
    });
  }, [obj, wireframe, meshColor]);

  return <primitive object={obj} />;
}

function FBXModel({ url, wireframe, color }: any) {
  const fbx = useLoader(FBXLoader, url) as THREE.Group;
  const meshColor = color === '#e2e8f0' ? '#0F172A' : color;
  
  React.useEffect(() => {
    fbx.traverse((child: any) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
             color: meshColor,
             emissive: "#14B8A6",
             emissiveIntensity: 0.2,
             wireframe: wireframe,
             roughness: 0.1,
             metalness: 0.8,
             transmission: 0.9,
             thickness: 2,
             clearcoat: 1,
             side: THREE.DoubleSide
        });
      }
    });
  }, [fbx, wireframe, meshColor]);

  return <primitive object={fbx} />;
}

function GLTFModel({ url, wireframe, color }: any) {
  const gltf = useLoader(GLTFLoader, url) as any;
  const meshColor = color === '#e2e8f0' ? '#0F172A' : color;
  
  React.useEffect(() => {
    gltf.scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
             color: meshColor,
             emissive: "#14B8A6",
             emissiveIntensity: 0.2,
             wireframe: wireframe,
             roughness: 0.1,
             metalness: 0.8,
             transmission: 0.9,
             thickness: 2,
             clearcoat: 1,
             side: THREE.DoubleSide
        });
      }
    });
  }, [gltf, wireframe, meshColor]);

  return <primitive object={gltf.scene} />;
}


const DynamicModel = React.memo(function DynamicModel({
  url,
  type,
  wireframe,
  color,
  transformations,
}: {
  url: string;
  type: string;
  wireframe: boolean;
  color: string;
  transformations: { posX: number; posY: number; posZ: number; rotX: number; rotY: number; rotZ: number; scale: number; };
}) {
  return (
    <Center>
      <group 
        position={[transformations.posX, transformations.posY, transformations.posZ]}
        rotation={[transformations.rotX * (Math.PI / 180), transformations.rotY * (Math.PI / 180), transformations.rotZ * (Math.PI / 180)]}
        scale={[transformations.scale, transformations.scale, transformations.scale]}
      >
        {type === 'stl' && <STLModel url={url} wireframe={wireframe} color={color} />}
        {type === 'obj' && <OBJModel url={url} wireframe={wireframe} color={color} />}
        {type === 'fbx' && <FBXModel url={url} wireframe={wireframe} color={color} />}
        {(type === 'gltf' || type === 'glb') && <GLTFModel url={url} wireframe={wireframe} color={color} />}
      </group>
    </Center>
  );
});

export function Viewer3D() {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [modelType, setModelType] = useState<string | null>(null);
  const [wireframe, setWireframe] = useState(false); // set default to false for solid viewing
  const color = "#e2e8f0"; 
  const [autoRotate, setAutoRotate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const controlsRef = useRef<any>(null);

  const defaultTransform = { posX: 0, posY: 0, posZ: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1 };
  const [transformations, setTransformations] = useState(defaultTransform);
  const [selectedTooth, setSelectedTooth] = useState("All");

  const updateTransform = (key: keyof typeof defaultTransform, value: number) => {
    setTransformations(prev => ({ ...prev, [key]: value }));
  };

  const [messages, setMessages] = useState([
    { role: "ai", text: "Neural diagnostic initialized. Structural anomalies detected in Q3. Awaiting queries." }
  ]);
  const [chatInput, setChatInput] = useState("");

  const mockInsights = [
    { id: 1, type: "issue", title: "Cortical Collision Risk", description: "Root apex of 3.2 approaching labial cortical plate.", icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10 border-red-500/20" },
    { id: 2, type: "recommendation", title: "Torque Adjustment", description: "Decrease labial root torque by 4 degrees.", icon: TrendingUp, color: "text-[#14B8A6]", bg: "bg-[#14B8A6]/10 border-[#14B8A6]/20" }
  ];

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", text: chatInput }]);
    setChatInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: "Running FEA simulation on requested vectors. Force systems optimized. Overcorrection of 2 degrees recommended for derotation of 3.2." }]);
    }, 1500);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      const ext = file.name.split('.').pop()?.toLowerCase() || '';

      setIsLoading(true);
      setModelType(ext);
      setModelUrl(url);
      
      // Let suspense handle loading time, but we just set a fast timeout for visual feedback
      setTimeout(() => {
         setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] text-foreground font-sans bg-transparent">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 shrink-0 relative z-10">
        <div>
          <div className="text-[10px] font-semibold tracking-widest text-primary mb-2 uppercase">Workspace 3D</div>
          <h1 className="text-4xl font-bold tracking-tight">Volumetric Viewer</h1>
          <p className="text-muted-foreground mt-1 text-sm">Real-time WebGPU rendering with neural overlays.</p>
        </div>
        <div className="flex gap-4">
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} accept=".stl,.obj,.fbx,.gltf,.glb" />
          <Button onClick={() => fileInputRef.current?.click()} className="bg-card border border-primary/50 hover:bg-primary/10 text-primary rounded-full px-6 h-12 shadow-sm transition-all flex items-center gap-2">
            <Upload className="w-4 h-4" /> INJECT MESH
          </Button>

          {modelUrl && (
            <Sheet>
              <SheetTrigger className="h-12 px-6 rounded-full border border-secondary/50 bg-secondary/10 text-secondary hover:bg-secondary/20 transition-all flex items-center gap-2 font-medium">
                <Sparkles className="w-4 h-4" />
                NEURAL ANALYSIS
              </SheetTrigger>
              <SheetContent side="right" className="w-[450px] sm:max-w-md p-0 flex flex-col border-l border-border bg-card/95 backdrop-blur-3xl text-foreground">
                <SheetHeader className="p-8 border-b border-border shrink-0 bg-muted/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-background border border-secondary/30 flex items-center justify-center shadow-sm">
                      <Sparkles className="w-5 h-5 text-secondary" />
                    </div>
                    <SheetTitle className="text-2xl font-bold tracking-tight text-foreground">Dentivis AI</SheetTitle>
                  </div>
                  <SheetDescription className="text-muted-foreground font-medium">
                    Context-aware biomechanical analysis from spatial data.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 flex flex-col no-scrollbar">
                  {/* Insights Section */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold tracking-wider text-muted-foreground flex items-center gap-2 uppercase">
                      <Stethoscope className="w-3.5 h-3.5" />
                      Critical Vectors
                    </h3>
                    <div className="space-y-3">
                      {mockInsights.map(insight => (
                        <div key={insight.id} className={`p-5 rounded-2xl border ${insight.bg} backdrop-blur-md`}>
                          <div className="flex items-start gap-4">
                            <insight.icon className={`w-5 h-5 shrink-0 mt-0.5 ${insight.color}`} />
                            <div>
                              <h4 className={`font-bold text-sm ${insight.color} mb-1`}>{insight.title}</h4>
                              <p className="text-sm text-foreground/80 leading-relaxed">{insight.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Section */}
                  <div className="flex-1 flex flex-col pt-6 border-t border-border">
                    <div className="space-y-4 mb-4 flex-1">
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}>
                          <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${msg.role === "ai" ? "bg-muted border border-border text-foreground rounded-tl-sm" : "bg-primary text-primary-foreground rounded-tr-sm shadow-sm"}`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-border bg-muted/20 shrink-0">
                  <form onSubmit={handleSendMessage} className="flex gap-3 relative">
                    <input 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Query the model..." 
                      className="w-full bg-background border border-border rounded-full pl-5 pr-14 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                    />
                    <button type="submit" disabled={!chatInput.trim()} className="absolute right-2 top-2 bottom-2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-all shadow-sm disabled:opacity-50">
                      <Send className="w-4 h-4 ml-0.5" />
                    </button>
                  </form>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      <div className="flex-1 w-full rounded-2xl border border-border shadow-2xl overflow-hidden relative flex bg-card group">
        
        <div className="flex-1 relative min-h-[400px] z-10 p-2">
          {!modelUrl ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="absolute w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent blur-3xl pointer-events-none"></div>
              <div className="w-24 h-24 rounded-full border border-dashed border-primary/50 flex items-center justify-center mb-6 animate-[spin_20s_linear_infinite] shadow-[0_0_30px_rgba(var(--primary),0.1)]">
                <div className="w-16 h-16 rounded-full border border-secondary/50 flex items-center justify-center animate-[spin_10s_linear_infinite_reverse]">
                   <Box className="w-6 h-6 text-secondary animate-none" />
                </div>
              </div>
              <p className="font-bold text-2xl text-foreground mb-2 tracking-tight">No volumetric data</p>
              <p className="text-muted-foreground text-center max-w-sm font-medium mb-8">Inject a DICOM volume or surface scan (STL, OBJ, FBX, GLB) to initialize the neural rendering pipeline.</p>
              <button onClick={() => fileInputRef.current?.click()} className="px-8 py-4 rounded-full border border-primary/50 hover:bg-primary/10 text-primary font-bold tracking-wide transition-all uppercase text-sm shadow-sm hover:shadow-md">
                Initialize Sequence
              </button>
            </div>
          ) : (
            <div className="w-full h-full rounded-2xl border border-border relative overflow-hidden bg-muted/30">
              {/* Overlay Controls */}
              <div className="absolute top-6 right-6 z-20 flex flex-col gap-3 bg-card/80 backdrop-blur-xl p-3 rounded-2xl border border-border shadow-2xl">
                <button onClick={() => controlsRef.current?.reset()} className="w-10 h-10 rounded-xl bg-muted/50 border border-border hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
                  <Focus className="w-4 h-4" />
                </button>
                <button onClick={() => setAutoRotate(!autoRotate)} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${autoRotate ? 'bg-secondary/20 border border-secondary/50 text-secondary' : 'bg-muted/50 border border-border hover:bg-muted text-muted-foreground hover:text-foreground'}`}>
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button onClick={() => setWireframe(!wireframe)} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${wireframe ? 'bg-primary/20 border border-primary/50 text-primary' : 'bg-muted/50 border border-border hover:bg-muted text-muted-foreground hover:text-foreground'}`}>
                  <Box className="w-4 h-4" />
                </button>
              </div>

              {/* Transformation HUD */}
              <div className="absolute bottom-6 left-6 z-20 w-80 flex flex-col gap-5 bg-card/80 backdrop-blur-2xl p-5 rounded-2xl border border-border shadow-2xl pointer-events-auto">
                 <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                    <span className="text-[10px] font-semibold tracking-widest text-secondary uppercase">Kinematic Controls</span>
                 </div>
                 
                 <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold text-muted-foreground"><span className="uppercase">Scale Matrix</span> <span className="text-foreground">{transformations.scale}x</span></div>
                      <input type="range" min="0.1" max="3" step="0.1" value={transformations.scale} onChange={(e) => updateTransform('scale', parseFloat(e.target.value))} className="w-full accent-primary" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold text-muted-foreground"><span className="uppercase">Y-Axis Torque</span> <span className="text-foreground">{transformations.rotY}°</span></div>
                      <input type="range" min="-180" max="180" step="1" value={transformations.rotY} onChange={(e) => updateTransform('rotY', parseFloat(e.target.value))} className="w-full accent-secondary" />
                    </div>
                 </div>
              </div>

              {/* 3D Canvas */}
              <Canvas shadows camera={{ position: [0, 0, 80], fov: 45 }} className="outline-none">
                <ambientLight intensity={0.2} />
                <SpotLight position={[30, 40, 30]} angle={0.5} penumbra={1} intensity={2} color="#2563EB" castShadow />
                <SpotLight position={[-30, -20, -30]} angle={0.5} penumbra={1} intensity={2} color="#14B8A6" castShadow />
                
                {isLoading && <Loader progress={50} />}
                
                <Suspense fallback={<Loader progress={0} />}>
                   {modelUrl && modelType && <DynamicModel url={modelUrl} type={modelType} wireframe={wireframe} color={color} transformations={transformations} />}
                   <Environment preset="city" />
                   {modelUrl && <ContactShadows position={[0, -30, 0]} opacity={0.3} scale={80} blur={3} far={50} color="#2563EB" />}
                </Suspense>

                <OrbitControls 
                  ref={controlsRef}
                  autoRotate={autoRotate}
                  autoRotateSpeed={1}
                  enableDamping
                  dampingFactor={0.05}
                  makeDefault
                  minDistance={20}
                  maxDistance={300}
                />
              </Canvas>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
