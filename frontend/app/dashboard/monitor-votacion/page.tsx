'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import CardStats from '../../../src/components/CardStats';
import DataTable from '../../../src/components/DataTable';
import { CheckCircle2, Lock, Radio } from 'lucide-react';

const columnsAdmin = [
  { key: 'hash', header: 'Hash Transacción' },
  { key: 'nodo', header: 'Nodo Validador' },
  { key: 'estamento', header: 'Estamento' },
  { key: 'timestamp', header: 'Timestamp' },
  { key: 'estado', header: 'Estado Blockchain' },
];

const mockDataAdmin = [
  { hash: '0x8f2a74c102b3d89ef...', nodo: 'Nodo Alpha', estamento: 'Estudiante', timestamp: '2026-07-15 10:45:12 AM', estado: 'Completado' },
  { hash: '0x4b7c91e508a3f62cd...', nodo: 'Nodo Beta', estamento: 'Docente', timestamp: '2026-07-15 10:45:08 AM', estado: 'Completado' },
  { hash: '0x1a9d5e3cb74a2f8be...', nodo: 'Nodo Gamma', estamento: 'Estudiante', timestamp: '2026-07-15 10:44:59 AM', estado: 'Completado' },
];

const columnsPersonero = [
  { key: 'mesa', header: 'N° de Mesa' },
  { key: 'ubicacion', header: 'Ubicación' },
  { key: 'fiscal', header: 'Fiscal Acreditado' },
  { key: 'estado', header: 'Estado de la Urna' },
];

const mockDataPersonero = [
  { mesa: 'Mesa 012', ubicacion: 'Pabellón Central - Aula 101', fiscal: 'Juan P. López', estado: 'Abierta - Recibiendo Votos' },
  { mesa: 'Mesa 015', ubicacion: 'Pabellón Central - Aula 104', fiscal: 'María F. Gómez', estado: 'Abierta - Recibiendo Votos' },
  { mesa: 'Mesa 022', ubicacion: 'Facultad de Ingeniería - Lab 2', fiscal: 'Carlos R. Díaz', estado: 'Cerrada - En Escrutinio' },
];

export default function MonitorVotacionPage() {
  const searchParams = useSearchParams();
  const isPersonero = searchParams?.get('role') === 'personero';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <nav className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <span>Inicio</span> <span className="mx-2">/</span> <span>Dashboard</span> <span className="mx-2">/</span> <span className="text-blue-600">Monitor de Votación</span>
      </nav>

      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Monitor de Votación</h1>
          <p className="text-sm text-slate-500 font-medium">
            {isPersonero 
              ? 'Supervisa el estado de las mesas donde tienes fiscales acreditados.'
              : 'Supervisión en tiempo real del flujo de votos y verificación en vivo de las urnas.'}
          </p>
        </div>
        {!isPersonero && (
          <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all self-start sm:self-center">
            Pausar Transmisión (En Vivo)
          </button>
        )}
      </div>

      {isPersonero ? (
        // VISTA PERSONERO
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mesas Abiertas</p>
                <p className="text-2xl font-black text-slate-800">2</p>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mesas Cerradas</p>
                <p className="text-2xl font-black text-slate-800">1</p>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                <Radio className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Transmisión</p>
                <p className="text-2xl font-black text-slate-800">Estable</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Estado de Mesas con Fiscales Acreditados</h2>
            <DataTable columns={columnsPersonero} data={mockDataPersonero} />
          </div>
        </>
      ) : (
        // VISTA ADMIN
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardStats title="Votos Totales" value="1,268" subtitle="Sincronizados en red" trend="up" />
            <CardStats title="Velocidad Promedio" value="14 v/min" subtitle="Frecuencia de firmas" trend="up" />
            <CardStats title="Integridad Urnas" value="100%" subtitle="Cero colisiones de hashes" trend="up" />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Últimas Transacciones de Voto en la Red</h2>
            <DataTable columns={columnsAdmin} data={mockDataAdmin} />
          </div>
        </>
      )}
    </div>
  );
}
