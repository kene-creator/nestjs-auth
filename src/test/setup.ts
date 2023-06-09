import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { testUser } from '../../test/stubs/user.stubs';

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
      ...testUser,
    },
  });
  console.log('User created');
  await app.close();
};
