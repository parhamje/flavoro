import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  UtensilsCrossed,
  CalendarDays,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  LogOut,
  Sparkles,
  Heart,
  Clock,
  ArrowRight
} from 'lucide-react';

import Logo from './Logo';

export default function Navbar() {
  const {
    currentPage,
    navigateTo,
    cart,
    setIsCartOpen,
    setIsBookingOpen,
    user,
    loginDemoUser,
    logout,
    triggerLoadingScreen
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => {
      const next = !prev;
      if (next) setIsMobileMenuOpen(false);
      return next;
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const next = !prev;
      if (next) setIsUserDropdownOpen(false);
      return next;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'HOME', page: 'home' },
    { name: 'MENU', page: 'menu' },
    { name: 'ABOUT US', page: 'about' },
    { name: 'GALLERY', page: 'gallery' },
    { name: 'CONTACT', page: 'contact' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#fdfbf7]/90 backdrop-blur-md border-b border-[#e4e2e1]/60 shadow-sm transition-all">
      {/* Top Scroll Progress Indicator Line */}
      <div
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-accent via-amber-400 to-accent z-50 transition-all duration-150 ease-out shadow-sm"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Backdrop for User Profile Dropdown to prevent overlaps on mobile/desktop */}
      {isUserDropdownOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/15 sm:bg-transparent backdrop-blur-[1px] sm:backdrop-blur-none transition-all duration-200"
          onClick={() => setIsUserDropdownOpen(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        
        {/* Brand Logo with exact reference typography */}
        <Logo
          size="md"
          onClick={() => navigateTo('home')}
        />

        {/* Desktop Navigation Links with Animated Magnetic Underline */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold tracking-widest text-textMain">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => navigateTo(link.page)}
                className={`group py-2 transition-all duration-300 relative uppercase font-bold flex flex-col items-center transform ${
                  isActive
                    ? 'text-accent font-extrabold -translate-y-0.5'
                    : 'text-textMain/80 hover:text-accent hover:-translate-y-0.5'
                }`}
              >
                <span>{link.name}</span>

                {/* Animated Indicator Underline */}
                {isActive ? (
                  <span className="absolute -bottom-0.5 left-0 w-full h-[2.5px] bg-gradient-to-r from-amber-400 via-accent to-amber-500 rounded-full shadow-[0_0_8px_rgba(252,143,52,0.7)] animate-fadeIn"></span>
                ) : (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-accent/60 rounded-full group-hover:w-full transition-all duration-300 ease-out"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls (Book Table, Cart, Profile, Mobile Toggle) */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full hover:bg-surface-container-high text-primary transition-colors focus:outline-none"
            title="View Order Cart"
          >
            <ShoppingBag className="w-5 h-5 text-primary" />
            {totalCartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white font-bold text-[11px] rounded-full flex items-center justify-center shadow-md animate-scale">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Book A Table CTA Button */}
          <button
            onClick={() => setIsBookingOpen(true)}
            className="btn-shimmer hidden sm:flex items-center gap-2 bg-accent hover:bg-orange-600 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase px-5 py-3 rounded-full shadow-md shadow-accent/25 hover:shadow-accent/40 transition-all duration-200"
          >
            <span>BOOK A TABLE</span>
            <CalendarDays className="w-4 h-4" />
          </button>

          {/* User Account / Role Switcher Dropdown */}
          <div className="relative z-50">
            <button
              onClick={toggleUserDropdown}
              className={`flex items-center gap-2 p-1.5 rounded-full border transition-all duration-300 bg-white shadow-sm active:scale-95 ${
                isUserDropdownOpen
                  ? 'border-accent ring-2 ring-accent/30 shadow-md shadow-accent/15'
                  : 'border-outline-variant/50 hover:border-primary/40'
              }`}
              title="Account Options"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-accent/40"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
              <ChevronDown
                className={`w-3.5 h-3.5 text-textMuted hidden sm:block mr-1 transition-transform duration-300 ease-out ${
                  isUserDropdownOpen ? 'rotate-180 text-accent' : 'rotate-0'
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isUserDropdownOpen && (
              <div
                className="absolute -right-2 sm:right-0 mt-2.5 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 z-50 animate-dropdown-pop overflow-hidden"
                onMouseLeave={() => setIsUserDropdownOpen(false)}
              >
                <div className="px-4 py-2 border-b border-gray-100/90">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-primary truncate">{user?.name || 'Guest Diner'}</p>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-accent border border-amber-200/60 shadow-xs">
                      {user?.role || 'Guest'}
                    </span>
                  </div>
                  <p className="text-[11px] text-textMuted truncate">{user?.email || 'Not logged in'}</p>
                </div>

                <div className="py-1.5 text-xs">
                  {/* Customer Portal Link */}
                  <button
                    onClick={() => {
                      navigateTo('user-dashboard');
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-surface-container flex items-center gap-2.5 text-textMain group transition-all duration-150"
                  >
                    <LayoutDashboard className="w-4 h-4 text-accent transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200" />
                    <span className="font-medium group-hover:text-primary group-hover:translate-x-0.5 transition-all">Customer Dashboard</span>
                  </button>

                  {/* Admin Portal Link */}
                  <button
                    onClick={() => {
                      navigateTo('admin-dashboard');
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-surface-container flex items-center gap-2.5 text-textMain group transition-all duration-150"
                  >
                    <ShieldCheck className="w-4 h-4 text-primary transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200" />
                    <span className="font-medium group-hover:text-primary group-hover:translate-x-0.5 transition-all">Admin Suite</span>
                  </button>

                  {/* Replay Loading Screen */}
                  <button
                    onClick={() => {
                      triggerLoadingScreen();
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-surface-container flex items-center gap-2.5 text-textMain group transition-all duration-150"
                  >
                    <Sparkles className="w-4 h-4 text-accent transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200" />
                    <span className="font-medium group-hover:text-primary group-hover:translate-x-0.5 transition-all">Replay Loading Overture</span>
                  </button>
                </div>

                {/* Demo Fast Switch */}
                <div className="px-3 py-2.5 bg-surface-container-low mx-2 rounded-xl text-[11px] space-y-1.5 mt-1 border border-gray-100">
                  <p className="font-semibold text-textMuted uppercase text-[9px] tracking-wider">Quick Demo Switch</p>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => {
                        loginDemoUser('customer');
                        setIsUserDropdownOpen(false);
                      }}
                      className="flex-1 py-1.5 px-2 rounded-lg bg-white hover:bg-amber-50 active:scale-95 text-accent font-semibold border border-amber-200 text-center text-[10px] shadow-xs transition-all"
                    >
                      Diner Demo
                    </button>
                    <button
                      onClick={() => {
                        loginDemoUser('admin');
                        setIsUserDropdownOpen(false);
                      }}
                      className="flex-1 py-1.5 px-2 rounded-lg bg-primary hover:bg-primary-forest active:scale-95 text-white font-semibold text-center text-[10px] shadow-xs transition-all"
                    >
                      Staff Demo
                    </button>
                  </div>
                </div>

                {user?.role !== 'guest' ? (
                  <div className="pt-2 px-2 mt-1 border-t border-gray-100">
                    <button
                      onClick={() => {
                        logout();
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 font-medium text-xs flex items-center gap-2 group transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
                      <span>Log Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-2 px-2 mt-1 border-t border-gray-100">
                    <button
                      onClick={() => {
                        navigateTo('login');
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container text-primary font-bold text-xs flex items-center gap-2 group transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-accent transform group-hover:scale-110 transition-transform" />
                      <span>Sign In</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Animated Mobile Menu Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden relative z-50 p-2.5 rounded-2xl text-primary hover:bg-surface-container active:scale-95 transition-all duration-200 focus:outline-none"
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Menu
                className={`w-6 h-6 absolute transition-all duration-300 transform ${
                  isMobileMenuOpen
                    ? 'opacity-0 rotate-90 scale-50 pointer-events-none'
                    : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <X
                className={`w-6 h-6 absolute transition-all duration-300 transform ${
                  isMobileMenuOpen
                    ? 'opacity-100 rotate-0 scale-100'
                    : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop (Click to dismiss) */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 top-20 sm:top-24 bg-black/40 backdrop-blur-sm z-30 lg:hidden animate-modal-backdrop"
        />
      )}

      {/* Animated Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#fdfbf7] border-b border-[#e4e2e1] px-6 py-6 space-y-5 shadow-2xl z-40 animate-mobile-menu">
          <nav className="flex flex-col space-y-2 font-semibold text-sm">
            {navLinks.map((link, idx) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => {
                    navigateTo(link.page);
                    setIsMobileMenuOpen(false);
                  }}
                  style={{ animationDelay: `${idx * 45 + 50}ms` }}
                  className={`animate-mobile-item flex items-center justify-between py-3.5 px-4 rounded-2xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.01]'
                      : 'text-textMain/90 hover:text-accent hover:bg-white bg-surface-container-low/60 active:scale-[0.99] border border-gray-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-accent scale-125 shadow-[0_0_8px_#fc8f34]' : 'bg-transparent group-hover:bg-accent/60'
                      }`}
                    />
                    <span className="uppercase text-xs font-bold tracking-widest">{link.name}</span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive ? 'text-accent translate-x-0' : 'text-textMuted/40 group-hover:text-accent group-hover:translate-x-1'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div
            style={{ animationDelay: '300ms' }}
            className="animate-mobile-item pt-4 border-t border-gray-200/80 flex flex-col gap-3"
          >
            {/* Book A Table Action */}
            <button
              onClick={() => {
                setIsBookingOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="btn-shimmer w-full bg-accent hover:bg-orange-600 active:scale-95 text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-accent/25 transition-all"
            >
              <CalendarDays className="w-4 h-4" />
              <span>BOOK A TABLE</span>
            </button>
            
            {/* Quick Portal Switch */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <button
                onClick={() => {
                  navigateTo('user-dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2.5 px-3 bg-surface-container-low hover:bg-surface-container rounded-2xl text-textMain font-bold text-center border border-gray-200/80 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-accent" />
                <span>User Portal</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('admin-dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2.5 px-3 bg-primary hover:bg-emerald-950 text-white rounded-2xl font-bold text-center shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>Admin Suite</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
