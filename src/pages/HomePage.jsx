import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  UtensilsCrossed,
  ArrowRight,
  CalendarDays,
  Star,
  Heart,
  Leaf,
  ChefHat,
  BellRing,
  Sparkles,
  Bike,
  Clock,
  MapPin,
  Phone,
  Play,
  Award,
  Soup,
  Plus,
  Check,
  ZoomIn,
  Wine
} from 'lucide-react';
import VideoModal from '../components/VideoModal';
import { INITIAL_GALLERY } from '../data/restaurantData';

export default function HomePage() {
  const {
    navigateTo,
    setIsBookingOpen,
    menuItems,
    addToCart,
    favorites,
    toggleFavorite,
    setLightboxItem
  } = useApp();

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState('all');

  // Activate scroll observer on component mount and gallery tab changes
  useScrollReveal(activeGalleryTab);

  // Filter chef specials from menu
  const chefSpecials = menuItems.filter((item) => item.isSpecial);

  // Gallery filtering
  const filteredGallery = activeGalleryTab === 'all'
    ? INITIAL_GALLERY
    : INITIAL_GALLERY.filter((item) => item.category === activeGalleryTab);

  return (
    <div className="pt-20 min-h-screen">
      
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative overflow-hidden pt-8 pb-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Background ambient accents */}
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column: Headline & CTAs */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left animate-fadeIn">
            
            {/* Tagline pill */}
            <div className="inline-flex items-center gap-3 text-xs font-bold tracking-widest text-primary uppercase bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10 transition-transform hover:scale-105">
              <span>GOOD FOOD</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></span>
              <span>GOOD MOOD</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] tracking-tight">
              Delicious Food <br />
              <span className="font-heading italic gold-gradient-text">Made With Love</span>
            </h1>

            {/* Heart Divider with realistic Heartbeat */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-accent py-1">
              <div className="h-px bg-primary/20 flex-grow max-w-[48px]"></div>
              <div className="animate-heartbeat">
                <Heart className="w-5 h-5 fill-accent text-accent drop-shadow-sm" />
              </div>
              <div className="h-px bg-primary/20 flex-grow max-w-[48px]"></div>
            </div>

            {/* Sub-text */}
            <p className="text-textMuted text-base sm:text-lg max-w-lg mx-auto lg:mx-0 font-normal leading-relaxed">
              Experience the perfect blend of taste, quality & passion in every bite. Artisanal recipes prepared with organic, farm-to-table ingredients.
            </p>

            {/* Action Buttons with Shimmer sweep */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={() => navigateTo('menu')}
                className="btn-shimmer bg-accent hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-accent/25 hover:shadow-accent/40 flex items-center gap-2.5 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                <span>EXPLORE MENU</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="btn-shimmer bg-white border border-gray-300 hover:border-primary text-primary font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-sm hover:shadow-md flex items-center gap-2.5 transition-all transform hover:-translate-y-1"
              >
                <span>RESERVE NOW</span>
                <CalendarDays className="w-4 h-4 text-accent" />
              </button>
            </div>

            {/* Social Proof Avatars & Rating */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <div className="flex -space-x-3">
                <img
                  alt="Customer 1"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm transition-transform hover:scale-110 hover:z-30 cursor-pointer"
                  src="./assets/avatar_diner1.jpg"
                />
                <img
                  alt="Customer 2"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm transition-transform hover:scale-110 hover:z-30 cursor-pointer"
                  src="./assets/avatar_user.jpg"
                />
                <img
                  alt="Customer 3"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm transition-transform hover:scale-110 hover:z-30 cursor-pointer"
                  src="./assets/avatar_diner3.jpg"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 font-bold text-base text-primary">
                  <span>4.9 / 5</span>
                  <div className="flex text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                </div>
                <p className="text-[11px] text-textMuted font-medium">From 1,200+ Happy Epicurean Diners</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Dish Image with Floating Animations */}
          <div className="lg:w-1/2 relative flex items-center justify-center animate-fadeIn">
            
            {/* Ambient circular backdrop */}
            <div className="absolute inset-0 bg-primary/10 rounded-full filter blur-3xl transform scale-105 animate-pulse-glow"></div>
            
            {/* Main Center Dish with Float Physics */}
            <div className="animate-dish relative z-10 w-full max-w-[480px] aspect-square rounded-full p-3 bg-gradient-to-tr from-accent/30 via-white/80 to-primary/20 shadow-2xl transition-transform duration-700 hover:scale-105">
              <img
                alt="Flavoro Signature Grilled Chicken Salad Dish"
                className="w-full h-full rounded-full object-cover shadow-inner"
                src="./assets/hero_dish_salad.jpg"
              />
            </div>

            {/* Floating Garnish 1: Leaf Pill Badge */}
            <div className="absolute -top-3 left-6 z-20 animate-float bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-emerald-100 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Leaf className="w-4 h-4" />
              </div>
              <div className="text-left pr-2">
                <p className="text-[9px] font-bold uppercase text-emerald-800 tracking-wider">Organic</p>
                <p className="text-xs font-bold text-primary">Fresh Herbs</p>
              </div>
            </div>

            {/* Floating Garnish 2: Heritage Tomato Badge */}
            <div className="absolute -bottom-4 right-8 z-20 animate-float-reverse bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-orange-100 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-accent flex items-center justify-center font-bold text-xs">
                🍅
              </div>
              <div className="text-left pr-2">
                <p className="text-[9px] font-bold uppercase text-accent tracking-wider">Farm Harvest</p>
                <p className="text-xs font-bold text-primary">Heritage Produce</p>
              </div>
            </div>

            {/* Floating Quality Badge */}
            <div className="absolute top-1/2 -right-4 lg:-right-6 transform -translate-y-1/2 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-gray-100 z-30 hidden sm:flex items-center gap-3 animate-float">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold">
                <ChefHat className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Michelin Trained</p>
                <p className="text-xs font-extrabold text-primary">Master Chefs</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===================== 4 VALUE PROPOSITIONS (SCROLL REVEAL) ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="reveal bg-primary text-white rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
          
          {/* Feature 1 */}
          <div className="reveal delay-100 text-center space-y-3 pt-4 sm:pt-0 sm:px-4 group cursor-pointer">
            <div className="w-14 h-14 mx-auto rounded-full border border-white/20 flex items-center justify-center text-accent bg-white/5 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold tracking-wide group-hover:text-accent transition-colors">FRESH INGREDIENTS</h3>
            <p className="text-xs text-white/80 font-light leading-relaxed max-w-xs mx-auto">
              We use only the freshest, organic, and certified farm-to-table ingredients.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="reveal delay-200 text-center space-y-3 pt-6 sm:pt-0 sm:px-4 group cursor-pointer">
            <div className="w-14 h-14 mx-auto rounded-full border border-white/20 flex items-center justify-center text-accent bg-white/5 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
              <ChefHat className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold tracking-wide group-hover:text-accent transition-colors">EXPERT CHEFS</h3>
            <p className="text-xs text-white/80 font-light leading-relaxed max-w-xs mx-auto">
              Our culinary team crafts every recipe with unmatched passion and precision.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="reveal delay-300 text-center space-y-3 pt-6 sm:pt-0 sm:px-4 group cursor-pointer">
            <div className="w-14 h-14 mx-auto rounded-full border border-white/20 flex items-center justify-center text-accent bg-white/5 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
              <BellRing className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold tracking-wide group-hover:text-accent transition-colors">QUALITY SERVICE</h3>
            <p className="text-xs text-white/80 font-light leading-relaxed max-w-xs mx-auto">
              Enjoy warm, personalized, and attentive hospitality on every single visit.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="reveal delay-400 text-center space-y-3 pt-6 sm:pt-0 sm:px-4 group cursor-pointer">
            <div className="w-14 h-14 mx-auto rounded-full border border-white/20 flex items-center justify-center text-accent bg-white/5 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold tracking-wide group-hover:text-accent transition-colors">MADE WITH LOVE</h3>
            <p className="text-xs text-white/80 font-light leading-relaxed max-w-xs mx-auto">
              Every dish is lovingly prepared to delight your senses and create memories.
            </p>
          </div>

        </div>
      </section>

      {/* ===================== CHEF'S SPECIALS SECTION (SCROLL REVEAL) ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Section Header */}
        <div className="reveal text-center mb-12 space-y-3">
          <div className="inline-flex items-center justify-center gap-3 text-accent text-xs font-bold tracking-widest uppercase">
            <span className="w-8 h-px bg-accent/40"></span>
            <span>✦ GASTRONOMY HIGHLIGHTS ✦</span>
            <span className="w-8 h-px bg-accent/40"></span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary">Chef's Signature Selections</h2>
          <p className="text-xs sm:text-sm text-textMuted max-w-xl mx-auto">
            Plated daily by Master Executive Chef Elias Thorne. Freshly harvested truffles, dry-aged beef, and pristine coastal seafood.
          </p>
          <div className="flex items-center justify-center gap-3 text-accent pt-1">
            <div className="w-12 h-px bg-accent/50"></div>
            <Sparkles className="w-4 h-4 animate-spin text-accent" style={{ animationDuration: '6s' }} />
            <div className="w-12 h-px bg-accent/50"></div>
          </div>
        </div>

        {/* 4 Specials Grid with Staggered Scroll Reveal & 3D Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {chefSpecials.map((dish, idx) => {
            const isFav = favorites.includes(dish.id);
            const staggerClass = idx === 0 ? 'delay-100' : idx === 1 ? 'delay-200' : idx === 2 ? 'delay-300' : 'delay-400';
            return (
              <div
                key={dish.id}
                className={`reveal ${staggerClass} card-hover-lift bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-gray-200/90 flex flex-col justify-between group relative overflow-hidden`}
              >
                {/* Favorite Button */}
                <button
                  type="button"
                  onClick={() => toggleFavorite(dish.id)}
                  className={`absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center transition-all z-20 shadow-md ${
                    isFav
                      ? 'bg-rose-50 text-rose-500 border border-rose-200'
                      : 'bg-white/90 backdrop-blur-md text-gray-400 hover:text-rose-500'
                  }`}
                  title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                >
                  <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isFav ? 'fill-rose-500' : ''}`} />
                </button>

                {/* Dish Photo */}
                <div
                  onClick={() => setLightboxItem({ image: dish.image, title: dish.name, description: dish.description, category: 'Chef Special' })}
                  className="rounded-2xl overflow-hidden mb-4 aspect-[4/3] bg-surface-container relative cursor-pointer group"
                >
                  <img
                    alt={dish.name}
                    src={dish.image}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[1px]">
                    <ZoomIn className="w-6 h-6 drop-shadow-md" />
                  </div>
                  
                  {/* Category Pill */}
                  <div className="absolute bottom-2.5 left-2.5 bg-black/50 backdrop-blur-md text-white text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-white/20">
                    {dish.category}
                  </div>
                </div>

                {/* Dish Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-baseline justify-between gap-1">
                    <h4 className="font-heading font-bold text-lg text-primary group-hover:text-accent transition-colors line-clamp-1">
                      {dish.name}
                    </h4>
                  </div>
                  
                  <p className="text-xs text-textMuted line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>

                  <div className="flex items-center gap-1 text-amber-500 text-xs pt-0.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-textMuted text-[11px] ml-1 font-semibold">({dish.reviewsCount || 120})</span>
                  </div>
                </div>

                {/* Price & Add to Bag */}
                <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-primary font-heading font-bold text-xl">${dish.price.toFixed(2)}</span>
                  <button
                    onClick={() => {
                      addToCart(dish, 1);
                      showToast('Added to Order', `${dish.name} added to cart.`);
                    }}
                    className="btn-shimmer bg-primary hover:bg-emerald-950 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5 text-accent" />
                    <span>Order</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* View Full Menu Button */}
        <div className="reveal delay-300 text-center mt-12">
          <button
            onClick={() => navigateTo('menu')}
            className="btn-shimmer bg-primary hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
          >
            <span>Explore Full Menu & Sommelier Cellar</span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </button>
        </div>

      </section>

      {/* ===================== ABOUT US HERO SPOTLIGHT (SCROLL REVEAL) ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="reveal-scale bg-primary text-white rounded-3xl md:rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl relative">
          
          {/* Left Column: Image with Pulsing Play Video Button */}
          <div className="reveal-left lg:w-[46%] relative aspect-video lg:aspect-auto min-h-[360px] group overflow-hidden">
            <img
              alt="Flavoro Dining Hall Interior"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src="./assets/restaurant_hall.jpg"
            />
            {/* Play Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
              <button
                onClick={() => setIsVideoOpen(true)}
                className="relative w-16 h-16 rounded-full bg-accent hover:bg-orange-600 text-white flex items-center justify-center transition-all transform hover:scale-110 shadow-2xl border-2 border-white/40 focus:outline-none before:absolute before:inset-0 before:rounded-full before:bg-accent/40 before:animate-ping"
                title="Watch Restaurant Story"
              >
                <Play className="w-6 h-6 fill-white ml-1 relative z-10" />
              </button>
            </div>
          </div>

          {/* Right Column: Narrative & Counter Stats */}
          <div className="reveal-right lg:w-[54%] p-8 sm:p-12 lg:p-14 flex flex-col justify-center relative">
            <div className="space-y-6">
              
              <div className="inline-flex items-center gap-3 text-accent text-xs font-bold tracking-widest uppercase">
                <span>ABOUT US</span>
                <span className="w-8 h-px bg-accent/60"></span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-bold leading-tight">
                A Place Where <br />
                Good Food & Good Times <br />
                <span className="text-secondary-container">Come Together</span>
              </h2>

              <p className="text-white/80 font-light text-sm leading-relaxed max-w-xl">
                At Flavoro, we believe that great food brings people together. From our cozy, warm ambiance to our farm-fresh signature recipes, we are dedicated to making every moment unforgettable.
              </p>

              {/* Artisanal script accent */}
              <div className="font-script text-4xl text-accent pt-1">
                Taste. Love. Repeat.
              </div>

              {/* 3 Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <div className="text-accent text-2xl"><ChefHat className="w-7 h-7" /></div>
                  <div>
                    <div className="font-bold text-xl">10+</div>
                    <div className="text-[11px] text-white/70">Years of<br />Experience</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-accent text-2xl"><Soup className="w-7 h-7" /></div>
                  <div>
                    <div className="font-bold text-xl">50+</div>
                    <div className="text-[11px] text-white/70">Delicious<br />Dishes</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-accent text-2xl"><Award className="w-7 h-7" /></div>
                  <div>
                    <div className="font-bold text-xl">100%</div>
                    <div className="text-[11px] text-white/70">Customer<br />Satisfaction</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ===================== INFO BAR SECTION (SCROLL REVEAL) ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="reveal bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          
          <div className="reveal delay-100 flex items-center gap-4 sm:px-4 pt-3 sm:pt-0 group">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-accent flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all">
              <Bike className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-primary">FREE DELIVERY</h4>
              <p className="text-xs text-textMuted mt-0.5">On all orders over $30</p>
            </div>
          </div>

          <div className="reveal delay-200 flex items-center gap-4 sm:px-4 pt-4 sm:pt-0 group">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-accent flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-primary">OPENING HOURS</h4>
              <p className="text-xs text-textMuted mt-0.5">Mon - Sun: 10 AM - 11 PM</p>
            </div>
          </div>

          <div className="reveal delay-300 flex items-center gap-4 sm:px-4 pt-4 sm:pt-0 group">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-accent flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-primary">LOCATION</h4>
              <p className="text-xs text-textMuted mt-0.5">123 Food St, Yummy City</p>
            </div>
          </div>

          <div className="reveal delay-400 flex items-center gap-4 sm:px-4 pt-4 sm:pt-0 group">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-accent flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-primary">CALL US</h4>
              <p className="text-xs text-textMuted mt-0.5">+1 234 567 8900</p>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== TESTIMONIALS SECTION (SCROLL REVEAL) ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="reveal text-center mb-12 space-y-2">
          <span className="text-accent text-xs font-bold tracking-widest uppercase">TESTIMONIALS</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary">What Our Guests Say</h2>
          <div className="flex items-center justify-center gap-2 text-accent pt-1">
            <div className="w-12 h-px bg-accent/50"></div>
            <div className="animate-heartbeat">
              <Heart className="w-4 h-4 fill-accent" />
            </div>
            <div className="w-12 h-px bg-accent/50"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Light with Hover Lift */}
          <div className="reveal delay-100 card-hover-lift bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between space-y-6">
            <div className="flex text-amber-500 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-textMuted italic text-sm leading-relaxed">
              "The best dining experience in the city! The atmosphere is cozy, staff are remarkably attentive, and the food is absolutely divine."
            </p>
            <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
              <img
                alt="Sarah Johnson"
                className="w-11 h-11 rounded-full object-cover border-2 border-accent/30"
                src="./assets/avatar_diner1.jpg"
              />
              <div>
                <h5 className="font-bold text-sm text-primary">Sarah Johnson</h5>
                <p className="text-[11px] text-textMuted">Food Critic, Epicure</p>
              </div>
            </div>
          </div>

          {/* Card 2: Featured Dark Green */}
          <div className="reveal delay-200 card-hover-lift bg-primary text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden transform md:-translate-y-2">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full -mr-8 -mt-8 pointer-events-none"></div>
            <div className="flex text-amber-400 gap-1 relative z-10">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-white/90 italic text-sm leading-relaxed relative z-10">
              "Incredible service and the Grilled Salmon was cooked to absolute perfection. Flavoro has become our family's favorite spot for all milestones."
            </p>
            <div className="flex items-center gap-3.5 pt-4 border-t border-white/15 relative z-10">
              <img
                alt="Michael Ross"
                className="w-11 h-11 rounded-full object-cover border-2 border-accent"
                src="./assets/avatar_user.jpg"
              />
              <div>
                <h5 className="font-bold text-sm text-white">Michael Ross</h5>
                <p className="text-[11px] text-white/70">Local Resident</p>
              </div>
            </div>
          </div>

          {/* Card 3: Light with Hover Lift */}
          <div className="reveal delay-300 card-hover-lift bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between space-y-6">
            <div className="flex text-amber-500 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-textMuted italic text-sm leading-relaxed">
              "A true hidden gem. The attention to detail in every dish is remarkable. Highly recommend the Chocolate Lava Cake paired with their signature cocktail!"
            </p>
            <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
              <img
                alt="Emily Lawson"
                className="w-11 h-11 rounded-full object-cover border-2 border-accent/30"
                src="./assets/avatar_diner3.jpg"
              />
              <div>
                <h5 className="font-bold text-sm text-primary">Emily Lawson</h5>
                <p className="text-[11px] text-textMuted">Travel Blogger</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== PRIVATE DINING & TASTING EXPERIENCES SECTION (SCROLL REVEAL) ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="experiences">
        
        <div className="reveal text-center mb-14 space-y-3">
          <div className="inline-flex items-center justify-center gap-3 text-accent text-xs font-bold tracking-widest uppercase">
            <span className="w-8 h-px bg-accent/40"></span>
            <span>✦ BESPOKE HOSPITALITY ✦</span>
            <span className="w-8 h-px bg-accent/40"></span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary">Private Dining & Cellar Experiences</h2>
          <p className="text-xs sm:text-sm text-textMuted max-w-xl mx-auto">
            From front-row chef counter degustations to candlelit wine cellar masterclasses, discover our exclusive private dining spaces.
          </p>
          <div className="flex items-center justify-center gap-2 text-accent pt-1">
            <div className="w-12 h-px bg-accent/50"></div>
            <Sparkles className="w-4 h-4 text-accent animate-spin" style={{ animationDuration: '6s' }} />
            <div className="w-12 h-px bg-accent/50"></div>
          </div>
        </div>

        {/* 3 Luxury Experience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Experience 1: Chef's Counter */}
          <div className="reveal delay-100 card-hover-lift bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm flex flex-col justify-between group relative">
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
              <img
                src="./assets/admin_kitchen_expedite.jpg"
                alt="Chef's Table Counter"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute top-4 left-4 bg-amber-500 text-white text-[9px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                8 SEATS ONLY
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between text-white">
                <span className="font-heading text-xl font-bold">The Chef's Counter</span>
                <span className="text-amber-300 font-bold text-lg">$145 <span className="text-xs font-normal text-white/80">/ cover</span></span>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-textMuted leading-relaxed">
                Front-row interactive kitchen counter with Master Chef Elias Thorne. Watch every course plated with live fire and artisanal precision.
              </p>

              <div className="space-y-2 text-xs text-textMain border-y border-gray-100 py-3">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  <span>5-Course Autumn Degustation Menu</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  <span>Direct conversation with Executive Chef</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  <span>Sommelier Reserve Pairing Available (+$75)</span>
                </div>
              </div>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="btn-shimmer w-full bg-primary hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <ChefHat className="w-3.5 h-3.5 text-accent" />
                <span>Reserve Chef's Counter</span>
              </button>
            </div>
          </div>

          {/* Experience 2: Sommelier Reserve Cellar */}
          <div className="reveal delay-200 card-hover-lift bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm flex flex-col justify-between group relative">
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
              <img
                src="./assets/auth_luxury_vault.jpg"
                alt="Sommelier Reserve Cellar Vault"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute top-4 left-4 bg-accent text-white text-[9px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                PRIVATE VAULT
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between text-white">
                <span className="font-heading text-xl font-bold">The Sommelier Vault</span>
                <span className="text-amber-300 font-bold text-lg">$180 <span className="text-xs font-normal text-white/80">/ cover</span></span>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-textMuted leading-relaxed">
                Surrounded by 1,400 rare vintage bottles in our subterranean cellar. An intimate tasting masterclass guided by Head Sommelier Lucas Vance.
              </p>

              <div className="space-y-2 text-xs text-textMain border-y border-gray-100 py-3">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  <span>6 Rare Reserve Barolo & Brunello Vintages</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  <span>Artisanal Italian Truffle & Formaggi Pairings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  <span>Private Sommelier Guided Masterclass</span>
                </div>
              </div>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="btn-shimmer w-full bg-primary hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Wine className="w-3.5 h-3.5 text-accent" />
                <span>Reserve Cellar Vault</span>
              </button>
            </div>
          </div>

          {/* Experience 3: Emerald Garden Terrace */}
          <div className="reveal delay-300 card-hover-lift bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm flex flex-col justify-between group relative">
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
              <img
                src="./assets/restaurant_hall.jpg"
                alt="Emerald Garden Terrace"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute top-4 left-4 bg-emerald-700 text-white text-[9px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                AL FRESCO BOTANICAL
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between text-white">
                <span className="font-heading text-xl font-bold">The Garden Terrace</span>
                <span className="text-amber-300 font-bold text-lg">$120 <span className="text-xs font-normal text-white/80">/ cover</span></span>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-textMuted leading-relaxed">
                Al fresco candlelit dining nestled among heirloom citrus trees and aromatic herbs under fairy lights. Perfect for intimate private celebrations.
              </p>

              <div className="space-y-2 text-xs text-textMain border-y border-gray-100 py-3">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  <span>Wood-Fired Pizza & Coastal Seafood Platters</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  <span>Dedicated Private Hospitality Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  <span>Custom Handcrafted Cocktail Bar</span>
                </div>
              </div>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="btn-shimmer w-full bg-primary hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <CalendarDays className="w-3.5 h-3.5 text-accent" />
                <span>Reserve Garden Terrace</span>
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* Video Modal */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

    </div>
  );
}
