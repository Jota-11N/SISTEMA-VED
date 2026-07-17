'use client';

import React, { Suspense } from 'react';
import CardStats from '../../../src/components/CardStats';
import DataTable from '../../../src/components/DataTable';
import { ShieldCheck } from 'lucide-react';

const columnsAdmin = [
  { key: 'nodo', header: 'Nodo / Peer' },
  { key: 'organizacion', header: 'Organización Responsable' },
  { key: 'ip', header: 'Dirección IP / Puerto' },
  { key: 'tipo', header: 'Tipo de Rol' },
  { key: 'estado', header: 'Estado Nodo' },
];

const mockDataAdmin = [
  { nodo: 'peer0.ceu.unajma.edu.pe', organizacion: 'Comité Electoral (CEU)', ip: '172.24.0.5:7051', tipo: 'Endorser / Committer', estado: 'Activo' },
  { nodo: 'peer0.sistemas.unajma.edu.pe', organizacion: 'Facultad de Ingeniería', ip: '172.24.0.6:7051', tipo: 'Committer', estado: 'Activo' },
  { nodo: 'peer0.rectorado.unajma.edu.pe', organizacion: 'Rectorado UNAJMA', ip: '172.24.0.7:7051', tipo: 'Committer / Anchor', estado: 'Activo' },
];

const columnsPersonero = [
  { key: 'fecha', header: 'Fecha de Transacción' },
  { key: 'accion', header: 'Acción Ejecutada' },
  { key: 'hash', header: 'Firma / Hash' },
  { key: 'estado', header: 'Estado Ledger' },
];

const mockDataPersonero = [
  { fecha: '2026-10-12 14:30:22', accion: 'Inscripción de Fórmula Presidencial', hash: '0x7a8c90b21df...', estado: 'Confirmado en Bloque #45210' },
  { fecha: '2026-10-12 14:35:10', accion: 'Subida de Declaración Jurada (IPFS Hash)', hash: '0x3e1d45f78ac...', estado: 'Confirmado en Bloque #45212' },
];

function ContenidoBlockchain({ role }: { role?: string }) {
  const isPersonero = role === 'personero';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <nav className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <span>Inicio</span> <span className="mx-2">/</span> <span>Dashboard</span> <span className="mx-2">/</span> <span className="text-blue-600">Red Blockchain</span>
      </nav>

      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            {isPersonero ? 'Bitácora Blockchain Privada' : 'Red Blockchain'}
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            {isPersonero 
              ? 'Transacciones inmutables firmadas digitalmente por tu usuario.'
              : 'Estado del consorcio Hyperledger Fabric, canales, transacciones y topología de red.'}
          </p>
        </div>
        {!isPersonero && (
          <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all self-start sm:self-center">
            Ejecutar Diagnóstico de Red
          </button>
        )}
      </div>

      {isPersonero ? (
        // VISTA PERSONERO
        <>
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-blue-800">Criptografía Activa</h3>
              <p className="text-sm text-blue-700">Todas tus acciones críticas son respaldadas por un Smart Contract y son inmutables.</p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Tus Transacciones en la Red</h2>
            <DataTable columns={columnsPersonero} data={mockDataPersonero} />
          </div>
        </>
      ) : (
        // VISTA ADMIN
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardStats title="Nodos Validadores" value="7 / 7" subtitle="Todos los peers activos" trend="up" />
            <CardStats title="Altura del Ledger" value="#48,912" subtitle="Bloques confirmados" trend="neutral" />
            <CardStats title="Smart Contract (Chaincode)" value="ved-cc-v1" subtitle="Desplegado en canal principal" trend="up" />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Nodos Conectados a la Red Descentralizada</h2>
            <DataTable columns={columnsAdmin} data={mockDataAdmin} />
          </div>
        </>
      )}
    </div>
  );
}

export default function BlockchainPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const role = typeof searchParams?.role === 'string' ? searchParams.role : undefined;

  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-slate-500">Cargando red blockchain...</div>}>
      <ContenidoBlockchain role={role} />
    </Suspense>
  );
}
