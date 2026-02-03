import { Injectable } from "@angular/core";

import { RolesEntity } from "@app/roles/domain/entities";
import { RolesRepository } from "@app/roles/domain/repositories";

@Injectable({providedIn: 'root'})
export class CreateRolUsecase {
    constructor( private repository:RolesRepository ) {}
    execute( rol:RolesEntity ) { return this.repository.createNewRol( rol ); }
}