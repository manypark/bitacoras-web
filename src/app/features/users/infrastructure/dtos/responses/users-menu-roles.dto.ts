export interface UsersMenuRolesDto {
    idUser:    number;
    firstName: string;
    lastName:  string;
    email:     string;
    active:    boolean;
    avatarUrl: string;
    menuList:  MenuListDto[];
    rolesList: RolesListDto[];
}

export interface MenuListDto {
    idMenu: number;
    name:   string;
    route:  string;
    icon:   string;
}

export interface RolesListDto {
    idRoles: number;
    name:    string;
}
