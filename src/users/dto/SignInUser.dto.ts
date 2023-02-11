import { OmitType } from '@nestjs/swagger';
import { UserEntity } from './UserEntity.dto';

export class SignInUserDto extends OmitType(UserEntity, [
  'id',
  'isAdmin',
  'googleId',
  'name',
  'firstName',
  'githubId',
]) {}
