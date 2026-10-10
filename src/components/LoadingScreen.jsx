import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function LoadingScreen({ onComplete, autoExit = true }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Smooth, cinematic liquid gold filling progression (~2.8s)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (autoExit) {
            setTimeout(() => {
              setIsExiting(true);
              setTimeout(() => {
                if (onComplete) onComplete();
              }, 700);
            }, 400);
          }
          return 100;
        }

        // Natural smooth pacing
        const step = prev < 20 ? 3 : prev < 65 ? 2 : prev < 90 ? 1 : 2;
        return Math.min(100, prev + step);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [autoExit, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center text-white select-none transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Centerpiece: Minimal Cloche & Text-Filled Progress Bar */}
      <div className="relative flex flex-col items-center justify-center space-y-8 max-w-sm w-full px-6">
        
        {/* Bespoke Cloche with Ambient Spotlight Blend */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden flex items-center justify-center animate-float">
          <img
            src="./assets/minimal_gold_cloche.jpg"
            alt="Flavoro Haute Gastronomy"
            className="w-full h-full object-cover mix-blend-screen"
          />
          {/* Spotlight vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        </div>

        {/* ==================== PROGRESS BAR EMBEDDED IN RESTAURANT NAME ==================== */}
        <div className="flex flex-col items-center justify-center space-y-3">
          
          {/* Dual Layer Restaurant Name Progress Bar */}
          <div className="relative inline-block select-none py-1">
            
            {/* 1. Base Layer: Dim Outline / Silhouette */}
            <span className="font-script text-6xl sm:text-7xl font-normal text-white/10 tracking-wide block">
              Flavoro
            </span>

            {/* 2. Top Layer: Liquid Gold Progressive Fill (Clipped to progress %) */}
            <div
              className="absolute inset-0 overflow-hidden whitespace-nowrap transition-all duration-100 ease-out pointer-events-none"
              style={{ width: `${progress}%` }}
            >
              <span className="font-script text-6xl sm:text-7xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-accent tracking-wide block drop-shadow-[0_0_20px_rgba(252,143,52,0.85)]">
                Flavoro
              </span>

              {/* Leading Glow Particle on Current Fill Edge */}
              {progress > 0 && progress < 100 && (
                <span className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-10 bg-amber-200 rounded-full blur-[2px] shadow-[0_0_12px_#fff]"></span>
              )}
            </div>

          </div>

          {/* Minimalist Subtitle & Percentage Progress */}
          <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] text-white/40 uppercase font-mono">
            <span>HAUTE GASTRONOMY</span>
            <span>•</span>
            <span className="text-amber-300 font-bold tracking-widest">{progress}%</span>
          </div>

        </div>

      </div>

    </div>
  );
}
