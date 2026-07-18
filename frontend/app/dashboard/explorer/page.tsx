'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Activity, Server, Blocks, Fingerprint } from 'lucide-react';

export default function HyperledgerExplorerPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // RBAC Middleware Simulado en Cliente
    // En producción esto se manejaría vía middleware.ts de Next.js leyendo el JWT
    const checkAuth = () => {
      // Obtenemos un rol mockeado (por defecto permitimos para demo de admin)
      // En entorno real, esto validaría: ['SUPER_ADMIN', 'CEU', 'AUDITOR', 'PERSONERO'].includes(role)
      const role = typeof window !== 'undefined' ? localStorage.getItem('role') || 'admin' : 'admin';
      
      if (role === 'elector') {
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    };
    checkAuth();
  }, []);

  if (isAuthorized === null) {
    return <div className="p-10 flex justify-center text-slate-500">Verificando credenciales...</div>;
  }

  if (isAuthorized === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-in fade-in zoom-in-95">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
          <ShieldAlert className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-3xl font-black text-slate-800">Acceso Denegado (RBAC)</h2>
        <p className="text-slate-500 max-w-md">
          Su rol actual no tiene privilegios suficientes para acceder al Explorador de Bloques. 
          Este módulo está restringido exclusivamente a Auditores, CEU y Administradores.
        </p>
        <button 
          onClick={() => router.push('/dashboard')}
          className="mt-6 px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-all shadow-sm"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <nav className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <span>Inicio</span> <span className="mx-2">/</span> <span>Auditoría</span> <span className="mx-2">/</span> <span className="text-red-700">Hyperledger Explorer</span>
      </nav>

      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <Blocks className="w-6 h-6 text-red-700" /> 
            Explorador de Blockchain
          </h1>
          <p className="text-sm text-slate-500 font-medium">Contenedor seguro para monitoreo en tiempo real de la red Fabric (Nodos, Transacciones, Chaincodes).</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest shadow-sm">
          <Activity className="w-4 h-4 animate-pulse" />
          Red Activa y Sincronizada
        </div>
      </div>

      {/* Mini-Métricas Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-lg"><Blocks className="w-5 h-5" /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Bloques</p>
            <p className="text-xl font-black text-slate-800">4,892</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Fingerprint className="w-5 h-5" /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Transacciones</p>
            <p className="text-xl font-black text-slate-800">4,891</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><Server className="w-5 h-5" /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Peers Activos</p>
            <p className="text-xl font-black text-slate-800">4</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><ShieldAlert className="w-5 h-5" /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Chaincodes</p>
            <p className="text-xl font-black text-slate-800">1</p>
          </div>
        </div>
      </div>

      {/* iFrame Container - Hyperledger Explorer */}
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-800 relative min-h-[600px] flex flex-col">
        <div className="h-10 bg-slate-950 flex items-center px-4 justify-between shrink-0">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
          </div>
          <div className="text-[10px] font-mono text-slate-500">unajma-fabric-explorer-node</div>
        </div>
        
        {/* Simulación del iFrame (En entorno real sería un <iframe src="http://localhost:8080" /> ) */}
        <div className="flex-1 p-6 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
          <div className="h-full border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center text-center space-y-4 p-6">
            <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center">
              <Blocks className="w-8 h-8 text-slate-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-300">Hyperledger Explorer Integrado</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mt-2">
                En el entorno de producción, este recuadro renderiza el iFrame apuntando al proxy inverso del Explorer oficial, estilizado con CSS inyectado para coincidir con la paleta oscura actual.
              </p>
            </div>
            <code className="text-[10px] bg-slate-950 text-emerald-400 p-3 rounded-lg border border-slate-800 text-left w-full max-w-lg mt-4 font-mono shadow-inner">
              <span className="text-slate-500">// iFrame Mount Point</span><br/>
              &lt;iframe <br/>
              &nbsp;&nbsp;src="http://fabric-explorer:8080"<br/>
              &nbsp;&nbsp;className="w-full h-full border-0"<br/>
              &nbsp;&nbsp;sandbox="allow-scripts allow-same-origin"<br/>
              /&gt;
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
