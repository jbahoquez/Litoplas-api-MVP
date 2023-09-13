import { BaseEntity } from "../../config/base.entity";
import { IUser } from "src/interfaces/user.interface";
import { User } from "./user.entity";
import { Permission } from "../../permissions/entities/permission.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('USER_PERMISSION')
export class UserPermissionEntity extends BaseEntity{
    @Column({name:'ACCESS_LEVEL'})
    accessLevel: string;
    
    @ManyToOne(()=> User, (user)=>user.userToPermission)
    user: User;

    @ManyToOne(()=> Permission,(permission)=>permission.userToPermission)
    permission: Permission;
}