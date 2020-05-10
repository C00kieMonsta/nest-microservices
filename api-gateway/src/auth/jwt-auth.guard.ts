import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * create your own class to avoid using magic strings 'jwt' in code base
 */

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }
