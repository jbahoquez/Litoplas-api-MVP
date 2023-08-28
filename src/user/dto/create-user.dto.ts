import { IsString, IsEmail, IsNumberString } from 'class-validator';
import { USER_ROLE } from '../entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  name: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsNumberString()
  @ApiProperty()
  phone: string;
  @IsString()
  @ApiProperty({enum:[USER_ROLE.ADMIN, USER_ROLE.ROOT, USER_ROLE.USER]})
  role: USER_ROLE;
}
