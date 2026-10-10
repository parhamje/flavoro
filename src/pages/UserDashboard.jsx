import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CalendarDays,
  Clock,
  Users,
  ShoppingBag,
  Heart,
  Award,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Plus,
  Utensils,
  MapPin,
  Sparkles,
  Settings,
  UserCheck,
  QrCode,
  Wine,
  Crown,
  Receipt,
  Download,
  Calendar,
  ChevronRight,
  ExternalLink,
  ChefHat,
  Flame,
  ShieldCheck,
  Coffee,
  Sliders,
  Check,
  Info,
  Share2
} from 'lucide-react';
import Logo from '../components/Logo';

export default function UserDashboard() {
  const {
    user,
    reservations,
    cancelReservation,
    orders,
    favorites,
    menuItems,
    addToCart,
    setIsBookingOpen,
    navigateTo,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'reservations' | 'preferences' | 'orders' | 'favorites'
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // User's active reservations
  const userReservations = reservations.filter(
    (r) => r.customerEmail?.toLowerCase() === user.email?.toLowerCase() || r.customerName === user.name
  );

  const nextReservation = userReservations.find((r) => r.status === 'Confirmed' || r.status === 'Seated') || userReservations[0];

  // Favorite items
  const favoriteItems = menuItems.filter((m) => favorites.includes(m.id));

  // VIP Points & Tier Progression
  const currentPoints = user?.points || 450;
  const targetPoints = 600;
  const progressPercent = Math.min(100, Math.round((currentPoints / targetPoints) * 100));

  // Interactive Taste Preferences State
  const [preferences, setPreferences] = useState({
    waterService: 'Lurisia Sparkling',
    seatingPreference: "Chef's Counter",
    truffleEnthusiast: true,
    sommelierPairingDefault: true,
    dietaryRestrictions: ['Shellfish Sensitive'],
    specialOccasionDefault: 'Romantic Anniversary',
    sommelierNotes: 'Prefers full-bodied Tuscan reds (Barolo, Brunello di Montalcino). Avoid heavy cilantro.'
  });

  const waterOptions = ['Lurisia Sparkling', 'Acqua Panna Still', 'Citrus Infused Mineral'];
  const seatingOptions = ["Chef's Counter", "Sommelier Cellar Vault", "Garden Terrace", "Private Intimate Booth"];

  const toggleDietary = (restriction) => {
    setPreferences((prev) => {
      const exists = prev.dietaryRestrictions.includes(restriction);
      return {
        ...prev,
        dietaryRestrictions: exists
          ? prev.dietaryRestrictions.filter((r) => r !== restriction)
          : [...prev.dietaryRestrictions, restriction]
      };
    });
  };

  const handleSavePreferences = () => {
    showToast('Preferences Saved', 'Your culinary and host stand profile has been updated.');
  };

  return (
    <div className="pt-24 pb-28 min-h-screen bg-[#fcfaf7] text-textMain selection:bg-accent selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* ==================== TOP HERO GREETING & VIP PASSPORT CARD ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Welcome Portal Box */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#e8e4dc] shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-100/40 via-amber-50/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-4 relative z-10">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[10px] uppercase font-extrabold tracking-widest px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/25 flex items-center gap-1.5 shadow-xs">
                  <Crown className="w-3.5 h-3.5" />
                  <span>VIP Epicurean Club • Gold Connoisseur</span>
                </span>
                <span className="text-xs text-textMuted font-mono font-semibold bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                  #{user?.email ? user.email.slice(0, 3).toUpperCase() + '-8942' : 'FLV-8942'}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Active VIP Status</span>
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
                Welcome back, {user?.name?.split(' ')[0] || 'Alexander'}.
              </h1>

              <p className="text-xs sm:text-sm text-textMuted leading-relaxed max-w-xl">
                Your private fine-dining console is active. Manage your bespoke table reservations, tailor your degustation preferences, and review your sommelier cellar pairings.
              </p>
            </div>

            {/* Action Buttons Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-6 relative z-10 border-t border-gray-100 mt-6">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="btn-shimmer bg-accent hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md shadow-accent/25 flex items-center gap-2 transition-all active:scale-95"
              >
                <CalendarDays className="w-4 h-4" />
                <span>Reserve a Table</span>
              </button>

              <button
                onClick={() => setShowQRModal(true)}
                className="bg-primary hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-full shadow-md flex items-center gap-2 transition-all active:scale-95"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>Host Stand Pass</span>
              </button>

              <button
                onClick={() => navigateTo('menu')}
                className="text-xs font-bold uppercase tracking-wider text-textMuted hover:text-accent px-4 py-3.5 transition-colors ml-auto flex items-center gap-1.5"
              >
                <span>Browse Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right VIP Metallic Member Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#012f26] via-[#01221b] to-[#011410] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between border border-white/15">
            {/* Background Shimmer & Grain */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-gradient-to-br from-amber-300/25 to-accent/15 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none"></div>

            {/* Top Card Header */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <img
                    src={user?.avatar || './assets/avatar_user.jpg'}
                    alt={user?.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-400/80 shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full border-2 border-primary flex items-center justify-center text-[10px] font-bold">
                    ★
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight tracking-wide">{user?.name || 'Alexander Wright'}</h3>
                  <p className="text-[11px] text-amber-300/90 font-medium">Gold Connoisseur Pass</p>
                </div>
              </div>

              <div className="text-right">
                <span className="font-script text-3xl text-amber-400 font-normal select-none">
                  Flavoro
                </span>
                <p className="text-[9px] uppercase tracking-widest text-white/50 -mt-1">Private Cellar</p>
              </div>
            </div>

            {/* Points & Tier Progress Ring */}
            <div className="my-6 space-y-2.5 relative z-10">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">LOYALTY PTS</span>
                  <p className="text-3xl font-heading font-bold text-amber-300 tracking-tight">
                    {currentPoints} <span className="text-sm font-sans text-white/70 font-normal">PTS</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-accent">NEXT PRIVILEGE TIER</span>
                  <p className="text-xs font-bold text-white/90">Diamond Connoisseur (600 PTS)</p>
                </div>
              </div>

              {/* Progress Bar with Liquid Glow */}
              <div className="w-full bg-white/15 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="bg-gradient-to-r from-amber-400 via-accent to-amber-300 h-full rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(252,143,52,0.8)]"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-[10px] text-white/70 pt-0.5">
                <span>{progressPercent}% Achieved</span>
                <span className="text-amber-200">
                  {currentPoints >= targetPoints
                    ? '★ Diamond Tier Perks Unlocked'
                    : `${targetPoints - currentPoints} pts to Diamond Private Vault`}
                </span>
              </div>
            </div>

            {/* Bottom Card Perks Bar */}
            <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs relative z-10">
              <span className="text-white/85 flex items-center gap-1.5 font-medium">
                <Wine className="w-3.5 h-3.5 text-accent" />
                <span>Complimentary Sommelier Pairing</span>
              </span>
              <button
                onClick={() => setShowQRModal(true)}
                className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 transition-colors group"
              >
                <span>Scan Digital QR</span>
                <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* ==================== TONIGHT'S LIVE SERVICE JOURNEY (FOR ACTIVE RESERVATION) ==================== */}
        {nextReservation && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8e4dc] shadow-sm space-y-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-accent flex items-center justify-center border border-amber-200 shadow-xs">
                  <Flame className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      TONIGHT'S SEATING
                    </span>
                    <span className="text-xs text-textMuted font-medium">{nextReservation.date} • {nextReservation.time}</span>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-primary mt-0.5">
                    {nextReservation.diningArea || "Chef's Counter Tasting"}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowQRModal(true)}
                  className="px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-primary border border-gray-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <QrCode className="w-4 h-4 text-accent" />
                  <span>Check-In Pass</span>
                </button>
                <button
                  onClick={() => cancelReservation(nextReservation.id)}
                  className="px-4 py-2 rounded-xl hover:bg-red-50 text-red-600 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* 4-Step Interactive Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              
              {/* Step 1 */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">STEP 1 • COMPLETED</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <h5 className="font-bold text-sm text-primary">Booking Confirmed</h5>
                <p className="text-[11px] text-textMuted">Guest cover for {nextReservation.guests} guests confirmed in host system.</p>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-1 relative shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></span>
                    STEP 2 • IN PROGRESS
                  </span>
                  <Utensils className="w-4 h-4 text-accent" />
                </div>
                <h5 className="font-bold text-sm text-primary">White Linen Dressed</h5>
                <p className="text-[11px] text-textMuted">Table T-16 assigned and set with crystal glassware.</p>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-1 opacity-80">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-textMuted">STEP 3 • NEXT</span>
                  <Wine className="w-4 h-4 text-textMuted" />
                </div>
                <h5 className="font-bold text-sm text-primary">Vintage Cellar Chilling</h5>
                <p className="text-[11px] text-textMuted">Sommelier pair wines prepared to cellar temperature (16°C).</p>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-1 opacity-80">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-textMuted">STEP 4 • ARRIVAL</span>
                  <ChefHat className="w-4 h-4 text-textMuted" />
                </div>
                <h5 className="font-bold text-sm text-primary">Host Stand Reception</h5>
                <p className="text-[11px] text-textMuted">Expedited host greeting with your digital VIP QR pass.</p>
              </div>

            </div>
          </div>
        )}

        {/* ==================== NAVIGATION TABS ==================== */}
        <div className="flex items-center gap-2 border-b border-gray-200/90 overflow-x-auto pb-3 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.01]'
                : 'text-textMuted hover:text-primary hover:bg-white bg-surface-container-low/50'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Overview & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'reservations'
                ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.01]'
                : 'text-textMuted hover:text-primary hover:bg-white bg-surface-container-low/50'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>My Bookings</span>
            <span className="w-5 h-5 rounded-full bg-accent text-white text-[10px] flex items-center justify-center font-bold">
              {userReservations.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'preferences'
                ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.01]'
                : 'text-textMuted hover:text-primary hover:bg-white bg-surface-container-low/50'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-accent" />
            <span>Dining Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.01]'
                : 'text-textMuted hover:text-primary hover:bg-white bg-surface-container-low/50'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Order Receipts</span>
            <span className="w-5 h-5 rounded-full bg-gray-200 text-primary text-[10px] flex items-center justify-center font-bold">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'favorites'
                ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.01]'
                : 'text-textMuted hover:text-primary hover:bg-white bg-surface-container-low/50'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Saved Dishes</span>
            <span className="w-5 h-5 rounded-full bg-gray-200 text-primary text-[10px] flex items-center justify-center font-bold">
              {favoriteItems.length}
            </span>
          </button>
        </div>

        {/* ==================== TAB CONTENT: OVERVIEW ==================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* 3 Gastronomy Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white rounded-3xl p-6 border border-[#e8e4dc] shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-accent flex items-center justify-center border border-amber-200">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-textMuted">DEGUSTATIONS ATTENDED</span>
                  <h4 className="font-heading text-2xl font-bold text-primary">8 Grand Dinners</h4>
                  <p className="text-[11px] text-emerald-700 font-semibold">100% 5-Star Experience Rating</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#e8e4dc] shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                  <Wine className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-textMuted">CELLAR SELECTION AFFINITY</span>
                  <h4 className="font-heading text-2xl font-bold text-primary">Barolo & Brunello</h4>
                  <p className="text-[11px] text-textMuted">14 Rare Reserve Vintages Tasted</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#e8e4dc] shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                  <Utensils className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-textMuted">FAVORITE SEATING SPOT</span>
                  <h4 className="font-heading text-2xl font-bold text-primary">Chef's Table T-16</h4>
                  <p className="text-[11px] text-textMuted">Front-row kitchen fire view</p>
                </div>
              </div>

            </div>

            {/* Exclusive Member Gala Invite Banner */}
            <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-primary via-[#012f26] to-[#011a15] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 relative overflow-hidden">
              <div className="space-y-2 relative z-10 max-w-2xl">
                <span className="text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-accent text-white shadow-sm inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>VIP MEMBER EXCLUSIVE • OCTOBER 28</span>
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  Autumn White Truffle & Barolo Reserve Gala
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Join Executive Chef Elias Thorne and Master Sommelier Lucas Vance for a 7-course Alba white truffle degustation with rare single-vineyard Barolo vintages.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsBookingOpen(true);
                  showToast('Gala Seat Reserved', 'Selected Chef Table allocation for Oct 28.');
                }}
                className="btn-shimmer bg-accent hover:bg-orange-600 active:scale-95 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-lg shadow-accent/30 whitespace-nowrap transition-all"
              >
                RSVP PRIVATE GALA
              </button>
            </div>

          </div>
        )}

        {/* ==================== TAB CONTENT: RESERVATIONS ==================== */}
        {activeTab === 'reservations' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary">Your Table Reservations</h2>
                <p className="text-xs text-textMuted">Manage your upcoming and past bookings, host allocations, and special requests.</p>
              </div>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="btn-shimmer bg-accent hover:bg-orange-600 text-white font-bold text-xs uppercase px-5 py-3 rounded-full shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Reservation</span>
              </button>
            </div>

            {userReservations.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300 space-y-4">
                <Calendar className="w-10 h-10 text-accent mx-auto" />
                <h3 className="font-heading text-xl font-bold text-primary">No Table Reservations Found</h3>
                <p className="text-xs text-textMuted max-w-md mx-auto">
                  You have no active table reservations. Reserve your seats at the Chef's Counter or Sommelier Vault today.
                </p>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="bg-primary text-white font-bold text-xs uppercase px-6 py-3 rounded-full shadow-sm"
                >
                  Book A Table Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userReservations.map((res) => (
                  <div key={res.id} className="bg-white rounded-3xl p-6 border border-[#e8e4dc] shadow-sm space-y-4 flex flex-col justify-between group hover:shadow-md transition-all">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-accent bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                          {res.diningArea || "Chef's Counter"}
                        </span>
                        <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                          res.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {res.status}
                        </span>
                      </div>

                      <h4 className="font-heading text-xl font-bold text-primary">
                        {res.guests} Guests • {res.time}
                      </h4>

                      <div className="grid grid-cols-2 gap-2 text-xs text-textMuted pt-1">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-accent" />
                          <span>{res.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                          <span>Table T-16 Assigned</span>
                        </div>
                      </div>

                      {res.specialRequests && (
                        <p className="text-xs text-textMuted bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          <span className="font-bold text-primary">Note:</span> {res.specialRequests}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => setShowQRModal(true)}
                        className="text-accent hover:underline font-bold flex items-center gap-1"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>View Digital Pass</span>
                      </button>

                      <button
                        onClick={() => cancelReservation(res.id)}
                        className="text-red-600 hover:underline font-semibold"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB CONTENT: DINING PREFERENCES (NEW INTERACTIVE FEATURE) ==================== */}
        {activeTab === 'preferences' && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#e8e4dc] shadow-sm space-y-8 animate-fadeIn">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  CULINARY PROFILE
                </span>
                <span className="text-xs text-textMuted">Tailored for Every Seating</span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-primary mt-1">Diner Taste & Service Preferences</h2>
              <p className="text-xs sm:text-sm text-textMuted mt-1">
                Our kitchen brigade and sommelier team review these settings prior to your arrival to personalize courses, water service, and cellar pairings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              
              {/* 1. Water Service Preference */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Coffee className="w-4 h-4 text-accent" />
                  <span>Complimentary Table Water Service</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {waterOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setPreferences({ ...preferences, waterService: opt })}
                      className={`py-3 px-3 rounded-2xl text-xs font-bold border transition-all text-center ${
                        preferences.waterService === opt
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-surface-container-low/40 border-gray-200 text-textMain hover:border-accent'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Seating Preference */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>Preferred Dining Atmosphere</span>
                </label>
                <select
                  value={preferences.seatingPreference}
                  onChange={(e) => setPreferences({ ...preferences, seatingPreference: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 text-xs font-semibold text-primary bg-white outline-none cursor-pointer focus:border-primary"
                >
                  {seatingOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* 3. Sommelier & Truffle Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div
                onClick={() => setPreferences({ ...preferences, truffleEnthusiast: !preferences.truffleEnthusiast })}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                  preferences.truffleEnthusiast ? 'bg-amber-50/50 border-amber-300' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center mt-0.5 ${
                  preferences.truffleEnthusiast ? 'bg-accent text-white' : 'border border-gray-300 bg-white'
                }`}>
                  {preferences.truffleEnthusiast && <Check className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-primary">Truffle & Rare Mushroom Enthusiast</h4>
                  <p className="text-[11px] text-textMuted mt-0.5">Prompt server for seasonal fresh Alba truffle shaved tableside.</p>
                </div>
              </div>

              <div
                onClick={() => setPreferences({ ...preferences, sommelierPairingDefault: !preferences.sommelierPairingDefault })}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                  preferences.sommelierPairingDefault ? 'bg-amber-50/50 border-amber-300' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center mt-0.5 ${
                  preferences.sommelierPairingDefault ? 'bg-accent text-white' : 'border border-gray-300 bg-white'
                }`}>
                  {preferences.sommelierPairingDefault && <Check className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-primary">Default Sommelier Pairing Protocol</h4>
                  <p className="text-[11px] text-textMuted mt-0.5">Automatically include reserve glass pairings with tasting degustations.</p>
                </div>
              </div>

            </div>

            {/* 4. Dietary Restrictions & Allergies */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Allergies & Dietary Restrictions (Strictly Observed)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {['Shellfish Sensitive', 'Gluten-Free', 'Nut Allergy', 'Lactose Sensitive', 'Vegetarian', 'Kosher Style'].map((item) => {
                  const isSelected = preferences.dietaryRestrictions.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggleDietary(item)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-primary text-white border-primary shadow-xs'
                          : 'bg-white border-gray-200 text-textMuted hover:border-gray-400'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Sommelier Private Notes */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Wine className="w-4 h-4 text-accent" />
                <span>Private Notes for Sommelier & Kitchen Line</span>
              </label>
              <textarea
                rows={3}
                value={preferences.sommelierNotes}
                onChange={(e) => setPreferences({ ...preferences, sommelierNotes: e.target.value })}
                placeholder="Share preferred wine varietals, favorite culinary regions, or dining pacing..."
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 text-xs text-primary outline-none focus:border-primary resize-none"
              ></textarea>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-textMuted">Preferences sync with your digital host stand check-in pass.</span>
              <button
                onClick={handleSavePreferences}
                className="btn-shimmer bg-primary hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md active:scale-95 transition-all"
              >
                Save Dining Preferences
              </button>
            </div>

          </div>
        )}

        {/* ==================== TAB CONTENT: ORDER RECEIPTS ==================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary">Dining Receipts & Billing</h2>
              <p className="text-xs text-textMuted">View your itemized dining receipts, seasonal orders, and digital tax invoices.</p>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300 space-y-4">
                <ShoppingBag className="w-10 h-10 text-accent mx-auto" />
                <h3 className="font-heading text-xl font-bold text-primary">No Past Orders Found</h3>
                <p className="text-xs text-textMuted max-w-md mx-auto">Explore our autumn harvest collection and place an artisanal delivery order.</p>
                <button
                  onClick={() => navigateTo('menu')}
                  className="bg-primary text-white font-bold text-xs uppercase px-6 py-3 rounded-full shadow-sm"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8e4dc] shadow-sm space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                      <div>
                        <span className="text-[10px] uppercase font-mono font-bold text-textMuted">INVOICE #{order.id}</span>
                        <h4 className="font-heading text-xl font-bold text-primary mt-0.5">
                          {order.date} • {order.items?.length || 0} Culinary Courses
                        </h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-extrabold uppercase border border-emerald-200">
                          {order.status || 'Settled'}
                        </span>
                        <span className="text-xl font-bold text-primary">${order.total?.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Items Breakdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-accent">{item.quantity}x</span>
                            <span className="font-semibold text-primary">{item.name}</span>
                          </div>
                          <span className="font-bold text-textMuted">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <span className="text-[11px] text-textMuted font-medium">
                        Rewarded +{Math.round(order.total || 50)} VIP Loyalty Points
                      </span>
                      <button
                        onClick={() => setSelectedReceipt(order)}
                        className="text-xs font-bold text-accent hover:text-orange-600 flex items-center gap-1.5 transition-colors"
                      >
                        <Receipt className="w-4 h-4" />
                        <span>View Itemized Bill & Download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB CONTENT: SAVED FAVORITES ==================== */}
        {activeTab === 'favorites' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary">Saved Chef Signatures</h2>
              <p className="text-xs text-textMuted">Re-order your favorite recipes or inspect sommelier tasting notes.</p>
            </div>

            {favoriteItems.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300 space-y-4">
                <Heart className="w-10 h-10 text-rose-500 mx-auto" />
                <h3 className="font-heading text-xl font-bold text-primary">No Favorites Saved Yet</h3>
                <p className="text-xs text-textMuted max-w-md mx-auto">Tap the heart icon on any recipe in the menu to pin it here.</p>
                <button
                  onClick={() => navigateTo('menu')}
                  className="bg-primary text-white font-bold text-xs uppercase px-6 py-3 rounded-full shadow-sm"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteItems.map((dish) => (
                  <div key={dish.id} className="bg-white rounded-3xl overflow-hidden border border-[#e8e4dc] shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md rounded-full px-3.5 py-1 text-xs font-bold text-accent shadow-md">
                        ${dish.price.toFixed(2)}
                      </div>
                      <div className="absolute top-3 left-3 bg-primary/90 text-white backdrop-blur-md rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        {dish.category}
                      </div>
                    </div>

                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-heading text-xl font-bold text-primary">{dish.name}</h4>
                        <p className="text-xs text-textMuted line-clamp-2 mt-1 leading-relaxed">{dish.description}</p>
                      </div>

                      <button
                        onClick={() => {
                          addToCart(dish);
                          showToast('Added to Order', `${dish.name} added to cart.`);
                        }}
                        className="w-full bg-primary hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                      >
                        <Plus className="w-4 h-4 text-accent" />
                        <span>Order Again</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ==================== DIGITAL HOST STAND QR MODAL ==================== */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-modal-backdrop">
          <div className="bg-white rounded-3xl max-w-sm w-full p-8 text-center space-y-6 shadow-2xl border border-gray-100 relative animate-modal-pop">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                ✦ DIGITAL DINING PASS ✦
              </span>
              <h3 className="font-heading text-2xl font-bold text-primary">{user?.name || 'Alexander Wright'}</h3>
              <p className="text-xs text-textMuted">Present this pass to the host stand upon arrival for expedited VIP seating.</p>
            </div>

            {/* Simulated QR Code Canvas */}
            <div className="bg-[#f8f6f2] p-6 rounded-2xl border border-gray-200 mx-auto w-48 h-48 flex items-center justify-center shadow-inner">
              <QrCode className="w-36 h-36 text-primary" />
            </div>

            <div className="text-[11px] text-textMuted bg-gray-50 p-3 rounded-xl border border-gray-200/60">
              <span className="font-bold text-primary block">Table T-16 Assigned</span>
              <span>Water: {preferences.waterService} • Pairing: Sommelier Select</span>
            </div>

            <button
              onClick={() => setShowQRModal(false)}
              className="w-full bg-primary hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-full shadow-md transition-all"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}

      {/* ==================== ITEMIZED BILL & RECEIPT MODAL ==================== */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-modal-backdrop">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl border border-gray-100 relative animate-modal-pop">
            <div className="text-center space-y-1 pb-4 border-b border-gray-200">
              <span className="font-script text-3xl text-accent">Flavoro</span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-textMuted">Official Gastronomic Receipt</p>
              <p className="text-xs font-mono text-gray-500">Invoice #{selectedReceipt.id} • {selectedReceipt.date}</p>
            </div>

            {/* Line Items */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {selectedReceipt.items?.map((it, idx) => (
                <div key={idx} className="flex justify-between text-xs py-1 border-b border-gray-50">
                  <span className="text-primary font-medium">{it.quantity}x {it.name}</span>
                  <span className="font-bold text-primary">${(it.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="pt-3 border-t border-gray-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-textMuted">
                <span>Subtotal</span>
                <span>${(selectedReceipt.total * 0.85).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-textMuted">
                <span>Gratuity & Sommelier Service (15%)</span>
                <span>${(selectedReceipt.total * 0.15).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-primary pt-2 border-t border-gray-200">
                <span>Total Settled</span>
                <span className="text-accent">${selectedReceipt.total?.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  showToast('Downloaded', 'PDF invoice saved to downloads folder.');
                  setSelectedReceipt(null);
                }}
                className="flex-1 bg-primary hover:bg-emerald-950 text-white font-bold text-xs uppercase py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-accent" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-5 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
