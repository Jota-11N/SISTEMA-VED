import React, { useState, useEffect } from 'react';
import CardStats from '../CardStats';
import DataTable from '../DataTable';
import { BoxSelectIcon, UsersIcon, InboxIcon, PieChartIcon, ShieldIcon, ServerIcon, ClockIcon } from './Icons';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const tableColumns = [
  { key: 'hora', header: 'Hora' },
  { key: 'nodo', header: 'Nodo Validador' },
  { key: 'transacciones', header: 'Transacciones' },
  { key: 'estado', header: 'Estado' },
];

const mockData = [
  { hora: '10:45 AM', nodo: 'Nodo Alpha', transacciones: '124', estado: 'Estable' },
  { hora: '10:45 AM', nodo: 'Nodo Beta', transacciones: '98', estado: 'Estable' },
  { hora: '10:44 AM', nodo: 'Nodo Gamma', transacciones: '112', estado: 'Estable' },
  { hora: '10:43 AM', nodo: 'Nodo Delta', transacciones: '105', estado: 'Estable' },
];

// Recharts data sets
const hourlyVotingData = [
  { hora: '08:00', votos: 110 },
  { hora: '09:00', votos: 245 },
  { hora: '10:00', votos: 489 },
  { hora: '11:00', votos: 720 },
  { hora: '12:00', votos: 980 },
  { hora: '13:00', votos: 1150 },
  { hora: '14:00', votos: 1268 },
];

const facultyParticipationData = [
  { name: 'Sistemas', participacion: 72 },
  { name: 'Administr.', participacion: 58 },
  { name: 'Educación', participacion: 65 },
  { name: 'Ambiental', participacion: 48 },
  { name: 'Contabil.', participacion: 53 },
];

const estamentoData = [
  { name: 'Estudiantes', value: 890, color: '#2563EB' },
  { name: 'Docentes', value: 240, color: '#EF4444' },
  { name: 'Administrativos', value: 138, color: '#F59E0B' },
  { name: 'Egresados', value: 75, color: '#10B981' },
];

export default function VotingDashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 22, seconds: 10 });

  useEffect(() => {
    setIsMounted(true);
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        clearInterval(timer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Active Vote Banner with Remaining Time */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-emerald-800 tracking-tight flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Votación en Curso
          </h2>
          <p className="text-emerald-700 text-sm font-medium">El sufragio electoral universitario se encuentra abierto de forma segura.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-emerald-200 shadow-sm flex-shrink-0">
          <ClockIcon className="w-5 h-5 text-emerald-600" />
          <div>
            <span className="text-xs font-bold text-foreground-muted uppercase tracking-wider block">Tiempo Restante</span>
            <span className="text-lg font-black text-primary font-mono">
              {timeLeft.hours.toString().padStart(2, '0')}:
              {timeLeft.minutes.toString().padStart(2, '0')}:
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Grid containing metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardStats 
          title="Elección Activa" 
          value="VOTACIÓN" 
          icon={<BoxSelectIcon className="w-6 h-6 text-primary" />}
          trend="up"
          subtitle="Abierta y Monitoreada"
        />
        <CardStats 
          title="Electores Habilitados" 
          value="2,429" 
          icon={<UsersIcon className="w-6 h-6 text-primary" />}
          trend="neutral"
          subtitle="100% verificado"
        />
        <CardStats 
          title="Votos Emitidos" 
          value="1,268" 
          icon={<InboxIcon className="w-6 h-6 text-primary" />}
          trend="up"
          subtitle="+42 última hora"
        />
        <CardStats 
          title="Participación Actual" 
          value="52.2%" 
          icon={<PieChartIcon className="w-6 h-6 text-emerald-600" />}
          trend="up"
          subtitle="Constante"
        />
      </div>

      {/* Hourly Voting Line Chart */}
      <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-primary tracking-tight flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Flujo de Participación por Hora
        </h3>
        <div className="h-[280px] w-full mt-4">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyVotingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
                <XAxis dataKey="hora" tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', borderRadius: '12px', border: '1px solid #262626', color: '#2563EB' }}
                  itemStyle={{ color: '#2563EB', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="votos" stroke="#2563EB" strokeWidth={3.5} dot={{ r: 4, strokeWidth: 2, fill: '#000000', stroke: '#2563EB' }} activeDot={{ r: 6, fill: '#2563EB', stroke: '#2563EB' }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-foreground-muted text-sm font-semibold">Cargando gráfico...</div>
          )}
        </div>
      </div>

      {/* Two columns for Faculty (BarChart) and Estamento (PieChart) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Participation by Faculty */}
        <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-primary tracking-tight">Participación por Escuela Profesional</h3>
          <div className="h-[260px] w-full mt-4">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={facultyParticipationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 600 }} />
                  <YAxis unit="%" tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(37,99,235,0.1)' }}
                    contentStyle={{ backgroundColor: '#0A0A0A', borderRadius: '12px', border: '1px solid #262626', color: '#2563EB' }}
                  />
                  <Bar dataKey="participacion" fill="#2563EB" radius={[6, 6, 0, 0]} barSize={28}>
                    {facultyParticipationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="url(#colorUv)" />
                    ))}
                  </Bar>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={1}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.6}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-foreground-muted text-sm font-semibold">Cargando gráfico...</div>
            )}
          </div>
        </div>

        {/* Participation by Estamento */}
        <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-primary tracking-tight">Participación por Estamento</h3>
          <div className="h-[260px] w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <div className="w-[180px] h-[180px] relative">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={estamentoData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {estamentoData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full flex items-center justify-center text-foreground-muted text-sm font-semibold">...</div>
              )}
            </div>

            <div className="space-y-3 flex-1 w-full">
              {estamentoData.map((est) => (
                <div key={est.name} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 rounded-md" style={{ backgroundColor: est.color }} />
                    <span className="text-sm font-bold text-foreground-muted">{est.name}</span>
                  </div>
                  <span className="text-sm font-black text-primary">{est.value} votos</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Blockchain Node Status */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-primary tracking-tight">Estado de la Red Blockchain</h3>
          
          <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm space-y-4.5">
            <div className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center gap-2">
                <ServerIcon className="w-5 h-5 text-primary" />
                <span className="font-bold text-foreground-muted text-sm">Nodos Activos</span>
              </div>
              <span className="font-black text-emerald-600 text-sm">7 / 7</span>
            </div>
            
            <div className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center gap-2">
                <ShieldIcon className="w-5 h-5 text-primary" />
                <span className="font-bold text-foreground-muted text-sm">Smart Contract</span>
              </div>
              <span className="font-black text-emerald-600 text-sm">Desplegado</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <InboxIcon className="w-5 h-5 text-primary" />
                <span className="font-bold text-foreground-muted text-sm">Último Bloque</span>
              </div>
              <span className="font-black text-primary text-sm">#48,912</span>
            </div>
          </div>
        </div>

        {/* Audit Logs / Activity Table */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-primary tracking-tight">Actividad de Transacciones (Audit Logs)</h3>
          <DataTable 
            columns={tableColumns} 
            data={mockData} 
          />
        </div>

      </div>

    </div>
  );
}
