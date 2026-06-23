import React, { useState, useRef } from 'react';
import { 
  Calendar, 
  Search, 
  X, 
  Clock, 
  MapPin, 
  User, 
  Printer, 
  LayoutGrid, 
  CalendarDays, 
  Info, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  GraduationCap, 
  Laptop, 
  FileText, 
  Coffee, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  CalendarPlus,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  FileSpreadsheet
} from 'lucide-react';
import { useSchedule } from '@/features/schedule/hooks/useSchedule';
import { CourseSession, CourseDay } from '@/features/schedule/domain/Schedule';

export function StudentSchedulePage() {
  const { schedule, isLoading, error, filterSchedule } = useSchedule();
  
  const [selectedDayMobile, setSelectedDayMobile] = useState<CourseDay>('MER');
  const [activePlanCourse, setActivePlanCourse] = useState<CourseSession | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [filterType, setFilterType] = useState<'TOUS' | 'CM' | 'TD' | 'TP'>('TOUS');
  const [filterStatus, setFilterStatus] = useState<'TOUS' | 'termine' | 'actuel' | 'a_venir'>('TOUS');
  const [searchQuery, setSearchQuery] = useState('');

  const gridContainerRef = useRef<HTMLDivElement>(null);

  const triggerToast = (message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(null), 3500);
  };

  const scrollGrid = (direction: 'left' | 'right') => {
    if (gridContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      gridContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const fitsFilters = (c: CourseSession) => {
    // Le hook fournit déjà filterSchedule mais on peut l'utiliser directement pour un cours individuel
    // ou on peut déléguer le filtrage global
    const matchesType = filterType === 'TOUS' || c.type === filterType;
    const matchesStatus = filterStatus === 'TOUS' || c.status === filterStatus;
    const matchesSearch = searchQuery.trim() === '' || 
      c.nom.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.professeur.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.salle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  };

  const resetAllFilters = () => {
    setFilterType('TOUS');
    setFilterStatus('TOUS');
    setSearchQuery('');
    triggerToast('Filtres réinitialisés avec succès !');
  };

  return (
    <div className="flex-1 px-4 md:px-8 py-6 md:py-8 bg-[#FAF8F6] animate-fade-in min-h-screen">
      {/* Premium Dynamic Toast feedback */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#291715] text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 animate-fade-in duration-300">
          <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="h-3 w-3 text-green-400 font-extrabold" />
          </div>
          <span className="text-xs font-black tracking-wide">{showToast}</span>
        </div>
      )}

      {/* Header and Controls */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-brand-red-deep text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shadow-sm">
              Semaine 42
            </span>
            <span className="text-secondary font-bold text-xs uppercase tracking-wider bg-neutral-gray-200 px-2 py-1 rounded-md">
              Oct 23 - Oct 27
            </span>
          </div>
          <h2 className="font-headline-lg text-[28px] md:text-[36px] text-on-surface font-black tracking-tight leading-tight">
            Emploi du Temps
          </h2>
          <p className="text-secondary font-semibold text-xs md:text-sm mt-1 max-w-2xl">
            Visualisez vos sessions académiques en temps réel. <span className="text-brand-red-deep font-extrabold">{schedule.filter(c => c.status === 'actuel').length} cours</span> est actuellement en cours de dispense.
          </p>
        </div>
      </div>

      {/* Course Detailed interactive modal */}
      {activePlanCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-neutral-gray-200/60 flex flex-col transform transition-all duration-300 scale-100">
            {/* Modal Header banner */}
            <div className={`p-6 text-white relative ${
              activePlanCourse.type === 'CM' ? 'bg-[#B3181C]' : activePlanCourse.type === 'TP' ? 'bg-[#10B981]' : 'bg-[#2563EB]'
            }`}>
              <button 
                onClick={() => setActivePlanCourse(null)}
                className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition-all cursor-pointer flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-widest text-white">
                  {activePlanCourse.type === 'CM' ? 'Cours Magistral (CM)' : activePlanCourse.type === 'TP' ? 'Travaux Pratiques (TP)' : 'Travaux Dirigés (TD)'}
                </span>
                {activePlanCourse.status === 'actuel' && (
                  <span className="px-3 py-1 rounded-full bg-[#E3A857] text-[#291715] text-[10px] font-black uppercase flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#291715]"></span>
                    Séance en cours
                  </span>
                )}
              </div>
              <h4 className="text-2xl font-black leading-tight tracking-tight">{activePlanCourse.nom}</h4>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 bg-[#FAF8F6]">
              <div className="bg-white p-4.5 rounded-2xl border border-neutral-100 shadow-3xs space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-orange-50 text-[#B3181C]">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-black text-[#291715]/40 text-[9px] uppercase tracking-widest">Horaire & Date</h5>
                    <p className="text-xs text-neutral-800 font-extrabold mt-0.5">{activePlanCourse.jourComplet} {activePlanCourse.dateStr} • {activePlanCourse.heureStr}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-t border-neutral-100 pt-3.5">
                  <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-black text-[#291715]/40 text-[9px] uppercase tracking-widest">Salle de cours</h5>
                    <p className="text-xs text-neutral-800 font-extrabold mt-0.5">{activePlanCourse.salle}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-t border-neutral-100 pt-3.5">
                  <div className="p-2 rounded-xl bg-green-50 text-[#10B981]">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-black text-[#291715]/40 text-[9px] uppercase tracking-widest">Enseignant</h5>
                    <p className="text-xs text-neutral-800 font-extrabold mt-0.5">{activePlanCourse.professeur}</p>
                  </div>
                </div>
              </div>

              {activePlanCourse.description && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1 text-[#291715]/50">
                    <FileText className="h-3 w-3 text-[#B3181C]" />
                    <h5 className="font-black text-[9px] uppercase tracking-widest">Descriptif du Module & Syllabus</h5>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed bg-white p-4.5 rounded-2xl border border-neutral-200/40 shadow-3xs font-medium">
                    {activePlanCourse.description}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="p-5 bg-white border-t border-neutral-150 flex gap-3">
              <button 
                onClick={() => setActivePlanCourse(null)}
                className="flex-1 py-3 text-center border border-neutral-200 text-neutral-600 hover:text-[#291715] hover:bg-neutral-50 rounded-2xl font-bold text-xs transition-all cursor-pointer"
              >
                Fermer
              </button>
              
              <button 
                onClick={() => {
                  triggerToast(`Séance de ${activePlanCourse.nom} exportée vers votre Google Calendar !`);
                  setActivePlanCourse(null);
                }}
                className="flex-1 py-3 bg-[#B3181C] hover:bg-[#8c1215] text-white rounded-2xl font-extrabold text-[11px] uppercase tracking-wider transition-all shadow-md shadow-[#B3181C]/10 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CalendarPlus className="h-3.5 w-3.5" />
                Synchroniser
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1 print:hidden">
            <span className="bg-[#B3181C]/5 text-[#B3181C] border border-[#B3181C]/15 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="h-2.5 w-2.5 animate-pulse" />
              Portail Étudiant
            </span>
            <span className="text-neutral-300 text-xs select-none">•</span>
            <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-wider">Université École 221</span>
          </div>
          <h1 className="font-headline-lg text-[26px] md:text-[34px] text-[#291715] font-black tracking-tight leading-none mb-2">
            Emploi du Temps
          </h1>
          <p className="text-neutral-gray-500 font-bold text-xs md:text-sm">
            Semaine du 23 au 27 Octobre 2023 • Semestre 1 • Classe L3-GL
          </p>
        </div>
        
        {/* Print / Export Action headers */}
        <div className="flex gap-2.5 w-full md:w-auto print:hidden">
          <button 
            onClick={() => {
              window.print();
              triggerToast("Impression du planning entamée...");
            }}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-neutral-200 bg-white px-5 h-11 rounded-2xl hover:bg-neutral-50 transition-all font-black text-xs text-neutral-700 cursor-pointer shadow-3xs"
          >
            <Printer className="h-4 w-4 text-neutral-500" />
            Imprimer l'agenda
          </button>
          
          <button 
            onClick={() => triggerToast("Emploi du temps synchronisé avec Google Calendar avec succès!")}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#B3181C] text-white px-5 h-11 rounded-2xl hover:bg-[#8c1215] transition-all font-black text-xs uppercase tracking-wider cursor-pointer shadow-md shadow-[#B3181C]/10"
          >
            <CalendarPlus className="h-4 w-4" />
            Synchroniser Calendar
          </button>
        </div>
      </div>

      {/* Unified Search & Filters Bar */}
      <div className="bg-white border border-neutral-gray-200 rounded-3xl p-5 mb-8 space-y-5 shadow-3xs print:hidden">
        
        {/* Toggle between Grid and Calendar list & Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4.5 justify-between items-stretch lg:items-center">
          
          {/* Segmented view controller with real Lucide Icons */}
          <div className="flex bg-[#FAF8F6] p-1.5 rounded-2xl select-none w-full lg:w-auto border border-neutral-200/60 shadow-3xs">
            <button
              onClick={() => {
                setViewMode('grid');
                triggerToast('Format hebdomadaire activé !');
              }}
              className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#B3181C] shadow-sm font-black border border-neutral-200/50'
                  : 'text-neutral-gray-400 hover:text-neutral-gray-650'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Grille de la semaine
            </button>
            <button
              onClick={() => {
                setViewMode('timeline');
                triggerToast('Format journalier activé !');
              }}
              className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-white text-[#B3181C] shadow-sm font-black border border-neutral-200/50'
                  : 'text-neutral-gray-400 hover:text-neutral-gray-650'
              }`}
            >
              <CalendarDays className="h-3.5 w-3.5" />
              Planning par jour
            </button>
          </div>

          {/* Elegant Search Box */}
          <div className="relative flex-grow max-w-full lg:max-w-md w-full">
            <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un cours, un enseignant, une classe, une salle..."
              className="w-full pl-11 pr-10 py-3 bg-[#FAF8F6] rounded-2xl border border-neutral-200 text-xs font-bold leading-normal focus:outline-none focus:border-[#B3181C] focus:bg-white placeholder-neutral-400 transition-all border-neutral-gray-200 focus:shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer flex items-center justify-center"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Dynamic Separator */}
        <div className="h-px bg-neutral-100 w-full" />

        {/* Scrollable Filters row */}
        <div className="flex flex-col xl:flex-row gap-5 items-stretch xl:items-center justify-between">
          
          {/* Format Selection Chips (with Lucide tags instead of visual emoji slop) */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar max-w-full">
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#291715]/60 whitespace-nowrap">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#B3181C]" />
              Format :
            </span>
            <div className="flex gap-2">
              {([
                { key: 'TOUS', label: 'Tous les cours', icon: Sparkles },
                { key: 'CM', label: '📖 CM (Magistral)', icon: GraduationCap },
                { key: 'TD', label: '✏️ TD (Dirigés)', icon: FileText },
                { key: 'TP', label: '💻 TP (Pratiques)', icon: Laptop }
              ] as const).map((item) => {
                const IconComp = item.icon;
                const isActive = filterType === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      setFilterType(item.key);
                      triggerToast(`Affichage format : ${item.key}`);
                    }}
                    className={`px-3.5 py-2 rounded-2xl font-black text-[11px] transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border ${
                      isActive
                        ? 'bg-[#B3181C] text-white border-[#B3181C] shadow-sm'
                        : 'bg-[#FAF8F6] text-neutral-600 hover:bg-neutral-100 border-neutral-200/80'
                    }`}
                  >
                    <IconComp className={`h-3 w-3 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Selection Chips */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar max-w-full">
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#291715]/60 whitespace-nowrap">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-605 text-green-600" />
              Statut :
            </span>
            <div className="flex gap-2">
              {([
                { key: 'TOUS', label: 'Tous les statuts' },
                { key: 'actuel', label: '🟢 Actuels / En cours' },
                { key: 'a_venir', label: '📅 À Venir' },
                { key: 'termine', label: '✅ Terminés' }
              ] as const).map((item) => {
                const isActive = filterStatus === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      setFilterStatus(item.key);
                      triggerToast(`Filtre statut : ${item.key}`);
                    }}
                    className={`px-3.5 py-2 rounded-2xl font-black text-[11px] transition-all cursor-pointer whitespace-nowrap border ${
                      isActive
                        ? 'bg-[#B3181C] text-white border-[#B3181C] shadow-sm'
                        : 'bg-[#FAF8F6] text-neutral-600 hover:bg-neutral-100 border-neutral-200/80'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Legend Information banner with Lucide icons */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-between mb-8 p-4 bg-white border border-neutral-gray-200 rounded-2xl shadow-3xs print:hidden">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-[#B3181C]/10 text-[#B3181C]">
              <GraduationCap className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-black text-neutral-700">CM : Cours Magistral</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-blue-50 text-blue-600">
              <FileText className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-black text-neutral-700">TD : Travaux Dirigés</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-green-50 text-green-600">
              <Laptop className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-black text-neutral-700">TP : Travaux Pratiques</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-neutral-400">
          <Info className="h-3.5 w-3.5 text-[#B3181C] animate-pulse" />
          <span className="text-[10px] font-black italic tracking-wider uppercase">Cliquez sur un créneau pour voir le syllabus</span>
        </div>
      </div>

      {/* RESPONSIVE LAYOUTS */}

      {/* 1. TIMELINE LIST LAYOUT (Perfect choice on tablet screens, default or selected) */}
      {viewMode === 'timeline' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Day selection left navigation column */}
          <div className="lg:col-span-3 space-y-3.5 print:hidden">
            <p className="font-black text-[10px] text-[#291715]/40 uppercase tracking-widest pl-1">
              Calendrier Hebdomadaire
            </p>
            
            {/* Horizontal-Scroll on Tablet/Mobile and Vertical lists on Desktop */}
            <div className="flex lg:flex-col gap-2.5 overflow-x-auto pb-3 lg:pb-0 select-none no-scrollbar snap-x scroll-smooth">
              {(['LUN', 'MAR', 'MER', 'JEU', 'VEN'] as const).map((day) => {
                const dayLabel: Record<string, string> = {
                  LUN: 'Lundi',
                  MAR: 'Mardi',
                  MER: 'Mercredi',
                  JEU: 'Jeudi',
                  VEN: 'Vendredi'
                };
                const dayDate: Record<string, string> = {
                  LUN: '23 Oct',
                  MAR: '24 Oct',
                  MER: '25 Oct',
                  JEU: '26 Oct',
                  VEN: '27 Oct'
                };
                const resultsCount = schedule.filter(c => c.jour === day).filter(fitsFilters).length;
                const isSelected = selectedDayMobile === day;

                return (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDayMobile(day);
                      triggerToast(`Affichage : ${dayLabel[day]}`);
                    }}
                    className={`flex-grow lg:flex-grow-0 py-4 px-5 rounded-2xl font-black text-xs transition-all flex flex-row lg:flex-col items-center lg:items-start justify-between relative cursor-pointer min-w-[130px] shrink-0 snap-start border ${
                      isSelected
                        ? 'bg-[#B3181C] text-white border-[#B3181C] shadow-md shadow-[#B3181C]/15 scale-102'
                        : 'bg-white text-neutral-650 hover:bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div className="text-left">
                      <span className="block text-xs uppercase tracking-tight">{dayLabel[day]}</span>
                      <span className={`block text-[10px] ${isSelected ? 'text-white/80' : 'text-neutral-400'} font-bold mt-1`}>{dayDate[day]}</span>
                    </div>
                    {resultsCount > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                        isSelected ? 'bg-white text-[#B3181C]' : 'bg-[#FFF5F5] text-[#B3181C] border border-[#B3181C]/10'
                      }`}>
                        {resultsCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Middle Timeline body */}
          <div className="lg:col-span-9 space-y-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-black text-xs uppercase tracking-widest text-[#291715]/70">
                Plan du {selectedDayMobile === 'LUN' ? 'Lundi' : selectedDayMobile === 'MAR' ? 'Mardi' : selectedDayMobile === 'MER' ? 'Mercredi' : selectedDayMobile === 'JEU' ? 'Jeudi' : 'Vendredi'}
              </h3>
              <span className="px-3.5 py-1 text-[9px] font-black uppercase rounded-full bg-[#FFF5F5] text-[#B3181C] border border-[#B3181C]/10 select-none">
                {schedule.filter(c => c.jour === selectedDayMobile).filter(fitsFilters).length} séances configurées
              </span>
            </div>

            {schedule.filter(c => c.jour === selectedDayMobile).filter(fitsFilters).length === 0 ? (
              <div className="text-center py-20 bg-white border border-neutral-gray-200/80 rounded-3xl space-y-3.5 shadow-3xs">
                <div className="h-14 w-14 rounded-full bg-[#FAF8F6] flex items-center justify-center mx-auto text-neutral-300">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-extrabold text-sm text-neutral-700">Aucune séance dans cet agenda</p>
                  <p className="text-[10.5px] text-neutral-400 max-w-sm mx-auto leading-relaxed mt-1">
                    Aucun cours ne correspond aux filtres appliqués (format ou recherche). Réinitialisez pour voir tout.
                  </p>
                </div>
                <button 
                  onClick={resetAllFilters}
                  className="px-4 py-2 bg-[#FAF8F6] border border-neutral-200 text-[#B3181C] rounded-xl text-[10px] font-black tracking-wider uppercase hover:bg-[#FFF5F5] transition-all cursor-pointer inline-flex items-center gap-1"
                >
                  Tout Réinitialiser
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {schedule.filter(c => c.jour === selectedDayMobile).filter(fitsFilters).map((cours) => (
                  <div 
                    key={cours.id}
                    onClick={() => setActivePlanCourse(cours)}
                    className={`p-5 bg-white border rounded-2xl transition-all duration-300 cursor-pointer hover:shadow-md flex gap-4.5 relative ${
                      cours.status === 'actuel' 
                        ? 'border-[#B3181C] bg-[#FFF5F5]/40 shadow-xs ring-4 ring-[#B3181C]/5' 
                        : 'border-neutral-gray-200/80'
                    }`}
                  >
                    {cours.status === 'actuel' && (
                      <span className="absolute -top-1.5 left-5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B3181C] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B3181C]"></span>
                      </span>
                    )}

                    {/* Left Time info */}
                    <div className="flex flex-col justify-between items-center text-center py-0.5 shrink-0 w-20 border-r border-neutral-100 pr-4">
                      <div className="space-y-0.5">
                        <span className="text-xs font-black text-[#291715] block">{cours.heureDebut}</span>
                        <span className="text-[10px] font-bold text-neutral-400 block">{cours.heureFin}</span>
                      </div>
                      
                      <span className={`mt-3 px-2 py-1 rounded-lg text-[9px] font-black tracking-wide uppercase ${
                        cours.type === 'CM' 
                          ? 'bg-[#FFF5F5] text-[#B3181C]' 
                          : cours.type === 'TP' 
                            ? 'bg-[#E6F4EA] text-green-708 text-[#137333]' 
                            : 'bg-blue-50 text-blue-600'
                      }`}>
                        {cours.type}
                      </span>
                    </div>

                    {/* Right Course description and action button */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-extrabold text-xs leading-snug text-[#291715] mb-1">
                          {cours.nom}
                        </h4>
                        <p className="text-[10.5px] text-neutral-450 text-neutral-500 font-bold flex items-center gap-1">
                          <User className="h-3 w-3 text-neutral-400 shrink-0" />
                          {cours.professeur}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-4">
                        <span className="text-[10px] text-[#B3181C] bg-[#FFF5F5] px-2.5 py-1 rounded-xl border border-[#B3181C]/5 flex items-center gap-1 font-bold">
                          <MapPin className="h-3 w-3" />
                          {cours.salle}
                        </span>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePlanCourse(cours);
                          }}
                          className="bg-[#B3181C]/5 hover:bg-[#B3181C] hover:text-white text-[#B3181C] px-3 py-1.5 rounded-xl text-[9px] font-black tracking-wider uppercase flex items-center gap-1 transition-all cursor-pointer border border-[#B3181C]/10"
                        >
                          Syllabus
                          <ArrowRight className="h-2.5 w-2.5 font-bold" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      )}

      {/* 2. WEEK GRID LAYOUT (Pristine grid scheduler for Desktop & larger viewports) */}
      {viewMode === 'grid' && (
        <div className="space-y-4">
          
          {/* Active Navigation scrollbar trigger (Perfect for Tablet users to slide horizontally) */}
          <div className="flex justify-between items-center bg-[#FFF5F5]/40 p-4 border border-neutral-200/50 rounded-2xl print:hidden">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B3181C] animate-pulse" />
              <p className="text-[10px] font-extrabold text-[#291715] uppercase tracking-wider">
                Support Défilement Tactile & Tablette
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => scrollGrid('left')}
                className="w-8 h-8 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 flex items-center justify-center active:scale-95 transition-all shadow-3xs cursor-pointer"
                title="Défiler à gauche"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={() => scrollGrid('right')}
                className="w-8 h-8 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 flex items-center justify-center active:scale-95 transition-all shadow-3xs cursor-pointer"
                title="Défiler à droite"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div 
            ref={gridContainerRef}
            className="overflow-x-auto rounded-3xl border border-neutral-gray-200/95 bg-white shadow-3xs select-none smooth-scroll leading-none"
          >
            <table className="w-full border-collapse table-fixed min-w-[980px]">
              <thead>
                <tr className="bg-[#FFF5F5]/40 border-b border-neutral-200">
                  <th className="w-[100px] h-14 text-center text-[10px] font-black text-neutral-500 tracking-widest uppercase border-r border-neutral-150">
                    Horaire
                  </th>
                  {['LUN', 'MAR', 'MER', 'JEU', 'VEN'].map((day) => {
                    const dayLabels: Record<string, string> = {
                      LUN: 'LUNDI',
                      MAR: 'MARDI',
                      MER: 'MERCREDI',
                      JEU: 'JEUDI',
                      VEN: 'VENDREDI'
                    };
                    const dayDates: Record<string, string> = {
                      LUN: '23 Oct',
                      MAR: '24 Oct',
                      MER: '25 Oct',
                      JEU: '26 Oct',
                      VEN: '27 Oct'
                    };
                    return (
                      <th key={day} className="h-14 text-center border-r border-neutral-150 p-2">
                        <span className="block text-xs font-black text-[#291715] tracking-widest">
                          {dayLabels[day]}
                        </span>
                        <span className="block text-[10px] text-[#B3181C] font-semibold tracking-wider mt-1">{dayDates[day]}</span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              
              <tbody className="divide-y divide-neutral-150">
                {/* Hour Rows */}
                {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((time) => {
                  
                  if (time === '12:00') {
                    return (
                      <tr key={time} className="bg-[#FAF8F6] border-y border-neutral-200/60 select-none">
                        <td className="h-12 text-center font-black text-[10.5px] text-neutral-500 border-r border-neutral-150 flex items-center justify-center gap-1.5 bg-[#FFF5F5]/20">
                          <Coffee className="h-3.5 w-3.5 text-[#B3181C]" />
                          <span>12:00</span>
                        </td>
                        <td colSpan={5} className="h-12 text-center bg-gradient-to-r from-transparent via-[#FFF5F5]/40 to-transparent">
                          <div className="flex items-center justify-center gap-2 text-[10px] font-black tracking-widest text-[#B3181C] uppercase py-1">
                            <Coffee className="h-4 w-4 animate-bounce shrink-0" />
                            <span>Pause Déjeuner Sénégalaise · Repos académique</span>
                            <Coffee className="h-4 w-4 animate-bounce shrink-0" />
                          </div>
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={time} className="hover:bg-neutral-50/50 transition-colors">
                      {/* Left hour column cell */}
                      <td className="h-28 text-center text-xs font-bold text-neutral-500 border-r border-neutral-150 align-top pt-3.5">
                        {time}
                      </td>

                      {/* Day column cells */}
                      {['LUN', 'MAR', 'MER', 'JEU', 'VEN'].map((day) => {
                        // Match courses starting during this specific hour block (or span)
                        const matchedCourse = schedule.find((c) => {
                          const hourNum = parseInt(c.heureDebut.split(':')[0]);
                          const targetHourNum = parseInt(time.split(':')[0]);
                          return c.jour === day && hourNum === targetHourNum;
                        });

                        // Check if another course sits in this block (for spans / gaps)
                        const isOccupiedByPrior = schedule.some((c) => {
                          const startH = parseInt(c.heureDebut.split(':')[0]);
                          const endH = parseInt(c.heureFin.split(':')[0]);
                          const targetH = parseInt(time.split(':')[0]);
                          return c.jour === day && targetH > startH && targetH < endH;
                        });

                        if (isOccupiedByPrior) {
                          return null;
                        }

                        // Compute span heights
                        let rowSpan = 1;
                        if (matchedCourse) {
                          const startH = parseInt(matchedCourse.heureDebut.split(':')[0]);
                          const endH = parseInt(matchedCourse.heureFin.split(':')[0]);
                          rowSpan = Math.max(1, endH - startH);
                          if (startH < 12 && endH > 12) {
                            rowSpan -= 1; 
                          }
                        }

                        const match = matchedCourse ? fitsFilters(matchedCourse) : false;

                        return (
                          <td 
                            key={day} 
                            rowSpan={rowSpan} 
                            className={`p-2 border-r border-neutral-gray-150 align-top ${
                              matchedCourse ? 'h-auto' : 'h-28'
                            }`}
                          >
                            {matchedCourse ? (
                              <div 
                                onClick={() => match && setActivePlanCourse(matchedCourse)}
                                style={{ height: `${rowSpan * 105}px` }}
                                className={`p-3.5 border-l-4 rounded-2xl transition-all duration-305 flex flex-col justify-between group overflow-hidden ${
                                  !match
                                    ? 'opacity-10 grayscale scale-[0.98] pointer-events-none border-neutral-gray-200 select-none bg-neutral-gray-50/50 shadow-none'
                                    : matchedCourse.status === 'actuel'
                                      ? 'bg-[#B3181C] text-white border-white/50 shadow-md ring-4 ring-[#B3181C]/5 cursor-pointer hover:shadow-lg scale-101'
                                      : matchedCourse.type === 'CM'
                                        ? 'bg-[#FFF5F5] border-[#B3181C] hover:bg-[#ffebeb] text-[#291715] cursor-pointer hover:shadow-xs border-l-4'
                                        : matchedCourse.type === 'TP'
                                          ? 'bg-[#E1F7EC] border-[#10B981] hover:bg-[#d0f2df] text-neutral-850 text-neutral-800 cursor-pointer hover:shadow-xs border-l-4'
                                          : 'bg-blue-50/70 border-blue-500 hover:bg-blue-100 text-neutral-800 cursor-pointer hover:shadow-xs border-l-4'
                                }`}
                              >
                                <div>
                                  <div className="flex justify-between items-center mb-1.5">
                                    <span className={`text-[9px] font-black tracking-wider uppercase ${
                                      matchedCourse.status === 'actuel' ? 'text-white/80' : 'text-neutral-400'
                                    }`}>
                                      {matchedCourse.heureStr}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black tracking-widest ${
                                      matchedCourse.status === 'actuel' 
                                        ? 'bg-white/20 text-white' 
                                        : 'bg-white text-[#B3181C] border border-[#B3181C]/10'
                                    }`}>
                                      {matchedCourse.type}
                                    </span>
                                  </div>
                                  
                                  <h4 className={`font-black text-xs leading-snug tracking-tight group-hover:text-[#B3181C] transition-colors break-words text-ellipsis line-clamp-2 ${
                                    matchedCourse.status === 'actuel' ? 'text-white group-hover:text-white' : 'text-[#291715]'
                                  }`}>
                                    {matchedCourse.nom}
                                  </h4>
                                  
                                  <p className={`text-[10px] leading-tight font-semibold mt-1 truncate ${
                                    matchedCourse.status === 'actuel' ? 'text-white/80' : 'text-neutral-400'
                                  }`}>
                                    {matchedCourse.professeur}
                                  </p>
                                </div>

                                <div className="mt-2.5 pt-2 border-t border-neutral-200/10 flex items-center justify-between gap-1 select-none">
                                  <span className={`text-[9px] flex items-center gap-1 font-black ${
                                    matchedCourse.status === 'actuel' ? 'text-white/90' : 'text-[#B3181C]'
                                  }`}>
                                    <MapPin className="h-3 w-3" />
                                    {matchedCourse.salle}
                                  </span>
                                  
                                  <span className={`text-[8.5px] font-black uppercase tracking-widest group-hover:inline-block hidden ${
                                    matchedCourse.status === 'actuel' ? 'text-white/95' : 'text-[#B3181C]'
                                  }`}>
                                    Agenda &rarr;
                                  </span>
                                </div>

                              </div>
                            ) : null}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Statistics and Insights Indicators (Fitted perfectly in rows) */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="p-6 bg-white border border-neutral-gray-200/90 rounded-3xl shadow-3xs flex items-center gap-5 hover:border-neutral-300 transition-all select-none">
          <div className="w-14 h-14 bg-[#FFF5F5] rounded-2xl flex items-center justify-center text-[#B3181C] shrink-0">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-black text-neutral-400 text-[10px] uppercase tracking-wider mb-0.5">Volume hebdomadaire</h3>
            <p className="text-2xl font-black text-[#291715] leading-none">24 Heures</p>
            <p className="text-[10px] text-[#B3181C] font-extrabold mt-1.5 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Conforme syllabus École 221
            </p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-6 bg-white border border-neutral-gray-200/90 rounded-3xl shadow-3xs flex items-center gap-5 hover:border-neutral-300 transition-all select-none">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2563EB] shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-black text-neutral-400 text-[10px] uppercase tracking-wider mb-0.5">Assiduité requise</h3>
            <p className="text-2xl font-black text-on-surface leading-none">100% Recommandé</p>
            <p className="text-[10px] text-neutral-400 font-bold mt-1.5">Rapport d'absence sous 48h</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-6 bg-white border border-neutral-gray-200/90 rounded-3xl shadow-3xs flex items-center gap-5 hover:border-neutral-300 transition-all select-none sm:col-span-2 lg:col-span-1">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-[#10B981] shrink-0">
            <FileSpreadsheet className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-black text-neutral-400 text-[10px] uppercase tracking-wider mb-0.5">Méthode pédagogique</h3>
            <p className="text-2xl font-black text-on-surface leading-none">Mode Hybride</p>
            <p className="text-[10px] text-neutral-450 text-neutral-500 font-bold mt-1.5">Documents & Devoirs synchronisés</p>
          </div>
        </div>

      </div>

    </div>
  );
}
