import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Bike,
  Store,
  Tag,
  CheckCircle2,
  CreditCard,
  ChefHat
} from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    placeOrder,
    user
  } = useApp();

  const [orderType, setOrderType] = useState('Delivery'); // 'Delivery' | 'Pickup'
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    address: '123 Gourmet Way, Apt 4B',
    phone: '+1 (555) 234-5678',
    instructions: ''
  });

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee = orderType === 'Delivery' ? (subtotal > 30 ? 0 : 4.99) : 0;
  const tax = (subtotal - discountAmount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + tax);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'FLAVORO10') {
      setDiscountPercent(10);
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === 'CHEF20') {
      setDiscountPercent(20);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try FLAVORO10 or CHEF20');
    }
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    placeOrder({
      type: orderType,
      total: grandTotal,
      customerInfo
    });
    setIsCheckingOut(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-md animate-modal-backdrop">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface shadow-2xl flex flex-col relative animate-drawer-slide">
          
          {/* Cart Header */}
          <div className="p-6 bg-primary text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold">Your Culinary Bag</h3>
                <p className="text-xs text-white/70">{cart.length} unique {cart.length === 1 ? 'item' : 'items'}</p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckingOut(false);
              }}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          {!isCheckingOut ? (
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fdfbf7]">
              {/* Delivery vs Pickup Toggle */}
              <div className="grid grid-cols-2 gap-2 bg-surface-container p-1.5 rounded-2xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setOrderType('Delivery')}
                  className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    orderType === 'Delivery'
                      ? 'bg-accent text-white shadow-md'
                      : 'text-textMuted hover:text-textMain'
                  }`}
                >
                  <Bike className="w-4 h-4" />
                  <span>Delivery ($30+ Free)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('Pickup')}
                  className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    orderType === 'Pickup'
                      ? 'bg-accent text-white shadow-md'
                      : 'text-textMuted hover:text-textMain'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>Curbside Pickup</span>
                </button>
              </div>

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-orange-100 text-accent flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading text-xl text-primary font-bold">Your Bag is Empty</h4>
                  <p className="text-xs text-textMuted max-w-xs mx-auto">
                    Explore our chef specials and handcrafted seasonal menu to add delicious items.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((cartItem) => {
                    const { item, quantity } = cartItem;
                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex gap-3.5 items-center relative group"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-sm text-primary truncate">{item.name}</h5>
                          <span className="text-xs font-bold text-accent">${item.price.toFixed(2)}</span>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-md bg-surface-container hover:bg-gray-200 text-primary flex items-center justify-center text-xs font-bold"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-primary w-4 text-center">{quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-md bg-surface-container hover:bg-gray-200 text-primary flex items-center justify-center text-xs font-bold"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-sm text-primary">
                            ${(item.price * quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1 mt-2 inline-block"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Promo code */}
              {cart.length > 0 && (
                <form onSubmit={applyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. FLAVORO10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs uppercase font-semibold focus:ring-2 focus:ring-accent focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-forest text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {promoApplied && (
                <div className="bg-emerald-50 text-emerald-800 text-xs px-3 py-2 rounded-xl flex items-center gap-2 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Promo Code Applied! {discountPercent}% discount active.</span>
                </div>
              )}
            </div>
          ) : (
            /* Checkout Details Step */
            <form onSubmit={handleCompleteOrder} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#fdfbf7]">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <h4 className="font-heading text-lg text-primary font-bold">Delivery & Payment Info</h4>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-accent hover:underline font-bold"
                >
                  Back to Bag
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  placeholder="Full Name"
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-accent focus:outline-none"
                />
              </div>

              {orderType === 'Delivery' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    placeholder="Street address, apartment, suite"
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-accent focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1">
                  Delivery Notes / Kitchen Instructions
                </label>
                <textarea
                  rows={2}
                  value={customerInfo.instructions}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, instructions: e.target.value })}
                  placeholder="e.g. Ring bell 4B, extra bread..."
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-accent focus:outline-none"
                />
              </div>

              <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-primary">
                  <CreditCard className="w-4 h-4 text-accent" />
                  <span>Payment Method: Demo Card (Instant)</span>
                </div>
                <p className="text-[11px] text-textMuted">
                  Simulated fine dining payment gateway. No real charges applied.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-accent hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-full shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 mt-4"
              >
                <span>Authorize & Place Order (${grandTotal.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Cart Footer Calculation */}
          {cart.length > 0 && !isCheckingOut && (
            <div className="p-6 bg-white border-t border-gray-200 space-y-3 shadow-lg flex-shrink-0">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-textMuted">
                  <span>Subtotal</span>
                  <span className="font-semibold text-primary">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-textMuted">
                  <span>{orderType} Fee</span>
                  <span className="font-semibold text-primary">
                    {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-textMuted">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-primary">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-bold text-primary">
                  <span>Grand Total</span>
                  <span className="text-accent text-base">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full bg-accent hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-full shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
