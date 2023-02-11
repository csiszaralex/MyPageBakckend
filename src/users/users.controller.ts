import { Controller, Get, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from 'src/config/app.config.interface';

@Controller('users')
export class UsersController {
  constructor(
    private readonly configService: ConfigService<AppConfig>,
    private readonly jwtService: JwtService,
  ) {}

  @Get('token')
  async token(@Query('jwt') jwt: string) {
    const secret = this.configService.get('auth.jwt.secret');
    const data = this.jwtService.verify(jwt, { secret });
    return { ...data, jwt };
  }
}
