import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { jwtSecret, expirationTime, microservices } from '../config';

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
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: expirationTime }
    })
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
