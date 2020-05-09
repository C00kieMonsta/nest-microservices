import { CanActivate, ExecutionContext, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';

import { apiGatewayClient } from '../config';

/**
 * NOTICE: Not sure it is useful... because I don't want the user service to be exposed with HTTP protocol
 * This guard should rather be implemented inside the API Gateway...
 */

export class AuthGuard implements CanActivate {

    constructor(@Inject(apiGatewayClient) private readonly client: ClientProxy) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        Logger.log('Auth Guard');
        const req = context.switchToHttp().getRequest();

        try {
            const res = await this.client.send(
                { role: 'auth', cmd: 'check' },
                { jwt: req.headers['authorization']?.split(' ')[1] })
                .pipe(timeout(5000))
                .toPromise<boolean>();

            return res;
        } catch (err) {
            Logger.error(err);
            return false;
        }
    }
}