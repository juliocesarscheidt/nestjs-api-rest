import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Query,
} from '@nestjs/common';
import { StockOutputsService } from './stock-outputs.service';
import { CreateStockOutputDto } from './dto/create-stock-output.dto';

@Controller('stock-outputs')
export class StockOutputsController {
  constructor(private readonly stockOutputsService: StockOutputsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createStockOutputDto: CreateStockOutputDto) {
    return this.stockOutputsService.create(createStockOutputDto);
  }

  @Get()
  @HttpCode(200)
  findAll(@Query('page') page?: string, @Query('size') size?: string) {
    let pageDefault = 0;
    if (page) {
      pageDefault = Math.max(+page || 1, 1) - 1;
    }
    let sizeDefault = 10;
    if (size) {
      sizeDefault = Math.max(+size || 0, 0);
    }
    return this.stockOutputsService.findAll(pageDefault, sizeDefault);
  }

  @Get(':productId')
  @HttpCode(200)
  findAllByProductId(@Param('productId') productId: string) {
    return this.stockOutputsService.findAllByProductId(+productId);
  }
}
