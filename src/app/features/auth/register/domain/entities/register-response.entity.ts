export interface RegisterResponseEntity {
    createdAt: string;
    updatedAt: string;
    idUser:    number;
    firstName: string;
    lastName:  string;
    email:     string;
    password:  string;
    active:    boolean;
    lastLogin: string;
    avatarUrl: string;
}