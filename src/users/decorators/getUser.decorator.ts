import { createParamDecorator } from '@nestjs/common';
import { JwtPayload } from 'src/auth/interfaces/JwtPayload.interface';

export const GetUser = createParamDecorator((data: string | undefined, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  const user: JwtPayload = req.user;
  if (data) return user[data];
  return user;
});
