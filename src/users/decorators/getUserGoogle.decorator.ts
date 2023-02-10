import { createParamDecorator } from '@nestjs/common';
import { CreateUserWithGoogleDto } from '../dto/CreateUserWithGoogle.dto';

export const GetUserGoogle = createParamDecorator((_, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  const user: CreateUserWithGoogleDto = req.user;
  return user;
});
