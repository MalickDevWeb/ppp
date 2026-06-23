import React from 'react';
import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { ROUTES, ROLE_UTILISATEUR } from '@/shared/constants';
import { useAuthStore } from '@/core/store/authStore';

import { LoginPage } from '@/features/auth';
import { AdminPage } from '@/features/admin';
import {
  StudentDashboardPage,
  StudentCoursesPage,
  StudentHomeworksPage,
  StudentSchedulePage,
  StudentGradesPage,
} from '@/features/student';
import { StudentLayout } from '@/features/student/ui/components/layout/StudentLayout';

// Skeleton très simple pour le Suspense
const PageSkeleton = () => <div className="p-8 text-center text-gray-500">Chargement...</div>;

// Redirection intelligente d'accueil pour /dashboard
const DashboardRedirect = () => {
  const { utilisateur } = useAuthStore();
  if (utilisateur?.role === ROLE_UTILISATEUR.ADMIN || utilisateur?.role === ROLE_UTILISATEUR.SUPER_ADMIN) {
    return <Navigate to={ROUTES.admin.dashboard} replace />;
  }
  return <Navigate to={ROUTES.student.dashboard} replace />;
};

export function AppRouter() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path={ROUTES.login} element={<LoginPage />} />

        {/* Dashboard smart routing redirector */}
        <Route path={ROUTES.dashboard} element={<DashboardRedirect />} />

        {/* Routes Protégées pour l'Admin */}
        <Route element={<ProtectedRoute rolesAutorises={[ROLE_UTILISATEUR.ADMIN, ROLE_UTILISATEUR.SUPER_ADMIN]} />}>
          <Route path={ROUTES.admin.dashboard} element={<AdminPage />} />
        </Route>

        {/* Routes Protégées pour l'Espace Éducatif — partagent le StudentLayout */}
        <Route element={<ProtectedRoute rolesAutorises={[ROLE_UTILISATEUR.ETUDIANT, ROLE_UTILISATEUR.PROFESSEUR, ROLE_UTILISATEUR.SECRETAIRE]} />}>
          <Route element={<StudentLayout />}>
            <Route path={ROUTES.student.dashboard} element={<StudentDashboardPage />} />
            <Route path="/etudiant/cours"          element={<StudentCoursesPage />} />
            <Route path="/etudiant/devoirs"        element={<StudentHomeworksPage />} />
            <Route path="/etudiant/planning"       element={<StudentSchedulePage />} />
            <Route path="/etudiant/notes"          element={<StudentGradesPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.login} replace />} />
      </Routes>
    </Suspense>
  );
}
