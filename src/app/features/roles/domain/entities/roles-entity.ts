export interface RolesEntity {
    idRoles : number;
    name    : string;
    active  : boolean;
}

export const ROLES_KEYS: (keyof RolesEntity)[] = ['idRoles', 'name', 'active'];