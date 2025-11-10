import { provideCloudinaryLoader } from '@angular/common';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { withDevtools } from '@tanstack/angular-query-experimental/devtools'
import { ApplicationConfig, provideZonelessChangeDetection, } from '@angular/core';
import { provideTanStackQuery, QueryClient, } from '@tanstack/angular-query-experimental'

import { routes } from './app.routes';

import { RegisterRepository } from '@app/auth/register/domain';
import { RegsiterRepositoryImpl } from '@app/auth/register/infrastructure';

import { SignInRepository } from '@app/auth/login/domain';
import { SignInRepositoryImpl } from '@app/auth/login/infrastructure/repositories';

import { RolesRepository } from '@app/roles/domain';
import { RolesRepositoryImpl } from '@app/roles/infrastructure/repositories';

import { ConceptRepository } from '@app/concepts/domain';
import { ConceptRepositoryImpl } from '@app/concepts/infrastructure';

import { authInterceptor } from './core/core';

import { TaskRepository } from '@app/tasks/domain';
import { TaskRespoitoryImpl } from '@app/tasks/infrastructure';

import { LogsRepository } from '@app/logs/domain';
import { LogsListRepositoryImpl } from '@app/logs/infrastructure/repositories';

import { GeneralInfoRepository } from '@app/dashboards/domain';
import { GeneralInfoRepositoryImpl } from '@app/dashboards/infrastructure';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter( routes, withViewTransitions() ),
    provideHttpClient( withInterceptors([authInterceptor]), ),
    provideTanStackQuery( new QueryClient() ),
    provideCloudinaryLoader('https://res.cloudinary.com/dev9hfkoh/'),
    { provide: RolesRepository, useClass: RolesRepositoryImpl },
    { provide: SignInRepository,  useClass: SignInRepositoryImpl },
    { provide: ConceptRepository, useClass: ConceptRepositoryImpl },
    { provide: RegisterRepository, useClass: RegsiterRepositoryImpl },
    { provide: TaskRepository, useClass: TaskRespoitoryImpl },
    { provide: LogsRepository, useClass: LogsListRepositoryImpl },
    { provide: GeneralInfoRepository, useClass: GeneralInfoRepositoryImpl },
  ]
};