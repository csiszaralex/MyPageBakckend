import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { AppConfig } from 'src/config/app.config.interface';
import { GithubEmails } from '../interfaces/Github.interface';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<AppConfig>,
  ) {
    super({
      clientID: configService.get<string>('auth.github.clientID'),
      clientSecret: configService.get<string>('auth.github.clientSecret'),
      callbackURL: configService.get<string>('auth.github.callbackURL'),
      scope: ['user'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Strategy.Profile,
    done: (err?: string | Error | null, user?: Express.User, info?: any) => void,
  ) {
    const { data } = await firstValueFrom(
      this.httpService.get<GithubEmails>('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${accessToken}`, Accept: '*/*' },
      }),
    );
    const email = data.filter(email => email.primary)[0].email;
    const user = {
      name: profile.displayName,
      firstName: profile.username,
      email,
      githubId: profile.id,
    };

    done(null, user);
  }
}
