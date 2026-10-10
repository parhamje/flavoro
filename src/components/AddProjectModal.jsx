import React, { useState, useRef } from 'react';
import {
  X,
  ChevronDown,
  Upload,
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';

export default function AddProjectModal({ isOpen, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    projectName: '',
    selectedIndustries: [],
    projectDuration: '',
    projectCost: '',
    startMonth: '',
    startYear: '',
    description: '',
    attachments: []
  });

  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const availableIndustries = [
    'Brand Identity & Design',
    'Haute Gastronomy & Dining',
    'Marketing & Advertising',
    'E-Commerce & Retail',
    'Hospitality & Events',
    'Art Direction & Photography',
    'Web & Mobile Development',
    'Packaging & Print',
    'Architecture & Interior Design'
  ];

  const durationOptions = [
    'Less than 1 month',
    '1 - 3 months',
    '3 - 6 months',
    '6 - 12 months',
    '1+ years',
    'Ongoing retainer'
  ];

  const months = [
    { value: '01', label: 'January (01)' },
    { value: '02', label: 'February (02)' },
    { value: '03', label: 'March (03)' },
    { value: '04', label: 'April (04)' },
    { value: '05', label: 'May (05)' },
    { value: '06', label: 'June (06)' },
    { value: '07', label: 'July (07)' },
    { value: '08', label: 'August (08)' },
    { value: '09', label: 'September (09)' },
    { value: '10', label: 'October (10)' },
    { value: '11', label: 'November (11)' },
    { value: '12', label: 'December (12)' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => String(currentYear - i));

  if (!isOpen) return null;

  const toggleIndustry = (industry) => {
    setFormData((prev) => {
      const exists = prev.selectedIndustries.includes(industry);
      if (exists) {
        return {
          ...prev,
          selectedIndustries: prev.selectedIndustries.filter((i) => i !== industry)
        };
      }
      if (prev.selectedIndustries.length >= 6) {
        alert('You can select at most 6 industries.');
        return prev;
      }
      return {
        ...prev,
        selectedIndustries: [...prev.selectedIndustries, industry]
      };
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        preview: URL.createObjectURL(file)
      }));
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles]
      }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        preview: URL.createObjectURL(file)
      }));
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles]
      }));
    }
  };

  const removeAttachment = (id) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((f) => f.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.projectName.trim()) {
      alert('Please enter a project name.');
      return;
    }
    if (onSubmitSuccess) {
      onSubmitSuccess(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-modal-backdrop">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-3xl overflow-hidden relative my-8 animate-modal-pop flex flex-col">
        
        {/* Modal Top Close */}
        <div className="p-6 sm:px-10 pt-8 pb-4 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Add a new project to your portfolio
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:px-10 py-6 space-y-6 overflow-y-auto max-h-[75vh]">
          
          {/* 1. Project Name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-900">
              Project name
            </label>
            <p className="text-xs text-gray-500">
              Create a clear, descriptive name for your project.
            </p>
            <input
              type="text"
              maxLength={50}
              value={formData.projectName}
              onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              placeholder="Nike Women's Division - Fall Marketing Campaign."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm text-gray-900 placeholder-gray-400 transition-colors outline-none"
            />
            <div className="text-right text-xs text-gray-400">
              {formData.projectName.length}/50 characters
            </div>
          </div>

          {/* 2. Industry Selection */}
          <div className="space-y-1.5 relative">
            <label className="block text-sm font-semibold text-gray-900">
              Industry
            </label>
            <p className="text-xs text-gray-500">
              Select at most 6.
            </p>

            {/* Custom Dropdown Trigger */}
            <div
              onClick={() => setIsIndustryDropdownOpen(!isIndustryDropdownOpen)}
              className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 bg-white flex items-center justify-between cursor-pointer transition-colors"
            >
              {formData.selectedIndustries.length === 0 ? (
                <span className="text-sm text-gray-400">Select an industry from the list.</span>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {formData.selectedIndustries.map((ind) => (
                    <span
                      key={ind}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-xs font-semibold text-gray-800 border border-gray-200"
                    >
                      {ind}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleIndustry(ind);
                        }}
                        className="hover:text-red-500 ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isIndustryDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Options Menu */}
            {isIndustryDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl border border-gray-200 shadow-xl z-30 p-2 max-h-56 overflow-y-auto space-y-1">
                {availableIndustries.map((ind) => {
                  const isSelected = formData.selectedIndustries.includes(ind);
                  return (
                    <div
                      key={ind}
                      onClick={() => toggleIndustry(ind)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium cursor-pointer flex items-center justify-between transition-colors ${
                        isSelected ? 'bg-gray-900 text-white' : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span>{ind}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Project Duration & Project Cost */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Duration */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-900">
                Project duration
              </label>
              <select
                value={formData.projectDuration}
                onChange={(e) => setFormData({ ...formData, projectDuration: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm text-gray-900 bg-white transition-colors outline-none cursor-pointer"
              >
                <option value="">Select duration.</option>
                {durationOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Cost */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-900">
                Project cost
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.projectCost}
                  onChange={(e) => setFormData({ ...formData, projectCost: e.target.value })}
                  placeholder="$ Ex. 1000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm text-gray-900 placeholder-gray-400 transition-colors outline-none"
                />
              </div>
            </div>

          </div>

          {/* 4. Project Started On (MM / YY) */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-900">
              Project started on
            </label>
            <div className="grid grid-cols-2 gap-4">
              <select
                value={formData.startMonth}
                onChange={(e) => setFormData({ ...formData, startMonth: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm text-gray-900 bg-white transition-colors outline-none cursor-pointer"
              >
                <option value="">MM</option>
                {months.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>

              <select
                value={formData.startYear}
                onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm text-gray-900 bg-white transition-colors outline-none cursor-pointer"
              >
                <option value="">YY</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 5. Project Description */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-900">
              Project description
            </label>
            <p className="text-xs text-gray-500">
              Use this space to share about your client, their goals, any challenges that came up, and how you dealt with them.
            </p>
            <textarea
              rows={5}
              maxLength={1400}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the project scope, culinary concepts, branding, and deliverables..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm text-gray-900 placeholder-gray-400 transition-colors outline-none resize-y"
            ></textarea>
            <div className="text-right text-xs text-gray-400">
              {formData.description.length}/1400 characters
            </div>
          </div>

          {/* 6. Attachments Drag & Drop */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Attachments
            </label>
            <p className="text-xs text-gray-500 leading-relaxed">
              Keep in mind that the first file you upload will appear in the thumbnail preview. We recommend the size 1024×768 with aspect ratio 4:3. Not sure what to upload?{' '}
              <a href="#suggestions" onClick={(e) => { e.preventDefault(); alert('We recommend uploading high-res photography, design sketches, or project case studies.'); }} className="text-gray-900 underline font-medium hover:text-accent">
                Check out our suggestions
              </a>
            </p>

            {/* Dropzone Container */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all flex flex-col items-center justify-center space-y-3 ${
                isDragging ? 'border-gray-900 bg-gray-50 scale-101' : 'border-gray-300 bg-gray-50/50 hover:bg-gray-50'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                accept="image/*,.pdf,.doc,.docx"
                className="hidden"
              />

              <p className="text-sm font-medium text-gray-700">
                Drag and drop files or
              </p>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2.5 rounded-xl bg-white border border-gray-300 hover:border-gray-900 text-xs font-semibold text-gray-900 shadow-sm flex items-center gap-2 transition-all hover:bg-gray-50 active:scale-95"
              >
                <Upload className="w-4 h-4 text-gray-700" />
                <span>Choose files</span>
              </button>
            </div>

            {/* Uploaded File Previews */}
            {formData.attachments.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {formData.attachments.map((file, idx) => (
                  <div key={file.id} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-white p-2 flex items-center gap-2 shadow-sm">
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0 bg-gray-100"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-[10px] text-gray-400">{file.size}</p>
                      {idx === 0 && (
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Thumbnail
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(file.id)}
                      className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Actions (Cancel & Continue) */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gray-900 hover:bg-black text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Continue</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
