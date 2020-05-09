import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { createConnection, getConnectionOptions } from 'typeorm';

import { AppModule } from './app.module';

const logger = new Logger();

async function bootstrap() {

  // db login with ormconfig
  getConnectionOptions().then(ormconf => {
    return createConnection(Object.assign(ormconf));
  });

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 8883
    }
  });
  app.listen(() => logger.log('Microservice User is listening'));
}
bootstrap();