import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { USER_ROLE } from 'src/interfaces/user.interface';
import { User } from '../entities/user.entity';
import { Permission } from '../../permissions/entities/permission.entity';

export class CreateUserPermissionDto {
  @IsString()
  @ApiProperty()
  accessLevel: string;

  @IsNumber()
  @ApiProperty()
  user: User;

  @IsNumber()
  @ApiProperty()
  permission: Permission;

}
