'use client';

import React, { useState } from 'react';
import CardStats from '../../../src/components/CardStats';
import DataTable from '../../../src/components/DataTable';
import ImportModal from '../../../src/components/padron/ImportModal';

const columns = [
  { key: 'codigo', header: 'Código / DNI' },
  { key: 'nombres', header: 'Nombres y Apellidos' },
  { key: 'estamento', header: 'Estamento' },
  { key: 'escuela', header: 'Escuela Profesional' },
  { key: 'estado', header: 'Estado Padrón' },
];

const mockData = [
  { codigo: '202210432', nombres: 'Juan Pérez Gómez', estamento: 'Estudiante', escuela: 'Ing. Sistemas', estado: 'Activo' },
  { codigo: '10984321', nombres: 'Dra. María Rodriguez Ruiz', estamento: 'Docente', escuela: 'Administración', estado: 'Activo' },
  { codigo: '45321098', nombres: 'Carlos Sanchez Diaz', estamento: 'Administrativo', escuela: 'Sede Central', estado: 'Activo' },
];

export default function PadronElectoralPage() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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
        <button 
          onClick={() => setIsImportModalOpen(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all self-start sm:self-center"
        >
          Importar Padrón (CSV/Excel)
        </button>
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
