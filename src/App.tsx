import { DashboardLayout } from "./components/DashboardLayout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Cases } from "./pages/Cases";
import { Patients } from "./pages/Patients";
import { Viewer3D } from "./pages/Viewer3D";
import { AIInsights } from "./pages/AIInsights";
import { Settings } from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/viewer" element={<Viewer3D />} />
          <Route path="/insights" element={<AIInsights />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

