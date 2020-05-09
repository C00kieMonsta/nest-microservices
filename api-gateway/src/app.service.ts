import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { microservices } from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(microservices.serviceA.name) private readonly clientServiceA: ClientProxy,
    @Inject(microservices.serviceB.name) private readonly clientServiceB: ClientProxy,
    @Inject(microservices.serviceC.name) private readonly clientServiceC: ClientProxy,
  ) { }

  pingServiceA() {
    const start = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientServiceA
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - start }))
      );
  }

  pingServiceB() {
    const start = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientServiceB
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - start }))
      );
  }

  pingServiceC() {
    const start = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientServiceC
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - start }))
      );
  }

}