import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Plus,
  Minus,
  Heart,
  Star,
  Sparkles,
  ShoppingBag,
  Check,
  Filter,
  Leaf,
  Wheat,
  Utensils,
  Wine,
  Flame,
  Award,
  Clock,
  ChevronRight,
  ZoomIn,
  LayoutGrid,
  List,
  Crown,
  ChefHat
} from 'lucide-react';

export default function MenuPage() {
  const {
    menuItems,
    addToCart,
    favorites,
    toggleFavorite,
    setLightboxItem,
    showToast,
    setIsBookingOpen
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all' | 'vegetarian' | 'gluten-free' | 'special'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [itemQuantities, setItemQuantities] = useState({});

  const categories = [
    { id: 'all', name: 'All Offerings', icon: Utensils, count: menuItems.length },
    { id: 'starters', name: 'Starters & Crudo', icon: Leaf, count: menuItems.filter(m => m.category === 'starters').length },
    { id: 'mains', name: 'Signature Mains', icon: Crown, count: menuItems.filter(m => m.category === 'mains').length },
    { id: 'pizzas', name: 'Wood-Fired Pizza', icon: Flame, count: menuItems.filter(m => m.category === 'pizzas').length },
    { id: 'desserts', name: 'Decadent Dolci', icon: Sparkles, count: menuItems.filter(m => m.category === 'desserts').length },
    { id: 'drinks', name: 'Sommelier & Cocktails', icon: Wine, count: menuItems.filter(m => m.category === 'drinks').length }
  ];

  // Quantities helper
  const getItemQty = (id) => itemQuantities[id] || 1;
  const setItemQty = (id, qty) => {
    if (qty < 1) return;
    setItemQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  // Sommelier pairing map for added gastronomy depth
  const sommelierPairings = {
    'starter-1': '2021 Gavi di Gavi DOCG',
    'starter-2': 'NV Franciacorta Brut',
    'starter-3': '2022 Pinot Grigio Alto Adige',
    'main-1': '2020 Sancerre Blanc',
    'main-2': '2018 Brunello di Montalcino',
    'main-3': '2020 Barolo Massolino DOCG',
    'main-4': '2021 Chablis Premier Cru',
    'main-5': '2019 Napa Valley Cabernet',
    'pizza-1': '2021 Chianti Classico Riserva',
    'dessert-1': '10-Year Tawny Port',
    'dessert-2': '2022 Moscato d’Asti',
    'drink-1': 'House Smoked Rosemary Bitters'
  };

  // Filtering
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesDietary = true;
    if (dietaryFilter === 'vegetarian') {
      matchesDietary = item.tags.some((t) => t.toLowerCase().includes('vegetarian') || t.toLowerCase().includes('vegan'));
    } else if (dietaryFilter === 'gluten-free') {
      matchesDietary = item.tags.some((t) => t.toLowerCase().includes('gluten-free'));
    } else if (dietaryFilter === 'special') {
      matchesDietary = item.isSpecial === true;
    }

    return matchesCategory && matchesSearch && matchesDietary;
  });

  return (
    <div className="pt-24 pb-28 min-h-screen bg-[#fdfbf7] text-textMain selection:bg-accent selection:text-white">
      
      {/* ===================== HERO CULINARY BANNER ===================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-br from-primary via-[#012f26] to-[#011a15] rounded-3xl md:rounded-[2.5rem] p-8 sm:p-12 lg:p-14 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10">
          
          {/* Background Ambient Glows */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-accent/25 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Left Text */}
          <div className="space-y-4 max-w-2xl text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-extrabold tracking-widest uppercase text-accent">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn Harvest Degustation 2026</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              The Culinary Collection.
            </h1>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
              Crafted from centuries-old heritage recipes, rare organic truffles, and sustainable coastal seafood. Every dish is cooked to order and plated with fine-dining artistry.
            </p>

            {/* Quick Sourcing Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-white/90">
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full border border-white/10">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Organic Farms</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full border border-white/10">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Michelin-Trained Chefs</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full border border-white/10">
                <Wine className="w-3.5 h-3.5 text-accent" />
                <span>Sommelier Pairings</span>
              </span>
            </div>
          </div>

          {/* Right Tasting Menu Showcase Card */}
          <div className="w-full lg:w-96 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white shadow-xl relative z-10 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/15">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-accent block">CHEF'S SIGNATURE</span>
                <h4 className="font-heading text-lg font-bold text-white">5-Course Prix Fixe</h4>
              </div>
              <span className="text-2xl font-heading font-bold text-amber-300">$145</span>
            </div>

            <p className="text-xs text-white/80 leading-relaxed italic">
              "An extraordinary progression through black truffle burrata, Faroe salmon, hand-rolled pasta, and dark molten chocolate."
            </p>

            <div className="space-y-1.5 text-[11px] text-white/70">
              <div className="flex items-center justify-between">
                <span>• Wine Pairing Available</span>
                <span className="text-white font-bold">+$75</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• Reserved Chef Table Seating</span>
                <span className="text-emerald-400 font-bold">Included</span>
              </div>
            </div>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="btn-shimmer w-full bg-accent hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Reserve Tasting Menu</span>
            </button>
          </div>

        </div>
      </section>

      {/* ===================== CONTROLS BAR: SEARCH, CATEGORIES & VIEW SWITCHER ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 space-y-4">
        
        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 transform ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.03] border border-primary'
                    : 'bg-white text-textMuted hover:text-primary hover:bg-gray-100/80 border border-gray-200/80'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-accent' : 'text-textMuted'}`} />
                <span>{cat.name}</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-accent text-white' : 'bg-surface-container-high text-primary'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-gray-200/80 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-88 group">
            <Search className="w-4 h-4 text-textMuted group-focus-within:text-accent absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200" />
            <input
              type="text"
              placeholder="Search recipes, truffles, salmon, pasta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low py-2.5 pl-11 pr-4 rounded-2xl text-xs font-semibold text-primary placeholder:text-gray-400 focus:ring-2 focus:ring-accent/20 focus:border-accent border border-transparent focus:outline-none transition-all"
            />
          </div>

          {/* Dietary Filter Buttons & View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            
            {/* Dietary Tags */}
            <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-2xl border border-gray-200">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  dietaryFilter === 'all' ? 'bg-white text-primary shadow-xs' : 'text-textMuted hover:text-textMain'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter('vegetarian')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                  dietaryFilter === 'vegetarian' ? 'bg-emerald-700 text-white shadow-xs' : 'text-textMuted hover:text-emerald-700'
                }`}
              >
                <Leaf className="w-3 h-3" />
                <span>Veg Only</span>
              </button>
              <button
                onClick={() => setDietaryFilter('gluten-free')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                  dietaryFilter === 'gluten-free' ? 'bg-accent text-white shadow-xs' : 'text-textMuted hover:text-accent'
                }`}
              >
                <Wheat className="w-3 h-3" />
                <span>GF Only</span>
              </button>
              <button
                onClick={() => setDietaryFilter('special')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                  dietaryFilter === 'special' ? 'bg-amber-500 text-white shadow-xs' : 'text-textMuted hover:text-amber-600'
                }`}
              >
                <Star className="w-3 h-3" />
                <span>Chef Specials</span>
              </button>
            </div>

            {/* View Mode Switcher (Grid vs List) */}
            <div className="flex items-center bg-gray-100 p-1 rounded-2xl border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'grid' ? 'bg-white text-primary shadow-xs' : 'text-textMuted hover:text-primary'
                }`}
                title="Editorial Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'list' ? 'bg-white text-primary shadow-xs' : 'text-textMuted hover:text-primary'
                }`}
                title="Ristorante List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ===================== MENU CONTENT DISPLAY ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-gray-300 space-y-4 max-w-md mx-auto">
            <Utensils className="w-12 h-12 text-accent mx-auto" />
            <h3 className="font-heading text-2xl font-bold text-primary">No Matching Dishes</h3>
            <p className="text-xs text-textMuted">We couldn't find any dishes matching your current filter. Try resetting your search.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="bg-primary text-white font-bold text-xs uppercase px-6 py-3 rounded-full shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          
          /* ===================== VIEW MODE 1: EDITORIAL CARD GRID ===================== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((dish) => {
              const isFav = favorites.includes(dish.id);
              const qty = getItemQty(dish.id);
              const pairing = sommelierPairings[dish.id];

              return (
                <div
                  key={dish.id}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 relative"
                >
                  
                  {/* Top Image Section with Zoom & Badges */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-80"></div>

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
                      {dish.isSpecial && (
                        <span className="bg-amber-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Chef's Special</span>
                        </span>
                      )}
                      <span className="bg-white/90 backdrop-blur-md text-primary font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                        {dish.category}
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(dish.id)}
                      className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center transition-all z-20 shadow-md ${
                        isFav
                          ? 'bg-rose-50 text-rose-500 border border-rose-200'
                          : 'bg-white/90 backdrop-blur-md text-gray-400 hover:text-rose-500'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                    >
                      <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isFav ? 'fill-rose-500' : ''}`} />
                    </button>

                    {/* Lightbox Trigger */}
                    <button
                      onClick={() => setLightboxItem({ image: dish.image, title: dish.name, description: dish.description, category: dish.category })}
                      className="absolute bottom-3.5 right-3.5 bg-black/50 backdrop-blur-md text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                      title="View High-Res Photo"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>

                    {/* Price Ribbon */}
                    <div className="absolute bottom-3.5 left-3.5 text-white">
                      <span className="font-heading text-2xl font-bold text-white drop-shadow-md">
                        ${dish.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                    
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-heading text-xl font-bold text-primary group-hover:text-accent transition-colors line-clamp-1">
                          {dish.name}
                        </h3>
                        
                        <div className="flex items-center gap-1 text-amber-500 text-xs flex-shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-primary text-xs">{dish.rating || '4.9'}</span>
                          <span className="text-[10px] text-textMuted">({dish.reviewsCount || 85})</span>
                        </div>
                      </div>

                      <p className="text-xs text-textMuted leading-relaxed line-clamp-2">
                        {dish.description}
                      </p>

                      {/* Dietary Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {dish.tags.map((t, idx) => (
                          <span key={idx} className="text-[10px] font-semibold text-textMuted bg-gray-100 px-2 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sommelier Recommendation Ribbon */}
                    {pairing && (
                      <div className="p-2.5 bg-amber-50/80 rounded-2xl border border-amber-200/60 flex items-center gap-2 text-[11px] text-accent">
                        <Wine className="w-3.5 h-3.5 flex-shrink-0 text-accent" />
                        <span className="truncate font-semibold">Paired with: <strong className="font-bold text-primary">{pairing}</strong></span>
                      </div>
                    )}

                    {/* Bottom Action Row: Quantity + Add to Order */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                      
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
                        <button
                          onClick={() => setItemQty(dish.id, qty - 1)}
                          className="w-7 h-7 rounded-full bg-white text-primary flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-primary">{qty}</span>
                        <button
                          onClick={() => setItemQty(dish.id, qty + 1)}
                          className="w-7 h-7 rounded-full bg-white text-primary flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={() => {
                          addToCart(dish, qty);
                          showToast('Added to Order', `${qty}x ${dish.name} added to your cart.`);
                        }}
                        className="btn-shimmer flex-1 bg-primary hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-full shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-accent" />
                        <span>Add ${(dish.price * qty).toFixed(2)}</span>
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        ) : (

          /* ===================== VIEW MODE 2: RISTORANTE CLASSICO LIST ===================== */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-sm space-y-8">
            <div className="text-center max-w-md mx-auto space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent">CARTE DU JOUR</span>
              <h2 className="font-heading text-3xl font-bold text-primary">Artisanal Dining Selection</h2>
              <p className="text-xs text-textMuted">Fresh ingredients harvested daily and prepared according to classic Italian culinary discipline.</p>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredItems.map((dish) => {
                const isFav = favorites.includes(dish.id);
                const pairing = sommelierPairings[dish.id];

                return (
                  <div key={dish.id} className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-amber-50/30 px-4 rounded-2xl transition-colors">
                    
                    <div className="flex items-start gap-4 flex-1">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform"
                      />
                      
                      <div className="space-y-1 flex-1">
                        <div className="flex items-baseline justify-between gap-4">
                          <h4 className="font-heading font-bold text-lg text-primary group-hover:text-accent transition-colors">
                            {dish.name}
                          </h4>
                          <span className="font-heading font-bold text-lg text-accent">
                            ${dish.price.toFixed(2)}
                          </span>
                        </div>

                        <p className="text-xs text-textMuted max-w-xl">
                          {dish.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px]">
                          {pairing && (
                            <span className="text-accent font-semibold flex items-center gap-1">
                              <Wine className="w-3 h-3" />
                              <span>{pairing}</span>
                            </span>
                          )}
                          <span className="text-textMuted">• {dish.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center">
                      <button
                        onClick={() => toggleFavorite(dish.id)}
                        className={`p-2.5 rounded-full border transition-all ${
                          isFav ? 'bg-rose-50 border-rose-200 text-rose-500' : 'border-gray-200 text-gray-400 hover:text-rose-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                      </button>

                      <button
                        onClick={() => {
                          addToCart(dish, 1);
                          showToast('Added to Order', `${dish.name} added to cart.`);
                        }}
                        className="btn-shimmer bg-primary hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-sm flex items-center gap-1.5 transition-transform active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5 text-accent" />
                        <span>Order Dish</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        )}

      </section>

      {/* ===================== SOMMELIER & DIGESTIF FOOTER CAROUSEL ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-r from-surface-container to-amber-50/50 rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent">SOMMELIER'S CELLAR RECOMMENDATION</span>
            <h3 className="font-heading text-3xl font-bold text-primary">Need pairing advice for your dinner?</h3>
            <p className="text-xs sm:text-sm text-textMuted leading-relaxed">
              Our Head Sommelier Lucas Vance curates reserve vintage pairings for every course. Inform your server or add pairing notes when booking.
            </p>
          </div>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="btn-shimmer bg-primary hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md flex items-center gap-2 whitespace-nowrap"
          >
            <Wine className="w-4 h-4 text-accent" />
            <span>Book with Sommelier Pairing</span>
          </button>
        </div>
      </section>

    </div>
  );
}
