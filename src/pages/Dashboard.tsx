import { TreatmentPlanViewer } from "../components/TreatmentPlanViewer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Play, Download, MoreVertical, Sparkles, ChevronRight, UserPlus } from "lucide-react";

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-foreground">Treatment Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">Review active treatment plans, 3D simulations, and AI insights.</p>
        </div>
        <Dialog>
          <DialogTrigger render={<Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 shadow-md shadow-primary/20 transition-all active:scale-95" />}>
            + New Treatment Plan
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-3xl">
            <DialogHeader>
              <DialogTitle className="font-heading">Create Treatment Plan</DialogTitle>
              <DialogDescription>
                Start a new case. AI initial analysis will run automatically upon scan upload.
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
                <UserPlus className="w-4 h-4 mr-2" /> Initialize Case
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="bg-muted/50 p-1 rounded-2xl mb-6">
          <TabsTrigger value="active" className="rounded-xl px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground">Active Plans</TabsTrigger>
          <TabsTrigger value="drafts" className="rounded-xl px-6">Drafts</TabsTrigger>
          <TabsTrigger value="archived" className="rounded-xl px-6">Archived</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="focus-visible:outline-none">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <Card className="border-border shadow-sm shadow-black/5 overflow-hidden rounded-2xl">
                <CardHeader className="bg-card border-b border-border pb-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl font-heading text-foreground">Case #8492: Emma Thompson</CardTitle>
                        <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20 uppercase tracking-wider text-[10px] font-bold rounded-full px-2.5 py-0.5">
                          AI Analyzed
                        </Badge>
                      </div>
                      <CardDescription className="mt-1.5 text-sm text-muted-foreground">Invisalign Full - Phase 2 Alignment</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 uppercase tracking-wider text-[10px] font-bold">
                      In Progress
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <TreatmentPlanViewer />
                </CardContent>
                <div className="bg-card p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-xl border-border hover:bg-muted text-foreground transition-all">
                      <Play className="w-4 h-4 mr-2 text-primary" />
                      Simulate Timeline
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-xl border-border hover:bg-muted text-foreground transition-all">
                      <Download className="w-4 h-4 mr-2" />
                      Export STL
                    </Button>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground tracking-wider bg-muted/50 px-3 py-1 rounded-md">LAST SAVED: 2H AGO</p>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-border shadow-sm shadow-black/5 rounded-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50 z-0"></div>
                <CardHeader className="relative z-10 pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg font-heading text-foreground">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Analysis Ready
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-2 leading-relaxed">
                    Dentivis Core has processed the latest cephalometric X-rays for Emma Thompson. Automated land-marking is complete.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 pt-2 pb-0">
                  <div className="space-y-3 mt-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Arch Width Adj.</span>
                      <span className="font-mono text-foreground font-medium">+1.2mm</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Est. Duration</span>
                      <span className="font-mono text-foreground font-medium">14 Months</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="relative z-10 pt-6">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm transition-all group-hover:shadow-md">
                    Review Insights <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-border shadow-sm shadow-black/5 rounded-2xl">
                <CardHeader className="pb-3 border-b border-border/50">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                    Recent Cases
                    <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-foreground normal-case">View All</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 py-0">
                  <Table>
                    <TableBody>
                      {[
                        { name: "James D.", status: "Draft", color: "bg-muted text-muted-foreground border-transparent" },
                        { name: "Sophia R.", status: "Approved", color: "bg-secondary/10 text-secondary border-secondary/20" },
                        { name: "Liam O.", status: "Printing", color: "bg-accent/10 text-accent border-accent/20" },
                      ].map((caseItem, i) => (
                        <TableRow key={i} className="border-border/50 cursor-pointer hover:bg-muted/50 transition-colors">
                          <TableCell className="font-medium text-foreground text-sm py-3.5 pl-6">
                            {caseItem.name}
                          </TableCell>
                          <TableCell className="py-3.5">
                            <Badge variant="outline" className={`uppercase tracking-wider text-[10px] font-bold rounded-full ${caseItem.color}`}>
                              {caseItem.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right py-3.5 pr-4">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="drafts">
          <div className="h-64 flex items-center justify-center text-muted-foreground border border-dashed border-border rounded-2xl bg-card">
            No draft plans available.
          </div>
        </TabsContent>
        <TabsContent value="archived">
          <div className="h-64 flex items-center justify-center text-muted-foreground border border-dashed border-border rounded-2xl bg-card">
            No archived plans.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
