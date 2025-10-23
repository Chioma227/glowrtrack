import { useState } from "react";
import { Toaster } from "./components/ui/sonner";
import { StaffLogin } from "./components/StaffLogin";
import { AdminLogin } from "./components/AdminLogin";
import { LogService } from "./components/LogService";
import { AdminLayout } from "./components/AdminLayout";
import { Button } from "./components/ui/button";
import { Sparkles, UserCircle, Shield } from "lucide-react";

type View = "landing" | "staff-login" | "staff-dashboard" | "admin-login" | "admin-dashboard";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("landing");

  const handleStaffLogin = () => {
    setCurrentView("staff-dashboard");
  };

  const handleAdminLogin = () => {
    setCurrentView("admin-dashboard");
  };

  const handleLogout = () => {
    setCurrentView("landing");
  };

  // Landing Page
  if (currentView === "landing") {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #fdfbf9 0%, #f4c7d5 30%, #e8dcc4 70%, #d4a5d4 100%)"
        }}
      >
        <Toaster />
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 opacity-10">
          <Sparkles className="w-32 h-32" style={{ color: "#c9a27b" }} />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <Sparkles className="w-40 h-40" style={{ color: "#d4a5d4" }} />
        </div>
        <div className="absolute top-1/2 right-20 opacity-5">
          <Sparkles className="w-24 h-24" style={{ color: "#f4c7d5" }} />
        </div>

        <div className="w-full max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 animate-pulse"
              style={{ background: "linear-gradient(135deg, #c9a27b 0%, #d4a5d4 100%)" }}>
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl mb-4 bg-gradient-to-r from-rose-gold via-lavender to-blush-pink bg-clip-text text-transparent">
              GlowTrack
            </h1>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Elegant spa staff tracking and management system
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Streamline your salon operations with beauty and efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Staff Portal Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white hover:shadow-3xl transition-all hover:scale-105 duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{ background: "linear-gradient(135deg, #c9a27b 0%, #b08968 100%)" }}>
                  <UserCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl mb-3">Staff Portal</h2>
                <p className="text-muted-foreground mb-6">
                  Log in to record services for your clients
                </p>
                <Button
                  onClick={() => setCurrentView("staff-login")}
                  className="w-full h-14 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all"
                  style={{ background: "linear-gradient(135deg, #c9a27b 0%, #b08968 100%)" }}
                >
                  Staff Login
                </Button>
              </div>
            </div>

            {/* Admin Portal Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white hover:shadow-3xl transition-all hover:scale-105 duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{ background: "linear-gradient(135deg, #d4a5d4 0%, #b088c9 100%)" }}>
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl mb-3">Admin Portal</h2>
                <p className="text-muted-foreground mb-6">
                  Manage staff, services, and view analytics
                </p>
                <Button
                  onClick={() => setCurrentView("admin-login")}
                  className="w-full h-14 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all"
                  style={{ background: "linear-gradient(135deg, #d4a5d4 0%, #b088c9 100%)" }}
                >
                  Admin Login
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              Powered by GlowTrack Solutions ✨
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Staff Login
  if (currentView === "staff-login") {
    return (
      <>
        <Toaster />
        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => setCurrentView("landing")}
            className="absolute top-4 left-4 z-50 rounded-2xl"
          >
            ← Back
          </Button>
          <StaffLogin onLogin={handleStaffLogin} />
        </div>
      </>
    );
  }

  // Staff Dashboard (Log Service)
  if (currentView === "staff-dashboard") {
    return (
      <>
        <Toaster />
        <LogService onLogout={handleLogout} />
      </>
    );
  }

  // Admin Login
  if (currentView === "admin-login") {
    return (
      <>
        <Toaster />
        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => setCurrentView("landing")}
            className="absolute top-4 left-4 z-50 rounded-2xl"
          >
            ← Back
          </Button>
          <AdminLogin onLogin={handleAdminLogin} />
        </div>
      </>
    );
  }

  // Admin Dashboard
  if (currentView === "admin-dashboard") {
    return (
      <>
        <Toaster />
        <AdminLayout onLogout={handleLogout} />
      </>
    );
  }

  return null;
}
