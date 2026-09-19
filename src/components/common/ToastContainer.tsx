import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white border border-[#E5E3DC] rounded-xl shadow-lg p-3.5 flex items-start space-x-3 text-xs text-[#191919] animate-in slide-in-from-bottom-3 duration-200"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-4 h-4 text-[#0F5132] shrink-0 mt-0.5" />
          )}
          {toast.type === 'warning' && (
            <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-4 h-4 text-[#1E293B] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 pr-2">
            <div className="font-semibold text-[#191919] text-xs">{toast.title}</div>
            <div className="text-[11px] text-[#666258] mt-0.5 leading-relaxed">{toast.message}</div>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#9E9B91] hover:text-[#191919] p-0.5 shrink-0"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
