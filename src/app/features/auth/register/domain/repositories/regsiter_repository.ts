import { ApiResponse } from "@utils/index";
import { PasswordVO, EmailVO } from "@app/auth/login/domain";
import { FirstNameVO, LastNameVO, RegisterResponseEntity } from "@app/auth/register/domain";

export abstract class RegisterRepository {
    abstract register( 
        firstName   :FirstNameVO,
        lastName    :LastNameVO,
        email       :EmailVO, 
        password    :PasswordVO,
    ):Promise<ApiResponse<RegisterResponseEntity>>;
}