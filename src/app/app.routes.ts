import { Routes } from '@angular/router';

export const routes: Routes = [
    // Rutas de autenticación
    { 
        path: 'auth/login', 
        loadComponent: () => import('./features/auth/login/presentation/pages/login/login.component'),
        title: 'Inicio de sesión'
    },
    { 
        path: 'auth/register',
        loadComponent: () => import('./features/auth/register/presentation/pages/register/register.component'),
        title: 'Registro'
    },

    // Rutas de la aplicación (home)
    { 
        path: 'home/dashboard',
        loadComponent: () => import('./features/dashboards/presentation/pages/dashboard/dashboard.component'),
        title: 'Dashboard'
    },
    { 
        path: 'home/roles',
        loadComponent: () => import('./features/roles/presentation/pages/roles/roles.component'),
        title: 'Roles'
    },
    { 
        path: 'home/concepts',
        loadComponent: () => import('./features/concepts/presentation/pages/concepts/concepts.component'),
        title: 'Conceptos'
    },
    { 
        path: 'home/tasks',
        loadComponent: () => import('./features/tasks/presentation/pages/tasks/tasks.component'),
        title: 'Tareas'
    },
    { 
        path: 'home/logs',
        loadComponent: () => import('./features/logs/presentation/pages/logs/logs.component'),
        title: 'Bitacoras'
    },

    // Ruta por defecto (opcional)
    { 
        path: '**',
        redirectTo: 'auth/login',
    },
];