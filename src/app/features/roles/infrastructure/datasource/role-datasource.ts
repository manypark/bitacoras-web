import { httpResource } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";

import { ApiResponse } from "@utils/api_response";
import { RolesResponseDto } from "@app/roles/infrastructure/dtos";
import { environment } from "../../../../../environments/environment";

Injectable({ providedIn: 'root'})
export class RolesDatasource {
    constructor(
        private injector:Injector,
    ) {}

    getAllRoles() {
        return httpResource<any>(
            () => ({ url: `${environment.apiUrl}/roles`}),
            {
                injector: this.injector,
            }
        );
    }

}