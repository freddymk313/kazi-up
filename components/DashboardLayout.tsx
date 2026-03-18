// app/components/DashboardLayout.tsx
"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Bookmark,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
  ChevronLeft,
  Search,
  Upload,
  Menu,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    {
      icon: LayoutDashboard,
      label: t("sidebar_dashboard"),
      path: "/dashboard",
    },
    {
      icon: FileText,
      label: t("sidebar_my_resumes"),
      path: "/dashboard/resumes",
    },
    {
      icon: Briefcase,
      label: t("sidebar_job_matches"),
      path: "/dashboard/jobs",
    },
    {
      icon: Bookmark,
      label: t("sidebar_saved_jobs"),
      path: "/dashboard/saved",
    },
    {
      icon: MessageSquare,
      label: t("sidebar_messages"),
      path: "/dashboard/messages",
    },
    {
      icon: Bell,
      label: t("sidebar_notifications"),
      path: "/dashboard/notifications",
    },
  ];

  const bottomItems = [
    {
      icon: Settings,
      label: t("sidebar_settings"),
      path: "/dashboard/settings",
    },
    { icon: HelpCircle, label: t("sidebar_help"), path: "/dashboard/help" },
  ];

  const isActive = (path: string) => pathname === path;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 h-16 flex items-center justify-between shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              kazi<span className="text-primary">Up</span>
            </span>
          </div>
        )}
        <button
          onClick={() => {
            setCollapsed(!collapsed);
            setMobileOpen(false);
          }}
          className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          <ChevronLeft
            className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Main Nav */}
      <div className="flex-1 mt-4 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => {
              router.push(item.path);
              setMobileOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isActive(item.path)
                ? "bg-primary/10 text-primary font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-accent space-y-1">
        {bottomItems.map((item) => (
          <button
            key={item.path}
            onClick={() => {
              router.push(item.path);
              setMobileOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isActive(item.path)
                ? "bg-primary/10 text-primary font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      {/* User Card */}
      {!collapsed && (
        <div className="px-3 pb-4">
          <div className="bg-primary/5 rounded-xl p-3.5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-display font-bold text-sm">
                AJ
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">Alex Johnson</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Crown className="w-3 h-3 text-primary" />{" "}
                  {t("sidebar_premium")}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs border-primary/20 text-primary rounded-full hover:bg-primary/10"
              onClick={() => router.push("/dashboard/settings")}
            >
              {t("sidebar_upgrade")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col shrink-0 bg-sidebar transition-all duration-300 ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-60 bg-sidebar shadow-elevated">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 shrink-0 bg-background flex items-center justify-between px-4 md:px-6 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden py-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            {/* <div className="hidden sm:flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 w-64">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                placeholder={t("sidebar_search")}
                className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
              />
            </div> */}
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            <Button
              onClick={() => router.push("/dashboard/builder")}
              className="rounded-full text-sm bg-primary text-primary-foreground hover:bg-primary/90 h-9 md:h-10 px-4 md:px-8 font-semibold transition-all active:scale-95"
            >
              <Upload className="w-1.5 h-1.5 md:w-3.5 md:h-3.5" /> {t("sidebar_new_resume")}
            </Button>
            {/* <button className="relative p-2 rounded-full hover:bg-accent transition-colors">
              <Bell className="w-4.5 h-4.5 text-muted-foreground" />
              <span className="absolute top-1 right-1.5 w-2.5 h-2.5 rounded-full bg-primary" />
            </button> */}
            <button className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-display font-bold text-xs">
              AJ
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-accent p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
