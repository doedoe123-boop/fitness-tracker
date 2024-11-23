import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Navitation from "./pages/components/layouts/Navigation";
import HealthImportance from "./pages/HealthImportance";
import Footer from "./pages/components/layouts/Footer";
import FitnessTips from "./pages/FitnessTips";
import DietTips from "./pages/DietTips";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/auth/Login";

// Component to manage the dynamic page title
function DynamicTitle() {
  const location = useLocation();

  useEffect(() => {
    const pageTitles = {
      "/": "Home - Fitness Tracker",
      "/about": "About - Fitness Tracker",
      "/login": "Login - Fitness Tracker",
      "/health-importance": "Health Importance - Fitness Tracker",
      "/fitness-tips": "Fitness Tips - Fitness Tracker",
      "/diet-tips": "Diet Tips - Fitness Tracker",
    };

    // Set the title or default to "Fitness Tracker"
    document.title =
      pageTitles[location.pathname as keyof typeof pageTitles] ||
      "Fitness Tracker";
  }, [location]);

  return null; // No UI output, just manages side effects
}

function App() {
  return (
    <Router>
      <div>
        {/* Dynamic Title */}
        <DynamicTitle />

        {/* Navigation */}
        <Navitation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/health-importance" element={<HealthImportance />} />
          <Route path="/fitness-tips" element={<FitnessTips />} />
          <Route path="/diet-tips" element={<DietTips />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
