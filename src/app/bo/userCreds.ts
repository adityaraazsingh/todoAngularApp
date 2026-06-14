export enum RolesEnum{
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface userCred{
    userId?: number,
    userName : string;
    password : string;
    avatar : string;
    manages : number[];
    role : RolesEnum;
}