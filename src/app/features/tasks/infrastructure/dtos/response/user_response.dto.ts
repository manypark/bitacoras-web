export interface UserResponseDto {
  idUser:    number;
  user:      UserDto;
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

export interface UserDto {
  firstName: string;
  lastName:  string;
}
