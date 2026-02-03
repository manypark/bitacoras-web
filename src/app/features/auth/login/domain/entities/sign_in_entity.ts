export interface SignInResponseEntity {
  token:     string;
  idUser:    number;
  user:      User;
  email:     string;
  active:    boolean;
  avatarUrl: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  menuList:  MenuList[];
  rolesList: RolesList[];
}

export interface MenuList {
  idMenu: number;
  name:   string;
  route:  string;
  icon:   string;
}

export interface RolesList {
  idRoles: number;
  name:    string;
}

export interface User {
  firstName: string;
  lastName:  string;
}
