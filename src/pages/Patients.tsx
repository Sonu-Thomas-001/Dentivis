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
    <div className="space-y-8 pb-12 font-sans text-white max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[10px] font-mono tracking-widest text-[#14B8A6] mb-2 drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]">GLOBAL_DIRECTORY_ACCESS</div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94A3B8] tracking-tight">Patient Registry</h1>
          <p className="text-[#94A3B8] mt-2 text-sm font-light">Cross-indexed demographic and clinical records.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or ident..." 
              className="w-full bg-[#020617]/50 border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-sm text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all backdrop-blur-md"
            />
          </div>
          <button className="w-10 h-10 rounded-full border border-white/10 bg-[#0F172A]/50 text-white flex items-center justify-center hover:bg-white/10 transition-colors shrink-0 backdrop-blur-md relative group">
            <Filter className="w-4 h-4 text-[#94A3B8] group-hover:text-white transition-colors" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#2563EB]"></span>
          </button>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}>
        <div className="rounded-[2rem] border border-white/5 bg-[#0F172A]/60 backdrop-blur-3xl shadow-2xl overflow-hidden relative">
           <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
           
           <div className="p-0 z-10 relative">
             <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse min-w-[900px]">
                   <thead>
                      <tr className="border-b border-white/5 text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase bg-[#020617]/30">
                         <th className="py-5 px-8 font-normal">Ident / Profile</th>
                         <th className="py-5 px-8 font-normal">Contact Vectors</th>
                         <th className="py-5 px-8 font-normal">Clinical Status</th>
                         <th className="py-5 px-8 font-normal">Last Telemetry</th>
                         <th className="py-5 px-8 font-normal text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {filtered.map((patient, idx) => (
                         <motion.tr 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + (idx * 0.05) }}
                            key={patient.id} 
                            className="border-b border-white/5 hover:bg-white/[0.03] transition-colors relative group/row cursor-pointer"
                         >
                            <td className="py-5 px-8">
                               <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB]/20 to-[#14B8A6]/10 border border-white/10 flex flex-col items-center justify-center shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.1)]">
                                   <User className="w-4 h-4 text-white/80" />
                                 </div>
                                 <div>
                                   <div className="font-bold text-white text-base mb-0.5 tracking-tight group-hover/row:text-[#2563EB] transition-colors">{patient.name}</div>
                                   <div className="flex items-center gap-2 text-[10px] font-mono text-[#94A3B8]">
                                     <span>{patient.id}</span>
                                     <span className="w-1 h-1 rounded-full bg-[#94A3B8]/30"></span>
                                     <span>AGE {patient.age}</span>
                                   </div>
                                 </div>
                               </div>
                            </td>
                            <td className="py-5 px-8">
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                                  <Mail className="w-3 h-3 text-white/40 group-hover/row:text-[#14B8A6] transition-colors" />
                                  <span>{patient.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                                  <Phone className="w-3 h-3 text-white/40 group-hover/row:text-[#14B8A6] transition-colors" />
                                  <span>{patient.phone}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-5 px-8">
                               <div className="flex flex-col gap-2 items-start">
                                 <div className={`inline-flex px-2.5 py-1 rounded-full text-[9px] uppercase font-bold tracking-widest border ${
                                   patient.status === 'Active Treatment' ? 'bg-[#14B8A6]/10 text-[#14B8A6] border-[#14B8A6]/20' :
                                   patient.status === 'Retention' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                   patient.status === 'Pre-Treatment' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                   'bg-[#2563EB]/10 text-[#3B82F6] border-[#2563EB]/20'
                                 }`}>
                                    {patient.status}
                                 </div>
                                 <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest">
                                   <span className="text-[#94A3B8]">Risk:</span>
                                   <span className={
                                     patient.risk === 'Low' ? 'text-green-400' :
                                     patient.risk === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                                   }>{patient.risk}</span>
                                 </div>
                               </div>
                            </td>
                            <td className="py-5 px-8">
                               <div className="flex items-center gap-2 text-xs text-white/70">
                                  <Activity className="w-3.5 h-3.5 text-[#14B8A6]" />
                                  {patient.lastVisit}
                               </div>
                               <div className="flex items-center gap-2 text-[10px] text-[#94A3B8] mt-1.5">
                                 <MapPin className="w-3 h-3" />
                                 {patient.location}
                               </div>
                            </td>
                            <td className="py-5 px-8 text-right">
                               <button className="w-8 h-8 rounded-full flex items-center justify-center ml-auto text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover/row:opacity-100 border border-transparent hover:border-white/10">
                                 <MoreVertical className="w-4 h-4" />
                               </button>
                            </td>
                         </motion.tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-[#94A3B8] font-light">
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