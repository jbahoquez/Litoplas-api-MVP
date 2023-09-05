import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserPermissionEntity } from './entities/user-permission.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
    TypeOrmModule.forFeature([
      User,
      UserPermissionEntity
    ])
  ],
  exports:[UserService, TypeOrmModule]
})
export class UserModule {}
