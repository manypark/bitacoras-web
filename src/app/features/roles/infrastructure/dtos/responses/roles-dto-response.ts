export interface RolesResponseDto {
    idRoles: number;
    name:    string;
    active:  boolean;
    menus:   MenuDto[];
}

export interface MenuDto {
    idMenu: number;
    name:   string;
    route:  string;
    icon:   string;
    active: boolean;
}
