import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "../components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { MoreVertical, Folder, Activity, Clock, CheckCircle, Upload, Plus, HeartPulse, Stethoscope, Beaker, FileBox, Hexagon } from "lucide-react";
import { motion } from "motion/react";

const overviewData = [
  { title: "Total Cases", value: "1,248", change: "+12% from last month", icon: Folder, color: "text-[#2563EB]", bg: "bg-[#2563EB]/10" },
  { title: "Active Treatments", value: "342", change: "+4% from last month", icon: Activity, color: "text-[#14B8A6]", bg: "bg-[#14B8A6]/10" },
  { title: "Pending Approvals", value: "24", change: "-2% from last month", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
  { title: "Completed Cases", value: "882", change: "+18% from last month", icon: CheckCircle, color: "text-purple-500", bg: "bg-purple-500/10" },
];

const recentCases = [
  { id: "CASE-4921", patient: "Sarah Jenkins", type: "Invisalign Full", status: "Active", lastUpdated: "2 hrs ago" },
  { id: "CASE-4920", patient: "Michael Chen", type: "Retainers", status: "Pending", lastUpdated: "5 hrs ago" },
  { id: "CASE-4919", patient: "Emily Rodriguez", type: "Ceramic Braces", status: "Completed", lastUpdated: "1 day ago" },
  { id: "CASE-4918", patient: "David Kim", type: "Invisalign Lite", status: "Active", lastUpdated: "1 day ago" },
  { id: "CASE-4917", patient: "Alice Walton", type: "Phase 1", status: "Pending", lastUpdated: "2 days ago" },
];

const timeline = [
  { id: 1, title: "AI Analysis Complete", description: "Case #4920 scan processed successfully.", time: "10 mins ago", icon: HeartPulse, color: "text-pink-500", bg: "bg-pink-500/10" },
  { id: 2, title: "Lab Response Received", description: "Aligners for Case #4918 shipped.", time: "2 hrs ago", icon: Beaker, color: "text-[#2563EB]", bg: "bg-[#2563EB]/10" },
  { id: 3, title: "New Scan Uploaded", description: "Dr. Smith uploaded scan for Sarah Jenkins.", time: "4 hrs ago", icon: FileBox, color: "text-[#14B8A6]", bg: "bg-[#14B8A6]/10" },
  { id: 4, title: "Treatment Plan Approved", description: "Patient confirmed the timeline.", time: "1 day ago", icon: Stethoscope, color: "text-indigo-500", bg: "bg-indigo-500/10" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } } // customized easing
};

export function Dashboard() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-12 font-sans text-white max-w-7xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
        <motion.div variants={itemVariants}>
          <div className="text-[10px] font-mono tracking-widest text-[#14B8A6] mb-2 drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]">CLINIC_OS_DASHBOARD</div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94A3B8] tracking-tight">Overview</h1>
          <p className="text-[#94A3B8] mt-2 text-sm font-light">Real-time metrics and operational intelligence.</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex gap-4">
          <button className="px-6 py-2.5 rounded-full border border-white/10 bg-[#0F172A]/50 text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2 text-sm backdrop-blur-md">
            <Upload className="w-4 h-4 text-[#94A3B8]" />
            Upload Volume
          </button>
          <Dialog>
            <DialogTrigger className="group relative px-6 py-2.5 bg-[#2563EB] text-white rounded-full font-semibold overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center gap-2 text-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-[#14B8A6]/0 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 w-[200%] -translate-x-full group-hover:translate-x-0 ease-linear"></div>
              <Plus className="w-4 h-4" />
              <span className="relative z-10 tracking-wide">New Scan</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-[2rem] bg-[#0F172A]/90 border border-white/10 backdrop-blur-3xl text-white">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Initialize Neural Frame</DialogTitle>
                <DialogDescription className="text-[#94A3B8] text-sm font-light mt-2">
                  Establish a new diagnostic container. AI pipeline will engage automatically post upload.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-3">
                  <label htmlFor="patient" className="text-xs font-mono tracking-widest text-[#94A3B8] uppercase">
                    Entity Name
                  </label>
                  <Input id="patient" placeholder="e.g. John Doe" className="bg-[#020617] border-white/10 rounded-xl focus-visible:ring-[#2563EB] text-white" />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="type" className="text-xs font-mono tracking-widest text-[#94A3B8] uppercase">
                    Protocol Tag
                  </label>
                  <Input id="type" placeholder="e.g. Aligner Simulation" className="bg-[#020617] border-white/10 rounded-xl focus-visible:ring-[#2563EB] text-white" />
                </div>
              </div>
              <DialogFooter>
                <button type="submit" className="w-full rounded-full py-3 bg-white text-black font-bold tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all">
                  Generate Instance
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewData.map((data, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-[2rem] border border-white/5 bg-[#0F172A]/60 backdrop-blur-3xl shadow-xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="flex justify-between items-start mb-6">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${data.bg} border border-current opacity-80 backdrop-blur-md`}>
                   <data.icon className={`w-5 h-5 ${data.color}`} />
                 </div>
                 <div className="flex-1 text-right">
                    <p className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase opacity-70 mb-1">{data.title}</p>
                    <p className="text-[9px] font-mono tracking-wider text-[#14B8A6]">{data.change.split(' ')[0]}</p>
                 </div>
              </div>
              
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94A3B8] flex items-baseline gap-1 tracking-tighter">
                {data.value}
                <span className="text-[10px] tracking-widest text-[#94A3B8] font-mono">UNITS</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="rounded-[2rem] border border-white/5 bg-[#0F172A]/80 backdrop-blur-3xl shadow-2xl overflow-hidden relative group h-full">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0"></div>
            
            <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between z-10 relative">
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
                <Hexagon className="w-5 h-5 text-[#2563EB]" />
                Recent Deployments
              </h2>
              <button className="text-[10px] font-bold text-[#94A3B8] hover:text-white uppercase tracking-widest transition-colors px-4 py-2 bg-white/5 rounded-full">
                View All
              </button>
            </div>
            
            <div className="p-0 z-10 relative">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase">
                      <th className="py-5 px-6 font-normal">Ident</th>
                      <th className="py-5 px-6 font-normal">Protocol</th>
                      <th className="py-5 px-6 font-normal">Vector Stage</th>
                      <th className="py-5 px-6 font-normal">Sync Time</th>
                      <th className="py-5 px-6 font-normal text-right">Opt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCases.map((caseItem, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors relative group/row">
                        <td className="py-5 px-6">
                          <div className="font-bold text-white text-sm mb-1">{caseItem.patient}</div>
                          <div className="text-[10px] font-mono text-[#94A3B8]">{caseItem.id}</div>
                        </td>
                        <td className="py-5 px-6 text-sm text-[#94A3B8]">{caseItem.type}</td>
                        <td className="py-5 px-6">
                          <div className={`inline-flex px-2.5 py-1 rounded-full text-[9px] uppercase font-bold tracking-widest border ${
                            caseItem.status === "Active" ? "bg-[#14B8A6]/10 text-[#14B8A6] border-[#14B8A6]/20 shadow-[0_0_10px_rgba(20,184,166,0.1)]" :
                            caseItem.status === "Pending" ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                            "bg-[#2563EB]/10 text-[#3B82F6] border-[#2563EB]/20"
                          }`}>
                            {caseItem.status}
                          </div>
                        </td>
                        <td className="py-5 px-6 text-[10px] font-mono text-[#94A3B8] uppercase">
                          {caseItem.lastUpdated}
                        </td>
                        <td className="py-5 px-6 text-right">
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

        <motion.div variants={itemVariants} className="h-full">
          <div className="rounded-[2rem] border border-white/5 bg-[#0F172A]/80 backdrop-blur-3xl shadow-2xl overflow-hidden relative group h-full flex flex-col">
            <div className="p-6 border-b border-white/5 bg-gradient-to-br from-[#2563EB]/10 to-transparent flex-shrink-0 z-10 relative">
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
                <Activity className="w-5 h-5 text-[#2563EB]" />
                Neural Feed
              </h2>
              <p className="text-[10px] font-mono tracking-widest text-[#94A3B8] mt-2 uppercase opacity-80">Live Event Stream</p>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto no-scrollbar z-10 relative bg-[#020617]/20">
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-5 relative">
                    {i !== timeline.length - 1 && (
                      <div className="absolute top-[30px] left-[18px] w-px h-[calc(100%+8px)] bg-gradient-to-b from-white/10 to-transparent"></div>
                    )}
                    <div className="relative flex flex-col items-center">
                      <div className={`z-10 w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${item.bg} border border-current shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-md`}>
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                    </div>
                    <div className="pt-0.5 pb-2 flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-white">{item.title}</span>
                        <span className="text-[9px] text-[#94A3B8] font-mono tracking-widest uppercase">{item.time}</span>
                      </div>
                      <p className="text-sm text-[#94A3B8] leading-relaxed font-light">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

