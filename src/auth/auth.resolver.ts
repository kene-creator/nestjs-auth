import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Resolver('auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation('createUser')
  async signupLocal(@Args('dto') dto: AuthDto): Promise<Tokens> {
    this.authService.signupLocal(dto);
  }

  @Mutation('signinUser')
  async signinLocal(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    this.authService.signinLocal();
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
