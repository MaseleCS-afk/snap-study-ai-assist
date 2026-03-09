import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home, Upload, BookOpen, Bot, Users, LayoutDashboard, Zap, Menu, X
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/upload", icon: Upload, label: "Snap & Study" },
  { to: "/library", icon: BookOpen, label: "Library" },
  { to: "/copilot", icon: Bot, label: "AI Copilot" },
  { to: "/collaborate", icon: Users, label: "Collaborate" },
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300",
        "lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-study">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-display font-bold text-base text-foreground">SnapStudy</span>
            <span className="font-display font-bold text-base text-primary"> AI</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-primary text-primary-foreground shadow-study"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
              JD
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Jane Doe</p>
              <p className="text-xs text-muted-foreground">Student</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar (mobile) */}
        <header className="lg:hidden sticky top-0 z-20 bg-card border-b border-border px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-sm text-foreground">SnapStudy <span className="text-primary">AI</span></span>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
