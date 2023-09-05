import { Injectable,NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as idGenerator } from 'uuid';
import { StringifyOptions } from 'querystring';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserPermissionDto } from '../dto/create-user-permission.dto';
import { UserPermissionEntity } from '../entities/user-permission.entity';
import { randomPasswordGenerations } from '../../utils/helper';
import * as bcrypt from 'bcrypt'
import { IUser } from '../../interfaces/user.interface';
@Injectable()
export class UserService {
  // users: any[] = [
  //   {
  //     id: 123456,
  //     name: 'Jaime',
  //     email: 'jaime@mail.com',
  //     phone: 3001234567,
  //     role: USER_ROLE.ADMIN,
  //   },
  // ];

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserPermissionEntity) private readonly userPermissionRepository: Repository<UserPermissionEntity>
  ){}

  async getUsers(): Promise<User[]> {
    //return await this.userRepository.find({relations:['userToPermission']});
    const users:User[]=await this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.userToPermission','userToPermission')
    .leftJoinAndSelect('userToPermission.permission','permission')
    .getMany();

    return users
  }

  async getUserBy({key,value}:{key :keyof CreateUserDto, value: number | number}):Promise<IUser>{
    const user: IUser = await this.userRepository.createQueryBuilder('user')
    .where({[key]:value})
    .getOne()
    return user;
  }

  async getUserById(id: number): Promise<User>{
    const user:User = await this.userRepository.findOneBy({id});

    if (!user) throw new NotFoundException('Resourse not found');
    return user;
  }

  async createUser(data: CreateUserDto): Promise<User>{
    const randomPassword = randomPasswordGenerations();
    const hashedPassword = await bcrypt.hash(randomPassword, Number(process.env.HASH_SALT));

    console.log(randomPassword, hashedPassword);
    const user: User =  this.userRepository.create(data)
    user.password=hashedPassword;
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    const existUser: User= await this.getUserById(id);
    if (!existUser) throw new NotFoundException('Resourse not found');
    const user: User = await this.userRepository.preload({
      id,
      ...data
    });
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user: User= await this.getUserById(id);
    if (!user) throw new NotFoundException('Resourse not found');
    this.userRepository.remove(user)
  }

  //USER PERMISSION SECTION
  async createUserPermission(data: CreateUserPermissionDto): Promise<UserPermissionEntity>{
    const userPermissionEntity: UserPermissionEntity =  this.userPermissionRepository.create(data)
    console.log(userPermissionEntity)
    return await this.userPermissionRepository.save(userPermissionEntity);
  }
}
