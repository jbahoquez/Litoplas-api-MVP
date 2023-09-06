import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { CORS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.use(morgan('dev'));
  app.setGlobalPrefix('api');
  app.enableCors(CORS);
  

  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist: true
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  const config = new DocumentBuilder()
    .setTitle('Litoplas Api')
    .setDescription('This is our first doc for Litoplas Api')
    .setVersion('1.0')
    .addTag('Litoplas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document,{
    explorer: true,
    swaggerOptions:{
      filter:true,
      showRequestDuration: true
    }
  });


  const config2 = new DocumentBuilder()
  .setTitle('Litoplas Api')
  .setDescription('This is our first doc for Litoplas Api')
  .setVersion('1.0')
  .addTag('Litoplas')
  .build();

const document2 = SwaggerModule.createDocument(app, config2);
SwaggerModule.setup('api/docs/v2', app, document2,{
  explorer: true,
  swaggerOptions:{
    filter:true,
    showRequestDuration: true
  }
});

  await app.listen(process.env.PORT);
  console.log(`Application running on: ${await app.getUrl()}`)
}
bootstrap();
