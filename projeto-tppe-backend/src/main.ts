import { NestFactory } from '@nestjs/core';
import { AppModule } from './infraestrutura/nestjs/module/app.module';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Locadora')
    .setDescription('Documentação da API da locadora')
    .setVersion('1.0')
    .build();
  console.log('Rodando na porta: ', process.env.PORT ?? 3002);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
