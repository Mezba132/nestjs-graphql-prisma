import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@ObjectType()
export class Category {
  @IsOptional()
  @Field(() => String)
  id: string;

  @IsNotEmpty()
  @Field(() => String)
  title: string;

  @IsOptional()
  @Field(() => String)
  description: string;

  @IsOptional()
  @Field(() => String)
  parentId: string;
}
