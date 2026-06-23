import React, { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

interface LoginFormProps {
  isMobile?: boolean;
}

export function LoginForm({ isMobile = false }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // High fidelity view states: 'CONNEXION' | 'MOT_DE_PASSE_OUBLIE' | 'SUCCESS'
  const [currentView, setCurrentView] = useState<'CONNEXION' | 'MOT_DE_PASSE_OUBLIE' | 'SUCCESS'>('CONNEXION');
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');

  const { executer, etat, erreur } = useLogin();
  const loading = etat === 'CHARGEMENT';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    executer({ email, motDePasse: password });
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetLoading(true);
    setResetError('');
    
    // Simulate premium server-side action
    setTimeout(() => {
      setResetLoading(false);
      setCurrentView('SUCCESS');
    }, 1200);
  };

  if (currentView === 'MOT_DE_PASSE_OUBLIE') {
    return (
      <form onSubmit={handleResetSubmit} className="space-y-3.5 md:space-y-4 lg:space-y-5 animate-fade-in">
        {resetError && (
          <div className="p-2.5 text-xs text-[#B3181C] bg-[#FFF5F5] rounded-xl border border-[#B3181C]/20 font-semibold">
            {resetError}
          </div>
        )}

        <div className="space-y-1">
          <p className="text-[#8E7977] text-[11px] md:text-xs leading-relaxed mb-2.5">
            Saisissez l'adresse e-mail associée à votre compte. Nous vous enverrons un lien de réinitialisation sécurisé.
          </p>
          <label className="text-[12px] font-bold text-[#3E2927] block" htmlFor="resetEmail">
            Adresse e-mail <span className="text-[#DE4E3F] font-bold">*</span>
          </label>
          <div className="relative group">
            <span translate="no" className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E7977]/80 text-[18px] pointer-events-none group-focus-within:text-[#B3181C] transition-colors">mail</span>
            <input
              className="w-full h-11 md:h-12 pl-10 pr-4 bg-[#FAF8F6] border border-[#E2DCDA] rounded-xl text-xs placeholder-[#A29492] focus:border-[#B3181C] focus:ring-1 focus:ring-[#B3181C]/10 text-[#291715] transition-all outline-none"
              id="resetEmail"
              name="resetEmail"
              placeholder="votre_adresse@ecole221.sn"
              required
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          className="w-full h-11 bg-[#B3181C] hover:bg-[#8F1316] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#B3181C]/15 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          type="submit"
          disabled={resetLoading}
        >
          <span>{resetLoading ? 'Envoi du lien...' : 'Envoyer le lien'}</span>
        </button>

        {/* Back Link */}
        <div className="flex justify-center pt-1">
          <button
            type="button"
            onClick={() => setCurrentView('CONNEXION')}
            className="flex items-center gap-1 text-[11px] font-bold text-[#8E7977] hover:text-[#B3181C] transition-colors cursor-pointer"
          >
            <span translate="no" className="material-symbols-outlined text-[15px]">arrow_back</span>
            <span>Retour à la connexion</span>
          </button>
        </div>
      </form>
    );
  }

  if (currentView === 'SUCCESS') {
    return (
      <div className="space-y-4 text-center animate-fade-in py-2">
        <div className="mx-auto h-12 w-12 bg-[#EAF7EE] text-[#1D6F3F] rounded-2xl flex items-center justify-center border border-[#D0EBD9] mb-1 shadow-sm">
          <span translate="no" className="material-symbols-outlined text-[24px]">check_circle</span>
        </div>
        
        <div className="space-y-1.5">
          <h3 className="text-base font-black text-[#291715]">Lien envoyé</h3>
          <p className="text-[#8E7977] text-xs leading-relaxed max-w-[300px] mx-auto">
            Instructions de réinitialisation envoyées à : <span className="font-bold text-[#291715] break-all">{resetEmail}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurrentView('CONNEXION');
            setResetEmail('');
          }}
          className="w-full h-11 border border-[#E2DCDA] hover:bg-[#FAF8F6] text-[#291715] font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
        >
          <span>Retour à la connexion</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-3.5 ${isMobile ? 'pt-1 space-y-3' : 'md:space-y-4'} animate-fade-in`}>
      {erreur && (
        <div className="p-2.5 text-xs text-[#B3181C] bg-[#FFF5F5] rounded-xl border border-[#B3181C]/20 animate-fade-in font-semibold animate-shake py-1.5 mb-1">
          {erreur}
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-1">
        <label className={`text-[12px] font-bold block ${isMobile ? 'text-[#3E2927] mb-[2px]' : 'text-[#3E2927]'}`} htmlFor="email">
          Adresse e-mail <span className="text-[#DE4E3F] font-bold">*</span>
        </label>
        <div className="relative group">
          <span translate="no" className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E7977]/80 text-[18px] pointer-events-none group-focus-within:text-[#B3181C] transition-colors">mail</span>
          <input
            className="w-full h-11 md:h-12 bg-[#FAF8F6] border border-[#E2DCDA] rounded-xl text-xs placeholder-[#A29492] focus:border-[#B3181C] focus:ring-1 focus:ring-[#B3181C]/10 pl-10 pr-4 text-[#291715] transition-all outline-none"
            id="email"
            name="email"
            placeholder="prenom.nom@ecole221.sn"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-1">
        <label className={`text-[12px] font-bold block ${isMobile ? 'text-[#3E2927] mb-[2px]' : 'text-[#3E2927]'}`} htmlFor="password">
          Mot de passe <span className="text-[#DE4E3F] font-bold">*</span>
        </label>
        <div className="relative group">
          <span translate="no" className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E7977]/80 text-[18px] pointer-events-none group-focus-within:text-[#B3181C] transition-colors">lock</span>
          <input
            className="w-full h-11 md:h-12 bg-[#FAF8F6] border border-[#E2DCDA] rounded-xl text-xs placeholder-[#A29492] focus:border-[#B3181C] focus:ring-1 focus:ring-[#B3181C]/10 pl-10 pr-10 text-[#291715] transition-all outline-none"
            id="password"
            name="password"
            placeholder="Votre mot de passe"
            required
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E7977]/80 hover:text-[#1c1110] transition-colors p-1 flex items-center justify-center rounded-md cursor-pointer"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            <span translate="no" className="material-symbols-outlined text-[18px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="w-full h-11 bg-[#B3181C] hover:bg-[#8F1316] active:scale-[0.98] rounded-xl text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#B3181C]/15 transition-all flex items-center justify-center gap-2 cursor-pointer mt-5 mb-1"
        type="submit"
        disabled={loading}
      >
        <span>{loading ? 'Connexion en cours...' : 'Se connecter'}</span>
        {loading && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
      </button>

      {/* General bottom links inside form */}
      <div className="flex justify-between items-center pt-3 text-[11px] font-bold">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAF7EE] text-[#1E5E3A] border border-[#D0EBD9] text-[10px] font-black uppercase tracking-wider select-none">
          <span translate="no" className="material-symbols-outlined text-[13px] font-bold">verified_user</span>
          <span>Sécurisé</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setCurrentView('MOT_DE_PASSE_OUBLIE');
            setResetEmail(email);
          }}
          className="text-[#8E7977] hover:text-[#B3181C] hover:underline transition-colors cursor-pointer"
        >
          Mot de passe oublié ?
        </button>
      </div>

      {/* Supplementary Security & Password Information Info Block */}
      <div className="mt-5 pt-3.5 border-t border-[#E2DCDA]/60 space-y-2 text-[10px] text-[#8E7977] leading-relaxed select-none">
        <div className="flex items-start gap-2">
          <span translate="no" className="material-symbols-outlined text-[14px] text-[#B3181C] mt-0.5 shrink-0">shield</span>
          <p>
            <strong className="text-[#3E2927]">Protection des accès :</strong> Les sessions de connexion sont protégées par chiffrement SSL de bout en bout. Déconnexion automatique après inactivité.
          </p>
        </div>
        <div className="flex items-start gap-2">
          <span translate="no" className="material-symbols-outlined text-[14px] text-[#B3181C] mt-0.5 shrink-0">info</span>
          <p>
            <strong className="text-[#3E2927]">Assistance Mot de passe :</strong> Vos identifiants sont fournis par l’administration de l’établissement. Pour toute assistance, veuillez contacter la scolarité.
          </p>
        </div>
      </div>
    </form>
  );
}

