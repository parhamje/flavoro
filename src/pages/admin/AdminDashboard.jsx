import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  DollarSign,
  CalendarDays,
  Users,
  Receipt,
  ArrowUpRight,
  Sparkles,
  Utensils,
  Flame,
  Clock,
  Wine,
  ChefHat,
  CheckCircle2,
  AlertCircle,
  Activity,
  Layers,
  Check,
  ChevronRight,
  RefreshCw,
  BellRing
} from 'lucide-react';

export default function AdminDashboard({ onNavigateTab }) {
  const { reservations, menuItems, staffList, showToast } = useApp();
  const [chartView, setChartView] = useState('weekly'); // 'weekly' | 'daily'
  const [selectedStation, setSelectedStation] = useState('all');

  // Interactive Live KDS Expedite Stream Tickets
  const [tickets, setTickets] = useState([
    {
      id: 'TCK-104',
      table: 'T-16 (Chef\'s Counter)',
      covers: 4,
      server: 'Elena R.',
      timeElapsed: '12m',
      courses: ['5-Course Degustation', 'Sommelier Reserve Wine Flight'],
      status: 'Plating', // 'Fired' | 'Plating' | 'Pass Ready' | 'Served'
      specialNotes: 'Shellfish sensitivity, extra shaved Alba truffle'
    },
    {
      id: 'TCK-105',
      table: 'T-04 (Main Salon)',
      covers: 2,
      server: 'Marco B.',
      timeElapsed: '8m',
      courses: ['Faroe Island Salmon (Med)', 'Creamy Mushroom Tagliatelle'],
      status: 'Fired',
      specialNotes: 'Sparkling Lurisia water requested'
    },
    {
      id: 'TCK-106',
      table: 'V-02 (Sommelier Vault)',
      covers: 6,
      server: 'Lucas V.',
      timeElapsed: '16m',
      courses: ['Barolo Masterclass Flight', 'Artisanal Truffle & Formaggi Platter'],
      status: 'Pass Ready',
      specialNotes: 'VIP Connoisseur Gold Tier'
    },
    {
      id: 'TCK-107',
      table: 'GT-08 (Garden Terrace)',
      covers: 3,
      server: 'Sophia L.',
      timeElapsed: '4m',
      courses: ['Wood-Fired Margherita', 'Burrata Heirloom Salad', '2x Rosemary Old Fashioned'],
      status: 'Fired',
      specialNotes: 'Outdoor heating active'
    }
  ]);

  const advanceTicketStatus = (ticketId) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        let nextStatus = t.status;
        if (t.status === 'Fired') nextStatus = 'Plating';
        else if (t.status === 'Plating') nextStatus = 'Pass Ready';
        else if (t.status === 'Pass Ready') nextStatus = 'Served';
        else nextStatus = 'Served';
        showToast(`Ticket ${t.id} Updated`, `Table ${t.table} is now: ${nextStatus}`);
        return { ...t, status: nextStatus };
      })
    );
  };

  const totalRevenue = '$48,920';
  const activeReservations = reservations.filter((r) => r.status === 'Confirmed' || r.status === 'Seated');
  const onShiftStaffCount = staffList.filter((s) => s.status === 'On Shift').length;

  // 4 Kitchen Station Heartbeats
  const stations = [
    {
      id: 'hearth',
      name: 'Hearth & Wood Grill',
      chef: 'Chef Marcus Vance',
      activeTickets: 8,
      avgTime: '14m',
      status: 'Optimal',
      color: 'emerald'
    },
    {
      id: 'pasta',
      name: 'Handmade Pasta & Truffle',
      chef: 'Sous Chef Lorenzo',
      activeTickets: 12,
      avgTime: '11m',
      status: 'High Rush',
      color: 'amber'
    },
    {
      id: 'cellar',
      name: 'Sommelier Vault Pass',
      chef: 'Lucas Vance (Sommelier)',
      activeTickets: 15,
      avgTime: '4m',
      status: 'Optimal',
      color: 'emerald'
    },
    {
      id: 'pastry',
      name: 'Valrhona Pastry & Gelato',
      chef: 'Chef Amelie Laurent',
      activeTickets: 6,
      avgTime: '8m',
      status: 'Steady',
      color: 'emerald'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* ==================== LIVE KITCHEN EXPEDITE COMMAND BANNER ==================== */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-emerald-950 bg-gradient-to-r from-primary via-[#012f26] to-[#011a15] min-h-[220px] flex items-center">
        {/* Background Imagen Photography */}
        <img
          src="./assets/admin_kitchen_expedite.jpg"
          alt="Kitchen Expedite Live Service"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35 mix-blend-luminosity"
        />

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-10 max-w-4xl space-y-4 text-white">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full bg-accent text-white shadow-md flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 animate-pulse" />
              <span>Dinner Service In Progress • Station 1 Expedite</span>
            </span>
            <span className="text-xs font-mono font-bold bg-white/10 px-2.5 py-1 rounded-lg border border-white/15 text-amber-300">
              KDS PASSED: 124 COVERS
            </span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              All 4 Brigade Stations Operational
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Evening Gastronomic Command
          </h1>

          <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
            Real-time kitchen line throughput, live table turnovers, and sommelier cellar pairings. Average dinner cover pace is clocked at an optimal 14-minute turn.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-amber-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>42 Active Covers Seated</span>
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-1.5 text-white/90">
              <Clock className="w-4 h-4 text-accent" />
              <span>Avg Cook Time: 13.8m</span>
            </span>
            <span className="text-white/40">•</span>
            <button
              onClick={() => onNavigateTab('reservations')}
              className="text-amber-300 hover:text-white font-bold underline flex items-center gap-1 transition-colors"
            >
              <span>Inspect Floor Map</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ==================== 4 STATION BRIGADE HEARTBEATS ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stations.map((st) => (
          <div
            key={st.id}
            className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-sm space-y-3 hover:shadow-md transition-all relative overflow-hidden group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-textMuted">{st.name}</span>
              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                st.status === 'High Rush' ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                {st.status}
              </span>
            </div>

            <div>
              <p className="text-sm font-bold text-primary truncate">{st.chef}</p>
              <div className="flex items-center justify-between text-xs text-textMuted mt-1">
                <span>{st.activeTickets} Active Tickets</span>
                <span className="font-bold text-accent">{st.avgTime} Avg</span>
              </div>
            </div>

            {/* Station Load Indicator Bar */}
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${st.status === 'High Rush' ? 'bg-accent' : 'bg-emerald-500'}`}
                style={{ width: `${Math.min(100, st.activeTickets * 8)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* ==================== EXECUTIVE REVENUE & KPI BAR ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/90 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-textMuted">Gross Revenue Today</span>
            <div className="w-8 h-8 rounded-full bg-amber-50 text-accent flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-4">
            <h3 className="font-heading text-3xl font-bold text-primary">{totalRevenue}</h3>
            <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-bold border border-emerald-200">
              <TrendingUp className="w-3 h-3" />
              <span>+14.8%</span>
            </div>
          </div>
          <p className="text-[11px] text-textMuted mt-2">vs. $42,600 yesterday (Fine Dining Target Met)</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/90 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-textMuted">Dinner Floor Occupancy</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-4">
            <h3 className="font-heading text-3xl font-bold text-primary">{activeReservations.length} Tables</h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              92% Booked
            </span>
          </div>
          <p className="text-[11px] text-textMuted mt-2">4 VIP Chef Tables currently seated</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/90 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-textMuted">Average Cover (PPA)</span>
            <div className="w-8 h-8 rounded-full bg-amber-50 text-accent flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-4">
            <h3 className="font-heading text-3xl font-bold text-primary">$138.50</h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              +8.2%
            </span>
          </div>
          <p className="text-[11px] text-textMuted mt-2">Driven by Barolo pairing attach rate</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/90 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-textMuted">Food Cost Ratio</span>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-4">
            <h3 className="font-heading text-3xl font-bold text-primary">26.4%</h3>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
              Benchmark &lt; 28%
            </span>
          </div>
          <p className="text-[11px] text-textMuted mt-2">Organic farm-to-table cost target</p>
        </div>

      </div>

      {/* ==================== INTERACTIVE KDS EXPEDITE STREAM ==================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200/90 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-accent text-white">
                LIVE EXPEDITE STREAM
              </span>
              <span className="text-xs text-textMuted font-mono">KDS PASS 1.0</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-primary mt-1">Kitchen Display Tickets & Pass</h3>
            <p className="text-xs text-textMuted">Advance tickets through firing, plating, pass inspection, and table delivery.</p>
          </div>

          <button
            onClick={() => showToast('Stream Refreshed', 'Synced with POS line.')}
            className="px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-primary text-xs font-bold border border-gray-200 flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-accent" />
            <span>Refresh Pass</span>
          </button>
        </div>

        {/* Ticket Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {tickets.map((t) => (
            <div
              key={t.id}
              className={`rounded-3xl p-5 border flex flex-col justify-between space-y-4 transition-all shadow-xs ${
                t.status === 'Fired' ? 'bg-amber-50/40 border-amber-300' :
                t.status === 'Plating' ? 'bg-orange-50/40 border-orange-300' :
                t.status === 'Pass Ready' ? 'bg-emerald-50/50 border-emerald-300' :
                'bg-gray-50 border-gray-200 opacity-75'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-primary">{t.id}</span>
                  <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-md border border-gray-200 font-bold text-textMuted">
                    {t.timeElapsed} ago
                  </span>
                </div>

                <div>
                  <h4 className="font-heading text-lg font-bold text-primary">{t.table}</h4>
                  <p className="text-xs text-textMuted">{t.covers} Covers • Server: {t.server}</p>
                </div>

                {/* Courses */}
                <div className="space-y-1.5 bg-white p-3 rounded-2xl border border-gray-100 text-xs">
                  {t.courses.map((c, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-primary font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      <span>{c}</span>
                    </div>
                  ))}
                  {t.specialNotes && (
                    <p className="text-[10px] text-accent font-semibold pt-1 border-t border-gray-100">
                      ★ {t.specialNotes}
                    </p>
                  )}
                </div>
              </div>

              {/* Status Action Button */}
              <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between gap-2">
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                  t.status === 'Fired' ? 'bg-amber-100 text-amber-900' :
                  t.status === 'Plating' ? 'bg-orange-100 text-orange-900' :
                  t.status === 'Pass Ready' ? 'bg-emerald-100 text-emerald-900' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {t.status}
                </span>

                {t.status !== 'Served' ? (
                  <button
                    onClick={() => advanceTicketStatus(t.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-emerald-950 text-white font-bold text-[11px] shadow-xs active:scale-95 transition-all flex items-center gap-1"
                  >
                    <span>Advance</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                ) : (
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Delivered</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== REVENUE & DINING COVERS PERFORMANCE GRAPH ==================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200/90 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">FINANCIAL YIELD</span>
            <h3 className="font-heading text-2xl font-bold text-primary">Weekly Service Revenue Curve</h3>
            <p className="text-xs text-textMuted">Gross dining sales across lunch, dinner, and private vault tastings.</p>
          </div>

          <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200">
            <button
              onClick={() => setChartView('weekly')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                chartView === 'weekly' ? 'bg-primary text-white shadow-sm' : 'text-textMuted hover:text-textMain'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setChartView('daily')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                chartView === 'daily' ? 'bg-primary text-white shadow-sm' : 'text-textMuted hover:text-textMain'
              }`}
            >
              Last 30 Days
            </button>
          </div>
        </div>

        {/* SVG Revenue Chart */}
        <div className="h-64 w-full relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fc8f34" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#fc8f34" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Horizontal Lines */}
            <line x1="0" y1="40" x2="700" y2="40" stroke="#f1ede8" strokeDasharray="4 4" />
            <line x1="0" y1="90" x2="700" y2="90" stroke="#f1ede8" strokeDasharray="4 4" />
            <line x1="0" y1="140" x2="700" y2="140" stroke="#f1ede8" strokeDasharray="4 4" />

            {/* Area Fill */}
            <path
              d="M 0 170 Q 100 130, 200 140 T 400 90 T 550 50 T 700 30 L 700 200 L 0 200 Z"
              fill="url(#revenueGrad)"
            />

            {/* Main Spline Curve */}
            <path
              d="M 0 170 Q 100 130, 200 140 T 400 90 T 550 50 T 700 30"
              fill="none"
              stroke="#fc8f34"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Highlight Points */}
            <circle cx="200" cy="140" r="5" fill="#01261f" stroke="#fc8f34" strokeWidth="2.5" />
            <circle cx="400" cy="90" r="5" fill="#01261f" stroke="#fc8f34" strokeWidth="2.5" />
            <circle cx="550" cy="50" r="5" fill="#01261f" stroke="#fc8f34" strokeWidth="2.5" />
            <circle cx="700" cy="30" r="6" fill="#fc8f34" stroke="#ffffff" strokeWidth="2.5" />
          </svg>

          {/* X Axis Labels */}
          <div className="flex justify-between text-[11px] font-bold text-textMuted mt-3 px-2">
            <span>Mon ($5.8k)</span>
            <span>Tue ($6.4k)</span>
            <span>Wed ($7.1k)</span>
            <span>Thu ($8.9k)</span>
            <span>Fri ($12.4k)</span>
            <span>Sat ($14.2k)</span>
            <span>Sun (Tonight • $48.9k)</span>
          </div>
        </div>
      </div>

      {/* ==================== FLOOR STATUS & INVENTORY SNAPSHOT ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Active Reservations Floor Monitor */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200/90 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-heading text-xl font-bold text-primary">Floor Tables Status</h4>
              <p className="text-xs text-textMuted">Upcoming seatings and allocated dining sections.</p>
            </div>
            <button
              onClick={() => onNavigateTab('reservations')}
              className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
            >
              <span>Manage Floor</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {reservations.slice(0, 4).map((res) => (
              <div key={res.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container-low border border-gray-100 hover:border-accent transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-primary font-bold text-xs flex items-center justify-center shadow-inner">
                    {res.tableNumber || 'T-16'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary">{res.customerName}</p>
                    <p className="text-[11px] text-textMuted">{res.guests} Guests • {res.time} • {res.diningArea || "Chef's Counter"}</p>
                  </div>
                </div>

                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                  res.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                  res.status === 'Seated' ? 'bg-amber-50 text-accent border border-amber-200' :
                  'bg-gray-100 text-textMuted'
                }`}>
                  {res.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Signature Dishes */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200/90 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-heading text-xl font-bold text-primary">Chef's Signature Velocity</h4>
              <p className="text-xs text-textMuted">Tonight's highest-turn items on the kitchen line.</p>
            </div>
            <button
              onClick={() => onNavigateTab('menu')}
              className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
            >
              <span>View Inventory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {menuItems.slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low border border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-11 h-11 rounded-xl object-cover shadow-xs"
                  />
                  <div>
                    <p className="text-xs font-bold text-primary truncate max-w-[180px]">{item.name}</p>
                    <p className="text-[11px] text-accent font-semibold">${item.price.toFixed(2)} • {item.category}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    In Stock
                  </span>
                  <p className="text-[10px] text-textMuted mt-0.5">38 Plated Tonight</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
