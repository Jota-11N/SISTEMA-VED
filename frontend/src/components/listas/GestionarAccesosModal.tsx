'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, Mail, User } from 'lucide-react';

interface GestionarAccesosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GestionarAccesosModal({ isOpen, onClose }: GestionarAccesosModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to generate user and send email
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Close automatically after success
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ nombre: '', correo: '' });
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
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Gestionar Acceso a Partido</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Generar enlace seguro de inscripción autónoma</p>
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
                <h4 className="text-lg font-bold text-slate-800">Acceso Enviado</h4>
                <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">
                  Se ha generado el usuario temporal y enviado el enlace de inscripción al correo <span className="font-semibold text-slate-700">{formData.correo}</span>.
                </p>
              </div>
            </div>
          ) : (
            <form id="acceso-form" onSubmit={handleSubmit} className="space-y-5">
              
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
                <p className="text-sm text-blue-800 font-medium">
                  El Comité Electoral no debe inscribir listas directamente. Introduce los datos del Personero Legal para enviarle un acceso exclusivo.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-500" /> Nombre del Personero Legal
                </label>
                <input
                  type="text"
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej. Juan Pérez"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-500" /> Correo Institucional
                </label>
                <input
                  type="email"
                  name="correo"
                  required
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="ejemplo@unajma.edu.pe"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
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
              form="acceso-form"
              disabled={isSubmitting}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg shadow-md shadow-slate-500/20 transition-all flex items-center justify-center min-w-[140px]"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Generar Acceso'
              )}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
