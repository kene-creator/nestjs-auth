import { IntegrationManager } from '../../src/test/IntegrationTestManager';

describe('create-user', () => {
  const integrationTestManager = new IntegrationManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });
});
