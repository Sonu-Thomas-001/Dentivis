import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { MoreVertical, Folder, Activity, Clock, CheckCircle, Upload, Plus, HeartPulse, Stethoscope, Beaker, FileBox } from "lucide-react";
import { motion } from "motion/react";

const overviewData = [
  { title: "Total Cases", value: "1,248", change: "+12% from last month", icon: Folder, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Active Treatments", value: "342", change: "+4% from last month", icon: Activity, color: "text-green-500", bg: "bg-green-500/10" },
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
  { id: 2, title: "Lab Response Received", description: "Aligners for Case #4918 shipped.", time: "2 hrs ago", icon: Beaker, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: 3, title: "New Scan Uploaded", description: "Dr. Smith uploaded scan for Sarah Jenkins.", time: "4 hrs ago", icon: FileBox, color: "text-emerald-500", bg: "bg-emerald-500/10" },
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export function Dashboard() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 lg:space-y-8 pb-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-heading font-semibold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1 text-sm">Welcome back, Dr. Smith. Here is what's happening today.</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex gap-3">
          <Button variant="outline" className="rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95">
            <Upload className="w-4 h-4 mr-2 text-muted-foreground" />
            Upload Scan
          </Button>
          <Dialog>
            <DialogTrigger className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm shadow-primary/20 transition-all active:scale-95 inline-flex items-center justify-center gap-1.5 font-medium px-4 py-2 text-sm">
              <Plus className="w-4 h-4 mr-1" /> New Case
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
              <DialogHeader>
                <DialogTitle className="font-heading">Create New Case</DialogTitle>
                <DialogDescription>
                  Start a new patient case. AI initial analysis will run automatically upon scan upload.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="patient" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Patient Name
                  </label>
                  <Input id="patient" placeholder="e.g. John Doe" className="bg-muted rounded-xl border-transparent" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="type" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Treatment Type
                  </label>
                  <Input id="type" placeholder="e.g. Invisalign Full" className="bg-muted rounded-xl border-transparent" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full rounded-xl bg-primary text-primary-foreground font-medium shadow-md shadow-primary/20">
                  Initialize Case
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {overviewData.map((data, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="rounded-2xl border-border shadow-sm shadow-black/5 overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-4">
                  <p className="text-sm font-medium tracking-tight text-muted-foreground">{data.title}</p>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${data.bg}`}>
                    <data.icon className={`w-4 h-4 ${data.color}`} />
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-semibold text-foreground">{data.value}</div>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{data.change}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <Card className="rounded-2xl border-border shadow-sm shadow-black/5 overflow-hidden">
            <CardHeader className="bg-card border-b border-border/50 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-heading text-foreground">Recent Cases</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs rounded-full h-8 px-3 text-muted-foreground hover:text-foreground">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow className="border-border/50">
                      <TableHead className="py-3 px-6 text-xs text-muted-foreground font-semibold uppercase tracking-wider font-sans">Patient Info</TableHead>
                      <TableHead className="py-3 px-6 text-xs text-muted-foreground font-semibold uppercase tracking-wider font-sans">Status</TableHead>
                      <TableHead className="py-3 px-6 text-xs text-muted-foreground font-semibold uppercase tracking-wider font-sans">Last Updated</TableHead>
                      <TableHead className="py-3 px-6 text-right font-sans"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentCases.map((caseItem, i) => (
                      <TableRow key={i} className="border-border/50 hover:bg-muted/50 transition-colors group">
                        <TableCell className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground text-sm">{caseItem.patient}</span>
                            <span className="text-xs text-muted-foreground mt-0.5">{caseItem.id} • {caseItem.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <Badge variant="outline" className={`font-mono font-medium tracking-tight rounded-md px-2.5 py-0.5 text-xs ${
                            caseItem.status === "Active" ? "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400" :
                            caseItem.status === "Pending" ? "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400" :
                            "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400"
                          }`}>
                            {caseItem.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4 px-6 text-sm text-muted-foreground">
                          {caseItem.lastUpdated}
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
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <Card className="rounded-2xl border-border shadow-sm shadow-black/5 overflow-hidden h-full flex flex-col">
            <CardHeader className="bg-card border-b border-border/50 pb-4 shrink-0">
              <CardTitle className="text-lg font-heading text-foreground">Activity Timeline</CardTitle>
              <CardDescription className="text-sm mt-1">Latest updates on your cases.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex-1">
              <div className="space-y-0">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className={`z-10 w-9 h-9 shrink-0 rounded-full flex items-center justify-center ${item.bg} ring-4 ring-card`}>
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      {i !== timeline.length - 1 && (
                        <div className="w-px h-full bg-border -mb-2 mt-2"></div>
                      )}
                    </div>
                    <div className="pt-2 pb-6 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-foreground">{item.title}</span>
                        <span className="text-xs text-muted-foreground font-mono">{item.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-snug">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

