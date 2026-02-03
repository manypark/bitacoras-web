export class UsersEntity {
    constructor(
        public readonly idUser:    number,
        public readonly user:      UserEntity,
        public readonly email:     string,
        public readonly active:    boolean,
        public readonly avatarUrl: string,
        public readonly menuList:  MenuListEntity[],
        public readonly rolesList: RolesListEntity[],
        public readonly password?:  string,
    ) {}

    get fullName():string { return `${this.user.firstName} ${this.user.lastName}` }
}
export interface MenuListEntity {
    idMenu: number;
    name:   string;
    route:  string;
    icon:   string;
}

export interface RolesListEntity {
    idRoles: number;
    name:    string;
}

export interface UserEntity {
    firstName: string;
    lastName:  string;
}
