import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AppConfig } from 'src/config/app.config.interface';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from '../interfaces/JwtPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService<AppConfig>, private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.jwt.secret'),
    });
  }
  async validate(payload: JwtPayload) {
    const { email } = payload;
    const user = await this.usersService.findByEmail(email);

    return user;
  }
}
