import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PermissionsModule } from './permissions/permissions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config'
import { DataSourceConfig } from './config/data.source';

@Module({
  imports: [
    ConfigModule.forRoot({
      //envFilePath: `.${process.env.NODE_ENV}.env`
      envFilePath: `.development.env`
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
  UserModule,
  PermissionsModule, 
],
  
  controllers: [],
  providers: [],
})
export class AppModule {}
