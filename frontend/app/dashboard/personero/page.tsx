'use client';

import React, { useState } from 'react';
import { AlertCircle, FileText, Image as ImageIcon, CheckCircle2, ChevronRight, Send, User, Award, Users } from 'lucide-react';

export default function PersoneroDashboardPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulamos el envío
    setTimeout(() => {
      setIsSubmitted(true);
      setIsFormOpen(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <nav className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <span>Inicio</span> <span className="mx-2">/</span> <span>Dashboard</span> <span className="mx-2">/</span> <span className="text-blue-600">Personero</span>
      </nav>

      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Panel de Personero</h1>
          <p className="text-sm text-slate-500 font-medium">Gestiona la inscripción de tus candidatos y monitorea tu lista.</p>
        </div>
      </div>

      {/* Estado Superior */}
      <div className={`p-4 rounded-xl border flex items-center justify-between shadow-sm transition-colors ${
        isSubmitted ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            isSubmitted ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
          }`}>
            {isSubmitted ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Estado de tu Lista</p>
            <p className={`text-lg font-black tracking-tight ${
              isSubmitted ? 'text-green-700' : 'text-amber-700'
            }`}>
              {isSubmitted ? 'EN REVISIÓN POR EL COMITÉ' : 'PENDIENTE DE REGISTRO'}
            </p>
          </div>
        </div>
        {!isFormOpen && !isSubmitted && (
          <button 
            onClick={() => setIsFormOpen(true)}
            className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm items-center gap-2 transition-colors shadow-md shadow-blue-600/20"
          >
            Comenzar Inscripción <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Formulario Dinámico */}
      {isFormOpen ? (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-in slide-in-from-top-4 duration-300">
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Inscripción de Candidato Principal</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-500" /> Nombre de la Lista Electoral
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Frente Académico Estudiantil"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-500" /> Nombre del Candidato
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nombres y Apellidos completos"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-blue-500" /> Cargo Postulado
                </label>
                <select
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Seleccione el cargo</option>
                  <option value="rectorado">Rector(a)</option>
                  <option value="tercio">Representante al Consejo (Tercio)</option>
                  <option value="decanato">Decano(a)</option>
                </select>
              </div>

              {/* Uploaders */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-blue-500" /> Fotografía del Candidato (JPG/PNG)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer">
                  <input type="file" required accept="image/*" className="hidden" id="foto-candidato" />
                  <label htmlFor="foto-candidato" className="cursor-pointer flex flex-col items-center">
                    <div className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-slate-400 mb-2">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-blue-600">Subir Fotografía</span>
                    <span className="text-[10px] text-slate-400 mt-1">Fondo blanco, tipo pasaporte</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-500" /> Declaración Jurada (PDF)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer">
                  <input type="file" required accept=".pdf" className="hidden" id="pdf-dj" />
                  <label htmlFor="pdf-dj" className="cursor-pointer flex flex-col items-center">
                    <div className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-slate-400 mb-2">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-blue-600">Subir Documento PDF</span>
                    <span className="text-[10px] text-slate-400 mt-1">Firmado y escaneado</span>
                  </label>
                </div>
              </div>

            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <button 
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Enviar Expediente
              </button>
            </div>
          </form>
        </div>
      ) : !isSubmitted && (
        <div className="sm:hidden mt-4">
          <button 
            onClick={() => setIsFormOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-600/20"
          >
            Comenzar Inscripción de Candidatos
          </button>
        </div>
      )}
      
      {isSubmitted && !isFormOpen && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Expediente Registrado Correctamente</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            La información de tus candidatos ha sido enviada al Comité Electoral. Podrás ver los resultados de la auditoría y observaciones en este mismo panel una vez que sean revisados.
          </p>
        </div>
      )}

    </div>
  );
}
