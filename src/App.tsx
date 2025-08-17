import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet
} from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { ThemeProvider } from "./pages/components/ThemeProvider";
import HealthImportance from "./pages/HealthImportance";
import Footer from "./pages/components/layouts/Footer";
import Navigation from "./pages/components/layouts/Navigation";
import FitnessTips from "./pages/FitnessTips";
import DietTips from "./pages/DietTips";
import WorkOutNow from "./pages/WorkoutNow";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import ThankYou from "./pages/auth/ThankYou";
import NotFound from "./pages/NotFound";
import FeatureHighlight from "./pages/components/FeatureHighlight";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import RedirectIfAuthenticated from "./pages/auth/RedirectIfAuthenticated";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsAndService";
import News from "./pages/HealthNews";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { SidebarProvider } from './pages/components/SidebarProvider';
import { Toaster } from 'react-hot-toast';
import QuickActionsFAB from './pages/components/QuickActionsFAB';
import LoadingSpinner from './pages/components/ui/LoadingSpinner';

// Lazy load heavy components
const Dashboard = lazy(() => import('./pages/protected/Dashboard'));
const Workouts = lazy(() => import('./pages/protected/Workouts'));
const ProtectedLayout = lazy(() => import('./pages/protected/layouts/ProtectedLayout'));
const ExerciseDetails = lazy(() => import('./pages/protected/ExerciseDetails/page'));
const Profile = lazy(() => import('./pages/protected/Profile'));
const Settings = lazy(() => import("./pages/protected/Settings"));
const History = lazy(() => import("./pages/protected/History"));

// Component to manage the dynamic page title
function DynamicTitle() {
  const location = useLocation();

  useEffect(() => {
    const pageTitles = {
      "/": "Home - Fitness Tracker",
      "/about": "About - Fitness Tracker",
      "login": "Login - Fitness Tracker",
      "/sign-up": "Sign up - Fitness Tracker",
      "/thank-you": "Registration Success - Fitness Tracker",
      "/health-importance": "Health Importance - Fitness Tracker",
      "/fitness-tips": "Fitness Tips - Fitness Tracker",
      "/diet-tips": "Diet Tips - Fitness Tracker",
      "/work-out-now": "Work out Now - Fitness Tracker",
      "/privacy-policy": "Privacy Policy - Fitness Tracker",
      "/terms-of-service": "Terms of Service - Fitness Tracker",
      "/news": "News - Fitness Tracker",
      "/dashboard": "Dashboard - Fitness Tracker",
      "/workouts": "Workouts - Fitness Tracker",
      "/workouts/:id": "Workout Details - Fitness Tracker",
      "/history": "Workout History - Fitness Tracker",
      "/profile": "Profile - Fitness Tracker",
      "/settings": "Settings - Fitness Tracker"
    };

    document.title =
      pageTitles[location.pathname as keyof typeof pageTitles] ||
      "Fitness Tracker";
  }, [location]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <DynamicTitle />
        <Routes>

          {/* Public Layout with redirect protection */}
          <Route
            element={
              <RedirectIfAuthenticated>
                <div className="flex flex-col min-h-screen bg-white dark:bg-dark-primary text-slate-800 dark:text-slate-200">
                  <Navigation />
                  <main className="flex-1">
                    <Outlet />
                  </main>
                  <FeatureHighlight />
                  <Footer />
                  <QuickActionsFAB />
                </div>
              </RedirectIfAuthenticated>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Registration />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/health-importance" element={<HealthImportance />} />
            <Route path="/fitness-tips" element={<FitnessTips />} />
            <Route path="/diet-tips" element={<DietTips />} />
            <Route path="/news" element={<News />} />
            <Route path="/work-out-now" element={<WorkOutNow />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Route>

          {/* Protected Layout */}
          <Route
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <Suspense fallback={<LoadingSpinner text="Loading dashboard..." />}>
                    <ProtectedLayout />
                  </Suspense>
                </SidebarProvider>
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Suspense fallback={<LoadingSpinner />}><Dashboard /></Suspense>} />
            <Route path="/workouts" element={<Suspense fallback={<LoadingSpinner />}><Workouts /></Suspense>} />
            <Route path="/workouts/:id" element={<Suspense fallback={<LoadingSpinner />}><ExerciseDetails /></Suspense>} />
            <Route path="/history" element={<Suspense fallback={<LoadingSpinner />}><History /></Suspense>} />
            <Route path="/profile" element={<Suspense fallback={<LoadingSpinner />}><Profile /></Suspense>} />
            <Route path="/settings" element={<Suspense fallback={<LoadingSpinner />}><Settings /></Suspense>} />
          </Route>

          {/* Not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Analytics />
      <SpeedInsights />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
            border: '1px solid var(--toast-border)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </ThemeProvider>
  );
}

export default App;
