import { BaseEntity } from "../../config/base.entity";
import { IPermission } from "../../interfaces/permission.interface";
import { UserPermissionEntity } from "../../user/entities/user-permission.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('PERMISSION')
export class Permission extends BaseEntity implements IPermission{
    // @PrimaryGeneratedColumn('increment')
    // id: number;

    
    @Column({nullable:false, type: 'varchar2', length: 100, name:'NAME'})
    name: string;

    @Column({nullable:false, type: 'varchar2', length: 100, name:'DESCRIPTION'})
    description: string;

    @Column({nullable:false, name:'IS_ACTIVE'})
    isActive: number;

    // @CreateDateColumn()
    // createAt: Date

    // @UpdateDateColumn()
    // updateAt: Date
    @OneToMany(() => UserPermissionEntity, (userPermisionEntity)=>userPermisionEntity.permission)
    userToPermission: UserPermissionEntity[]
}