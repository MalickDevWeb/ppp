import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { CalendarWidget } from '../components/CalendarWidget';

// Premium floating academic crimson badge matching the École 221 mockup
const EcoleBadge = () => (
  <div className="h-11 w-11 md:h-13 md:w-13 rounded-2xl bg-[#B3181C] border border-white/20 shadow-lg flex items-center justify-center p-2 select-none animate-fade-in shrink-0">
    <svg viewBox="0 0 100 100" className="h-full w-full text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 8 L88 23 V55 C88 77 50 93 50 93 C50 93 12 77 12 55 V23 L50 8 Z" fill="#B3181C" stroke="#FFFFFF" strokeWidth="3.5" />
      <path d="M50 14 L81 27 V51 C81 69 50 83 50 83 C50 83 19 69 19 51 V27 L50 14 Z" stroke="#E3A857" strokeWidth="2" />
      <path d="M50 26 L72 35 L50 44 L28 35 Z" fill="#FFFFFF" />
      <path d="M34 38 V49 C34 54 50 57 50 57 C50 57 66 54 66 49 V38" stroke="#FFFFFF" strokeWidth="2.5" />
      <path d="M72 35 V53" stroke="#E3A857" strokeWidth="2.5" />
      <circle cx="72" cy="53" r="3.5" fill="#E3A857" />
      <text x="50" y="74" fill="#FFFFFF" fontSize="17" fontWeight="900" textAnchor="middle" fontFamily="'Inter', sans-serif">221</text>
    </svg>
  </div>
);

// High-fidelity École 221 branding logo
interface EcoleLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const EcoleLogo = ({ size = 'md' }: EcoleLogoProps) => {
  const sizeClasses = {
    sm: 'text-[24px] h-[30px]',
    md: 'text-[28px] h-[34px]',
    lg: 'text-[34px] h-[40px]',
  };
  
  return (
    <div className={`flex items-center justify-center font-sans tracking-tight text-[#291715] ${sizeClasses[size]} font-black select-none`}>
      <span>ÉCOLE</span>
      <span className="text-[#B3181C] ml-1.5 font-black">221</span>
    </div>
  );
};

export function LoginPage() {
  const [tabletActiveTab, setTabletActiveTab] = useState<'login' | 'calendar'>('login');
  const [desktopShowCalendar, setDesktopShowCalendar] = useState(false);
  const [showMobileCalendarModal, setShowMobileCalendarModal] = useState(false);
  const bgImageUrl = "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCvQL9_EMnd-N8W7X6w_OplACkDHFQ2l5MtwjdkpWqC-SiZYTIVwNT70mNifCg4W_qtdT8LM-fj6hrYsRn-p0vAcHgRtJ-5KwQetUaRxPKNb19rYinpegcRSyxMOkdU35KewlOk9C58WlFL9Pie8-oEUlyz_lJmZkHAO4ft4lTH_4SRIl0uzFcqVGXxmVElfIsXtoHED3Bz62V7f8msM_49hz5NI0WPQ9YT5eLhy5NpxI7T_NuLoEx9XaSvQLgUTcjnqiTVsuiKD7o')";

  return (
    <main className="h-screen w-full max-w-full bg-[#FAF8F6] flex items-stretch overflow-hidden select-none">
      
      {/* ----------------- SCREEN 1: SMARTPHONE PORTRAIT (< md) ----------------- */}
      <div className="block md:hidden w-full h-full bg-white overflow-hidden">
        <div className="flex flex-col h-full w-full">
          {/* Top building campus banner */}
          <div 
            className="relative h-[25%] min-h-[140px] w-full bg-cover bg-center shrink-0"
            style={{ backgroundImage: bgImageUrl }}
          >
            {/* Soft shadow vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent"></div>
            
            {/* Floated top-left École 221 badge */}
            <div className="absolute top-[18px] left-[18px] z-20">
              <EcoleBadge />
            </div>

            {/* Calendar icon at top right, perfectly aligned and brand-cohesive with the École 221 badge! */}
            <button
              type="button"
              onClick={() => setShowMobileCalendarModal(true)}
              className="absolute top-[18px] right-[18px] z-20 h-11 w-11 rounded-2xl bg-[#B3181C] hover:bg-[#8F1316] text-white border border-white/20 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-200"
            >
              <span translate="no" className="material-symbols-outlined text-[19px] font-bold">calendar_month</span>
            </button>
          </div>

          {/* Elegant card container pulled upwards to overlap the banner */}
          <div className="relative -mt-8 flex-grow bg-[#FAF8F6] rounded-t-[32px] shadow-[-8px_-8px_32px_rgba(41,23,21,0.06)] flex flex-col justify-start px-6 pt-5 pb-4 z-10 overflow-y-auto no-scrollbar">
            
            {/* Logo & tagline - Restored to classic centered layout without lopsided button */}
            <div className="relative text-center flex flex-col items-center shrink-0 mb-3">
              <EcoleLogo size="sm" />
              <p className="text-[#8E7977] text-[10px] font-bold tracking-widest mt-1 select-none uppercase">
                Sénégal · Plateforme Éducative
              </p>
            </div>

            {/* Left Aligned Heading */}
            <div className="text-left mb-3 shrink-0 px-0.5">
              <h2 className="text-[20px] font-black text-[#291715] tracking-tight leading-tight">Connexion</h2>
              <p className="text-[#8E7977] text-[11px] font-medium leading-normal mt-0.5">
                Connectez-vous à votre espace École 221.
              </p>
            </div>

            {/* Login form */}
            <div className="flex-grow flex flex-col justify-start">
              <LoginForm isMobile={true} />
            </div>
          </div>
        </div>
      </div>


      {/* ----------------- SCREEN 2: TABLET PORTRAIT / LANDSCAPE (md to lg) ----------------- */}
      <div 
        className="hidden md:flex lg:hidden w-full h-full bg-cover bg-center p-6 relative overflow-y-auto"
        style={{ backgroundImage: bgImageUrl }}
      >
        {/* Full-screen darkening vignette layer */}
        <div className="absolute inset-0 bg-black/45 z-0"></div>

        {/* Elegant top bar wrapper on screen including tabs controller */}
        <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center gap-4">
          <EcoleBadge />
          
          {/* Transparent high-fidelity segment controller for navigation */}
          <div className="flex bg-black/40 backdrop-blur-xl p-1 rounded-full border border-white/10 shadow-lg scale-90 sm:scale-100 select-none">
            <button 
              onClick={() => setTabletActiveTab('login')}
              className={`py-1.5 px-4 rounded-full text-[10.5px] font-black tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                tabletActiveTab === 'login' 
                  ? 'bg-[#B3181C] text-white shadow-md shadow-[#B3181C]/20' 
                  : 'text-white/75 hover:text-white hover:bg-white/5'
              }`}
            >
              Connexion
            </button>
            <button 
              onClick={() => setTabletActiveTab('calendar')}
              className={`py-1.5 px-4 rounded-full text-[10.5px] font-black tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                tabletActiveTab === 'calendar' 
                  ? 'bg-[#B3181C] text-white shadow-md shadow-[#B3181C]/20' 
                  : 'text-white/75 hover:text-white hover:bg-white/5'
              }`}
            >
              Calendrier
            </button>
          </div>
        </div>

        <div className="m-auto w-full z-10 flex py-14 justify-center items-center">
          {tabletActiveTab === 'login' ? (
            /* Elegant Centered Floating Form Modal Card */
            <div className="bg-white/95 backdrop-blur-md rounded-[32px] shadow-[0_24px_64px_rgba(0,0,0,0.3)] max-w-[390px] w-full p-7.5 md:p-8 flex flex-col justify-between animate-scale-up my-4">
              <div>
                {/* Ecole Brand Header */}
                <div className="text-center flex flex-col items-center mb-5">
                  <EcoleLogo size="md" />
                  <p className="text-[#8E7977] text-[10px] font-bold tracking-widest mt-1.5 select-none uppercase">
                    Sénégal · Plateforme Éducative
                  </p>
                </div>

                {/* Form Title */}
                <div className="text-center mb-4">
                  <h2 className="text-[21px] font-black text-[#291715] tracking-tight">Connexion</h2>
                  <p className="text-[#8E7977] text-[12px] font-medium mt-0.5">Connectez-vous à votre espace École 221.</p>
                </div>

                {/* Form Fields */}
                <LoginForm />
              </div>

              {/* Footer informational items inside table model */}
              <div className="mt-5.5 text-center text-[#8E7977] text-[10px] space-y-2 select-none">
                <p className="leading-relaxed">
                  En vous connectant, vous acceptez les <a href="#" className="font-bold text-[#B3181C] hover:underline">Mentions légales</a> et la <br /> <a href="#" className="font-bold text-[#B3181C] hover:underline">Politique de confidentialité</a>.
                </p>
                <div className="flex justify-center items-center gap-4 pt-0.5 text-[#B3181C] font-bold">
                  <span className="flex items-center gap-1 cursor-pointer hover:underline">
                    <span translate="no" className="material-symbols-outlined text-[13px]">language</span>
                    Français
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 cursor-pointer hover:underline">
                    <span translate="no" className="material-symbols-outlined text-[13px]">help_outline</span>
                    Besoin d'aide ?
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Gorgeous Widescreen Calendar view for Tablet */
            <div 
              className="bg-[#FAF8F6] rounded-[32px] shadow-[0_24px_64px_rgba(41,23,21,0.25)] border border-[#E2DCDA] w-full max-w-[850px] p-5 md:p-6 animate-scale-up my-4"
              style={{ 
                marginLeft: '13px', 
                marginTop: '6px', 
                marginRight: '13px', 
                marginBottom: '6px' 
              }}
            >
              <div className="flex justify-between items-center mb-4 pb-3.5 border-b border-[#E2DCDA]/80 shrink-0 select-none">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 bg-[#B3181C] text-white rounded-xl shadow-md shadow-[#B3181C]/15 flex items-center justify-center">
                    <span translate="no" className="material-symbols-outlined text-[20px] font-bold">calendar_month</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-xs uppercase text-[#291715] tracking-widest">
                      Calendrier Académique
                    </h3>
                    <p className="text-[9px] text-[#8E7977] font-black uppercase leading-none mt-1">
                      ÉCOLE 221 · ESPACE INTERACTIF
                    </p>
                  </div>
                </div>
              </div>
              <CalendarWidget variant="transparent" />
            </div>
          )}
        </div>
      </div>


      {/* ----------------- SCREEN 3: DESKTOP WIDESCREEN (>= lg) ----------------- */}
      <div className="hidden lg:flex w-full h-full items-stretch">
        
        {/* Left Side: Swaps dynamically between campus building image (default) and Calendar view */}
        <div className="hidden lg:flex lg:w-[58%] xl:w-[62%] h-full relative overflow-hidden bg-[#FAF8F6] shrink-0 border-r border-[#E2DCDA]/60">
          {!desktopShowCalendar ? (
            /* Premium Campus Visual Brand Area matching Tablet viewport style */
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out scale-100 hover:scale-102"
              style={{ backgroundImage: bgImageUrl }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent"></div>
              
              {/* Absolute Badge Top-Left */}
              <div className="absolute top-8 left-8 z-20 shadow-xl">
                <EcoleBadge />
              </div>

              {/* Extra visual metadata overlays for peak craft */}
              <div className="absolute bottom-8 left-8 text-white select-none z-10 animate-fade-in">
                <h3 className="font-heading font-black text-lg tracking-wide uppercase">Campus Numérique</h3>
                <p className="text-[10px] text-white/80 uppercase tracking-widest font-bold">École 221 · ISM Dakar</p>
              </div>
            </div>
          ) : (
            /* Full Desktop Interactive Calendar Space - Styled beautifully into a premium floating card with no double headers */
            <div className="w-full h-full p-6 xl:p-8 overflow-y-auto bg-[#FAF8F6] no-scrollbar animate-fade-in flex flex-col justify-center">
              <div 
                className="bg-[#FAF8F6] rounded-[32px] border border-[#E2DCDA] shadow-[0_24px_64px_rgba(41,23,21,0.2)] p-6 xl:p-8 overflow-y-auto max-h-[94vh] no-scrollbar"
                style={{ 
                  marginLeft: '13px', 
                  marginTop: '6px', 
                  marginRight: '13px', 
                  marginBottom: '6px' 
                }}
              >
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E2DCDA]/80 select-none">
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 bg-[#B3181C] text-white rounded-xl shadow-md shadow-[#B3181C]/15 flex items-center justify-center">
                      <span translate="no" className="material-symbols-outlined text-[20px] font-bold">calendar_month</span>
                    </div>
                    <div>
                      <h3 className="font-sans font-black text-xs uppercase text-[#291715] tracking-widest">
                        Calendrier Interactif
                      </h3>
                      <p className="text-[10px] text-[#8E7977] font-black tracking-wide uppercase leading-none mt-1">
                        ÉCOLE 221 · ESPACE INTERACTIF
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setDesktopShowCalendar(false)}
                    className="px-4 py-1.5 rounded-xl bg-[#B3181C]/10 text-[#B3181C] hover:bg-[#B3181C]/20 text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer border border-[#B3181C]/5"
                  >
                    Masquer
                  </button>
                </div>
                <CalendarWidget variant="transparent" />
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Elegant login panel seamlessly merging with left curved bounds */}
        <div className="flex-grow bg-white rounded-l-[40px] shadow-[-16px_0_48px_rgba(41,23,21,0.04)] overflow-y-auto relative min-w-[390px] h-full no-scrollbar">
          
          <div className="min-h-full flex flex-col justify-between p-10 xl:p-14">
            
            {/* Centered card contents */}
            <div className="my-auto max-w-[370px] w-full mx-auto flex flex-col justify-center animate-fade-in space-y-5 py-6">
              
              {/* High-fidelity segment controller matching exact dark style of screenshot and tablet */}
              <div className="flex justify-center select-none">
                <div className="flex bg-[#291715]/90 backdrop-blur-xl p-1 rounded-full border border-white/10 shadow-lg scale-100 transition-all duration-300">
                  <button 
                    type="button"
                    onClick={() => {
                      setDesktopShowCalendar(false);
                    }}
                    className={`py-1.5 px-6 rounded-full text-[10.5px] font-black tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                      !desktopShowCalendar 
                        ? 'bg-[#B3181C] text-white shadow-md shadow-[#B3181C]/25 scale-102' 
                        : 'text-white/75 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Connexion
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setDesktopShowCalendar(true);
                    }}
                    className={`py-1.5 px-6 rounded-full text-[10.5px] font-black tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                      desktopShowCalendar 
                        ? 'bg-[#B3181C] text-white shadow-md shadow-[#B3181C]/25 scale-102' 
                        : 'text-white/75 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Calendrier
                  </button>
                </div>
              </div>

              {/* École 221 brand logo & tagline */}
              <div className="text-center flex flex-col items-center">
                <EcoleLogo size="lg" />
                <p className="text-[#8E7977] text-[10.5px] font-bold tracking-widest mt-2 select-none uppercase">
                  Sénégal · Plateforme Éducative
                </p>
              </div>

              {/* Title greeting */}
              <div className="text-center">
                <h2 className="text-[23px] font-[900] text-[#291715] tracking-tight leading-none mb-1">Connexion</h2>
                <p className="text-[#8E7977] text-xs font-semibold">Connectez-vous à votre espace École 221.</p>
              </div>

              {/* Login form */}
              <LoginForm />

            </div>

            {/* Legal / Informational Footer for Widescreen */}
            <div className="mt-auto text-center text-[#8E7977] text-[11px] space-y-2.5 max-w-[370px] w-full mx-auto shrink-0 select-none">
              <p className="leading-relaxed">
                En vous connectant, vous acceptez les <a href="#" className="font-bold text-[#B3181C] hover:underline">Mentions légales</a> et la <br /> <a href="#" className="font-bold text-[#B3181C] hover:underline">Politique de confidentialité</a>.
              </p>
              <div className="flex justify-center items-center gap-5 pt-0.5 font-bold text-[#B3181C]">
                <span className="flex items-center gap-1 cursor-pointer hover:text-[#8F1316] transition-colors">
                  <span translate="no" className="material-symbols-outlined text-[14px]">language</span>
                  Français
                </span>
                <span className="flex items-center gap-1 cursor-pointer hover:text-[#8F1316] transition-colors">
                  <span translate="no" className="material-symbols-outlined text-[14px]">help_outline</span>
                  Besoin d'aide ?
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
      
      {/* High-fidelity Mobile/Tablet Calendar Modal with a real clear, compact layout */}
      {showMobileCalendarModal && (
        <div className="fixed inset-0 bg-[#291715]/65 backdrop-blur-md z-[300] flex items-center justify-center p-2 animate-fade-in">
          <div 
            className="fixed inset-0 cursor-pointer" 
            onClick={() => setShowMobileCalendarModal(false)} 
          />
          <div 
            className="bg-[#FAF8F6] rounded-[32px] shadow-[0_24px_64px_rgba(41,23,21,0.25)] border border-[#E2DCDA] w-full max-w-[500px] max-h-[92vh] overflow-y-auto relative z-10 p-5 animate-scale-up flex flex-col no-scrollbar"
            style={{ 
              marginLeft: '13px', 
              marginTop: '6px', 
              marginRight: '13px', 
              marginBottom: '6px' 
            }}
          >
            
            <div className="flex justify-between items-center mb-4 pb-3.5 border-b border-[#E2DCDA]/80 shrink-0 select-none">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 bg-[#B3181C] text-white rounded-xl shadow-md shadow-[#B3181C]/15 flex items-center justify-center">
                  <span translate="no" className="material-symbols-outlined text-[20px] font-bold">calendar_month</span>
                </div>
                <div>
                  <h3 className="font-heading font-black text-xs uppercase text-[#291715] tracking-widest">
                    Calendrier Académique
                  </h3>
                  <p className="text-[9px] text-[#8E7977] font-black uppercase leading-none mt-1">
                    ÉCOLE 221 · ESPACE INTERACTIF
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowMobileCalendarModal(false)}
                className="px-3.5 py-1.5 rounded-xl bg-[#B3181C]/10 text-[#B3181C] hover:bg-[#B3181C]/20 text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer border border-[#B3181C]/5"
              >
                Fermer
              </button>
            </div>
            
            <div className="max-h-[70vh] overflow-y-auto no-scrollbar pr-0.5">
              <CalendarWidget variant="transparent" />
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
