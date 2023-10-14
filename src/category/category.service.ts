import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpStatusCode } from 'axios';
import { AppMessage } from 'src/common/message.enum';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryInput: CreateCategoryInput) {
    let getCategory = await this.prismaService.category.findFirst({
      where: { title: createCategoryInput.title },
    });

    if (getCategory) {
      throw new BadRequestException("Bad Request");
    }

    return this.prismaService.category.create({ data: createCategoryInput });
  }

  async findAll() {
    return await this.prismaService.category.findMany();
  }

  async findOne(id: string) {
    let getCategory = await this.prismaService.category.findFirst({
      where: { id },
      include: {
        parentCategory: true 
      }
    });
    return getCategory;
  }

  async update(updateCategoryInput: UpdateCategoryInput) {
    let getCategory = await this.prismaService.category.findFirst({
      where: { id: updateCategoryInput.id },
    });

    if (!Boolean(getCategory))
      throw new HttpException(AppMessage.NOT_FOUND, HttpStatusCode.NotFound);

    return await this.prismaService.category
      .update({
        where: { id: updateCategoryInput.id },
        data: {
          title: updateCategoryInput.title,
          description: updateCategoryInput.description,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException(
          AppMessage.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async remove(id: string) {
    let getCategory = await this.prismaService.category.findFirst({
      where: { id },
    });

    if (!Boolean(getCategory))
      throw new HttpException(AppMessage.NOT_FOUND, HttpStatusCode.NotFound);

    let response = await this.prismaService.category
      .delete({
        where: { id },
      })
      .catch(() => {
        throw new InternalServerErrorException(
          AppMessage.INTERNAL_SERVER_ERROR,
        );
      });
    if (!Boolean(response)) throw new HttpException(AppMessage.ERROR, 400);
    return response;
  }

  async deactivateCategoryAndChildren(id: string) {
    const category : any = await this.prismaService.category.findUnique({ where: { id } }); 
    if (!category) {
      throw new Error('Category not found');
    }
    await this.prismaService.category.update({ where: { id }, data: { isActive: false } }); 
    await this.deactivateChildCategories(id);
    return category;
  }

  async deactivateChildCategories(id: string) {
    let category : any = await this.prismaService.category.findFirst({ where: { parentId : id } });
    if(!category) {
      return;
    }
    await this.prismaService.category.update({ where: { id : category.id }, data: { isActive: false } });
    await this.deactivateChildCategories(category.id);
  }

}
