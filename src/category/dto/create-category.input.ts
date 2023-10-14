import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  parentId: string;
}
