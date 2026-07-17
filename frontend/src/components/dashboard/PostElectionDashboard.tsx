import React, { useState, useEffect } from 'react';
import CardStats from '../CardStats';
import DataTable from '../DataTable';
import { CheckCircleIcon, UsersIcon, PieChartIcon, ShieldIcon } from './Icons';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const tableColumns = [
  { key: 'candidato', header: 'Candidato / Lista' },
  { key: 'votos', header: 'Votos Válidos' },
  { key: 'porcentaje', header: 'Porcentaje' },
];

const mockData = [
  { candidato: 'Lista Innovación Universitaria', votos: '845', porcentaje: '42.5%' },
  { candidato: 'Frente Académico', votos: '620', porcentaje: '31.2%' },
  { candidato: 'Unidad Estudiantil', votos: '412', porcentaje: '20.7%' },
];

// Recharts pie chart data representing all votes (including blank & null)
const finalResultsData = [
  { name: 'Lista Innovación Universitaria', value: 845, color: '#3b82f6' },
  { name: 'Frente Académico', value: 620, color: '#10b981' },
  { name: 'Unidad Estudiantil', value: 412, color: '#f59e0b' },
  { name: 'Votos Blancos', value: 72, color: '#94a3b8' },
  { name: 'Votos Nulos', value: 39, color: '#cbd5e1' },
];

export default function PostElectionDashboard() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Official Announcement of Closed & Scrutinized Election */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-emerald-800 tracking-tight">Elección Finalizada y Escrutada</h2>
          <p className="text-emerald-600 font-medium mt-1">Los resultados han sido validados y registrados de forma inmutable en la red blockchain.</p>
        </div>
        <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
          <CheckCircleIcon className="w-6 h-6" />
        </div>
      </div>

      {/* Winner Declaration banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md shadow-blue-500/20">
        <div className="space-y-1">
          <span className="text-[10px] bg-white/20 text-white border border-white/10 px-3 py-1 rounded-full font-bold uppercase tracking-wider">Candidatura Electa</span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Lista Innovación Universitaria</h2>
          <p className="text-blue-100/90 text-sm font-semibold">Ganador de las Elecciones Generales UNAJMA con un 42.5% de los votos válidos.</p>
        </div>
        <div className="bg-white/10 border border-white/20 px-6 py-4 rounded-xl text-center shadow-inner flex-shrink-0">
          <span className="text-sm font-bold text-blue-200 block uppercase leading-none">Votos Ganadores</span>
          <span className="text-3xl font-black block mt-1.5">845</span>
        </div>
      </div>

      {/* Metrics Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardStats 
          title="Total Votos Emitidos" 
          value="1,988" 
          icon={<UsersIcon className="w-6 h-6 text-blue-600" />}
          trend="neutral"
          subtitle="100% de urnas escrutadas"
        />
        <CardStats 
          title="Participación Final" 
          value="81.8%" 
          icon={<PieChartIcon className="w-6 h-6 text-blue-600" />}
          trend="neutral"
          subtitle="2,429 habilitados"
        />
        <CardStats 
          title="Votos Blancos/Nulos" 
          value="111" 
          icon={<PieChartIcon className="w-6 h-6 text-slate-500" />}
          trend="neutral"
          subtitle="5.6% del total de votos"
        />
        <CardStats 
          title="Auditoría Blockchain" 
          value="100% Íntegra" 
          icon={<ShieldIcon className="w-6 h-6 text-emerald-600" />}
          trend="up"
          subtitle="Consenso validado"
        />
      </div>

      {/* Grid of Results Table + Results PieChart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Results list table */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Resultados Oficiales</h2>
          <DataTable 
            columns={tableColumns} 
            data={mockData} 
          />

          {/* Detailed Blank/Null Tally */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5 flex justify-between items-center text-sm font-bold text-slate-700">
            <div>
              <span className="text-slate-500 font-semibold block text-xs">VOTOS BLANCOS</span>
              <span className="text-slate-800 text-lg mt-1 block">72 votos <span className="text-xs text-slate-500 font-medium">(3.6%)</span></span>
            </div>
            <div className="border-l border-slate-200 h-8"></div>
            <div>
              <span className="text-slate-500 font-semibold block text-xs">VOTOS NULOS</span>
              <span className="text-slate-800 text-lg mt-1 block">39 votos <span className="text-xs text-slate-500 font-medium">(2.0%)</span></span>
            </div>
            <div className="border-l border-slate-200 h-8"></div>
            <div>
              <span className="text-slate-500 font-semibold block text-xs">VOTOS VÁLIDOS</span>
              <span className="text-blue-600 text-lg mt-1 block">1,877 votos <span className="text-xs text-slate-500 font-medium">(94.4%)</span></span>
            </div>
          </div>
        </div>
        
        {/* PieChart visualizer */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-4">
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">Distribución de Votos</h3>
          
          <div className="h-[180px] w-full flex items-center justify-center mt-2">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={finalResultsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {finalResultsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-slate-400 text-sm font-semibold">Cargando gráfico...</div>
            )}
          </div>

          <div className="space-y-2 mt-4 text-xs font-semibold text-slate-600">
            {finalResultsData.map((res) => (
              <div key={res.name} className="flex items-center justify-between border-b border-slate-50 pb-1.5 last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-md" style={{ backgroundColor: res.color }} />
                  <span className="truncate max-w-[150px]">{res.name}</span>
                </div>
                <span className="text-slate-800">{res.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Blockchain Verification Certificate & Reports Download */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Certificate Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-4">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <ShieldIcon className="w-5 h-5 text-emerald-600" />
            Certificado de Integridad Blockchain
          </h2>
          
          <div className="bg-slate-50 rounded-xl p-4.5 space-y-3 font-mono text-[11px] text-slate-600">
            <div className="flex flex-col sm:flex-row justify-between gap-1 border-b border-slate-200/50 pb-2">
              <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider">Merkle Root Hash</span>
              <span className="text-slate-800 break-all select-all font-black">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b border-slate-200/50 pb-2">
              <div>
                <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block">Canal de Red</span>
                <span className="text-slate-800 font-bold">ved-unajma-channel</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block">Altura de Bloque</span>
                <span className="text-slate-800 font-bold">#48,912</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-1">
              <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider">Fecha y Hora de Cierre</span>
              <span className="text-slate-800 font-bold">2026-07-15 16:05:00 UTC-5</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            El certificado de cierre anterior demuestra que el total de votos coincide exactamente con el número de transacciones validadas en el ledger descentralizado por la mayoría de nodos calificados.
          </p>
        </div>

        {/* Action button menu */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Reportes de Cierre</h2>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-2">
            <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl font-semibold text-slate-700 transition-colors text-xs flex items-center justify-between">
              Descargar Acta Electoral (PDF)
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </button>
            <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl font-semibold text-slate-700 transition-colors text-xs flex items-center justify-between">
              Descargar Auditoría Blockchain (CSV)
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </button>
            <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl font-semibold text-slate-700 transition-colors text-xs flex items-center justify-between">
              Verificar Hash del Contrato
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
