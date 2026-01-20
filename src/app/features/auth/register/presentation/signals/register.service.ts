import { Injectable } from '@angular/core';

import { RegisterEntity, RegisterUsecase } from '@app/auth/register/domain';

@Injectable({ providedIn: 'root' })
export class RegisterService {

  constructor( private readonly registerUseCase:RegisterUsecase ) {}

  register( userNew: RegisterEntity ) {
    return this.registerUseCase.execute( userNew);
  }
}