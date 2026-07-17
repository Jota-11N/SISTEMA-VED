'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, UploadCloud, HardDrive, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImportModal({ isOpen, onClose }: ImportModalProps) {
  const [mounted, setMounted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSource, setUploadSource] = useState<'pc' | 'drive'>('pc');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
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

  const handleUpload = () => {
    if (!selectedFile && uploadSource === 'pc') return;
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
      
      // Close automatically after success
      setTimeout(() => {
        setUploadComplete(false);
        setSelectedFile(null);
        onClose();
      }, 2000);
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
            <h3 className="text-lg font-bold text-slate-800">Importar Padrón Electoral</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Carga el archivo CSV o Excel con los electores</p>
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
          
          {uploadComplete ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-center">
                <h4 className="text-lg font-bold text-slate-800">¡Importación Exitosa!</h4>
                <p className="text-sm text-slate-500 mt-1">El padrón ha sido cargado y validado correctamente.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Source Selector */}
              <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                <button
                  onClick={() => setUploadSource('pc')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${
                    uploadSource === 'pc' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <HardDrive className="w-4 h-4" />
                  Desde mi PC
                </button>
                <button
                  onClick={() => setUploadSource('drive')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${
                    uploadSource === 'drive' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <UploadCloud className="w-4 h-4" />
                  Google Drive
                </button>
              </div>

              {/* Upload Area */}
              {uploadSource === 'pc' ? (
                <div 
                  className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors ${
                    dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
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
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={handleFileChange}
                  />
                  
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <FileSpreadsheet className="w-6 h-6 text-blue-500" />
                  </div>
                  
                  {selectedFile ? (
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-800">{selectedFile.name}</p>
                      <p className="text-xs text-slate-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                      <button 
                        onClick={() => setSelectedFile(null)}
                        className="text-xs text-red-500 font-semibold hover:underline mt-2"
                      >
                        Eliminar
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-slate-700">
                        Arrastra tu archivo aquí o <label htmlFor="file-upload" className="text-blue-600 hover:underline cursor-pointer">explora</label>
                      </p>
                      <p className="text-xs text-slate-500 font-medium">Soporta formatos .CSV y .XLSX hasta 10MB</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-slate-50">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    {/* Google Drive simple logo representation */}
                    <div className="w-6 h-6 relative flex items-center justify-center">
                      <svg viewBox="0 0 87.3 127" className="w-6 h-6">
                        <path d="M62.6 127L24.8 127 59.8 66 97.6 66z" fill="#0066da"/>
                        <path d="M24.8 127L5.5 94.6 40.5 33.6 59.8 66z" fill="#00ac47"/>
                        <path d="M40.5 33.6L59.8 0 97.6 66 78.3 98.4z" fill="#ea4335"/>
                        <path d="M40.5 33.6L5.5 94.6 24.8 127 59.8 66z" fill="#ffba00"/>
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-2">Conectar con Google Drive</h4>
                  <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">
                    Selecciona directamente el padrón desde tu unidad de Google Drive de la universidad.
                  </p>
                  <button className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2">
                    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Seleccionar Archivo
                  </button>
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer */}
        {!uploadComplete && (
          <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors"
              disabled={isUploading}
            >
              Cancelar
            </button>
            <button 
              onClick={handleUpload}
              disabled={isUploading || (uploadSource === 'pc' && !selectedFile)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg shadow-md shadow-blue-500/20 transition-all flex items-center justify-center min-w-[120px]"
            >
              {isUploading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Importar Ahora'
              )}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
