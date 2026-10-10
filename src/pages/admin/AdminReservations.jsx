import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  Users,
  Plus,
  Filter,
  CheckCircle2,
  AlertCircle,
  Search,
  ChevronDown,
  LayoutGrid,
  MapPin,
  Sparkles,
  Wine,
  Crown,
  ChefHat,
  ArrowRight,
  Check
} from 'lucide-react';

export default function AdminReservations() {
  const {
    reservations,
    updateReservationStatus,
    setIsBookingOpen,
    showToast
  } = useApp();

  const [timeBlockFilter, setTimeBlockFilter] = useState('all'); // 'all' | 'lunch' | 'dinner'
  const [partySizeFilter, setPartySizeFilter] = useState('all'); // 'all' | 'small' | 'medium' | 'large'
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('all');

  // Interactive Floor Tables
  const floorTables = [
    { id: 'T-01', area: 'Main Salon', seats: 2, status: 'Seated', guest: 'Michael Ross', time: '19:00' },
    { id: 'T-02', area: 'Main Salon', seats: 4, status: 'Available', guest: null, time: null },
    { id: 'T-04', area: 'Main Salon', seats: 4, status: 'Seated', guest: 'Alexander Wright', time: '19:30' },
    { id: 'T-08', area: 'Main Salon', seats: 6, status: 'Reserved', guest: 'Sarah Johnson', time: '20:15' },
    { id: 'C-01', area: 'Chef\'s Counter', seats: 2, status: 'Seated', guest: 'Dr. Emily Vance', time: '19:00' },
    { id: 'C-02', area: 'Chef\'s Counter', seats: 2, status: 'Seated', guest: 'Chef Guest', time: '19:15' },
    { id: 'V-01', area: 'Sommelier Vault', seats: 6, status: 'Reserved', guest: 'Bordeaux Connoisseurs', time: '20:00' },
    { id: 'GT-01', area: 'Garden Terrace', seats: 4, status: 'Available', guest: null, time: null }
  ];

  const filteredReservations = reservations.filter((r) => {
    const matchesSearch =
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;

    let matchesParty = true;
    if (partySizeFilter === 'small') matchesParty = r.guests <= 2;
    else if (partySizeFilter === 'medium') matchesParty = r.guests >= 3 && r.guests <= 5;
    else if (partySizeFilter === 'large') matchesParty = r.guests >= 6;

    let matchesTime = true;
    if (timeBlockFilter === 'lunch') {
      const hour = parseInt(r.time.split(':')[0], 10);
      matchesTime = hour >= 11 && hour <= 15;
    } else if (timeBlockFilter === 'dinner') {
      const hour = parseInt(r.time.split(':')[0], 10);
      matchesTime = hour >= 17 || hour <= 23;
    }

    let matchesRoom = true;
    if (selectedRoom !== 'all') {
      matchesRoom = (r.area || '').toLowerCase().includes(selectedRoom.toLowerCase());
    }

    return matchesSearch && matchesStatus && matchesParty && matchesTime && matchesRoom;
  });

  const totalGuests = filteredReservations.reduce((acc, r) => acc + (r.guests || 0), 0);

  const quickSeatReservation = (id, guestName) => {
    updateReservationStatus(id, 'Seated');
    showToast('Guest Seated', `${guestName} seated at assigned table.`);
  };

  const quickCompleteReservation = (id, guestName) => {
    updateReservationStatus(id, 'Completed');
    showToast('Table Cleared', `${guestName} dining service completed.`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              SERVICE FLOOR MAP
            </span>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
              ● 88% Capacity Booked
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-primary mt-1">Floor Management & Host Stand</h1>
          <p className="text-xs sm:text-sm text-textMuted mt-1">
            Tracking <span className="font-bold text-primary">{totalGuests} expected covers</span> across {filteredReservations.length} table bookings tonight.
          </p>
        </div>

        <button
          onClick={() => setIsBookingOpen(true)}
          className="btn-shimmer bg-accent hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md flex items-center gap-2 transition-transform active:scale-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Manual Table Seating</span>
        </button>
      </div>

      {/* ==================== INTERACTIVE VISUAL FLOOR MATRIX ==================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-accent" />
            <h3 className="font-heading text-xl font-bold text-primary">Live Floor Plan Matrix</h3>
          </div>

          {/* Room Filter Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {['all', 'Main Salon', 'Chef\'s Counter', 'Sommelier Vault', 'Garden Terrace'].map((room) => (
              <button
                key={room}
                onClick={() => setSelectedRoom(room)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedRoom === room
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-gray-100 text-textMuted hover:text-primary hover:bg-gray-200'
                }`}
              >
                {room === 'all' ? 'All Dining Rooms' : room}
              </button>
            ))}
          </div>
        </div>

        {/* Floor Table Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {floorTables.map((t) => (
            <div
              key={t.id}
              className={`p-3 rounded-2xl border text-center space-y-1 transition-all cursor-pointer hover:scale-105 shadow-xs ${
                t.status === 'Seated' ? 'bg-amber-50/80 border-amber-300' :
                t.status === 'Reserved' ? 'bg-indigo-50/80 border-indigo-200' :
                'bg-emerald-50/80 border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-mono font-bold text-primary">{t.id}</span>
                <span className={`w-2 h-2 rounded-full ${
                  t.status === 'Seated' ? 'bg-accent' :
                  t.status === 'Reserved' ? 'bg-indigo-500' :
                  'bg-emerald-500'
                }`}></span>
              </div>
              <p className="text-xs font-bold text-primary truncate">{t.guest || 'Available'}</p>
              <p className="text-[10px] text-textMuted">{t.seats} Seats • {t.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Data Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Filter Controls Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 shadow-sm border border-gray-200/90 space-y-6">
          <div className="flex items-center gap-2 font-heading text-lg font-bold text-primary">
            <Filter className="w-4 h-4 text-accent" />
            <span>Search & Filter</span>
          </div>

          {/* Search Filter */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted">
              Guest / Ref Code
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search guest or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-low pl-8 pr-3 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-accent focus:outline-none border border-gray-200"
              />
            </div>
          </div>

          {/* Time Block Filter */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted">
              Service Time Window
            </label>
            <div className="flex flex-col gap-1.5 text-xs">
              <button
                onClick={() => setTimeBlockFilter('all')}
                className={`py-2 px-3 rounded-xl font-bold text-left transition-colors ${
                  timeBlockFilter === 'all' ? 'bg-primary text-white shadow-xs' : 'bg-surface-container-low text-textMuted hover:text-primary'
                }`}
              >
                All Day Service
              </button>
              <button
                onClick={() => setTimeBlockFilter('lunch')}
                className={`py-2 px-3 rounded-xl font-bold text-left transition-colors ${
                  timeBlockFilter === 'lunch' ? 'bg-primary text-white shadow-xs' : 'bg-surface-container-low text-textMuted hover:text-primary'
                }`}
              >
                Lunch Service (11am - 3pm)
              </button>
              <button
                onClick={() => setTimeBlockFilter('dinner')}
                className={`py-2 px-3 rounded-xl font-bold text-left transition-colors ${
                  timeBlockFilter === 'dinner' ? 'bg-primary text-white shadow-xs' : 'bg-surface-container-low text-textMuted hover:text-primary'
                }`}
              >
                Dinner Service (5pm - 11pm)
              </button>
            </div>
          </div>

          {/* Party Size */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted">
              Party Size
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
              <button
                onClick={() => setPartySizeFilter('all')}
                className={`py-2 rounded-xl text-center ${partySizeFilter === 'all' ? 'bg-primary text-white shadow-xs' : 'bg-surface-container-low text-textMuted'}`}
              >
                All
              </button>
              <button
                onClick={() => setPartySizeFilter('small')}
                className={`py-2 rounded-xl text-center ${partySizeFilter === 'small' ? 'bg-primary text-white shadow-xs' : 'bg-surface-container-low text-textMuted'}`}
              >
                1-2
              </button>
              <button
                onClick={() => setPartySizeFilter('medium')}
                className={`py-2 rounded-xl text-center ${partySizeFilter === 'medium' ? 'bg-primary text-white shadow-xs' : 'bg-surface-container-low text-textMuted'}`}
              >
                3-5
              </button>
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-textMuted">
              Status Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-surface-container-low p-2.5 rounded-xl text-xs font-bold text-primary focus:outline-none border border-gray-200"
            >
              <option value="all">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Seated">Seated</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

        </div>

        {/* Table Area */}
        <div className="lg:col-span-9 bg-white rounded-3xl shadow-sm border border-gray-200/90 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-textMuted font-bold uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6">Guest / VIP Tier</th>
                  <th className="py-4 px-6">Room & Table</th>
                  <th className="py-4 px-6">Service Time</th>
                  <th className="py-4 px-6">Allergies & Requests</th>
                  <th className="py-4 px-6 text-right">Quick Seating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReservations.map((res) => (
                  <tr key={res.id} className="hover:bg-amber-50/40 transition-colors group">
                    
                    {/* Ref / Guest */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-xs text-primary">{res.id}</span>
                          <span className="text-[9px] uppercase font-bold text-accent bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            Gold VIP
                          </span>
                        </div>
                        <p className="font-bold text-primary text-sm">{res.customerName}</p>
                        <p className="text-[11px] text-textMuted">{res.customerPhone}</p>
                      </div>
                    </td>

                    {/* Area & Table */}
                    <td className="py-4 px-6">
                      <div>
                        <span className="font-bold text-primary block">{res.diningArea || res.area || "Chef's Counter"}</span>
                        <span className="text-[11px] font-mono text-accent font-bold bg-amber-50/80 px-2 py-0.5 rounded-md border border-amber-200/60 inline-block mt-0.5">
                          Table {res.tableNumber || 'T-16'}
                        </span>
                      </div>
                    </td>

                    {/* Time / Party */}
                    <td className="py-4 px-6">
                      <div>
                        <span className="font-bold text-primary block">{res.time} ({res.date})</span>
                        <span className="text-[11px] text-textMuted font-medium">{res.guests} Expected Covers</span>
                      </div>
                    </td>

                    {/* Occasion & Dietary */}
                    <td className="py-4 px-6 max-w-xs">
                      <div className="space-y-1">
                        <span className="font-semibold text-primary block">{res.occasion || 'Degustation Tasting'}</span>
                        <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 font-semibold inline-block">
                          Shellfish Alert • Still Water
                        </span>
                      </div>
                    </td>

                    {/* Quick Seating Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {res.status === 'Confirmed' && (
                          <button
                            onClick={() => quickSeatReservation(res.id, res.customerName)}
                            className="px-3 py-1.5 rounded-xl bg-primary hover:bg-emerald-950 text-white font-bold text-[11px] shadow-xs active:scale-95 transition-all flex items-center gap-1"
                          >
                            <Check className="w-3 h-3 text-accent" />
                            <span>Seat</span>
                          </button>
                        )}

                        {res.status === 'Seated' && (
                          <button
                            onClick={() => quickCompleteReservation(res.id, res.customerName)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs active:scale-95 transition-all flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Complete</span>
                          </button>
                        )}

                        <select
                          value={res.status}
                          onChange={(e) => updateReservationStatus(res.id, e.target.value)}
                          className={`font-bold text-[11px] uppercase px-2.5 py-1.5 rounded-xl border focus:outline-none ${
                            res.status === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : res.status === 'Seated'
                              ? 'bg-amber-50 text-accent border-amber-300'
                              : res.status === 'Completed'
                              ? 'bg-gray-100 text-gray-700 border-gray-200'
                              : 'bg-rose-50 text-rose-800 border-rose-200'
                          }`}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Seated">Seated</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
