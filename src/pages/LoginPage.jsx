import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Sparkles,
  Mail,
  Lock,
  User,
  Phone,
  CheckCircle2,
  Star,
  Quote,
  ChefHat,
  Crown,
  LogIn,
  Wine,
  Flame,
  Award,
  Layers
} from 'lucide-react';
import Logo from '../components/Logo';

export default function LoginPage({ initialMode = 'login' }) {
  const { navigateTo, loginDemoUser, setUser, showToast } = useApp();

  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const isSignUp = mode === 'signup';

  // Active showcase slide for right panel (1 = Wine Cellar Vault, 2 = Grand Chandelier Hall)
  const [activeShowcase, setActiveShowcase] = useState(1);

  const [formData, setFormData] = useState({
    name: 'Alexander Wright',
    email: 'alexander@example.com',
    phone: '+1 (555) 234-5678',
    password: 'password123',
    agreeTerms: true
  });
  const [showPassword, setShowPassword] = useState(false);

  // Auto slide showcase every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveShowcase((prev) => (prev === 1 ? 2 : 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      setUser({
        name: formData.name || 'Valued Diner',
        email: formData.email,
        role: 'customer',
        points: 100,
        avatar: './assets/avatar_user.jpg'
      });
      showToast('Welcome to Flavoro!', 'Account created! You received 100 bonus reward points.');
      navigateTo('user-dashboard');
    } else {
      if (formData.email.toLowerCase().includes('admin') || formData.email.toLowerCase().includes('chef')) {
        loginDemoUser('admin');
      } else {
        loginDemoUser('customer');
      }
    }
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-[#fbf9f5] select-none">
      
      {/* ===================== LEFT PANEL: LUXURY AUTH EXPERIENCE ===================== */}
      <div className="lg:col-span-7 xl:col-span-6 px-6 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-5 flex flex-col justify-between h-full max-h-screen overflow-hidden relative z-10 bg-gradient-to-b from-white/80 via-[#fdfbf7] to-[#f7f4ed]">
        
        {/* Top Navigation & VIP Mode Switcher */}
        <div className="flex items-center justify-between gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-textMuted hover:text-accent transition-colors group py-1"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 text-accent" />
            <span>Back to Flavoro</span>
          </button>

          {/* Luxury Capsule Tab Switcher */}
          <div className="relative flex items-center bg-gray-200/60 p-1 rounded-full border border-gray-300/40 shadow-inner w-52">
            {/* Sliding Glowing Pill */}
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-primary shadow-md shadow-primary/20 transition-all duration-300 ease-out ${
                isSignUp ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'
              }`}
            ></div>

            <button
              type="button"
              onClick={() => setMode('login')}
              className={`relative z-10 flex-1 py-1.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-colors duration-300 ${
                !isSignUp ? 'text-white' : 'text-textMuted hover:text-textMain'
              }`}
            >
              <LogIn className="w-3 h-3" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`relative z-10 flex-1 py-1.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-colors duration-300 ${
                isSignUp ? 'text-white' : 'text-textMuted hover:text-textMain'
              }`}
            >
              <Sparkles className="w-3 h-3 text-accent" />
              <span>Sign Up</span>
            </button>
          </div>
        </div>

        {/* Center Main Form Area */}
        <div className="max-w-md w-full mx-auto my-auto py-1 space-y-2.5 sm:space-y-3 flex-shrink-0">
          
          {/* Logo & Headline */}
          <div className="space-y-0.5 text-left">
            <div className="flex items-center justify-between">
              <Logo
                size="sm"
                onClick={() => navigateTo('home')}
              />
              <span className="text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                ✦ Epicurean Club ✦
              </span>
            </div>
            
            <div className="relative min-h-[50px]">
              {/* Sign In Header */}
              <div
                className={`transition-all duration-300 ease-in-out absolute inset-0 ${
                  !isSignUp
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                  Welcome to the Table.
                </h1>
                <p className="text-xs text-textMuted leading-relaxed">
                  Sign in to manage bookings, tasting menus, and rewards.
                </p>
              </div>

              {/* Sign Up Header */}
              <div
                className={`transition-all duration-300 ease-in-out absolute inset-0 ${
                  isSignUp
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                  Join the Dining Society.
                </h1>
                <p className="text-xs text-textMuted leading-relaxed">
                  Unlock priority reservations, 100 reward points, and VIP tastings.
                </p>
              </div>
            </div>
          </div>

          {/* Form with Smooth Accordion Expansion */}
          <form onSubmit={handleSubmit} className="space-y-2">
            
            {/* Full Name (Sign Up only) */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isSignUp
                  ? 'max-h-16 opacity-100 translate-y-0'
                  : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted mb-0.5">
                Full Name
              </label>
              <div className="relative group">
                <User className="w-3.5 h-3.5 text-textMuted group-focus-within:text-accent absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200" />
                <input
                  type="text"
                  required={isSignUp}
                  placeholder="e.g. Alexander Wright"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-gray-200/90 focus:border-accent rounded-xl pl-9 pr-3 py-1.5 text-xs text-primary font-medium focus:outline-none shadow-sm transition-all duration-200 focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted mb-0.5">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="w-3.5 h-3.5 text-textMuted group-focus-within:text-accent absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200" />
                <input
                  type="email"
                  required
                  placeholder="alexander@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-gray-200/90 focus:border-accent rounded-xl pl-9 pr-3 py-1.5 text-xs text-primary font-medium focus:outline-none shadow-sm transition-all duration-200 focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>

            {/* Phone Number (Sign Up only) */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isSignUp
                  ? 'max-h-16 opacity-100 translate-y-0'
                  : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted mb-0.5">
                Phone Number
              </label>
              <div className="relative group">
                <Phone className="w-3.5 h-3.5 text-textMuted group-focus-within:text-accent absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200" />
                <input
                  type="tel"
                  placeholder="+1 (555) 234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-gray-200/90 focus:border-accent rounded-xl pl-9 pr-3 py-1.5 text-xs text-primary font-medium focus:outline-none shadow-sm transition-all duration-200 focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted">
                  Password
                </label>
                <div
                  className={`transition-opacity duration-300 ${
                    !isSignUp ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => showToast('Password Reset', 'Password recovery instructions sent to demo email.')}
                    className="text-[10px] text-accent font-bold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              <div className="relative group">
                <Lock className="w-3.5 h-3.5 text-textMuted group-focus-within:text-accent absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white border border-gray-200/90 focus:border-accent rounded-xl pl-9 pr-9 py-1.5 text-xs text-primary font-medium focus:outline-none shadow-sm transition-all duration-200 focus:ring-2 focus:ring-accent/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Terms checkbox for signup */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isSignUp
                  ? 'max-h-10 opacity-100 translate-y-0'
                  : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <label className="flex items-center gap-2 pt-0.5 text-[10px] text-textMuted cursor-pointer">
                <input
                  type="checkbox"
                  required={isSignUp}
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="rounded border-gray-300 text-accent focus:ring-accent w-3.5 h-3.5"
                />
                <span>I agree to the Terms of Dining & Member Policy</span>
              </label>
            </div>

            {/* Magnetic Primary Submit Button */}
            <button
              type="submit"
              className="btn-shimmer w-full bg-primary hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl shadow-md shadow-primary/20 flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 mt-1"
            >
              <span className="transition-all duration-300">
                {isSignUp ? 'Claim Membership (+100 Pts)' : 'Enter the Dining Room'}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" style={{ animationDuration: '4s' }} />
            </button>

          </form>

          {/* 1-Click VIP Demo Pass Cards */}
          <div className="pt-2 border-t border-gray-200/70 space-y-1.5">
            <div className="flex items-center justify-center gap-2 text-[9px] uppercase font-bold tracking-widest text-textMuted">
              <span className="w-6 h-px bg-gray-200"></span>
              <span>1-CLICK INSTANT DEMO PASSES</span>
              <span className="w-6 h-px bg-gray-200"></span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Customer VIP Pass */}
              <button
                type="button"
                onClick={() => loginDemoUser('customer')}
                className="flex items-center gap-2 p-2 rounded-xl border border-amber-200/80 bg-gradient-to-r from-amber-50/60 to-white hover:border-accent text-left transition-all duration-200 shadow-sm group hover:scale-[1.02]"
              >
                <img
                  src="./assets/avatar_user.jpg"
                  alt="Diner Avatar"
                  className="w-7 h-7 rounded-full object-cover border border-accent/40 shadow-inner flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-primary truncate group-hover:text-accent">Alexander W.</p>
                  <p className="text-[9px] text-accent font-semibold flex items-center gap-0.5">
                    <span>★ VIP Diner</span>
                  </p>
                </div>
              </button>

              {/* Chef / Admin Pass */}
              <button
                type="button"
                onClick={() => loginDemoUser('admin')}
                className="flex items-center gap-2 p-2 rounded-xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50/60 to-white hover:border-emerald-700 text-left transition-all duration-200 shadow-sm group hover:scale-[1.02]"
              >
                <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-inner">
                  <ChefHat className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-primary truncate group-hover:text-emerald-800">Elena Rossi</p>
                  <p className="text-[9px] text-emerald-700 font-semibold flex items-center gap-0.5">
                    <span>👑 Head Chef</span>
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Mode Switch Footer Link */}
          <div className="text-center text-[11px] text-textMuted pt-0.5">
            {isSignUp ? (
              <p className="transition-opacity duration-300">
                Already have a membership?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-accent hover:underline ml-1 transition-colors"
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p className="transition-opacity duration-300">
                New to Flavoro?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-accent hover:underline ml-1 transition-colors"
                >
                  Join the Club
                </button>
              </p>
            )}
          </div>

        </div>

        {/* Bottom Legal Footer */}
        <div className="pt-2 text-center lg:text-left text-[10px] text-textMuted border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-1 flex-shrink-0">
          <span>© 2026 Flavoro Restaurant & Bar.</span>
          <div className="flex gap-3">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:underline transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:underline transition-colors">Terms of Dining</a>
          </div>
        </div>

      </div>

      {/* ===================== RIGHT PANEL: EDITORIAL ATMOSPHERE SHOWCASE ===================== */}
      <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 relative overflow-hidden bg-primary h-full max-h-screen">
        
        {/* Layer 1: Image 1 (Wine Cellar Chef Plating) */}
        <img
          src="./assets/auth_luxury_vault.jpg"
          alt="Chef Plating in Private Wine Cellar Vault"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 transform ${
            activeShowcase === 1
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105 pointer-events-none'
          }`}
        />

        {/* Layer 2: Image 2 (Grand Chandelier Dining Hall) */}
        <img
          src="./assets/auth_ambiance_dining.jpg"
          alt="Grand Chandelier Dining Hall Ambiance"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 transform ${
            activeShowcase === 2
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105 pointer-events-none'
          }`}
        />

        {/* Dark Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-transparent"></div>

        {/* Top Atmosphere Selector Pills */}
        <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between">
          <div className="glass-dark rounded-full px-3.5 py-1.5 text-[11px] font-bold text-white flex items-center gap-2 border border-white/20 shadow-xl backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Michelin Starred Experience</span>
          </div>

          {/* Interactive Scene Switcher */}
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10">
            <button
              type="button"
              onClick={() => setActiveShowcase(1)}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                activeShowcase === 1
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Chef's Vault
            </button>
            <button
              type="button"
              onClick={() => setActiveShowcase(2)}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                activeShowcase === 2
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Grand Hall
            </button>
          </div>
        </div>

        {/* Bottom Glassmorphic Gastronomy Critic Card */}
        <div className="absolute bottom-6 left-6 right-6 z-20 glass-dark rounded-2xl p-5 border border-white/15 text-white shadow-2xl backdrop-blur-xl space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex text-amber-400 gap-1 items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
              <span className="text-xs font-bold text-white ml-1">5.0</span>
            </div>
            <span className="text-[9px] uppercase font-extrabold tracking-widest text-accent bg-accent/15 px-2.5 py-0.5 rounded-full border border-accent/30">
              Gastronomy Guide 2026
            </span>
          </div>

          <p className="text-white/90 text-xs italic leading-relaxed font-light">
            {activeShowcase === 1
              ? '"An intimate sanctuary where rare vintages meet artisanal culinary mastery. Every plate is an extraordinary revelation."'
              : '"Flavoro captures the heartbeat of classic romance and sublime gastronomy with warmth, grace, and exquisite taste."'}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <div>
              <p className="font-bold text-white text-xs">
                {activeShowcase === 1 ? 'Chef Elias Thorne' : 'Julian Vane'}
              </p>
              <p className="text-[10px] text-white/70">
                {activeShowcase === 1 ? 'Master Executive Chef & Sommelier' : 'Chief Food Critic, Epicurean Gazette'}
              </p>
            </div>

            <div className="font-script text-2xl text-accent">
              Flavoro
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
