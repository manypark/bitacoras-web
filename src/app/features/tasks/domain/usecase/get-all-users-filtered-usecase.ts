import { Injectable } from "@angular/core";
import { UsersFilterEntity } from "@app/tasks/domain";

import { TaskRepository } from "@app/tasks/domain/repositories";

@Injectable({providedIn: 'root'})
export class GetAllUsersFilteredUsecase {
    constructor( private readonly repository:TaskRepository ) {}
    execute( params:UsersFilterEntity ) { return this.repository.getAllUsersFiltered( params ); }
}