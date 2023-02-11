import { OmitType } from '@nestjs/swagger';
import { UserEntity } from './UserEntity.dto';

export class CreateUserWithEmailDto extends OmitType(UserEntity, [
  'id',
  'isAdmin',
  'googleId',
  'githubId',
]) {}
