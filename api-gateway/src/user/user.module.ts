import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { microservices } from '../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: microservices.serviceUser.name,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: microservices.serviceUser.port,
        }
      }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
