import { Resolver, ResolveField } from '@nestjs/graphql';

@Resolver('TrackChange')
export class TrackChangeResolver {
  @ResolveField()
  __resolveType(value: any) {
    if (value.updatedAt) {
      return 'Credentials';
    }
    if (value.id) {
      return 'User';
    }
    return null;
  }
}
