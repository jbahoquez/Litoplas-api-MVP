import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreatePermissionDto {
    @IsString()
    @ApiProperty()
    name: string;
    @IsString()
    @ApiProperty()
    description: string;
    @IsNumber()
    @ApiProperty()
    isActive: number;
}
