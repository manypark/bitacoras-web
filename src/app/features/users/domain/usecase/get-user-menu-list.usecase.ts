import { Injectable } from "@angular/core";
import { UsersMenuRolesRepository } from "@app/users/domain/repositories";

@Injectable({providedIn: 'root'})
export class GetUserMenuListUsecase {
    constructor( private repository:UsersMenuRolesRepository ) {}
    execute(limit: number, offset: number) { return this.repository.getUsersList(); }
}