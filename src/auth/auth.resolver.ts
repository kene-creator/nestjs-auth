import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserCreateInput } from 'src/@generated/prisma-nestjs-graphql/user/user-create.input';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetUser } from './decorator';
import { User } from '@prisma/client';
import { AccessGaurd } from './guard';

@Resolver('auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation('createUser')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Args('createUserInput') createUserInput: UserCreateInput) {
    const newUser = await this.authService.signupLocal(createUserInput);

    return newUser;
  }

  @Mutation('signinUser')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Args('signinUser') dto: AuthDto): Promise<Tokens> {
    return await this.authService.signinLocal(dto);
  }

  @UseGuards(AccessGaurd)
  @Mutation('signoutUser')
  @HttpCode(HttpStatus.OK)
  async signoutLocal(@GetUser() user: User, @GetUser('email') email: string) {
    // console.log({ email });
    return this.authService.signoutLocal(user.id);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Mutation('refreshToken')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@GetUser() user: User) {
    return this.authService.refreshToken(user.id, user.hashedRt);
  }
}
