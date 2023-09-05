import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserService } from '../user/services/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports:[UserModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  
})
export class AuthModule {}
