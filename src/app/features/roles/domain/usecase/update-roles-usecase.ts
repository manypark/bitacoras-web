import { Injectable } from "@angular/core";

import { RolesEntity } from "@app/roles/domain/entities";
import { RolesRepository } from "@app/roles/domain/repositories";

@Injectable({providedIn: 'root'})
export class UpdateRoloes {

    constructor( private repository:RolesRepository ) {}

    execute( role:RolesEntity ) { return this.repository.updateRole( role ); }
}