import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter';
import { documentBuilder } from './swagger/document-builder.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new PrismaClientExceptionFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
