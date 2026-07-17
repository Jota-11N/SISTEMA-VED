'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import CardStats from '../../../src/components/CardStats';
import DataTable from '../../../src/components/DataTable';
import { CheckCircle2 } from 'lucide-react';

const columns = [
  { key: 'proceso', header: 'Proceso Electoral' },
  { key: 'fecha', header: 'Fecha Programada' },
  { key: 'tipo', header: 'Tipo de Proceso' },
  { key: 'estado', header: 'Estado' },
];

const mockData = [
  { proceso: 'Elecciones Estudiantiles CEU 2026', fecha: '2026-11-15', tipo: 'Estudiantes', estado: 'Activo' },
  { proceso: 'Elecciones Decano Ciencias de la Salud', fecha: '2026-09-10', tipo: 'Docentes', estado: 'Completado' },
  { proceso: 'Representantes de Graduados', fecha: '2026-05-18', tipo: 'Graduados', estado: 'Completado' },
];

export default function EleccionesPage() {
  const searchParams = useSearchParams();
  const isPersonero = searchParams?.get('role') === 'personero';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <nav className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <span>Inicio</span> <span className="mx-2">/</span> <span>Dashboard</span> <span className="mx-2">/</span> <span className="text-blue-600">Elecciones</span>
      </nav>

      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            {isPersonero ? 'Proceso Electoral Actual' : 'Gestión de Elecciones'}
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            {isPersonero 
              ? 'Consulta la información general del proceso en el que participas.'
              : 'Configuración, programación y control del ciclo de vida de los procesos electorales.'}
          </p>
        </div>
        {!isPersonero && (
          <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all self-start sm:self-center">
            Crear Nueva Elección
          </button>
        )}
      </div>

      {/* Condicional Info Cards */}
      {isPersonero ? (
        <div className="p-5 rounded-xl border border-blue-200 bg-blue-50 flex flex-col md:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Proceso Electoral en Curso</p>
            <h3 className="text-xl font-black text-slate-800">Elecciones Estudiantiles CEU 2026</h3>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardStats title="Procesos Activos" value="1" subtitle="En fase preelectoral" trend="neutral" />
          <CardStats title="Procesos Históricos" value="14" subtitle="Registrados en Ledger" trend="up" />
          <CardStats title="Tasa de Participación Promedio" value="84.2%" subtitle="+2.1% respecto a 2025" trend="up" />
        </div>
      )}

      {/* Table Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
          {isPersonero ? 'Detalle del Proceso' : 'Procesos Electorales Registrados'}
        </h2>
        <DataTable columns={columns} data={isPersonero ? [mockData[0]] : mockData} />
      </div>
    </div>
  );
}
