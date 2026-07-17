'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CardStats from '../../../src/components/CardStats';
import DataTable from '../../../src/components/DataTable';
import { Key } from 'lucide-react';

// Esta línea soluciona el error en Vercel sin alterar la estructura del proyecto
export const dynamic = 'force-dynamic';

const columnsAdmin = [
  { key: 'evento', header: 'Evento de Auditoría' },
  { key: 'detalles', header: 'Detalles del Suceso' },
  { key: 'timestamp', header: 'Fecha y Hora' },
  { key: 'estado', header: 'Resultado' },
];

const mockDataAdmin = [
  { evento: 'Acceso Panel Electoral', detalles: 'Elector 202210432 inició sesión exitosamente', timestamp: '2026-07-15 08:30:15 AM', estado: 'Completado' },
  { evento: 'Firma de Bloque #48912', detalles: 'Bloque firmado por Nodo Delta con hash sha256:4a7b...', timestamp: '2026-07-15 10:43:00 AM', estado: 'Completado' },
  { evento: 'Modificación Configuración', detalles: 'Admin CEU actualizó el cronograma de apertura', timestamp: '2026-07-15 07:05:22 AM', estado: 'Completado' },
];

const columnsPersonero = [
  { key: 'evento', header: 'Actividad' },
  { key: 'ip', header: 'Dirección IP' },
  { key: 'timestamp', header: 'Fecha y Hora' },
  { key: 'estado', header: 'Seguridad' },
];

const mockDataPersonero = [
  { evento: 'Inicio de Sesión (Personero)', ip: '190.235.122.45', timestamp: '2026-10-12 14:05:15 AM', estado: 'Autorizado' },
  { evento: 'Carga de Documento (DJ)', ip: '190.235.122.45', timestamp: '2026-10-12 14:35:10 AM', estado: 'Firma Válida' },
];

// Componente secundario aislado que encapsula el uso de useSearchParams()
function ContenidoAuditoria() {
  const searchParams = useSearchParams();
  const isPersonero = searchParams?.get('role') === 'personero';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <nav className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <span>Inicio</span> <span className="mx-2">/</span> <span>Dashboard</span> <span className="mx-2">/</span> <span className="text-blue-600">Auditoría de Seguridad</span>
      </nav>

      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Auditoría de Seguridad</h1>
          <p className="text-sm text-slate-500 font-medium">
            {isPersonero
              ? 'Revisa el historial de accesos y movimientos de tu cuenta.'
              : 'Registro histórico inmutable de eventos del sistema y validación de seguridad.'}
          </p>
        </div>
        {!isPersonero && (
          <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all self-start sm:self-center">
            Verificar Firmas del Ledger
          </button>
        )}
      </div>

      {isPersonero ? (
        // VISTA PERSONERO
        <>
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center shrink-0">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Accesos y Movimientos Privados</h3>
              <p className="text-sm text-slate-600">Mantén el control y supervisa desde dónde se ingresa a tu cuenta institucional.</p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Registro de Actividad (Audit Logs)</h2>
            <DataTable columns={columnsPersonero} data={mockDataPersonero} />
          </div>
        </>
      ) : (
        // VISTA ADMIN
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardStats title="Logs Registrados" value="4,152" subtitle="Auditoría total en sesión" trend="neutral" />
            <CardStats title="Alertas de Seguridad" value="0 Alertas" subtitle="Sistema estable y seguro" trend="neutral" />
            <CardStats title="Consenso Global" value="Verificado" subtitle="100% hashes validados" trend="up" />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Registro de Auditoría General (Audit Logs)</h2>
            <DataTable columns={columnsAdmin} data={mockDataAdmin} />
          </div>
        </>
      )}
    </div>
  );
}

// Exportación principal requerida por Next.js que envuelve el contenido en un Suspense Boundary
export default function AuditoriaPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-slate-500">Cargando bitácora de auditoría...</div>}>
      <ContenidoAuditoria />
    </Suspense>
  );
}
