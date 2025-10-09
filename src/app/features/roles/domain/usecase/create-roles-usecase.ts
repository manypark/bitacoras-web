import { Injectable } from "@angular/core";

import { RolesRepository } from "@app/roles/domain/repositories";

@Injectable({providedIn: 'root'})
export class CreateRolUsecase {

    constructor( private repository:RolesRepository ) {}

    execute( newRol:string ) { return this.repository.createNewRol( newRol ); }
}