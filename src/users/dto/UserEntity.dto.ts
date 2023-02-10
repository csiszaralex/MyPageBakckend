import { IsAscii, IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class UserEntity {
  @IsInt()
  @Min(0)
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;

  @IsAscii()
  googleId: string;

  @IsNotEmpty()
  password: string;
}
