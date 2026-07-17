import React from 'react';
import CardStats from '../../../src/components/CardStats';
import DataTable from '../../../src/components/DataTable';

const columns = [
  { key: 'parametro', header: 'Parámetro de Sistema' },
  { key: 'valor', header: 'Valor Configurado' },
  { key: 'categoria', header: 'Categoría' },
  { key: 'estado', header: 'Estado' },
];

const mockData = [
  { parametro: 'Tiempo Máximo de Generación de Bloques', valor: '2 segundos', categoria: 'Blockchain (Fabric)', estado: 'Activo' },
  { parametro: 'Expiración de Token de Acceso (JWT)', valor: '15 minutos', categoria: 'Seguridad', estado: 'Activo' },
  { parametro: 'Autenticación Multifactor (MFA)', valor: 'Obligatoria (OTP)', categoria: 'Acceso Electores', estado: 'Activo' },
];

export default function ConfiguracionPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <nav className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <span>Inicio</span> <span className="mx-2">/</span> <span>Dashboard</span> <span className="mx-2">/</span> <span className="text-blue-600">Configuración</span>
      </nav>

      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Configuración del Sistema</h1>
          <p className="text-sm text-slate-500 font-medium">Parámetros globales del proceso electoral, configuraciones de red blockchain y políticas de acceso.</p>
        </div>
        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all self-start sm:self-center">
          Guardar Parámetros
        </button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardStats title="Algoritmo de Firma" value="ECDSA (P-256)" subtitle="Criptografía recomendada" trend="neutral" />
        <CardStats title="Algoritmo de Consensus" value="Raft / BFT" subtitle="Tolerancia a fallos" trend="neutral" />
        <CardStats title="Nivel de Cifrado" value="AES-256-GCM" subtitle="Votos en tránsito y reposo" trend="up" />
      </div>

      {/* Table Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Parámetros de Configuración del Consorcio VED</h2>
        <DataTable columns={columns} data={mockData} />
      </div>
    </div>
  );
}
