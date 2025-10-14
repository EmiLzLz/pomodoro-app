import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Timer from "./pages/Timer";
import Dashboard from "./pages/Dashboard";
import Tags from "./pages/Tags";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/timer" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
