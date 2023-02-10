import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserGoogle } from 'src/users/decorators/getUserGoogle.decorator';
import { CreateUserWithGoogleDto } from 'src/users/dto/CreateUserWithGoogle.dto';
import { SignInUserDto } from 'src/users/dto/SignInUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  loginGoogle() {
    //never called
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  loginGoogleCallback(@GetUserGoogle() user: CreateUserWithGoogleDto) {
    //TODO not return the new user just login
    if (user) return user;
    else return 'no user';
    // return this.authService.findOrCreateUserByGoogle(user);
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  loginGithub() {
    //never called
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  loginGithubCallback(@Req() req) {
    if (req.user) {
      return req.user;
    } else {
      return 'no user';
    }
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
