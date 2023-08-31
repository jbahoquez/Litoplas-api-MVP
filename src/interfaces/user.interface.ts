import { USER_ROLE } from "src/user/entity/user.entity";

export interface IUser {
    id:number;
    name: string;
    email: string;
    phone: string;
    role: USER_ROLE;
    password: string
}