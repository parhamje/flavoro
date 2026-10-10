import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Plus,
  Clock,
  CheckCircle,
  X,
  ChefHat,
  Sparkles,
  Shield,
  ArrowRight
} from 'lucide-react';

export default function AdminStaff() {
  const { staffList, toggleStaffShift, addStaffMember } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: 'SOUS CHEF',
    shift: '08:00 - 16:00',
    station: 'Main Kitchen',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addStaffMember(newStaff);
    setIsAddModalOpen(false);
    setNewStaff({
      name: '',
      role: 'SOUS CHEF',
      shift: '08:00 - 16:00',
      station: 'Main Kitchen',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80'
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-accent">TEAM OPERATIONS</span>
          <h1 className="font-heading text-4xl font-bold text-primary">Staff Roster</h1>
          <p className="text-xs sm:text-sm text-textMuted mt-1">
            Coordinate shifts, assign stations, and manage active service floor personnel.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-accent hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md flex items-center gap-2 transition-transform active:scale-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Staff Cards Grid Matching Stitch Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffList.map((staff) => {
          const isOnShift = staff.status === 'On Shift';
          return (
            <div
              key={staff.id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-xl transition-all relative overflow-hidden"
            >
              {/* Subtle top decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none"></div>

              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-md">
                    <img
                      src={staff.avatar}
                      alt={staff.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-primary">{staff.name}</h3>
                    <span className="inline-block bg-primary text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded-md mb-2">
                      {staff.role}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <span className={`w-2 h-2 rounded-full ${isOnShift ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></span>
                      <span className={isOnShift ? 'text-emerald-700' : 'text-textMuted'}>
                        {staff.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-textMuted bg-surface-container-low p-3 rounded-xl">
                  <p><span className="font-bold text-primary">Station:</span> {staff.station}</p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span>{staff.shift}</span>
                  </p>
                </div>
              </div>

              {/* Bottom Shift Action Button */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleStaffShift(staff.id)}
                  className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${
                    isOnShift
                      ? 'border-gray-200 text-textMuted hover:bg-gray-100'
                      : 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  {isOnShift ? 'Clock Out' : 'Clock In'}
                </button>

                <span className="text-[10px] font-mono text-textMuted font-bold">
                  #{staff.id}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Staff Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-heading text-2xl font-bold text-primary">Add Staff Member</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-textMuted uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clara Moreau"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="w-full bg-surface-container-low p-3 rounded-xl border border-transparent focus:border-accent font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-textMuted uppercase mb-1">Role / Job Title</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                  className="w-full bg-surface-container-low p-3 rounded-xl border border-transparent focus:border-accent font-semibold focus:outline-none"
                >
                  <option value="EXECUTIVE CHEF">EXECUTIVE CHEF</option>
                  <option value="HEAD SOMMELIER">HEAD SOMMELIER</option>
                  <option value="HEAD PASTRY CHEF">HEAD PASTRY CHEF</option>
                  <option value="SOUS CHEF">SOUS CHEF</option>
                  <option value="MAITRE D'">MAITRE D'</option>
                  <option value="LEAD MIXOLOGIST">LEAD MIXOLOGIST</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-textMuted uppercase mb-1">Shift Hours</label>
                <input
                  type="text"
                  placeholder="08:00 - 16:00"
                  value={newStaff.shift}
                  onChange={(e) => setNewStaff({ ...newStaff, shift: e.target.value })}
                  className="w-full bg-surface-container-low p-3 rounded-xl border border-transparent focus:border-accent font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-textMuted uppercase mb-1">Assigned Station</label>
                <input
                  type="text"
                  placeholder="Pastry Lab, Wine Cellar, Grill..."
                  value={newStaff.station}
                  onChange={(e) => setNewStaff({ ...newStaff, station: e.target.value })}
                  className="w-full bg-surface-container-low p-3 rounded-xl border border-transparent focus:border-accent font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-textMuted uppercase mb-1">Photo URL</label>
                <input
                  type="url"
                  required
                  value={newStaff.avatar}
                  onChange={(e) => setNewStaff({ ...newStaff, avatar: e.target.value })}
                  className="w-full bg-surface-container-low p-3 rounded-xl border border-transparent focus:border-accent font-semibold focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-textMuted hover:text-primary font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-forest text-white px-6 py-2.5 rounded-full font-bold uppercase tracking-wider shadow-md"
                >
                  Add to Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
