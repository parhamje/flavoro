import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ZoomIn, CalendarDays, Heart } from 'lucide-react';

export default function LightboxModal() {
  const { lightboxItem, setLightboxItem, setIsBookingOpen } = useApp();

  if (!lightboxItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-modal-backdrop">
      <div className="relative max-w-4xl w-full bg-surface rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-modal-pop flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => setLightboxItem(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Display */}
        <div className="md:w-3/5 bg-black flex items-center justify-center relative min-h-[320px] md:min-h-[460px]">
          <img
            src={lightboxItem.image}
            alt={lightboxItem.title || 'Flavoro Photography'}
            className="w-full h-full object-cover max-h-[70vh]"
          />
        </div>

        {/* Info Column */}
        <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-surface text-textMain">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                {lightboxItem.category || 'Culinary Art'}
              </span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-primary">
              {lightboxItem.title || 'Artisanal Preparation'}
            </h3>

            <p className="text-xs text-textMuted leading-relaxed">
              {lightboxItem.description ||
                'Every dish and ambiance at Flavoro is meticulously composed using farm-fresh ingredients and century-old culinary techniques.'}
            </p>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setLightboxItem(null);
                setIsBookingOpen(true);
              }}
              className="w-full bg-accent hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>
            <button
              onClick={() => setLightboxItem(null)}
              className="w-full bg-surface-container hover:bg-gray-200 text-primary font-bold text-xs uppercase tracking-wider py-3 rounded-full transition-colors"
            >
              Back to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
