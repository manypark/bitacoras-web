export interface SignInResponseEntity {
  token: string;
  idUser: number;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  avatarUrl: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;

  menuList: MenuItem[];
  rolesList: Role[];
}

export interface MenuItem {
  idMenu: number;
  name: string;
  route: string;
  icon: string;
}

export interface Role {
  idRoles: number;
  name: string;
}