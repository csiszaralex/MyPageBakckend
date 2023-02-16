import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './strategies/github.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtAtStrategy } from './strategies/jwtAt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AppConfig } from 'src/config/app.config.interface';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppConfig>) => ({
        secret: configService.get<string>('auth.jwt.accessToken.secret'),
        signOptions: { expiresIn: configService.get<string>('auth.jwt.accessToken.expiresIn') },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GithubStrategy, JwtAtStrategy],
})
export class AuthModule {}
