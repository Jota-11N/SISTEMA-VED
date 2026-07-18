'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, AlertCircle, Clock, CheckCircle2, ChevronRight, 
  Lock, EyeOff, Shield, AlertTriangle, Loader2, Download, LogOut, Check
} from 'lucide-react';

// --- CONFIGURACIÓN DINÁMICA ---
const procesoElectoral = {
  nombre: "Elecciones Universitarias UNAJMA 2026",
  elecciones: [
    { id: "au", nombre: "Asamblea Universitaria", subtitulo: "Seleccione una lista para representantes ante la Asamblea" },
    { id: "cu", nombre: "Consejo Universitario", subtitulo: "Seleccione una lista para representantes ante el Consejo" },
    { id: "cf", nombre: "Consejo de Facultad", subtitulo: "Seleccione una lista para representantes de tu Facultad" }
  ]
};

const listasMock = [
  { id: 'lista1', numero: '1', nombre: 'Frente Estudiantil', candidato: 'Ana Quispe' },
  { id: 'lista2', numero: '2', nombre: 'Alianza Universitaria', candidato: 'Carlos Mendoza' },
  { id: 'lista3', numero: '3', nombre: 'Renovación UNAJMA', candidato: 'Elena Rojas' },
];

export default function VotingModule() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  
  // Estados para el procesamiento
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [cve, setCve] = useState('');
  const [logoutTimer, setLogoutTimer] = useState(10);
  
  // Reloj
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-PE', { hour12: true }));
    };
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Total steps:
  // 0: Bienvenida
  // 1: Instrucciones
  // 2 to 2 + elecciones.length - 1: Selecciones
  // 2 + elecciones.length: Resumen
  const numElections = procesoElectoral.elecciones.length;
  const SUMMARY_STEP = 2 + numElections;

  const handleNext = () => {
    // Si estamos en una pantalla de elección, validar que se haya seleccionado algo
    if (currentStep >= 2 && currentStep < SUMMARY_STEP) {
      const electionId = procesoElectoral.elecciones[currentStep - 2].id;
      if (!selections[electionId]) {
        setShowErrorToast(true);
        setTimeout(() => setShowErrorToast(false), 3000);
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSelect = (electionId: string, listId: string) => {
    setSelections(prev => ({ ...prev, [electionId]: listId }));
    setShowErrorToast(false);
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const startCryptographicProcess = () => {
    setShowConfirmModal(false);
    setIsProcessing(true);
    
    // Simular el proceso en 6 pasos
    let step = 1;
    const interval = setInterval(() => {
      if (step > 6) {
        clearInterval(interval);
        setIsProcessing(false);
        setIsSuccess(true);
        // Generar hash aleatorio simulado
        const txId = '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
        setTransactionHash(txId);
        // Generar CVE simulado basado en requerimiento VED-2026-XXXX-XXXX
        const mockCVE = 'VED-2026-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
        setCve(mockCVE);
      } else {
        setProcessStep(step);
        step++;
      }
    }, 1500);
  };

  // Logout automático en la pantalla de éxito con contador
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isSuccess && logoutTimer > 0) {
      timerId = setTimeout(() => setLogoutTimer(prev => prev - 1), 1000);
    } else if (isSuccess && logoutTimer === 0) {
      // Limpieza destructiva inmutable
      localStorage.clear();
      sessionStorage.clear();
      router.push('/login?logout=success');
    }
    return () => clearTimeout(timerId);
  }, [isSuccess, logoutTimer, router]);

  // Interceptar navegación hacia atrás para evitar volver a votar
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (isSuccess) {
        // Prevenir ir hacia atrás
        window.history.pushState(null, '', window.location.href);
        // Podríamos usar react-hot-toast para "Su participación electoral ya fue registrada"
        alert("Su participación electoral ya fue registrada por seguridad.");
        router.push('/login');
      }
    };
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isSuccess, router]);

  // Logout manual eliminado según instrucción


  // --- SUBCOMPONENTES DE PANTALLAS ---

  const renderWelcome = () => (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-full">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="font-bold text-emerald-800 text-sm">Elector habilitado para votar</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          <Clock className="w-4 h-4" />
          {time}
        </div>
      </div>

      <div className="text-center space-y-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
          {procesoElectoral.nombre}
        </h1>
        <p className="text-lg text-slate-600 font-medium">
          Bienvenido(a), <span className="text-red-700 font-bold">ESTUDIANTE REGULAR</span>
        </p>
        <p className="text-sm text-slate-500">Escuela Profesional de Ingeniería de Sistemas</p>
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-red-700 hover:bg-red-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-700/20 transition-all flex items-center justify-center gap-2"
      >
        Iniciar proceso de votación <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderInstructions = () => (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-slate-800">Instrucciones de Seguridad</h2>
        <p className="text-slate-500 font-medium">Por favor lea detenidamente antes de emitir su voto.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <EyeOff className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800">Voto Secreto</h3>
          <p className="text-xs text-slate-500">Su elección será encriptada de punto a punto. Nadie sabrá por quién votó.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800">Un Solo Uso</h3>
          <p className="text-xs text-slate-500">Solo puede emitir su voto una única vez. Al confirmar, la sesión se cerrará.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800">Blockchain</h3>
          <p className="text-xs text-slate-500">Los resultados son inmutables y auditables gracias a tecnología descentralizada.</p>
        </div>
      </div>

      <div className="bg-slate-100 p-4 rounded-xl flex items-start gap-3 border border-slate-200">
        <input 
          type="checkbox" 
          id="terms"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-1 w-5 h-5 rounded border-slate-300 text-red-700 focus:ring-red-700 cursor-pointer accent-red-700"
        />
        <label htmlFor="terms" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
          He leído y acepto las instrucciones de votación de la UNAJMA, comprendiendo que mi voto es irreversible una vez confirmado.
        </label>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handlePrev}
          className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 py-3.5 rounded-xl font-bold transition-all shadow-sm"
        >
          Regresar
        </button>
        <button
          onClick={handleNext}
          disabled={!agreedToTerms}
          className={`flex-1 py-3.5 rounded-xl font-bold transition-all shadow-sm
            ${agreedToTerms 
              ? 'bg-red-700 hover:bg-red-800 text-white shadow-red-700/20' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          Continuar
        </button>
      </div>
    </div>
  );

  const renderElectionStep = () => {
    const electionIndex = currentStep - 2;
    const election = procesoElectoral.elecciones[electionIndex];
    const selectedList = selections[election.id];

    return (
      <div className="space-y-6 animate-in slide-in-from-right-8 duration-300 pb-10">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-black text-slate-800">{election.nombre}</h2>
          <p className="text-slate-500 font-medium">{election.subtitulo}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {listasMock.map((lista) => (
            <div 
              key={lista.id}
              onClick={() => handleSelect(election.id, lista.id)}
              className={`relative bg-white rounded-xl border-2 p-5 cursor-pointer transition-all hover:shadow-md group flex flex-col items-center text-center
                ${selectedList === lista.id 
                  ? 'border-red-600 bg-red-50/30 shadow-md ring-4 ring-red-600/10' 
                  : 'border-slate-200 hover:border-red-300'}`}
            >
              <div className="absolute top-4 right-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                  ${selectedList === lista.id ? 'border-red-600 bg-red-600 text-white' : 'border-slate-300 group-hover:border-red-400'}`}>
                  {selectedList === lista.id && <Check className="w-4 h-4" />}
                </div>
              </div>

              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-2xl font-black text-slate-400">
                {lista.numero}
              </div>
              <h3 className="font-bold text-slate-800 mb-1 leading-tight">{lista.nombre}</h3>
              <div className="w-12 h-12 rounded-full bg-slate-200 mt-2 mb-2 overflow-hidden bg-[url('https://i.pravatar.cc/100?img=1')] bg-cover bg-center opacity-80 mix-blend-multiply"></div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{lista.candidato}</p>
            </div>
          ))}

          {/* Voto en Blanco */}
          <div 
            onClick={() => handleSelect(election.id, 'blanco')}
            className={`relative bg-white rounded-xl border-2 p-5 cursor-pointer transition-all hover:shadow-md group flex flex-col items-center justify-center text-center min-h-[220px]
              ${selectedList === 'blanco' 
                ? 'border-slate-800 bg-slate-100 shadow-md ring-4 ring-slate-800/10' 
                : 'border-slate-200 border-dashed hover:border-slate-400 hover:bg-slate-50'}`}
          >
            <div className="absolute top-4 right-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                  ${selectedList === 'blanco' ? 'border-slate-800 bg-slate-800 text-white' : 'border-slate-300 group-hover:border-slate-400'}`}>
                  {selectedList === 'blanco' && <Check className="w-4 h-4" />}
                </div>
              </div>
            <div className="w-16 h-16 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center mb-3 shadow-sm">
              <div className="w-8 h-8 rounded-full border-2 border-slate-300"></div>
            </div>
            <h3 className="font-bold text-slate-600">Voto en Blanco</h3>
          </div>
        </div>

        <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-200">
          <button
            onClick={handlePrev}
            className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl font-bold transition-all shadow-sm"
          >
            Atrás
          </button>
          <div className="flex items-center gap-4">
            {showErrorToast && (
              <span className="text-red-600 text-sm font-bold animate-in fade-in slide-in-from-right-4 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Debe seleccionar una opción
              </span>
            )}
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-700/20 flex items-center gap-2"
            >
              Siguiente <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-800">Resumen de Votación</h2>
          <p className="text-slate-500 font-medium">Por favor, verifique sus selecciones antes de confirmar de manera definitiva.</p>
        </div>

        <div className="space-y-3">
          {procesoElectoral.elecciones.map((election, idx) => {
            const listId = selections[election.id];
            const lista = listId === 'blanco' 
              ? { nombre: 'Voto en Blanco', numero: '' } 
              : listasMock.find(l => l.id === listId);
              
            return (
              <div key={election.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{election.nombre}</p>
                  <p className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    {lista?.nombre} {lista?.numero && <span className="text-slate-400 text-sm font-normal">(Lista {lista.numero})</span>}
                  </p>
                </div>
                <button 
                  onClick={() => setCurrentStep(2 + idx)}
                  className="text-sm font-bold text-blue-600 hover:text-blue-800 underline opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                >
                  Editar
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex gap-4 pt-6">
          <button
            onClick={handlePrev}
            className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 py-3.5 rounded-xl font-bold transition-all shadow-sm"
          >
            Modificar Votos
          </button>
          <button
            onClick={() => setShowConfirmModal(true)}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20"
          >
            Confirmar Voto
          </button>
        </div>
      </div>
    );
  };

  const renderConfirmModal = () => {
    if (!showConfirmModal) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
          <div className="flex items-center gap-3 mb-4 text-red-600">
            <AlertTriangle className="w-8 h-8" />
            <h3 className="text-xl font-black text-slate-800">Confirmación Definitiva</h3>
          </div>
          <p className="text-slate-600 font-medium mb-6 leading-relaxed">
            Una vez emitido el voto, la transacción se registrará en la Blockchain y <span className="font-bold text-slate-800">no podrá ser modificada</span> bajo ninguna circunstancia.
          </p>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowConfirmModal(false)}
              className="flex-1 py-3 px-4 rounded-xl font-bold border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button 
              onClick={startCryptographicProcess}
              className="flex-1 py-3 px-4 rounded-xl font-bold bg-red-700 hover:bg-red-800 text-white shadow-md shadow-red-700/20"
            >
              Sí, emitir voto
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderProcessing = () => {
    const steps = [
      "Validando identidad del elector...",
      "Verificando doble emisión en el Padrón...",
      "Preparando transacción criptográfica privada...",
      "Ejecutando Smart Contract en Hyperledger Fabric...",
      "Esperando consenso e inmutabilidad de la Blockchain...",
      "Generando comprobante de participación digital..."
    ];

    return (
      <div className="max-w-xl mx-auto py-12 px-6 bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-800">Procesando Voto Seguro</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Por favor, no cierre esta ventana.</p>
        </div>

        <div className="space-y-4">
          {steps.map((text, idx) => {
            const stepNum = idx + 1;
            const isCompleted = processStep > stepNum;
            const isActive = processStep === stepNum;
            const isPending = processStep < stepNum;

            return (
              <div key={idx} className={`flex items-center gap-4 p-3 rounded-lg transition-colors duration-500 ${isActive ? 'bg-blue-50' : ''}`}>
                <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                  {isCompleted && <CheckCircle2 className="w-6 h-6 text-emerald-500 animate-in zoom-in" />}
                  {isActive && <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />}
                  {isPending && <div className="w-4 h-4 rounded-full border-2 border-slate-200" />}
                </div>
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  isCompleted ? 'text-slate-800' : 
                  isActive ? 'text-blue-700 font-bold' : 
                  'text-slate-400'
                }`}>
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSuccess = () => (
    <div className="max-w-md mx-auto text-center space-y-6 animate-in zoom-in-95 duration-500 py-10">
      <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-12 h-12 text-emerald-600" />
      </div>
      <h2 className="text-2xl font-black text-slate-800">¡Votación Exitosa!</h2>
      <p className="text-slate-600 font-medium leading-relaxed">
        Su voto ha sido registrado correctamente de forma anónima y segura en la red.
      </p>

      <div className="bg-slate-100 p-5 rounded-xl text-left border border-slate-200 shadow-inner">
        <ul className="space-y-3">
          <li className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estado del Voto</span>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">Confirmado</span>
          </li>
          <li className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha y Hora</span>
            <span className="text-xs font-medium text-slate-700">{new Date().toLocaleDateString('es-PE')} - {time}</span>
          </li>
          <li className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">C.V.E.</span>
            <span className="text-sm font-black text-slate-800 tracking-widest">{cve}</span>
          </li>
          <li className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Transaction ID</span>
            <span className="text-xs font-mono text-slate-700 max-w-[120px] truncate" title={transactionHash}>
              {transactionHash.substring(0, 10)}...{transactionHash.substring(transactionHash.length - 8)}
            </span>
          </li>
          <li className="flex justify-between items-center pt-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hyperledger Status</span>
            <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">Validado en Nodo</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl shadow-lg border border-slate-800">
        <p className="text-slate-300 text-xs uppercase tracking-wider font-bold mb-2">Destrucción de sesión por seguridad en:</p>
        <div className="text-4xl font-black text-white font-mono animate-pulse">
          00:{logoutTimer.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );

  // --- COMPONENTE PRINCIPAL RENDER ---
  
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        {renderProcessing()}
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        {renderSuccess()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Header Institucional */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-3">
          <div className="w-8 h-8 bg-red-700 rounded-lg flex items-center justify-center text-white font-black text-xs">U</div>
          <div>
            <h1 className="font-bold text-sm text-slate-800 leading-none">Comité Electoral UNAJMA</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">Sistema VED</p>
          </div>
        </div>
      </header>

      {/* Stepper Superior (Oculto en Bienvenida) */}
      {currentStep > 0 && (
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            {[...Array(SUMMARY_STEP)].map((_, idx) => {
              const isCompleted = idx < currentStep - 1;
              const isActive = idx === currentStep - 1;
              const isFuture = idx > currentStep - 1;
              // Para alinear con los pasos: step 1 es índice 0 en stepper
              // Stepper abarca desde step 1 (Instrucciones) hasta SUMMARY_STEP
              return (
                <React.Fragment key={idx}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 z-10
                    ${isCompleted ? 'bg-emerald-500 text-white' : 
                      isActive ? 'bg-red-700 text-white ring-4 ring-red-700/20 scale-110' : 
                      'bg-slate-200 text-slate-400'}`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : (idx + 1)}
                  </div>
                  {idx < SUMMARY_STEP - 1 && (
                    <div className={`w-8 sm:w-16 h-1 transition-colors duration-300 ${isCompleted ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* Contenedor Principal */}
      <main className="max-w-5xl mx-auto px-4 mt-8">
        {currentStep === 0 && renderWelcome()}
        {currentStep === 1 && renderInstructions()}
        {currentStep >= 2 && currentStep < SUMMARY_STEP && renderElectionStep()}
        {currentStep === SUMMARY_STEP && renderSummary()}
      </main>

      {renderConfirmModal()}
    </div>
  );
}
