import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * create your own class to avoid using magic strings 'local' in code base
 */

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') { }