import React, { useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, Environment, ContactShadows, Html, SpotLight, MeshDistortMaterial } from "@react-three/drei";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Upload, Focus, RotateCcw, Box, RefreshCw, Sparkles, Send, Stethoscope, AlertCircle, TrendingUp } from "lucide-react";
import * as THREE from "three";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "../components/ui/sheet";
import { Input } from "../components/ui/input";

function Loader({ progress }: { progress: number }) {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 relative flex items-center justify-center">
           <RefreshCw className="w-8 h-8 animate-spin text-[#14B8A6] absolute" />
           <div className="absolute inset-0 rounded-full border border-t border-[#2563EB] animate-[spin_2s_linear_infinite]"></div>
        </div>
        <span className="text-sm font-mono tracking-widest text-[#94A3B8] uppercase">Neural scan {progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}

const StlModel = React.memo(function StlModel({
  wireframe,
  color,
  transformations,
}: {
  wireframe: boolean;
  color: string;
  transformations: { posX: number; posY: number; posZ: number; rotX: number; rotY: number; rotZ: number; scale: number; };
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Using a custom geometry to simulate a more complex mesh if needed, or stick to Octahedron as placeholder
  return (
    <Center>
      <group 
        position={[transformations.posX, transformations.posY, transformations.posZ]}
        rotation={[transformations.rotX * (Math.PI / 180), transformations.rotY * (Math.PI / 180), transformations.rotZ * (Math.PI / 180)]}
        scale={[transformations.scale, transformations.scale, transformations.scale]}
      >
        <mesh castShadow receiveShadow ref={meshRef}>
           <torusKnotGeometry args={[10, 3, 200, 32]} />
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
      </group>
    </Center>
  );
});

export function Viewer3D() {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [wireframe, setWireframe] = useState(true);
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
      setIsLoading(true);
      setTimeout(() => {
         setModelUrl("loaded"); // mock load
         setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] text-white font-sans bg-transparent">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 shrink-0 relative z-10">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#2563EB] mb-2 shadow-[0_0_10px_#2563EB]">WORKSPACE_3D</div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94A3B8] tracking-tight">Volumetric Viewer</h1>
          <p className="text-[#94A3B8] mt-1 text-sm font-light">Real-time WebGPU rendering with neural overlays.</p>
        </div>
        <div className="flex gap-4">
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} accept=".stl,.ply,.obj" />
          <Button onClick={() => fileInputRef.current?.click()} className="bg-[#0F172A] border border-[#2563EB]/50 hover:bg-[#2563EB]/20 text-[#3B82F6] rounded-full px-6 h-12 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2">
            <Upload className="w-4 h-4" /> INJECT MESH
          </Button>

          {modelUrl && (
            <Sheet>
              <SheetTrigger className="h-12 px-6 rounded-full border border-[#14B8A6]/50 bg-[#14B8A6]/10 text-[#14B8A6] hover:bg-[#14B8A6]/20 shadow-[0_0_20px_rgba(20,184,166,0.1)] transition-all flex items-center gap-2 font-medium">
                <Sparkles className="w-4 h-4" />
                NEURAL ANALYSIS
              </SheetTrigger>
              <SheetContent side="right" className="w-[450px] sm:max-w-md p-0 flex flex-col border-l border-white/10 bg-[#020617]/90 backdrop-blur-3xl text-white">
                <SheetHeader className="p-8 border-b border-white/5 shrink-0 bg-gradient-to-br from-[#0F172A]/50 to-transparent">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#020617] border border-[#14B8A6]/30 flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                      <Sparkles className="w-5 h-5 text-[#14B8A6]" />
                    </div>
                    <SheetTitle className="text-2xl font-bold tracking-tight text-white">Dentivis AI</SheetTitle>
                  </div>
                  <SheetDescription className="text-[#94A3B8] font-light">
                    Context-aware biomechanical analysis from spatial data.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 flex flex-col no-scrollbar">
                  {/* Insights Section */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono tracking-widest text-[#94A3B8] flex items-center gap-2 uppercase">
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
                              <p className="text-sm text-[#94A3B8] leading-relaxed">{insight.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Section */}
                  <div className="flex-1 flex flex-col pt-6 border-t border-white/5">
                    <div className="space-y-4 mb-4 flex-1">
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}>
                          <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${msg.role === "ai" ? "bg-[#0F172A] border border-white/5 text-[#F8FAFC] rounded-tl-sm" : "bg-[#2563EB] text-white rounded-tr-sm shadow-[0_0_15px_rgba(37,99,235,0.3)]"}`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-white/5 bg-[#0F172A]/30 shrink-0 backdrop-blur-xl">
                  <form onSubmit={handleSendMessage} className="flex gap-3 relative">
                    <input 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Query the model..." 
                      className="w-full bg-[#020617] border border-white/10 rounded-full pl-5 pr-14 py-3.5 text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all shadow-inner"
                    />
                    <button type="submit" disabled={!chatInput.trim()} className="absolute right-2 top-2 bottom-2 w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center hover:bg-[#1D4ED8] hover:scale-105 transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:scale-100">
                      <Send className="w-4 h-4 ml-0.5" />
                    </button>
                  </form>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      <div className="flex-1 w-full rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden relative flex bg-[#020617] group">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay z-0 pointer-events-none"></div>
        
        <div className="flex-1 relative min-h-[400px] z-10 p-2">
          {!modelUrl ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="absolute w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2563EB]/10 to-transparent blur-3xl pointer-events-none"></div>
              <div className="w-24 h-24 rounded-full border border-dashed border-[#2563EB]/50 flex items-center justify-center mb-6 animate-[spin_20s_linear_infinite] shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                <div className="w-16 h-16 rounded-full border border-[#14B8A6]/50 flex items-center justify-center animate-[spin_10s_linear_infinite_reverse]">
                   <Box className="w-6 h-6 text-[#14B8A6] animate-none" />
                </div>
              </div>
              <p className="font-heading font-semibold text-2xl text-white mb-2 tracking-tight">No volumetric data</p>
              <p className="text-[#94A3B8] text-center max-w-sm font-light mb-8">Inject a DICOM volume or surface scan to initialize the neural rendering pipeline.</p>
              <button onClick={() => fileInputRef.current?.click()} className="px-8 py-4 rounded-full border border-[#2563EB]/50 hover:bg-[#2563EB]/10 text-[#3B82F6] font-bold tracking-wide transition-all uppercase text-sm shadow-[0_0_20px_rgba(37,99,235,0.1)] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                Initialize Sequence
              </button>
            </div>
          ) : (
            <div className="w-full h-full rounded-[1.5rem] border border-white/5 relative overflow-hidden bg-gradient-to-b from-[#0F172A] to-[#020617]">
              {/* Overlay Controls */}
              <div className="absolute top-6 right-6 z-20 flex flex-col gap-3 bg-[#020617]/50 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-2xl">
                <button onClick={() => controlsRef.current?.reset()} className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white transition-all">
                  <Focus className="w-4 h-4" />
                </button>
                <button onClick={() => setAutoRotate(!autoRotate)} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${autoRotate ? 'bg-[#14B8A6]/20 border border-[#14B8A6]/50 text-[#14B8A6] shadow-[0_0_15px_rgba(20,184,166,0.3)]' : 'bg-white/5 border border-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white'}`}>
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button onClick={() => setWireframe(!wireframe)} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${wireframe ? 'bg-[#2563EB]/20 border border-[#2563EB]/50 text-[#3B82F6] shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 'bg-white/5 border border-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white'}`}>
                  <Box className="w-4 h-4" />
                </button>
              </div>

              {/* Transformation HUD */}
              <div className="absolute bottom-6 left-6 z-20 w-80 flex flex-col gap-5 bg-[#020617]/50 backdrop-blur-2xl p-5 rounded-2xl border border-white/10 shadow-2xl pointer-events-auto">
                 <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse"></div>
                    <span className="text-[10px] font-mono tracking-widest text-[#14B8A6] uppercase">Kinematic Controls</span>
                 </div>
                 
                 <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono text-[#94A3B8]"><span className="uppercase">Scale Matrix</span> <span className="text-white">{transformations.scale}x</span></div>
                      <input type="range" min="0.1" max="3" step="0.1" value={transformations.scale} onChange={(e) => updateTransform('scale', parseFloat(e.target.value))} className="w-full accent-[#2563EB]" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono text-[#94A3B8]"><span className="uppercase">Y-Axis Torque</span> <span className="text-white">{transformations.rotY}°</span></div>
                      <input type="range" min="-180" max="180" step="1" value={transformations.rotY} onChange={(e) => updateTransform('rotY', parseFloat(e.target.value))} className="w-full accent-[#14B8A6]" />
                    </div>
                 </div>
              </div>

              {/* 3D Canvas */}
              <Canvas shadows camera={{ position: [0, 0, 80], fov: 45 }} className="outline-none">
                <ambientLight intensity={0.2} />
                <SpotLight position={[30, 40, 30]} angle={0.5} penumbra={1} intensity={2} color="#2563EB" castShadow />
                <SpotLight position={[-30, -20, -30]} angle={0.5} penumbra={1} intensity={2} color="#14B8A6" castShadow />
                
                {isLoading && <Loader progress={50} />}
                
                <Suspense fallback={null}>
                   <StlModel wireframe={wireframe} color={color} transformations={transformations} />
                   <Environment preset="city" />
                   <ContactShadows position={[0, -30, 0]} opacity={0.3} scale={80} blur={3} far={50} color="#2563EB" />
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
