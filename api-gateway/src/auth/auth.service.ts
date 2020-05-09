import { Injectable, Inject, Logger, RequestTimeoutException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { compareSync } from 'bcrypt';
import { timeout, catchError } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';
import { microservices } from '../config';

@Injectable()
export class AuthService {
    constructor(
        @Inject(microservices.serviceUser) private readonly clientServiceUser: ClientProxy,
        private readonly jwtService: JwtService,
    ) { }

    // does the user exists
    async validateUser(username: string, password: string): Promise<any> {
        try {
            const user = await this.clientServiceUser.send({ role: 'user', cmd: 'get' }, { username })
                .pipe(
                    timeout(5000),
                    catchError(err => {
                        if (err instanceof TimeoutError) {
                            return throwError(new RequestTimeoutException());
                        }
                        return throwError(err);
                    }))
                .toPromise();

            if (compareSync(password, user?.password)) {
                return user;
            }

            return null;
        } catch (e) {
            Logger.log(e);
            throw e;
        }
    }

    // log the user
    async login(user) {
        
        // payload to be added to jwt
        const payload = {
            user,
            sub: user.id
        };

        // return signed jwt with user id
        return {
            userId: user.id,
            accessToken: this.jwtService.sign(payload)
        };
    }

    // is the token valid
    validateToken(jwt: string) {
        return this.jwtService.verify(jwt);
    }
}