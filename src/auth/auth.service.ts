import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  hashData(data: string) {
    return argon.hash(data);
  }

  async signupLocal(dto: AuthDto) {
    const hash = await this.hashData(dto.password);
    const newUser = this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
  }

  signinLocal() {}

  signoutLocal() {}

  refreshToken() {}
}
