import { EmailVO, PasswordVO } from "../value-objects";
import { ApiResponse } from "../../../../../core/utils";
import { SignInResponseEntity } from "../entities/sign_in_entity";

export abstract class SignInRepository {
   abstract signIn(  email:EmailVO, password:PasswordVO ):Promise<ApiResponse<SignInResponseEntity>>;
}