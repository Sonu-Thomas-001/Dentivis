import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Upload, Focus, RotateCcw, Box, RefreshCw, Sparkles, Send, Stethoscope, AlertCircle, TrendingUp } from "lucide-react";
import * as THREE from "three";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "../components/ui/sheet";
import { Input } from "../components/ui/input";

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
  transformations,
}: {
  url: string;
  wireframe: boolean;
  color: string;
  onLoaded: () => void;
  transformations: { posX: number; posY: number; posZ: number; rotX: number; rotY: number; rotZ: number; scale: number; };
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
      <group 
        position={[transformations.posX, transformations.posY, transformations.posZ]}
        rotation={[transformations.rotX * (Math.PI / 180), transformations.rotY * (Math.PI / 180), transformations.rotZ * (Math.PI / 180)]}
        scale={[transformations.scale, transformations.scale, transformations.scale]}
      >
        <mesh geometry={geom} castShadow receiveShadow>
          <meshStandardMaterial 
            color={color} 
            wireframe={wireframe} 
            roughness={0.4} 
            metalness={0.1} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      </group>
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

  // Transformation State
  const defaultTransform = { posX: 0, posY: 0, posZ: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1 };
  const [transformations, setTransformations] = useState(defaultTransform);
  const [selectedTooth, setSelectedTooth] = useState("All");

  const updateTransform = (key: keyof typeof defaultTransform, value: number) => {
    setTransformations(prev => ({ ...prev, [key]: value }));
  };

  // AI Chat State
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I've analyzed the 3D model. Would you like to review the suggested treatment plan or ask a specific question about the alignment?" }
  ]);
  const [chatInput, setChatInput] = useState("");

  const mockInsights = [
    { id: 1, type: "issue", title: "Alignment Issue Detect", description: "Mandibular anterior crowding detected (3.2mm discrepancy).", icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/20" },
    { id: 2, type: "recommendation", title: "Suggested Movement", description: "IPR (Interproximal Reduction) recommended on lower incisors (Teeth 31-41).", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" }
  ];

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", text: chatInput }]);
    setChatInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: "Based on the 3D topology, the proposed movement will require approximately 14-16 aligners. I can generate a staging timeline if you'd like to review the intermediate steps." }]);
    }, 1500);
  };

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

          {modelUrl && (
            <Sheet>
              <SheetTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 rounded-xl border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Insights
              </SheetTrigger>
              <SheetContent side="right" className="w-[400px] sm:max-w-md p-0 flex flex-col border-l border-border rounded-l-2xl shadow-xl">
                <SheetHeader className="p-6 border-b border-border/50 shrink-0">
                  <SheetTitle className="flex items-center gap-2 text-xl font-heading">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    Dentivis AI
                  </SheetTitle>
                  <SheetDescription>
                    Context-aware orthodontic analysis based on the current 3D scan.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
                  {/* Important Insights Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                      <Stethoscope className="w-4 h-4" />
                      Key Findings
                    </h3>
                    <div className="space-y-3">
                      {mockInsights.map(insight => (
                        <div key={insight.id} className={`p-4 rounded-xl border ${insight.bg}`}>
                          <div className="flex items-start gap-3">
                            <insight.icon className={`w-5 h-5 shrink-0 mt-0.5 ${insight.color}`} />
                            <div>
                              <h4 className="font-semibold text-sm text-foreground">{insight.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1 leading-snug">{insight.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Section */}
                  <div className="flex-1 flex flex-col pt-4 border-t border-border/50">
                    <div className="space-y-4 mb-4 flex-1">
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}>
                          <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.role === "ai" ? "bg-muted text-foreground rounded-tl-sm" : "bg-primary text-primary-foreground rounded-tr-sm"}`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-border bg-card shrink-0">
                  <form onSubmit={handleSendMessage} className="flex gap-2 relative">
                    <Input 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about the treatment..." 
                      className="rounded-full bg-muted border-transparent focus-visible:ring-primary shadow-none pr-10"
                    />
                    <Button type="submit" size="icon" disabled={!chatInput.trim()} className="absolute right-1 top-1 w-8 h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all focus-within:z-10">
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </SheetContent>
            </Sheet>
          )}
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

              {/* Transformation Controls */}
              <div className="absolute top-4 left-4 z-10 w-72 flex flex-col gap-4 bg-card/80 backdrop-blur-md p-4 rounded-2xl border border-border shadow-md">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Target Region</label>
                    <select 
                      value={selectedTooth} 
                      onChange={(e) => setSelectedTooth(e.target.value)}
                      className="w-full bg-muted border-transparent text-sm rounded-xl px-3 py-2 focus:ring-primary focus:border-primary shadow-sm"
                    >
                      <option value="All">Full Model (Selection Mock)</option>
                      <option value="Tooth_11">Tooth 11</option>
                      <option value="Tooth_12">Tooth 12</option>
                      <option value="Tooth_21">Tooth 21</option>
                      <option value="Tooth_22">Tooth 22</option>
                    </select>
                    <p className="text-[10px] text-muted-foreground mt-1 leading-tight">Select a specific tooth to isolate mechanics (Simulated for STL rendering).</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-border/50">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Translation (mm)</label>
                    <div className="grid grid-cols-[16px_1fr_32px] items-center gap-x-2 gap-y-1.5 text-xs">
                      <span className="font-mono text-muted-foreground text-center">X</span>
                      <input type="range" min="-50" max="50" step="1" value={transformations.posX} onChange={(e) => updateTransform('posX', parseFloat(e.target.value))} className="w-full accent-primary" />
                      <span className="text-right tabular-nums">{transformations.posX}</span>
                      
                      <span className="font-mono text-muted-foreground text-center">Y</span>
                      <input type="range" min="-50" max="50" step="1" value={transformations.posY} onChange={(e) => updateTransform('posY', parseFloat(e.target.value))} className="w-full accent-primary" />
                      <span className="text-right tabular-nums">{transformations.posY}</span>
                      
                      <span className="font-mono text-muted-foreground text-center">Z</span>
                      <input type="range" min="-50" max="50" step="1" value={transformations.posZ} onChange={(e) => updateTransform('posZ', parseFloat(e.target.value))} className="w-full accent-primary" />
                      <span className="text-right tabular-nums">{transformations.posZ}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-border/50">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Rotation (°)</label>
                    <div className="grid grid-cols-[16px_1fr_32px] items-center gap-x-2 gap-y-1.5 text-xs">
                      <span className="font-mono text-muted-foreground text-center">X</span>
                      <input type="range" min="-180" max="180" step="1" value={transformations.rotX} onChange={(e) => updateTransform('rotX', parseFloat(e.target.value))} className="w-full accent-primary" />
                      <span className="text-right tabular-nums">{transformations.rotX}°</span>
                      
                      <span className="font-mono text-muted-foreground text-center">Y</span>
                      <input type="range" min="-180" max="180" step="1" value={transformations.rotY} onChange={(e) => updateTransform('rotY', parseFloat(e.target.value))} className="w-full accent-primary" />
                      <span className="text-right tabular-nums">{transformations.rotY}°</span>
                      
                      <span className="font-mono text-muted-foreground text-center">Z</span>
                      <input type="range" min="-180" max="180" step="1" value={transformations.rotZ} onChange={(e) => updateTransform('rotZ', parseFloat(e.target.value))} className="w-full accent-primary" />
                      <span className="text-right tabular-nums">{transformations.rotZ}°</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-border/50">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Scale</label>
                    <div className="grid grid-cols-[16px_1fr_32px] items-center gap-x-2 gap-y-1 text-xs">
                      <span className="font-mono text-muted-foreground text-center">S</span>
                      <input type="range" min="0.1" max="3" step="0.1" value={transformations.scale} onChange={(e) => updateTransform('scale', parseFloat(e.target.value))} className="w-full accent-primary" />
                      <span className="text-right tabular-nums">{transformations.scale}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" size="sm" onClick={() => setTransformations(defaultTransform)} className="w-full text-xs h-8 rounded-lg font-medium">
                      Reset Controls
                    </Button>
                  </div>
                </div>
              </div>

              <Canvas shadows camera={{ position: [0, 0, 100], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[50, 50, 50]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-50, -50, -50]} intensity={0.5} />
                
                {isLoading && <Loader progress={50} />}
                
                <Suspense fallback={null}>
                   <StlModel url={modelUrl} wireframe={wireframe} color={color} onLoaded={() => setIsLoading(false)} transformations={transformations} />
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
