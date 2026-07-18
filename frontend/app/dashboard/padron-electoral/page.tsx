'use client';

import React, { useState } from 'react';
import { Key, Send } from 'lucide-react';
import CardStats from '../../../src/components/CardStats';
import DataTable from '../../../src/components/DataTable';
import ImportModal from '../../../src/components/padron/ImportModal';

export default function PadronElectoralPage() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSendCredentials = () => {
    // Aquí el backend generaría el hash y la contraseña temporal
    // El administrador nunca la ve, solo ve el éxito
    setToastMessage("Credenciales enviadas de forma segura");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const columns = [
    { key: 'codigo', header: 'Código / DNI' },
    { key: 'nombres', header: 'Nombres y Apellidos' },
    { key: 'estamento', header: 'Estamento' },
    { key: 'escuela', header: 'Escuela Profesional' },
    { key: 'estado', header: 'Estado Padrón' },
    { 
      key: 'acciones', 
      header: 'Acciones de Acceso',
      render: (row: any) => (
        <button
          onClick={handleSendCredentials}
          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
        >
          <Key className="w-3.5 h-3.5" />
          Enviar Credenciales
        </button>
      )
    }
  ];
  
  const mockData = [
    { codigo: '202210432', nombres: 'Juan Pérez Gómez', estamento: 'Estudiante', escuela: 'Ing. Sistemas', estado: 'Activo' },
    { codigo: '10984321', nombres: 'Dra. María Rodriguez Ruiz', estamento: 'Docente', escuela: 'Administración', estado: 'Activo' },
    { codigo: '45321098', nombres: 'Carlos Sanchez Diaz', estamento: 'Administrativo', escuela: 'Sede Central', estado: 'Activo' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
            <div className="bg-emerald-100 p-1.5 rounded-full">
              <Send className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-bold text-sm">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <span>Inicio</span> <span className="mx-2">/</span> <span>Dashboard</span> <span className="mx-2">/</span> <span className="text-blue-600">Padrón Electoral</span>
      </nav>

      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Padrón Electoral</h1>
          <p className="text-sm text-slate-500 font-medium">Registro, importación y validación criptográfica de los electores habilitados.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleSendCredentials}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md transition-all self-start sm:self-center flex items-center gap-2"
          >
            <Key className="w-4 h-4" />
            Enviar Credenciales Masivo
          </button>
          <button 
            onClick={() => setIsImportModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all self-start sm:self-center"
          >
            Importar Padrón (CSV/Excel)
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardStats title="Total Electores" value="2,429" subtitle="Sincronizados con la base" trend="neutral" />
        <CardStats title="Estamento Mayoritario" value="Estudiantes" subtitle="1,850 empadronados" trend="neutral" />
        <CardStats title="Firmas del Padrón" value="Válidas" subtitle="Verificación SHA-256 ok" trend="up" />
      </div>

      {/* Table Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Lista de Electores Habilitados</h2>
        <DataTable columns={columns} data={mockData} />
      </div>

      {/* Modal */}
      <ImportModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
      />
    </div>
  );
}
