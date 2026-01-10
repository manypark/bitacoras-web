import { Injectable } from "@angular/core";
import { UsersMenuRolesRepository } from "@app/users/domain/repositories";

@Injectable({providedIn: 'root'})
export class DeleteUserUsecase {
    constructor( private repository:UsersMenuRolesRepository ) {}
    execute = ( idUser:number ) => this.repository.deleteUser(idUser);
}