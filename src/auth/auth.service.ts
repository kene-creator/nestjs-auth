import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { SigninPayload } from 'src/graphql';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signupLocal(dto: Prisma.UserCreateInput) {
    const hash = await this.hashData(dto.hash);
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        hash: false,
      },
    });
    const tokens = await this.getToken(newUser.id, newUser.email);

    await this.updateRtHash(newUser.id, tokens.refresh_token);

    return newUser;
  }

  async signinLocal(dto: AuthDto): Promise<SigninPayload> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    const isPasswordCorrect = await argon.verify(user.hash, dto.password);
    if (!isPasswordCorrect) {
      throw new ForbiddenException('Email or password is wrong');
    }

    const tokens = await this.getToken(user.id, user.email);

    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  signoutLocal() {}

  refreshToken() {}

  hashData(data: string) {
    return argon.hash(data);
  }

  async getToken(userId: number, email: string): Promise<Tokens> {
    const payload = { sub: userId, email };

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      }),
      this.jwt.signAsync(payload, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      }),
    ]);

    return { access_token: at, refresh_token: rt };
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);

    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRt: hash },
    });
  }
}
