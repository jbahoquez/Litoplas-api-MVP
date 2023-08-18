import { IsString, IsEmail, IsNumberString } from 'class-validator';
import { USER_ROLE } from '../entity/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsNumberString()
  phone: number;
  @IsString()
  role: USER_ROLE;
}
