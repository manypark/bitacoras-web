import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withViewTransitions } from '@angular/router';
import { 
  ApplicationConfig, 
  provideBrowserGlobalErrorListeners, 
  provideZonelessChangeDetection,
} from '@angular/core';

import { routes } from './app.routes';

import { SignInRepository } from '@app/auth/login/domain';
import { RegisterRepository } from '@app/auth/register/domain';
import { RegsiterRepositoryImpl } from '@app/auth/register/infrastructure';
import { SignInRepositoryImpl } from '@app/auth/login/infrastructure/repositories';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter( routes, withViewTransitions() ),
    provideHttpClient(),
    { provide: SignInRepository,  useClass: SignInRepositoryImpl },
    { provide: RegisterRepository, useClass: RegsiterRepositoryImpl },
  ]
};