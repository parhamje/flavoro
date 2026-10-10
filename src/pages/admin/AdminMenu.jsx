import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Sparkles,
  Utensils,
  CheckCircle2,
  AlertCircle,
  Eye,
  DollarSign
} from 'lucide-react';

export default function AdminMenu() {
  const {
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability,
    showToast
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formState, setFormState] = useState({
    name: '',
    category: 'mains',
    price: 24.00,
    tags: 'Vegetarian',
    description: '',
    image: './assets/pasta.jpg',
    isSpecial: false
  });

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'starters', label: 'Starters' },
    { id: 'mains', label: 'Mains' },
    { id: 'pizzas', label: 'Pizzas' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'drinks', label: 'Drinks' }
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormState({
      name: '',
      category: 'mains',
      price: 24.00,
      tags: 'Vegetarian',
      description: '',
      image: './assets/pasta.jpg',
      isSpecial: false
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormState({
      name: item.name,
      category: item.category,
      price: item.price,
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags,
      description: item.description,
      image: item.image,
      isSpecial: item.isSpecial || false
    });
    setIsAddModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      ...formState,
      price: parseFloat(formState.price),
      tags: typeof formState.tags === 'string' ? formState.tags.split(',').map((t) => t.trim()) : formState.tags
    };

    if (editingItem) {
      updateMenuItem({ ...editingItem, ...payload });
      showToast('Dish Updated', `${payload.name} has been updated.`);
    } else {
      addMenuItem(payload);
      showToast('Dish Added', `${payload.name} added to menu.`);
    }
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            ✦ LIVE INVENTORY & MENU ✦
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-primary mt-1.5">
            Menu Management
          </h1>
          <p className="text-xs sm:text-sm text-textMuted">
            Curate offerings, update portion availability, and toggle 86'd items in real-time.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-shimmer bg-accent hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md flex items-center gap-2 transition-all transform active:scale-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Recipe</span>
        </button>
      </div>

      {/* Filter and Search Bar with Smooth Sliding Pills */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-gray-200/90 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80 group">
          <Search className="w-4 h-4 text-textMuted group-focus-within:text-accent absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200" />
          <input
            type="text"
            placeholder="Search menu recipes & ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low py-2.5 pl-11 pr-4 rounded-2xl text-xs font-semibold text-primary focus:ring-2 focus:ring-accent/20 focus:border-accent border border-transparent focus:outline-none transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                activeCategory === c.id
                  ? 'bg-primary text-white shadow-sm scale-105'
                  : 'bg-surface-container-low text-textMuted hover:text-primary hover:bg-gray-200/70'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

      </div>

      {/* Data Table with Smooth Row Hover & Micro-Animations */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200/90 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-textMuted font-bold uppercase tracking-wider border-b border-gray-200/80">
              <tr>
                <th className="py-4 px-6">Recipe & Sourcing</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6 text-right">Price</th>
                <th className="py-4 px-6 text-center">Live Availability</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((dish) => (
                <tr key={dish.id} className="hover:bg-amber-50/40 transition-colors duration-150 group">
                  
                  {/* Dish Name & Image */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="relative overflow-hidden rounded-2xl w-12 h-12 flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-sm text-primary truncate block group-hover:text-accent transition-colors">
                            {dish.name}
                          </span>
                          {dish.isSpecial && (
                            <span className="bg-amber-100 text-accent font-bold text-[9px] uppercase px-2 py-0.5 rounded-full border border-amber-200">
                              Special
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-textMuted truncate">{dish.description}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-surface-container-high text-primary font-bold text-[10px] uppercase">
                      {dish.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-6 text-right font-bold text-sm text-primary">
                    ${dish.price.toFixed(2)}
                  </td>

                  {/* Animated Availability Toggle Switch */}
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => {
                        toggleItemAvailability(dish.id);
                        showToast('Availability Changed', `${dish.name} is now ${!dish.inStock ? 'In Stock' : '86\'d'}`);
                      }}
                      className={`relative inline-flex h-7 w-28 items-center rounded-full p-1 transition-colors duration-300 shadow-inner ${
                        dish.inStock ? 'bg-emerald-600' : 'bg-rose-500'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                          dish.inStock ? 'translate-x-0' : 'translate-x-20'
                        }`}
                      />
                      <span className={`text-[10px] font-bold uppercase tracking-wider text-white absolute ${
                        dish.inStock ? 'right-2.5' : 'left-2.5'
                      }`}>
                        {dish.inStock ? 'In Stock' : '86\'d'}
                      </span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(dish)}
                        className="p-2 rounded-xl text-textMuted hover:text-accent hover:bg-orange-50 transition-colors"
                        title="Edit dish"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          deleteMenuItem(dish.id);
                          showToast('Dish Removed', `${dish.name} deleted.`);
                        }}
                        className="p-2 rounded-xl text-textMuted hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Dish Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-modal-backdrop">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-gray-100 animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-heading text-2xl font-bold text-primary">
                {editingItem ? 'Edit Culinary Recipe' : 'Add New Recipe'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase text-textMuted mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-surface-container-low p-3 rounded-2xl text-xs font-semibold text-primary focus:ring-2 focus:ring-accent focus:outline-none"
                  placeholder="e.g. Black Truffle Tagliatelle"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-textMuted mb-1">Category</label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    className="w-full bg-surface-container-low p-3 rounded-2xl text-xs font-semibold text-primary focus:ring-2 focus:ring-accent focus:outline-none"
                  >
                    <option value="starters">Starters</option>
                    <option value="mains">Mains</option>
                    <option value="pizzas">Pizzas</option>
                    <option value="desserts">Desserts</option>
                    <option value="drinks">Drinks</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-textMuted mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formState.price}
                    onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                    className="w-full bg-surface-container-low p-3 rounded-2xl text-xs font-semibold text-primary focus:ring-2 focus:ring-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-textMuted mb-1">Image Asset URL</label>
                <input
                  type="text"
                  value={formState.image}
                  onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                  className="w-full bg-surface-container-low p-3 rounded-2xl text-xs font-semibold text-primary focus:ring-2 focus:ring-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-textMuted mb-1">Culinary Description</label>
                <textarea
                  rows="3"
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full bg-surface-container-low p-3 rounded-2xl text-xs font-semibold text-primary focus:ring-2 focus:ring-accent focus:outline-none"
                  placeholder="Ingredients, culinary techniques, tasting notes..."
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isSpecial"
                  checked={formState.isSpecial}
                  onChange={(e) => setFormState({ ...formState, isSpecial: e.target.checked })}
                  className="rounded text-accent focus:ring-accent w-4 h-4"
                />
                <label htmlFor="isSpecial" className="text-xs font-bold text-primary cursor-pointer">
                  Featured as Chef's Special (Highlights in Home & Menu)
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 rounded-full border border-gray-200 text-xs font-bold uppercase text-textMuted hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-shimmer flex-1 py-3 rounded-full bg-primary hover:bg-emerald-950 text-white text-xs font-bold uppercase shadow-md transition-transform active:scale-95"
                >
                  Save Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
