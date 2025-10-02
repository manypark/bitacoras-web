import { Injectable, Injector } from "@angular/core";
import { httpResource, HttpResourceRef } from "@angular/common/http";

import { ApiResponse } from "@utils/api_response";
import { RolesResponseDto } from "@app/roles/infrastructure/dtos";
import { environment } from "../../../../../environments/environment";

@Injectable({ providedIn: 'root'})
export class RolesDatasource {
    constructor(
        private injector:Injector,
    ) {}

    getAllRoles():HttpResourceRef<ApiResponse<RolesResponseDto[]>> {
        return httpResource<ApiResponse<RolesResponseDto[]>>(
            () => ({ url: `${environment.apiUrl}/roles`, }),
            {
                injector: this.injector,
            }
        ) as HttpResourceRef<ApiResponse<RolesResponseDto[]>>;
    }

}