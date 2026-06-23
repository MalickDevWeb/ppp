import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Calendar, 
  Search, 
  MapPin, 
  User, 
  ExternalLink, 
  FileDown, 
  CheckCircle, 
  Video, 
  Notebook, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Sparkles, 
  X,
  QrCode
} from 'lucide-react';

// Data types for interactive courses
export interface CourseSession {
  id: string;
  nom: string;
  jour: 'LUN' | 'MAR' | 'MER' | 'JEU' | 'VEN';
  jourNom: string;
  heure: string;
  salle: string;
  professeur: string;
  type: 'CM' | 'TD' | 'TP';
  enCours?: boolean;
  color?: string;
  syllabus?: string;
}

// Interactive dataset for multiple levels and weeks
const GROUP_CLASSES: Record<string, { currentWeek: CourseSession[]; nextWeek: CourseSession[] }> = {
  'L3GL': {
    currentWeek: [
      {
        id: 'c1',
        nom: "Algorithmique Avancée",
        jour: 'LUN',
        jourNom: "Lundi",
        heure: "08:00 - 10:00",
        salle: "Amphi A",
        professeur: "Dr. Aly Diatta",
        type: 'CM',
        syllabus: "Graphes, algorithmes de plus court chemin (Dijkstra, Bellman-Ford) et programmation dynamique. Exercices pratiques et évaluations continues."
      },
      {
        id: 'c2',
        nom: "Projet Web Framework",
        jour: 'MAR',
        jourNom: "Mardi",
        heure: "09:00 - 12:00",
        salle: "Labo 3",
        professeur: "M. Malick Teuw",
        type: 'TP',
        syllabus: "Mise en pratique de React, Vite, Tailwind CSS et intégration d'APIs tierces. Développement d'une application d'école complète en équipe."
      },
      {
        id: 'c3',
        nom: "Machine Learning (ML)",
        jour: 'MER',
        jourNom: "Mercredi",
        heure: "12:00 - 14:00",
        salle: "Visioconférence",
        professeur: "Dr. Cheikh Anta",
        type: 'CM',
        enCours: true,
        syllabus: "Introduction aux algorithmes de régression, de classification, aux réseaux de neurones artificiels et à l'ingénierie des caractéristiques."
      },
      {
        id: 'c4',
        nom: "Systèmes d'Information",
        jour: 'JEU',
        jourNom: "Jeudi",
        heure: "14:00 - 16:00",
        salle: "Salle 102",
        professeur: "Mme. Seynabou",
        type: 'TD',
        syllabus: "Modélisation stratégique des processus d'affaires, gouvernance IT, diagrammes de flux de données et architecture d'entreprise UML."
      },
      {
        id: 'c5',
        nom: "Anglais Technique",
        jour: 'VEN',
        jourNom: "Vendredi",
        heure: "10:00 - 12:00",
        salle: "Salle 204",
        professeur: "Mr. John Mitchell",
        type: 'TD',
        syllabus: "Communication en milieu professionnel informatique, présentations orales, documentation technique en anglais et préparation aux entretiens."
      }
    ],
    nextWeek: [
      {
        id: 'c1_next',
        nom: "Séminaire NoSQL",
        jour: 'LUN',
        jourNom: "Lundi",
        heure: "08:00 - 10:00",
        salle: "Labo 4",
        professeur: "Dr. Aly Diatta",
        type: 'TD',
        syllabus: "Étude comparative des bases de données orientées documents (MongoDB), orientées colonnes (Cassandra) et clés-valeurs (Redis)."
      },
      {
        id: 'c2_next',
        nom: "Projet Web Framework (Workshop)",
        jour: 'MAR',
        jourNom: "Mardi",
        heure: "09:00 - 12:00",
        salle: "Labo 3",
        professeur: "M. Malick Teuw",
        type: 'TP',
        syllabus: "Hackathon interne pour présenter les interfaces et l'intégration de la base de données. Évaluation formative en direct."
      },
      {
        id: 'c3_next',
        nom: "Machine Learning - Examen Partiel",
        jour: 'MER',
        jourNom: "Mercredi",
        heure: "12:00 - 14:00",
        salle: "Amphi A",
        professeur: "Dr. Cheikh Anta",
        type: 'CM',
        syllabus: "Évaluation sur table couvrant les chapitres 1 à 4: Régression linéaire, régression logistique, arbres de décision et métriques d'évaluation."
      },
      {
        id: 'c4_next',
        nom: "Modélisation Avancée UML",
        jour: 'JEU',
        jourNom: "Jeudi",
        heure: "14:00 - 16:00",
        salle: "Salle 102",
        professeur: "Mme. Seynabou",
        type: 'TD',
        syllabus: "Diagrammes de classes, diagrammes de séquence avancés et conception orientée objet robuste avec patrons de conception (Design Patterns)."
      },
      {
        id: 'c5_next',
        nom: "Anglais Technique - Présentations",
        jour: 'VEN',
        jourNom: "Vendredi",
        heure: "10:00 - 12:00",
        salle: "Salle 204",
        professeur: "Mr. John Mitchell",
        type: 'TD',
        syllabus: "Soutenance orale individuelle en visioconférence ou en classe sur un projet technique informatique à grand impact."
      }
    ]
  },
  'L2SR': {
    currentWeek: [
      {
        id: 'c1_l2',
        nom: "Architecture des Réseaux",
        jour: 'LUN',
        jourNom: "Lundi",
        heure: "10:00 - 12:00",
        salle: "Labo 1",
        professeur: "M. Ibrahima Cissé",
        type: 'CM',
        syllabus: "Introduction au modèle OSI, protocole TCP/IP, adressage sous-réseau IPv4/IPv6 et configuration d'équipements actifs."
      },
      {
        id: 'c2_l2',
        nom: "Bases de Données Relationnelles",
        jour: 'MAR',
        jourNom: "Mardi",
        heure: "14:00 - 17:00",
        salle: "Labo 2",
        professeur: "Mme. Fatou Fall",
        type: 'TP',
        syllabus: "Conception de schémas logiques de données (MCD/MLD) et écriture de requêtes SQL complexes (jointures, regroupements, sous-requêtes)."
      },
      {
        id: 'c3_l2',
        nom: "Systèmes d'Exploitation (OS)",
        jour: 'MER',
        jourNom: "Mercredi",
        heure: "08:00 - 10:00",
        salle: "Amphi B",
        professeur: "Dr. Diallo",
        type: 'CM',
        syllabus: "Gestion des processus, ordonnancement CPU, allocation mémoire virtuelle, gestion de fichiers et commandes Unix fondamentales."
      },
      {
        id: 'c4_l2',
        nom: "Réseaux Mobiles et Sans Fil",
        jour: 'JEU',
        jourNom: "Jeudi",
        heure: "10:00 - 12:00",
        salle: "Salle 104",
        professeur: "M. Ousmane Ndiaye",
        type: 'TD',
        syllabus: "Principes de transmission radio, architectures des réseaux cellulaires (2G/3G/4G/5G) et sécurité des communications WiFi."
      },
      {
        id: 'c5_l2',
        nom: "Économie du Numérique",
        jour: 'VEN',
        jourNom: "Vendredi",
        heure: "14:00 - 16:00",
        salle: "Salle 101",
        professeur: "Dr. Sokhna Ba",
        type: 'TD',
        syllabus: "Modèles économiques de l'internet, disruption digitale, plateformisation, gestion des startups et économie d'échelle sur les tech du cloud."
      }
    ],
    nextWeek: [
      {
        id: 'c1_l2_next',
        nom: "Routage Réseau Statique",
        jour: 'LUN',
        jourNom: "Lundi",
        heure: "10:00 - 12:00",
        salle: "Labo 1",
        professeur: "M. Ibrahima Cissé",
        type: 'CM',
        syllabus: "Création et gestion de tables de routage, routage statique, configuration CISCO et principes d'analyse de trames Wireshark."
      },
      {
        id: 'c2_l2_next',
        nom: "Bases de Données (Optimisation)",
        jour: 'MAR',
        jourNom: "Mardi",
        heure: "14:00 - 17:00",
        salle: "Labo 2",
        professeur: "Mme. Fatou Fall",
        type: 'TP',
        syllabus: "Création d'index logiques, triggers, procédures stockées, transactionnalité et plans d'exécution de requêtes PostgreSQL."
      },
      {
        id: 'c3_l2_next',
        nom: "Scripting Shell / Linux",
        jour: 'MER',
        jourNom: "Mercredi",
        heure: "08:00 - 10:00",
        salle: "Amphi B",
        professeur: "Dr. Diallo",
        type: 'CM',
        syllabus: "Développement d'automatisation système Linux, scripts Bash complexes, traitement régulier des fichiers textes (grep, sed, awk)."
      },
      {
        id: 'c4_l2_next',
        nom: "Tracé Réseau Sans Fil (Examen)",
        jour: 'JEU',
        jourNom: "Jeudi",
        heure: "10:00 - 12:00",
        salle: "Salle 104",
        professeur: "M. Ousmane Ndiaye",
        type: 'TD',
        syllabus: "Examen de mi-parcours chronométré portant sur la planification de couverture radio d'un campus universitaire."
      },
      {
        id: 'c5_l2_next',
        nom: "Économie du Numérique (Séance)",
        jour: 'VEN',
        jourNom: "Vendredi",
        heure: "14:00 - 16:00",
        salle: "Salle 101",
        professeur: "Dr. Sokhna Ba",
        type: 'TD',
        syllabus: "Analyse d'études de cas réels : modèle de revenus d'Uber, d'Airbnb, et la transition SaaS d'entreprises historiques."
      }
    ]
  },
  'M1IA': {
    currentWeek: [
      {
        id: 'c1_m1',
        nom: "Réseaux de Neurones Profonds (DL)",
        jour: 'LUN',
        jourNom: "Lundi",
        heure: "14:00 - 17:00",
        salle: "Visioconférence",
        professeur: "Prof. Samb",
        type: 'CM',
        syllabus: "Concepts fondamentaux du Deep Learning, rétropropagation du gradient, de l'optimisation par descente de gradient, et réseaux convolutifs (CNN)."
      },
      {
        id: 'c2_m1',
        nom: "Natural Language Processing (NLP)",
        jour: 'MAR',
        jourNom: "Mardi",
        heure: "08:00 - 11:00",
        salle: "Labo IA",
        professeur: "Dr. Cheikh Anta",
        type: 'TP',
        syllabus: "Traitement préalable de textes en Python, modélisation vectorielle (TF-IDF, Word2Vec), réseaux de neurones récurrents (LSTM) et transformers."
      },
      {
        id: 'c3_m1',
        nom: "Vision par Ordinateur",
        jour: 'MER',
        jourNom: "Mercredi",
        heure: "10:00 - 12:00",
        salle: "Salle M1",
        professeur: "Prof. Seydou",
        type: 'CM',
        syllabus: "Segmentation d'images, détection d'objets en temps réel (YOLO), floutages, filtres convolutifs, classification de visages par OpenCV."
      },
      {
        id: 'c4_m1',
        nom: "Langages de Scripting pour l'IA",
        jour: 'JEU',
        jourNom: "Jeudi",
        heure: "12:00 - 14:00",
        salle: "Salle 103",
        professeur: "M. Fall",
        type: 'TD',
        syllabus: "Exploitation avancée de Pandas, NumPy, Scikit-Learn et pipeline généralisé de data science de l'ingestion de données au modèle."
      },
      {
        id: 'c5_m1',
        nom: "Éthique et Gouvernance de l'IA",
        jour: 'VEN',
        jourNom: "Vendredi",
        heure: "09:00 - 11:00",
        salle: "Amphi A",
        professeur: "Mme. Sarr",
        type: 'TD',
        syllabus: "Analyse des biais algorithmiques, sécurité des modèles d'IA, réglementation internationale (EU AI Act, RGPD) et explicabilité (XAI)."
      }
    ],
    nextWeek: [
      {
        id: 'c1_m1_next',
        nom: "Transformers et LLMs",
        jour: 'LUN',
        jourNom: "Lundi",
        heure: "14:00 - 17:00",
        salle: "Visioconférence",
        professeur: "Prof. Samb",
        type: 'CM',
        syllabus: "Étude théorique du mécanisme de self-attention des modèles Transformers. Fine-tuning de modèles pré-entraînés BERT/GPT."
      },
      {
        id: 'c2_m1_next',
        nom: "NLP (Projets R&D)",
        jour: 'MAR',
        jourNom: "Mardi",
        heure: "08:00 - 11:00",
        salle: "Labo IA",
        professeur: "Dr. Cheikh Anta",
        type: 'TP',
        syllabus: "Présentation de projets de traduction automatique Wolof-Français utilisant des modèles de séquences à séquences optimisés."
      },
      {
        id: 'c3_m1_next',
        nom: "Vision par Ordinateur (Pratique)",
        jour: 'MER',
        jourNom: "Mercredi",
        heure: "10:00 - 12:00",
        salle: "Salle M1",
        professeur: "Prof. Seydou",
        type: 'CM',
        syllabus: "Mise en place d'un système de classification de véhicules scolaires par caméra avec mesure de vitesse en temps réel."
      },
      {
        id: 'c4_m1_next',
        nom: "Scripting IA - Flask/FastAPI Deployment",
        jour: 'JEU',
        jourNom: "Jeudi",
        heure: "12:00 - 14:00",
        salle: "Salle 103",
        professeur: "M. Fall",
        type: 'TD',
        syllabus: "Comment packager un modèle pré-entraîné PyTorch en API Web REST performante avec Docker et déploiement cloud."
      },
      {
        id: 'c5_m1_next',
        nom: "Régulation des algorithmes",
        jour: 'VEN',
        jourNom: "Vendredi",
        heure: "09:00 - 11:00",
        salle: "Amphi A",
        professeur: "Mme. Sarr",
        type: 'TD',
        syllabus: "Atelier débat autour de l'utilisation de la reconnaissance faciale publique et les limites de souveraineté des données d'IA."
      }
    ]
  }
};

// Available Days order
const DAYS_ORDER: { key: 'LUN' | 'MAR' | 'MER' | 'JEU' | 'VEN'; name: string }[] = [
  { key: 'LUN', name: 'LUNDI' },
  { key: 'MAR', name: 'MARDI' },
  { key: 'MER', name: 'MERCREDI' },
  { key: 'JEU', name: 'JEUDI' },
  { key: 'VEN', name: 'VENDREDI' }
];

export function CalendarWidget({ variant = 'default' }: { variant?: 'default' | 'transparent' } = {}) {
  const [level, setLevel] = useState<'L3GL' | 'L2SR' | 'M1IA'>('L3GL');
  const [weekType, setWeekType] = useState<'currentWeek' | 'nextWeek'>('currentWeek');
  const [viewType, setViewType] = useState<'weekly' | 'monthly'>('weekly');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive selected course modal state
  const [selectedCourse, setSelectedCourse] = useState<CourseSession | null>(null);
  
  // Simulated student note system
  const [sessionNotes, setSessionNotes] = useState<string>('');
  const [isNotesSaved, setIsNotesSaved] = useState(false);
  
  // Simulated QR Code Presence state
  const [showQRModal, setShowQRModal] = useState(false);
  const [presenceSuccess, setPresenceSuccess] = useState(false);
  const [presenceLoading, setPresenceLoading] = useState(false);

  // Simulated download state
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Simulated system notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Handler for course selection with state initialization
  const handleSelectCourse = (course: CourseSession) => {
    setSelectedCourse(course);
    const savedNote = localStorage.getItem(`note_${level}_${course.id}`);
    setSessionNotes(savedNote || '');
    setIsNotesSaved(false);
    setPresenceSuccess(false);
    setShowQRModal(false);
  };

  // Show customized toasts
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Save student digital note to local storage
  const handleSaveNotes = () => {
    if (!selectedCourse) return;
    localStorage.setItem(`note_${level}_${selectedCourse.id}`, sessionNotes);
    setIsNotesSaved(true);
    triggerToast("Notes enregistrées avec succès !");
  };

  // Simulate downloading course materials pdf with loading animation bar
  const handleDownloadMaterials = (courseId: string) => {
    setDownloadingId(courseId);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadingId(null);
            triggerToast("Dossier Cours_Supports.pdf enregistré !");
          }, 350);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  // Simulate scanning student card QR for bio confirmation attendance
  const triggerAttendanceScan = () => {
    setPresenceLoading(true);
    setTimeout(() => {
      setPresenceLoading(false);
      setPresenceSuccess(true);
      triggerToast("Présence enregistrée à 12:05 avec succès !");
    }, 1500);
  };

  // Retrieve matching schedules
  const rawSessions = GROUP_CLASSES[level]?.[weekType] || [];
  
  // Apply Search Filters
  const displayedSessions = rawSessions.filter(c => {
    const q = searchQuery.toLowerCase();
    return (
      c.nom.toLowerCase().includes(q) ||
      c.professeur.toLowerCase().includes(q) ||
      c.salle.toLowerCase().includes(q) ||
      c.jourNom.toLowerCase().includes(q)
    );
  });

  // Simulated Monthly Grid Data of June 2026
  // June 2026 starts on Monday June 1st.
  const totalDaysInJune = 30;
  const juneDays = Array.from({ length: totalDaysInJune }, (_, idx) => {
    const dayNumber = idx + 1;
    // Calculate weekday: day 1 is Monday, day 2 is Tuesday, etc. Index mod 7.
    const dayOfWeekIndex = idx % 7; 
    const daysNameMap = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const dayName = daysNameMap[dayOfWeekIndex];
    
    // Map class dots onto weekdays (Lundi to Vendredi)
    let hasClass = false;
    let mainColor = '';
    let classItem: CourseSession | undefined;

    if (dayOfWeekIndex < 5) {
      const dayKeys: ('LUN' | 'MAR' | 'MER' | 'JEU' | 'VEN')[] = ['LUN', 'MAR', 'MER', 'JEU', 'VEN'];
      const currentDayKey = dayKeys[dayOfWeekIndex];
      classItem = rawSessions.find(s => s.jour === currentDayKey);
      if (classItem) {
        hasClass = true;
        mainColor = classItem.type === 'CM' ? '#3B82F6' : (classItem.type === 'TP' ? '#10B981' : '#F59E0B');
      }
    }

    return {
      dayNumber,
      dayName,
      dayOfWeekIndex,
      hasClass,
      mainColor,
      classItem
    };
  });

  // Active selected day for the Month Grid View (Defaults to 24th which is Wednesday)
  const [selectedMonthDayIdx, setSelectedMonthDayIdx] = useState<number>(23); // Day 24 is index 23 (Wednesday)
  const selectedDayInfo = juneDays[selectedMonthDayIdx];

  return (
    <div className={`w-full flex flex-col justify-start overflow-hidden text-neutral-800 ${
      variant === 'transparent' 
        ? 'bg-transparent p-0 border-0 shadow-none' 
        : 'bg-white md:bg-white/10 p-5 md:p-6 rounded-3xl border border-neutral-100/90 shadow-sm'
    }`}>
      
      {/* Dynamic Toast Message Box */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-neutral-900 border border-neutral-800 text-white font-extrabold text-xs px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 z-[120] animate-bounce">
          <CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Module 1: Top Navigation Panel & Filters */}
      <div className="space-y-4 shrink-0 mb-4">
        
        {/* Dynamic Title and Week Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-[#B3181C]/5 flex items-center justify-center rounded-xl text-[#B3181C]">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-sm text-[#291715] tracking-tight">
                Emploi du temps hebdomadaire
              </h3>
              <p className="text-[10.5px] text-neutral-400 font-bold">
                Affichage personnalisé & interactif
              </p>
            </div>
          </div>

          {/* Week type controls */}
          <div className="flex items-center gap-1.5 self-start sm:self-center">
            <button
              onClick={() => {
                setWeekType('currentWeek');
                triggerToast("Affichage : Semaine Courante");
              }}
              className={`px-3 py-1.5 rounded-full text-[10.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                weekType === 'currentWeek' 
                  ? 'bg-[#B3181C]/10 text-[#B3181C] border border-[#B3181C]/20 shadow-xs' 
                  : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100 border border-transparent'
              }`}
            >
              Semaine Courante
            </button>
            <button
              onClick={() => {
                setWeekType('nextWeek');
                triggerToast("Affichage : Semaine Prochaine");
              }}
              className={`px-3 py-1.5 rounded-full text-[10.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                weekType === 'nextWeek' 
                  ? 'bg-[#B3181C]/10 text-[#B3181C] border border-[#B3181C]/20 shadow-xs' 
                  : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100 border border-transparent'
              }`}
            >
              Semaine Prochaine
            </button>
          </div>
        </div>

        {/* Dynamic Switchers & Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
          
          {/* Level Switcher dropdown input */}
          <div className="sm:col-span-4 relative">
            <span translate="no" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-neutral-400 pointer-events-none font-bold">
              <Filter className="h-3.5 w-3.5" />
            </span>
            <select
              value={level}
              onChange={(e) => {
                setLevel(e.target.value as 'L3GL' | 'L2SR' | 'M1IA');
                triggerToast(`Classe changée : ${e.target.value}`);
              }}
              className="w-full h-[38px] pl-9 pr-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-black text-[#291715] shadow-2xs outline-none focus:border-[#B3181C] focus:ring-1 focus:ring-[#B3181C]/25 transition-all"
            >
              <option value="L3GL">Licence 3 - Génie Logiciel</option>
              <option value="L2SR">Licence 2 - Systèmes & Réseaux</option>
              <option value="M1IA">Master 1 - Intelligence Artificielle</option>
            </select>
          </div>

          {/* Search box filters */}
          <div className="sm:col-span-5 relative">
            <span translate="no" className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              <Search className="h-3.5 w-3.5" />
            </span>
            <input
              type="text"
              placeholder="Rechercher cours, salle, prof..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[38px] pl-9 pr-4 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-[#291715] placeholder-neutral-400 shadow-2xs outline-none focus:border-[#B3181C] focus:ring-1 focus:ring-[#B3181C]/25 transition-all"
            />
          </div>

          {/* Grid view vs Month calendar Switcher */}
          <div className="sm:col-span-3 flex bg-neutral-100 p-1 rounded-xl h-[38px]">
            <button
              onClick={() => {
                setViewType('weekly');
                triggerToast("Affichage en grille hebdomadaire");
              }}
              className={`flex-1 rounded-lg text-[10px] font-black uppercase text-center transition-all cursor-pointer ${
                viewType === 'weekly' ? 'bg-white text-[#B3181C] shadow-2xs' : 'text-neutral-500 hover:text-[#291715]'
              }`}
            >
              Hebdo
            </button>
            <button
              onClick={() => {
                setViewType('monthly');
                triggerToast("Affichage mensuel interactif");
              }}
              className={`flex-1 rounded-lg text-[10px] font-black uppercase text-center transition-all cursor-pointer ${
                viewType === 'monthly' ? 'bg-white text-[#B3181C] shadow-2xs' : 'text-neutral-500 hover:text-[#291715]'
              }`}
            >
              Mensuel
            </button>
          </div>

        </div>

      </div>

      {/* Module 2: The Core Body of the Calendar (Hebdo / Monthly grid Scrollable) */}
      <div className="flex-grow overflow-y-auto no-scrollbar min-h-[300px] flex flex-col justify-start">
        
        {/* VIEW 1: WEEKLY COLUMNS (Exactly like mockup, but scrollable & interactive) */}
        {viewType === 'weekly' && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 h-full items-start">
            {DAYS_ORDER.map((dayObj) => {
              // Find course belonging to day from search results
              const session = displayedSessions.find(s => s.jour === dayObj.key);
              
              const isToday = dayObj.key === 'MER'; // Simulating today is Mercredi
              const isDirect = session?.enCours;

              return (
                <div
                  key={dayObj.key}
                  onClick={() => {
                    if (session) {
                      handleSelectCourse(session);
                    }
                  }}
                  className={`p-3 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative cursor-pointer select-none group min-h-[130px] md:h-[190px] ${
                    isDirect
                      ? 'bg-[#FFF5F5] border-[#B3181C] shadow-sm shadow-[#B3181C]/5 ring-1 ring-[#B3181C]/20 scale-[1.01]'
                      : isToday
                        ? 'bg-[#FAF8F6] border-[#B3181C]/30 hover:bg-[#FFF5F5]/30 hover:border-[#B3181C]/50 hover:scale-[1.01]'
                        : 'bg-white border-neutral-150 hover:bg-[#FFF5F5]/30 hover:border-[#B3181C]/30 hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex flex-col flex-grow justify-between">
                    {/* Column Day Title Header */}
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-neutral-100">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        isDirect || isToday ? 'text-[#B3181C]' : 'text-[#8E7977]'
                      }`}>
                        {dayObj.name}
                      </span>
                      {isDirect && (
                        <div className="flex items-center gap-1">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B3181C] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B3181C]"></span>
                          </span>
                        </div>
                      )}
                    </div>

                    {session ? (
                      <div className="flex flex-col flex-grow justify-between min-h-[85px] md:min-h-[105px]">
                        
                        {/* Time duration range */}
                        <div className="mb-0.5 pointer-events-none">
                          <span className={`text-[9.5px] font-bold font-mono tracking-tight ${
                            isDirect ? 'text-[#B3181C]' : 'text-neutral-400'
                          }`}>
                            {session.heure}
                          </span>
                        </div>

                        {/* Subject name */}
                        <div className="mb-1.5 pointer-events-none">
                          <h4 className={`text-[11.5px] font-black leading-snug tracking-tight line-clamp-2 transition-colors duration-200 ${
                            isDirect 
                              ? 'text-[#B3181C] hover:text-[#8F1316]' 
                              : 'text-[#291715] group-hover:text-[#B3181C]'
                          }`}>
                            {session.nom}
                          </h4>
                        </div>

                        {/* Location Details and Teacher */}
                        <div className="space-y-0.5 mt-auto pointer-events-none">
                          <div className="flex items-center gap-1 text-[9.5px] text-neutral-400 font-bold">
                            <MapPin className={`h-3 w-3 shrink-0 ${isDirect ? 'text-[#B3181C]/70' : 'text-neutral-400'}`} />
                            <span className="truncate">{session.salle}</span>
                          </div>
                          <div className="text-[9px] text-[#291715]/70 font-semibold truncate leading-none">
                            {session.professeur}
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-4 text-neutral-350 flex-grow h-full min-h-[110px] md:min-h-[105px]">
                        <span translate="no" className="material-symbols-outlined text-[18px] text-neutral-300 mb-0.5">beach_access</span>
                        <span className="text-[9px] font-black uppercase tracking-wider text-neutral-400">Libre</span>
                      </div>
                    )}

                  </div>

                  {/* Course Badge Accent on lower boundaries */}
                  {session && (
                    <div className="flex justify-between items-center mt-2.5 pt-1.5 border-t border-neutral-100/50">
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase ${
                        session.type === 'CM' 
                          ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                          : session.type === 'TP' 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {session.type}
                      </span>
                      {isDirect && (
                        <span className="text-[8px] font-black text-[#B3181C] uppercase tracking-wider animate-pulse">
                          Direct
                        </span>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

        {/* VIEW 2: INTERACTIVE MONTHLY CALENDAR GRID OF JUNE 2026 */}
        {viewType === 'monthly' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-full items-stretch">
            
            {/* The Date Picker box */}
            <div className="md:col-span-7 bg-white p-3.5 rounded-2xl border border-neutral-100 flex flex-col justify-between">
              
              <div className="flex items-center justify-between mb-3 shrink-0">
                <span className="text-[11.5px] font-black text-[#291715]">Juin 2026</span>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-neutral-100 rounded-lg cursor-pointer">
                    <ChevronLeft className="h-4 w-4 text-[#8E7977]" />
                  </button>
                  <button className="p-1 hover:bg-neutral-100 rounded-lg cursor-pointer">
                    <ChevronRight className="h-4 w-4 text-[#8E7977]" />
                  </button>
                </div>
              </div>

              {/* Day order labels */}
              <div className="grid grid-cols-7 gap-1 text-center font-black text-[9px] text-[#8E7977] mb-2">
                <span>LUN</span>
                <span>MAR</span>
                <span>MER</span>
                <span>JEU</span>
                <span>VEN</span>
                <span className="text-neutral-300">SAM</span>
                <span className="text-neutral-300">DIM</span>
              </div>

              {/* Month Numbers Grid */}
              <div className="grid grid-cols-7 gap-1.5 flex-grow">
                {juneDays.map((dayItem, dayIdx) => {
                  const isActive = selectedMonthDayIdx === dayIdx;
                  const isWeekend = dayItem.dayOfWeekIndex >= 5;

                  return (
                    <button
                      key={dayIdx}
                      onClick={() => setSelectedMonthDayIdx(dayIdx)}
                      className={`h-9 w-full rounded-xl flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#B3181C] text-white font-black shadow-md shadow-[#B3181C]/15 scale-[1.05]'
                          : isWeekend 
                            ? 'bg-neutral-50/50 text-neutral-300 text-xs font-semibold' 
                            : 'bg-white hover:bg-[#FFF5F5] hover:text-[#B3181C] border border-neutral-100 text-neutral-700 text-xs font-bold'
                      }`}
                    >
                      <span>{dayItem.dayNumber}</span>
                      
                      {/* Day dot marker indicating courses */}
                      {dayItem.hasClass && (
                        <span 
                          className="h-1.5 w-1.5 rounded-full absolute bottom-1"
                          style={{ backgroundColor: isActive ? '#FFFFFF' : dayItem.mainColor }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Side summary of selected day's schedules */}
            <div className="md:col-span-5 bg-neutral-50/60 rounded-2xl border border-neutral-150 p-4 flex flex-col justify-between">
              
              <div>
                <div className="pb-2 border-b border-neutral-200/50 mb-3 flex items-center justify-between">
                  <h4 className="font-extrabold text-[#291715] text-[11px] uppercase tracking-wide">
                    Journée du {selectedDayInfo.dayNumber} Juin
                  </h4>
                  <span className="text-[10px] text-[#8E7977] font-semibold">{selectedDayInfo.dayName}</span>
                </div>

                {selectedDayInfo.classItem ? (
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-xl border border-neutral-200/65 shadow-2xs">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[9.5px] font-black text-[#B3181C] font-mono leading-none">
                          {selectedDayInfo.classItem.heure}
                        </span>
                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase leading-none ${
                          selectedDayInfo.classItem.type === 'CM' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {selectedDayInfo.classItem.type}
                        </span>
                      </div>
                      
                      <h5 className="font-black text-xs text-[#291715] tracking-tight leading-snug mb-2">
                        {selectedDayInfo.classItem.nom}
                      </h5>

                      <div className="space-y-1 text-[10px] text-neutral-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-neutral-400" />
                          <span>{selectedDayInfo.classItem.salle}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-neutral-400" />
                          <span className="truncate">{selectedDayInfo.classItem.professeur}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[10px] text-neutral-400 leading-normal bg-white p-2.5 rounded-lg border border-neutral-100">
                      <span className="font-bold text-[#291715] block mb-0.5">Syllabus :</span>
                      {selectedDayInfo.classItem.syllabus}
                    </p>
                  </div>
                ) : (
                  <div className="py-12 text-center text-neutral-300">
                    <Calendar className="h-8 w-8 mx-auto stroke-1 text-neutral-200 mb-1" />
                    <p className="text-[10.5px] font-bold">Aucun cours planifié</p>
                    <p className="text-[9.5px] text-neutral-400">Profitez de cette journée libre pour vos révisions !</p>
                  </div>
                )}
              </div>

              {selectedDayInfo.classItem && (
                <button
                  onClick={() => handleSelectCourse(selectedDayInfo.classItem!)}
                  className="w-full py-2.5 bg-white hover:bg-[#FFF5F5] text-[#B3181C] border border-[#B3181C]/25 hover:border-[#B3181C] rounded-xl text-[10.5px] font-black transition-all cursor-pointer flex items-center justify-center gap-1 mt-4"
                >
                  <Sparkles className="h-3 w-3" />
                  Interagir & Prendre Notes
                </button>
              )}

            </div>

          </div>
        )}

      </div>

      {/* Module 3: Micro Footer */}
      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between mt-3 text-[9px] text-[#8E7977] shrink-0 font-bold">
        <span>* Sélectionnez un cours pour accéder aux ressources & prendre des notes</span>
        <span>Version 2.3 · École 221</span>
      </div>


      {/* ========================================================================= */}
      {selectedCourse && createPortal(
        <div className="fixed inset-0 z-[250] flex items-center justify-center bg-zinc-900/40 backdrop-blur-xs p-4 animate-fade-in">
          
          <div className="bg-white rounded-[28px] border border-neutral-200 shadow-[0_24px_54px_rgba(0,0,0,0.18)] max-w-2xl md:max-w-4xl w-full overflow-hidden flex flex-col justify-start animate-scale-up select-none">
            
            {/* Modal Crimson Header Banner */}
            <div className="bg-[#B3181C] text-white relative shrink-0 p-6 md:p-7 pb-5">
              <button 
                onClick={() => setSelectedCourse(null)}
                className="absolute top-5 right-5 text-white/80 hover:text-white h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex justify-between items-center mb-2.5 pr-8 select-none">
                <span className="font-extrabold uppercase font-mono text-[10.5px] tracking-widest text-[#FFF5F5]/90">
                  {selectedCourse.jourNom} · {selectedCourse.heure}
                </span>
                <span className="bg-white/12 border border-white/20 text-white font-black text-[9px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                  {selectedCourse.type}
                </span>
              </div>

              <h3 className="font-heading font-black text-xl md:text-2xl tracking-tight leading-tight pr-8 mt-1">
                {selectedCourse.nom}
              </h3>
            </div>

            {/* Modal Body container (Centered and 2-column non-scroll layout on desktop) */}
            <div className="p-6 md:p-7 space-y-6 overflow-y-auto max-h-[75vh] md:max-h-none md:overflow-visible">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Left Column - Details & Materials (md:col-span-7) */}
                <div className="md:col-span-7 space-y-5">
                  
                  {/* Card Meta row: Floor and Class details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    <div className="bg-[#FAF8F6] p-3.5 rounded-xl border border-[#E2DCDA]/65 flex items-center gap-3">
                      <div className="bg-sky-50 text-sky-600 h-9.5 w-9.5 rounded-xl flex items-center justify-center border border-sky-100/30 shrink-0">
                        <MapPin className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="text-[9px] text-neutral-400 font-black tracking-wider block mb-0.5 uppercase">LOCALISATION</span>
                        <span className="text-[12px] font-black text-[#291715]">{selectedCourse.salle}</span>
                      </div>
                    </div>

                    <div className="bg-[#FAF8F6] p-3.5 rounded-xl border border-[#E2DCDA]/65 flex items-center gap-3">
                      <div className="bg-emerald-50 text-emerald-600 h-9.5 w-9.5 rounded-xl flex items-center justify-center border border-emerald-100/30 shrink-0">
                        <User className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="text-[9px] text-neutral-400 font-black tracking-wider block mb-0.5 uppercase">PROFESSEUR</span>
                        <span className="text-[12px] font-black text-[#291715]">{selectedCourse.professeur}</span>
                      </div>
                    </div>

                  </div>

                  {/* Syllabus details */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-[#8E7977] font-black tracking-wider uppercase block select-none">
                      Description & Objectif du cours
                    </span>
                    <p className="text-[12px] text-neutral-600 leading-relaxed bg-[#FAF8F6] p-4.5 rounded-xl border border-[#E2DCDA]/50 font-medium">
                      {selectedCourse.syllabus}
                    </p>
                  </div>

                  {/* Attendance and Download modules */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                    
                    {/* Simulated Materials download tool */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-[#8E7977] font-black tracking-wider uppercase block select-none">
                        Supports pédagogiques
                      </span>
                      
                      {downloadingId === selectedCourse.id ? (
                        <div className="bg-[#FAF8F6] p-3.5 rounded-xl border border-neutral-200">
                          <div className="flex justify-between items-center mb-1 text-[10px] font-black text-neutral-500">
                            <span>Téléchargement...</span>
                            <span>{downloadProgress}%</span>
                          </div>
                          <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#B3181C] h-full transition-all duration-300 rounded-full"
                              style={{ width: `${downloadProgress}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDownloadMaterials(selectedCourse.id)}
                          className="w-full flex items-center justify-between p-3.5 bg-[#FAF8F6] hover:bg-[#FFF5F5] border border-neutral-250 hover:border-[#B3181C]/45 rounded-xl text-xs font-bold text-neutral-700 hover:text-[#B3181C] transition-all cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5 text-[11.5px] font-black text-neutral-700 hover:text-[#B3181C]">
                            <FileDown className="h-4.5 w-4.5 text-[#B3181C]/70" />
                            Cours_Supports.pdf
                          </span>
                          <span className="text-[9px] text-[#8E7977]/80 font-bold uppercase">14.2 MB</span>
                        </button>
                      )}
                    </div>

                    {/* Simulated presence flash registration check-in button */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-[#8E7977] font-black tracking-wider uppercase block select-none">
                        Présence en classe
                      </span>
                      
                      {presenceSuccess ? (
                        <div className="flex items-center gap-2 p-3.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-150 text-xs font-bold">
                          <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                          <span>Présence validée !</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowQRModal(true)}
                          className="w-full flex items-center justify-center gap-1.5 p-3.5 bg-[#B3181C] hover:bg-[#8F1316] text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm shadow-[#B3181C]/10"
                        >
                          <QrCode className="h-4.5 w-4.5" />
                          Flasher Présence
                        </button>
                      )}
                    </div>

                  </div>

                </div>

                {/* Right Column - Notebook & Live Interactive (md:col-span-5) */}
                <div className="md:col-span-5 space-y-5">
                  
                  {/* Active Direct Live visual joining simulated workspace */}
                  {selectedCourse.enCours && (
                    <div className="bg-[#FFF5F5] border border-[#B3181C]/65 p-4.5 rounded-xl space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B3181C] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B3181C]"></span>
                        </span>
                        <span className="text-[10.5px] font-black text-[#B3181C] uppercase tracking-wide">
                          CLASSE EN DIRECT EN CE MOMENT !
                        </span>
                      </div>
                      <p className="text-[12px] text-neutral-600 leading-relaxed font-medium">
                        La visioconférence en ligne de Dr. Cheikh Anta est en cours avec 24 élèves déjà connectés.
                      </p>
                      
                      <button
                        onClick={() => triggerToast("Connexion à l'espace virtuel Zoom/Teams...")}
                        className="w-full py-2.5 bg-[#B3181C] hover:bg-[#8F1316] text-white text-[11.5px] font-black rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Video className="h-4 w-4" />
                        Rejoindre l'Amphi Virtuel en Direct
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Student Personal Study notebook notes auto saved area */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between select-none">
                      <div className="flex items-center gap-1.5">
                        <Notebook className="h-4 w-4 text-[#B3181C]" />
                        <span className="text-[10.5px] font-black text-[#291715] uppercase tracking-wider">
                          Carnet de notes personnel
                        </span>
                      </div>
                      <span className="text-[9px] text-[#8E7977] font-semibold">Auto-enregistré</span>
                    </div>
                    
                    <textarea
                      value={sessionNotes}
                      onChange={(e) => {
                        setSessionNotes(e.target.value);
                        setIsNotesSaved(false);
                      }}
                      placeholder="Écrivez vos notes de révision ou vos devoirs ici pour ce cours..."
                      className="w-full h-[110px] md:h-[130px] p-4 text-[12.5px] leading-relaxed bg-[#FAF8F6] border border-neutral-250 rounded-xl outline-none focus:border-[#B3181C] focus:ring-1 focus:ring-[#B3181C]/15 transition-all text-[#291715] font-medium resize-none"
                    />

                    <div className="flex justify-end">
                      <button
                        onClick={handleSaveNotes}
                        disabled={isNotesSaved || !sessionNotes.trim()}
                        className={`px-5 py-2.5 text-[11px] font-black rounded-xl cursor-pointer transition-all flex items-center gap-1.5 ${
                          isNotesSaved 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                            : 'bg-[#FAF8F6] hover:bg-[#FFF5F5] text-neutral-700 hover:text-[#B3181C] border border-neutral-250 hover:border-[#B3181C]/20'
                        }`}
                      >
                        {isNotesSaved ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            Enregistré !
                          </>
                        ) : (
                          <>
                            Enregistrer
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Modal Bottom Close */}
            <div className="bg-[#FAF8F6] px-6.5 py-4 border-t border-[#E2DCDA]/70 flex justify-end shrink-0 select-none">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-5 py-2.5 bg-neutral-100 hover:bg-[#FFF5F5] text-neutral-700 hover:text-[#B3181C] border border-neutral-250 hover:border-[#B3181C]/15 text-[11px] font-black rounded-xl transition-all cursor-pointer"
              >
                Fermer
              </button>
            </div>

          </div>

        </div>,
        document.body
      )}

      {/* ========================================================================= */}
      {/* ================= SIMULATED Attendance REGISTRATION QR MODAL ============ */}
      {/* ========================================================================= */}
      {showQRModal && createPortal(
        <div className="fixed inset-0 z-[280] flex items-center justify-center bg-zinc-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-[24px] border border-neutral-200 p-6 max-w-[340px] w-full text-center space-y-4 animate-scale-up">
            
            <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
              <span className="text-[11px] font-black text-[#291715] uppercase tracking-wider">
                Badge de présence numérique
              </span>
              <button 
                onClick={() => setShowQRModal(false)}
                className="p-1 text-neutral-400 hover:text-[#291715] rounded-full cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-[11px] text-neutral-500 leading-normal">
              Flashez votre code ou cliquez pour simuler le scanneur de présence biométrique d'École 221.
            </p>

            {/* Simulated attendance QR image pulsing */}
            <div className="relative h-44 w-44 mx-auto bg-neutral-50 rounded-2xl border border-neutral-150 p-4 flex items-center justify-center shadow-inner group">
              
              {presenceLoading ? (
                <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center gap-1 z-10 transition-all rounded-2xl">
                  <div className="h-7 w-7 border-2 border-[#B3181C] border-t-transparent rounded-full animate-spin" />
                  <span className="text-[9.5px] font-black text-[#B3181C]">Authentification...</span>
                </div>
              ) : presenceSuccess ? (
                <div className="absolute inset-0 bg-emerald-500 text-white flex flex-col items-center justify-center gap-1 z-10 transition-all rounded-2xl animate-fade-in">
                  <CheckCircle className="h-10 w-10 animate-scale-up" />
                  <span className="text-xs font-black">Présence Confirmée !</span>
                </div>
              ) : null}

              {/* Pulsing visual scan line across standard QR graphic */}
              <div className="h-full w-full bg-slate-900/5 p-2 rounded-xl flex flex-col justify-between overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500 opacity-75 animate-pulse top-to-bottom-scan" />
                <svg viewBox="0 0 100 100" className="h-full w-full text-[#291715]">
                  <rect x="5" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="12" y="12" width="11" height="11" fill="currentColor" />
                  <rect x="70" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="77" y="12" width="11" height="11" fill="currentColor" />
                  <rect x="5" y="70" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="12" y="77" width="11" height="11" fill="currentColor" />
                  <rect x="40" y="40" width="20" height="20" fill="currentColor" />
                  <rect x="40" y="10" width="10" height="20" fill="currentColor" />
                  <rect x="10" y="40" width="20" height="10" fill="currentColor" />
                  <rect x="70" y="40" width="15" height="15" fill="currentColor" />
                  <rect x="40" y="75" width="20" height="15" fill="currentColor" />
                </svg>
              </div>

            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={triggerAttendanceScan}
                disabled={presenceLoading || presenceSuccess}
                className="w-full py-2.5 bg-[#B3181C] hover:bg-[#8F1316] text-white text-xs font-black rounded-xl transition-all shadow-md shadow-[#B3181C]/10 cursor-pointer"
              >
                {presenceSuccess ? "Émargement effectué ✔" : "Simuler Émargement / Scan"}
              </button>
              
              <button
                onClick={() => setShowQRModal(false)}
                className="w-full py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[10.5px] font-black rounded-xl transition-all cursor-pointer"
              >
                Retour
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
