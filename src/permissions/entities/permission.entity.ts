import { BaseEntity } from "../../config/base.entity";
import { IPermission } from "../../interfaces/permission.interface";
import { UserPermissionEntity } from "../../user/entities/user-permission.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Permission extends BaseEntity implements IPermission{
    // @PrimaryGeneratedColumn('increment')
    // id: number;

    @Column({nullable:false})
    name: string;

    @Column({nullable:false})
    description: string;

    @Column({nullable:false})
    isActive: boolean;

    // @CreateDateColumn()
    // createAt: Date

    // @UpdateDateColumn()
    // updateAt: Date
    @OneToMany(() => UserPermissionEntity, (userPermisionEntity)=>userPermisionEntity.permission)
    userToPermission: UserPermissionEntity[]
}