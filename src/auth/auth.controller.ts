import { Body, Controller, Get, Post, Redirect, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AppConfig } from 'src/config/app.config.interface';
import { GetOAuthUser } from 'src/auth/decorators/getOAuthUser.decorator';
import { CreateUserWithEmailDto } from 'src/users/dto/CreateUserWithEmail.dto';
import { SignInUserDto } from 'src/users/dto/SignInUser.dto';
import { OAuthUser } from 'src/users/interfaces/OAuthUser.interface';
import { AuthService } from './auth.service';
import { SignInPayload } from './interfaces/SignInPayload.interface';
import { GetUserId } from 'src/users/decorators/getUserId.decorator';
import { RefreshGuard } from './guards/refresh.guard';
import { GetUser } from 'src/users/decorators/getUser.decorator';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<AppConfig>,
  ) {}
  //#region OAuth

  @Get('google')
  @Public()
  @UseGuards(AuthGuard('google'))
  loginGoogle(): void {
    //never called
  }
  @Get('github')
  @Public()
  @UseGuards(AuthGuard('github'))
  loginGithub(): void {
    //never called
  }

  @Get('google/callback')
  @Public()
  @UseGuards(AuthGuard('google'))
  @Redirect()
  async loginGoogleCallback(@GetOAuthUser() user: OAuthUser) {
    const newUser = await this.authService.findOrCreateUserByGoogle(user);
    const jwt = await this.authService.generateToken(newUser);
    return {
      url: `${this.configService.get<string>('frontend.auth_url')}?jwt=${jwt.refreshToken}`,
    };
  }
  @Get('github/callback')
  @Public()
  @UseGuards(AuthGuard('github'))
  @Redirect()
  async loginGithubCallback(@GetOAuthUser() user: OAuthUser) {
    const newUser = await this.authService.findOrCreateUserByGithub(user);
    const jwt = await this.authService.generateToken(newUser);
    return {
      url: `${this.configService.get<string>('frontend.auth_url')}?jwt=${jwt.refreshToken}`,
    };
  }
  //#endregion

  @Post('signup')
  @Public()
  async register(@Body() createUserWithEmailDto: CreateUserWithEmailDto): Promise<SignInPayload> {
    const newUser = await this.authService.register(createUserWithEmailDto);
    return this.authService.generateToken(newUser);
  }
  @Post('signin')
  @Public()
  async login(@Body() signInUserDto: SignInUserDto): Promise<SignInPayload> {
    return this.authService.login(signInUserDto);
  }

  @Post('refresh')
  @Public()
  @UseGuards(RefreshGuard)
  async refresh(@GetUserId() userId: number, @GetUser('refreshToken') rt: string) {
    return this.authService.refresh(userId, rt);
  }

  @Post('logout')
  async logout(@GetUserId() userId: number) {
    return this.authService.logout(userId);
  }
}
