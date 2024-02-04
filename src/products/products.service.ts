import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServerErrorException } from 'src/errors';
import { PrismaNotFoundCode } from 'src/config';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prismaService.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
        quantity: 0,
      },
    });
    return product;
  }

  async findAll(page: number, size: number) {
    const products = await this.prismaService.product.findMany({
      take: size,
      skip: page * size,
    });
    return products;
  }

  async findOne(id: number) {
    try {
      const product = await this.prismaService.product.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
      return product;
    } catch (error) {
      return this.handleCommonErrors(error);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.prismaService.product.update({
        where: {
          id: id,
        },
        data: {
          name: updateProductDto.name,
          price: updateProductDto.price,
        },
      });
      return product;
    } catch (error) {
      return this.handleCommonErrors(error);
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.product.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      return this.handleCommonErrors(error);
    }
  }

  handleCommonErrors(error: any) {
    console.error(`An error occurred: ${error.message}`);
    // P2025 is the code for Prisma's RecordNotFound error
    if (error.code === PrismaNotFoundCode) {
      throw new NotFoundException('Product not found');
    }
    throw new ServerErrorException(
      'An error occurred while processing the request',
    );
  }
}
