import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreatePermissionDto {
    @IsString()
    @ApiProperty()
    name: string;
    @IsString()
    @ApiProperty()
    description: string;
    @IsBoolean()
    @ApiProperty()
    isActive: boolean;
}
