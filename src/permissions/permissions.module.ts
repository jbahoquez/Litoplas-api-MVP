import { Module } from '@nestjs/common';
import { PermissionsService } from './services/permissions.service';
import { PermissionsController } from './controllers/permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports:[
    TypeOrmModule.forFeature([
      Permission
    ])
  ]
})
export class PermissionsModule {}
