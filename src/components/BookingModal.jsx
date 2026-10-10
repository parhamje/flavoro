import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Calendar,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  MapPin,
  Utensils,
  Wine,
  Trees,
  ChefHat,
  ArrowRight,
  ArrowLeft,
  CalendarCheck
} from 'lucide-react';

export default function BookingModal() {
  const { isBookingOpen, setIsBookingOpen, addReservation, user, navigateTo } = useApp();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '19:30',
    guests: 2,
    area: "Chef's Table",
    customerName: user?.name || '',
    customerEmail: user?.email || '',
    customerPhone: '+1 (555) 234-5678',
    occasion: 'Anniversary Dinner',
    notes: ''
  });

  const [confirmedReservation, setConfirmedReservation] = useState(null);

  if (!isBookingOpen) return null;

  const handleClose = () => {
    setIsBookingOpen(false);
    setStep(1);
    setConfirmedReservation(null);
  };

  const diningAreas = [
    {
      id: "Chef's Table",
      title: "Chef's Table",
      desc: "Front-row interactive kitchen counter experience",
      icon: ChefHat,
      extra: "Popular"
    },
    {
      id: "Main Dining Room",
      title: "Main Dining Room",
      desc: "Warm ambient chandeliers and plush banquet seating",
      icon: Utensils,
      extra: "Classic"
    },
    {
      id: "Garden Terrace",
      title: "Garden Terrace",
      desc: "Al fresco breeze under botanical fairy lights",
      icon: Trees,
      extra: "Outdoor"
    },
    {
      id: "Wine Cellar Room",
      title: "Wine Cellar Room",
      desc: "Intimate vintage cellar surrounded by reserve vintages",
      icon: Wine,
      extra: "Exclusive"
    }
  ];

  const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
    '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  const occasions = [
    'Casual Dining',
    'Anniversary Dinner',
    'Birthday Celebration',
    'Business Dinner',
    'Romantic Date',
    'Special Gathering'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const created = addReservation(formData);
    setConfirmedReservation(created);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-modal-backdrop">
      <div className="bg-surface rounded-3xl shadow-2xl border border-gray-100 w-full max-w-2xl overflow-hidden relative max-h-[90vh] flex flex-col animate-modal-pop">
        
        {/* Modal Header */}
        <div className="bg-primary text-white p-6 md:p-8 relative overflow-hidden flex-shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <span className="font-script text-2xl text-accent block leading-none">Flavoro</span>
                <h3 className="font-heading text-2xl text-white font-bold">Reserve a Table</h3>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper indicator */}
          {step < 3 && (
            <div className="flex items-center gap-3 mt-6 text-xs font-semibold tracking-wider relative z-10">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-accent' : 'text-white/40'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs ${
                  step >= 1 ? 'border-accent bg-accent text-white font-bold' : 'border-white/40 text-white/40'
                }`}>1</span>
                <span>Time & Area</span>
              </div>
              <div className="h-px bg-white/20 flex-1"></div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-accent' : 'text-white/40'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs ${
                  step >= 2 ? 'border-accent bg-accent text-white font-bold' : 'border-white/40 text-white/40'
                }`}>2</span>
                <span>Guest Details</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 text-textMain bg-[#fdfbf7]">
          {step === 1 && (
            <div className="space-y-6">
              {/* Date & Guests Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-2">
                    Select Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-primary focus:ring-2 focus:ring-accent focus:outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-2">
                    Party Size
                  </label>
                  <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, guests: Math.max(1, formData.guests - 1) })}
                      className="w-8 h-8 rounded-lg bg-surface-container hover:bg-gray-200 text-primary font-bold flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <div className="flex items-center gap-2 font-bold text-primary text-sm">
                      <Users className="w-4 h-4 text-accent" />
                      <span>{formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, guests: Math.min(16, formData.guests + 1) })}
                      className="w-8 h-8 rounded-lg bg-surface-container hover:bg-gray-200 text-primary font-bold flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-2">
                  Select Seating Time
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((time) => {
                    const isSelected = formData.time === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData({ ...formData, time })}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all text-center border ${
                          isSelected
                            ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                            : 'bg-white text-textMain border-gray-200 hover:border-accent hover:bg-amber-50/50'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Seating Area Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-2">
                  Choose Atmosphere / Dining Area
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {diningAreas.map((area) => {
                    const Icon = area.icon;
                    const isSelected = formData.area === area.id;
                    return (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, area: area.id })}
                        className={`p-3.5 rounded-2xl border text-left transition-all relative flex items-start gap-3 ${
                          isSelected
                            ? 'bg-primary/5 border-primary shadow-sm'
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-primary text-white' : 'bg-surface-container text-textMuted'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-primary">{area.title}</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-accent/10 text-accent">
                              {area.extra}
                            </span>
                          </div>
                          <p className="text-[11px] text-textMuted mt-0.5 leading-tight">{area.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-accent hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg flex items-center gap-2 transition-transform active:scale-95"
                >
                  <span>Continue to Guest Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-gray-200 mb-4 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="text-textMuted uppercase font-bold text-[10px]">Booking Summary</span>
                  <p className="font-bold text-primary text-sm">
                    {formData.date} at {formData.time}
                  </p>
                  <p className="text-textMuted">{formData.guests} Guests • {formData.area}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-accent hover:underline font-bold text-xs"
                >
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alexander Wright"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-accent focus:outline-none shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-accent focus:outline-none shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-accent focus:outline-none shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1.5">
                    Dining Occasion
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-accent focus:outline-none shadow-sm"
                  >
                    {occasions.map((occ) => (
                      <option key={occ} value={occ}>{occ}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1.5">
                  Special Dietary Requirements or Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Allergies, high chair needed, table preference, anniversary dessert candle..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-accent focus:outline-none shadow-sm"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-full text-xs font-bold text-textMuted hover:text-primary flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-forest text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg flex items-center gap-2 transition-transform active:scale-95"
                >
                  <CalendarCheck className="w-4 h-4 text-accent" />
                  <span>Confirm Reservation</span>
                </button>
              </div>
            </form>
          )}

          {step === 3 && confirmedReservation && (
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-accent font-bold">Reservation Confirmed</span>
                <h3 className="font-heading text-3xl text-primary font-bold">We look forward to hosting you!</h3>
                <p className="text-sm text-textMuted max-w-md mx-auto">
                  A confirmation email has been sent to <span className="font-semibold text-primary">{confirmedReservation.customerEmail}</span>.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 max-w-md mx-auto text-left shadow-sm space-y-3 text-xs">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-textMuted">Booking Reference</span>
                  <span className="font-bold text-primary font-mono text-sm">{confirmedReservation.id}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-textMuted">Date & Time</span>
                  <span className="font-bold text-primary">{confirmedReservation.date} at {confirmedReservation.time}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-textMuted">Party Size & Area</span>
                  <span className="font-bold text-primary">{confirmedReservation.guests} Guests ({confirmedReservation.area})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textMuted">Assigned Table</span>
                  <span className="font-bold text-accent">{confirmedReservation.tableNumber}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => {
                    handleClose();
                    navigateTo('user-dashboard');
                  }}
                  className="bg-primary hover:bg-primary-forest text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  View in My Reservations
                </button>
                <button
                  onClick={handleClose}
                  className="bg-surface border border-gray-300 hover:border-primary text-primary px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
