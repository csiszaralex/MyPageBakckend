import { OmitType } from '@nestjs/swagger';
import { UserEntity } from './UserEntity.dto';

export class CreateUserWithGoogleDto extends OmitType(UserEntity, ['id', 'isAdmin', 'password']) {}
