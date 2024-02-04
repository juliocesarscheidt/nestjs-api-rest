import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
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
    return this.productsService.findAll(pageDefault, sizeDefault);
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id); // +id to convert to number
  }

  @Patch(':id')
  @HttpCode(202)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto); // +id to convert to number
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id); // +id to convert to number
  }
}
