import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';

@ObjectType()
export class GetCategory {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Category, { nullable: true })
  parentCategory?: Category;
}
