import { Body, Controller, Get, Post, Redirect, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AppConfig } from 'src/config/app.config.interface';
import { GetOAuthUser } from 'src/users/decorators/getOAuthUser.decorator';
import { GetUser } from 'src/users/decorators/getUser.decorator';
import { CreateUserWithEmailDto } from 'src/users/dto/CreateUserWithEmail.dto';
import { SignInUserDto } from 'src/users/dto/SignInUser.dto';
import { OAuthUser } from 'src/users/interfaces/OAuthUser.interface';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/JwtPayload.interface';
import { SignInPayload } from './interfaces/SignInPayload.interface';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<AppConfig>,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  loginGoogle(): void {
    //never called
  }
  @Get('github')
  @UseGuards(AuthGuard('github'))
  loginGithub(): void {
    //never called
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @Redirect()
  async loginGoogleCallback(@GetOAuthUser() user: OAuthUser) {
    const newUser = await this.authService.findOrCreateUserByGoogle(user);
    const jwt = await this.authService.generateToken(newUser);
    return { url: `${this.configService.get<string>('frontend.auth_url')}?jwt=${jwt.accessToken}` };
  }
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @Redirect()
  async loginGithubCallback(@GetOAuthUser() user: OAuthUser) {
    const newUser = await this.authService.findOrCreateUserByGithub(user);
    const jwt = await this.authService.generateToken(newUser);
    return { url: `${this.configService.get<string>('frontend.auth_url')}?jwt=${jwt.accessToken}` };
  }

  @Post('signup')
  async register(@Body() createUserWithEmailDto: CreateUserWithEmailDto): Promise<SignInPayload> {
    const newUser = await this.authService.register(createUserWithEmailDto);
    return this.authService.generateToken(newUser);
  }
  @Post('signin')
  async login(@Body() signInUserDto: SignInUserDto): Promise<SignInPayload> {
    return this.authService.login(signInUserDto);
  }

  @Get('me')
  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: JwtPayload) {
    return user ? 'WORKS' : 'NOT WORKING';
  }
}
