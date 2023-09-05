import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PermissionsModule } from './permissions/permissions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config'
import { DataSourceConfig } from './config/data.source';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      //envFilePath: `.development.env`
      isGlobal:true
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
  UserModule,
  PermissionsModule,
  AuthModule, 
],
  
  controllers: [],
  providers: [],
})
export class AppModule {}
