import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserService } from '../user/services/user.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[
    PassportModule,

    JwtModule.registerAsync({
      useFactory: () => {
        return{
          secret: 'mySecret',
          singnOptions:{
            expireIn:'10d'
          }
        }
      }
    }),

    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy],
  
})
export class AuthModule {}
