import { Routes } from '@angular/router';
import { checkAuthGuard, loginRegisterCheckGuard } from './features/shared/guards';

export const routes: Routes = [
    // Rutas de autenticación
    { 
        path: 'auth/login',
        loadComponent: () => import('./features/auth/login/presentation/pages/login/login.component'),
        title: 'Inicio de sesión',
        canActivate: [loginRegisterCheckGuard],
    },
    { 
        path: 'auth/register',
        loadComponent: () => import('./features/auth/register/presentation/pages/register/register.component'),
        title: 'Registro',
        canActivate: [loginRegisterCheckGuard],
    },

    // Rutas de la aplicación (home)
    { 
        path: 'home/dashboard',
        loadComponent: () => import('./features/dashboards/presentation/pages/dashboard/dashboard.component'),
        title: 'Dashboard',
        canActivate: [checkAuthGuard]
    },
    { 
        path: 'home/roles',
        loadComponent: () => import('./features/roles/presentation/pages/roles/roles.component'),
        title: 'Roles',
        canActivate: [checkAuthGuard],
    },
    { 
        path: 'home/concepts',
        loadComponent: () => import('./features/concepts/presentation/pages/concepts/concepts.component'),
        title: 'Conceptos',
        canActivate: [checkAuthGuard]
    },
    { 
        path: 'home/tasks',
        loadComponent: () => import('./features/tasks/presentation/pages/tasks/tasks.component'),
        title: 'Tareas',
        canActivate: [checkAuthGuard]
    },
    { 
        path: 'home/logs',
        loadComponent: () => import('./features/logs/presentation/pages/logs/logs.component'),
        title: 'Bitacoras',
        canActivate: [checkAuthGuard]
    },

    // Ruta por defecto (opcional)
    { 
        path: '**',
        redirectTo: 'auth/login',
    },
];