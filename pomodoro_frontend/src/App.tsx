import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Timer from "./pages/Timer";
import Dashboard from "./pages/Dashboard";
import Tags from "./pages/Tags";
import History from "./pages/History";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container flex min-h-screen relative">
        {/* Background animado */}
        <AnimatedBackground />

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="main-wrapper flex-1 flex flex-col ml-0 md:ml-20">
          <div className="content-area flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="/timer" replace />} />
              <Route path="/timer" element={<Timer />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tags" element={<Tags />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
