import { Injectable, Logger } from '@nestjs/common';
import { CreateUserWithGoogleDto } from 'src/users/dto/CreateUserWithGoogle.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly usersService: UsersService) {}

  async findOrCreateUserByGoogle(googleProfile: CreateUserWithGoogleDto) {
    const user = await this.usersService.findByGoogleId(googleProfile.googleId);
    if (user) return user;

    const newUser = await this.usersService.createWithGoogle(googleProfile);
    this.logger.log(`Created new user ${newUser.id}`);
    return newUser;
  }
}
