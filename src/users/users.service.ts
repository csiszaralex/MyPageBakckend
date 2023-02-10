import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserWithGoogleDto } from './dto/CreateUserWithGoogle.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByGoogleId(googleId: string) {
    return this.prisma.user.findUnique({ where: { googleId } });
  }
  async createWithGoogle(createUserWithGoogleDto: CreateUserWithGoogleDto) {
    return this.prisma.user.create({
      data: { ...createUserWithGoogleDto, password: 'XXX', salt: 'XXX' },
    });
  }
}
