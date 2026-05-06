import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, ArrowRight, Upload, Plus, FileText, CheckCircle2, MoreVertical, FileArchive, X } from "lucide-react";
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

export function Cases() {
  const { token } = useAuthStore();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
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
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const res = await fetch("/api/cases", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setCases(data);
      }
    } catch (error) {
      console.error("Failed to fetch cases", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
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
    const data = new FormData();
    data.append("patientName", formData.patientName);
    data.append("patientAge", formData.patientAge);
    data.append("type", formData.type);
    data.append("notes", formData.notes);
    if (file) {
      data.append("scanFile", file);
    }

    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: data,
      });
      if (res.ok) {
        setIsDialogOpen(false);
        setStep(1);
        setFormData({ patientName: "", patientAge: "", type: "", notes: "" });
        setFile(null);
        fetchCases();
      }
    } catch (error) {
      console.error("Failed to submit case", error);
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="space-y-6 lg:space-y-8 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-heading font-semibold text-foreground">Case Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">Create, track, and manage all your patient cases.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm shadow-primary/20 transition-all active:scale-95 inline-flex items-center justify-center gap-1.5 font-medium px-4 py-2 text-sm">
            <Plus className="w-4 h-4 mr-1" /> New Case
          </Button>
        </motion.div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => !open && resetAndClose()}>
        <DialogContent className="sm:max-w-[550px] rounded-[24px] p-0 overflow-hidden bg-card border-border shadow-xl">
          <div className="h-2 w-full bg-muted overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary"
              initial={{ width: "25%" }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="p-6">
            <DialogHeader className="mb-6 flex flex-row items-start justify-between">
              <div>
                <DialogTitle className="text-xl font-heading font-semibold flex items-center gap-2">
                  {step === 1 && "Create New Case"}
                  {step === 2 && "Upload Scan Data"}
                  {step === 3 && "Additional Notes"}
                  {step === 4 && "Review & Submit"}
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm text-muted-foreground">
                  {step === 1 && "Enter patient details to initiate a new treatment plan."}
                  {step === 2 && "Upload STL or DICOM files for 3D processing."}
                  {step === 3 && "Any specific requirements or instructions for the lab?"}
                  {step === 4 && "Verify the information before finalizing."}
                </DialogDescription>
              </div>
            </DialogHeader>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 py-2"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Patient Name</label>
                    <Input 
                      placeholder="e.g. John Doe" 
                      value={formData.patientName} 
                      onChange={e => setFormData({...formData, patientName: e.target.value})}
                      className="bg-muted border-transparent rounded-xl focus-visible:ring-primary shadow-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Age</label>
                      <Input 
                        type="number"
                        placeholder="e.g. 28" 
                        value={formData.patientAge} 
                        onChange={e => setFormData({...formData, patientAge: e.target.value})}
                        className="bg-muted border-transparent rounded-xl focus-visible:ring-primary shadow-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Treatment Type</label>
                      <Input 
                        placeholder="e.g. Invisalign Lite" 
                        value={formData.type} 
                        onChange={e => setFormData({...formData, type: e.target.value})}
                        className="bg-muted border-transparent rounded-xl focus-visible:ring-primary shadow-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="py-4"
                >
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
                      isDragging ? 'border-primary bg-primary/5' : 'border-border bg-muted/30 hover:bg-muted/60'
                    }`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      onChange={handleFileSelect}
                      accept=".stl,.obj,.dicom,.zip"
                    />
                    
                    {file ? (
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-3">
                          <FileArchive className="w-6 h-6" />
                        </div>
                        <p className="font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => { e.stopPropagation(); setFile(null); }}
                          className="mt-4 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full h-8 px-3"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-muted text-muted-foreground rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <Upload className="w-6 h-6" />
                        </div>
                        <p className="font-medium text-foreground">Click or drag file to this area</p>
                        <p className="text-xs text-muted-foreground mt-1 max-w-[240px]">Support for a single or bulk upload of STL, OBJ, or DICOM zipped files.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 py-2"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Clinical Notes (Optional)</label>
                    <textarea 
                      placeholder="Add any specific instructions, tooth extractions, or special attachments required..." 
                      value={formData.notes} 
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                      className="w-full h-32 p-3 text-sm bg-muted border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary shadow-none resize-none disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="py-2 space-y-4"
                >
                  <div className="bg-muted/50 rounded-2xl p-5 space-y-4 border border-border">
                    <div className="grid grid-cols-2 gap-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Patient</p>
                        <p className="font-medium mt-1">{formData.patientName || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Age</p>
                        <p className="font-medium mt-1">{formData.patientAge || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Type</p>
                        <p className="font-medium mt-1">{formData.type || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Files Attached</p>
                        <p className="font-medium mt-1">{file ? file.name : "None"}</p>
                      </div>
                    </div>
                    {formData.notes && (
                      <div className="pt-4 border-t border-border/50">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Notes</p>
                        <p className="text-sm mt-1">{formData.notes}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/10 text-primary rounded-xl text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Case will be submitted to the AI processing queue immediately.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-center mt-8 pt-4 border-t border-border">
              <Button 
                variant="ghost" 
                onClick={step === 1 ? resetAndClose : () => setStep(step - 1)}
                className="rounded-xl text-muted-foreground font-medium"
              >
                {step === 1 ? "Cancel" : <><ArrowLeft className="w-4 h-4 mr-2" /> Back</>}
              </Button>
              
              <Button 
                onClick={() => {
                  if (step < 4) setStep(step + 1);
                  else submitForm();
                }}
                disabled={isSubmitting || (step === 1 && (!formData.patientName || !formData.type))}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm px-6 font-medium"
              >
                {step === 4 ? (isSubmitting ? "Submitting..." : "Submit Case") : <>Continue <ArrowRight className="w-4 h-4 ml-2" /></>}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="rounded-2xl border-border shadow-sm shadow-black/5 overflow-hidden">
          <CardHeader className="bg-card border-b border-border/50 pb-4">
            <CardTitle className="text-lg font-heading text-foreground">All Cases</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-12 text-center text-muted-foreground">Loading cases...</div>
            ) : cases.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <p className="text-foreground font-medium">No cases found</p>
                <p className="text-muted-foreground text-sm mt-1 mb-6">You haven't created any cases yet.</p>
                <Button onClick={() => setIsDialogOpen(true)} className="rounded-xl bg-primary text-primary-foreground shadow-sm">
                  Create First Case
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow className="border-border/50">
                      <TableHead className="py-3 px-6 text-xs text-muted-foreground font-semibold uppercase tracking-wider font-sans">Patient</TableHead>
                      <TableHead className="py-3 px-6 text-xs text-muted-foreground font-semibold uppercase tracking-wider font-sans">Type</TableHead>
                      <TableHead className="py-3 px-6 text-xs text-muted-foreground font-semibold uppercase tracking-wider font-sans">Status</TableHead>
                      <TableHead className="py-3 px-6 text-xs text-muted-foreground font-semibold uppercase tracking-wider font-sans">Created</TableHead>
                      <TableHead className="py-3 px-6 text-right font-sans"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cases.map((caseItem) => (
                      <TableRow key={caseItem.id} className="border-border/50 hover:bg-muted/50 transition-colors group">
                        <TableCell className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground text-sm">{caseItem.patientName}</span>
                            <span className="text-xs text-muted-foreground mt-0.5">
                              {caseItem.patientAge ? `${caseItem.patientAge} years` : "Age not specified"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-6 text-sm">
                          {caseItem.type}
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <Badge variant="outline" className={`font-mono font-medium tracking-tight rounded-md px-2.5 py-0.5 text-xs ${
                            caseItem.status === "Approved" ? "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400" :
                            caseItem.status === "In Progress" ? "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400" :
                            "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400"
                          }`}>
                            {caseItem.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4 px-6 text-sm text-muted-foreground">
                          {new Date(caseItem.createdAt).toLocaleDateString(undefined, { 
                            year: 'numeric', month: 'short', day: 'numeric' 
                          })}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-foreground hover:bg-muted rounded-full transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

