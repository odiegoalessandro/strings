import { DocumentBuilder } from '@nestjs/swagger';

export const documentBuilder = new DocumentBuilder()
  .setTitle('strings')
  .setVersion('mvp')
  .setDescription(
    'Uma rede social dinamica para distruição rapida de informações',
  )
  .addTag('strings')
  .build();
