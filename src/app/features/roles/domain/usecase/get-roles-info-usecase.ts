import { Injectable } from "@angular/core";

import { RolesRepository } from "@app/roles/domain/repositories";

@Injectable({providedIn: 'root'})
export class GetAllRolesInfo {

    constructor( private repository:RolesRepository ) {}

    execute() { return this.repository.getAllRolesInfo(); }
}