import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import cookieParser from 'cookie-parser';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';

export class IntegrationManager {
  public httpServer: any;

  private app: INestApplication;

  async beforeAll(): Promise<viod> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    this.app = moduleRef.createNestApplication();
    this.app.use(cookieParser());
    await this.app.init();
    this.httpServer = this.app.getHttpServer();
    const authService = this.app.get<AuthService>(AuthService);
  }
}
