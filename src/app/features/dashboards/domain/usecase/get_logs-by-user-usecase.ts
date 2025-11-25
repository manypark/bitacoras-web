import { Injectable } from "@angular/core";
import { GeneralInfoRepository } from "@app/dashboards/domain/repositories";

@Injectable({providedIn: 'root'})
export class GetLogsByUserUsecase {
    constructor( private repository:GeneralInfoRepository ) {}
    execute = ( date:string, idUserAssigned:string ) => this.repository.getLogsByUser(date, idUserAssigned);
}