import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { Permission } from '../entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
//import { Permission } from './entities/permission.entity'
@Injectable()
export class PermissionsService {
  // permissions: Permission[] = [
  //   {
  //     name: 'Prueba',
  //     description: 'Prueba de permiso',
  //     isActive: true
  //   }
  // ];
  constructor(
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>
  ){}

  async getPermissions():Promise<Permission[]>{
    //return await this.permissionRepository.find();
    const permissions: Permission[]=await this.permissionRepository.find();
    // const permissions: Permission[]=await this.permissionRepository
    // .createQueryBuilder('permission')
    // .leftJoinAndSelect('permission.userToPermission','userToPermission')
    // .leftJoinAndSelect('userToPermission.user','user')
    // .getMany()

    return permissions
  }
  async getPermissionsById(id: number): Promise <Permission> | null {
    const permission:Permission = await this.permissionRepository.findOneBy({id_d:id});
    if (!permission) throw new NotFoundException('Resourse not found');
    return permission;
    
  }
  async createPermission(data: CreatePermissionDto): Promise <Permission> {
    //const entityManager = getManager();
    const [nextVal] = await this.permissionRepository.query('SELECT permission_sequence.NEXTVAL FROM DUAL');
    const permission: Permission =  this.permissionRepository.create({...data, id_d: nextVal.NEXTVAL,})
    //permission.id_d= Number(this.permissionRepository.query('SELECT permission_sequence.NEXTVAL FROM DUAL'))
    return await this.permissionRepository.save(permission);
  }

  

  async updatePermission(id: number, data: UpdatePermissionDto): Promise <Permission> {
    const existPermission: Permission= await this.getPermissionsById(id);
    if (!existPermission) throw new NotFoundException('Resourse not found');
    const permission: Permission = await this.permissionRepository.preload({
      id_d:id,
      ...data
    });
    return await this.permissionRepository.save(permission);
  }

  async deletePermission(id: number): Promise<void> {
    const permission: Permission= await this.getPermissionsById(id);
    if (!permission) throw new NotFoundException('Resourse not found');
    this.permissionRepository.remove(permission)
  }

  
}
