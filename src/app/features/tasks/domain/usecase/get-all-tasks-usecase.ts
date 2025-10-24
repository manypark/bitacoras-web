import { Injectable } from "@angular/core";

import { TaskParamsEntity } from "@app/tasks/domain/entities";
import { TaskRepository } from "@app/tasks/domain/repositories";

@Injectable({providedIn: 'root'})
export class GetAllTasksUsecase {
    constructor( private readonly repository:TaskRepository ) {}
    execute( params:TaskParamsEntity ) { return this.repository.getAllTasks( params ); }
}