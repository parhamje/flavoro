import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';

// Global UI Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import CartDrawer from './components/CartDrawer';
import LightboxModal from './components/LightboxModal';
import ToastContainer from './components/ToastContainer';
import LoadingScreen from './components/LoadingScreen';

// Customer Facing Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UserDashboard from './pages/UserDashboard';

// Admin Suite Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMenu from './pages/admin/AdminMenu';
import AdminReservations from './pages/admin/AdminReservations';
import AdminStaff from './pages/admin/AdminStaff';

export default function App() {
  const { currentPage, navigateTo, isLoading, setIsLoading } = useApp();
  const [adminTab, setAdminTab] = useState('dashboard');

  // Sync admin page routes if navigated directly
  useEffect(() => {
    if (currentPage === 'admin-dashboard') setAdminTab('dashboard');
    else if (currentPage === 'admin-menu') setAdminTab('menu');
    else if (currentPage === 'admin-reservations') setAdminTab('reservations');
    else if (currentPage === 'admin-staff') setAdminTab('staff');
  }, [currentPage]);

  const isAdminPage = currentPage.startsWith('admin');
  const isAuthPage = currentPage === 'login' || currentPage === 'signup';
  const showHeaderFooter = !isAdminPage && !isAuthPage;

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-textMain selection:bg-accent selection:text-white">
      
      {/* Creative Haute Gastronomy Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Global Navbar (Hidden on Admin and Auth pages) */}
      {showHeaderFooter && <Navbar />}

      {/* Main Content Area with Smooth Page Transition Key */}
      <main className="flex-1">
        <div key={currentPage} className="animate-page-fade">
          {/* Customer Pages */}
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'menu' && <MenuPage />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'gallery' && <GalleryPage />}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'login' && <LoginPage initialMode="login" />}
          {currentPage === 'signup' && <SignUpPage />}
          {currentPage === 'user-dashboard' && <UserDashboard />}

          {/* Admin Suite */}
          {isAdminPage && (
            <AdminLayout activeTab={adminTab} setActiveTab={setAdminTab}>
              {adminTab === 'dashboard' && <AdminDashboard onNavigateTab={(tab) => setAdminTab(tab)} />}
              {adminTab === 'menu' && <AdminMenu />}
              {adminTab === 'reservations' && <AdminReservations />}
              {adminTab === 'staff' && <AdminStaff />}
            </AdminLayout>
          )}
        </div>
      </main>

      {/* Global Footer (Hidden on Admin and Auth pages) */}
      {showHeaderFooter && <Footer />}

      {/* Global Interactive Overlays */}
      <BookingModal />
      <CartDrawer />
      <LightboxModal />
      <ToastContainer />

    </div>
  );
}
