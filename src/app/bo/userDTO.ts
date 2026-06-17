import { RolesEnum } from "./userCreds";

export interface userDTO{
    userId?: number,
    userName : string;
    password? : string;
    avatar? : string;
    manages : number[];
    role : RolesEnum;
    id? : number;
}