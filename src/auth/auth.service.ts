import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { User } from '@prisma/client';
import { CreateUserWithEmailDto } from 'src/users/dto/CreateUserWithEmail.dto';
import { SignInUserDto } from 'src/users/dto/SignInUser.dto';
import { OAuthUser } from 'src/users/interfaces/OAuthUser.interface';
import { UsersService } from 'src/users/users.service';
import { SignInPayload } from './interfaces/SignInPayload.interface';
import { JwtPayload } from './interfaces/JwtPayload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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
  async register(createUserWithEmailDto: CreateUserWithEmailDto): Promise<User> {
    const user = this.usersService.createUser(createUserWithEmailDto);
    return user;
  }
  async login(signInUserDto: SignInUserDto): Promise<SignInPayload> {
    const user = await this.validateUser(signInUserDto.email, signInUserDto.password);
    return this.generateToken(user);
  }
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('Invalid credentials');
    const passwd = /^\$2b\$10\$/.test(password) ? password : await hash(password, user.salt);
    if (!(passwd === user.password)) throw new UnauthorizedException('Invalid credentials');
    return user;
  }
  async generateToken(user: User): Promise<SignInPayload> {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      firstName: user.firstName,
    };
    const accessToken = await this.jwtService.sign(payload);
    //BUG: refresh token is not working
    return { accessToken, refreshToken: '' };
  }
}
