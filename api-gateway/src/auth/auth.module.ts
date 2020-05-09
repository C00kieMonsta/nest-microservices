import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtSecret, expirationTime, microservices } from '../config';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: microservices.serviceUser,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8891
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
export class AuthModule {}
