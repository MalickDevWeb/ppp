export const ROUTES = {
  login:       '/',
  dashboard:   '/dashboard',
  admin: {
    dashboard: '/admin',
  },
  student: {
    dashboard: '/etudiant',
    cours:     '/etudiant/cours',
    devoirs:   '/etudiant/devoirs',
    planning:  '/etudiant/planning',
    notes:     '/etudiant/notes',
  }
} as const;
