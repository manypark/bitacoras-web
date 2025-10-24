import { inject, Injectable } from "@angular/core";
import { catchError, firstValueFrom, throwError } from "rxjs";

import { ApiResponse } from "@utils/api_response";
import { HttpClientService } from "../../../../core/services";
import { TaskEntity, TaskListEntity, TaskParamsEntity, TaskResponseEntity, UsersEntity } from "@app/tasks/domain";

@Injectable({ providedIn: 'root'})
export class TaskDatasource {

    constructor( private http: HttpClientService ) {}

    async postTasks( task:TaskEntity ): Promise<ApiResponse<TaskResponseEntity>> {
        return await firstValueFrom( this.http.post<ApiResponse<TaskResponseEntity>>('/tasks', {
            title           : task.title.getValue(),
            description     : task.description.getValue(),
            userCreated     : task.userAssigned,
            userAssigned    : task.userAssigned,
        }).pipe(
                catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
            )
        );
    }

    async getAllUsers():Promise<ApiResponse<UsersEntity[]>> {
        return await firstValueFrom( this.http.get<ApiResponse<UsersEntity[]>>('/users').pipe(
                catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
            ) 
        )
    }

    async getAllTasks( params:TaskParamsEntity ):Promise<ApiResponse<TaskListEntity[]>> {
        return await firstValueFrom( this.http.get<ApiResponse<TaskListEntity[]>>('/tasks', { params: { ...params } }).pipe(
                catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
            ) 
        );
    }
}