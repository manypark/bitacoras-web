import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withViewTransitions } from '@angular/router';
import { 
  ApplicationConfig, 
  provideBrowserGlobalErrorListeners, 
  provideZonelessChangeDetection,
} from '@angular/core';

import { routes } from './app.routes';
import { SIGN_IN_REPOSITORY } from '@app/auth/login/domain/repositories';
import { SignInRepositoryImpl } from '@app/auth/login/infrastructure/repositories';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter( routes, withViewTransitions() ),
    provideHttpClient(),
    { provide: SIGN_IN_REPOSITORY, useClass: SignInRepositoryImpl }
  ]
};