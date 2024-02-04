import { Injectable } from '@nestjs/common';
import { CreateStockInputDto } from './dto/create-stock-input.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from 'src/errors';

@Injectable()
export class StockInputsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createStockInputDto: CreateStockInputDto) {
    const product = await this.prismaService.product.findUnique({
      where: { id: createStockInputDto.productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // using transaction to ensure data consistency
    const results = await this.prismaService.$transaction([
      this.prismaService.stockInput.create({
        data: {
          productId: createStockInputDto.productId,
          quantity: createStockInputDto.quantity,
          createdAt: createStockInputDto.createdAt,
        },
      }),
      this.prismaService.product.update({
        where: { id: createStockInputDto.productId },
        data: {
          quantity: {
            increment: createStockInputDto.quantity,
          },
        },
      }),
    ]);
    const [stockInput] = results;

    return stockInput;
  }

  async findAll(page: number, size: number) {
    const stockInputs = await this.prismaService.stockInput.findMany({
      take: size,
      skip: page * size,
    });
    return stockInputs;
  }

  async findAllByProductId(productId: number) {
    const stockInputs = await this.prismaService.stockInput.findMany({
      where: {
        productId: productId,
      },
    });
    return stockInputs;
  }
}
