import { useState } from "react";
import { Sparkles, Activity, AlertCircle, TrendingUp, ChevronRight, MessageSquare, Send, Stethoscope, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../components/ui/sheet";
import { Input } from "../components/ui/input";
import { motion } from "motion/react";

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
    date: "Today",
    findings: [
      { type: "issue", title: "Alignment Issue", desc: "Mandibular anterior crowding detected (3.2mm discrepancy)." },
      { type: "recommendation", title: "Treatment Plan", desc: "IPR recommended on lower incisors (Teeth 31-41)." }
    ]
  },
  {
    id: "2",
    patientName: "Sarah Smith",
    status: "Analyzed",
    date: "Yesterday",
    findings: [
      { type: "issue", title: "Bite Analysis", desc: "Class II malocclusion, division 1." },
      { type: "recommendation", title: "Movement", desc: "Distalization of maxillary molars required." }
    ]
  },
  {
    id: "3",
    patientName: "Michael Chen",
    status: "Analyzed",
    date: "Oct 24",
    findings: [
      { type: "recommendation", title: "Retention", desc: "Fixed lingual retainer suggested post-treatment." }
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
      { role: "ai", text: `I've analyzed the scan for ${analysis.patientName}. I found ${analysis.findings.length} key points. Would you like me to elaborate on the suggested tooth movements?` }
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
        text: `Regarding "${currentInput}", the predictive model suggests this aligns with the current treatment goals. I can generate a 3D simulation of these specific movements if needed.` 
      }]);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-heading font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            AI Insights
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Automated analysis and treatment suggestions based on patient 3D scans.</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* System Stats Cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="rounded-2xl border-border shadow-sm bg-primary/5 border-primary/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-primary">Models Analyzed</p>
                  <p className="text-3xl font-bold text-foreground">1,204</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                <span className="text-green-500 font-medium">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-lg font-semibold mb-4 text-foreground">Recent Analyses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAnalyses.map((analysis) => (
            <Card 
              key={analysis.id} 
              className="rounded-2xl border-border shadow-sm hover:border-primary/30 transition-colors cursor-pointer group"
              onClick={() => openInsights(analysis)}
            >
              <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-base font-semibold font-heading">{analysis.patientName}</CardTitle>
                  <CardDescription className="text-xs mt-1">{analysis.date}</CardDescription>
                </div>
                <Badge variant="outline" className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider border-0 ${
                  analysis.status === 'Review Required' ? 'bg-orange-500/10 text-orange-600' : 
                  analysis.status === 'Analyzed' ? 'bg-green-500/10 text-green-600' : 
                  'bg-muted text-muted-foreground'
                }`}>
                  {analysis.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {analysis.findings.slice(0, 2).map((finding, idx) => (
                    <div key={idx} className="flex items-start gap-2 pt-2 border-t border-border/40 first:border-0 first:pt-0">
                      {finding.type === 'issue' ? 
                        <AlertCircle className="w-3.5 h-3.5 mt-0.5 text-orange-500 shrink-0" /> : 
                        <TrendingUp className="w-3.5 h-3.5 mt-0.5 text-blue-500 shrink-0" />
                      }
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        <span className="font-medium text-foreground mr-1">{finding.title}:</span>
                        {finding.desc}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  View AI Insights
                  <ChevronRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* AI Insights Right-Side Panel */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-[450px] sm:max-w-md p-0 flex flex-col border-l border-border rounded-l-2xl shadow-xl">
          <SheetHeader className="p-6 border-b border-border/50 shrink-0 bg-muted/20">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-xl font-heading">AI Consultant</SheetTitle>
                <SheetDescription className="text-xs">
                  Analyzing case: <span className="font-medium text-foreground">{selectedAnalysis?.patientName}</span>
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-0 flex flex-col bg-background">
            {/* Key Findings Highlights */}
            {selectedAnalysis && (
              <div className="p-6 pb-2 space-y-4">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Automated Findings
                </h3>
                <div className="space-y-3">
                  {selectedAnalysis.findings.map((insight, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border ${
                      insight.type === 'issue' 
                        ? 'bg-orange-500/5 border-orange-500/20' 
                        : 'bg-blue-500/5 border-blue-500/20'
                    }`}>
                      <div className="flex items-start gap-3">
                        {insight.type === 'issue' ? 
                          <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 text-orange-500`} /> :
                          <TrendingUp className={`w-5 h-5 shrink-0 mt-0.5 text-blue-500`} />
                        }
                        <div>
                          <h4 className="font-semibold text-sm text-foreground">{insight.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{insight.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Interface */}
            <div className="flex-1 flex flex-col p-6 pt-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-4">
                <MessageSquare className="w-3.5 h-3.5" />
                Ask Follow-up Questions
              </h3>
              
              <div className="flex-1 space-y-4 mb-4 overflow-y-auto flex flex-col">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}>
                    {msg.role === 'ai' && (
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 shrink-0 mt-1">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                      </div>
                    )}
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      msg.role === "ai" 
                        ? "bg-card border border-border text-foreground rounded-tl-sm" 
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                    }`}>
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
                placeholder="Type a message or question..." 
                className="rounded-full bg-muted border-transparent focus-visible:ring-primary shadow-inner pr-12 h-12"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!chatInput.trim()} 
                className="absolute right-1.5 top-1.5 w-9 h-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
