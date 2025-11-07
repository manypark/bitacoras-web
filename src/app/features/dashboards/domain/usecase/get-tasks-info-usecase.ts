import { Injectable } from "@angular/core";
import { GeneralInfoRepository } from "@app/dashboards/domain/repositories";

@Injectable({providedIn: 'root'})
export class GetTasksInfoUsecase {
    constructor( private repository:GeneralInfoRepository ) {}
    execute = () => this.repository.getTasksInfo();
}