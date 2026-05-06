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
    <div className="space-y-8 pb-12 font-sans text-white max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[10px] font-mono tracking-widest text-[#2563EB] mb-2 drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]">CLINICAL_RECORDS</div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94A3B8] flex items-center gap-3 tracking-tight">
            Case Directory
          </h1>
          <p className="text-[#94A3B8] mt-2 text-sm font-light">Manage patient pipelines and spatial datasets.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <button onClick={() => setIsDialogOpen(true)} className="group relative px-6 py-3 bg-[#2563EB] text-white rounded-full font-semibold overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(37,99,235,0.3)] flex items-center gap-2">
            <div className="absolute inset-0 bg-gradient-to-r from-[#14B8A6]/0 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 w-[200%] -translate-x-full group-hover:translate-x-0 ease-linear"></div>
            <Plus className="w-4 h-4 ml-0.5" />
            <span className="relative z-10 text-sm tracking-wide">Initialize Case</span>
          </button>
        </motion.div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => !open && resetAndClose()}>
        <DialogContent className="sm:max-w-[600px] rounded-[2rem] p-0 overflow-hidden bg-[#0F172A]/90 backdrop-blur-3xl border border-white/10 shadow-2xl text-white">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-0"></div>
          
          <div className="h-1 w-full bg-[#020617] relative z-10">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#2563EB] to-[#14B8A6]"
              initial={{ width: "25%" }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: "circOut" }}
            />
          </div>
          
          <div className="p-8 relative z-10">
            <DialogHeader className="mb-8 border-b border-white/5 pb-6">
              <DialogTitle className="text-2xl font-bold tracking-tight text-white/90">
                {step === 1 && "Patient Demographics"}
                {step === 2 && "Volume Injection"}
                {step === 3 && "Clinical Directives"}
                {step === 4 && "Validation Protocol"}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-[#94A3B8] font-light">
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
                    <label className="text-xs font-mono uppercase tracking-widest text-[#94A3B8]">Patient Identifier</label>
                    <input 
                      placeholder="e.g. John Doe" 
                      value={formData.patientName} 
                      onChange={e => setFormData({...formData, patientName: e.target.value})}
                      className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#94A3B8]/50 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-xs font-mono uppercase tracking-widest text-[#94A3B8]">Age (Chronological)</label>
                      <input 
                        type="number"
                        placeholder="e.g. 28" 
                        value={formData.patientAge} 
                        onChange={e => setFormData({...formData, patientAge: e.target.value})}
                        className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#94A3B8]/50 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-mono uppercase tracking-widest text-[#94A3B8]">Treatment Class</label>
                      <input 
                        placeholder="e.g. Aligners" 
                        value={formData.type} 
                        onChange={e => setFormData({...formData, type: e.target.value})}
                        className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#94A3B8]/50 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
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
                      isDragging ? 'border-[#14B8A6] bg-[#14B8A6]/5 shadow-[inset_0_0_30px_rgba(20,184,166,0.1)]' : 'border-white/10 bg-[#020617]/50 hover:bg-[#020617]/80 hover:border-white/20'
                    }`}
                  >
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} accept=".stl,.obj,.dicom,.zip" />
                    
                    {file ? (
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#14B8A6]/10 text-[#14B8A6] rounded-2xl flex items-center justify-center mb-4 border border-[#14B8A6]/30 shadow-[0_0_20px_rgba(20,184,166,0.2)]">
                          <FileArchive className="w-8 h-8" />
                        </div>
                        <p className="font-bold text-white text-lg tracking-tight mb-1">{file.name}</p>
                        <p className="text-xs font-mono text-[#94A3B8]">{(file.size / (1024 * 1024)).toFixed(2)} MB • READY FOR COMPILATION</p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setFile(null); }}
                          className="mt-6 text-orange-500 hover:text-orange-400 text-sm font-semibold tracking-wide uppercase transition-colors"
                        >
                          Eject Volume
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-white/5 text-[#94A3B8] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#2563EB]/10 group-hover:text-[#2563EB] transition-colors border border-white/5">
                          <Upload className="w-8 h-8" />
                        </div>
                        <p className="font-semibold text-white/90 text-lg mb-2">Drop volumetric payload here</p>
                        <p className="text-xs text-[#94A3B8] font-light max-w-[260px] leading-relaxed">System supports raw point clouds, unified STL meshes, and zipped DICOM directories.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-xs font-mono uppercase tracking-widest text-[#94A3B8]">Clinician Directives <span className="text-white/30 text-[10px] ml-2">(OPTIONAL)</span></label>
                    <textarea 
                      placeholder="Specify non-eruptions, extraction plans, or anchor points..." 
                      value={formData.notes} 
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                      className="w-full h-40 p-4 bg-[#020617] border border-white/10 rounded-xl text-white placeholder:text-[#94A3B8]/50 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] resize-none transition-all leading-relaxed"
                    />
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  <div className="bg-[#020617] rounded-2xl p-6 border border-white/5 shadow-inner">
                    <div className="grid grid-cols-2 gap-y-6">
                      <div>
                        <p className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest">Target Entity</p>
                        <p className="font-bold text-white mt-1 text-lg">{formData.patientName || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest">Chronology</p>
                        <p className="font-bold text-white mt-1 text-lg">{formData.patientAge || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest">Vector Class</p>
                        <p className="font-bold text-white mt-1 text-lg">{formData.type || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest">Data Payload</p>
                        <p className="font-bold text-[#14B8A6] mt-1 text-sm tracking-tight truncate max-w-[150px]">{file ? file.name : "Null Payload"}</p>
                      </div>
                    </div>
                    {formData.notes && (
                      <div className="pt-6 mt-6 border-t border-white/5">
                        <p className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest mb-2">Attached Directives</p>
                        <p className="text-sm text-white/80 leading-relaxed bg-white/5 rounded-lg p-3">{formData.notes}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#3B82F6] rounded-xl shadow-[inset_0_0_15px_rgba(37,99,235,0.1)]">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Sequence Ready</p>
                      <p className="text-xs text-[#94A3B8] mt-1 opacity-80">Payload will be encrypted and submitted to the cloud compute cluster.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/5">
              <button onClick={step === 1 ? resetAndClose : () => setStep(step - 1)} className="px-6 py-2 rounded-full text-[#94A3B8] font-bold uppercase tracking-wider text-xs hover:text-white transition-colors">
                {step === 1 ? "Abort" : "Rewind"}
              </button>
              
              <button 
                onClick={() => { if (step < 4) setStep(step + 1); else submitForm(); }}
                disabled={isSubmitting || (step === 1 && (!formData.patientName || !formData.type))}
                className="px-8 py-3 bg-white text-black rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center min-w-[160px]"
              >
                {step === 4 ? (isSubmitting ? "Uploading..." : "Engage Protocol") : "Proceed"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="rounded-[2rem] border border-white/5 bg-[#0F172A]/80 backdrop-blur-3xl shadow-2xl overflow-hidden relative group">
           <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
           
           <div className="p-6 border-b border-white/5 bg-white/[0.02]">
             <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
               <FolderKanban className="w-5 h-5 text-[#2563EB]" />
               Active Registry
             </h2>
           </div>
           
           <div className="p-0">
             <div className="w-full overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="border-b border-white/5 text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase">
                         <th className="py-5 px-8 font-normal">Ident</th>
                         <th className="py-5 px-8 font-normal">Protocol</th>
                         <th className="py-5 px-8 font-normal">Status Vector</th>
                         <th className="py-5 px-8 font-normal">Timestamp</th>
                         <th className="py-5 px-8 font-normal text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {cases.map((caseItem, idx) => (
                         <tr key={caseItem.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors relative group/row">
                            <td className="py-5 px-8">
                               <div className="font-bold text-white text-sm mb-1">{caseItem.patientName}</div>
                               <div className="text-[10px] font-mono text-[#94A3B8]">AGE {caseItem.patientAge}</div>
                            </td>
                            <td className="py-5 px-8 text-sm text-[#94A3B8]">{caseItem.type}</td>
                            <td className="py-5 px-8">
                               <div className={`inline-flex px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-widest border ${
                                 caseItem.status === 'Approved' ? 'bg-[#14B8A6]/10 text-[#14B8A6] border-[#14B8A6]/20' :
                                 caseItem.status === 'In Progress' ? 'bg-[#2563EB]/10 text-[#3B82F6] border-[#2563EB]/20' :
                                 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                               }`}>
                                  {caseItem.status}
                               </div>
                            </td>
                            <td className="py-5 px-8 text-[10px] font-mono text-[#94A3B8]">
                               {new Date(caseItem.createdAt).toLocaleDateString().replace(/\//g, '.')}
                            </td>
                            <td className="py-5 px-8 text-right">
                               <button className="w-8 h-8 rounded-full flex items-center justify-center ml-auto text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover/row:opacity-100">
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

