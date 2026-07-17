'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, FileText, Download, Search, MapPin, Mail, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import SolicitudAccesoModal from '../src/components/public/SolicitudAccesoModal';

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchCode, setSearchCode] = useState('');
  const [searchResult, setSearchResult] = useState<{ status: string, name?: string, table?: string } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    // Simulate search logic
    if (searchCode === '202210432') {
      setSearchResult({
        status: 'habilitado',
        name: 'JOTA T.',
        table: 'Mesa N° 04 - Pabellón A (Piso 1)'
      });
    } else if (searchCode === '12345678') {
      setSearchResult({
        status: 'no_habilitado'
      });
    } else {
      setSearchResult({
        status: 'habilitado',
        name: 'ESTUDIANTE REGULAR',
        table: 'Mesa N° 12 - Pabellón C (Piso 2)'
      });
    }
  };

  const timelineSteps = [
    { title: 'Convocatoria', date: '01 Oct 2026', status: 'completed' },
    { title: 'Inscripción de Listas', date: '10-15 Oct 2026', status: 'current' },
    { title: 'Periodo de Tachas', date: '18-20 Oct 2026', status: 'upcoming' },
    { title: 'Listas Aptas', date: '25 Oct 2026', status: 'upcoming' },
    { title: 'Sufragio', date: '15 Nov 2026', status: 'upcoming' },
    { title: 'Proclamación', date: '20 Nov 2026', status: 'upcoming' },
  ];

  const documents = [
    { title: 'Reglamento Electoral', size: '2.4 MB', type: 'PDF' },
    { title: 'Estatuto Universitario', size: '5.1 MB', type: 'PDF' },
    { title: 'Formatos de Inscripción', size: '1.2 MB', type: 'DOCX' },
    { title: 'Resolución de Convocatoria', size: '800 KB', type: 'PDF' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Navigation Bar */}
      <nav className="bg-[#002f6c] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-lg shadow-sm">
                <Image src="/unajma.png" alt="UNAJMA Logo" width={40} height={40} className="object-contain" />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight tracking-tight">Comité Electoral</h1>
                <p className="text-[10px] text-blue-200 uppercase tracking-widest font-medium">UNAJMA</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a href="#cronograma" className="text-white/80 hover:text-white transition-colors">Cronograma</a>
              <a href="#documentos" className="text-white/80 hover:text-white transition-colors">Documentos</a>
              <a href="#padron" className="text-white/80 hover:text-white transition-colors">Padrón Electoral</a>
              <Link 
                href="/login" 
                className="bg-yellow-500 hover:bg-yellow-400 text-[#002f6c] px-5 py-2.5 rounded-full font-bold shadow-lg shadow-yellow-500/20 transition-all ml-2"
              >
                Ingresar al Sistema
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-[#002f6c] overflow-hidden border-b-[6px] border-yellow-500">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-800/50 border border-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6">
              Elecciones Universitarias 2026
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Procesos Electorales Transparentes y Democráticos
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl font-light">
              Portal oficial de información ciudadana del Comité Electoral Universitario de la Universidad Nacional José María Arguedas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/login" 
                className="bg-yellow-500 hover:bg-yellow-400 text-[#002f6c] px-8 py-4 rounded-xl font-black shadow-xl shadow-yellow-500/20 transition-all flex items-center justify-center gap-2 text-center"
              >
                Ingresar al Sistema Electoral <ChevronRight className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#003d8f] hover:bg-[#004aab] border border-blue-500/30 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-center"
              >
                Solicitar Acceso como Personero
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Timeline Section */}
        <section id="cronograma" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-black text-slate-800">Cronograma Electoral</h3>
          </div>
          
          <div className="relative">
            {/* Desktop Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2"></div>
            
            <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-0 relative z-10">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="flex flex-row md:flex-col items-center gap-4 md:gap-3 flex-1">
                  
                  {/* Status Indicator */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-slate-50 transition-colors z-10 shadow-sm ${
                    step.status === 'completed' ? 'bg-green-500 text-white' : 
                    step.status === 'current' ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 
                    'bg-slate-200 text-slate-400'
                  }`}>
                    {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2.5 h-2.5 rounded-full bg-current"></div>}
                  </div>
                  
                  {/* Step Info */}
                  <div className="md:text-center">
                    <h4 className={`text-sm font-bold ${
                      step.status === 'current' ? 'text-blue-700' : 'text-slate-700'
                    }`}>{step.title}</h4>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{step.date}</p>
                    {step.status === 'current' && (
                      <span className="inline-block mt-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded-md">
                        Etapa Actual
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Document Downloads */}
          <section id="documentos" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-black text-slate-800">Documentos Oficiales</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documents.map((doc, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug mb-1 group-hover:text-blue-700 transition-colors">{doc.title}</h4>
                    <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                      <span className="uppercase">{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </a>
              ))}
            </div>
          </section>

          {/* Voter Search */}
          <section id="padron" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-black text-slate-800">Consulta de Padrón</h3>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-slate-600 mb-6">
                Verifica si te encuentras habilitado para votar ingresando tu código universitario o DNI.
              </p>
              
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Ingrese su código o DNI"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  required
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" /> Consultar
                </button>
              </form>

              {/* Search Results */}
              {searchResult && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {searchResult.status === 'habilitado' ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-green-800 font-bold text-base mb-1">Habilitado para votar</h4>
                        <p className="text-sm text-green-700 font-medium mb-3">Estimado(a) {searchResult.name}, te encuentras en el padrón electoral oficial.</p>
                        <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg border border-green-100">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-bold text-green-800">{searchResult.table}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 shrink-0">
                        <AlertCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-red-800 font-bold text-base mb-1">No habilitado</h4>
                        <p className="text-sm text-red-700 font-medium">El código ingresado no se encuentra registrado en el padrón electoral actual. Si crees que es un error, contáctate con el comité.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 mt-12 border-t-4 border-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/10 p-1.5 rounded-lg">
                  <Image src="/unajma.png" alt="UNAJMA Logo" width={32} height={32} className="opacity-80" />
                </div>
                <h4 className="text-white font-bold text-lg">Comité Electoral</h4>
              </div>
              <p className="text-sm text-slate-400 mb-6 max-w-xs">
                Órgano autónomo encargado de organizar, conducir y controlar los procesos electorales en la Universidad Nacional José María Arguedas.
              </p>
            </div>
            
            <div className="col-span-1">
              <h5 className="text-white font-bold mb-6 tracking-wider text-sm uppercase">Enlaces Rápidos</h5>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-yellow-500 transition-colors">Portal Institucional UNAJMA</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors">Transparencia Universitaria</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors">Reglamento General</a></li>
                <li><Link href="/login" className="hover:text-blue-400 transition-colors font-medium">Acceso Administrativo</Link></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h5 className="text-white font-bold mb-6 tracking-wider text-sm uppercase">Canales de Atención</h5>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-slate-500 shrink-0" />
                  <span>comiteelectoral@unajma.edu.pe</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-500 shrink-0" />
                  <span>Sede Central UNAJMA<br/>Av. Manco Cápac s/n - Andahuaylas</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Comité Electoral Universitario - UNAJMA. Todos los derechos reservados.</p>
            <p>Diseñado y desarrollado para el Sistema VED</p>
          </div>
        </div>
      </footer>

      {/* Access Modal */}
      <SolicitudAccesoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}
