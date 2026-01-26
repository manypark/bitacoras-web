export interface RolesEntity {
    idRoles: number;
    name:    string;
    active:  boolean;
    menus:   MenuEntity[];
}

export interface MenuEntity {
    idMenu: number;
    name:   string;
    route:  string;
    icon:   string;
    active: boolean;
}