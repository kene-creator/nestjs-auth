import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserCreateInput } from 'src/@generated/prisma-nestjs-graphql/user/user-create.input';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Resolver('auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation('createUser')
  async signupLocal(@Args('createUserInput') createUserInput: UserCreateInput) {
    const newUser = await this.authService.signupLocal(createUserInput);

    return newUser;
  }

  @Mutation('signinUser')
  async signinLocal(@Args('signinUser') dto: AuthDto): Promise<Tokens> {
    return await this.authService.signinLocal(dto);
  }

  @Mutation('signoutUser')
  async signoutLocal() {
    this.authService.signoutLocal();
  }

  @Mutation('refreshToken')
  async refreshToken() {
    this.authService.refreshToken();
  }
}
