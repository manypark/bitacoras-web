import { Injectable } from "@angular/core";

import { ApiResponse } from "@utils/api_response";
import { GeneralInfoEntity, GeneralInfoRepository } from "@app/dashboards/domain";
import { GeneralInfoMapper, GeneralInfoDatasource } from "@app/dashboards/infrastructure";

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
}