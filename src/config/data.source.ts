import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { ConfigModule, ConfigService } from '@nestjs/config';

// DB_HOST=localhost
// DB_PORT=5432
// DB_USER=admin
// DB_PASSWORD=my-weak-password
// DB_NAME=postgres

ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`
    //envFilePath: `.development.env`
  })
const configService=new ConfigService()
console.log(`.${process.env.NODE_ENV}.env`)
console.log(configService.get('DB_USER'))
export const DataSourceConfig: DataSourceOptions={
    type:'postgres',
    host:configService.get('DB_HOST'),
    port:configService.get('DB_PORT'),
    username:configService.get('DB_USER'),
    password:configService.get('DB_PASSWORD'),
    database:configService.get('DB_NAME'),
    entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
    synchronize:false,
    migrationsRun: false,
    namingStrategy: new SnakeNamingStrategy()
}

export const AppDS = new DataSource(DataSourceConfig)