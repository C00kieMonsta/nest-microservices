import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

// bootstrap of hybrid app
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 8880
    }
  })

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
  Logger.log('API Gateway is running');

}
bootstrap();
