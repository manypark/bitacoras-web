import { EmailVO, PasswordVO } from "@app/auth/login/domain"
import { FirstNameVO, LastNameVO } from "@app/auth/register/domain/value-objects"

export interface RegisterCompleteEntity {
    firstName   :FirstNameVO;
    lastName    :LastNameVO;
    email       :EmailVO; 
    password?   :PasswordVO;
    imageUrl    :string;
    idRoles     :number[];
}