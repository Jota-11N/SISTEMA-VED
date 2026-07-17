'use client';

import React, { Suspense } from 'react';
import CardStats from '../../../src/components/CardStats';
import DataTable from '../../../src/components/DataTable';
import { Download, FileText, CheckCircle2 } from 'lucide-react';

const columnsAdmin = [
  { key: 'reporte', header: 'Nombre del Reporte' },
  { key: 'tipo', header: 'Formato' },
  { key: 'fecha', header: 'Fecha Generación' },
  { key: 'descargas', header: 'Descargas Totales' },
  { key: 'estado', header: 'Firma Digital' },
];

const mockDataAdmin = [
  { reporte: 'Acta de Escrutinio y Cierre General VED', tipo: 'PDF', fecha: '2026-07-15', descargas: '12 veces', estado: 'Completado' },
  { reporte: 'Reporte de Auditoría de Transacciones de Red', tipo: 'CSV', fecha: '2026-07-15', descargas: '5 veces', estado: 'Completado' },
  { reporte: 'Detalle de Participación por Escuela y Estamento', tipo: 'XLSX', fecha: '2026-07-15', descargas: '8 veces', estado: 'Completado' },
];

function ContenidoReportes({ role }: { role?: string }) {
  const isPersonero = role === 'personero';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <nav className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <span>Inicio</span> <span className="mx-2">/</span> <span>Dashboard</span> <span className="mx-2">/</span> <span className="text-blue-600">Reportes</span>
      </nav>

      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            {isPersonero ? 'Mis Documentos y Cargos' : 'Reportes y Actas'}
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            {isPersonero 
              ? 'Descarga los comprobantes y cargos electrónicos de tu participación.'
              : 'Generación de actas, certificados criptográficos y exportación de reportes de participación.'}
          </p>
        </div>
        {!isPersonero && (
          <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all self-start sm:self-center">
            Generar Consolidado Final
          </button>
        )}
      </div>

      {isPersonero ? (
        // VISTA PERSONERO
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2 leading-tight">Cargo Electrónico de Inscripción</h3>
              <p className="text-sm text-slate-500 mb-4">Comprobante oficial con sello de tiempo (timestamp) de la inscripción de tu lista electoral.</p>
              
              <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 mb-6 bg-green-50 w-fit px-2 py-1 rounded-md border border-green-100">
                <CheckCircle2 className="w-3.5 h-3.5" /> Generado con éxito
              </div>
            </div>
            
            <button className="w-full py-2.5 bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 hover:border-transparent rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Descargar PDF
            </button>
          </div>
        </div>
      ) : (
        // VISTA ADMIN
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardStats title="Actas Generadas" value="4 Actas" subtitle="Firmadas por el jurado" trend="neutral" />
            <CardStats title="Documentos Descargados" value="25 descargas" subtitle="Auditoría interna" trend="up" />
            <CardStats title="Certificaciones de Consenso" value="Válidas" subtitle="SHA-256 en cabecera" trend="up" />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Documentos y Actas de Clausura Escrutada</h2>
            <DataTable columns={columnsAdmin} data={mockDataAdmin} />
          </div>
        </>
      )}
    </div>
  );
}

export default function ReportesPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const role = typeof searchParams?.role === 'string' ? searchParams.role : undefined;

  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-slate-500">Cargando reportes...</div>}>
      <ContenidoReportes role={role} />
    </Suspense>
  );
}
