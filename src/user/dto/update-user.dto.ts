import { IsString, IsEmail, IsNumberString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { USER_ROLE } from 'src/interfaces/user.interface';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email: string;
  @IsNumberString()
  @IsOptional()
  @ApiProperty()
  phone: string;
  @IsString()
  @IsOptional()
  @ApiProperty({enum:[USER_ROLE.ADMIN, USER_ROLE.ROOT, USER_ROLE.USER]})
  role: USER_ROLE;
}
