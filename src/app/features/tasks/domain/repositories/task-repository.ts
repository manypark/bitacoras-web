import { ApiResponse } from "@utils/api_response";
import { TaskListEntity, UsersEntity, TaskParamsEntity, TaskEntity, TaskResponseEntity } from "@app/tasks/domain/entities";

export abstract class TaskRepository {
    abstract postTask( task:TaskEntity ):Promise<ApiResponse<TaskResponseEntity>>;
    abstract getAllUsers():Promise<ApiResponse<UsersEntity[]>>;
    abstract getAllTasks( params:TaskParamsEntity ):Promise<ApiResponse<TaskListEntity[]>>;
    abstract deleteTask( idTask:number ):Promise<ApiResponse<any>>;
}