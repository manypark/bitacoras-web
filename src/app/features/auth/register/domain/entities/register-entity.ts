import { EmailVO, PasswordVO } from "@app/auth/login/domain";
import { FirstNameVO, LastNameVO } from "@app/auth/register/domain/value-objects";

export interface RegisterEntity {
    firstName   :FirstNameVO,
    lastName    :LastNameVO,
    email       :EmailVO, 
    password    :PasswordVO,
}