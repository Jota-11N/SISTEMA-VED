import React from 'react';
import CardStats from '../../../src/components/CardStats';
import DataTable from '../../../src/components/DataTable';

const columns = [
  { key: 'usuario', header: 'Usuario / Nombre' },
  { key: 'correo', header: 'Correo Electrónico' },
  { key: 'rol', header: 'Rol Asignado' },
  { key: 'conexion', header: 'Última Actividad' },
  { key: 'estado', header: 'Estado Cuenta' },
];

const mockData = [
  { usuario: 'Administrador Central CEU', correo: 'admin.ceu@unajma.edu.pe', rol: 'Superadministrador', conexion: 'Activo ahora', estado: 'Activo' },
  { usuario: 'Personero Lista Innovación', correo: 'personero1@innovacion.pe', rol: 'Personero Acreditado', conexion: 'Hace 5 minutos', estado: 'Activo' },
  { usuario: 'Auditor Externo UNAJMA', correo: 'auditor.general@unajma.edu.pe', rol: 'Auditor de Sistema', conexion: 'Hace 2 horas', estado: 'Activo' },
];

export default function UsuariosPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <nav className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <span>Inicio</span> <span className="mx-2">/</span> <span>Dashboard</span> <span className="mx-2">/</span> <span className="text-blue-600">Usuarios del Sistema</span>
      </nav>

      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Usuarios del Sistema</h1>
          <p className="text-sm text-slate-500 font-medium">Administración de cuentas y permisos para miembros del Comité Electoral, personeros y auditores.</p>
        </div>
        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all self-start sm:self-center">
          Registrar Nuevo Usuario
        </button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardStats title="Total Cuentas" value="8 Cuentas" subtitle="Registradas en el sistema" trend="neutral" />
        <CardStats title="Roles Activos" value="4 Roles" subtitle="Permisos configurados" trend="neutral" />
        <CardStats title="Conexiones Concurrentes" value="3 Activos" subtitle="Sesiones verificadas" trend="up" />
      </div>

      {/* Table Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Usuarios Registrados y Roles del Sistema</h2>
        <DataTable columns={columns} data={mockData} />
      </div>
    </div>
  );
}
