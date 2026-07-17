import React from 'react';
import CardStats from '../CardStats';
import { ClockIcon, ServerIcon, ShieldIcon } from './Icons';

export default function PollsClosedDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Polls Closed Notification Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-amber-800 tracking-tight flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            Votación Finalizada
          </h2>
          <p className="text-amber-700 text-sm font-medium mt-1">
            La votación ha finalizado. Esperando la validación automática de votos...
          </p>
        </div>
        <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
          <ClockIcon className="w-6 h-6" />
        </div>
      </div>

      {/* Basic Metrics (Without results charts) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardStats 
          title="Votación Cerrada" 
          value="CERRADA" 
          icon={<ClockIcon className="w-6 h-6 text-amber-600" />}
          trend="neutral"
          subtitle="A las 04:00 PM"
        />
        <CardStats 
          title="Total Votos Registrados" 
          value="1,988" 
          icon={<ServerIcon className="w-6 h-6 text-blue-600" />}
          trend="neutral"
          subtitle="Enviados a la blockchain"
        />
        <CardStats 
          title="Auditoría de Red" 
          value="En Proceso" 
          icon={<ShieldIcon className="w-6 h-6 text-indigo-600" />}
          trend="up"
          subtitle="Verificando hashes..."
        />
      </div>

      {/* Blockchain Sync Details */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-4">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <ServerIcon className="w-5 h-5 text-blue-600" />
          Sincronización y Validación de Bloques
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
              <span>Progreso de Sincronización</span>
              <span className="text-blue-600">100% Sincronizado</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Todos los bloques de transacciones electorales han sido propagados y replicados en los 7 nodos validadores de la red universitaria.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2.5">
              <span className="text-sm text-slate-600 font-medium">Consenso de Nodos</span>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-bold">ALCANZADO (Raíces Merkle Coincidentes)</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2.5">
              <span className="text-sm text-slate-600 font-medium">Firmas del Comité de Cierre</span>
              <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-bold">Esperando Autorización (0/3)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 font-medium">Contrato de Desencriptación</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-bold">Bloqueado hasta Consenso Final</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
