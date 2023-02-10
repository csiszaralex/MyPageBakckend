import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetOAuthUser } from 'src/users/decorators/getOAuthUser.decorator';
import { OAuthUser } from 'src/users/interfaces/OAuthUser.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  loginGoogle(): void {
    //never called
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  loginGoogleCallback(@GetOAuthUser() user: OAuthUser) {
    //TODO not return the new user just login
    const newUser = this.authService.findOrCreateUserByGoogle(user);
    return newUser;
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  loginGithub(): void {
    //never called
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  loginGithubCallback(@GetOAuthUser() user: OAuthUser) {
    //TODO not return the new user just login
    const newUser = this.authService.findOrCreateUserByGithub(user);
    return newUser;
  }

  // @Post('signup')
  // async register(@Body() createUserWithEmailDto: CreateUserWithGoogleDto) {
  //   this.authService.register(createUserWithEmailDto);
  // }

  // @Post('signin')
  // async login(@Body() signInUserDto: SignInUserDto) {
  //   this.authService.login(signInUserDto);
  // }
}
