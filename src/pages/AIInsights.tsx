import { useState } from "react";
import { Sparkles, Activity, AlertCircle, TrendingUp, ChevronRight, MessageSquare, Send, Stethoscope, Network, Brain } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../components/ui/sheet";

interface InsightData {
  id: string;
  patientName: string;
  status: "Review Required" | "Analyzed" | "Pending Analysis";
  date: string;
  findings: Array<{ type: "issue" | "recommendation"; title: string; desc: string }>;
}

const mockAnalyses: InsightData[] = [
  {
    id: "1",
    patientName: "John Doe",
    status: "Review Required",
    date: "TODAY, 09:41 AM",
    findings: [
      { type: "issue", title: "Alignment Variance detected", desc: "Mandibular anterior crowding detected (3.2mm discrepancy threshold crossed)." },
      { type: "recommendation", title: "Suggested Protocol", desc: "IPR recommended on lower incisors (Teeth 31-41)." }
    ]
  },
  {
    id: "2",
    patientName: "Sarah Smith",
    status: "Analyzed",
    date: "YESTERDAY, 14:22 PM",
    findings: [
      { type: "issue", title: "Bite Class Deviation", desc: "Class II malocclusion, division 1." },
      { type: "recommendation", title: "Vector Pathway", desc: "Distalization of maxillary molars required." }
    ]
  },
  {
    id: "3",
    patientName: "Michael Chen",
    status: "Analyzed",
    date: "OCT 24, 11:05 AM",
    findings: [
      { type: "recommendation", title: "Retention Protocol", desc: "Fixed lingual retainer suggested post-treatment." }
    ]
  }
];

export function AIInsights() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<InsightData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState<{role: "ai"|"user", text: string}[]>([]);
  const [chatInput, setChatInput] = useState("");

  const openInsights = (analysis: InsightData) => {
    setSelectedAnalysis(analysis);
    setMessages([
      { role: "ai", text: `Neural scan complete for ${analysis.patientName}. Structural deviations identified. Would you like a vector breakdown of the suggested movements?` }
    ]);
    setIsSheetOpen(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", text: chatInput }]);
    const currentInput = chatInput;
    setChatInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: `Processing query: "${currentInput}". The neural model projects a 94% success rate with the current biomechanical setup.` 
      }]);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-12 font-sans text-foreground max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[10px] font-semibold tracking-widest text-primary mb-2 uppercase drop-shadow-sm">Diagnostic Core V2</div>
          <h1 className="text-4xl font-bold flex items-center gap-3 tracking-tight text-foreground">
            Neural Insights
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">Asynchronous AI analysis and predictive biomechanics dashboard.</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* System Stats Cards */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="col-span-1 md:col-span-3">
          <div className="rounded-3xl border border-border bg-card shadow-sm p-8 relative overflow-hidden group">
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-8">
                 <div className="w-20 h-20 rounded-full border border border-primary/40 flex items-center justify-center relative shadow-sm">
                   <Brain className="w-8 h-8 text-primary" />
                   <div className="absolute inset-[-10%] rounded-full border-t border-secondary animate-spin"></div>
                 </div>
                 <div className="space-y-1">
                   <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Volumes Processed</p>
                   <p className="text-5xl font-bold tracking-tight text-foreground">1,204</p>
                 </div>
              </div>
              <div className="flex items-center gap-12">
                 <div className="space-y-1 text-right">
                    <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase mb-1">Confidence Interval</p>
                    <p className="text-2xl font-bold text-secondary">99.8%</p>
                 </div>
                 <div className="space-y-1 text-right">
                    <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase mb-1">Network Status</p>
                    <p className="text-sm font-bold text-primary flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                       ONLINE
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-sm font-semibold tracking-wider uppercase mb-6 text-muted-foreground flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          Recent Diagnostic Queues
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAnalyses.map((analysis) => (
            <motion.div 
              key={analysis.id} 
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden cursor-pointer group"
              onClick={() => openInsights(analysis)}
            >
              
              <div className="p-6 border-b border-border bg-muted/30">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1 tracking-tight">{analysis.patientName}</h3>
                    <p className="text-xs font-medium text-muted-foreground uppercase">{analysis.date}</p>
                  </div>
                  <div className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-widest ${
                    analysis.status === 'Review Required' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 
                    analysis.status === 'Analyzed' ? 'bg-secondary/10 text-secondary border border-secondary/20' : 
                    'bg-muted text-muted-foreground'
                  }`}>
                    {analysis.status}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {analysis.findings.slice(0, 2).map((finding, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {finding.type === 'issue' ? 
                        <AlertCircle className="w-4 h-4 mt-0.5 text-orange-500 shrink-0" /> : 
                        <TrendingUp className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                      }
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        <span className="font-semibold text-foreground mr-2">{finding.title}</span>
                        {finding.desc}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center text-xs font-semibold text-secondary uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 mr-2" />
                  View Neural Audit
                  <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Insights Right-Side Panel */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-[450px] sm:max-w-md p-0 flex flex-col border-l border-border bg-card/95 backdrop-blur-3xl text-foreground">
          <SheetHeader className="p-8 border-b border-border shrink-0 bg-muted/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-background border border-secondary/30 flex items-center justify-center shadow-sm">
                <Network className="w-5 h-5 text-secondary" />
              </div>
              <SheetTitle className="text-2xl font-bold tracking-tight text-foreground">Dentivis Neural Agent</SheetTitle>
            </div>
            <SheetDescription className="text-muted-foreground font-medium">
              Analyzing spatial anomalies for: <span className="font-semibold text-foreground">{selectedAnalysis?.patientName}</span>
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 flex flex-col no-scrollbar">
            {/* Key Findings Highlights */}
            {selectedAnalysis && (
              <div className="space-y-4">
                <h3 className="text-xs font-semibold tracking-wider text-muted-foreground flex items-center gap-2 uppercase">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Detected Protocol Deviations
                </h3>
                <div className="space-y-3">
                  {selectedAnalysis.findings.map((insight, idx) => (
                    <div key={idx} className={`p-5 rounded-2xl border ${
                      insight.type === 'issue' 
                        ? 'bg-orange-500/5 border-orange-500/20' 
                        : 'bg-primary/5 border-primary/20'
                    }`}>
                      <div className="flex items-start gap-4">
                        {insight.type === 'issue' ? 
                          <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 text-orange-500`} /> :
                          <TrendingUp className={`w-5 h-5 shrink-0 mt-0.5 text-primary`} />
                        }
                        <div>
                          <h4 className="font-bold text-sm text-foreground mb-1">{insight.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{insight.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Interface */}
            <div className="flex-1 flex flex-col pt-6 border-t border-border">
              <h3 className="text-xs font-semibold tracking-wider text-muted-foreground flex items-center gap-2 mb-4 uppercase">
                <MessageSquare className="w-3.5 h-3.5" />
                Query Neural Engine
              </h3>
              
              <div className="flex-1 space-y-4 overflow-y-auto flex flex-col pb-4">
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      key={i} 
                      className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}
                    >
                      {msg.role === 'ai' && (
                        <div className="w-8 h-8 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center mr-3 shrink-0 shadow-sm">
                          <Sparkles className="w-4 h-4 text-secondary" />
                        </div>
                      )}
                      <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                        msg.role === "ai" 
                          ? "bg-muted border border-border text-foreground rounded-tl-sm" 
                          : "bg-primary text-primary-foreground rounded-tr-sm shadow-sm"
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-border bg-muted/20 shrink-0">
            <form onSubmit={handleSendMessage} className="flex gap-3 relative">
              <input 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Request staging simulation..." 
                className="w-full bg-background border border-border rounded-full pl-5 pr-14 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
              />
              <button 
                type="submit" 
                disabled={!chatInput.trim()} 
                className="absolute right-2 top-2 bottom-2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-all shadow-sm disabled:opacity-50"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
