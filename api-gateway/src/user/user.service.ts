import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';

import { microservices } from '../config';

@Injectable()
export class UserService {

    constructor(
        @Inject(microservices.serviceUser.name) private readonly clientServiceUser: ClientProxy,
    ) { }

    createUser(payload: any) {
        const start = Date.now();
        const pattern = { role: 'user', cmd: 'create' };
        return this.clientServiceUser
            .send<string>(pattern, payload)
            .pipe(
                map((message: string) => ({ message, duration: Date.now() - start }))
            );
    }

    getUser(username: string) {
        const pattern = { role: 'user', cmd: 'get' };
        return this.clientServiceUser
            .send<string>(pattern, { username })
            .pipe(
                map((user: any) => user)
            );
    }

}
