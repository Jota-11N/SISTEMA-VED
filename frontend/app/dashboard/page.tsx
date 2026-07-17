'use client';
import React, { useState } from 'react';
import PreElectionDashboard from '../../src/components/dashboard/PreElectionDashboard';
import VotingDashboard from '../../src/components/dashboard/VotingDashboard';
import PollsClosedDashboard from '../../src/components/dashboard/PollsClosedDashboard';
import CountingDashboard from '../../src/components/dashboard/CountingDashboard';
import PostElectionDashboard from '../../src/components/dashboard/PostElectionDashboard';
import { ChevronRight, Settings2 } from 'lucide-react';

type ElectionStatus = 'PRE_ELECTION' | 'VOTING' | 'POLLS_CLOSED' | 'COUNTING' | 'RESULTS_PUBLISHED';

const timelineSteps = [
  { id: 'PRE_ELECTION', label: 'Preelectoral' },
  { id: 'VOTING', label: 'Votación' },
  { id: 'POLLS_CLOSED', label: 'Urnas Cerradas' },
  { id: 'COUNTING', label: 'Escrutinio (Conteo)' },
  { id: 'RESULTS_PUBLISHED', label: 'Resultados' },
];

export default function DashboardPage() {
  const [electionStatus, setElectionStatus] = useState<ElectionStatus>('PRE_ELECTION');
  const [isCountingFinished, setIsCountingFinished] = useState(false);

  const handleValidationComplete = () => {
    setIsCountingFinished(true);
  };

  const currentStepIndex = timelineSteps.findIndex(s => s.id === electionStatus);

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700">
      
      {/* Simulator Timeline Control Panel */}
      <div className="bg-surface rounded-2xl border border-border shadow-sm flex flex-col p-6 gap-6 relative overflow-hidden group">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-700"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-primary" />
              Simulador del Ciclo Electoral (Dev)
            </h2>
            <p className="text-xs text-foreground-muted mt-1">Línea de tiempo interactiva. Haz clic en las fases para simular el avance del proceso.</p>
          </div>
        </div>

        {/* Timeline Stepper */}
        <div className="relative z-10 w-full overflow-x-auto custom-scrollbar pb-2">
          <div className="flex items-center min-w-[700px]">
            {timelineSteps.map((step, index) => {
              const isPast = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isFuture = index > currentStepIndex;

              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => {
                      setElectionStatus(step.id as ElectionStatus);
                      if (step.id !== 'RESULTS_PUBLISHED') setIsCountingFinished(false);
                      if (step.id === 'RESULTS_PUBLISHED') setIsCountingFinished(true);
                    }}
                    className={`relative flex flex-col items-center justify-center group transition-all outline-none`}
                  >
                    <div 
                      className={`h-10 px-5 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-all duration-300
                        ${isCurrent ? 'bg-primary text-primary-foreground ring-4 ring-primary/20 scale-105' : 
                          isPast ? 'bg-surface hover:bg-surface-hover text-foreground border-2 border-primary/50' : 
                          'bg-surface hover:bg-surface-hover text-foreground-muted border border-border'}
                      `}
                    >
                      {step.label}
                    </div>
                  </button>
                  
                  {/* Connector Line */}
                  {index < timelineSteps.length - 1 && (
                    <div className="flex-1 flex items-center justify-center px-2">
                      <div className={`w-full h-[2px] rounded-full transition-colors duration-300 ${isPast ? 'bg-primary/50' : 'bg-border'}`}></div>
                      <ChevronRight className={`w-4 h-4 flex-shrink-0 -ml-2 transition-colors duration-300 ${isPast ? 'text-primary/70' : 'text-border'}`} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-2">
        <h1 className="text-3xl font-black text-foreground tracking-tight">Dashboard General</h1>
        <p className="text-foreground-muted font-medium">Resumen del ciclo de vida del proceso electoral descentralizado.</p>
      </div>

      {/* CONDITIONAL RENDERING BASED ON STATE */}
      <div className="transition-all duration-500 min-h-[600px]">
        {electionStatus === 'PRE_ELECTION' && <PreElectionDashboard />}
        {electionStatus === 'VOTING' && <VotingDashboard />}
        {electionStatus === 'POLLS_CLOSED' && <PollsClosedDashboard />}
        
        {electionStatus === 'COUNTING' && (
          <div className="space-y-6">
            <CountingDashboard onValidationComplete={handleValidationComplete} />
            {isCountingFinished && (
              <div className="bg-success/10 border border-success/20 rounded-xl p-5 flex items-center justify-between animate-in slide-in-from-bottom duration-500 shadow-sm">
                <span className="text-sm font-bold text-success-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                  Validación blockchain completada al 100%. Los resultados han sido desencriptados.
                </span>
                <button 
                  onClick={() => setElectionStatus('RESULTS_PUBLISHED')}
                  className="px-5 py-2.5 bg-success hover:bg-success/90 text-white text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  Publicar Resultados
                </button>
              </div>
            )}
          </div>
        )}

        {electionStatus === 'RESULTS_PUBLISHED' && <PostElectionDashboard />}
      </div>
      
    </div>
  );
}
