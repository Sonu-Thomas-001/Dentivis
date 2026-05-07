import React, { useState } from "react";
import { User, Search, Filter, MoreVertical, Plus, Calendar, Activity, ChevronRight, Check, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import { usePatientStore } from "../store/patientStore";
import { useNavigate } from "react-router-dom";

// Validations
const patientSchema = z.object({
  title: z.string().min(1, "Title is required"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  birthday: z.string().min(1, "Birthday is required"),
  gender: z.string().min(1, "Gender is required"),
  ethnicity: z.string().min(1, "Ethnicity is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is too short"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
});

type PatientFormData = z.infer<typeof patientSchema>;

export function Patients() {
  const { patients, addPatient, isLoading } = usePatientStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  const filtered = patients.filter(p => 
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.externalId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const steps = ["Overview", "Patients", "Planning", "Printing", "Shipments", "Finances", "Profile"];

  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    mode: "onChange"
  });

  const onSubmit = async (data: PatientFormData) => {
    const newPatient = await addPatient(data);
    setIsAddModalOpen(false);
    reset();
    navigate(`/patients/${newPatient.id}`);
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Top Navigation Stepper */}
      <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {steps.map((step, idx) => (
          <React.Fragment key={step}>
            <div className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              step === "Patients" 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "bg-card border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}>
              {step === "Patients" && <Check className="w-4 h-4" />}
              {step}
            </div>
            {idx < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground/30 shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Patient Directory</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage cases, diagnostics, and demographic records.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patients or ID..." 
              className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
            />
          </div>
          <button className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0 shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
        className="flex-1 min-h-0 flex flex-col"
      >
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col h-full">
           <div className="overflow-auto no-scrollbar flex-1 relative">
              <table className="w-full text-left border-collapse min-w-[800px]">
                 <thead className="sticky top-0 bg-muted/80 backdrop-blur-md z-10 shadow-sm">
                    <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                       <th className="py-4 px-6">Patient Name</th>
                       <th className="py-4 px-6">Status</th>
                       <th className="py-4 px-6">External ID</th>
                       <th className="py-4 px-6">Registered</th>
                       <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border/50">
                    {filtered.map((patient, idx) => (
                       <motion.tr 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + (idx * 0.05) }}
                          key={patient.id} 
                          onClick={() => navigate(`/patients/${patient.id}`)}
                          className="hover:bg-muted/30 transition-colors group cursor-pointer"
                       >
                          <td className="py-4 px-6">
                             <div className="flex items-center gap-3">
                               <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                                 {patient.firstName[0]}{patient.lastName[0]}
                               </div>
                               <div>
                                 <div className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                                   {patient.lastName}, {patient.firstName}
                                 </div>
                                 <div className="text-xs text-muted-foreground mt-0.5">{patient.email}</div>
                               </div>
                             </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                              patient.status === 'Active' ? 'bg-primary/5 text-primary border-primary/20' :
                              patient.status === 'Pending' ? 'bg-amber-500/5 text-amber-600 border-amber-500/20' :
                              'bg-muted text-muted-foreground border-border'
                            }`}>
                              {patient.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-muted-foreground font-mono">
                             {patient.externalId}
                          </td>
                          <td className="py-4 px-6">
                             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(patient.createdAt).toLocaleDateString()}
                             </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                             <button className="w-8 h-8 rounded-md flex items-center justify-center ml-auto text-muted-foreground hover:text-foreground hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
                               <MoreVertical className="w-4 h-4" />
                             </button>
                          </td>
                       </motion.tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-16 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Activity className="w-10 h-10 mb-4 opacity-20" />
                            <p className="text-sm font-medium text-foreground">No patients found</p>
                            <p className="text-xs mt-1">Try adjusting your search criteria or add a new patient.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                 </tbody>
              </table>
           </div>
           
           <div className="p-4 border-t border-border bg-muted/10 flex items-center justify-between shrink-0">
             <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-medium rounded-lg shadow-sm hover:shadow transition-all text-sm"
              >
               <Plus className="w-4 h-4" />
               Add Patient
             </button>
             
             <div className="text-xs text-muted-foreground font-medium">
               Showing {filtered.length} of {patients.length} records
             </div>
           </div>
        </div>
      </motion.div>

      {/* Add Patient Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl bg-card border border-border shadow-lg rounded-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 border-b border-border bg-muted/30">
                <h2 className="text-xl font-bold text-foreground overflow-hidden">Register New Patient</h2>
                <p className="text-sm text-muted-foreground mt-1">Enter demographic and contact information.</p>
              </div>

              <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                <form id="patient-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-1 flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        Patient's Personal Information
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4">For better facial/dental analysis include accurate biometrics.</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1 space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">Title</label>
                        <select {...register("title")} className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none">
                          <option value="Mr.">Mr.</option>
                          <option value="Ms.">Ms.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Dr.">Dr.</option>
                        </select>
                      </div>
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">First Name</label>
                        <input {...register("firstName")} className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
                        {errors.firstName && <span className="text-[10px] text-destructive">{errors.firstName.message}</span>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground">Last Name</label>
                      <input {...register("lastName")} className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
                      {errors.lastName && <span className="text-[10px] text-destructive">{errors.lastName.message}</span>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground">Date of Birth</label>
                      <input type="date" {...register("birthday")} className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
                      {errors.birthday && <span className="text-[10px] text-destructive">{errors.birthday.message}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">Gender</label>
                        <select {...register("gender")} className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none">
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">Ethnicity</label>
                        <select {...register("ethnicity")} className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none">
                          <option value="Caucasian">Caucasian</option>
                          <option value="Hispanic">Hispanic</option>
                          <option value="African">African</option>
                          <option value="Asian">Asian</option>
                          <option value="Pacific Islander">Pacific Islander</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-1 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Contact
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4">Required for automated shipment generation.</p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                      <input type="email" {...register("email")} className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
                      {errors.email && <span className="text-[10px] text-destructive">{errors.email.message}</span>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground">Phone Number</label>
                      <input type="tel" {...register("phone")} className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
                      {errors.phone && <span className="text-[10px] text-destructive">{errors.phone.message}</span>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground">Street Address</label>
                      <input {...register("address")} className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
                      {errors.address && <span className="text-[10px] text-destructive">{errors.address.message}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">City</label>
                        <input {...register("city")} className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
                        {errors.city && <span className="text-[10px] text-destructive">{errors.city.message}</span>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">State/Province</label>
                        <input {...register("state")} className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
                        {errors.state && <span className="text-[10px] text-destructive">{errors.state.message}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">Postal Code</label>
                        <input {...register("postalCode")} className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
                        {errors.postalCode && <span className="text-[10px] text-destructive">{errors.postalCode.message}</span>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">Country</label>
                        <select {...register("country")} className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none">
                          <option value="USA">United States</option>
                          <option value="CAN">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AUS">Australia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-border bg-muted/30 flex justify-end gap-3 mt-auto">
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg border border-border bg-background hover:bg-muted text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  form="patient-form"
                  disabled={!isValid || isLoading}
                  className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
                >
                  {isLoading && <Activity className="w-4 h-4 animate-spin" />}
                  Create
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
