export interface RolesEntity {
    idRoles : number;
    name    : string;
    active  : boolean;
    idMenus : number[];
}

export const ROLES_KEYS: (keyof RolesEntity)[] = ['idRoles', 'name', 'active', 'idMenus'];