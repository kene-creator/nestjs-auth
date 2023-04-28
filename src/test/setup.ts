import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';

export default async (): Promise<void> => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
    providers: [PrismaService],
  }).compile();

  const app = moduleRef.createNestApplication();
  await app.init();
  const prismaService = moduleRef.get<PrismaService>(PrismaService);
  await prismaService.user.create({
    data: {
      email: 'ebuka@email.com',
      hash: '12345',
    },
  });
  await app.close();
};
