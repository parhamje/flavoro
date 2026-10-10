import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_RESERVATIONS,
  INITIAL_STAFF,
  INITIAL_ORDERS
} from '../data/restaurantData';
import confetti from 'canvas-confetti';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');

  // Creative Initial Loading Screen State
  const [isLoading, setIsLoading] = useState(true);
  const triggerLoadingScreen = () => {
    setIsLoading(true);
  };

  // User State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('flavoro_user');
    return saved ? JSON.parse(saved) : {
      name: 'Alexander Wright',
      email: 'alexander@example.com',
      role: 'customer',
      points: 450,
      avatar: './assets/avatar_user.jpg'
    };
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('flavoro_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Reservation Modal & Data State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('flavoro_reservations');
    return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
  });

  // Menu State (Admin CRUD Enabled)
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('flavoro_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  // Staff State (Admin Shift Management)
  const [staffList, setStaffList] = useState(() => {
    const saved = localStorage.getItem('flavoro_staff');
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('flavoro_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('flavoro_favorites');
    return saved ? JSON.parse(saved) : ['main-3', 'main-4', 'dessert-1'];
  });

  // Lightbox modal for gallery & items
  const [lightboxItem, setLightboxItem] = useState(null);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('flavoro_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('flavoro_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('flavoro_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('flavoro_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('flavoro_staff', JSON.stringify(staffList));
  }, [staffList]);

  useEffect(() => {
    localStorage.setItem('flavoro_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('flavoro_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Page Navigation Helper
  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast Helper
  const showToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Functions
  const addToCart = (item, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + qty } : c
        );
      }
      return [...prev, { item, quantity: qty }];
    });
    showToast('Added to Cart', `${item.name} (${qty}) added.`);
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  };

  const updateCartQuantity = (itemId, delta) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.item.id === itemId) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: orderDetails.type || 'Delivery',
      status: 'In Progress',
      total: orderDetails.total,
      items: cart.map((c) => ({
        name: c.item.name,
        qty: c.quantity,
        price: c.item.price
      }))
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCartOpen(false);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    showToast('Order Placed Successfully!', `Order #${newOrder.id} is being prepared.`);
  };

  // Reservation Functions
  const addReservation = (reservationData) => {
    const newRes = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: reservationData.customerName || user?.name || 'Valued Guest',
      customerEmail: reservationData.customerEmail || user?.email || 'guest@flavoro.com',
      customerPhone: reservationData.customerPhone || '+1 (555) 000-0000',
      date: reservationData.date,
      time: reservationData.time,
      guests: Number(reservationData.guests) || 2,
      area: reservationData.area || 'Main Dining Room',
      occasion: reservationData.occasion || 'Dining Experience',
      notes: reservationData.notes || 'No special requests.',
      status: 'Confirmed',
      tableNumber: `T-${Math.floor(1 + Math.random() * 24).toString().padStart(2, '0')}`,
      createdAt: new Date().toISOString()
    };

    setReservations((prev) => [newRes, ...prev]);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    showToast('Table Reserved!', `We look forward to hosting you on ${newRes.date} at ${newRes.time}.`);
    return newRes;
  };

  const updateReservationStatus = (resId, newStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status: newStatus } : r))
    );
    showToast('Reservation Updated', `Status changed to ${newStatus}`);
  };

  const cancelReservation = (resId) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status: 'Cancelled' } : r))
    );
    showToast('Reservation Cancelled', `Reservation #${resId} has been cancelled.`, 'info');
  };

  // Menu Admin Functions
  const addMenuItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: `item-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true
    };
    setMenuItems((prev) => [newItem, ...prev]);
    showToast('Dish Added', `${newItem.name} is now on the menu.`);
  };

  const updateMenuItem = (itemData) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === itemData.id ? { ...item, ...itemData } : item))
    );
    showToast('Menu Updated', `${itemData.name} details saved.`);
  };

  const deleteMenuItem = (itemId) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item Deleted', 'Dish removed from menu.', 'info');
  };

  const toggleItemAvailability = (itemId) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, inStock: !item.inStock } : item
      )
    );
  };

  // Staff Admin Functions
  const toggleStaffShift = (staffId) => {
    setStaffList((prev) =>
      prev.map((staff) =>
        staff.id === staffId
          ? { ...staff, status: staff.status === 'On Shift' ? 'Off Shift' : 'On Shift' }
          : staff
      )
    );
  };

  const addStaffMember = (staffData) => {
    const newStaff = {
      ...staffData,
      id: `staff-${Date.now()}`,
      status: 'On Shift'
    };
    setStaffList((prev) => [...prev, newStaff]);
    showToast('Staff Added', `${newStaff.name} added to the team.`);
  };

  // Favorites Toggle
  const toggleFavorite = (itemId) => {
    setFavorites((prev) => {
      const exists = prev.includes(itemId);
      if (exists) {
        showToast('Removed from Favorites', 'Item removed from your favorites list.', 'info');
        return prev.filter((id) => id !== itemId);
      } else {
        showToast('Saved to Favorites', 'Added to your favorites list!');
        return [...prev, itemId];
      }
    });
  };

  // User Demo Auth
  const loginDemoUser = (role) => {
    if (role === 'admin') {
      setUser({
        name: 'Chef Elena Rossi',
        email: 'elena@flavoro.com',
        role: 'admin',
        points: 1200,
        avatar: './assets/chef_portrait.jpg'
      });
      navigateTo('admin-dashboard');
      showToast('Welcome Admin', 'Logged in as Executive Chef Elena Rossi.');
    } else {
      setUser({
        name: 'Alexander Wright',
        email: 'alexander@example.com',
        role: 'customer',
        points: 450,
        avatar: './assets/avatar_user.jpg'
      });
      navigateTo('user-dashboard');
      showToast('Welcome Back', 'Logged in as Alexander Wright.');
    }
  };

  const logout = () => {
    setUser({
      name: 'Guest Diner',
      email: '',
      role: 'guest',
      points: 0,
      avatar: ''
    });
    navigateTo('home');
    showToast('Logged Out', 'You have been logged out.');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        user,
        setUser,
        loginDemoUser,
        logout,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        placeOrder,
        isBookingOpen,
        setIsBookingOpen,
        reservations,
        addReservation,
        updateReservationStatus,
        cancelReservation,
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleItemAvailability,
        staffList,
        toggleStaffShift,
        addStaffMember,
        orders,
        favorites,
        toggleFavorite,
        lightboxItem,
        setLightboxItem,
        toasts,
        showToast,
        removeToast,
        isLoading,
        setIsLoading,
        triggerLoadingScreen
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
