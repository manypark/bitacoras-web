import { toSignal } from '@angular/core/rxjs-interop';
import { EnvironmentInjector, Injectable, runInInjectionContext, signal } from '@angular/core';

import { SignInUsecase } from '../../domain/usecase';
import { EmailVO, PasswordVO, SignInResponseEntity } from '../../domain/domain';

@Injectable({ providedIn: 'root' })
export class SignInService {

  private readonly _authState = signal<SignInResponseEntity | null>(null);
  authState = this._authState.asReadonly();

  constructor(
    private readonly signInUsecase:SignInUsecase,
    private readonly injector:EnvironmentInjector,
   ) {}

  signIn(email:EmailVO, password:PasswordVO ): void {

    runInInjectionContext(this.injector, () => {
      const signInResult = toSignal(
        this.signInUsecase.execute(email, password),
        { initialValue: null }
      );

      this._authState.set(signInResult());
    });
  }
  
}