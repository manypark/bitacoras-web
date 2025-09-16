import { Injectable } from '@angular/core';

import { EmailVO, PasswordVO } from '@app/auth/login/domain';
import { FirstNameVO, LastNameVO, RegisterUsecase } from '@app/auth/register/domain';

@Injectable({ providedIn: 'root' })
export class RegisterService {

  constructor( private readonly registerUseCase:RegisterUsecase ) {}

  register( firstName:FirstNameVO, lastName:LastNameVO, email:EmailVO, password:PasswordVO ) {
    return this.registerUseCase.execute( firstName, lastName, email, password );
  }
}