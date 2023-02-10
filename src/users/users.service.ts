import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { OAuthUser } from './interfaces/OAuthUser.interface';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByGoogleId(googleId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { googleId } });
  }
  async findByGithubId(githubId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { githubId } });
  }
  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createWithOAuth(user: OAuthUser): Promise<User> {
    return this.prisma.user.create({ data: user });
  }
  async update(userId: number, user: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id: userId }, data: user });
  }
}
