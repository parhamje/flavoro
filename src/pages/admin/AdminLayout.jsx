import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  CalendarCheck,
  BookOpen,
  Users,
  ArrowLeft,
  ShieldCheck,
  LogOut,
  Flame,
  Clock,
  Bell,
  ChefHat,
  Sparkles,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import Logo from '../../components/Logo';

export default function AdminLayout({ activeTab, setActiveTab, children }) {
  const { navigateTo, user, logout, reservations, staffList } = useApp();

  // Digital Live Service Clock
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeReservationsCount = reservations.filter((r) => r.status === 'Confirmed' || r.status === 'Seated').length;
  const onShiftStaffCount = staffList.filter((s) => s.status === 'On Shift').length;

  const navItems = [
    { id: 'dashboard', label: 'Executive Overview', icon: LayoutDashboard, badge: null },
    { id: 'reservations', label: 'Floor Reservations', icon: CalendarCheck, badge: activeReservationsCount },
    { id: 'menu', label: 'Menu & Inventory', icon: BookOpen, badge: null },
    { id: 'staff', label: 'Culinary Roster', icon: Users, badge: `${onShiftStaffCount} Active` }
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-textMain flex flex-col selection:bg-accent selection:text-white">
      
      {/* ==================== ADMIN EXECUTIVE TOP BAR ==================== */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200/90 h-16 sm:h-20 flex items-center justify-between px-4 sm:px-8 shadow-sm">
        
        {/* Logo & Executive Beacon */}
        <div className="flex items-center gap-4">
          <Logo
            size="sm"
            subtitle="EXECUTIVE CONSOLE"
            onClick={() => navigateTo('home')}
          />

          <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-gray-200">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shadow-sm">
              Live Dinner Service • {time}
            </span>
          </div>
        </div>

        {/* Right Executive Profile & Navigation Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            onClick={() => navigateTo('home')}
            className="text-xs font-bold uppercase tracking-wider text-textMuted hover:text-accent flex items-center gap-1.5 transition-all duration-200 py-2 px-3.5 rounded-full hover:bg-gray-100 group"
          >
            <ArrowLeft className="w-4 h-4 text-accent transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Customer Site</span>
          </button>

          {/* Head Chef Profile Card */}
          <div className="flex items-center gap-3 pl-3 sm:pl-4 border-l border-gray-200">
            <div className="relative group">
              <img
                src={user?.avatar || './assets/chef_portrait.jpg'}
                alt={user?.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-accent shadow-sm group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-600 rounded-full border-2 border-white flex items-center justify-center text-white shadow-xs">
                <ChefHat className="w-2.5 h-2.5" />
              </span>
            </div>

            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-primary leading-tight">{user?.name || 'Elena Rossi'}</p>
              <p className="text-[10px] text-accent font-extrabold uppercase tracking-wider">Executive Chef</p>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== MAIN BODY: SIDEBAR & WORKSPACE ==================== */}
      <div className="flex-1 pt-16 sm:pt-20 flex">
        
        {/* Left Sidebar (Desktop) - Animated Floating Module Buttons */}
        <aside className="w-64 shrink-0 bg-white border-r border-gray-200/90 p-4 space-y-1.5 hidden md:flex flex-col justify-between sticky top-16 sm:top-20 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] z-30 shadow-xs">
          
          <div className="space-y-1.5">
            <div className="px-3 py-2 flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-textMuted">Management Modules</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`group relative w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold tracking-wide transition-all duration-300 transform ${
                    isActive
                      ? 'bg-gradient-to-r from-primary via-[#012f26] to-primary text-white shadow-md shadow-primary/20 scale-[1.02] border border-emerald-800/40'
                      : 'text-textMuted hover:text-primary hover:bg-surface-container-low hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Active Left Indicator Bar */}
                    {isActive && (
                      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-full animate-fadeIn"></span>
                    )}
                    <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-accent' : 'text-textMuted group-hover:text-accent'
                    }`} />
                    <span className="tracking-wider uppercase">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full transition-transform ${
                      isActive
                        ? 'bg-accent text-white shadow-xs scale-105'
                        : 'bg-surface-container-high text-primary group-hover:bg-amber-100 group-hover:text-accent'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer with Animated Rush Alert Card */}
          <div className="pt-4 border-t border-gray-100 space-y-2.5">
            <div className="p-3.5 bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white border border-amber-200/80 rounded-2xl shadow-xs relative overflow-hidden group">
              <div className="flex items-center justify-between text-accent text-xs font-bold mb-1">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-accent animate-pulse" />
                  <span>Kitchen Rush Alert</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              <p className="text-[11px] text-textMuted leading-relaxed">
                8 tables seated. Main hot line expedite running smoothly at 14m avg ticket.
              </p>
            </div>

            <button
              onClick={logout}
              className="group w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold tracking-wider text-rose-600 hover:bg-rose-50 transition-all duration-200"
            >
              <div className="flex items-center gap-2.5">
                <LogOut className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                <span>Exit Console</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-rose-400 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

        </aside>

        {/* Workspace Content with Fluid Transition */}
        <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10">
          
          {/* Mobile Top Tabs Slider */}
          <div className="flex md:hidden items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-gray-200 scrollbar-none">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase whitespace-nowrap transition-all ${
                  activeTab === item.id ? 'bg-primary text-white shadow-md' : 'bg-white text-textMuted border border-gray-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Animated Tab Content Container */}
          <div key={activeTab} className="animate-fadeIn">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}
