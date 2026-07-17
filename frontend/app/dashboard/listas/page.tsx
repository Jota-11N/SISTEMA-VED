'use client';

import React, { useState, Suspense } from 'react';
import CardStats from '../../../src/components/CardStats';
import DataTable from '../../../src/components/DataTable';
import GestionarAccesosModal from '../../../src/components/listas/GestionarAccesosModal';
import ObservarModal from '../../../src/components/listas/ObservarModal';
import { Eye, Check, AlertCircle, Image as ImageIcon, FileText, Send, Users, User, Award, CheckCircle2, Plus, Trash2, UploadCloud, BookOpen, Fingerprint, X } from 'lucide-react';

const initialData = [
  { id: 1, lista: 'Lista Innovación Universitaria', candidato: 'Jorge L. Altamirano', cargo: 'Representante Estudiantil', personero: 'Luis M. Ramos', estado: 'Acreditado' },
  { id: 2, lista: 'Frente Académico', candidato: 'Dra. Elena V. Medina', cargo: 'Representante Docente', personero: 'Dra. Celia S. Vega', estado: 'Pendiente' },
  { id: 3, lista: 'Unidad Estudiantil', candidato: 'Raúl E. Cáceres', cargo: 'Representante Estudiantil', personero: 'Sofía D. Prado', estado: 'Observado' },
];

function ContenidoListas({ role }: { role?: string }) {
  const isPersonero = role === 'personero';

  // State for Admin
  const [isAccesoModalOpen, setIsAccesoModalOpen] = useState(false);
  const [observarModalData, setObservarModalData] = useState<{isOpen: boolean; listaId: number | null; listaNombre: string}>({
    isOpen: false,
    listaId: null,
    listaNombre: ''
  });
  const [tableData, setTableData] = useState(initialData);

  // State for Personero
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'datos' | 'candidatos'>('datos');
  
  // State for Candidates Form
  const [candidatos, setCandidatos] = useState<any[]>([]);
  const [showAddCandidato, setShowAddCandidato] = useState(false);
  const [newCandidato, setNewCandidato] = useState({
    dni: '',
    nombres: '',
    cargo: '',
  });

  const handleAprobar = (id: number) => {
    setTableData(prev => prev.map(row => 
      row.id === id ? { ...row, estado: 'Acreditado' } : row
    ));
  };

  const handlePersoneroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
      setIsFormOpen(false);
    }, 1000);
  };

  const addCandidato = () => {
    if (newCandidato.dni && newCandidato.nombres && newCandidato.cargo) {
      setCandidatos([...candidatos, { ...newCandidato, id: Date.now() }]);
      setNewCandidato({ dni: '', nombres: '', cargo: '' });
      setShowAddCandidato(false);
    }
  };

  const removeCandidato = (id: number) => {
    setCandidatos(candidatos.filter(c => c.id !== id));
  };

  const adminColumns = [
    { key: 'lista', header: 'Lista / Agrupación' },
    { key: 'candidato', header: 'Candidato Principal' },
    { key: 'cargo', header: 'Cargo Postulado' },
    { key: 'personero', header: 'Personero Acreditado' },
    { key: 'estado', header: 'Estado Registro' },
    { 
      key: 'acciones', 
      header: 'Acciones',
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <button 
            title="Ver Expediente"
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button 
            title="Aprobar"
            onClick={() => handleAprobar(row.id)}
            className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          >
            <Check className="w-4 h-4" />
          </button>

          <button 
            title="Observar"
            onClick={() => setObservarModalData({ isOpen: true, listaId: row.id, listaNombre: row.lista })}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <AlertCircle className="w-4 h-4" />
          </button>
        </div>
      )
    },
  ];

  const personeroColumns = [
    { key: 'candidato', header: 'Candidato' },
    { key: 'cargo', header: 'Cargo Postulado' },
    { key: 'estado', header: 'Estado Validación' },
  ];

  const personeroCandidatosData = candidatos.length > 0 ? candidatos.map(c => ({
    candidato: c.nombres,
    cargo: c.cargo,
    estado: 'En Revisión'
  })) : [
    { candidato: 'Esperando datos...', cargo: '-', estado: 'Pendiente' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Breadcrumbs */}
      <nav className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <span>Inicio</span> <span className="mx-2">/</span> <span>Dashboard</span> <span className="mx-2">/</span> <span className="text-blue-600">Listas Electorales</span>
      </nav>

      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            {isPersonero ? 'Mi Agrupación Política' : 'Gestión de Listas Electorales'}
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            {isPersonero 
              ? 'Inscribe a tus candidatos y revisa el estado de tu lista.'
              : 'Revisión de expedientes y acreditación oficial de listas.'}
          </p>
        </div>
        {!isPersonero && (
          <button 
            onClick={() => setIsAccesoModalOpen(true)}
            className="px-4 py-2.5 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition-all self-start sm:self-center flex items-center gap-2"
          >
            Gestionar Accesos de Partidos
          </button>
        )}
      </div>

      {isPersonero ? (
        // VISTA PERSONERO
        <div className="space-y-6">
          {!isSubmitted && !isFormOpen && (
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-amber-500" />
                <div>
                  <h3 className="font-bold text-amber-800">Aún no has inscrito a tu agrupación</h3>
                  <p className="text-sm text-amber-700">Comienza el proceso llenando el formulario con los datos requeridos.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-md shadow-blue-600/20 whitespace-nowrap flex items-center gap-2"
              >
                Comenzar Inscripción
              </button>
            </div>
          )}

          {isFormOpen && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-in slide-in-from-top-4 duration-300">
              {/* Header Tabs */}
              <div className="flex items-center border-b border-slate-200 bg-slate-50/50 px-2 pt-2 overflow-x-auto custom-scrollbar">
                <button 
                  type="button"
                  onClick={() => setActiveTab('datos')}
                  className={`px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                    activeTab === 'datos' 
                      ? 'border-blue-600 text-blue-600 bg-white' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-t-xl'
                  }`}
                >
                  <BookOpen className="w-4 h-4" /> Datos de la Lista
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveTab('candidatos')}
                  className={`px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                    activeTab === 'candidatos' 
                      ? 'border-blue-600 text-blue-600 bg-white' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-t-xl'
                  }`}
                >
                  <Users className="w-4 h-4" /> Registro de Candidatos
                  {candidatos.length > 0 && (
                    <span className="bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full text-[10px] ml-1">{candidatos.length}</span>
                  )}
                </button>
              </div>
              
              <form onSubmit={handlePersoneroSubmit} className="p-6">
                
                {/* TAB 1: DATOS DE LA LISTA */}
                {activeTab === 'datos' && (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="space-y-1.5 md:col-span-8">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-blue-500" /> Nombre de la Agrupación Política
                        </label>
                        <input type="text" placeholder="Ej. Frente Académico Estudiantil" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                      </div>

                      <div className="space-y-1.5 md:col-span-4">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-blue-500" /> Siglas
                        </label>
                        <input type="text" placeholder="Ej. FAE" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                      </div>

                      <div className="space-y-1.5 md:col-span-12">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-blue-500" /> Órgano de Gobierno al que Postula
                        </label>
                        <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                          <option value="">Selecciona el órgano</option>
                          <option value="Asamblea Universitaria">Asamblea Universitaria</option>
                          <option value="Consejo Universitario">Consejo Universitario</option>
                          <option value="Consejo de Facultad">Consejo de Facultad</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <h3 className="text-sm font-bold text-slate-800 mb-4">Documentación Obligatoria de la Lista</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer group">
                          <input type="file" accept=".pdf" className="hidden" id="plan-gobierno" />
                          <label htmlFor="plan-gobierno" className="cursor-pointer flex flex-col items-center">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                              <UploadCloud className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-bold text-slate-700">Plan de Trabajo / Gobierno</span>
                            <span className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">Solo formato PDF</span>
                          </label>
                        </div>

                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer group">
                          <input type="file" accept="image/png, image/jpeg" className="hidden" id="logo-lista" />
                          <label htmlFor="logo-lista" className="cursor-pointer flex flex-col items-center">
                            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                              <ImageIcon className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-bold text-slate-700">Símbolo o Logotipo</span>
                            <span className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">JPG, PNG (Transparente)</span>
                          </label>
                        </div>

                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer group">
                          <input type="file" accept=".pdf" className="hidden" id="padron-firmas" />
                          <label htmlFor="padron-firmas" className="cursor-pointer flex flex-col items-center">
                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                              <FileText className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-bold text-slate-700">Padrón de Adherentes</span>
                            <span className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">Firmas escaneadas en PDF</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <button 
                        type="button" 
                        onClick={() => setActiveTab('candidatos')}
                        className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
                      >
                        Continuar a Candidatos <AlertCircle className="w-4 h-4 rotate-180" />
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2: REGISTRO DE CANDIDATOS */}
                {activeTab === 'candidatos' && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">Miembros de la Lista</h3>
                        <p className="text-xs text-slate-500 mt-1">Registra uno a uno a los candidatos que conforman tu plancha.</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setShowAddCandidato(true)}
                        className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm border border-blue-200"
                      >
                        <Plus className="w-4 h-4" /> Agregar Candidato
                      </button>
                    </div>

                    {/* Modal para Agregar Candidato */}
                    {showAddCandidato && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
                          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2"><Plus className="w-5 h-5 text-blue-600" /> Agregar Candidato</h3>
                            <button type="button" onClick={() => setShowAddCandidato(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><X className="w-5 h-5" /></button>
                          </div>
                          
                          <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                              <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                  <Fingerprint className="w-3.5 h-3.5 text-blue-500" /> Código / DNI
                                </label>
                                <input 
                                  type="text" 
                                  value={newCandidato.dni}
                                  onChange={(e) => setNewCandidato({...newCandidato, dni: e.target.value})}
                                  placeholder="Documento de identidad" 
                                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                />
                              </div>
                              
                              <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                  <User className="w-3.5 h-3.5 text-blue-500" /> Nombres Completos
                                </label>
                                <input 
                                  type="text" 
                                  value={newCandidato.nombres}
                                  onChange={(e) => setNewCandidato({...newCandidato, nombres: e.target.value})}
                                  placeholder="Nombres y apellidos" 
                                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                />
                              </div>

                              <div className="space-y-1.5 md:col-span-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                  <Award className="w-3.5 h-3.5 text-blue-500" /> Selección de Cargo
                                </label>
                                <select 
                                  value={newCandidato.cargo}
                                  onChange={(e) => setNewCandidato({...newCandidato, cargo: e.target.value})}
                                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="">Selecciona el cargo</option>
                                  <option value="Titular">Titular</option>
                                  <option value="Accesitario">Accesitario</option>
                                </select>
                              </div>
                              
                              <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                  <ImageIcon className="w-3.5 h-3.5 text-blue-500" /> Fotografía Oficial (JPG/PNG)
                                </label>
                                <input type="file" accept="image/png, image/jpeg" className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                  <FileText className="w-3.5 h-3.5 text-blue-500" /> Hoja de Vida/Constancia (PDF)
                                </label>
                                <input type="file" accept=".pdf" className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                              </div>
                            </div>
                            
                            <div className="flex justify-end pt-5 border-t border-slate-100 gap-3">
                              <button 
                                type="button" 
                                onClick={() => setShowAddCandidato(false)}
                                className="px-5 py-2 text-slate-500 font-bold text-sm hover:bg-slate-100 rounded-lg transition-colors"
                              >
                                Cancelar
                              </button>
                              <button 
                                type="button" 
                                onClick={addCandidato}
                                disabled={!newCandidato.dni || !newCandidato.nombres || !newCandidato.cargo}
                                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                              >
                                <Plus className="w-4 h-4" /> Guardar Candidato
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tabla de Candidatos Agregados */}
                    {candidatos.length > 0 ? (
                      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                              <th className="p-3">DNI / Código</th>
                              <th className="p-3">Nombres</th>
                              <th className="p-3">Cargo</th>
                              <th className="p-3 text-right">Acción</th>
                            </tr>
                          </thead>
                          <tbody className="text-sm text-slate-700 font-medium">
                            {candidatos.map((c) => (
                              <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                <td className="p-3">{c.dni}</td>
                                <td className="p-3">{c.nombres}</td>
                                <td className="p-3 text-blue-700 font-bold">{c.cargo}</td>
                                <td className="p-3 text-right">
                                  <button 
                                    type="button"
                                    onClick={() => removeCandidato(c.id)}
                                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                                    title="Eliminar candidato"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                        <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-sm font-bold text-slate-500">Aún no has agregado candidatos</p>
                        <p className="text-xs text-slate-400 mt-1">Usa el botón superior para registrar miembros.</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Botonera Principal (siempre visible al fondo) */}
                <div className="flex items-center justify-between pt-8 mt-4 border-t border-slate-200">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors">Cancelar Inscripción</button>
                  <button 
                    type="submit" 
                    disabled={candidatos.length === 0}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Presentar Expediente Final
                  </button>
                </div>
              </form>
            </div>
          )}

          {isSubmitted && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 p-6 rounded-2xl flex items-center gap-4 animate-in zoom-in-95 duration-300">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-bold text-green-800">Expediente Registrado Exitosamente</h3>
                  <p className="text-sm text-green-700">Tu plancha y candidatos están siendo revisados por el Comité Electoral.</p>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight mb-4">Mis Candidatos Inscritos</h2>
                <DataTable columns={personeroColumns} data={personeroCandidatosData} />
              </div>
            </div>
          )}
        </div>
      ) : (
        // VISTA ADMIN
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardStats title="Listas Inscritas" value="3" subtitle="Acreditadas por el CEU" trend="neutral" />
            <CardStats title="Candidatos Totales" value="12" subtitle="En las diversas listas" trend="up" />
            <CardStats title="Requisitos Validados" value="100%" subtitle="Sin observaciones" trend="up" />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Listas y Candidatos en Proceso</h2>
            <DataTable columns={adminColumns} data={tableData} />
          </div>

          <GestionarAccesosModal 
            isOpen={isAccesoModalOpen} 
            onClose={() => setIsAccesoModalOpen(false)} 
          />

          <ObservarModal
            isOpen={observarModalData.isOpen}
            listaNombre={observarModalData.listaNombre}
            onClose={() => {
              setObservarModalData(prev => ({ ...prev, isOpen: false }));
              if (observarModalData.listaId) {
                 setTableData(prev => prev.map(row => 
                   row.id === observarModalData.listaId ? { ...row, estado: 'Observado' } : row
                 ));
              }
            }}
          />
        </>
      )}
    </div>
  );
}

export default function ListasPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const role = typeof searchParams?.role === 'string' ? searchParams.role : undefined;

  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-slate-500">Cargando listas...</div>}>
      <ContenidoListas role={role} />
    </Suspense>
  );
}
