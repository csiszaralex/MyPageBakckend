import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AppConfig } from 'src/config/app.config.interface';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from '../interfaces/JwtPayload.interface';

@Injectable()
export class JwtRtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService<AppConfig>,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.jwt.refreshToken.secret'),
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('Authorization').replace('Bearer ', '').trim();
    return { refreshToken, ...payload };
  }
}
