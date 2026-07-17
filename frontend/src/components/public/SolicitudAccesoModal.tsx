'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, UploadCloud, FileText, User, Building2, CreditCard, Mail, Hash } from 'lucide-react';

interface SolicitudAccesoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SolicitudAccesoModal({ isOpen, onClose }: SolicitudAccesoModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to send request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Close automatically after success
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedFile(null);
        onClose();
      }, 4000);
    }, 2000);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Solicitud de Acceso para Personeros</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">Mesa de Partes Digital - Comité Electoral UNAJMA</p>
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
            <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2 shadow-sm">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-center max-w-md">
                <h4 className="text-xl font-black text-slate-800 mb-2">¡Solicitud Enviada!</h4>
                <p className="text-base text-slate-600">
                  Tu solicitud ha sido recibida por el Comité Electoral Universitario. 
                </p>
                <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm border border-blue-100 font-medium">
                  Una vez validados los documentos adjuntos, te enviaremos las credenciales de acceso al sistema al correo institucional que has proporcionado.
                </div>
              </div>
            </div>
          ) : (
            <form id="solicitud-form" onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Agrupación */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" /> Nombre de la Agrupación o Lista
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Frente Académico Universitario"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Tipo de Proceso */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-blue-600" /> Tipo de Proceso
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="" disabled selected>Seleccione el proceso electoral</option>
                    <option value="rectorado">Elecciones de Rectorado</option>
                    <option value="consejo">Consejo Universitario</option>
                    <option value="tercio">Tercio Estudiantil</option>
                  </select>
                </div>

                <div className="md:col-span-2 my-2 border-b border-slate-100"></div>

                {/* Datos del Personero */}
                <div className="space-y-1.5 md:col-span-2">
                  <h4 className="text-sm font-bold text-slate-700 mb-2">Datos del Personero Legal</h4>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600" /> Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nombres y Apellidos"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-blue-600" /> DNI
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={8}
                    pattern="[0-9]{8}"
                    placeholder="Número de DNI"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-blue-600" /> Código Universitario
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. 202210432"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" /> Correo Institucional
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="correo@unajma.edu.pe"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="md:col-span-2 my-2 border-b border-slate-100"></div>

                {/* File Upload */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" /> Adjuntar Acta de Fundación / Firmas de Respaldo (PDF)
                  </label>
                  
                  <div 
                    className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors ${
                      dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".pdf"
                      required={!selectedFile}
                      onChange={handleFileChange}
                    />
                    
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                      <UploadCloud className="w-6 h-6 text-blue-600" />
                    </div>
                    
                    {selectedFile ? (
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-800">{selectedFile.name}</p>
                        <p className="text-xs text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        <button 
                          type="button"
                          onClick={() => setSelectedFile(null)}
                          className="text-xs text-red-500 font-semibold hover:underline mt-2"
                        >
                          Eliminar archivo
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-700">
                          Arrastra tu archivo PDF aquí o <label htmlFor="file-upload" className="text-blue-600 font-bold hover:underline cursor-pointer">explora tu equipo</label>
                        </p>
                        <p className="text-xs text-slate-500">Tamaño máximo: 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </form>
          )}
        </div>

        {/* Footer */}
        {!isSuccess && (
          <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 sticky bottom-0">
            <button 
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              form="solicitud-form"
              disabled={isSubmitting || !selectedFile}
              className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center min-w-[200px]"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Enviar Solicitud al Comité'
              )}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
