import React from 'react';
import Link from 'next/link';

export default function VotacionPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg border border-slate-100 p-8 text-center space-y-6">
        
        <div className="mx-auto h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>

        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Módulo de Votación</h1>
        <p className="text-slate-500 font-medium max-w-lg mx-auto">
          Bienvenido elector. Esta es la cabina de votación electrónica. 
          Aquí podrás emitir tu voto de forma secreta, segura y respaldada por blockchain.
        </p>

        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-blue-800 font-semibold max-w-md mx-auto">
          <p>Datos simulados: Elector validado exitosamente.</p>
        </div>

        <div className="pt-8">
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 shadow-sm text-sm font-bold rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-colors">
            Cerrar Sesión (Simulado)
          </Link>
        </div>
      </div>
    </div>
  );
}
