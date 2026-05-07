import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePatientStore } from "../store/patientStore";
import { 
  ArrowLeft, Star, ChevronDown, Save, Menu, User,
  Plus, Filter, X, UploadCloud, ImageIcon, Activity,
  HeartPulse, FileText, File as FileIcon, XCircle, FileWarning
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function PatientDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getPatient = usePatientStore(state => state.getPatient);
  const patient = getPatient(id || "");
  const [isFavorite, setIsFavorite] = useState(false);

  // States for Photos
  const [photos, setPhotos] = useState<Record<string, string | null>>({
    sideProfile: null,
    frontNeutral: null,
    frontSmiling: null,
    upperArch: null,
    lowerArch: null,
    biteLeft: null,
    biteCenter: null,
    biteRight: null
  });

  // States for X-Rays
  const [xrays, setXrays] = useState<Record<string, string | null>>({
    panoramic: null,
    lateralCeph: null,
    cbct: null
  });

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

  const handlePhotoUpload = (key: string, file: File) => {
    const url = URL.createObjectURL(file);
    setPhotos(prev => ({ ...prev, [key]: url }));
  };

  const handleXrayUpload = (key: string, file: File) => {
     // Check if dicom, stl, zip etc. For preview we just show a generic icon if it's not an image
     const isImage = file.type.startsWith('image/');
     const url = URL.createObjectURL(file);
     setXrays(prev => ({ ...prev, [key]: isImage ? url : 'generic-file' }));
  };

  return (
    <div className="flex flex-col h-full bg-background -m-4 sm:-m-6 md:-m-8">
      {/* Top Header Bar */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={() => navigate('/patients')}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-muted text-muted-foreground transition-colors mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="hidden md:flex items-center gap-2 pr-4 border-r border-border">
            <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
              DR
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Doctor</p>
              <p className="text-sm font-medium text-foreground leading-none">Dr. Smith</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 pr-4 border-r border-border cursor-pointer hover:bg-muted/30 p-1.5 rounded transition-colors">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Office</p>
              <div className="flex items-center gap-1 text-sm font-medium text-foreground leading-none">
                Main Clinic <ChevronDown className="w-3.5 h-3.5 mt-0.5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm border border-primary/20">
                {patient.firstName[0]}{patient.lastName[0]}
             </div>
             <div>
                <h1 className="text-lg font-bold text-foreground leading-none flex items-center gap-2">
                  {patient.firstName} {patient.lastName}
                  <button onClick={() => setIsFavorite(!isFavorite)} className="text-muted-foreground hover:text-amber-500 transition-colors focus:outline-none">
                    <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
                  </button>
                </h1>
                <span className="text-xs font-mono text-muted-foreground mt-1 block">ID: {patient.externalId}</span>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-2 pr-3 border-r border-border cursor-pointer hover:bg-muted/30 p-1.5 rounded transition-colors">
            <span className="text-sm font-medium text-foreground">Standard Account</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 border border-border text-foreground bg-card hover:bg-muted font-medium text-sm rounded-md transition-colors shadow-sm">
            <Save className="w-4 h-4 text-muted-foreground" />
            Save Draft
          </button>
          
          <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground transition-colors border border-transparent hover:border-border">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 overflow-hidden flex flex-col xl:flex-row relative">
        
        {/* Left Sidebar Content Area (Scrollable) */}
        <div className="xl:w-[500px] xl:border-r border-border bg-muted/10 overflow-y-auto no-scrollbar p-6 space-y-6 shrink-0 relative z-10">
           
           <div className="mb-2">
             <h2 className="text-lg font-bold text-foreground">Patient Records</h2>
             <p className="text-sm text-muted-foreground mt-1">Upload required diagnostics to begin planning.</p>
           </div>

           {/* Medical Information */}
           <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
             <div className="px-5 py-4 border-b border-border bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-foreground text-sm">Medical Information</h3>
                </div>
                <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Note
                </button>
             </div>
             <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Allergies</p>
                    <p className="text-sm text-foreground">None reported</p>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Conditions</p>
                    <p className="text-sm text-foreground">None reported</p>
                  </div>
                </div>
                <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Medications</p>
                  <p className="text-sm text-foreground">None reported</p>
                </div>
                <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Additional Observations</p>
                  <p className="text-sm text-muted-foreground italic">No additional notes.</p>
                </div>
             </div>
           </div>

           {/* Photos Section */}
           <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
             <div className="px-5 py-4 border-b border-border bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-foreground text-sm">Clinical Photos</h3>
                </div>
             </div>
             <div className="p-5">
               <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-2">
                 <PhotoUploadBox id="sideProfile" label="Side Profile" value={photos.sideProfile} onUpload={(f) => handlePhotoUpload('sideProfile', f)} onRemove={() => setPhotos(p => ({...p, sideProfile: null}))} />
                 <PhotoUploadBox id="frontNeutral" label="Front Neutral" value={photos.frontNeutral} onUpload={(f) => handlePhotoUpload('frontNeutral', f)} onRemove={() => setPhotos(p => ({...p, frontNeutral: null}))} />
                 <PhotoUploadBox id="frontSmiling" label="Front Smiling" value={photos.frontSmiling} onUpload={(f) => handlePhotoUpload('frontSmiling', f)} onRemove={() => setPhotos(p => ({...p, frontSmiling: null}))} />
                 <PhotoUploadBox id="upperArch" label="Upper Arch" value={photos.upperArch} onUpload={(f) => handlePhotoUpload('upperArch', f)} onRemove={() => setPhotos(p => ({...p, upperArch: null}))} />
                 <PhotoUploadBox id="lowerArch" label="Lower Arch" value={photos.lowerArch} onUpload={(f) => handlePhotoUpload('lowerArch', f)} onRemove={() => setPhotos(p => ({...p, lowerArch: null}))} />
                 <PhotoUploadBox id="biteLeft" label="Bite Left" value={photos.biteLeft} onUpload={(f) => handlePhotoUpload('biteLeft', f)} onRemove={() => setPhotos(p => ({...p, biteLeft: null}))} />
                 <PhotoUploadBox id="biteCenter" label="Bite Center" value={photos.biteCenter} onUpload={(f) => handlePhotoUpload('biteCenter', f)} onRemove={() => setPhotos(p => ({...p, biteCenter: null}))} />
                 <PhotoUploadBox id="biteRight" label="Bite Right" value={photos.biteRight} onUpload={(f) => handlePhotoUpload('biteRight', f)} onRemove={() => setPhotos(p => ({...p, biteRight: null}))} />
               </div>
             </div>
           </div>

           {/* X-Ray Section */}
           <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mb-8">
             <div className="px-5 py-4 border-b border-border bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-foreground text-sm">X-Rays & Scans</h3>
                </div>
             </div>
             <div className="p-5">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xl:grid-cols-1">
                 <XrayUploadBox id="panoramic" label="Panoramic X-Ray" format="JPG/PNG/DICOM" value={xrays.panoramic} onUpload={(f) => handleXrayUpload('panoramic', f)} onRemove={() => setXrays(p => ({...p, panoramic: null}))} />
                 <XrayUploadBox id="lateralCeph" label="Lateral Cephalometric" format="JPG/PNG/DICOM" value={xrays.lateralCeph} onUpload={(f) => handleXrayUpload('lateralCeph', f)} onRemove={() => setXrays(p => ({...p, lateralCeph: null}))} />
                 <XrayUploadBox id="cbct" label="CBCT Scan" format="ZIP/DICOM" value={xrays.cbct} onUpload={(f) => handleXrayUpload('cbct', f)} onRemove={() => setXrays(p => ({...p, cbct: null}))} />
               </div>
             </div>
           </div>

        </div>

        {/* Right Main Content Area */}
        <div className="flex-1 bg-background relative overflow-y-auto no-scrollbar p-6 lg:p-10 z-0">
           <div className="max-w-3xl mx-auto space-y-12 pb-24">
              
              <div className="flex items-center justify-between mb-8">
                 <div>
                   <h2 className="text-2xl font-bold text-foreground">Treatment Setup</h2>
                   <p className="text-muted-foreground mt-2 text-sm">Select the workflow that matches your clinical goal for this case.</p>
                 </div>
                 <button className="w-10 h-10 rounded-lg border border-border bg-card shadow-sm flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0">
                   <Filter className="w-4 h-4 cursor-pointer" />
                 </button>
              </div>

              {/* Treatment Option 1 */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                 <h3 className="text-sm font-semibold text-muted-foreground tracking-wide">
                   I want to move the teeth myself and then print in-house or on the lab
                 </h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TreatmentButton title="Local Treatment" description="In-house active aligner planning" />
                    <TreatmentButton title="Retainers" description="In-house passive retainer planning" />
                 </div>
              </motion.div>

              <div className="h-px w-full bg-border"></div>

              {/* Treatment Option 2 */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
                 <h3 className="text-sm font-semibold text-muted-foreground tracking-wide">
                   I want the lab to plan for me and then send me the aligners
                 </h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TreatmentButton title="Full Case" description="Comprehensive dual-arch treatment" isHighlighted />
                    <TreatmentButton title="Refinement" description="Subsequent phase or correction" />
                    <TreatmentButton title="Active Retainers" description="Minor final adjustments" />
                    <TreatmentButton title="Passive Retainers" description="Final holding retainers" />
                 </div>
              </motion.div>

           </div>
           
           {/* Floating Action Button */}
           <div className="fixed bottom-6 right-6 z-30">
              <button 
                className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                title="Create New Action"
              >
                <Plus className="w-6 h-6" />
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}

// ---------------------- Sub-components ----------------------

function PhotoUploadBox({ 
  id, label, value, onUpload, onRemove 
}: { 
  id: string, label: string, value: string | null, onUpload: (f: File) => void, onRemove: () => void 
}) {
  const [isDrag, setIsDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = (file: File) => {
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          onUpload(file);
          return 100;
        }
        return p + 20;
      });
    }, 150);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDrag(true); };
  const handleDragLeave = () => setIsDrag(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      simulateUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !value && !uploading && inputRef.current?.click()}
        className={`relative aspect-square rounded-lg border-2 overflow-hidden flex flex-col items-center justify-center transition-all ${
          value ? 'border-primary/20 bg-background shadow-sm' : 
          uploading ? 'border-primary/50 bg-primary/5' :
          isDrag ? 'border-primary bg-primary/5 cursor-pointer' : 
          'border-dashed border-border bg-card hover:bg-muted/30 hover:border-primary/50 cursor-pointer'
        }`}
      >
        {value ? (
          <>
            <img src={value} alt={label} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <div className="flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }} className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors">
                  <UploadCloud className="w-4 h-4" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="w-8 h-8 rounded-full bg-destructive/80 text-white flex items-center justify-center hover:bg-destructive transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : uploading ? (
           <div className="w-full px-4 flex flex-col items-center">
             <Activity className="w-5 h-5 text-primary mb-3 animate-spin duration-1000" />
             <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
               <div className="h-full bg-primary transition-all duration-150" style={{ width: `${progress}%` }}></div>
             </div>
             <p className="text-[10px] text-muted-foreground font-medium mt-2">{progress}%</p>
           </div>
        ) : (
          <>
            <ImageIcon className={`w-6 h-6 mb-2 ${isDrag ? 'text-primary' : 'text-muted-foreground/50'}`} />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Upload</span>
          </>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { if(e.target.files?.[0]) simulateUpload(e.target.files[0]); }} />
      </div>
      <p className="text-xs font-semibold text-center text-foreground">{label}</p>
    </div>
  );
}


function XrayUploadBox({ 
  id, label, format, value, onUpload, onRemove 
}: { 
  id: string, label: string, format: string, value: string | null, onUpload: (f: File) => void, onRemove: () => void 
}) {
  const [isDrag, setIsDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = (file: File) => {
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          onUpload(file);
          return 100;
        }
        return p + 25;
      });
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDrag(true); };
  const handleDragLeave = () => setIsDrag(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      simulateUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !value && !uploading && inputRef.current?.click()}
      className={`relative w-full h-24 rounded-lg border-2 overflow-hidden flex items-center px-4 transition-all ${
        value ? 'border-primary/20 bg-background shadow-sm' : 
        uploading ? 'border-primary/50 bg-primary/5' :
        isDrag ? 'border-primary bg-primary/5 cursor-pointer' : 
        'border-dashed border-border bg-card hover:bg-muted/30 hover:border-primary/50 cursor-pointer'
      }`}
    >
      {value ? (
        <div className="flex items-center justify-between w-full">
           <div className="flex items-center gap-3">
             {value === 'generic-file' ? (
                <div className="w-12 h-12 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
             ) : (
                <div className="w-12 h-12 rounded bg-card border border-border overflow-hidden shrink-0">
                  <img src={value} alt={label} className="w-full h-full object-cover" />
                </div>
             )}
             <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-green-600 font-medium flex items-center gap-1 mt-0.5">Uploaded</p>
             </div>
           </div>
           
           <div className="flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }} className="w-8 h-8 rounded border border-border bg-card text-muted-foreground flex items-center justify-center hover:bg-muted transition-colors" title="Replace">
                <UploadCloud className="w-4 h-4" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="w-8 h-8 rounded border border-destructive/20 bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors" title="Remove">
                <X className="w-4 h-4" />
              </button>
           </div>
        </div>
      ) : uploading ? (
        <div className="flex flex-col w-full px-2">
           <div className="flex justify-between items-center mb-2">
             <span className="text-xs font-semibold text-primary">Uploading...</span>
             <span className="text-[10px] font-medium text-muted-foreground">{progress}%</span>
           </div>
           <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
             <div className="h-full bg-primary transition-all duration-200" style={{ width: `${progress}%` }}></div>
           </div>
        </div>
      ) : (
        <div className="flex flex-col w-full">
           <p className="text-sm font-semibold text-foreground">{label}</p>
           <div className="flex items-center gap-2 mt-1">
             <UploadCloud className={`w-4 h-4 ${isDrag ? 'text-primary' : 'text-muted-foreground/50'}`} />
             <span className="text-xs text-muted-foreground font-medium">Drop file or click to browse</span>
           </div>
           <span className="text-[10px] text-muted-foreground/60 absolute bottom-2 right-3 font-mono">{format}</span>
        </div>
      )}
      <input ref={inputRef} type="file" className="hidden" onChange={(e) => { if(e.target.files?.[0]) simulateUpload(e.target.files[0]); }} />
    </div>
  );
}


function TreatmentButton({ title, description, isHighlighted = false }: { title: string, description: string, isHighlighted?: boolean }) {
  return (
    <button className={`text-left p-5 rounded-xl border-2 transition-all active:scale-[0.98] group flex flex-col justify-center h-full min-h-[100px] ${
      isHighlighted 
        ? 'border-primary bg-primary/5 hover:bg-primary/10 shadow-sm' 
        : 'border-border bg-card hover:border-primary/50 hover:bg-muted/30 hover:shadow-sm'
    }`}>
       <div className="flex items-center justify-between w-full mb-2">
         <h4 className={`font-bold text-foreground transition-colors ${
           isHighlighted ? 'text-primary' : 'group-hover:text-primary'
         }`}>{title}</h4>
         <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
           isHighlighted ? 'border-primary bg-primary' : 'border-muted-foreground/30 group-hover:border-primary'
         }`}>
            {isHighlighted && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
         </div>
       </div>
       <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-[90%]">{description}</p>
    </button>
  );
}

