export class UsersEntity {
    constructor(
        public readonly idUser:    number,
        public readonly firstName: string,
        public readonly lastName:  string,
        public readonly email:     string,
        public readonly active:    boolean,
        public readonly avatarUrl: string,
    ) {}

    get fullName():string { return `${this.firstName} ${this.lastName}` }
}