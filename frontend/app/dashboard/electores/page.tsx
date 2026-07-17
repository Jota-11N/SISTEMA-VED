import React from 'react';
import CardStats from '../../../src/components/CardStats';
import DataTable from '../../../src/components/DataTable';

const columns = [
  { key: 'codigo', header: 'Código Universitario' },
  { key: 'nombres', header: 'Elector' },
  { key: 'metodo', header: 'Método de Acceso' },
  { key: 'fechahora', header: 'Fecha y Hora Activación' },
  { key: 'estado', header: 'Estado Token' },
];

const mockData = [
  { codigo: '202210432', nombres: 'Juan Pérez Gómez', metodo: 'Correo Institucional', fechahora: '2026-07-15 08:35 AM', estado: 'Activo' },
  { codigo: '10984321', nombres: 'Dra. María Rodriguez Ruiz', metodo: 'SMS OTP', fechahora: '2026-07-15 09:12 AM', estado: 'Activo' },
  { codigo: '45321098', nombres: 'Carlos Sanchez Diaz', metodo: 'Correo Institucional', fechahora: '2026-07-15 09:40 AM', estado: 'Activo' },
];

export default function ElectoresPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <nav className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <span>Inicio</span> <span className="mx-2">/</span> <span>Dashboard</span> <span className="mx-2">/</span> <span className="text-blue-600">Electores</span>
      </nav>

      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Gestión de Electores</h1>
          <p className="text-sm text-slate-500 font-medium">Monitoreo del estado de autenticación y llaves criptográficas de la población electoral.</p>
        </div>
        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all self-start sm:self-center">
          Generar Credenciales
        </button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardStats title="Tokens Emitidos" value="2,429" subtitle="Uno por cada elector" trend="neutral" />
        <CardStats title="Tokens Activados" value="1,268" subtitle="52.2% de participación" trend="up" />
        <CardStats title="Soporte Técnico" value="0 Casos" subtitle="Sin incidentes abiertos" trend="neutral" />
      </div>

      {/* Table Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Historial de Activación de Tokens</h2>
        <DataTable columns={columns} data={mockData} />
      </div>
    </div>
  );
}
