import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet
} from "react-router-dom";
import { useEffect } from "react";
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
import Dashboard from "./pages/protected/Dashboard";

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
            <Route path="/work-out-now" element={<WorkOutNow />} />
          </Route>

          {/* Protected Layout */}
          <Route
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-slate-50 dark:bg-dark-primary text-slate-900 dark:text-slate-200">
                  <Outlet />
                </div>
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add more protected routes here */}
          </Route>

          {/* Not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}



export default App;
