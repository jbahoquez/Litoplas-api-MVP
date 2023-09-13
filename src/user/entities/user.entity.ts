import { IUser, USER_ROLE} from "../../interfaces/user.interface";
import { BaseEntity } from "../../config/base.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn,  } from "typeorm";
import { UserPermissionEntity } from './user-permission.entity';
import { IsNotEmpty } from "class-validator";
import { Exclude } from "class-transformer";


@Entity('USERS')
export class User extends BaseEntity implements IUser {
  // @PrimaryGeneratedColumn('increment')
  // id: number;

  

  @Column({nullable:false, type: 'varchar2', length: 200, name:'NAME'})
  name: string;

  @Column({nullable:false,unique: true, type: 'varchar2', length: 150, name:'EMAIL' })
  email: string;

  @Column({nullable:false, type: 'varchar2', length: 100, name:'PHONE'})
  phone: string;

  @Column({nullable:false, type: 'number', name:'ROLE'})
  role: USER_ROLE;

  @Exclude()
  @IsNotEmpty()
  @Column({nullable:true, type: 'varchar2', length: 100, name:'PASSWORD'})
  password: string

  // @CreateDateColumn()
  // createAt: Date

  // @UpdateDateColumn()
  // updateAt: Date

  // @ManyToMany(type=> Permission)
  // @JoinTable({ 
  //   name: 'user_permissions',
  //   joinColumn:{
  //     name: 'user',
  //     referencedColumnName: 'id'
  //   },
  //   inverseJoinColumn:{
  //     name:'permission',
  //     referencedColumnName:'id'
  //   }
  // })

  @OneToMany(() => UserPermissionEntity, (userPermisionEntity)=>userPermisionEntity.user)
  userToPermission: UserPermissionEntity[];
}
