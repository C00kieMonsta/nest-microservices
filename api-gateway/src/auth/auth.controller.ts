import { Controller, UseGuards, Post, Request, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    // authenticate user
    @UseGuards(LocalAuthGuard)
    @Post('auth')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }

    // check if is authenticated
    @MessagePattern({ role: 'auth', cmd: 'check'})
    async checkAuthetication(data) {
      try {
        const res = this.authService.validateToken(data.jwt);
        return res;
      } catch(e) {
        Logger.log(e);
        return false;
      }
    }

}
