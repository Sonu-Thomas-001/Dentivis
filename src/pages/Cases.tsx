import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ArrowLeft, ArrowRight, Upload, Plus, FileText, CheckCircle2, MoreVertical, FileArchive, X, FolderKanban } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";

interface Case {
  id: string;
  patientName: string;
  patientAge: number;
  type: string;
  status: string;
  scanFileUrl: string | null;
  notes: string | null;
  createdAt: string;
}

const mockCases: Case[] = [
  { id: "1", patientName: "Elena Rodriguez", patientAge: 28, type: "Clear Aligner", status: "In Progress", scanFileUrl: null, notes: null, createdAt: new Date().toISOString() },
  { id: "2", patientName: "Marcus Thorne", patientAge: 34, type: "Bracket Prediction", status: "Pending Review", scanFileUrl: null, notes: null, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "3", patientName: "Sophia Lin", patientAge: 19, type: "Surgical Planning", status: "Approved", scanFileUrl: null, notes: null, createdAt: new Date(Date.now() - 172800000).toISOString() }
];

export function Cases() {
  const { token } = useAuthStore();
  const [cases, setCases] = useState<Case[]>(mockCases); // Using mock to avoid empty states in demo
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form State
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    type: "",
    notes: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Optionally fetch cases here
  }, []);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
       setIsDialogOpen(false);
       setStep(1);
       setFormData({ patientName: "", patientAge: "", type: "", notes: "" });
       setFile(null);
       setIsSubmitting(false);
    }, 1500);
  };

  const resetAndClose = () => {
    setIsDialogOpen(false);
    setTimeout(() => {
      setStep(1);
      setFormData({ patientName: "", patientAge: "", type: "", notes: "" });
      setFile(null);
    }, 300);
  };

  return (
    <div className="space-y-8 pb-12 font-sans text-foreground max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[10px] font-semibold tracking-widest text-primary mb-2 uppercase">Clinical Records</div>
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            Case Directory
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">Manage patient pipelines and spatial datasets.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <button onClick={() => setIsDialogOpen(true)} className="group relative px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold overflow-hidden transition-all hover:opacity-90 shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4 ml-0.5" />
            <span className="relative z-10 text-sm tracking-wide">Initialize Case</span>
          </button>
        </motion.div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => !open && resetAndClose()}>
        <DialogContent className="sm:max-w-[600px] rounded-[2rem] p-0 overflow-hidden bg-card text-foreground border-border shadow-2xl">
          
          <div className="h-1 w-full bg-muted relative z-10">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary"
              initial={{ width: "25%" }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: "circOut" }}
            />
          </div>
          
          <div className="p-8 relative z-10">
            <DialogHeader className="mb-8 border-b border-border pb-6">
              <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">
                {step === 1 && "Patient Demographics"}
                {step === 2 && "Volume Injection"}
                {step === 3 && "Clinical Directives"}
                {step === 4 && "Validation Protocol"}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-muted-foreground font-medium">
                {step === 1 && "Create the identity baseline for the neural processing node."}
                {step === 2 && "Upload raw CBCT / STL / OBJ meshes for automated alignment."}
                {step === 3 && "Encode specific lab requests and bio-mechanical constraints."}
                {step === 4 && "Confirm encrypted dataset before submitting to the learning queue."}
              </DialogDescription>
            </DialogHeader>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Patient Identifier</label>
                    <input 
                      placeholder="e.g. John Doe" 
                      value={formData.patientName} 
                      onChange={e => setFormData({...formData, patientName: e.target.value})}
                      className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Age (Chronological)</label>
                      <input 
                        type="number"
                        placeholder="e.g. 28" 
                        value={formData.patientAge} 
                        onChange={e => setFormData({...formData, patientAge: e.target.value})}
                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Treatment Class</label>
                      <input 
                        placeholder="e.g. Aligners" 
                        value={formData.type} 
                        onChange={e => setFormData({...formData, type: e.target.value})}
                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all ${
                      isDragging ? 'border-primary bg-primary/5' : 'border-border bg-muted/30 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary'
                    }`}
                  >
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} accept=".stl,.obj,.dicom,.zip" />
                    
                    {file ? (
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-4 border border-secondary/30">
                          <FileArchive className="w-8 h-8" />
                        </div>
                        <p className="font-semibold text-foreground text-lg mb-1">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB • READY FOR COMPILATION</p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setFile(null); }}
                          className="mt-6 text-destructive hover:text-destructive/80 text-sm font-semibold tracking-wide uppercase transition-colors"
                        >
                          Eject Volume
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-muted text-muted-foreground rounded-2xl flex items-center justify-center mb-4 transition-colors border border-border">
                          <Upload className="w-8 h-8" />
                        </div>
                        <p className="font-semibold text-foreground text-lg mb-2">Drop volumetric payload here</p>
                        <p className="text-xs text-muted-foreground font-medium max-w-[260px] leading-relaxed">System supports raw point clouds, unified STL meshes, and zipped DICOM directories.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Clinician Directives <span className="text-muted-foreground/50 ml-2">(OPTIONAL)</span></label>
                    <textarea 
                      placeholder="Specify non-eruptions, extraction plans, or anchor points..." 
                      value={formData.notes} 
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                      className="w-full h-40 p-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none transition-all leading-relaxed"
                    />
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  <div className="bg-muted/30 rounded-2xl p-6 border border-border shadow-inner">
                    <div className="grid grid-cols-2 gap-y-6">
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Target Entity</p>
                        <p className="font-semibold text-foreground mt-1 text-lg">{formData.patientName || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Chronology</p>
                        <p className="font-semibold text-foreground mt-1 text-lg">{formData.patientAge || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Vector Class</p>
                        <p className="font-semibold text-foreground mt-1 text-lg">{formData.type || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Data Payload</p>
                        <p className="font-semibold text-primary mt-1 text-sm tracking-tight truncate max-w-[150px]">{file ? file.name : "Null Payload"}</p>
                      </div>
                    </div>
                    {formData.notes && (
                      <div className="pt-6 mt-6 border-t border-border">
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Attached Directives</p>
                        <p className="text-sm text-foreground/80 leading-relaxed bg-background border border-border rounded-lg p-3">{formData.notes}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-primary/10 border border-primary/30 text-primary rounded-xl">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Sequence Ready</p>
                      <p className="text-xs text-muted-foreground mt-1 opacity-80">Payload will be encrypted and submitted to the cloud compute cluster.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
              <button onClick={step === 1 ? resetAndClose : () => setStep(step - 1)} className="px-6 py-2 rounded-full text-muted-foreground font-semibold uppercase tracking-wider text-xs hover:text-foreground transition-colors">
                {step === 1 ? "Abort" : "Rewind"}
              </button>
              
              <button 
                onClick={() => { if (step < 4) setStep(step + 1); else submitForm(); }}
                disabled={isSubmitting || (step === 1 && (!formData.patientName || !formData.type))}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold shadow-sm hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center min-w-[160px]"
              >
                {step === 4 ? (isSubmitting ? "Uploading..." : "Engage Protocol") : "Proceed"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden relative group">
           
           <div className="p-6 border-b border-border bg-muted/30">
             <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2 text-foreground">
               <FolderKanban className="w-5 h-5 text-primary" />
               Active Registry
             </h2>
           </div>
           
           <div className="p-0">
             <div className="w-full overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/50">
                         <th className="py-4 px-6 text-left">Ident</th>
                         <th className="py-4 px-6 text-left">Protocol</th>
                         <th className="py-4 px-6 text-left">Status Vector</th>
                         <th className="py-4 px-6 text-left">Timestamp</th>
                         <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {cases.map((caseItem, idx) => (
                         <tr key={caseItem.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors group">
                            <td className="py-4 px-6">
                               <div className="font-semibold text-foreground text-sm mb-0.5">{caseItem.patientName}</div>
                               <div className="text-xs text-muted-foreground">AGE {caseItem.patientAge}</div>
                            </td>
                            <td className="py-4 px-6 text-sm text-muted-foreground">{caseItem.type}</td>
                            <td className="py-4 px-6">
                               <div className={`inline-flex px-2.5 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-widest border ${
                                 caseItem.status === 'Approved' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                                 caseItem.status === 'In Progress' ? 'bg-primary/10 text-primary border-primary/20' :
                                 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                               }`}>
                                  {caseItem.status}
                               </div>
                            </td>
                            <td className="py-4 px-6 text-xs text-muted-foreground">
                               {new Date(caseItem.createdAt).toLocaleDateString().replace(/\//g, '.')}
                            </td>
                            <td className="py-4 px-6 text-right">
                               <button className="w-8 h-8 rounded-md flex items-center justify-center ml-auto text-muted-foreground hover:text-foreground hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
                                 <MoreVertical className="w-4 h-4" />
                               </button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

