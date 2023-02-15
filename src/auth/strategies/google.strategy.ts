import { Injectable } from '@nestjs/common';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { AppConfig } from 'src/config/app.config.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService<AppConfig>) {
    super({
      clientID: configService.get<string>('auth.google.clientID'),
      clientSecret: configService.get<string>('auth.google.clientSecret'),
      callbackURL: configService.get<string>('auth.google.callbackURL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { name, emails, displayName, id } = profile;
    const user = {
      googleId: id,
      email: emails[0].value,
      firstName: name.givenName,
      name: displayName,
    };
    done(null, user);
  }
}
