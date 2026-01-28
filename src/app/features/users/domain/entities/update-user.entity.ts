import { UsersEntity } from "@app/tasks/domain";

export interface UpdateUserEntity {
    user    : Partial<UsersEntity>
    idRoles : number[];      
}