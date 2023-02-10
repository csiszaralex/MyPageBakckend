import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserGoogle } from 'src/users/decorators/getUserGoogle.decorator';
import { CreateUserWithGoogleDto } from 'src/users/dto/CreateUserWithGoogle.dto';
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
  loginCallback(@GetUserGoogle() user: CreateUserWithGoogleDto) {
    //TODO not return the new user just login
    return this.authService.findOrCreateUserByGoogle(user);
  }
}
