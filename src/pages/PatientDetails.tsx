import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePatientStore } from "../store/patientStore";
import { ArrowLeft, UploadCloud, File, Image as ImageIcon, Box, FileText, CheckCircle2, Clock, MapPin, Phone, Mail, Calendar, Settings, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function PatientDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getPatient = usePatientStore(state => state.getPatient);
  const patient = getPatient(id || "");
  const [isDragging, setIsDragging] = useState(false);
  const [uploads, setUploads] = useState<{name: string, type: string, progress: number, status: 'uploading' | 'completed'}[]>([]);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
        <Activity className="w-12 h-12 mb-4 opacity-20" />
        <h2 className="text-xl font-bold text-foreground">Patient Not Found</h2>
        <p className="mt-2 text-sm">The requested patient record could not be located.</p>
        <button onClick={() => navigate('/patients')} className="mt-6 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
          Return to Directory
        </button>
      </div>
    );
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const newUploads = files.map(f => ({
      name: f.name,
      type: f.name.endsWith('.stl') || f.name.endsWith('.obj') ? '3d' : f.name.endsWith('.dcm') || f.name.endsWith('.zip') ? 'scan' : 'doc',
      progress: 0,
      status: 'uploading' as const
    }));

    setUploads(prev => [...prev, ...newUploads]);

    // Simulate upload progress
    newUploads.forEach((upload, idx) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploads(prev => prev.map(u => u.name === upload.name ? { ...u, progress: 100, status: 'completed' } : u));
        } else {
          setUploads(prev => prev.map(u => u.name === upload.name ? { ...u, progress } : u));
        }
      }, 300);
    });
  };

  const getFileIcon = (type: string) => {
    if (type === '3d') return <Box className="w-5 h-5 text-indigo-500" />;
    if (type === 'scan') return <ImageIcon className="w-5 h-5 text-primary" />;
    return <FileText className="w-5 h-5 text-muted-foreground" />;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 font-sans">
      <button 
        onClick={() => navigate('/patients')}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Patients
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Overview */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0"></div>
            
            <div className="relative z-10 flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold border border-primary/20 shadow-sm">
                {patient.firstName[0]}{patient.lastName[0]}
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mt-4 tracking-tight">
              {patient.title} {patient.firstName} {patient.lastName}
            </h1>
            <div className="flex items-center gap-2 text-sm text-primary font-medium mt-1 mb-6">
              <span className="font-mono bg-primary/10 px-2 py-0.5 rounded text-xs">{patient.externalId}</span>
              <span>•</span>
              <span className={patient.status === 'Active' ? 'text-primary' : 'text-amber-500'}>{patient.status}</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground text-xs">Date of Birth</div>
                  <div className="font-medium text-foreground">{new Date(patient.birthday).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground text-xs">Phone</div>
                  <div className="font-medium text-foreground">{patient.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground text-xs">Email</div>
                  <div className="font-medium text-foreground">{patient.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground text-xs">Location</div>
                  <div className="font-medium text-foreground">{patient.city}, {patient.state}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline / Status */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Treatment Pathway</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="w-5 h-5 rounded-full border-2 border-primary bg-background shrink-0 mx-auto z-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                </div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-4 md:ml-0 md:group-odd:mr-[1.5rem] md:group-even:ml-[1.5rem] bg-muted/30 p-3 rounded-lg border border-border">
                  <h4 className="font-semibold text-sm text-foreground">Registered</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{new Date(patient.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="w-5 h-5 rounded-full border-2 border-border bg-background shrink-0 mx-auto z-10"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-4 md:ml-0 md:group-odd:mr-[1.5rem] md:group-even:ml-[1.5rem]">
                  <h4 className="font-semibold text-sm text-muted-foreground">Scans Ingested</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Pending</p>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="w-5 h-5 rounded-full border-2 border-border bg-background shrink-0 mx-auto z-10"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-4 md:ml-0 md:group-odd:mr-[1.5rem] md:group-even:ml-[1.5rem]">
                  <h4 className="font-semibold text-sm text-muted-foreground">Treatment Plan Complete</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Pending</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Files & Notes */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
             
            <div className="p-6 border-b border-border bg-muted/20">
              <h2 className="text-lg font-bold text-foreground">Clinical Files & Diagnostics</h2>
              <p className="text-sm text-muted-foreground mt-1">Upload STL meshes, DICOM scans, or clinical photos.</p>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              {/* Uploader */}
              <label 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                  isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/30'
                }`}
              >
                <input type="file" className="hidden" multiple onChange={handleFileInput} accept=".stl,.obj,.dcm,.zip,.jpg,.png,.pdf" />
                <UploadCloud className={`w-10 h-10 mb-3 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
                <p className="text-sm font-semibold text-foreground">Click or drag files here</p>
                <p className="text-xs text-muted-foreground mt-1 text-center max-w-[250px]">Accepts STL, OBJ, DICOM, ZIP, JPG, PNG, PDF up to 500MB</p>
              </label>

              {/* Uploads List */}
              {uploads.length > 0 && (
                <div className="mt-6 space-y-3 flex-1 overflow-y-auto pr-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Attached Files</h3>
                  <AnimatePresence>
                    {uploads.map((upload, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={`${upload.name}-${idx}`}
                        className="p-3 rounded-lg border border-border bg-muted/20 flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-md bg-background border border-border flex items-center justify-center shrink-0 shadow-sm">
                          {getFileIcon(upload.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-foreground truncate">{upload.name}</span>
                            {upload.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                            {upload.status === 'uploading' && <span className="text-xs text-primary font-medium">{upload.progress}%</span>}
                          </div>
                          
                          {upload.status === 'uploading' && (
                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${upload.progress}%` }}
                              />
                            </div>
                          )}
                          {upload.status === 'completed' && (
                            <div className="text-xs text-muted-foreground mt-0.5 flex gap-3">
                              <span>{new Date().toLocaleDateString()}</span>
                              <span className="uppercase">{upload.type}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
              {uploads.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground py-12">
                   <FolderX className="w-12 h-12 mb-3 opacity-20" />
                   <p className="text-sm font-medium text-foreground">No files uploaded</p>
                   <p className="text-xs mt-1 text-center max-w-[200px]">Upload preliminary scans to begin treatment planning.</p>
                </div>
              )}
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Just an inline mock icon to avoid importing an unused one from above
function FolderX({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      <line x1="9" x2="15" y1="14" y2="14"/>
    </svg>
  );
}
