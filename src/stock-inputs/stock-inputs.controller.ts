import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Query,
} from '@nestjs/common';
import { StockInputsService } from './stock-inputs.service';
import { CreateStockInputDto } from './dto/create-stock-input.dto';

@Controller('stock-inputs')
export class StockInputsController {
  constructor(private readonly stockInputsService: StockInputsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createStockInputDto: CreateStockInputDto) {
    return this.stockInputsService.create(createStockInputDto);
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
    return this.stockInputsService.findAll(pageDefault, sizeDefault);
  }

  @Get(':productId')
  @HttpCode(200)
  findAllByProductId(@Param('productId') productId: string) {
    return this.stockInputsService.findAllByProductId(+productId);
  }
}
