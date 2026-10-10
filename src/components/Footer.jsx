import React from 'react';
import { useApp } from '../context/AppContext';
import {
  UtensilsCrossed,
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  Camera,
  Share2,
  Bookmark
} from 'lucide-react';

import Logo from './Logo';

export default function Footer() {
  const { navigateTo, setIsBookingOpen } = useApp();

  return (
    <footer className="bg-primary text-white pt-16 pb-12 relative overflow-hidden border-t border-white/10">
      {/* Subtle background flourishes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10 text-xs">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Logo
              variant="white"
              size="lg"
              onClick={() => navigateTo('home')}
            />
            <p className="text-white/70 leading-relaxed">
              Crafting unforgettable epicurean experiences rooted in heritage and organic farm-to-table excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm tracking-wider uppercase text-accent">Explore</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-accent transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('menu')} className="hover:text-accent transition-colors">
                  Our Culinary Menu
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-accent transition-colors">
                  Our Heritage & Story
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('gallery')} className="hover:text-accent transition-colors">
                  Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-accent transition-colors">
                  Contact & Private Dining
                </button>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm tracking-wider uppercase text-accent">Opening Hours</h4>
            <div className="space-y-1.5 text-white/70">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                <span>Mon - Thu: 5:00 PM - 10:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                <span>Fri - Sat: 5:00 PM - 11:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                <span>Sunday: 4:00 PM - 9:00 PM</span>
              </div>
              <div className="pt-2 text-emerald-400 font-semibold text-[11px]">
                Weekend Brunch: 11:00 AM - 3:00 PM
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm tracking-wider uppercase text-accent">Visit Us</h4>
            <div className="space-y-2 text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                <span>123 Food Street, Yummy City, FC 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                <span>+1 234 567 8900</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                <span>hello@flavororestaurant.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Exact match to user design mockup */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/60">
          <div>
            <p>© {new Date().getFullYear()} Flavoro Restaurant. All Rights Reserved.</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <span className="text-white/80 font-medium mr-1">Follow Us</span>
            
            {/* Facebook SVG */}
            <a
              href="#facebook"
              onClick={(e) => e.preventDefault()}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent text-white transition-all shadow-sm"
              title="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram SVG */}
            <a
              href="#instagram"
              onClick={(e) => e.preventDefault()}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent text-white transition-all shadow-sm"
              title="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* X / Twitter SVG */}
            <a
              href="#twitter"
              onClick={(e) => e.preventDefault()}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent text-white transition-all shadow-sm"
              title="X / Twitter"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Pinterest SVG */}
            <a
              href="#pinterest"
              onClick={(e) => e.preventDefault()}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent text-white transition-all shadow-sm"
              title="Pinterest"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <span className="text-white/80 font-medium hidden sm:inline">Craving Something Delicious?</span>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="bg-accent hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full shadow-md flex items-center gap-2 transition-all active:scale-95"
            >
              <span>BOOK A TABLE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
