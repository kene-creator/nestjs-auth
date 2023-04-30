import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserCreateInput } from '../@generated/prisma-nestjs-graphql/user/user-create.input';
import { AuthDto } from './dto';
import { Payload, Tokens } from './types';
import { HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { GetUser } from './decorator';
import { User } from '@prisma/client';
import { AccessGaurd, RefreshGuard } from './guard';
import { Public } from './decorator/public.decorator';

@Resolver('auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation('createUser')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Args('createUserInput') createUserInput: UserCreateInput) {
    const newUser = await this.authService.signupLocal(createUserInput);

    return newUser;
  }

  @Public()
  @Mutation('signinUser')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Args('signinUser') dto: AuthDto): Promise<Tokens> {
    return await this.authService.signinLocal(dto);
  }

  @UseGuards(AccessGaurd)
  @Mutation('signoutUser')
  @HttpCode(HttpStatus.OK)
  async signoutLocal(@GetUser() user: User) {
    return this.authService.signoutLocal(user.id);
  }

  @Public()
  @UseGuards(RefreshGuard)
  @Mutation('refreshToken')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@GetUser() user: Payload) {
    return this.authService.refreshToken(user.sub, user.refreshToken);
  }
}
