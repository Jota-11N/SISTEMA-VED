'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Timer, RefreshCw, AlertCircle } from 'lucide-react';

export default function OTPVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos
  const [isExpired, setIsExpired] = useState(false);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Efecto para el temporizador
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      setIsExpired(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir solo números
    if (!/^\d*$/.test(value)) return;

    setError(false); // Limpiar error al escribir
    const newOtp = [...otp];
    // Tomar solo el último carácter por si pegan más de uno
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus al siguiente input si hay un valor
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Limpiar error
    setError(false);
    // Auto-focus al anterior si se presiona Backspace en un input vacío
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError(false);
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
    
    if (pastedData.length === 0) return;
    
    const newOtp = [...otp];
    pastedData.forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    
    // Enfocar el input correspondiente después de pegar
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = () => {
    setOtp(Array(6).fill(''));
    setTimeLeft(300);
    setIsExpired(false);
    setError(false);
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = () => {
    const code = otp.join('');
    if (code.length === 6) {
      // Validar código DEV (123456)
      if (code === '123456') {
        router.push('/votacion');
      } else {
        setError(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans relative">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10 space-y-8 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Encabezado */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-tight">
            Verificación de Identidad (2FA)
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed px-2">
            Hemos enviado un código de seguridad de 6 dígitos a tu correo institucional. Introdúcelo para continuar.
          </p>
        </div>

        {/* Inputs del OTP */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={isExpired}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border-2 transition-all outline-none 
                  ${isExpired 
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
                    : error 
                      ? 'bg-red-50 border-red-400 text-red-600 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                      : 'bg-slate-100 border-transparent text-slate-800 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:bg-slate-200/50 focus:hover:bg-white'
                  }`}
              />
            ))}
          </div>
          {error && (
            <div className="flex items-center gap-1.5 text-red-500 text-sm font-bold animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4" />
              Código incorrecto, inténtalo de nuevo.
            </div>
          )}
        </div>

        {/* Temporizador y Reenvío */}
        <div className="flex flex-col items-center gap-4">
          <div className={`flex items-center gap-2 font-mono text-sm font-bold px-4 py-2 rounded-full transition-colors ${isExpired ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
            <Timer className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>

          {isExpired && (
            <button 
              onClick={handleResend}
              className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2 transition-all hover:underline"
            >
              <RefreshCw className="w-4 h-4" />
              Reenviar Código OTP
            </button>
          )}
        </div>

        {/* Botón Principal */}
        <button
          onClick={handleSubmit}
          disabled={otp.some(d => d === '') || isExpired}
          className={`w-full py-4 rounded-xl font-bold text-[15px] transition-all flex justify-center items-center gap-2
            ${(otp.some(d => d === '') || isExpired)
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 active:scale-[0.98]'
            }`}
        >
          Verificar e Ingresar a Votar
        </button>

        {/* DEV HINT */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-800 rounded-full text-xs font-bold border border-yellow-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            ENTORNO DEV: Usa el código 123456
          </span>
        </div>
      </div>
    </div>
  );
}
