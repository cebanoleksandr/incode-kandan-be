import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "./schemas/auth.schema";

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();
  console.log(req.user);
  
  return req.user;
});
