import { Injectable } from "@angular/core";
import { LogsParamsEntity } from "@app/logs/domain/entities";
import { LogsRepository } from "@app/logs/domain/repositories/logs-repository";

@Injectable({ providedIn: 'root' })
export class GetLogsListUsecase {
    constructor( private readonly repository:LogsRepository ) {}
    execute( params:LogsParamsEntity ) { return this.repository.getLogsList( params ); }
}