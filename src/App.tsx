import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import { DashboardLayout } from "./components/DashboardLayout";
import { SiteLayout } from "./components/SiteLayout";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
import { CustomCursor } from "./components/ui/CustomCursor";

// Lazy load pages for final optimization
const Landing = React.lazy(() => import("./pages/Landing").then(m => ({ default: m.Landing })));
const Dashboard = React.lazy(() => import("./pages/Dashboard").then(m => ({ default: m.Dashboard })));
const Cases = React.lazy(() => import("./pages/Cases").then(m => ({ default: m.Cases })));
const Patients = React.lazy(() => import("./pages/Patients").then(m => ({ default: m.Patients })));
const PatientDetails = React.lazy(() => import("./pages/PatientDetails").then(m => ({ default: m.PatientDetails })));
const Viewer3D = React.lazy(() => import("./pages/Viewer3D").then(m => ({ default: m.Viewer3D })));
const AIInsights = React.lazy(() => import("./pages/AIInsights").then(m => ({ default: m.AIInsights })));
const Settings = React.lazy(() => import("./pages/Settings").then(m => ({ default: m.Settings })));
const Login = React.lazy(() => import("./pages/Login").then(m => ({ default: m.Login })));
const Signup = React.lazy(() => import("./pages/Signup").then(m => ({ default: m.Signup })));
const About = React.lazy(() => import("./pages/About").then(m => ({ default: m.About })));
const Platform = React.lazy(() => import("./pages/Platform").then(m => ({ default: m.Platform })));
const FeaturesPage = React.lazy(() => import("./pages/FeaturesPage").then(m => ({ default: m.FeaturesPage })));
const Pricing = React.lazy(() => import("./pages/Pricing").then(m => ({ default: m.Pricing })));
const Contact = React.lazy(() => import("./pages/Contact").then(m => ({ default: m.Contact })));
const Blog = React.lazy(() => import("./pages/Blog").then(m => ({ default: m.Blog })));
const Onboarding = React.lazy(() => import("./pages/Onboarding").then(m => ({ default: m.Onboarding })));

// A simple suspense loader
const PageLoader = () => (
  <div className="w-full min-h-screen bg-[#020617] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-[#14B8A6] border-t-transparent animate-spin"></div>
  </div>
);

// Page wrapper for Route transitions
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

import { SmoothScroll } from "./components/animations/SmoothScroll";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/platform" element={<PageWrapper><Platform /></PageWrapper>} />
            <Route path="/features" element={<PageWrapper><FeaturesPage /></PageWrapper>} />
            <Route path="/pricing" element={<PageWrapper><Pricing /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
          </Route>
          
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/onboarding" element={<PageWrapper><Onboarding /></PageWrapper>} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
              <Route path="/cases" element={<PageWrapper><Cases /></PageWrapper>} />
              <Route path="/patients" element={<PageWrapper><Patients /></PageWrapper>} />
              <Route path="/patients/:id" element={<PageWrapper><PatientDetails /></PageWrapper>} />
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
      <CustomCursor />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

