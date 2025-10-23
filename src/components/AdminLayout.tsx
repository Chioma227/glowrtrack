import { useState } from "react";
import { 
  LayoutDashboard, 
  Scissors, 
  Users, 
  FileText, 
  BarChart3, 
  LogOut,
  Sparkles,
  Menu,
  X
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { AdminDashboard } from "./AdminDashboard";
import { ServiceManagement } from "./ServiceManagement";
import { StaffManagement } from "./StaffManagement";
import { LogsReports } from "./LogsReports";
import { Analytics } from "./Analytics";

interface AdminLayoutProps {
  onLogout: () => void;
}

type ActivePage = "dashboard" | "services" | "staff" | "logs" | "analytics";

export function AdminLayout({ onLogout }: AdminLayoutProps) {
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "dashboard" as ActivePage, label: "Dashboard", icon: LayoutDashboard },
    { id: "services" as ActivePage, label: "Services", icon: Scissors },
    { id: "staff" as ActivePage, label: "Staff", icon: Users },
    { id: "logs" as ActivePage, label: "Logs", icon: FileText },
    { id: "analytics" as ActivePage, label: "Analytics", icon: BarChart3 },
  ];

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <AdminDashboard />;
      case "services":
        return <ServiceManagement />;
      case "staff":
        return <StaffManagement />;
      case "logs":
        return <LogsReports />;
      case "analytics":
        return <Analytics />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #c9a27b 0%, #d4a5d4 100%)" }}>
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-medium">GlowTrack</h2>
                  <p className="text-xs text-muted-foreground">Admin Portal</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                    isActive
                      ? "text-white shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                  style={
                    isActive
                      ? { background: "linear-gradient(135deg, #c9a27b 0%, #b08968 100%)" }
                      : undefined
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sidebar-foreground hover:bg-sidebar-accent transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-xl">
                {menuItems.find(item => item.id === activePage)?.label}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@glowtrack.com</p>
              </div>
              <Avatar className="w-10 h-10 rounded-2xl">
                <AvatarFallback className="rounded-2xl text-white"
                  style={{ background: "linear-gradient(135deg, #c9a27b 0%, #d4a5d4 100%)" }}>
                  AU
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
