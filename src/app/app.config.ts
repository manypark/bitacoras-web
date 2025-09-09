import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withViewTransitions } from '@angular/router';
import { 
  ApplicationConfig, 
  provideBrowserGlobalErrorListeners, 
  provideZonelessChangeDetection,
} from '@angular/core';

import { routes } from './app.routes';

import { SIGN_IN_REPOSITORY } from './features/auth/login/domain/domain';
import { SignInRepositoryImpl } from './features/auth/login/infrastructure/infrastructure';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions() ),
    provideHttpClient(),

    { provide: SIGN_IN_REPOSITORY, useClass: SignInRepositoryImpl }
  ]
};
