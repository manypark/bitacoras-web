import { Injectable } from '@angular/core';

import { SignInUsecase } from '../../domain/usecase';
import { EmailVO, PasswordVO } from '../../domain/domain';

@Injectable({ providedIn: 'root' })
export class SignInService {

  constructor( private readonly signInUsecase:SignInUsecase, ) {}

  signIn(email:EmailVO, password:PasswordVO ) {
    return this.signInUsecase.execute(email, password);
  }

}