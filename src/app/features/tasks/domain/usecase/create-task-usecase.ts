import { Injectable } from "@angular/core";

import { TaskEntity } from "@app/tasks/domain/entities";
import { TaskRepository } from "@app/tasks/domain/repositories";

@Injectable({providedIn: 'root'})
export class CreateTaskUsecase {
    constructor( private readonly repository:TaskRepository ) {}
    execute( task:TaskEntity ) { return this.repository.postTask( task ); }
}