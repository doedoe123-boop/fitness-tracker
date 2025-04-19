import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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
import NotFound from "./pages/NotFound";
import FeatureHighlight from "./pages/components/FeatureHighlight";

// Component to manage the dynamic page title
function DynamicTitle() {
  const location = useLocation();

  useEffect(() => {
    const pageTitles = {
      "/": "Home - Fitness Tracker",
      "/about": "About - Fitness Tracker",
      "/sign-up": "Sign up - Fitness Tracker",
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
        <div className="flex flex-col min-h-screen bg-white dark:bg-dark-primary text-slate-800 dark:text-slate-200">
          <DynamicTitle />
          <Navigation />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/sign-up" element={<Login />} />
              <Route path="/health-importance" element={<HealthImportance />} />
              <Route path="/fitness-tips" element={<FitnessTips />} />
              <Route path="/diet-tips" element={<DietTips />} />
              <Route path="/work-out-now" element={<WorkOutNow />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <FeatureHighlight />
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
