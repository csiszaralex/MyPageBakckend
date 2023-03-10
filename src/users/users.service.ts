import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import { OAuthUser } from './interfaces/OAuthUser.interface';
import { CreateUserWithEmailDto } from './dto/CreateUserWithEmail.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByGoogleId(googleId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { googleId } });
  }
  async findByGithubId(githubId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { githubId } });
  }
  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }
  async findById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createWithOAuth(user: OAuthUser): Promise<User> {
    return this.prisma.user.create({ data: user });
  }
  async update(userId: number, user: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id: userId }, data: user });
  }
  async createUser(createUserWithEmailDto: CreateUserWithEmailDto): Promise<User> {
    const salt = await genSalt();
    const user = await this.findByEmail(createUserWithEmailDto.email);
    if (user) {
      if (user.password) throw new ConflictException('User already exists with this email');
      return this.update(user.id, {
        name: createUserWithEmailDto.name,
        firstName: createUserWithEmailDto.firstName,
        salt,
        password: await hash(createUserWithEmailDto.password, salt),
      });
    }
    return this.prisma.user.create({
      data: {
        email: createUserWithEmailDto.email,
        firstName: createUserWithEmailDto.firstName,
        name: createUserWithEmailDto.name,
        salt,
        password: await hash(createUserWithEmailDto.password, salt),
      },
    });
  }
  async updateRtHash(userId: number, salt: string, rt: string): Promise<void> {
    console.log('updateRtHash', userId, salt, rt);

    if (salt === '') {
      await this.prisma.user.updateMany({
        where: { id: userId, rtHash: { not: null } },
        data: { rtHash: null },
      });
      return;
    }
    const rtHash = await hash(rt, salt);
    await this.prisma.user.update({ where: { id: userId }, data: { rtHash } });
  }
}
