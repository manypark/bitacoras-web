export interface UsersMenuRolesEntity {
    idUser:    number;
    firstName: string;
    lastName:  string;
    email:     string;
    active:    boolean;
    avatarUrl: string;
    menuList:  MenuListEntity[];
    rolesList: RolesListEntity[];
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