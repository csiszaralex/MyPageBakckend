import {
  IsAscii,
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Min,
  MinLength,
} from 'class-validator';

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

  @IsAscii()
  githubId: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
