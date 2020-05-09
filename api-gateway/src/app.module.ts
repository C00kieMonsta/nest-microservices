import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { microservices } from './config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: microservices.serviceA.name,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: microservices.serviceA.port,
        }
      },
      {
        name: microservices.serviceB.name,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: microservices.serviceB.port,
        }
      },
      {
        name: microservices.serviceC.name,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: microservices.serviceC.port,
        }
      }
    ]),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}