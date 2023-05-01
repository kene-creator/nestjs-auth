import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategy';
import { JwtModule } from '@nestjs/jwt';
import { TrackChangeResolver } from './track-change.resolver';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    RtStrategy,
    AtStrategy,
    AuthResolver,
    AuthService,
    TrackChangeResolver,
  ],
})
export class AuthModule {}
