import { USER_ROLE } from "../entity/user.entity";


export class CreateUserDto{
    
    name:  string;
    email: string;
    phone: number;
    role:  USER_ROLE;
}