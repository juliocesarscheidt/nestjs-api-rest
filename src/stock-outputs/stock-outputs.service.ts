import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateStockOutputDto } from './dto/create-stock-output.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from 'src/errors';

@Injectable()
export class StockOutputsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createStockOutputDto: CreateStockOutputDto) {
    const product = await this.prismaService.product.findUnique({
      where: { id: createStockOutputDto.productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.quantity === 0) {
      throw new UnprocessableEntityException('Product out of stock');
    }
    if (product.quantity - createStockOutputDto.quantity < 0) {
      throw new UnprocessableEntityException('Insufficient stock');
    }

    // using transaction to ensure data consistency
    const results = await this.prismaService.$transaction([
      this.prismaService.stockOutput.create({
        data: {
          productId: createStockOutputDto.productId,
          quantity: createStockOutputDto.quantity,
          createdAt: createStockOutputDto.createdAt,
        },
      }),
      this.prismaService.product.update({
        where: { id: createStockOutputDto.productId },
        data: {
          quantity: {
            decrement: createStockOutputDto.quantity,
          },
        },
      }),
    ]);
    const [stockOutput] = results;

    return stockOutput;
  }

  async findAll(page: number, size: number) {
    const stockOutputs = await this.prismaService.stockOutput.findMany({
      take: size,
      skip: page * size,
    });
    return stockOutputs;
  }

  async findAllByProductId(productId: number) {
    const stockOutputs = await this.prismaService.stockOutput.findMany({
      where: {
        productId: productId,
      },
    });
    return stockOutputs;
  }
}
