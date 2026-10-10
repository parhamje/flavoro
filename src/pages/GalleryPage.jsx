import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Sparkles,
  Heart,
  ZoomIn,
  Utensils,
  Wine,
  Camera,
  CalendarDays,
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';
import { INITIAL_GALLERY } from '../data/restaurantData';

export default function GalleryPage() {
  const { setLightboxItem, setIsBookingOpen } = useApp();
  const [activeTab, setActiveTab] = useState('all');

  useScrollReveal(activeTab);

  const categories = [
    { id: 'all', label: 'All Moments', count: INITIAL_GALLERY.length },
    { id: 'dishes', label: 'Artisanal Plates', count: INITIAL_GALLERY.filter(g => g.category === 'dishes').length },
    { id: 'drinks', label: 'Craft Cocktails', count: INITIAL_GALLERY.filter(g => g.category === 'drinks').length },
    { id: 'ambiance', label: 'Dining Ambiance', count: INITIAL_GALLERY.filter(g => g.category === 'ambiance').length }
  ];

  const filteredItems = activeTab === 'all'
    ? INITIAL_GALLERY
    : INITIAL_GALLERY.filter((item) => item.category === activeTab);

  return (
    <div className="pt-24 pb-28 min-h-screen bg-[#fdfbf7] text-textMain selection:bg-accent selection:text-white">
      
      {/* ===================== HERO GALLERY HEADER ===================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-br from-primary via-[#012f26] to-[#011a15] rounded-3xl md:rounded-[2.5rem] p-8 sm:p-12 lg:p-14 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
          
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-4 max-w-2xl text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-extrabold tracking-widest uppercase text-accent">
              <Sparkles className="w-3.5 h-3.5" />
              <span>✦ Visual Gastronomy & Moments ✦</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              The Photographic Journal.
            </h1>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
              Step inside our world of culinary artistry, vintage wine cellars, open kitchen fire, and candlelit hospitality. Every plate tells a story of passion and heritage.
            </p>
          </div>

          {/* Sourcing & Michelin Seal */}
          <div className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl text-center space-y-2 relative z-10 w-full md:w-auto flex-shrink-0">
            <Award className="w-8 h-8 text-amber-300 animate-pulse" />
            <span className="font-heading text-xl font-bold text-white">Curated Gallery</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-accent">High-Resolution Showcase</span>
          </div>

        </div>
      </section>

      {/* ===================== FILTER TABS ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`group px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 transform flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105 border border-primary'
                    : 'bg-white text-textMuted hover:text-primary hover:bg-gray-100 hover:scale-102 border border-gray-200/90'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full transition-colors ${
                  isActive ? 'bg-accent text-white' : 'bg-surface-container-high text-primary'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ===================== GALLERY GRID ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div key={activeTab} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 animate-fadeIn">
          {filteredItems.map((item, idx) => {
            const staggerDelay = (idx % 3) === 0 ? 'delay-100' : (idx % 3) === 1 ? 'delay-200' : 'delay-300';
            return (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className={`reveal-scale ${staggerDelay} aspect-[4/3] overflow-hidden rounded-3xl group relative cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/60 bg-surface-container`}
              >
                {/* Image */}
                <img
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                  src={item.image}
                />

                {/* Shimmer Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">
                  
                  {/* Top Zoom Icon */}
                  <div className="self-end w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <ZoomIn className="w-5 h-5 text-accent transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  </div>

                  {/* Caption */}
                  <div className="transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-accent font-extrabold px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm inline-block border border-accent/30">
                      {item.category}
                    </span>
                    <h4 className="font-heading text-lg font-bold drop-shadow-md">
                      {item.title}
                    </h4>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== BOTTOM RESERVATION BANNER ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-r from-surface-container to-amber-50/50 rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent">JOIN US FOR DINNER</span>
            <h3 className="font-heading text-3xl font-bold text-primary">Experience It In Person</h3>
            <p className="text-xs sm:text-sm text-textMuted leading-relaxed">
              Join us tonight for artisanal pasta, dry-aged steaks, and sommelier vintage pairings.
            </p>
          </div>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="btn-shimmer bg-primary hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md flex items-center gap-2 whitespace-nowrap"
          >
            <CalendarDays className="w-4 h-4 text-accent" />
            <span>Reserve A Table Now</span>
          </button>
        </div>
      </section>

    </div>
  );
}
