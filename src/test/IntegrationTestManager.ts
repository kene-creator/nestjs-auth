import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import * as cookieParser from 'cookie-parser';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { testUser } from '../../test/stubs/user.stubs';
import { SigninPayload } from '../graphql';

export class IntegrationManager {
  public httpServer: any;

  private access_token: SigninPayload;
  private app: INestApplication;
  private connection: PrismaService;

  async beforeAll(): Promise<void> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    this.app = moduleRef.createNestApplication();
    this.app.use(cookieParser());
    await this.app.init();
    this.httpServer = this.app.getHttpServer();

    const authService = this.app.get<AuthService>(AuthService);

    this.connection = this.app.get<PrismaService>(PrismaService);

    const userId = await this.connection.user.findUnique({
      where: { email: testUser.email },
    });

    this.access_token = await authService.signinLocal({
      email: 'kene@gmail.com',
      password: '12345',
    });
  }

  async afterAll() {
    await this.app.close();
  }

  getDB() {
    return this.connection;
  }

  getAccessToken() {
    return this.access_token;
  }
}
