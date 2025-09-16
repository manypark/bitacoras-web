import { Injectable } from '@angular/core';

import { EmailVO, PasswordVO, SignInUsecase } from '@app/auth/login/domain';

@Injectable({ providedIn: 'root' })
export class SignInService {

  constructor( private readonly signInUsecase:SignInUsecase, ) {}

  signIn( email:EmailVO, password:PasswordVO ) {
    return this.signInUsecase.execute(email, password);
  }
}