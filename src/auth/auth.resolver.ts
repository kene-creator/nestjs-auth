import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver('auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation('createUser')
  async signupLocal() {
    this.authService.signupLocal();
  }

  @Mutation('signinUser')
  async signinLocal(
    @Args('username') username: string,
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
