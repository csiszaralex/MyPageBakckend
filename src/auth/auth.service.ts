import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { OAuthUser } from 'src/users/interfaces/OAuthUser.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly usersService: UsersService) {}

  async findOrCreateUserByGoogle(googleProfile: OAuthUser): Promise<User> {
    const user = await this.usersService.findByGoogleId(googleProfile.googleId);
    if (user) return user;
    return this.findOrCreateUserByEmail(googleProfile);
  }
  async findOrCreateUserByGithub(githubProfile: OAuthUser): Promise<User> {
    const user = await this.usersService.findByGithubId(githubProfile.githubId);
    if (user) return user;
    return this.findOrCreateUserByEmail(githubProfile);
  }
  async findOrCreateUserByEmail(oAuthUser: OAuthUser): Promise<User> {
    const user = await this.usersService.findByEmail(oAuthUser.email);
    if (user) return this.usersService.update(user.id, oAuthUser);

    return this.usersService.createWithOAuth(oAuthUser);
  }
}
