import { HttpResourceRef } from "@angular/common/http";

import { ApiResponse } from "@utils/api_response";
import { RolesEntity } from "@app/roles/domain/entities";

export abstract class RolesRepository {
    abstract getAllRoles():HttpResourceRef<ApiResponse<RolesEntity[]>>;
}