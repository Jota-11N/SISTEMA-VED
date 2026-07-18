'use client';

import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, Clock, Database, Link as LinkIcon, FileText, Lock, Mail, LogOut, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';

export default function CentroVerificacion() {
  // Autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authInput, setAuthInput] = useState('auditor@unajma.edu.pe');
  const [authError, setAuthError] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // Verificación
  const [searchQuery, setSearchQuery] = useState('VED-2026-A1B2-C3D4');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isDark, setIsDark] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const mockTransactions = [
    { id: '0x3f2a89b...8b9c1d2e', type: '🗳️ Emisión de Voto', block: 4893, time: '14:32:05.123' },
    { id: '0x1a8b3c4...3c4d5e6f', type: '🔑 Firma CVE', block: 4893, time: '14:32:04.981' },
    { id: '0x9c2d7f1...7f1a8b9c', type: '👥 Validaciones OTP', block: 4892, time: '14:31:50.002' },
    { id: '0x4b6e2d9...2d9f3a4b', type: '🗳️ Emisión de Voto', block: 4891, time: '14:31:12.873' },
    { id: '0x7d1f5a3...5a3c6d7e', type: '🛠️ Configuración de Mesa', block: 4890, time: '14:30:05.550' },
  ];

  const filteredTransactions = activeFilter === 'Todos' 
    ? mockTransactions 
    : mockTransactions.filter(tx => tx.type === activeFilter);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authInput.trim()) return;
    
    // Validación de correo institucional
    if (!authInput.endsWith('@unajma.edu.pe')) {
      setAuthError('Debe ingresar un correo institucional válido (@unajma.edu.pe)');
      return;
    }
    
    setAuthError('');
    setUserEmail(authInput);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setAuthInput('auditor@unajma.edu.pe');
    setResult(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setResult(null);

    // Simulando consulta al backend y blockchain
    setTimeout(() => {
      setIsSearching(false);
      setResult({
        cve: searchQuery.startsWith('VED-') ? searchQuery : 'VED-2026-A1B2-C3D4',
        txId: searchQuery.startsWith('0x') ? searchQuery : '0x132df092fca770c9d6427010b11e0b77917981351e37574d89083dbe61e36a2',
        status: 'Confirmado',
        blockNumber: 4892,
        timestamp: new Date().toISOString(),
        node: 'peer0.org1.unajma.edu.pe',
        channel: 'elecciones-channel',
        chaincode: 'ved_smart_contract_v1'
      });
    }, 1500);
  };

  // --- Vista de Autenticación Requerida ---
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen font-sans flex items-center justify-center p-4 transition-colors duration-500 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
        <div className="absolute top-6 right-6">
          <button onClick={() => setIsDark(!isDark)} className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-600 hover:bg-slate-100'}`}>
            {isDark ? 'Modo Claro ☀️' : 'Modo Oscuro 🌙'}
          </button>
        </div>

        <div className={`w-full max-w-md p-8 rounded-3xl border shadow-xl animate-in zoom-in-95 duration-500 ${isDark ? 'bg-slate-900 border-slate-800 shadow-black/50' : 'bg-white border-slate-200 shadow-slate-200/50'}`}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-700 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto shadow-md mb-6 transform -rotate-3">
              U
            </div>
            <h1 className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>Acceso Restringido</h1>
            <p className={`text-sm mt-2 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              El Centro de Verificación Electoral es público, pero requiere autenticación institucional para prevenir ataques automatizados.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <Mail className="w-3.5 h-3.5 text-red-600" /> Correo Institucional
              </label>
              <input
                type="email"
                value={authInput}
                onChange={(e) => setAuthInput(e.target.value)}
                placeholder="usuario@unajma.edu.pe"
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all font-medium ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                }`}
                required
              />
              {authError && <p className="text-xs font-bold text-red-500 mt-1 animate-pulse">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-red-700/30 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" /> Autenticar y Entrar
            </button>
            
            <div className="text-center mt-6">
              <Link href="/login" className={`text-xs font-bold hover:underline ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}>
                Volver a la página principal
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- Vista Principal del Explorador (Layout Solscan/Etherscan) ---
  return (
    <div className={`min-h-screen font-sans pb-20 transition-colors duration-500 ${isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      {/* Navbar Superior Institucional */}
      <nav className={`border-b sticky top-0 z-50 ${isDark ? 'bg-slate-900/90 border-slate-800 backdrop-blur-md' : 'bg-white/90 border-slate-200 backdrop-blur-md'}`}>
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-700 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-sm">U</div>
            <div>
              <h1 className={`font-bold text-sm leading-none ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Comité Electoral UNAJMA</h1>
              <p className={`text-[10px] uppercase tracking-widest mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Sistema VED</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-600 hover:bg-slate-100'}`}
            >
              {isDark ? 'Modo Claro ☀️' : 'Modo Oscuro 🌙'}
            </button>
            <div className={`flex items-center gap-3 pl-6 border-l ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className="text-right hidden sm:block">
                <p className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Auditor / Público</p>
                <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{userEmail}</p>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                <User className="w-4 h-4" />
              </div>
              <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-colors ml-2" title="Cerrar Sesión">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Encabezado Principal (Título y Buscador Compacto) */}
      <header className={`border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100/50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-auto text-center md:text-left">
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight flex items-center justify-center md:justify-start gap-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Centro de Verificación Blockchain
              {result && (
                <span className="hidden sm:flex bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[10px] font-bold items-center gap-1 shadow-sm mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Auténtico
                </span>
              )}
            </h2>
            <p className={`text-sm font-medium mt-2 max-w-xl ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Consulte la integridad y autenticidad de una transacción registrada en Hyperledger Fabric.
            </p>
          </div>
          
          <div className="w-full md:w-[380px] shrink-0">
            <form onSubmit={handleSearch} className="relative group w-full">
              <input
                type="text"
                className={`block w-full pl-4 pr-12 py-3 rounded-xl border focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-mono text-sm shadow-sm ${
                  isDark ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
                }`}
                placeholder="Buscar por CVE o TxID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className={`absolute right-1 top-1 bottom-1 px-3 rounded-lg flex items-center justify-center transition-colors ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {isSearching ? <span className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin"></span> : <Search className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8">
        
        {/* COLUMNA ÚNICA (FULL WIDTH) */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            
          {result ? (
            /* RESULTADO DE BÚSQUEDA (TIMELINE CENTRADO) */
            <div className={`p-8 sm:p-12 rounded-3xl border shadow-sm ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              
              <div className="text-center mb-16">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Resultado de Auditoría / Hash Verificado</p>
                <h3 className={`text-xl sm:text-2xl font-black font-mono break-all inline-block px-6 py-3 rounded-xl border ${isDark ? 'bg-slate-950 text-blue-400 border-slate-800' : 'bg-slate-50 text-blue-600 border-slate-200'}`}>
                  {result.cve}
                </h3>
              </div>

              {/* Timeline Centrado Vertical (Zig-Zag) */}
              <div className="relative wrap overflow-hidden p-4">
                {/* Línea Central */}
                <div className={`absolute border-opacity-20 h-full border-l-2 left-1/2 -ml-[1px] ${isDark ? 'border-slate-700' : 'border-slate-200'}`}></div>

                {/* Event 1 (Izquierda) */}
                <div className="mb-12 flex justify-between items-center w-full right-timeline">
                  <div className="order-1 w-5/12 hidden md:block"></div>
                  <div className={`z-20 flex items-center justify-center order-1 w-12 h-12 rounded-full border-4 shadow-sm shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 ${isDark ? 'border-slate-900 bg-blue-900/50 text-blue-400' : 'border-white bg-blue-100 text-blue-600'}`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className={`order-1 w-full md:w-5/12 p-6 rounded-2xl border shadow-sm ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-bold text-base ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Voto Emitido</span>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${isDark ? 'text-slate-400 bg-slate-800 border-slate-700' : 'text-slate-500 bg-white border-slate-200'}`}>{new Date(result.timestamp).toLocaleTimeString('es-PE')}</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">Recepción criptográfica inicial en el servidor VED.</p>
                  </div>
                </div>

                {/* Event 2 (Derecha) */}
                <div className="mb-12 flex justify-between md:flex-row-reverse items-center w-full left-timeline">
                  <div className="order-1 w-5/12 hidden md:block"></div>
                  <div className={`z-20 flex items-center justify-center order-1 w-12 h-12 rounded-full border-4 shadow-sm shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 ${isDark ? 'border-slate-900 bg-purple-900/50 text-purple-400' : 'border-white bg-purple-100 text-purple-600'}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className={`order-1 w-full md:w-5/12 p-6 rounded-2xl border shadow-sm ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`font-bold text-base ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Smart Contract Ejecutado</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-slate-500 flex items-center justify-between">Canal: <span className={`font-mono text-xs px-2 py-0.5 border rounded ${isDark ? 'text-slate-300 bg-slate-800 border-slate-700' : 'text-slate-700 bg-white border-slate-200'}`}>{result.channel}</span></p>
                      <p className="text-sm text-slate-500 flex items-center justify-between">Contrato: <span className={`font-mono text-xs px-2 py-0.5 border rounded ${isDark ? 'text-slate-300 bg-slate-800 border-slate-700' : 'text-slate-700 bg-white border-slate-200'}`}>{result.chaincode}</span></p>
                    </div>
                  </div>
                </div>

                {/* Event 3 (Izquierda) */}
                <div className="mb-12 flex justify-between items-center w-full right-timeline">
                  <div className="order-1 w-5/12 hidden md:block"></div>
                  <div className={`z-20 flex items-center justify-center order-1 w-12 h-12 rounded-full border-4 shadow-sm shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 ${isDark ? 'border-slate-900 bg-emerald-900/50 text-emerald-400' : 'border-white bg-emerald-100 text-emerald-600'}`}>
                    <Database className="w-5 h-5" />
                  </div>
                  <div className={`order-1 w-full md:w-5/12 p-6 rounded-2xl border shadow-sm ${isDark ? 'bg-emerald-900/20 border-emerald-900/30' : 'bg-emerald-50 border-emerald-100'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`font-bold text-base ${isDark ? 'text-emerald-400' : 'text-emerald-900'}`}>Bloque Confirmado</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold uppercase ${isDark ? 'text-emerald-600' : 'text-emerald-600'}`}>Nodo Validador</span>
                        <span className={`text-xs font-mono bg-white/50 px-2 py-1 rounded ${isDark ? 'text-emerald-300 bg-emerald-900/50' : 'text-emerald-800'}`}>{result.node}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold uppercase ${isDark ? 'text-emerald-600' : 'text-emerald-600'}`}>Número de Bloque</span>
                        <span className={`text-xs font-mono font-bold bg-white/50 px-2 py-1 rounded ${isDark ? 'text-emerald-300 bg-emerald-900/50' : 'text-emerald-800'}`}>#{result.blockNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event 4 (Derecha) */}
                <div className="flex justify-between md:flex-row-reverse items-center w-full left-timeline">
                  <div className="order-1 w-5/12 hidden md:block"></div>
                  <div className={`z-20 flex items-center justify-center order-1 w-12 h-12 rounded-full border-4 shadow-sm shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 ${isDark ? 'border-slate-900 bg-slate-800 text-slate-300' : 'border-white bg-slate-100 text-slate-600'}`}>
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <div className={`order-1 w-full md:w-5/12 p-6 rounded-2xl border shadow-sm ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <span className="block text-xs font-bold text-slate-400 uppercase mb-3">Transaction ID Público</span>
                    <span className={`text-xs font-mono p-4 block border rounded-xl break-all select-all ${isDark ? 'bg-slate-950 text-slate-300 border-slate-800' : 'bg-slate-50 text-slate-700 border-slate-100'}`}>
                      {result.txId}
                    </span>
                  </div>
                </div>

              </div>
              
              <div className={`mt-16 p-6 border rounded-2xl max-w-3xl mx-auto ${isDark ? 'bg-blue-950/30 border-blue-900/50' : 'bg-blue-50 border-blue-100'}`}>
                <p className={`text-sm font-medium text-center leading-relaxed ${isDark ? 'text-blue-400' : 'text-blue-800'}`}>
                  <strong>Garantía de Privacidad:</strong> La red Blockchain registra la existencia y validez de la transacción, pero su contenido (el voto) permanece criptográficamente sellado de punto a punto.
                </p>
              </div>

            </div>
          ) : (
            /* DASHBOARD EN VIVO (FULL WIDTH) */
            <div className="space-y-8">
              
              {/* KPIs (Grid de 4 ocupando todo el ancho) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`p-6 rounded-3xl shadow-sm border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <p className={`text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Votos Emitidos</p>
                  <p className={`text-4xl font-black mt-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>14,892</p>
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-5 overflow-hidden"><div className="bg-blue-600 h-2 rounded-full w-[80.5%]"></div></div>
                  <p className="text-[10px] text-slate-500 mt-2 font-medium">80.5% del padrón electoral</p>
                </div>

                <div className={`p-6 rounded-3xl shadow-sm border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <p className={`text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Estado Consenso</p>
                  <p className={`text-3xl font-black mt-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>100% Sync</p>
                  <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Red En Vivo
                  </div>
                </div>

                <div className={`p-6 rounded-3xl shadow-sm border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <p className={`text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Infraestructura</p>
                  <p className={`text-3xl font-black mt-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>12 / 12 Peers</p>
                  <p className="text-xs text-slate-400 mt-4 font-medium leading-relaxed">
                    Nodos activos en 4 sedes de la universidad.
                  </p>
                </div>

                <div className={`p-6 rounded-3xl shadow-sm border flex flex-col justify-between ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div>
                    <p className={`text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Carga de Red</p>
                    <p className={`text-3xl font-black mt-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>45.2 Tx/s</p>
                  </div>
                  <div className="flex items-end gap-1.5 h-10 mt-4">
                    {[30, 45, 25, 60, 40, 70, 50, 45, 80, 45, 55, 30].map((h, i) => (
                      <div key={i} className={`w-full rounded-t-sm ${isDark ? 'bg-blue-500/50' : 'bg-blue-300'}`} style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filtros Modernos */}
              <div className={`p-2.5 rounded-2xl flex gap-2 overflow-x-auto custom-scrollbar border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                {['Todos', '🗳️ Emisión de Voto', '🔑 Firma CVE', '👥 Validaciones OTP', '🛠️ Configuración de Mesa'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-5 py-2.5 text-sm font-bold whitespace-nowrap rounded-xl transition-all ${
                      activeFilter === filter
                        ? 'bg-blue-600 text-white shadow-md'
                        : `hover:bg-slate-100 ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600'}`
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Gran Tabla Central */}
              <div className={`rounded-3xl border shadow-sm overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className={`border-b text-xs uppercase tracking-widest ${isDark ? 'border-slate-800 bg-slate-950/50 text-slate-400' : 'border-slate-100 bg-slate-50 text-slate-500'}`}>
                        <th className="p-6 font-bold whitespace-nowrap">Transaction ID / Hash</th>
                        <th className="p-6 font-bold whitespace-nowrap">Tipo de Registro</th>
                        <th className="p-6 font-bold whitespace-nowrap">Bloque N°</th>
                        <th className="p-6 font-bold whitespace-nowrap">Marca de Tiempo</th>
                        <th className="p-6 font-bold whitespace-nowrap">Integridad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((tx, idx) => (
                        <React.Fragment key={idx}>
                          <tr 
                            onClick={() => setExpandedRow(expandedRow === idx ? null : idx)}
                            className={`border-b last:border-0 cursor-pointer transition-colors ${isDark ? 'border-slate-800/50 hover:bg-slate-800/80' : 'border-slate-50 hover:bg-slate-100'} ${expandedRow === idx ? (isDark ? 'bg-slate-800/80' : 'bg-blue-50/50') : ''}`}
                          >
                            <td className="p-6">
                              <div className="flex items-center gap-3">
                                <span className={`font-mono text-sm font-bold truncate max-w-[140px] lg:max-w-[220px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{tx.id}</span>
                                <button className={`text-slate-400 hover:text-blue-500`} title="Copiar Hash">
                                  <FileText className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                            <td className="p-6">
                              <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider whitespace-nowrap border ${
                                tx.type.includes('Voto') ? (isDark ? 'bg-emerald-900/30 text-emerald-400 border-emerald-900/50' : 'bg-emerald-50 text-emerald-700 border-emerald-200') :
                                tx.type.includes('CVE') ? (isDark ? 'bg-purple-900/30 text-purple-400 border-purple-900/50' : 'bg-purple-50 text-purple-700 border-purple-200') :
                                tx.type.includes('OTP') ? (isDark ? 'bg-amber-900/30 text-amber-400 border-amber-900/50' : 'bg-amber-50 text-amber-700 border-amber-200') :
                                (isDark ? 'bg-blue-900/30 text-blue-400 border-blue-900/50' : 'bg-blue-50 text-blue-700 border-blue-200')
                              }`}>
                                {tx.type}
                              </span>
                            </td>
                            <td className="p-6">
                              <span className="text-sm font-bold text-blue-600 hover:underline cursor-pointer">#{tx.block}</span>
                            </td>
                            <td className="p-6">
                              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 whitespace-nowrap">
                                <Clock className="w-4 h-4" /> {tx.time}
                              </div>
                            </td>
                            <td className="p-6">
                              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 whitespace-nowrap bg-emerald-500/10 px-2.5 py-1.5 rounded-lg">
                                <CheckCircle2 className="w-4 h-4" /> Verificado
                              </span>
                            </td>
                          </tr>
                          {expandedRow === idx && (
                            <tr className={`${isDark ? 'bg-slate-950/50' : 'bg-slate-50'} animate-in fade-in slide-in-from-top-2 duration-300`}>
                              <td colSpan={5} className="p-8 border-b border-slate-200">
                                <div className="space-y-4 max-w-full overflow-hidden">
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Metadata Técnica (Payload Cifrado)</p>
                                    <p className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-lg uppercase">Formato JSON</p>
                                  </div>
                                  <pre className={`p-6 rounded-2xl text-xs font-mono overflow-x-auto shadow-inner ${isDark ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-slate-800 text-slate-200'}`}>
{JSON.stringify({
  "channel_id": "elecciones-channel",
  "creator": {
    "mspid": "Org1MSP",
    "id": "x509::CN=peer0.org1.unajma.edu.pe,OU=peer,O=UNAJMA..."
  },
  "payload": {
    "chaincode_spec": {
      "type": "GOLANG",
      "chaincode_id": {
        "name": "ved_smart_contract_v1"
      },
      "input": {
        "args": [
          "RecordTransaction",
          "******ENCRYPTED_PAYLOAD_SHA256******"
        ]
      }
    }
  },
  "signature": "30440220...a8c40220...d9b2"
}, null, 2)}
                                  </pre>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}
