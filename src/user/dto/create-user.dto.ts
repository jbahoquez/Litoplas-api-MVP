import { IsString, IsEmail, IsNumberString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { USER_ROLE } from 'src/interfaces/user.interface';

export class CreateUserDto {
  @IsNumber()
  @ApiProperty()
  id_d: number;
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
