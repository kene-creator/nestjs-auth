import { User } from '@prisma/client';
import { IntegrationManager } from '../../src/test/IntegrationTestManager';
import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { testUser } from '../stubs/user.stubs';

describe('create-user', () => {
  const integrationTestManager = new IntegrationManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });

  describe('given that the user does not already exist', () => {
    describe('when a create user mutation is executed', () => {
      let createdUser: User;

      beforeAll(async () => {
        const response = await request<{ createUser: User }>(
          integrationTestManager,
        )
          .mutate(
            gql`
              mutation Mutation($createUserInput: CreateUserInput!) {
                createUser(createUserInput: $createUserInput) {
                  email
                }
              }
            `,
          )
          .variables({
            createUserInput: {
              ...testUser,
            },
          })
          .expectNoErrors();
        createdUser = response.data.createUser;
      });

      test('then the the response should be the newly created user', () => {
        expect(createdUser).toMatchObject({
          email: testUser.email,
        });
      });
    });
  });
});
