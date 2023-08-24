import { Controller, Get, Post, Body, Put, Param, Delete, BadRequestException } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }



  @Get()
  getPermission(): Promise<Permission[]> {
    return this.permissionsService.getPermissions()
  }

  @Post()
  addPermission(@Body() body: CreatePermissionDto) {
    return this.permissionsService.createPermission(body);
  }

  @Put(':id')
  updatePermission(@Param('id') id: number, @Body() body: UpdatePermissionDto) {
    return this.permissionsService.updatePermission(id, body);
  }

  @Delete(':id')
  async deletePermission(@Param('id') id: number): Promise<string> {
    await this.permissionsService.deletePermission(id);
    return 'Permiso eliminado'
  }
}
