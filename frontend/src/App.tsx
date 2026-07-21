import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Assistant from "./pages/Assistant";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Checklist from "./pages/Checklist";
import CommunityBoard from "./pages/CommunityBoard";

function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="sticky top-0 left-0 w-full z-[100] bg-amber-500 text-black py-2 px-4 text-center border-b border-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
      <div className="font-mono text-[10px] uppercase tracking-widest font-bold flex justify-center items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
        NO CONNECTION · OFFLINE MODE ACTIVE · VIEWING CACHED DATA
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OfflineBanner />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/community" element={<CommunityBoard />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}