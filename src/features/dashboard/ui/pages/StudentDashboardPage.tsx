import React from 'react';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { CourseDetailModal } from '../components/CourseDetailModal';
import { PresenceModal } from '../components/PresenceModal';
import { ActiveLiveStream } from '../components/ActiveLiveStream';
import { LiveStreamBanner } from '../components/LiveStreamBanner';
import { WeeklySchedule } from '../components/WeeklySchedule';
import { RecentAcademicPerformance } from '../components/RecentAcademicPerformance';
import { RegisteredCourses } from '../components/RegisteredCourses';
import { AITutorPanel } from '../components/AITutorPanel';
import { StudentNotificationToast } from '../components/StudentNotificationToast';
import { StudentHeaderBanner } from '../components/StudentHeaderBanner';

export function StudentDashboardPage() {
  const {
    selectedDay, setSelectedDay, activeDetailCourse, setActiveDetailCourse, attendances,
    liveSessions, setSelectedLiveId, selectedLive, showToast, triggerToast, showPointage, setShowPointage,
    pointageType, setPointageType, pointageMethod, setPointageMethod, cameraStream, chatInput, setChatInput,
    videoRef, startCamera, stopCamera, registerClockIn, sendLiveReaction, sendLiveChat
  } = useDashboard();

  return (
    <div className="p-4 md:p-8 max-w-[1280px] mx-auto w-full flex-grow animate-fade-in relative min-h-screen pb-24">
      {showToast && <StudentNotificationToast message={showToast} />}

      {activeDetailCourse && (
        <CourseDetailModal 
          course={activeDetailCourse} 
          onClose={() => setActiveDetailCourse(null)} 
          onRedirect={triggerToast} 
        />
      )}

      <StudentHeaderBanner 
        attendancesCount={attendances.length} 
        onPointer={(type) => {
          setPointageType(type);
          setShowPointage(true);
          setPointageMethod('selection');
        }}
      />

      {showPointage && (
        <PresenceModal 
          pointageType={pointageType}
          pointageMethod={pointageMethod}
          setPointageMethod={setPointageMethod}
          onClose={() => { stopCamera(); setShowPointage(false); }}
          cameraStream={cameraStream}
          videoRef={videoRef}
          onRegisterClockIn={registerClockIn}
          onStartCamera={startCamera}
        />
      )}

      {selectedLive ? (
        <ActiveLiveStream 
          selectedLive={selectedLive}
          onQuit={() => setSelectedLiveId(null)}
          sendLiveReaction={sendLiveReaction}
          chatInput={chatInput}
          setChatInput={setChatInput}
          onSendChat={sendLiveChat}
        />
      ) : (
        <LiveStreamBanner 
          liveSessions={liveSessions} 
          onJoin={(id) => {
            setSelectedLiveId(id);
            triggerToast("Bienvenue dans le cours en direct !");
          }} 
        />
      )}

      <div className="grid grid-cols-12 gap-6">
        <WeeklySchedule 
          selectedDay={selectedDay} 
          setSelectedDay={setSelectedDay} 
          onSelectCourse={setActiveDetailCourse} 
        />
        <RecentAcademicPerformance />
        <AITutorPanel />
        <RegisteredCourses 
          liveSessions={liveSessions} 
          onSelectLive={(id) => {
            setSelectedLiveId(id);
            triggerToast("Redirection vers la classe virtuelle !");
          }} 
        />
      </div>
    </div>
  );
}
export default StudentDashboardPage;
