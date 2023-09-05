import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
    // @IsString()
    // @IsOptional()
    // @ApiProperty()
    // name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    description: string;
    
    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    isActive: boolean;
}
