import { Injectable,NotFoundException } from '@nestjs/common';
import { User, USER_ROLE } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as idGenerator } from 'uuid';
import { StringifyOptions } from 'querystring';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ){}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({relations:['permissions']});
  }

  async getUserById(id: number): Promise<User>{
    const user:User = await this.userRepository.findOneBy({id});

    if (!user) throw new NotFoundException('Resourse not found');
    return user;
  }

  async createUser(data: CreateUserDto): Promise<User>{
    const user: User =  this.userRepository.create(data)
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, data: CreateUserDto): Promise<User> {
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
}
