import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { microservices } from './config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: microservices.serviceA,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8888
        }
      },
      {
        name: microservices.serviceB,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8889
        }
      },
      {
        name: microservices.serviceC,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8890
        }
      }
    ]),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}