import { PickType } from '@nestjs/swagger';
import { UserEntity } from './UserEntity.dto';

export class SignInUserDto extends PickType(UserEntity, ['email', 'password']) {}
