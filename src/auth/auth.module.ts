import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './strategies/github.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtAtStrategy } from './strategies/jwtAt.strategy';
import { JwtRtStrategy } from './strategies/jwtRt.strategy';

@Module({
  imports: [forwardRef(() => UsersModule), HttpModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GithubStrategy, JwtAtStrategy, JwtRtStrategy],
})
export class AuthModule {}
