import { EmailVO, PasswordVO } from "@app/auth/login/domain";
import { FirstNameVO, LastNameVO } from "@app/auth/register/domain";

export interface RegisterPayload {
  firstName : FirstNameVO;
  lastName  : LastNameVO;
  email     : EmailVO;
  password  : PasswordVO;
}