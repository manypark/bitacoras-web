import { Injectable } from "@angular/core";

import { UpdateTaskEntity } from "@app/tasks/domain/entities";
import { TaskRepository } from "@app/tasks/domain/repositories";

@Injectable({providedIn: 'root'})
export class UpdateTaskUsecase {
    constructor( private readonly repository:TaskRepository ) {}
    execute( task:UpdateTaskEntity ) { return this.repository.updateTask( task ); }
}