import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { GetCategory } from './response/category.response';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  async getCategoryNestingLevel(category: any, level = 0): Promise<number> {
    if (!category.parentCategory) {
      return level;
    }
    const parentCategory = await this.categoryService.findOne(category.parentCategory.id);
    return await this.getCategoryNestingLevel(parentCategory, level + 1);
  }

  @Mutation(() => Category)
  async createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {

    const { parentId } = createCategoryInput;
    
    if (parentId) {
      const parentCategory = await this.categoryService.findOne(parentId);
      if (!parentCategory) {
        throw new Error('Parent category not found');
      }

      const nestingLevel = await this.getCategoryNestingLevel(parentCategory);

      if (nestingLevel >= 3) {
        throw new Error('Cannot create categories beyond 4 levels of nesting');
      }
    }

    return await this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Query(() => GetCategory, { name: 'category' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  async updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
    return await this.categoryService.update(updateCategoryInput);
  }

  @Mutation(() => Category)
  async removeCategory(@Args('id', { type: () => String }) id: string) {
    return await this.categoryService.remove(id);
  }

  @Mutation(() => Category)
  async deactivateCategories(@Args('id', { type: () => String }) id: string) {
    return await this.categoryService.deactivateCategoryAndChildren(id);
  }
}
