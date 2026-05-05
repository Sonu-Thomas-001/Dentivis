import { DashboardLayout } from "./components/DashboardLayout";
import { TreatmentPlanViewer } from "./components/TreatmentPlanViewer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { Button } from "./components/ui/button";
import { Play, Download, MoreVertical } from "lucide-react";

export default function App() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Patient Overview</h1>
            <p className="text-slate-500 mt-1">Review active treatment plans and 3D models.</p>
          </div>
          <Button className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-6 shadow-sm">
            + New Treatment Plan
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Case #8492: Emma Thompson</CardTitle>
                    <CardDescription className="mt-1">Invisalign Full - Phase 2 Alignment</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 uppercase tracking-wider text-[10px] font-semibold">
                    In Progress
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <TreatmentPlanViewer />
              </CardContent>
              <div className="bg-white p-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full shadow-none text-slate-600">
                    <Play className="w-3 h-3 mr-2" />
                    Simulate
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full shadow-none text-slate-600">
                    <Download className="w-3 h-3 mr-2" />
                    Export STL
                  </Button>
                </div>
                <p className="text-xs font-mono text-slate-400 tracking-wider">LAST SAVED: 2H AGO</p>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-slate-500">Recent Cases</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-100 hover:bg-transparent">
                      <TableHead className="w-[100px] text-xs font-medium text-slate-400 uppercase">Patient</TableHead>
                      <TableHead className="text-xs font-medium text-slate-400 uppercase">Status</TableHead>
                      <TableHead className="text-right text-xs font-medium text-slate-400 uppercase"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Emma T.", status: "Review", color: "bg-amber-50 text-amber-700 border-amber-200" },
                      { name: "James D.", status: "Draft", color: "bg-slate-100 text-slate-600 border-slate-200" },
                      { name: "Sophia R.", status: "Approved", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                      { name: "Liam O.", status: "Printing", color: "bg-purple-50 text-purple-700 border-purple-200" },
                    ].map((caseItem, i) => (
                      <TableRow key={i} className="border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                        <TableCell className="font-medium text-slate-900 text-sm py-3">
                          {caseItem.name}
                        </TableCell>
                        <TableCell className="py-3">
                          <Badge variant="outline" className={`uppercase tracking-wider text-[10px] font-semibold ${caseItem.color}`}>
                            {caseItem.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right py-3">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-sky-500 to-blue-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-lg font-medium">AI Analysis Available</CardTitle>
                <CardDescription className="text-sky-100 mt-2">
                  Dentivis AI has processed the latest cephalometric X-rays for Emma Thompson. Review the automated land-marking and suggested arch adjustments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-white text-blue-600 hover:bg-sky-50 rounded-full font-medium shadow-sm">
                  View Full Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

