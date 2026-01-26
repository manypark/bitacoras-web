import { Injectable } from "@angular/core";

import { RolesRepository } from "@app/roles/domain/repositories";

@Injectable({providedIn: 'root'})
export class GetMenuListUsecase {
    constructor( private repository:RolesRepository ) {}
    execute(limit: number, offset: number) { return this.repository.getMenuList(); }
}