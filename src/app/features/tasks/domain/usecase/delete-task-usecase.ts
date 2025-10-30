import { Injectable } from "@angular/core";

import { TaskRepository } from "@app/tasks/domain/repositories";

@Injectable({providedIn: 'root'})
export class DeleteTasksUsecase {
    constructor( private readonly repository:TaskRepository ) {}
    execute( idTask:number ) { return this.repository.deleteTask( idTask ); }
}