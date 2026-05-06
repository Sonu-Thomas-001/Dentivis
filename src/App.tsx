import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import { DashboardLayout } from "./components/DashboardLayout";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";

// Lazy load pages for final optimization
const Dashboard = React.lazy(() => import("./pages/Dashboard").then(m => ({ default: m.Dashboard })));
const Cases = React.lazy(() => import("./pages/Cases").then(m => ({ default: m.Cases })));
const Patients = React.lazy(() => import("./pages/Patients").then(m => ({ default: m.Patients })));
const Viewer3D = React.lazy(() => import("./pages/Viewer3D").then(m => ({ default: m.Viewer3D })));
const AIInsights = React.lazy(() => import("./pages/AIInsights").then(m => ({ default: m.AIInsights })));
const Settings = React.lazy(() => import("./pages/Settings").then(m => ({ default: m.Settings })));
const Login = React.lazy(() => import("./pages/Login").then(m => ({ default: m.Login })));
const Signup = React.lazy(() => import("./pages/Signup").then(m => ({ default: m.Signup })));

// A simple suspense loader
const PageLoader = () => (
  <div className="w-full h-[60vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Page wrapper for Route transitions
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
              <Route path="/cases" element={<PageWrapper><Cases /></PageWrapper>} />
              <Route path="/patients" element={<PageWrapper><Patients /></PageWrapper>} />
              <Route path="/viewer" element={<PageWrapper><Viewer3D /></PageWrapper>} />
              <Route path="/insights" element={<PageWrapper><AIInsights /></PageWrapper>} />
              <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

