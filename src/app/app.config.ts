import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withViewTransitions } from '@angular/router';
import { ApplicationConfig, provideZonelessChangeDetection, } from '@angular/core';

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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter( routes, withViewTransitions() ),
    provideHttpClient( withInterceptors([authInterceptor]), ),
    { provide: RolesRepository, useClass: RolesRepositoryImpl },
    { provide: SignInRepository,  useClass: SignInRepositoryImpl },
    { provide: ConceptRepository, useClass: ConceptRepositoryImpl },
    { provide: RegisterRepository, useClass: RegsiterRepositoryImpl },
  ]
};