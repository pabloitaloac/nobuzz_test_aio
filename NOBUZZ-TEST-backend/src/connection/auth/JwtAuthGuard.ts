import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();

    if (err || !user) {
      console.error('Authentication Error:', err, info);
      throw err || new UnauthorizedException(info?.message);
    }

    return user;
  }
}
