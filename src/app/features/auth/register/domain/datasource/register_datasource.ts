import { ApiResponse } from "@utils/index";

import { EmailVO, PasswordVO } from "@app/auth/login/domain";
import { RegisterResponseEntity } from "@app/auth/register/domain/entities";
import { FirstNameVO, LastNameVO } from "@app/auth/register/domain/value-objects";

export interface RegisterDatasource {
    register( 
        firstName   :FirstNameVO,
        lastName    :LastNameVO,
        email       :EmailVO, 
        password    :PasswordVO,
    ):Promise<ApiResponse<RegisterResponseEntity>>;
}