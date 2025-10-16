import { Injectable } from "@angular/core";

import { RolesRepository } from "@app/roles/domain/repositories";

@Injectable({providedIn: 'root'})
export class DeleteRolesUsecase {

    constructor( private repository:RolesRepository ) {}

    execute( idRole:number ) { return this.repository.deleteRole( idRole ); }
}