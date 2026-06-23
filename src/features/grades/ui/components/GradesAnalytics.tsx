import React from 'react';

interface GradesAnalyticsProps {
  averageMoyenne: number;
  validatedECTS: number;
  currentGPA: number;
}

export function GradesAnalytics({ averageMoyenne, validatedECTS, currentGPA }: GradesAnalyticsProps) {
  // Determine dynamic rank and top percentage based on the simulated average
  const getRank = (avg: number) => {
    if (avg >= 18) return { rank: '1er', top: 'Top 1% de la cohorte' };
    if (avg >= 17) return { rank: '2ème', top: 'Top 1.5% de la cohorte' };
    if (avg >= 16.5) return { rank: '3ème', top: 'Top 2% de la cohorte' };
    if (avg >= 16) return { rank: '4ème', top: 'Top 3% de la cohorte' };
    if (avg >= 15) return { rank: '7ème', top: 'Top 5% de la cohorte' };
    if (avg >= 14) return { rank: '12ème', top: 'Top 8% de la cohorte' };
    if (avg >= 12) return { rank: '28ème', top: 'Top 20% de la cohorte' };
    if (avg >= 10) return { rank: '62ème', top: 'Top 45% de la cohorte' };
    return { rank: '105ème', top: 'Deuxième partie de classe' };
  };

  const rankInfo = getRank(averageMoyenne);
  const ectsPercentage = Math.min(100, Math.max(0, (validatedECTS / 30) * 100));

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {/* GPA Card */}
      <div className="md:col-span-1 bg-white border border-neutral-gray-200 p-6 rounded-xl relative overflow-hidden group shadow-sm transition-all">
        <div className="relative z-10">
          <p className="text-secondary font-label-md text-label-md uppercase mb-2 font-bold">Moyenne Générale</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-primary tracking-tight transition-all duration-300">
              {averageMoyenne.toFixed(2)}
            </span>
            <span className="text-secondary font-label-md font-bold">/ 20</span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1 text-success-green">
              <span translate="no" className="material-symbols-outlined text-[16px]">trending_up</span>
              <span className="text-label-md font-bold">+0.8 vs Sem 1</span>
            </div>
            <div className="bg-success-green/10 text-success-green px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
              GPA {currentGPA.toFixed(1)}
            </div>
          </div>
        </div>
        <div className="absolute right-[-10%] top-[-10%] text-brand-red-light opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
          <span translate="no" className="material-symbols-outlined text-[120px]">analytics</span>
        </div>
      </div>

      {/* ECTS Card */}
      <div className="md:col-span-1 bg-white border border-neutral-gray-200 p-6 rounded-xl shadow-sm">
        <p className="text-secondary font-label-md text-label-md uppercase mb-2 font-bold">Crédits ECTS</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-on-surface tracking-tight transition-all duration-300">
            {validatedECTS}
          </span>
          <span className="text-secondary font-label-md font-bold">/ 30 validés</span>
        </div>
        <div className="w-full bg-neutral-gray-200 h-2 rounded-full mt-4 overflow-hidden">
          <div 
            className="bg-primary h-full rounded-full transition-all duration-500"
            style={{ width: `${ectsPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Ranking Card */}
      <div className="md:col-span-2 bg-white border border-neutral-gray-200 p-6 rounded-xl flex items-center justify-between shadow-sm">
        <div>
          <p className="text-secondary font-label-md text-label-md uppercase mb-2 font-bold">Rang Promotion</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-on-surface tracking-tight">{rankInfo.rank}</span>
            <span className="text-secondary font-label-md font-bold">sur 142 étudiants</span>
          </div>
          <div className="mt-4">
            <span className="bg-brand-red-light text-primary px-3 py-1 rounded-full font-label-md text-label-md font-bold">
              {rankInfo.top}
            </span>
          </div>
        </div>
        <div className="w-24 h-24 hidden md:flex items-center justify-center rounded-full border-[6px] border-brand-red-light relative">
          <span translate="no" className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
        </div>
      </div>
    </div>
  );
}
