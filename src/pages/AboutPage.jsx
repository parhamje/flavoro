import React from 'react';
import { useApp } from '../context/AppContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Sparkles,
  CalendarDays,
  Recycle,
  Droplets,
  Sprout,
  Flame,
  Award,
  ArrowRight,
  Leaf
} from 'lucide-react';

export default function AboutPage() {
  const { setIsBookingOpen } = useApp();

  // Trigger scroll reveal observer
  useScrollReveal();

  return (
    <div className="pt-20 min-h-screen">
      
      {/* ===================== HERITAGE HERO ===================== */}
      <section className="relative min-h-[580px] flex items-center py-20 bg-primary text-white overflow-hidden">
        {/* Background photo blend */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url('./assets/restaurant_hall.jpg')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6 animate-fadeIn">
            <span className="text-xs uppercase font-bold tracking-widest text-accent">OUR HERITAGE</span>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Rooted in tradition.<br />
              <span className="text-secondary-container font-heading italic">Cultivated with passion.</span>
            </h1>
            <div className="space-y-4 text-white/80 font-light text-base leading-relaxed max-w-2xl">
              <p>
                Flavoro was born from a timeless conviction: that the most profound culinary experiences begin long before the kitchen fires are lit. Our narrative is etched into the fertile soils of local heritage farms, whispered in seasonal harvests, and crafted with meticulous devotion.
              </p>
              <p>
                We are not merely a dining venue; we are a homage to the earth's purest bounty. Every dish is an intimate dialogue between ancestral gastronomy and modern innovation, presented in an ambiance of unhurried elegance.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block animate-fadeIn">
            <div className="relative w-full aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl bg-surface-container border-2 border-white/20">
              <img
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                alt="Flavoro Farm Produce"
                src="./assets/burrata.jpg"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ===================== PHILOSOPHY & SOURCING (SCROLL REVEAL) ===================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Asymmetric Image Collage */}
          <div className="reveal-left lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-lg bg-surface-container card-hover-lift">
                <img
                  className="w-full h-full object-cover"
                  alt="Precision culinary plating"
                  src="./assets/pasta.jpg"
                />
              </div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg bg-surface-container card-hover-lift">
                <img
                  className="w-full h-full object-cover"
                  alt="Farm to table cuisine"
                  src="./assets/hero_dish_salad.jpg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg bg-surface-container card-hover-lift">
                <img
                  className="w-full h-full object-cover"
                  alt="Artisanal food craft"
                  src="./assets/salmon.jpg"
                />
              </div>
              <div className="aspect-square rounded-3xl shadow-lg bg-primary text-white flex flex-col items-center justify-center p-6 text-center card-hover-lift">
                <span className="font-script text-2xl text-accent mb-1">Philosophy</span>
                <p className="font-heading text-lg italic leading-snug">
                  "Simplicity is the ultimate sophistication."
                </p>
              </div>
            </div>
          </div>

          {/* Right: Sourcing Philosophy Text */}
          <div className="reveal-right lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-3 text-accent text-xs font-bold tracking-widest uppercase">
              <span className="w-8 h-px bg-accent"></span>
              <span>OUR PHILOSOPHY</span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary">The Art of Sourcing.</h2>

            <p className="text-textMuted text-sm sm:text-base leading-relaxed">
              At Flavoro, we believe that exceptional cuisine requires uncompromising ingredients. Our philosophy is anchored in a relentless pursuit of the finest local produce, meats, and sustainable seafood, sourced directly from farmers and artisans who share our reverence for nature.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="reveal delay-100 card-hover-lift p-5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-accent flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-primary">Organic First</h4>
                <p className="text-xs text-textMuted leading-relaxed">
                  We partner exclusively with certified organic farms within a 50-mile radius to ensure peak freshness and nutrient density.
                </p>
              </div>

              <div className="reveal delay-200 card-hover-lift p-5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-accent flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-primary">Time-Honored Craft</h4>
                <p className="text-xs text-textMuted leading-relaxed">
                  From slow wood-fire roasting to 48-hour fermentation, we preserve the integrity of our ingredients through ancient methods.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== MEET THE CHEF (SCROLL REVEAL) ===================== */}
      <section className="py-16 bg-surface-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl md:rounded-[3rem] my-12 shadow-inner">
        <div className="reveal-scale grid grid-cols-1 lg:grid-cols-12 gap-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
          
          {/* Chef Photo */}
          <div className="lg:col-span-5 h-[420px] lg:h-auto">
            <img
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              alt="Executive Chef Elias Thorne"
              src="./assets/chef_portrait.jpg"
            />
          </div>

          {/* Chef Bio & Quote */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-6">
            <div>
              <span className="text-accent text-xs font-bold tracking-widest uppercase">THE VISIONARY</span>
              <h3 className="font-heading text-3xl sm:text-4xl font-bold text-primary mt-1">Elias Thorne</h3>
              <p className="text-xs uppercase tracking-wider font-semibold text-textMuted">Executive Chef & Culinary Director</p>
            </div>

            <p className="text-sm text-textMuted leading-relaxed">
              With over two decades of experience spanning Michelin-starred kitchens across Europe and specialized training in hyper-local foraging, Chef Elias Thorne brings a transformative vision to Flavoro.
            </p>

            <p className="text-sm text-textMuted leading-relaxed">
              His culinary philosophy is rooted in <span className="font-semibold text-primary">"elevated rusticity"</span>—taking the humblest of ingredients and coaxing out their most profound flavors through meticulous technique and unrestrained creativity.
            </p>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-script text-3xl text-primary">Elias Thorne</p>
                <p className="text-[10px] text-textMuted uppercase tracking-widest font-bold">Chef Signature</p>
              </div>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="btn-shimmer bg-accent hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-md flex items-center gap-2"
              >
                <span>Book Chef's Table</span>
                <CalendarDays className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== SUSTAINABILITY (SCROLL REVEAL) ===================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-accent text-xs font-bold tracking-widest uppercase">OUR COMMITMENT</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary">Sustainable Excellence.</h2>
          <p className="text-textMuted text-sm leading-relaxed">
            We recognize our responsibility to the environment and future generations. Our commitment to sustainability permeates every aspect of our culinary operation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="reveal delay-100 card-hover-lift bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Recycle className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-xl text-primary">Zero Waste Kitchen</h3>
            <p className="text-xs text-textMuted leading-relaxed">
              Through whole-ingredient utilization, comprehensive composting, and strict inventory controls, we maintain a near-zero waste kitchen.
            </p>
          </div>

          <div className="reveal delay-200 card-hover-lift bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Droplets className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-xl text-primary">Resource Conservation</h3>
            <p className="text-xs text-textMuted leading-relaxed">
              Our restaurant utilizes precision water-filtration systems and energy-efficient induction equipment to minimize our ecological footprint.
            </p>
          </div>

          <div className="reveal delay-300 card-hover-lift bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-accent flex items-center justify-center">
              <Sprout className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-xl text-primary">Regenerative Farming</h3>
            <p className="text-xs text-textMuted leading-relaxed">
              A portion of every meal goes toward subsidizing local organic family farms that practice regenerative soil cultivation.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
