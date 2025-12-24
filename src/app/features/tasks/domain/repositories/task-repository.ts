import { ApiResponse } from "@utils/api_response";
import { TaskListEntity, UsersEntity, TaskParamsEntity, TaskEntity, TaskResponseEntity, UpdateTaskEntity, UsersFilterEntity } from "@app/tasks/domain/entities";

export abstract class TaskRepository {
    abstract postTask( task:TaskEntity ):Promise<ApiResponse<TaskResponseEntity>>;
    abstract getAllUsersFiltered( params:UsersFilterEntity ):Promise<ApiResponse<UsersEntity[]>>;
    abstract getAllUsers():Promise<ApiResponse<UsersEntity[]>>;
    abstract getAllTasks( params:TaskParamsEntity ):Promise<ApiResponse<TaskListEntity[]>>;
    abstract deleteTask( idTask:number ):Promise<ApiResponse<any>>;
    abstract updateTask( updateTask:UpdateTaskEntity ):Promise<ApiResponse<UpdateTaskEntity>>;
}