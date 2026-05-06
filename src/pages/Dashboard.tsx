import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { MoreVertical, Folder, Activity, Clock, CheckCircle, Upload, Plus, HeartPulse, Stethoscope, Beaker, FileBox, Hexagon } from "lucide-react";
import { motion } from "motion/react";

const overviewData = [
  { title: "Total Cases", value: "1,248", change: "+12% from last month", icon: Folder, color: "text-primary", bg: "bg-primary/10" },
  { title: "Active Treatments", value: "342", change: "+4% from last month", icon: Activity, color: "text-secondary", bg: "bg-secondary/10" },
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
  { id: 2, title: "Lab Response Received", description: "Aligners for Case #4918 shipped.", time: "2 hrs ago", icon: Beaker, color: "text-primary", bg: "bg-primary/10" },
  { id: 3, title: "New Scan Uploaded", description: "Dr. Smith uploaded scan for Sarah Jenkins.", time: "4 hrs ago", icon: FileBox, color: "text-secondary", bg: "bg-secondary/10" },
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } } 
};

export function Dashboard() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-12 font-sans text-foreground max-w-7xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
        <motion.div variants={itemVariants}>
          <div className="text-[10px] font-semibold tracking-widest text-secondary mb-2 uppercase">Dashboard</div>
          <h1 className="text-4xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground mt-1 text-sm">Real-time metrics and patient overview.</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex gap-4">
          <button className="px-5 py-2 rounded-lg border border-border bg-card text-foreground font-medium hover:bg-accent transition-colors flex items-center gap-2 text-sm shadow-sm">
            <Upload className="w-4 h-4 text-muted-foreground" />
            Upload Scan
          </button>
          <Dialog>
            <DialogTrigger className="px-5 py-2 bg-primary text-primary-foreground rounded-lg font-medium transition-all hover:bg-primary/90 shadow-sm flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              <span>New Scan</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Create New Case</DialogTitle>
                <DialogDescription className="text-sm mt-2">
                  Establish a new patient case. AI analysis will begin after upload.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-5 py-4">
                <div className="grid gap-2">
                  <label htmlFor="patient" className="text-sm font-medium">
                    Patient Name
                  </label>
                  <Input id="patient" placeholder="e.g. John Doe" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="type" className="text-sm font-medium">
                    Treatment Protocol
                  </label>
                  <Input id="type" placeholder="e.g. Aligner Simulation" />
                </div>
              </div>
              <DialogFooter>
                <button type="submit" className="w-full rounded-lg py-2.5 bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90">
                  Create Case
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewData.map((data, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-xl border border-border bg-card shadow-sm p-5 relative overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                 <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${data.bg} border-transparent`}>
                   <data.icon className={`w-5 h-5 ${data.color}`} />
                 </div>
                 <div className="flex-1 text-right">
                    <p className="text-xs font-medium text-muted-foreground mb-1">{data.title}</p>
                    <p className="text-[10px] font-semibold text-secondary">{data.change.split(' ')[0]}</p>
                 </div>
              </div>
              
              <div className="text-3xl font-bold tracking-tight">
                {data.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Hexagon className="w-5 h-5 text-primary" />
                Recent Cases
              </h2>
              <button className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 bg-muted rounded-md tracking-wide">
                View All
              </button>
            </div>
            
            <div className="p-0 overflow-x-auto no-scrollbar flex-1">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-border text-xs font-medium text-muted-foreground bg-muted/50">
                    <th className="py-3 px-5">Patient Name</th>
                    <th className="py-3 px-5">Treatment</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5">Last Updated</th>
                    <th className="py-3 px-5 text-right flex-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCases.map((caseItem, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors group">
                      <td className="py-3 px-5">
                        <div className="font-semibold text-sm mb-0.5">{caseItem.patient}</div>
                        <div className="text-xs text-muted-foreground">{caseItem.id}</div>
                      </td>
                      <td className="py-3 px-5 text-sm">{caseItem.type}</td>
                      <td className="py-3 px-5">
                        <div className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border ${
                          caseItem.status === "Active" ? "bg-secondary/10 text-secondary border-secondary/20" :
                          caseItem.status === "Pending" ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                          "bg-primary/10 text-primary border-primary/20"
                        }`}>
                          {caseItem.status}
                        </div>
                      </td>
                      <td className="py-3 px-5 text-xs text-muted-foreground">
                        {caseItem.lastUpdated}
                      </td>
                      <td className="py-3 px-5 text-right">
                        <button className="w-8 h-8 rounded-md flex items-center justify-center ml-auto text-muted-foreground hover:text-foreground hover:bg-accent transition-colors opacity-0 group-hover:opacity-100">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="h-full">
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Activity Feed
              </h2>
            </div>
            
            <div className="p-5 flex-1 overflow-y-auto no-scrollbar">
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-4 relative">
                    {i !== timeline.length - 1 && (
                      <div className="absolute top-[30px] left-[17px] w-px h-[calc(100%-10px)] bg-border"></div>
                    )}
                    <div className="relative flex flex-col items-center">
                      <div className={`z-10 w-9 h-9 shrink-0 rounded-full flex items-center justify-center ${item.bg} border-transparent`}>
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                    </div>
                    <div className="pt-1 pb-2 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
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

