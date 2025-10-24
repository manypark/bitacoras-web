import { Injectable } from "@angular/core";

import { TaskRepository } from "@app/tasks/domain/repositories";

@Injectable({providedIn: 'root'})
export class GetAllUsersUsecase {
    constructor( private readonly repository:TaskRepository ) {}
    execute() { return this.repository.getAllUsers(); }
}