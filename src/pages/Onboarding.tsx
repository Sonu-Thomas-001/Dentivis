import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Camera, Check, ChevronRight, Activity, Building, Shield, Users, Bell, UploadCloud, X, Plus
} from "lucide-react";

const personalSchema = z.object({
  prefix: z.string().min(1, "Prefix is required"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is required"),
  npi: z.string().optional(),
  aboutMe: z.string().optional()
});

type PersonalFormData = z.infer<typeof personalSchema>;

const officeSchema = z.object({
  officeName: z.string().min(2, "Office name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is required"),
  showDoctorName: z.boolean().default(false),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
});

type OfficeFormData = z.infer<typeof officeSchema>;

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [officeTab, setOfficeTab] = useState<"Information" | "Permissions" | "Staff" | "Notifications">("Information");
  const [logoType, setLogoType] = useState<"Color" | "BW">("Color");
  const [isFinishing, setIsFinishing] = useState(false);
  const [permissions, setPermissions] = useState({
    admin: true,
    planning: true,
    printing: false,
    financial: false
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const { register: regPersonal, handleSubmit: handlePersonalSubmit, formState: { errors: errPersonal, isValid: isPersonalValid } } = useForm<PersonalFormData>({
    resolver: zodResolver(personalSchema),
    mode: "onChange",
    defaultValues: { prefix: "Dr." }
  });

  const { register: regOffice, handleSubmit: handleOfficeSubmit, formState: { errors: errOffice, isValid: isOfficeValid } } = useForm<OfficeFormData>({
    resolver: zodResolver(officeSchema),
    mode: "onChange",
    defaultValues: { country: "USA", showDoctorName: true }
  });

  const onPersonalSubmit = (data: PersonalFormData) => {
    // Save personal info conceptually
    setStep(2);
  };

  const onOfficeSubmit = (data: OfficeFormData) => {
    setIsFinishing(true);
    // Simulate API call
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProfilePic(url);
    }
  };

  const workflowSteps = ["Patients", "Planning", "Printing", "Shipments", "Finances", "Labs", "Profile"];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* Header Container */}
      <div className="flex-none p-6 md:px-12 flex items-center justify-between z-10 w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-sm">
             <div className="w-4 h-4 border-2 border-white rounded-full"></div>
             <div className="w-1.5 h-1.5 bg-white rounded-full absolute"></div>
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">Dentivis<span className="text-primary">.</span></span>
        </div>
      </div>

      <div className="flex flex-col items-center flex-1 max-w-6xl mx-auto w-full px-6 py-6 md:py-10 z-10 relative">
        
        {/* Onboarding Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Complete Your Profile</h1>
          <p className="text-muted-foreground mt-2 text-base">Let's set up your Dentivis workspace.</p>
        </motion.div>

        {/* Top Workflow Configuration Preview (Stepper View) */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="w-full flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-4">
          {workflowSteps.map((s, idx) => (
            <React.Fragment key={s}>
              <div className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                s === "Profile" 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "bg-card border border-border text-muted-foreground"
              }`}>
                {s === "Profile" && <Check className="w-4 h-4" />}
                {s}
              </div>
              {idx < workflowSteps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground/30 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Step 1: Personal Profile */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-card border border-border shadow-sm rounded-2xl p-8 md:p-10"
            >
              <form id="personal-form" onSubmit={handlePersonalSubmit(onPersonalSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Side */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-lg font-bold text-foreground border-b border-border pb-3 mb-6">Personal Information</h2>
                    <div className="flex items-center gap-6 mb-8">
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-24 h-24 rounded-full border-2 border-dashed border-border flex flex-col items-center justify-center bg-muted/30 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all relative overflow-hidden group shrink-0"
                      >
                        {profilePic ? (
                          <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Camera className="w-6 h-6 text-muted-foreground group-hover:text-primary mb-1" />
                            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Upload</span>
                          </>
                        )}
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleProfileImage} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">Profile Picture</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">A professional photo helps build trust with patients and staff members.</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-5 mb-5">
                      <div className="col-span-1 space-y-1.5 align-bottom">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Prefix</label>
                        <select {...regPersonal("prefix")} className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-shadow hover:border-border/80">
                          <option value="Dr.">Dr.</option>
                          <option value="Mr.">Mr.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Ms.">Ms.</option>
                        </select>
                      </div>
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">First Name</label>
                        <input {...regPersonal("firstName")} className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-shadow hover:border-border/80" placeholder="e.g. Sarah" />
                        {errPersonal.firstName && <span className="text-[10px] text-destructive">{errPersonal.firstName.message}</span>}
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Name</label>
                      <input {...regPersonal("lastName")} className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-shadow hover:border-border/80" placeholder="e.g. Jenkins" />
                      {errPersonal.lastName && <span className="text-[10px] text-destructive">{errPersonal.lastName.message}</span>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</label>
                      <input type="password" {...regPersonal("password")} className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-shadow hover:border-border/80" placeholder="••••••••" />
                      {errPersonal.password && <span className="text-[10px] text-destructive">{errPersonal.password.message}</span>}
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="space-y-8 h-full flex flex-col">
                  <div className="flex-1 space-y-5">
                    <h2 className="text-lg font-bold text-foreground border-b border-border pb-3 mb-6">Contact Info</h2>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</label>
                      <input type="email" {...regPersonal("email")} className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-shadow hover:border-border/80" placeholder="doctor@clinic.com" />
                      {errPersonal.email && <span className="text-[10px] text-destructive">{errPersonal.email.message}</span>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</label>
                      <input type="tel" {...regPersonal("phone")} className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-shadow hover:border-border/80" placeholder="+1 (555) 000-0000" />
                      {errPersonal.phone && <span className="text-[10px] text-destructive">{errPersonal.phone.message}</span>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        National Provider Identifier (NPI)
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground normal-case bg-secondary/10 text-secondary">Optional</span>
                      </label>
                      <input {...regPersonal("npi")} className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-shadow hover:border-border/80" placeholder="e.g. 1234567890" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">About Me</label>
                      <textarea {...regPersonal("aboutMe")} className="w-full h-24 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none transition-shadow hover:border-border/80" placeholder="Brief biographical information..." />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-4 pt-6 border-t border-border mt-auto">
                    <button type="button" onClick={() => setStep(2)} className="px-5 py-2.5 rounded-lg border border-transparent text-muted-foreground hover:bg-muted text-sm font-medium transition-colors">
                      Skip for now
                    </button>
                    <button 
                      type="submit"
                      className="px-8 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Step 2: Office Setup Modal */}
      <AnimatePresence>
        {step === 2 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-5xl bg-card border border-border shadow-2xl rounded-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              {/* Modal Top Border/Header */}
              <div className="h-1.5 w-full bg-primary/80"></div>
              
              <div className="p-6 flex items-center justify-between border-b border-border bg-card relative z-10">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Office Information</h2>
                  <p className="text-sm text-muted-foreground mt-1">Configure your clinic preferences and team access.</p>
                </div>
                <button onClick={() => setStep(1)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors" title="Go back">
                   <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="px-6 flex gap-8 border-b border-border bg-card">
                {[
                  { id: "Information", icon: Building },
                  { id: "Permissions", icon: Shield },
                  { id: "Staff", icon: Users },
                  { id: "Notifications", icon: Bell }
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setOfficeTab(t.id as any)}
                      className={`flex items-center gap-2 py-4 px-1 text-sm font-semibold transition-all border-b-2 ${
                        officeTab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {t.id}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Area */}
              <div className="flex-1 overflow-y-auto no-scrollbar relative p-6 bg-muted/10">
                <AnimatePresence mode="wait">
                  
                  {officeTab === "Information" && (
                    <motion.div 
                      key="info"
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                      className="h-full"
                    >
                      <form id="office-form" onSubmit={handleOfficeSubmit(onOfficeSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Side */}
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5">Basic Information</h3>
                            
                            <div className="space-y-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-muted-foreground">Clinic/Office Name</label>
                                <input {...regOffice("officeName")} className="w-full h-11 px-3 rounded-lg border border-border bg-card text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="e.g. BrightSmiles Orthodontics" />
                                {errOffice.officeName && <span className="text-[10px] text-destructive">{errOffice.officeName.message}</span>}
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                  <label className="text-xs font-semibold text-muted-foreground">Main Email</label>
                                  <input type="email" {...regOffice("email")} className="w-full h-11 px-3 rounded-lg border border-border bg-card text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="office@clinic.com" />
                                  {errOffice.email && <span className="text-[10px] text-destructive">{errOffice.email.message}</span>}
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-xs font-semibold text-muted-foreground">Main Phone</label>
                                  <input type="tel" {...regOffice("phone")} className="w-full h-11 px-3 rounded-lg border border-border bg-card text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="+1 (555) 123-4567" />
                                  {errOffice.phone && <span className="text-[10px] text-destructive">{errOffice.phone.message}</span>}
                                </div>
                              </div>

                              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card cursor-pointer hover:bg-muted/50 transition-colors mt-2">
                                <input type="checkbox" {...regOffice("showDoctorName")} className="w-4 h-4 rounded text-primary focus:ring-primary border-border" />
                                <div>
                                  <p className="text-sm font-semibold text-foreground">Include Doctor Name</p>
                                  <p className="text-xs text-muted-foreground">Show doctor name in patient shipping labels</p>
                                </div>
                              </label>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5">Office Logo</h3>
                            <div className="flex items-center gap-4 mb-4">
                               <button 
                                 type="button"
                                 onClick={() => setLogoType("Color")}
                                 className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors ${logoType === "Color" ? "bg-primary/10 text-primary" : "bg-card border border-border text-muted-foreground hover:bg-muted"}`}
                               >
                                 Full Color
                               </button>
                               <button 
                                 type="button"
                                 onClick={() => setLogoType("BW")}
                                 className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors ${logoType === "BW" ? "bg-primary/10 text-primary" : "bg-card border border-border text-muted-foreground hover:bg-muted"}`}
                               >
                                 Black & White
                               </button>
                            </div>
                            <div className="w-full h-32 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center bg-card hover:bg-muted/30 hover:border-primary/50 transition-colors cursor-pointer group">
                               <UploadCloud className="w-8 h-8 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                               <p className="text-sm font-medium text-foreground">Drag & drop logo or click to browse</p>
                               <p className="text-xs text-muted-foreground mt-1">SVG, PNG, or JPG (max 5MB)</p>
                            </div>
                          </div>
                        </div>

                        {/* Right Side */}
                        <div>
                          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5">Primary Address</h3>
                          <div className="space-y-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-muted-foreground">Street Address</label>
                              <input {...regOffice("address")} className="w-full h-11 px-3 rounded-lg border border-border bg-card text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="123 Dental Way, Suite 100" />
                              {errOffice.address && <span className="text-[10px] text-destructive">{errOffice.address.message}</span>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-muted-foreground">City</label>
                                <input {...regOffice("city")} className="w-full h-11 px-3 rounded-lg border border-border bg-card text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Boston" />
                                {errOffice.city && <span className="text-[10px] text-destructive">{errOffice.city.message}</span>}
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-muted-foreground">State/Province</label>
                                <input {...regOffice("state")} className="w-full h-11 px-3 rounded-lg border border-border bg-card text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="MA" />
                                {errOffice.state && <span className="text-[10px] text-destructive">{errOffice.state.message}</span>}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-muted-foreground">Postal Code</label>
                                <input {...regOffice("postalCode")} className="w-full h-11 px-3 rounded-lg border border-border bg-card text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="02108" />
                                {errOffice.postalCode && <span className="text-[10px] text-destructive">{errOffice.postalCode.message}</span>}
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-muted-foreground">Country</label>
                                <select {...regOffice("country")} className="w-full h-11 px-3 rounded-lg border border-border bg-card text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none">
                                  <option value="USA">United States</option>
                                  <option value="CAN">Canada</option>
                                  <option value="UK">United Kingdom</option>
                                  <option value="AUS">Australia</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {officeTab === "Permissions" && (
                    <motion.div 
                      key="perms"
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                      className="max-w-2xl mx-auto space-y-6"
                    >
                       <div className="mb-8">
                         <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">Default Base Roles</h3>
                         <p className="text-sm text-muted-foreground">Configure global privileges for your workspace.</p>
                       </div>
                       
                       {[
                         { id: "admin", label: "Administrator Access", desc: "Full control over clinic settings, billing, and all system users." },
                         { id: "planning", label: "Treatment Planning", desc: "Create, view, and modify orthodontic treatment plans and 3D modeling." },
                         { id: "printing", label: "In-House Printing", desc: "Access to export STL files and manage 3D printer integrations." },
                         { id: "financial", label: "Financial Data", desc: "View invoices, payouts, and billing methods." },
                       ].map((p) => (
                         <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-card border border-border rounded-xl shadow-sm hover:border-primary/30 transition-colors gap-4">
                            <div>
                               <div className="font-semibold text-foreground">{p.label}</div>
                               <div className="text-sm text-muted-foreground mt-1 max-w-[400px]">{p.desc}</div>
                            </div>
                            <button 
                              onClick={() => setPermissions(prev => ({ ...prev, [p.id]: !prev[p.id as keyof typeof permissions] }))}
                              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${permissions[p.id as keyof typeof permissions] ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                            >
                              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${permissions[p.id as keyof typeof permissions] ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                         </div>
                       ))}
                    </motion.div>
                  )}

                  {officeTab === "Staff" && (
                    <motion.div 
                      key="staff"
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                      className="max-w-3xl mx-auto"
                    >
                       <div className="flex items-center justify-between mb-6">
                         <div>
                           <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Invite Team</h3>
                           <p className="text-sm text-muted-foreground mt-1">Send invites to doctors, technicians, and staff.</p>
                         </div>
                         <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-lg hover:bg-primary/20 transition-colors">
                           <Plus className="w-4 h-4" /> Add Member
                         </button>
                       </div>

                       <div className="p-6 border border-dashed border-border rounded-xl bg-card text-center hover:bg-muted/30 transition-colors">
                          <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                          <p className="text-sm font-semibold text-foreground">No pending invites</p>
                          <p className="text-xs text-muted-foreground mt-1">Invite your first team member to start collaborating.</p>
                       </div>
                    </motion.div>
                  )}

                  {officeTab === "Notifications" && (
                    <motion.div 
                      key="notify"
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                      className="max-w-2xl mx-auto space-y-6"
                    >
                       <div className="mb-6">
                         <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Alert Preferences</h3>
                         <p className="text-sm text-muted-foreground mt-1">Control email notifications regarding case statuses.</p>
                       </div>
                       
                       <div className="space-y-3">
                         {["Treatment Plan Ready", "New Note Added", "Shipment Dispatched", "Weekly Digest"].map((n, i) => (
                           <label key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card cursor-pointer hover:bg-muted/50 transition-colors">
                             <input type="checkbox" defaultChecked={i < 2} className="w-4 h-4 rounded text-primary focus:ring-primary border-border" />
                             <span className="text-sm font-semibold text-foreground">{n}</span>
                           </label>
                         ))}
                       </div>
                    </motion.div>
                  )}
                  
                </AnimatePresence>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 border-t border-border bg-card flex justify-end gap-3 z-10 shrink-0">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2.5 rounded-lg border border-border bg-background hover:bg-muted text-sm font-medium text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  form="office-form"
                  disabled={isFinishing}
                  className="px-8 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium shadow-sm transition-all focus:ring-2 focus:ring-offset-2 flex items-center gap-2"
                >
                  {isFinishing ? (
                    <><Activity className="w-4 h-4 animate-spin" /> Creating...</>
                  ) : (
                    <><Check className="w-4 h-4" /> Create</>
                  )}
                </button>
              </div>
              
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
