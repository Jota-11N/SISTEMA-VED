import React, { useState, useEffect } from 'react';
import CardStats from '../CardStats';
import { ServerIcon, ShieldIcon, CheckCircleIcon, ClockIcon } from './Icons';

interface CountingDashboardProps {
  onValidationComplete?: () => void;
}

export default function CountingDashboard({ onValidationComplete }: CountingDashboardProps) {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          if (onValidationComplete) {
            onValidationComplete();
          }
          return 100;
        }
        // Increment between 5 and 15 percent
        const increment = Math.floor(Math.random() * 10) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isRunning, onValidationComplete]);

  const resetSimulation = () => {
    setProgress(0);
    setIsRunning(true);
  };

  // Determine stage statuses based on progress
  const getStageStatus = (startRange: number, endRange: number) => {
    if (progress >= endRange) return { text: 'Verificado', className: 'bg-emerald-50 text-emerald-700 border border-emerald-200' };
    if (progress >= startRange) return { text: 'En proceso...', className: 'bg-blue-50 text-blue-700 border border-blue-200 animate-pulse' };
    return { text: 'Pendiente', className: 'bg-slate-50 text-slate-400 border border-slate-200' };
  };

  const smartContractStatus = getStageStatus(0, 25);
  const blockConfirmationStatus = getStageStatus(25, 60);
  const ledgerValidationStatus = getStageStatus(60, 90);
  const decryptionStatus = getStageStatus(90, 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Simulation Info */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-indigo-900 tracking-tight flex items-center gap-2.5">
            <svg className="w-5 h-5 animate-spin text-indigo-600" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando Escrutinio Descentralizado
          </h2>
          <p className="text-indigo-700 text-sm font-medium">
            Los nodos validadores están verificando las firmas criptográficas y construyendo el árbol de consenso.
          </p>
        </div>
        <button 
          onClick={resetSimulation}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/25 transition-all flex-shrink-0"
        >
          Reiniciar Simulación
        </button>
      </div>

      {/* Progress metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Main Validation Progress Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Progreso de Validación Blockchain</h3>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-5xl font-black text-slate-800 tracking-tight">{progress}%</span>
              <span className="text-sm text-slate-500 font-semibold">de bloques auditados</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-slate-400 font-semibold">
              <span>Fase de Consenso</span>
              <span>100% requerido para desbloquear resultados</span>
            </div>
          </div>
        </div>

        {/* Validation Lock Notification */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-center items-center text-center space-y-4">
          <div className="h-14 w-14 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-slate-500 shadow-inner">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-slate-700">Resultados Encriptados</h3>
            <p className="text-xs text-slate-500 max-w-sm mt-1">
              Los resultados de los comicios se encuentran protegidos criptográficamente en la red. Se desbloquearán automáticamente al alcanzar el 100% de la verificación.
            </p>
          </div>
        </div>

      </div>

      {/* Verification Stages */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-4">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Etapas del Proceso de Consenso</h3>
        
        <div className="divide-y divide-gray-100">
          
          {/* Stage 1 */}
          <div className="py-4 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-700">1. Verificación de Smart Contract</h4>
              <p className="text-xs text-slate-500">Validación del bytecode y las firmas del contrato del escrutinio.</p>
            </div>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${smartContractStatus.className}`}>
              {smartContractStatus.text}
            </span>
          </div>

          {/* Stage 2 */}
          <div className="py-4 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-700">2. Confirmación de Secuencia de Bloques</h4>
              <p className="text-xs text-slate-500">Auditoría del encadenamiento de bloques y verificación de hashes previos.</p>
            </div>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${blockConfirmationStatus.className}`}>
              {blockConfirmationStatus.text}
            </span>
          </div>

          {/* Stage 3 */}
          <div className="py-4 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-700">3. Validación del Libro Mayor (Ledger)</h4>
              <p className="text-xs text-slate-500">Recuento seguro de transacciones de voto y verificación de doble gasto.</p>
            </div>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${ledgerValidationStatus.className}`}>
              {ledgerValidationStatus.text}
            </span>
          </div>

          {/* Stage 4 */}
          <div className="py-4 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-700">4. Desencriptación Descentralizada</h4>
              <p className="text-xs text-slate-500">Reunión de llaves compartidas del jurado electoral para descifrar el escrutinio.</p>
            </div>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${decryptionStatus.className}`}>
              {decryptionStatus.text}
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
