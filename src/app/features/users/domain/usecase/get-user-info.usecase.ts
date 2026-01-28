import { Injectable } from "@angular/core";
import { UsersMenuRolesRepository } from "@app/users/domain/repositories";

@Injectable({providedIn: 'root'})
export class GetUserInfoUsecase {
    constructor( private repository:UsersMenuRolesRepository ) {}
    execute( idUser : number ) { return this.repository.getUserInfo(idUser); }
}