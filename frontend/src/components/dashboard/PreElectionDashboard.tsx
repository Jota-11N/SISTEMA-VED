import React, { useState, useEffect } from 'react';
import CardStats from '../CardStats';
import DataTable from '../DataTable';
import { BoxSelect, Users, User, Clock, Server, ShieldCheck, Key, CheckSquare } from 'lucide-react';

const tableColumns = [
  { key: 'accion', header: 'Acción Pendiente' },
  { key: 'responsable', header: 'Responsable' },
  { key: 'estado', header: 'Estado' },
];

const mockData = [
  { accion: 'Registro de nuevo candidato', responsable: 'Admin CEU', estado: 'Completado' },
  { accion: 'Actualización de padrón final', responsable: 'Admin CEU', estado: 'Pendiente' },
  { accion: 'Configuración de elección y nodos', responsable: 'Admin CEU', estado: 'Pendiente' },
  { accion: 'Publicación de cronograma', responsable: 'CEU', estado: 'Completado' },
];

export default function PreElectionDashboard() {
  const [timeLeft, setTimeLeft] = useState({ days: 1, hours: 14, minutes: 35, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Top Countdown Banner */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground tracking-tight">Preparación del Proceso Electoral</h2>
          <p className="text-foreground-muted text-sm font-medium">El sufragio dará inicio oficialmente al finalizar el temporizador.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-surface px-4 py-2 rounded-xl border border-border text-center min-w-[70px] shadow-sm">
            <span className="text-2xl font-black text-primary block">{timeLeft.days}</span>
            <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest mt-1">Días</span>
          </div>
          <div className="bg-surface px-4 py-2 rounded-xl border border-border text-center min-w-[70px] shadow-sm">
            <span className="text-2xl font-black text-primary block">{timeLeft.hours}</span>
            <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest mt-1">Hrs</span>
          </div>
          <div className="bg-surface px-4 py-2 rounded-xl border border-border text-center min-w-[70px] shadow-sm">
            <span className="text-2xl font-black text-primary block">{timeLeft.minutes}</span>
            <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest mt-1">Min</span>
          </div>
          <div className="bg-surface px-4 py-2 rounded-xl border border-border text-center min-w-[70px] shadow-sm">
            <span className="text-2xl font-black text-error block">{timeLeft.seconds}</span>
            <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest mt-1">Seg</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <CardStats 
          title="Elecciones Creadas" 
          value="1" 
          icon={<CheckSquare className="w-5 h-5" />}
          trend="neutral"
          subtitle="En Preparación"
          iconBgClass="bg-success/15"
          iconColorClass="text-success"
        />
        <CardStats 
          title="Electores Registrados" 
          value="2,429" 
          icon={<Users className="w-5 h-5" />}
          trend="neutral"
          subtitle="Padrón en revisión"
          iconBgClass="bg-primary/15"
          iconColorClass="text-primary"
        />
        <CardStats 
          title="Listas Postuladas" 
          value="3" 
          icon={<User className="w-5 h-5" />}
          trend="neutral"
          subtitle="Candidatos inscritos: 12"
          iconBgClass="bg-warning/15"
          iconColorClass="text-warning"
        />
        <CardStats 
          title="Cronograma" 
          value={<span className="text-success">A Tiempo</span>} 
          icon={<Clock className="w-5 h-5" />}
          trend="neutral"
          subtitle="Apertura automatizada"
          iconBgClass="bg-error/15"
          iconColorClass="text-error"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        
        {/* Tasks Table */}
        <div className="lg:col-span-2 space-y-4 flex flex-col">
          <h2 className="text-lg font-bold text-foreground tracking-tight">Tareas de Preparación</h2>
          <div className="flex-1">
            <DataTable 
              columns={tableColumns} 
              data={mockData} 
            />
          </div>
        </div>

        {/* Blockchain and Smart Contract Pre-election status */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground tracking-tight">Red y Seguridad</h2>
          
          <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div className="flex items-center gap-3 text-foreground">
                <Server className="w-5 h-5 text-foreground" />
                <span className="font-semibold text-sm">Nodos Inicializados</span>
              </div>
              <span className="font-black text-success text-sm">7 / 7</span>
            </div>

            <div className="flex justify-between items-center border-b border-border pb-4">
              <div className="flex items-center gap-3 text-foreground">
                <ShieldCheck className="w-5 h-5 text-foreground" />
                <span className="font-semibold text-sm">Contrato Inteligente</span>
              </div>
              <span className="font-black text-success text-sm">Verificado (v1.0)</span>
            </div>

            <div className="flex justify-between items-center pb-2">
              <div className="flex items-center gap-3 text-foreground">
                <Key className="w-5 h-5 text-primary" />
                <span className="font-semibold text-sm">Llave Criptográfica</span>
              </div>
              <span className="font-black text-primary text-sm">Generada</span>
            </div>

            <p className="text-xs text-foreground-muted font-medium pt-4 text-center border-t border-border">
              Canal de red de Hyperledger Fabric listo y levantado para el despliegue de urnas electrónicas.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground tracking-tight">Accesos Rápidos</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary hover:bg-primary-hover hover:-translate-y-0.5 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all border border-transparent">Gestionar Elecciones</button>
          <button className="bg-surface hover:bg-surface-hover hover:-translate-y-0.5 text-foreground px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all border border-border">Gestionar Listas</button>
          <button className="bg-surface hover:bg-surface-hover hover:-translate-y-0.5 text-foreground px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all border border-border">Configurar Proceso</button>
        </div>
      </div>
    </div>
  );
}
