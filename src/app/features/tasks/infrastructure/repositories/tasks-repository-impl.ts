import { Injectable } from "@angular/core";

import { ApiResponse } from "@utils/api_response";
import { TaskDatasource } from "@app/tasks/infrastructure/datasource";
import { 
    TaskEntity, 
    UsersEntity,
    TaskRepository, 
    TaskListEntity, 
    TaskParamsEntity, 
    TaskResponseEntity,
    UpdateTaskEntity,
    UsersFilterEntity, 
} from "@app/tasks/domain";

@Injectable({ providedIn: 'root'})
export class TaskRespoitoryImpl implements TaskRepository {

    constructor( private readonly datasource:TaskDatasource ) {}

    postTask(task: TaskEntity): Promise<ApiResponse<TaskResponseEntity>> {
        return this.datasource.postTasks( task );
    }

    async getAllUsers(): Promise<ApiResponse<UsersEntity[]>> {
        return this.datasource.getAllUsers();
    }

    async getAllUsersFiltered( params:UsersFilterEntity ): Promise<ApiResponse<UsersEntity[]>> {
        return this.datasource.getAllUsersFiltered( params );
    }

    getAllTasks(params: TaskParamsEntity): Promise<ApiResponse<TaskListEntity[]>> {
        return this.datasource.getAllTasks( params );
    }

    deleteTask(idTask: number): Promise<ApiResponse<any>> {
        return this.datasource.deleteTask( idTask );
    }

    updateTask(updateTask: UpdateTaskEntity): Promise<ApiResponse<UpdateTaskEntity>> {
        return this.datasource.updateTask( updateTask );
    }
}