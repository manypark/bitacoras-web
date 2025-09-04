import { Routes } from '@angular/router';

export const routes: Routes = [
    // Rutas de autenticación
    { 
        path: 'auth/login', 
        loadComponent: () => import('./features/auth/login/presentation/pages/login/login.component')
    },
    { 
        path: 'auth/register',
        loadComponent: () => import('./features/auth/register/presentation/pages/register/register.component'),
    },

  // Rutas de la aplicación (home)
    { 
        path: 'home/dashboard',
        loadComponent: () => import('./features/dashboards/presentation/pages/dashboard/dashboard.component')
    },
    { 
        path: 'home/roles',
        loadComponent: () => import('./features/roles/presentation/pages/roles/roles.component'),
    },
    { 
        path: 'home/concepts',
        loadComponent: () => import('./features/concepts/presentation/pages/concepts/concepts.component'),
    },
    { 
        path: 'home/tasks',
        loadComponent: () => import('./features/tasks/presentation/pages/tasks/tasks.component'),
    },
    { 
        path: 'home/logs',
        loadComponent: () => import('./features/logs/presentation/pages/logs/logs.component'),
    },

  // Ruta por defecto (opcional)
    { 
        path: '**',
        loadComponent: () => import('./features/auth/login/presentation/pages/login/login.component'),
    },
];