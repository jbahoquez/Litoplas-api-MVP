import { IUser, USER_ROLE} from "../../interfaces/user.interface";
import { BaseEntity } from "../../config/base.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany,  } from "typeorm";
import { UserPermissionEntity } from './user-permission.entity';
import { IsNotEmpty } from "class-validator";


@Entity()
export class User extends BaseEntity implements IUser {
  // @PrimaryGeneratedColumn('increment')
  // id: number;

  @Column({nullable:false})
  name: string;

  @Column({nullable:false,unique: true, type: 'varchar', length: 150 })
  email: string;

  @Column({nullable:false})
  phone: string;

  @Column({nullable:false})
  role: USER_ROLE;

  @IsNotEmpty()
  @Column({nullable:true})
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
