import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isInfo = toast.type === 'info';
        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-surface text-textMain rounded-2xl p-4 shadow-2xl border border-gray-100 flex items-start gap-3 animate-slideUp"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                isSuccess
                  ? 'bg-emerald-100 text-emerald-600'
                  : isInfo
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {isSuccess && <CheckCircle2 className="w-4 h-4" />}
              {isInfo && <Info className="w-4 h-4" />}
              {!isSuccess && !isInfo && <AlertCircle className="w-4 h-4" />}
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="font-bold text-xs text-primary">{toast.title}</h5>
              <p className="text-[11px] text-textMuted mt-0.5 leading-snug">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-textMain transition-colors p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
