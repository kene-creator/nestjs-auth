import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = GqlExecutionContext.create(ctx);
    // console.log(Object.keys(request.getContext().req), 'get user');
    console.log(request.getContext().req.user, 'get user');
    // if (data) {
    //   return request.user[data];
    // }
    return request.getContext().req.user;
  },
);
