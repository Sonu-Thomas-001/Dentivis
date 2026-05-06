import { useState } from "react";
import { User, Search, Filter, MoreVertical, MapPin, Phone, Mail, Activity, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const mockPatients = [
  { id: "P-1049", name: "Sarah Jenkins", age: 31, location: "New York, NY", status: "Active Treatment", lastVisit: "2 days ago", phone: "+1 (555) 019-2831", email: "sarah.j@example.com", risk: "Low" },
  { id: "P-1048", name: "Michael Chen", age: 45, location: "San Francisco, CA", status: "Retention", lastVisit: "1 week ago", phone: "+1 (555) 231-0941", email: "m.chen@example.com", risk: "Low" },
  { id: "P-1047", name: "Emily Rodriguez", age: 24, location: "Miami, FL", status: "Observation", lastVisit: "3 weeks ago", phone: "+1 (555) 902-3814", email: "emi.rod@example.com", risk: "Medium" },
  { id: "P-1046", name: "David Kim", age: 38, location: "Seattle, WA", status: "Active Treatment", lastVisit: "1 month ago", phone: "+1 (555) 482-1084", email: "david.k22@example.com", risk: "Low" },
  { id: "P-1045", name: "Alice Walton", age: 52, location: "Chicago, IL", status: "Pre-Treatment", lastVisit: "2 Hrs ago", phone: "+1 (555) 751-2099", email: "awalton@example.com", risk: "High" },
];

export function Patients() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockPatients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12 font-sans max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[10px] font-semibold tracking-widest text-secondary mb-2 uppercase">Directory</div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Patients</h1>
          <p className="text-muted-foreground mt-2 text-sm">Manage your patient demographic and clinical records.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or ID..." 
              className="w-full bg-card border border-border rounded-full pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
            />
          </div>
          <button className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0 shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}>
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden relative">
           <div className="p-0 z-10 relative">
             <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse min-w-[900px]">
                   <thead>
                      <tr className="border-b border-border text-xs font-medium text-muted-foreground uppercase bg-muted/50">
                         <th className="py-4 px-6">Patient Profile</th>
                         <th className="py-4 px-6">Contact Info</th>
                         <th className="py-4 px-6">Clinical Status</th>
                         <th className="py-4 px-6">Last Visit</th>
                         <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {filtered.map((patient, idx) => (
                         <motion.tr 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + (idx * 0.05) }}
                            key={patient.id} 
                            className="border-b border-border hover:bg-muted/50 transition-colors relative group cursor-pointer"
                         >
                            <td className="py-4 px-6">
                               <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex flex-col items-center justify-center shrink-0">
                                   <User className="w-4 h-4 text-primary" />
                                 </div>
                                 <div>
                                   <div className="font-semibold text-foreground text-sm mb-0.5 group-hover:text-primary transition-colors">{patient.name}</div>
                                   <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                     <span>{patient.id}</span>
                                     <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                                     <span>Age {patient.age}</span>
                                   </div>
                                 </div>
                               </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Mail className="w-3.5 h-3.5 group-hover:text-secondary transition-colors" />
                                  <span>{patient.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Phone className="w-3.5 h-3.5 group-hover:text-secondary transition-colors" />
                                  <span>{patient.phone}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                               <div className="flex flex-col gap-1.5 items-start">
                                 <div className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide border ${
                                   patient.status === 'Active Treatment' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                                   patient.status === 'Retention' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' :
                                   patient.status === 'Pre-Treatment' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                   'bg-primary/10 text-primary border-primary/20'
                                 }`}>
                                    {patient.status}
                                 </div>
                                 <div className="flex items-center gap-1.5 text-xs">
                                   <span className="text-muted-foreground">Risk:</span>
                                   <span className={`font-medium ${
                                     patient.risk === 'Low' ? 'text-green-500' :
                                     patient.risk === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                                   }`}>{patient.risk}</span>
                                 </div>
                               </div>
                            </td>
                            <td className="py-4 px-6">
                               <div className="flex items-center gap-2 text-sm text-foreground">
                                  <Activity className="w-4 h-4 text-secondary" />
                                  {patient.lastVisit}
                               </div>
                               <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                 <MapPin className="w-3.5 h-3.5" />
                                 {patient.location}
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
                          <td colSpan={5} className="py-12 text-center text-muted-foreground text-sm">
                            No records found matching query.
                          </td>
                        </tr>
                      )}
                   </tbody>
                </table>
             </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}