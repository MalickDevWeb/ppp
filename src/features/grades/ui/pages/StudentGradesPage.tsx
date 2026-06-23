import React, { useState } from 'react';
import { GradesHeader } from '../components/GradesHeader';
import { GradesAnalytics } from '../components/GradesAnalytics';
import { GradesPerformanceChart } from '../components/GradesPerformanceChart';
import { GradesTable } from '../components/GradesTable';
import { useGrades } from '@/features/grades/hooks/useGrades';
import { Grade, calculateFinalNote, getModuleStatus } from '@/features/grades/domain/Grade';

export function StudentGradesPage() {
  const { 
    grades, 
    calculatedGrades, 
    validatedECTS, 
    averageMoyenne, 
    currentGPA, 
    isLoading, 
    error, 
    simulateGradeChange, 
    resetSimulation 
  } = useGrades();

  const [activeModule, setActiveModule] = useState<Grade | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  if (isLoading) {
    return (
      <main className="flex-1 p-4 md:p-8 bg-surface-container-lowest animate-fade-in relative min-h-screen pb-24 md:pb-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand-red-deep/20 border-t-brand-red-deep rounded-full animate-spin"></div>
          <p className="text-xs font-bold text-secondary">Chargement de votre relevé de notes...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 p-4 md:p-8 bg-surface-container-lowest animate-fade-in relative min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-brand-red-deep p-6 rounded-2xl border border-red-100 text-center">
          <span className="material-symbols-outlined text-[32px] mb-2">error</span>
          <h3 className="font-bold">Erreur</h3>
          <p className="text-sm">{error}</p>
        </div>
      </main>
    );
  }

  // Dynamically calculate the horizontal bar chart values mapping to 0 to 100% based on simulated grades
  // We use safe access since we get data from an API/Mock now
  const ues = grades.length >= 4 ? [
    { 
      label: 'UE1: Algorithmique & Data Science', 
      note: Number((calculateFinalNote(grades[0].cc, grades[0].examen)).toFixed(1)), 
      myWidth: `${Math.min(100, (calculateFinalNote(grades[0].cc, grades[0].examen) / 20 * 100)).toFixed(1)}%`, 
      promoWidth: `${Math.min(100, (grades[0].moyPromo / 20 * 100)).toFixed(1)}%` 
    },
    { 
      label: 'UE2: Architecture Cloud & DevOps', 
      note: Number(((calculateFinalNote(grades[1].cc, grades[1].examen) + calculateFinalNote(grades[2].cc, grades[2].examen)) / 2).toFixed(1)), 
      myWidth: `${Math.min(100, (((calculateFinalNote(grades[1].cc, grades[1].examen) + calculateFinalNote(grades[2].cc, grades[2].examen)) / 2) / 20 * 100)).toFixed(1)}%`, 
      promoWidth: `${Math.min(100, (((grades[1].moyPromo + grades[2].moyPromo) / 2) / 20 * 100)).toFixed(1)}%` 
    },
    { 
      label: 'UE3: Management de Projet', 
      note: Number(calculateFinalNote(grades[3].cc, grades[3].examen).toFixed(1)), 
      myWidth: `${Math.min(100, (calculateFinalNote(grades[3].cc, grades[3].examen) / 20 * 100)).toFixed(1)}%`, 
      promoWidth: `${Math.min(100, (grades[3].moyPromo / 20 * 100)).toFixed(1)}%` 
    },
  ] : [];

  return (
    <main className="flex-1 p-4 md:p-8 bg-surface-container-lowest animate-fade-in relative min-h-screen pb-24 md:pb-8">
      
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#291715] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 border border-white/10 animate-slide-up text-xs font-bold">
          <span translate="no" className="material-symbols-outlined text-success-green">check_circle</span>
          <span>{showToast}</span>
        </div>
      )}

      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-black text-on-surface">Espace Bulletins & Notes</h2>
          <p className="font-body-lg text-body-lg text-secondary col-span-1">Simulez vos résultats scolaires en direct et anticipez vos mentions.</p>
        </div>
        
        <div className="flex gap-3 shrink-0">
          <div className="bg-[#FFF5F5] px-4 py-2.5 rounded-xl border border-[#B3181C]/10 flex flex-col justify-center">
            <span className="text-[9px] font-black text-[#B3181C] uppercase tracking-wider">Moyenne Générale</span>
            <span className="text-base font-black text-[#291715]">{averageMoyenne.toFixed(2)} / 20</span>
          </div>
          <div className="bg-success-green/10 text-success-green px-4 py-2.5 rounded-xl border border-success-green/20 flex flex-col justify-center">
            <span className="text-[9px] font-black opacity-80 uppercase tracking-wider">GPA Estimé</span>
            <span className="text-base font-black">{currentGPA.toFixed(1)} / 4.0</span>
          </div>
        </div>
      </div>

      <GradesHeader onDownload={() => triggerToast("Préparation de votre relevé de notes officiel PDF... Téléchargement démarré !")} />
      
      <GradesAnalytics 
        averageMoyenne={averageMoyenne} 
        validatedECTS={validatedECTS} 
        currentGPA={currentGPA} 
      />
      
      {ues.length > 0 && (
        <div className="mb-8">
          <GradesPerformanceChart ues={ues} />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        <div className="lg:col-span-8">
          <GradesTable 
            grades={calculatedGrades} 
            onRowClick={(modName) => {
              const active = grades.find(g => g.module === modName) || null;
              setActiveModule(active);
            }} 
          />
        </div>
        
        <div className="lg:col-span-4">
          <div className="bg-gradient-to-br from-[#291715] to-[#1a0e0c] text-white p-6 rounded-3xl border border-white/5 shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3 bg-white/10 w-fit px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-extrabold text-[#E3A857]">
                <span className="material-symbols-outlined text-xs animate-pulse">auto_awesome</span>
                PROJECTION DE MENTION
              </div>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                Cliquez sur un des modules du tableau pour ouvrir sa structure, modifier sa note de contrôle continu ou d'examen et voir l'impact en temps réel sur vos crédits validés !
              </p>
            </div>
            <div className="bg-white/5 py-4 px-4 rounded-xl text-xs font-bold text-white/70 space-y-2 mt-4 md:mt-0">
              <div className="flex justify-between">
                <span>Total ECTS cumulés :</span>
                <span className="text-white font-extrabold">{validatedECTS} / 30 ECTS</span>
              </div>
              <div className="flex justify-between">
                <span>Statut d'année :</span>
                {validatedECTS >= 30 ? (
                  <span className="text-success-green font-black">Admis d'office (S2)</span>
                ) : validatedECTS >= 20 ? (
                  <span className="text-yellow-400 font-black">Admis sous réserve</span>
                ) : (
                  <span className="text-red-400 font-black">Sessions rattrapages</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeModule && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-neutral-gray-200/45 flex flex-col">
            
            <div className="bg-brand-red-deep p-6 text-white relative">
              <button 
                onClick={() => setActiveModule(null)}
                className="absolute top-4 right-4 bg-white/15 hover:bg-white/25 p-1.5 rounded-xl text-white transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm font-bold">close</span>
              </button>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Module de Spécialité ({activeModule.ects} ECTS)
                </span>
                <span className="bg-success-green/30 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                  {getModuleStatus(calculateFinalNote(activeModule.cc, activeModule.examen))}
                </span>
              </div>
              
              <h3 className="font-headline-md text-lg font-black leading-tight">{activeModule.module}</h3>
              <p className="text-white/70 text-[10px] uppercase tracking-wide font-heavy mt-1">{activeModule.prof}</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-brand-red-light/40 py-3.5 px-4 rounded-2xl border border-[#B3181C]/5 flex justify-between items-center text-center">
                <div className="text-left">
                  <span className="block text-[8.5px] font-black text-brand-red-deep uppercase tracking-wider">Calcul de la Note finale</span>
                  <p className="text-[10px] text-neutral-gray-500 font-semibold mt-0.5">Note = (CC * 40%) + (Examen * 60%)</p>
                </div>
                <div className="bg-brand-red-deep text-white px-3.5 py-1.5 rounded-xl font-black text-base shadow-sm shrink-0">
                  {calculateFinalNote(activeModule.cc, activeModule.examen).toFixed(2)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-secondary lowercase tracking-wide">Contrôle Continu (coeff 40%) :</span>
                  <span className="font-black text-[#291715]">{activeModule.cc.toFixed(2)} / 20.00</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  step="0.25"
                  value={activeModule.cc}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    simulateGradeChange(activeModule.module, 'cc', val);
                    setActiveModule({ ...activeModule, cc: val });
                  }}
                  className="w-full accent-brand-red-deep h-1.5 bg-neutral-gray-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-secondary lowercase tracking-wide">Examen National Final (coeff 60%) :</span>
                  <span className="font-black text-[#291715]">{activeModule.examen.toFixed(2)} / 20.00</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  step="0.25"
                  value={activeModule.examen}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    simulateGradeChange(activeModule.module, 'examen', val);
                    setActiveModule({ ...activeModule, examen: val });
                  }}
                  className="w-full accent-brand-red-deep h-1.5 bg-neutral-gray-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="pt-4 border-t border-neutral-gray-100 flex justify-between items-center text-xs">
                <span className="font-bold text-neutral-500">Moyenne générale de la classe :</span>
                <span className="font-extrabold text-[#291715]/90">{activeModule.moyPromo.toFixed(2)} / 20</span>
              </div>
            </div>

            <div className="p-5 bg-surface-container-low border-t border-neutral-gray-150 flex gap-3">
              <button 
                onClick={() => {
                  resetSimulation(activeModule.module);
                  // We need to fetch the original value to update local state immediately
                  const original = grades.find(g => g.module === activeModule.module);
                  // In useGrades, resetSimulation uses baseGrades to restore. The UI will update on next render,
                  // but we update activeModule state here for the modal.
                  // Since we don't expose baseGrades here, we just close the modal or let it sync.
                  // Easiest is to just close the modal.
                  setActiveModule(null);
                  triggerToast("Valeurs d'origine restaurées !");
                }}
                className="flex-grow py-3 text-center border border-neutral-gray-300 bg-white rounded-xl text-xs font-black hover:bg-neutral-50 cursor-pointer active:scale-98 transition-all"
              >
                Réinitialiser
              </button>
              <button 
                onClick={() => {
                  triggerToast(`Simulation sauvegardée localement avec succès !`);
                  setActiveModule(null);
                }}
                className="flex-grow py-3 text-center bg-brand-red-deep text-white rounded-xl text-xs font-black shadow-md hover:opacity-95 cursor-pointer active:scale-98 transition-all"
              >
                Appliquer
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
