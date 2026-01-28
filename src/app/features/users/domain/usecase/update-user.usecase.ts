import { Injectable } from "@angular/core";

import { UpdateUserEntity } from "@app/users/domain/entities";
import { UsersMenuRolesRepository } from "@app/users/domain/repositories";

@Injectable({providedIn: 'root'})
export class UpdateUserUsecase {
    constructor( private repository:UsersMenuRolesRepository ) {}
    execute( idUser:number, data:UpdateUserEntity ) { return this.repository.updateUser(idUser, data); }
}