import { createParamDecorator } from '@nestjs/common';
import { JwtPayload } from 'src/auth/interfaces/JwtPayload.interface';

export const GetUserId = createParamDecorator((_, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  const user: JwtPayload = req.user;
  return user.id;
});
