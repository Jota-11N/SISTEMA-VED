'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, ShieldCheck, KeyRound, Network } from 'lucide-react';

const backgrounds = [
  '/unajma_fondo.jpg',
  '/unajma_fondo2.jpg',
  '/unajma_fondo3.jpg',
  '/unajma_fondo4.jpg'
];

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  
  // Default states for Admin CEU
  const [role, setRole] = useState('admin');
  const [username, setUsername] = useState('admin@unajma.edu.pe');
  const [password, setPassword] = useState('admin123');

  // Background slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 4000); // changes every 4 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    switch (newRole) {
      case 'admin':
        setUsername('admin@unajma.edu.pe');
        setPassword('admin123');
        break;
      case 'elector':
        setUsername('202210432');
        setPassword('elector123');
        break;
      case 'personero':
        setUsername('personero@unajma.edu.pe');
        setPassword('personero123');
        break;
      case 'auditor':
        setUsername('auditor@unajma.edu.pe');
        setPassword('auditor123');
        break;
      default:
        setUsername('');
        setPassword('');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login redirect based on selected role
    switch (role) {
      case 'admin':
        router.push('/dashboard');
        break;
      case 'elector':
        router.push('/login/otp');
        break;
      case 'personero':
        router.push('/dashboard/personero');
        break;
      case 'auditor':
        router.push('/dashboard/auditoria');
        break;
      default:
        router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      
      {/* Background Images with Crossfade Slider Effect */}
      {backgrounds.map((bg, index) => (
        <Image
          key={bg}
          src={bg}
          alt="Fondo de la UNAJMA"
          fill
          priority={index === 0}
          className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
            index === bgIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        />
      ))}
      
      {/* CSS Overlay for tech texture and contrast */}
      <div className="absolute inset-0 bg-black/70 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] z-10 pointer-events-none"></div>

      {/* Main Login Form Container */}
      <div className="relative z-20 w-full max-w-xs mx-4">
          
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <Image 
            src="/unajma.png" 
            alt="Logo UNAJMA" 
            width={90} 
            height={90} 
            priority
            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-4 object-contain"
          />
          <h1 className="text-white text-3xl font-bold tracking-tight mb-2 drop-shadow-md">Sistema VED</h1>
          <p className="text-white/80 text-base font-medium">Bienvenido</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* User Field */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-white/80 uppercase tracking-wider ml-1 flex items-center gap-1.5" htmlFor="username">
              <KeyRound className="w-3.5 h-3.5 text-blue-400" /> Usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="ejemplo@unajma.edu.pe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all text-sm font-mono text-center"
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-white/80 uppercase tracking-wider ml-1 flex items-center gap-1.5" htmlFor="password">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all text-sm font-mono text-center"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-3.5 px-4 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all mt-8 border border-blue-400/50 flex justify-center items-center gap-2"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Development Mode Block */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="flex justify-between items-center mb-3 px-2">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Entorno DEV</span>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[9px] font-bold text-emerald-500 tracking-wider">ONLINE</span>
            </div>
          </div>
          <select
            id="role"
            value={role}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="w-full px-4 py-2.5 text-xs rounded-full bg-white/5 text-white/80 border border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors text-center"
          >
            <option value="admin" className="bg-slate-900">Administrador CEU</option>
            <option value="elector" className="bg-slate-900">Elector</option>
            <option value="personero" className="bg-slate-900">Personero</option>
            <option value="auditor" className="bg-slate-900">Auditor</option>
          </select>
        </div>

      </div>
    </div>
  );
}
