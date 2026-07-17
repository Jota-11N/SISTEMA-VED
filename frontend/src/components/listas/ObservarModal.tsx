'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ObservarModalProps {
  isOpen: boolean;
  onClose: () => void;
  listaNombre: string;
}

export default function ObservarModal({ isOpen, onClose, listaNombre }: ObservarModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [observacion, setObservacion] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to send observation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Close automatically after success
      setTimeout(() => {
        setIsSuccess(false);
        setObservacion('');
        onClose();
      }, 2500);
    }, 1500);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-red-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-900">Observar Expediente</h3>
              <p className="text-xs text-red-600/80 font-medium mt-0.5">Notificar a {listaNombre}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-center">
                <h4 className="text-lg font-bold text-slate-800">Observación Enviada</h4>
                <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">
                  El partido ha sido notificado y su estado pasará a "Observado" hasta que subsanen el error.
                </p>
              </div>
            </div>
          ) : (
            <form id="observar-form" onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Detalle de la Observación
                </label>
                <textarea
                  required
                  value={observacion}
                  onChange={(e) => setObservacion(e.target.value)}
                  placeholder="Ej. La fotografía del candidato a Decanato está borrosa y falta la firma en el anexo 2..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all min-h-[120px] resize-y"
                />
                <p className="text-xs text-slate-500">
                  El personero legal recibirá un correo con estos detalles y un plazo para subsanar los documentos.
                </p>
              </div>

            </form>
          )}
        </div>

        {/* Footer */}
        {!isSuccess && (
          <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              form="observar-form"
              disabled={isSubmitting || !observacion.trim()}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg shadow-md shadow-red-500/20 transition-all flex items-center justify-center min-w-[140px]"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Enviar Observación'
              )}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
