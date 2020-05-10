import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/ping-a')
  pingServiceA() {
    return this.appService.pingServiceA();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/ping-b')
  pingServiceB() {
    return this.appService.pingServiceB();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/ping-c')
  pingServiceC() {
    return this.appService.pingServiceC();
  }

  // composing requests
  @UseGuards(JwtAuthGuard)
  @Get('/ping-all')
  pingAll() {
    return zip(
      this.appService.pingServiceA(),
      this.appService.pingServiceB(),
      this.appService.pingServiceC()
    ).pipe(
      map(([dataA, dataB, dataC]) => ({
        dataA,
        dataB,
        dataC
      }))
    );
  }

}
