import { Injectable } from "@angular/core";
import { CreateUserMenuRolesEntity } from "@app/users/domain/entities";
import { UsersMenuRolesRepository } from "@app/users/domain/repositories";

@Injectable({providedIn: 'root'})
export class CreateUserMenuRolesUsecase {
    constructor( private repository:UsersMenuRolesRepository ) {}
    execute( data:CreateUserMenuRolesEntity ) { return this.repository.createUserMenuRoles( data ); }
}