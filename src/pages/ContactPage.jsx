import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  CalendarDays,
  Sparkles
} from 'lucide-react';

export default function ContactPage() {
  const { showToast, setIsBookingOpen } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Message Sent!', 'Our concierge team will respond within 24 hours.');
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="pt-24 pb-24 min-h-screen">
      
      {/* ===================== CONTACT HERO ===================== */}
      <section className="text-center py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-accent">GET IN TOUCH</span>
        <h1 className="font-heading text-5xl sm:text-6xl font-bold text-primary tracking-tight">
          We would love to hear from you.
        </h1>
        <p className="text-textMuted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Whether you are looking to book an intimate private celebration, inquire about seasonal wine pairings, or simply say hello, our hospitality team is here for you.
        </p>
      </section>

      {/* ===================== MAIN GRID ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Details Sidebar */}
          <div className="lg:col-span-4 bg-primary text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Visit Us */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-accent font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Visit Us</span>
              </div>
              <p className="font-heading text-xl font-bold text-white">Epicurean District</p>
              <p className="text-xs text-white/70 leading-relaxed">
                123 Food Street, Gourmet Quarter<br />
                Yummy City, FC 12345
              </p>
            </div>

            {/* Contact Numbers */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 text-accent font-bold text-xs uppercase tracking-wider">
                <Phone className="w-4 h-4" />
                <span>Direct Contact</span>
              </div>
              <p className="text-xs text-white/80">+1 234 567 8900 (Reservations)</p>
              <p className="text-xs text-white/80">+1 234 567 8901 (Private Events)</p>
              <p className="text-xs text-accent mt-1">concierge@flavororestaurant.com</p>
            </div>

            {/* Hours */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 text-accent font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Service Hours</span>
              </div>
              <div className="space-y-1 text-xs text-white/80">
                <div className="flex justify-between">
                  <span>Mon - Thu:</span>
                  <span className="font-semibold text-white">5:00 PM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Fri - Sat:</span>
                  <span className="font-semibold text-white">5:00 PM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold text-white">4:00 PM - 9:00 PM</span>
                </div>
              </div>
            </div>

            {/* Reserve Quick Button */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-accent hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-full shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <CalendarDays className="w-4 h-4" />
                <span>Book a Table Online</span>
              </button>
            </div>

          </div>

          {/* Right: Message & Private Event Inquiry Form */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
            <h3 className="font-heading text-3xl font-bold text-primary mb-2">Send an Inquiry</h3>
            <p className="text-xs text-textMuted mb-8">
              Fill out the form below and our head concierge will get in touch with you shortly.
            </p>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-heading text-xl font-bold text-emerald-900">Thank You!</h4>
                <p className="text-xs text-emerald-800">Your message has been received. We will get back to you promptly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-surface-container-low border border-transparent focus:border-accent rounded-2xl px-4 py-3.5 text-xs text-primary font-semibold focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-surface-container-low border border-transparent focus:border-accent rounded-2xl px-4 py-3.5 text-xs text-primary font-semibold focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-surface-container-low border border-transparent focus:border-accent rounded-2xl px-4 py-3.5 text-xs text-primary font-semibold focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-2">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-surface-container-low border border-transparent focus:border-accent rounded-2xl px-4 py-3.5 text-xs text-primary font-semibold focus:outline-none transition-colors"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Private Dining / Buyout">Private Dining / Buyout</option>
                      <option value="Chef's Table Booking">Chef's Table Experience</option>
                      <option value="Wine Cellar Tasting">Wine Cellar Tasting</option>
                      <option value="Press & Media">Press & Media</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-2">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your event date, estimated guests, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-surface-container-low border border-transparent focus:border-accent rounded-2xl p-4 text-xs text-primary font-semibold focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-forest text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg flex items-center gap-2 transition-transform active:scale-95"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4 text-accent" />
                </button>

              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}
