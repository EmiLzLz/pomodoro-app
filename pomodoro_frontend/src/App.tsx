import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Timer from "./pages/Timer";
import Dashboard from "./pages/Dashboard";
import Tags from "./pages/Tags";
import History from "./pages/History";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <main className="ml-[60px] flex-1 min-h-screen flex flex-col">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="/timer" replace />} />
              <Route path="/timer" element={<Timer />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tags" element={<Tags />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
