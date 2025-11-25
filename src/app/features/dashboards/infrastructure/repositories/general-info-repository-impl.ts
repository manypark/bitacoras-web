import { Injectable } from "@angular/core";

import { ApiResponse } from "@utils/api_response";
import { GeneralInfoEntity, GeneralInfoRepository, LogsByConceptEntity, LogsByUserEntity } from "@app/dashboards/domain";
import { GeneralInfoMapper, GeneralInfoDatasource, LogsByConceptsMapper, LogsByUserMapper } from "@app/dashboards/infrastructure";

@Injectable({ providedIn: 'root'})
export class GeneralInfoRepositoryImpl implements GeneralInfoRepository {

    constructor( private readonly datasource:GeneralInfoDatasource ) {}

    async getUsersInfo(): Promise<ApiResponse<GeneralInfoEntity>> {
        const res = await this.datasource.getUsersInfo();
        const dataMapped = GeneralInfoMapper.fromResponseDto(res.data);
        return {
            data    : dataMapped,
            message : res.message,
            status  : res.status,
        } as ApiResponse<GeneralInfoEntity>;
    }
    
    async getRolesInfo(): Promise<ApiResponse<GeneralInfoEntity>> {
        return this.datasource.getRolesInfo();
    }
    
    async getTasksInfo(): Promise<ApiResponse<GeneralInfoEntity>> {
        const res = await this.datasource.getTasksInfo();
        const dataMapped = GeneralInfoMapper.fromResponseDto(res.data);
        return {
            data    : dataMapped,
            message : res.message,
            status  : res.status,
        } as ApiResponse<GeneralInfoEntity>;
    }
    
    async getLogsInfo(): Promise<ApiResponse<GeneralInfoEntity>> {
        const res = await this.datasource.getLogsInfo();
        const dataMapped = GeneralInfoMapper.fromResponseDto(res.data);
        return {
            data    : dataMapped,
            message : res.message,
            status  : res.status,
        } as ApiResponse<GeneralInfoEntity>;
    }
    
    async getLogsByConcept(idConcepts: string): Promise<ApiResponse<LogsByConceptEntity[]>> {
        const res = await this.datasource.getLogsByConcept( idConcepts );
        const dataMapped = res.data.map( ( logs ) => LogsByConceptsMapper.fromResponseDto(logs) );
        return {
            data    : dataMapped,
            message : res.message,
            status  : res.status,
        } as ApiResponse<LogsByConceptEntity[]>;
    }

    async getLogsByUser( date:string, idUserAssigned:string ): Promise<ApiResponse<LogsByUserEntity[]>> {
        const res = await this.datasource.getLogsByUser( date, idUserAssigned );
        const dataMapped = res.data.map( ( logs ) => LogsByUserMapper.fromResponseDto(logs) );
        return {
            data    : dataMapped,
            message : res.message,
            status  : res.status,
        } as ApiResponse<LogsByUserEntity[]>;
    }
}