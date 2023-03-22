import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  async hello() {
    return 'hello world! my name is john';
  }
}
