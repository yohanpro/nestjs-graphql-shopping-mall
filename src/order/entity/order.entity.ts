import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';

@ObjectType()
export class Order {
  @Field()
  id: string;

  @Field(() => User)
  user: User;

  @Field(() => [Product])
  products: Product[];

  @Field()
  createdAt: Date;
}
